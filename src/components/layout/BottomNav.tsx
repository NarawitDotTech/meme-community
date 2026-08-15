"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, BookOpen, Layers, ShieldAlert, User, Lock, LogIn, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isFeed = pathname === "/";
  const isLearn = pathname.startsWith("/learn");
  const isMemes = pathname.startsWith("/tracker");
  const isAdmin = pathname.startsWith("/admin");
  const isAuth = pathname.startsWith("/auth");

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2 bg-surface/95 backdrop-blur-xl border-t border-outline-variant rounded-t-2xl shadow-[0_-10px_30px_rgba(109,40,217,0.12)] pb-5">
      {/* 1. Feed */}
      <Link
        href="/"
        className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all active:scale-90 ${
          isFeed
            ? "bg-primary-container text-on-primary-container font-bold px-3"
            : "text-on-surface-variant hover:text-primary"
        }`}
      >
        <Compass className="w-5 h-5 mb-1" />
        <span className="text-[11px] font-semibold">Feed</span>
      </Link>

      {/* 2. Learn (Prominently Elevated / Tallest Center Hero Tab) */}
      <Link
        href="/learn"
        className={`relative -top-3 flex flex-col items-center justify-center px-4 py-2.5 rounded-2xl transition-all active:scale-95 shadow-lg border ${
          isLearn
            ? "bg-primary text-white border-primary-container scale-105 shadow-primary/30"
            : "bg-surface-container-lowest border-outline-variant text-primary hover:border-primary"
        }`}
      >
        <div className="relative">
          <BookOpen className="w-6 h-6 mb-0.5" />
          {!user && <Lock className="w-2.5 h-2.5 absolute -top-1 -right-1 text-amber-300" />}
        </div>
        <span className="text-[11px] font-extrabold tracking-tight">Learn</span>
      </Link>

      {/* 3. Memes Radar */}
      <Link
        href="/tracker"
        className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all active:scale-90 relative ${
          isMemes
            ? "bg-primary-container text-on-primary-container font-bold px-3"
            : "text-on-surface-variant hover:text-primary"
        }`}
      >
        <Layers className="w-5 h-5 mb-1" />
        <span className="text-[11px] font-semibold">Radar</span>
        {!user && <Lock className="w-2.5 h-2.5 absolute top-2 right-2 text-outline" />}
      </Link>

      {/* 4. Admin (Only if Admin) */}
      {user?.role === "admin" && (
        <Link
          href="/admin"
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all active:scale-90 ${
            isAdmin
              ? "bg-primary-container text-on-primary-container font-bold px-3"
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          <ShieldAlert className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-semibold">Admin</span>
        </Link>
      )}

      {/* 5. Profile / Auth */}
      <Link
        href="/auth"
        className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all active:scale-90 ${
          isAuth
            ? "bg-primary-container text-on-primary-container font-bold px-3"
            : "text-on-surface-variant hover:text-primary"
        }`}
      >
        {user ? (
          <img
            src={user.avatar_url}
            alt="User avatar"
            className="w-5 h-5 rounded-full object-cover mb-1 border border-outline"
          />
        ) : (
          <LogIn className="w-5 h-5 mb-1" />
        )}
        <span className="text-[11px] font-semibold">
          {user ? user.username.replace("@", "").slice(0, 7) : "Sign In"}
        </span>
      </Link>
    </nav>
  );
}
