"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile, INITIAL_USERS } from "@/lib/data/mock-data";
import { supabase } from "@/lib/supabase/client";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (
    email: string,
    password: string,
    username: string,
    role: "student" | "educator" | "admin",
    displayName?: string
  ) => Promise<{ success: boolean; error?: string; message?: string }>;
  signOut: () => Promise<void>;
  switchRole: (newRole: "student" | "educator" | "admin") => void;
  loginAsDemoUser: (role: "student" | "educator" | "admin") => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  toggleFollow: (handle: string) => void;
  isFollowingUser: (handle: string) => boolean;
  toggleBookmark: (postId: string) => void;
  isPostBookmarked: (postId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Synchronize with active Supabase session or localStorage
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        // 1. Check Supabase session first
        const { data: { session }, error } = await supabase.auth.getSession();

        if (session?.user) {
          const u = session.user;
          const meta = u.user_metadata || {};
          const profile: UserProfile = {
            id: u.id,
            username: meta.username || `@${u.email?.split("@")[0]}`,
            display_name: meta.display_name || meta.username?.replace("@", "") || u.email?.split("@")[0],
            email: u.email || "",
            role: (meta.role as any) || "student",
            avatar_url:
              meta.avatar_url ||
              (meta.role === "admin" ? INITIAL_USERS[0].avatar_url : meta.role === "educator" ? INITIAL_USERS[1].avatar_url : INITIAL_USERS[2].avatar_url),
            is_active: true,
            bio: meta.bio || (meta.role === "admin" ? "Platform Administrator." : meta.role === "educator" ? "Educator & meme scholar." : "Student scholar."),
            followers_count: 0,
            following_count: 0,
            following_handles: [],
            bookmarked_post_ids: [],
            liked_post_ids: [],
            created_at: u.created_at || new Date().toISOString(),
          };

          if (isMounted) {
            setUser(profile);
            localStorage.setItem("meme_community_session", JSON.stringify(profile));
          }
        } else {
          // Check local stored session
          const local = localStorage.getItem("meme_community_session");
          if (local && isMounted) {
            try {
              setUser(JSON.parse(local));
            } catch (e) {
              setUser(null);
            }
          }
        }
      } catch (err) {
        console.warn("Auth initialization error:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    initAuth();

    // Listen to Supabase Auth state changes in real time
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const u = session.user;
        const meta = u.user_metadata || {};
        const profile: UserProfile = {
          id: u.id,
          username: meta.username || `@${u.email?.split("@")[0]}`,
          display_name: meta.display_name || meta.username?.replace("@", "") || u.email?.split("@")[0],
          email: u.email || "",
          role: (meta.role as any) || "student",
          avatar_url:
            meta.avatar_url ||
            (meta.role === "admin" ? INITIAL_USERS[0].avatar_url : meta.role === "educator" ? INITIAL_USERS[1].avatar_url : INITIAL_USERS[2].avatar_url),
          is_active: true,
          bio: meta.bio || "",
          followers_count: 0,
          following_count: 0,
          following_handles: [],
          bookmarked_post_ids: [],
          liked_post_ids: [],
          created_at: u.created_at || new Date().toISOString(),
        };
        setUser(profile);
        localStorage.setItem("meme_community_session", JSON.stringify(profile));
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        localStorage.removeItem("meme_community_session");
      }
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const saveUserSession = (profile: UserProfile | null) => {
    setUser(profile);
    if (profile) {
      localStorage.setItem("meme_community_session", JSON.stringify(profile));
      // Sync with server API
      fetch("/api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync_user", profile }),
      }).catch((e) => console.warn("Profile sync warning:", e));
    } else {
      localStorage.removeItem("meme_community_session");
    }
  };

  // Real Sign In with Supabase Auth & admin credentials validation
  const signIn = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPass = password?.trim() || "";

      // Special Check for Admin Account: admin@admin.admin / admin123
      if (normalizedEmail === "admin@admin.admin") {
        if (normalizedPass === "admin123") {
          const adminUser = INITIAL_USERS[0];
          saveUserSession(adminUser);
          return { success: true };
        } else {
          return { success: false, error: "Invalid password for admin@admin.admin" };
        }
      }

      if (!password) {
        return { success: false, error: "Password is required for login" };
      }

      // Supabase Auth verification
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: normalizedPass,
      });

      if (error) {
        // Check mock user matching
        const mockMatch = INITIAL_USERS.find(
          (u) => u.email.toLowerCase() === normalizedEmail && (normalizedPass === "password123" || normalizedPass === "admin123")
        );
        if (mockMatch) {
          saveUserSession(mockMatch);
          return { success: true };
        }
        return { success: false, error: error.message };
      }

      if (data?.user) {
        const u = data.user;
        const meta = u.user_metadata || {};
        const profile: UserProfile = {
          id: u.id,
          username: meta.username || `@${u.email?.split("@")[0]}`,
          display_name: meta.display_name || meta.username?.replace("@", "") || u.email?.split("@")[0],
          email: u.email || email,
          role: (meta.role as any) || "student",
          avatar_url:
            meta.avatar_url ||
            (meta.role === "admin" ? INITIAL_USERS[0].avatar_url : meta.role === "educator" ? INITIAL_USERS[1].avatar_url : INITIAL_USERS[2].avatar_url),
          is_active: true,
          bio: meta.bio || (meta.role === "admin" ? "Platform Administrator." : meta.role === "educator" ? "Educator & meme scholar." : "Student scholar."),
          followers_count: 0,
          following_count: 0,
          following_handles: [],
          bookmarked_post_ids: [],
          liked_post_ids: [],
          created_at: u.created_at || new Date().toISOString(),
        };

        saveUserSession(profile);
        return { success: true };
      }

      return { success: false, error: "Unable to find user account" };
    } catch (err: any) {
      return { success: false, error: err.message || "Sign in failed" };
    } finally {
      setIsLoading(false);
    }
  };

  // Real Sign Up with Supabase Auth
  const signUp = async (
    email: string,
    password: string,
    username: string,
    role: "student" | "educator" | "admin",
    displayName?: string
  ): Promise<{ success: boolean; error?: string; message?: string }> => {
    setIsLoading(true);
    try {
      if (password.length < 6) {
        return { success: false, error: "Password must be at least 6 characters long." };
      }

      const cleanHandle = username.startsWith("@") ? username : `@${username}`;
      const cleanDisplay = displayName || cleanHandle.replace("@", "");

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            username: cleanHandle,
            display_name: cleanDisplay,
            role,
            avatar_url:
              role === "admin"
                ? INITIAL_USERS[0].avatar_url
                : role === "educator"
                ? INITIAL_USERS[1].avatar_url
                : INITIAL_USERS[2].avatar_url,
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      const newUser: UserProfile = {
        id: data.user?.id || `user-${Date.now()}`,
        username: cleanHandle,
        display_name: cleanDisplay,
        email: email.trim(),
        role,
        avatar_url:
          role === "admin"
            ? INITIAL_USERS[0].avatar_url
            : role === "educator"
            ? INITIAL_USERS[1].avatar_url
            : INITIAL_USERS[2].avatar_url,
        is_active: true,
        bio: role === "admin" ? "Platform Administrator." : role === "educator" ? "Verified Educator on Meme Community." : "Student exploring internet culture.",
        followers_count: 0,
        following_count: 0,
        following_handles: [],
        bookmarked_post_ids: [],
        liked_post_ids: [],
        created_at: new Date().toISOString(),
      };

      saveUserSession(newUser);
      return {
        success: true,
        message: data.session ? "Account created and logged in!" : "Account created! Please check your email to verify.",
      };
    } catch (err: any) {
      return { success: false, error: err.message || "Registration failed" };
    } finally {
      setIsLoading(false);
    }
  };

  // Real Sign Out with Supabase Auth
  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("SignOut Supabase warning:", e);
    } finally {
      saveUserSession(null);
      setIsLoading(false);
    }
  };

  const switchRole = (newRole: "student" | "educator" | "admin") => {
    if (!user) return;
    const updated: UserProfile = { ...user, role: newRole };
    saveUserSession(updated);
  };

  const loginAsDemoUser = (role: "student" | "educator" | "admin") => {
    const demo = INITIAL_USERS.find((u) => u.role === role) || INITIAL_USERS[0];
    saveUserSession(demo);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated: UserProfile = { ...user, ...updates };
    saveUserSession(updated);
  };

  const toggleFollow = (handle: string) => {
    if (!user) return;
    const currentFollowing = user.following_handles || [];
    const isCurrentlyFollowing = currentFollowing.some(
      (h) => h.toLowerCase() === handle.toLowerCase()
    );

    const nextFollowing = isCurrentlyFollowing
      ? currentFollowing.filter((h) => h.toLowerCase() !== handle.toLowerCase())
      : [...currentFollowing, handle];

    const updated: UserProfile = {
      ...user,
      following_handles: nextFollowing,
      following_count: nextFollowing.length,
    };
    saveUserSession(updated);
  };

  const isFollowingUser = (handle: string) => {
    return !!user?.following_handles?.some(
      (h) => h.toLowerCase() === handle.toLowerCase()
    );
  };

  const toggleBookmark = (postId: string) => {
    if (!user) return;
    const currentSaved = user.bookmarked_post_ids || [];
    const isSaved = currentSaved.includes(postId);

    const nextSaved = isSaved
      ? currentSaved.filter((id) => id !== postId)
      : [...currentSaved, postId];

    const updated: UserProfile = {
      ...user,
      bookmarked_post_ids: nextSaved,
    };
    saveUserSession(updated);
  };

  const isPostBookmarked = (postId: string) => {
    return !!user?.bookmarked_post_ids?.includes(postId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        switchRole,
        loginAsDemoUser,
        updateProfile,
        toggleFollow,
        isFollowingUser,
        toggleBookmark,
        isPostBookmarked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
