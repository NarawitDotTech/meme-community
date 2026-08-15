"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Plus, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  onOpenCreatePost?: () => void;
}

export default function Header({ onOpenCreatePost }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="lg:hidden sticky top-0 z-50 bg-surface/85 backdrop-blur-xl border-b border-outline-variant shadow-sm flex justify-between items-center px-4 py-2.5 w-full">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-display-sm text-[18px] font-extrabold text-primary tracking-tight">
          Meme Community
        </span>
      </Link>

      <div className="flex items-center gap-2">
        {onOpenCreatePost && (
          <button
            onClick={onOpenCreatePost}
            className="bg-primary text-on-primary rounded-full p-2 glow-hover shadow-sm active:scale-95 transition-all"
            title="Create Post"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        )}

        {user ? (
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
              user.role === "admin" ? "bg-rose-100 text-rose-800" : user.role === "educator" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
            }`}>
              {user.role}
            </span>
            <img
              src={user.avatar_url}
              alt={user.username}
              className="w-8 h-8 rounded-full border border-outline-variant object-cover"
            />
          </div>
        ) : (
          <Link
            href="/auth"
            className="text-xs bg-primary text-on-primary px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 shadow-sm"
          >
            <LogIn className="w-3.5 h-3.5" />
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
