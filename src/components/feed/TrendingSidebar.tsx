"use client";

import React from "react";
import { TrendingUp, Sparkles, User, Hash } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface TrendingItem {
  id: number;
  tag: string;
  category: string;
  count: string;
}

interface TrendingSidebarProps {
  trendingTags?: TrendingItem[];
  onSelectTag?: (tag: string) => void;
  onOpenMyProfile?: () => void;
}

export default function TrendingSidebar({
  trendingTags = [],
  onSelectTag,
  onOpenMyProfile,
}: TrendingSidebarProps) {
  const { user } = useAuth();

  return (
    <aside className="hidden xl:block w-[320px] p-lg sticky top-0 h-screen overflow-y-auto select-none">
      {/* User Quick Profile Card */}
      {user && (
        <div className="mb-4 bg-surface-container border border-outline-variant rounded-2xl p-4 inner-glow shadow-xs">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar_url}
              alt={user.username}
              className="w-11 h-11 rounded-full object-cover border border-outline-variant"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-sm text-on-surface truncate">
                {user.display_name || user.username.replace("@", "")}
              </h4>
              <p className="text-xs text-on-surface-variant truncate">{user.username}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-outline-variant/60 text-xs">
            <span
              className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                user.role === "educator"
                  ? "bg-purple-100 text-purple-900 border border-purple-300"
                  : user.role === "admin"
                  ? "bg-rose-100 text-rose-900 border border-rose-300"
                  : "bg-blue-100 text-blue-900 border border-blue-300"
              }`}
            >
              {user.role === "educator"
                ? "🎓 Educator"
                : user.role === "admin"
                ? "🛡️ Admin"
                : "🎒 Student"}
            </span>

            {onOpenMyProfile && (
              <button
                onClick={onOpenMyProfile}
                className="text-primary font-bold hover:underline text-xs"
              >
                View Profile &rarr;
              </button>
            )}
          </div>
        </div>
      )}

      {/* Dynamic Trending Box */}
      <div className="bg-surface-container border border-outline-variant rounded-[18px] p-4 inner-glow shadow-xs">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-outline-variant/60">
          <h3 className="font-headline-md text-base font-bold text-on-surface flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Trending Topics
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
            Live
          </span>
        </div>

        {trendingTags.length === 0 ? (
          <div className="py-6 text-center text-on-surface-variant space-y-1.5">
            <Hash className="w-6 h-6 mx-auto text-outline" />
            <p className="text-xs font-semibold">No trending hashtags yet</p>
            <p className="text-[11px]">Add #hashtags to your posts to spark a community trend!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {trendingTags.map((t, idx) => (
              <div
                key={t.id}
                onClick={() => onSelectTag && onSelectTag(t.tag)}
                className="py-2 px-2.5 hover:bg-surface-container-high/70 transition-all cursor-pointer rounded-xl -mx-1"
              >
                <div className="text-[10px] text-on-surface-variant mb-0.5">
                  {idx + 1} • {t.category}
                </div>
                <div className="text-xs font-bold text-on-surface hover:text-primary transition-colors">
                  {t.tag}
                </div>
                <div className="text-[10px] text-on-surface-variant mt-0.5">
                  {t.count}
                </div>
              </div>
            ))}
          </div>
        )}

        <Link
          href="/tracker"
          className="w-full text-primary font-bold text-xs text-left mt-3 pt-2 border-t border-outline-variant/60 hover:underline block"
        >
          Explore Meme Radar &rarr;
        </Link>
      </div>

      {/* Teacher / Student Tip */}
      <div className="mt-4 bg-gradient-to-br from-primary-container/40 via-surface-container to-secondary-container/20 border border-primary/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-primary" />
          <h4 className="font-bold text-xs text-on-surface">Pedagogy Tip</h4>
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Educators can launch classroom polls directly in the feed to assess student sentiment and slang comprehension.
        </p>
        <Link
          href="/learn"
          className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
        >
          Open Educator Modules &rarr;
        </Link>
      </div>
    </aside>
  );
}
