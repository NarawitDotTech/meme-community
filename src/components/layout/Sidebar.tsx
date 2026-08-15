"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  Sparkles, 
  BookOpen, 
  Layers, 
  ShieldAlert, 
  Plus, 
  LogOut, 
  GraduationCap, 
  School,
  Compass,
  LogIn,
  Lock,
  Flame,
  Award
} from "lucide-react";

interface SidebarProps {
  onOpenCreatePost?: () => void;
}

export default function Sidebar({ onOpenCreatePost }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const isFeed = pathname === "/";
  const isLearn = pathname.startsWith("/learn");
  const isMemes = pathname.startsWith("/tracker");
  const isAdmin = pathname.startsWith("/admin");

  const handleCreatePostClick = () => {
    if (!user) {
      router.push("/auth");
      return;
    }
    if (onOpenCreatePost) onOpenCreatePost();
  };

  return (
    <aside className="hidden lg:flex flex-col gap-lg p-lg h-screen w-[260px] sticky left-0 top-0 bg-surface-container-low border-r border-outline-variant z-40 select-none">
      {/* Brand Header */}
      <div className="flex flex-col gap-xs mb-md">
        <Link href="/" className="flex items-center gap-sm group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-headline-md text-[20px] leading-[26px] font-extrabold text-primary tracking-tight">
              Meme Community
            </h1>
            <p className="font-label-sm text-[11px] text-on-surface-variant">Intellectually Electric</p>
          </div>
        </Link>
      </div>

      {/* Navigation Links - Learn Tab positioned at the TOP and Tallest */}
      <nav className="flex flex-col gap-2 flex-1">
        {/* 1. Learn Link (Topmost & Prominently Elevated / Tallest) */}
        <Link
          href="/learn"
          className={`flex items-center justify-between rounded-2xl py-3.5 px-4 font-label-md text-sm transition-all active:translate-x-1 border ${
            isLearn
              ? "bg-primary text-on-primary font-extrabold shadow-md border-primary scale-[1.02]"
              : "bg-surface-container-lowest border-outline-variant hover:border-primary/60 text-on-surface hover:bg-surface-container font-bold"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-xl ${isLearn ? "bg-white/20 text-white" : "bg-primary-container text-primary"}`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold leading-tight">Learn Hub</div>
              <div className={`text-[10px] font-normal ${isLearn ? "text-white/80" : "text-on-surface-variant"}`}>
                Videos & Curriculum
              </div>
            </div>
          </div>
          {!user ? (
            <Lock className={`w-3.5 h-3.5 ${isLearn ? "text-white/70" : "text-outline"}`} />
          ) : (
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${isLearn ? "bg-white/20 text-white" : "bg-primary-container text-on-primary-container"}`}>
              PRO
            </span>
          )}
        </Link>

        {/* 2. Feed Link */}
        <Link
          href="/"
          className={`flex items-center gap-3 rounded-xl py-2.5 px-3.5 font-label-md text-xs font-bold transition-all active:translate-x-1 ${
            isFeed
              ? "bg-secondary-container text-on-secondary-container font-extrabold shadow-xs"
              : "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
          }`}
        >
          <Compass className="w-4 h-4 text-secondary" />
          <span>Community Feed</span>
        </Link>

        {/* 3. Meme Tracker Link */}
        <Link
          href="/tracker"
          className={`flex items-center justify-between rounded-xl py-2.5 px-3.5 font-label-md text-xs font-bold transition-all active:translate-x-1 ${
            isMemes
              ? "bg-secondary-container text-on-secondary-container font-extrabold shadow-xs"
              : "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
          }`}
        >
          <div className="flex items-center gap-3">
            <Layers className="w-4 h-4 text-tertiary" />
            <span>Meme Radar</span>
          </div>
          {!user && <Lock className="w-3 h-3 text-outline" />}
        </Link>

        {/* 4. Admin Dashboard Link (Only visible to Admin users) */}
        {user?.role === "admin" && (
          <Link
            href="/admin"
            className={`flex items-center gap-3 rounded-xl py-2.5 px-3.5 font-label-md text-xs font-bold transition-all active:translate-x-1 ${
              isAdmin
                ? "bg-rose-100 text-rose-900 border border-rose-300 font-extrabold shadow-xs"
                : "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-700" />
            <span>Admin Panel</span>
          </Link>
        )}
      </nav>

      {/* User Status / Profile Card */}
      <div className="pt-sm border-t border-outline-variant/60 flex flex-col gap-sm">
        {user ? (
          <div className="flex items-center justify-between p-sm rounded-xl bg-surface-container-lowest border border-outline-variant">
            <div className="flex items-center gap-sm min-w-0">
              <img
                src={user.avatar_url}
                alt={user.username}
                className="w-8 h-8 rounded-full object-cover border border-outline-variant shrink-0"
              />
              <div className="truncate">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-bold text-on-surface truncate">{user.username}</p>
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ${
                    user.role === "admin" ? "bg-rose-100 text-rose-800" : user.role === "educator" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {user.role}
                  </span>
                </div>
                <p className="text-[10px] text-on-surface-variant truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              title="Sign Out"
              className="p-1 hover:bg-surface-variant rounded-lg text-on-surface-variant hover:text-error transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link
            href="/auth"
            className="w-full text-center py-2.5 bg-primary text-on-primary rounded-xl font-label-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <LogIn className="w-3.5 h-3.5" />
            Sign In / Register
          </Link>
        )}

        {/* Create Post Button */}
        <button
          onClick={handleCreatePostClick}
          className="w-full bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md py-md px-lg rounded-xl flex items-center justify-center gap-sm glow-hover transition-all shadow-sm active:scale-95 font-bold"
        >
          <Plus className="w-5 h-5" />
          <span>Create Post</span>
        </button>
      </div>
    </aside>
  );
}
