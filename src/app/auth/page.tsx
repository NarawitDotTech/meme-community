"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  School,
  Backpack,
  Lock,
  Mail,
  User,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertCircle,
  LogIn,
  UserPlus,
} from "lucide-react";

export default function AuthPage() {
  const { signIn, signUp, user } = useAuth();
  const router = useRouter();

  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<"student" | "educator">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (tab === "signin") {
        if (!email.trim() || !password.trim()) {
          throw new Error("Please enter both email and password.");
        }
        const res = await signIn(email.trim(), password.trim());
        if (!res.success) {
          throw new Error(res.error || "Invalid email or password.");
        }
        setSuccessMsg("Signed in successfully! Redirecting...");
        setTimeout(() => router.push("/"), 800);
      } else {
        if (!username.trim() || !email.trim() || !password.trim()) {
          throw new Error("Please fill out all required fields.");
        }
        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters.");
        }
        const res = await signUp(
          email.trim(),
          password.trim(),
          username.trim(),
          role,
          displayName.trim() || undefined
        );
        if (!res.success) {
          throw new Error(res.error || "Registration failed.");
        }
        setSuccessMsg(res.message || "Account created successfully!");
        setTimeout(() => router.push("/"), 1200);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-background selection:bg-primary-container">
      {/* Left Hemisphere: Brand & Atmospheric Floating Cards */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-surface-container-lowest items-center justify-center p-8 md:p-12 flex-col border-r border-outline-variant select-none">
        {/* Radial Glow Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-primary-container/50 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-secondary-container/40 rounded-full blur-[80px]"></div>
        </div>

        <div className="z-10 relative text-center w-full max-w-lg mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/60 border border-primary/20 text-on-primary-container text-xs font-bold mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            Bridges Students & Teachers
          </div>
          <h1 className="font-display-lg text-4xl lg:text-5xl font-extrabold text-primary tracking-tight mb-2">
            Meme Community
          </h1>
          <p className="font-headline-md text-base text-on-surface-variant font-medium">
            Intellectually Electric.
          </p>
        </div>

        {/* Floating Cards Canvas */}
        <div className="z-10 relative w-full max-w-md h-[360px]">
          {/* Card 1: Daily Insight */}
          <div className="absolute top-0 left-0 w-64 glass-panel rounded-2xl p-4 animate-float1 shadow-[0_20px_40px_rgba(90,71,206,0.12)]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                <School className="w-4 h-4 text-primary" />
              </div>
              <span className="font-label-sm text-xs font-bold text-on-surface">Daily Insight</span>
            </div>
            <div className="h-20 rounded-xl mb-2 bg-surface overflow-hidden border border-outline-variant/50">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsj2doa6JzTHTw3L0mGi71KO3GVAEhd5bepfVg0YK64MJsvjg4b-fsvdecUZxAhxijqF6cVe0bo_z7xFD2Hde7AE8KcG0xZXkxm2OddvOSgZtRqBZH86XZDyqq1OJHmDog9zrcCcTRg4uHm9DXyE42Sivc8_MNHcj25JGyT50sXtSxIqPOjwUWV5YgPRQ1jM_co6KRRVb7lx-9ldVVlqrlJLASTFTeVtt2pIdecvcot9zcjTYKw9YLhA"
                alt="Insight"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-body-md text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
              &ldquo;Understanding quantum physics through 2000s meme lore.&rdquo;
            </p>
          </div>

          {/* Card 2: Trending Format */}
          <div className="absolute top-16 right-[-10px] w-56 glass-panel rounded-2xl p-4 animate-float2 shadow-[0_20px_40px_rgba(90,71,206,0.12)]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <Sparkles className="w-4 h-4 text-secondary" />
              </div>
              <span className="font-label-sm text-xs font-bold text-on-surface">Trending Format</span>
            </div>
            <div className="h-16 rounded-xl mb-2 bg-surface overflow-hidden border border-outline-variant/50">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdZpT3RkWavLP7XqlhVll5RwnD1UV8d-KrfnH4V_VZqGW6sNAjF998qlJIw8RE5iu4zzHuHdQI4-KHWWSBaOqbeVSB4OkuN6ZVqHvAVuyGdNsx3N-SX2P-ceCDi7a1DK5nZyDk2oml1v51AAYdg2ymPRd9RRjeBTf5Ahp4vjYMTIwDaruOvZCSK2TWpCQqgfBt_pV8WcDW9BEuHBgvxAu2bbq70mo9-zky64LDMh5quuAtkpin2WdeBQ"
                alt="Trending"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[10px] font-bold text-primary">#CyberpunkPhilosopher</span>
          </div>

          {/* Card 3: Community Lore */}
          <div className="absolute bottom-4 left-8 w-60 glass-panel rounded-2xl p-3.5 animate-float3 shadow-[0_20px_40px_rgba(90,71,206,0.12)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-label-sm text-xs font-bold text-on-surface">Community Lore</span>
            </div>
            <div className="flex gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container border border-outline-variant text-[10px] font-bold text-on-surface-variant">
                #philosophy
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container border border-outline-variant text-[10px] font-bold text-on-surface-variant">
                #classroom
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Hemisphere: Auth Interface */}
      <div className="w-full md:w-1/2 min-h-screen flex flex-col items-center justify-center p-6 md:p-12 bg-background relative z-10">
        <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-[24px] p-6 md:p-8 shadow-[0_20px_50px_rgba(90,71,206,0.08)] relative overflow-hidden">
          {/* Top Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary-container to-secondary"></div>

          <h2 className="font-headline-md text-2xl font-extrabold text-on-surface mb-6 text-center">
            {tab === "signin" ? "Sign In to Meme Community" : "Create Your Account"}
          </h2>

          {/* Tabs */}
          <div className="flex border-b border-outline-variant mb-6 relative">
            <button
              onClick={() => {
                setTab("signin");
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 pb-3 text-sm font-bold text-center transition-all flex items-center justify-center gap-1.5 ${
                tab === "signin"
                  ? "tab-active border-b-2 border-primary text-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
            <button
              onClick={() => {
                setTab("signup");
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 pb-3 text-sm font-bold text-center transition-all flex items-center justify-center gap-1.5 ${
                tab === "signup"
                  ? "tab-active border-b-2 border-primary text-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Register
            </button>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "signup" && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant block">Handle / Username</label>
                  <div className="relative bg-surface border border-outline-variant rounded-xl input-glow flex items-center px-3 py-1">
                    <User className="w-4 h-4 text-outline mr-2 shrink-0" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="@username"
                      className="w-full bg-transparent border-none text-on-surface focus:ring-0 text-xs py-1.5 placeholder:text-outline outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant block">Display Name (Optional)</label>
                  <div className="relative bg-surface border border-outline-variant rounded-xl input-glow flex items-center px-3 py-1">
                    <User className="w-4 h-4 text-outline mr-2 shrink-0" />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-transparent border-none text-on-surface focus:ring-0 text-xs py-1.5 placeholder:text-outline outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant block">Email Address</label>
              <div className="relative bg-surface border border-outline-variant rounded-xl input-glow flex items-center px-3 py-1">
                <Mail className="w-4 h-4 text-outline mr-2 shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@domain.com"
                  className="w-full bg-transparent border-none text-on-surface focus:ring-0 text-xs py-1.5 placeholder:text-outline outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-on-surface-variant block">Password</label>
                {tab === "signup" && (
                  <span className="text-[10px] text-on-surface-variant">Min. 6 characters</span>
                )}
              </div>
              <div className="relative bg-surface border border-outline-variant rounded-xl input-glow flex items-center px-3 py-1">
                <Lock className="w-4 h-4 text-outline mr-2 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-none text-on-surface focus:ring-0 text-xs py-1.5 placeholder:text-outline outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-on-surface-variant hover:text-on-surface p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Role Selector for Sign Up */}
            {tab === "signup" && (
              <div className="pt-2">
                <label className="text-xs font-bold text-on-surface-variant block mb-2">
                  Account Type:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("student")}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      role === "student"
                        ? "bg-primary-container/70 border-primary text-on-primary-container font-bold shadow-xs"
                        : "bg-surface-container border-outline-variant text-on-surface-variant hover:border-outline"
                    }`}
                  >
                    <Backpack className="w-5 h-5 mb-1 text-primary" />
                    <span className="text-xs font-bold">Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("educator")}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      role === "educator"
                        ? "bg-primary-container/70 border-primary text-on-primary-container font-bold shadow-xs"
                        : "bg-surface-container border-outline-variant text-on-surface-variant hover:border-outline"
                    }`}
                  >
                    <School className="w-5 h-5 mb-1 text-primary" />
                    <span className="text-xs font-bold">Educator / Teacher</span>
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs py-3 rounded-xl transition-all hover:shadow-[0_0_15px_rgba(109,40,217,0.3)] mt-4 disabled:opacity-50 active:scale-95"
            >
              {isLoading
                ? "Authenticating with Supabase..."
                : tab === "signin"
                ? "Sign In to Account"
                : "Create Free Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
