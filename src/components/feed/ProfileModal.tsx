"use client";

import React, { useState } from "react";
import { X, User, Edit2, Bookmark, Heart, Grid, Check, UserCheck, UserPlus, Sparkles, School, GraduationCap } from "lucide-react";
import { Post, UserProfile } from "@/lib/data/mock-data";
import { useAuth } from "@/context/AuthContext";
import PostCard from "./PostCard";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser?: UserProfile | null;
  posts: Post[];
  onPostUpdate: () => void;
}

export default function ProfileModal({
  isOpen,
  onClose,
  targetUser,
  posts,
  onPostUpdate,
}: ProfileModalProps) {
  const { user, updateProfile, toggleFollow, isFollowingUser } = useAuth();
  const profile = targetUser || user;

  const isOwnProfile = !targetUser || targetUser.username === user?.username;
  const isFollowing = profile ? isFollowingUser(profile.username) : false;

  const [activeTab, setActiveTab] = useState<"posts" | "saved" | "edit">("posts");

  // Edit fields
  const [displayName, setDisplayName] = useState(user?.display_name || user?.username.replace("@", "") || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || "");
  const [isSavedToast, setIsSavedToast] = useState(false);

  if (!isOpen || !profile) return null;

  const userPosts = posts.filter((p) => p.author_handle.toLowerCase() === profile.username.toLowerCase());
  const savedPosts = posts.filter((p) => p.is_bookmarked);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      display_name: displayName.trim(),
      bio: bio.trim(),
      avatar_url: avatarUrl.trim() || user?.avatar_url,
    });
    setIsSavedToast(true);
    setTimeout(() => {
      setIsSavedToast(false);
      setActiveTab("posts");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-surface-container-lowest border border-outline-variant rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header Cover Banner */}
        <div className="h-32 bg-gradient-to-r from-primary via-primary-container to-secondary relative p-4 flex justify-end items-start">
          <button
            onClick={onClose}
            className="bg-black/50 text-white rounded-full p-1.5 hover:bg-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Info Row */}
        <div className="px-6 pb-4 relative flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-outline-variant/60 -mt-12 bg-surface-container-lowest">
          <div className="flex items-end gap-3">
            <img
              src={profile.avatar_url}
              alt={profile.username}
              className="w-20 h-20 rounded-full object-cover border-4 border-surface shadow-md bg-surface"
            />
            <div className="pb-1">
              <h3 className="font-headline-md text-lg font-extrabold text-on-surface">
                {profile.display_name || profile.username.replace("@", "")}
              </h3>
              <p className="text-xs text-on-surface-variant">{profile.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pb-1">
            <span
              className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                profile.role === "educator"
                  ? "bg-purple-100 text-purple-900 border border-purple-300"
                  : profile.role === "admin"
                  ? "bg-rose-100 text-rose-900 border border-rose-300"
                  : "bg-blue-100 text-blue-900 border border-blue-300"
              }`}
            >
              {profile.role === "educator"
                ? "🎓 Educator"
                : profile.role === "admin"
                ? "🛡️ Admin"
                : "🎒 Student"}
            </span>

            {isOwnProfile ? (
              <button
                onClick={() => setActiveTab(activeTab === "edit" ? "posts" : "edit")}
                className="text-xs font-bold px-4 py-1.5 rounded-xl border border-outline-variant hover:bg-surface-variant flex items-center gap-1.5 text-on-surface"
              >
                <Edit2 className="w-3.5 h-3.5" />
                {activeTab === "edit" ? "View Posts" : "Edit Profile"}
              </button>
            ) : (
              <button
                onClick={() => toggleFollow(profile.username)}
                className={`text-xs font-bold px-4 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  isFollowing
                    ? "bg-surface-container border border-outline-variant text-on-surface"
                    : "bg-primary text-on-primary hover:bg-primary/90"
                }`}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5" /> Following
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" /> Follow
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Bio & Stats */}
        <div className="px-6 py-3 bg-surface-container-low space-y-2 text-xs border-b border-outline-variant/60">
          <p className="text-on-surface leading-relaxed">
            {profile.bio || "Member of the Meme Community."}
          </p>

          <div className="flex items-center gap-5 font-semibold text-on-surface-variant pt-1">
            <span>
              <strong className="text-on-surface font-bold">
                {userPosts.length}
              </strong>{" "}
              Posts
            </span>
            <span>
              <strong className="text-on-surface font-bold">
                {profile.following_count || profile.following_handles?.length || 0}
              </strong>{" "}
              Following
            </span>
            <span>
              <strong className="text-on-surface font-bold">
                {profile.followers_count || 0}
              </strong>{" "}
              Followers
            </span>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex border-b border-outline-variant text-xs font-bold px-6 bg-surface-container-lowest">
          <button
            onClick={() => setActiveTab("posts")}
            className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === "posts"
                ? "border-primary text-primary font-extrabold"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Posts ({userPosts.length})
          </button>

          {isOwnProfile && (
            <button
              onClick={() => setActiveTab("saved")}
              className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-all ${
                activeTab === "saved"
                  ? "border-primary text-primary font-extrabold"
                  : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Saved Bookmarks ({savedPosts.length})
            </button>
          )}

          {isOwnProfile && (
            <button
              onClick={() => setActiveTab("edit")}
              className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-all ${
                activeTab === "edit"
                  ? "border-primary text-primary font-extrabold"
                  : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Edit2 className="w-3.5 h-3.5" />
              Settings
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === "edit" ? (
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md mx-auto py-2">
              {isSavedToast && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Profile updated successfully!
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-on-surface-variant block mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant rounded-xl p-2.5 text-xs text-on-surface focus:outline-none focus:border-primary font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface-variant block mb-1">
                  Bio / Tagline
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell the community about yourself..."
                  className="w-full bg-surface-container border border-outline-variant rounded-xl p-2.5 text-xs text-on-surface focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface-variant block mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant rounded-xl p-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs py-2.5 rounded-xl shadow-sm transition-all"
              >
                Save Profile Details
              </button>
            </form>
          ) : activeTab === "saved" ? (
            savedPosts.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant space-y-2">
                <Bookmark className="w-8 h-8 mx-auto text-outline" />
                <p className="text-xs font-bold">No saved posts yet</p>
                <p className="text-[11px]">Click the bookmark icon on any meme post to save it here.</p>
              </div>
            ) : (
              savedPosts.map((p) => (
                <PostCard key={p.id} post={p} onPostUpdate={onPostUpdate} />
              ))
            )
          ) : (
            userPosts.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant space-y-2">
                <Grid className="w-8 h-8 mx-auto text-outline" />
                <p className="text-xs font-bold">No posts published yet</p>
                <p className="text-[11px]">Share a meme or slang question to see it listed on your profile.</p>
              </div>
            ) : (
              userPosts.map((p) => (
                <PostCard key={p.id} post={p} onPostUpdate={onPostUpdate} />
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
}
