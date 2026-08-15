"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  Image as ImageIcon,
  BarChart2,
  Sparkles,
  Tag,
  X,
  Plus,
  Send,
  Lock,
  LogIn,
  UserPlus,
  Film,
  Upload,
} from "lucide-react";
import { saveClientCustomPost } from "@/lib/data/client-cache";

interface FeedComposerProps {
  onPostCreated: () => void;
}

const CATEGORIES = ["Philosophy", "Tech", "Culture", "Classroom", "Slang", "STEM"];

const PRESET_MEMES = [
  {
    name: "Philosophical Hologram",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUgayW8eGcEd3NHbwVDlpECrSayVBvT-Pdpt9TvK7G1co-SDiYXyUXDVRbpknx0WlLx0HpTvkgpFeh_jqpvvUQwhyMSFFMMUB6SRL0rfWvTGK3jCiR_40n-_R1BELylLXllQA_1oWkN3defrhCUKnenMtp-aFufHV0BFoMKgWy6tXGjNM8ZYCBujml-NWY_HaPze2IOTblCf78qOp7awb58St1NLDNI-jxHZSvQYWNMJNsPVjIjXakKQ",
  },
  {
    name: "Cyberpunk Greek Philosopher",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdZpT3RkWavLP7XqlhVll5RwnD1UV8d-KrfnH4V_VZqGW6sNAjF998qlJIw8RE5iu4zzHuHdQI4-KHWWSBaOqbeVSB4OkuN6ZVqHvAVuyGdNsx3N-SX2P-ceCDi7a1DK5nZyDk2oml1v51AAYdg2ymPRd9RRjeBTf5Ahp4vjYMTIwDaruOvZCSK2TWpCQqgfBt_pV8WcDW9BEuHBgvxAu2bbq70mo9-zky64LDMh5quuAtkpin2WdeBQ",
  },
  {
    name: "Glowing Neural Network",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsj2doa6JzTHTw3L0mGi71KO3GVAEhd5bepfVg0YK64MJsvjg4b-fsvdecUZxAhxijqF6cVe0bo_z7xFD2Hde7AE8KcG0xZXkxm2OddvOSgZtRqBZH86XZDyqq1OJHmDog9zrcCcTRg4uHm9DXyE42Sivc8_MNHcj25JGyT50sXtSxIqPOjwUWV5YgPRQ1jM_co6KRRVb7lx-9ldVVlqrlJLASTFTeVtt2pIdecvcot9zcjTYKw9YLhA",
  },
];

export default function FeedComposer({ onPostCreated }: FeedComposerProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Culture");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [showPresets, setShowPresets] = useState(false);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [pollPermissionWarning, setPollPermissionWarning] = useState<string | null>(null);

  // If user is not authenticated, show modern call to action to Sign In
  if (!user) {
    return (
      <div className="bg-gradient-to-br from-primary/10 via-surface-container to-secondary/10 border border-primary/25 rounded-[20px] p-5 inner-glow mb-4 shadow-sm text-center flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left space-y-1">
          <div className="flex items-center gap-1.5 text-primary font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Join the Meme Community</span>
          </div>
          <p className="text-xs text-on-surface-variant max-w-md leading-relaxed">
            Log in or create an account to post memes, create classroom polls, decode student slang, and vote on trends.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/auth"
            className="bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5" />
            Sign In
          </Link>
          <Link
            href="/auth"
            className="bg-surface-container border border-outline-variant hover:border-primary text-on-surface font-bold text-xs py-2 px-3.5 rounded-xl transition-all flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Register
          </Link>
        </div>
      </div>
    );
  }

  const canCreatePoll = user.role === "educator" || user.role === "admin";

  const handleAddHashtag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const clean = hashtagInput.trim().replace(/^#/, "");
      if (clean && !hashtags.includes(clean)) {
        setHashtags([...hashtags, clean]);
      }
      setHashtagInput("");
    }
  };

  const handleRemoveHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter((t) => t !== tagToRemove));
  };

  const handleAddPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const handlePollOptionChange = (idx: number, val: string) => {
    const next = [...pollOptions];
    next[idx] = val;
    setPollOptions(next);
  };

  const handlePollToggle = () => {
    if (!canCreatePoll) {
      setPollPermissionWarning("Poll creation is reserved for Teachers & Admins. Switch to Educator role to create classroom polls!");
      setTimeout(() => setPollPermissionWarning(null), 4000);
      return;
    }
    setShowPollCreator(!showPollCreator);
  };

  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setVideoUrl(event.target.result as string);
          setShowPresets(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAIEnhance = async () => {
    if (!content.trim()) return;
    setIsEnhancing(true);
    try {
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: content }),
      });
      const data = await res.json();
      if (data.data) {
        const enriched = `${content}\n\n💡 Cultural Context: ${data.data.cultural_context?.slice(0, 140)}...\n🎓 Teacher Tip: ${data.data.teacher_tips?.slice(0, 110)}...`;
        setContent(enriched);
        if (data.data.slang_terms) {
          setHashtags(Array.from(new Set([...hashtags, ...data.data.slang_terms.slice(0, 3)])));
        }
      }
    } catch (e) {
      console.warn("AI enhance error:", e);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const payload: any = {
        action: "create",
        author_name: user.display_name || user.username.replace("@", "") || "Meme Scholar",
        author_handle: user.username || "@scholar",
        author_avatar: user.avatar_url,
        author_role: user.role || "student",
        content: content.trim(),
        image_url: imageUrl.trim() || undefined,
        video_url: videoUrl.trim() || undefined,
        category,
        slang_tags: hashtags,
        userRole: user.role,
        userHandle: user.username,
      };

      if (canCreatePoll && showPollCreator && pollQuestion.trim() && pollOptions.filter((o) => o.trim()).length >= 2) {
        payload.poll_question = pollQuestion.trim();
        payload.poll_options = pollOptions.filter((o) => o.trim());
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          saveClientCustomPost(data.data);
        }
        setContent("");
        setImageUrl("");
        setVideoUrl("");
        setShowPollCreator(false);
        setPollQuestion("");
        setPollOptions(["", ""]);
        setHashtags([]);
        onPostCreated();
      }
    } catch (err) {
      console.error("Composer post error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface-container border border-outline-variant rounded-[20px] p-4 md:p-5 inner-glow mb-4 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Permission Notice if triggered */}
        {pollPermissionWarning && (
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold animate-fadeIn flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            {pollPermissionWarning}
          </div>
        )}

        {/* Top user bar + textarea */}
        <div className="flex gap-3 items-start">
          <img
            src={user.avatar_url}
            alt={user.username}
            className="w-10 h-10 rounded-full object-cover border border-outline-variant shrink-0"
          />

          <div className="flex-1 min-w-0">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                user.role === "educator"
                  ? "Share a classroom meme insight, decode student slang, or create a poll..."
                  : "Drop a meme format, ask what a slang phrase means, or share a trend..."
              }
              rows={3}
              className="w-full bg-transparent text-on-surface text-xs md:text-sm placeholder:text-outline border-none focus:ring-0 resize-none outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Image Attachment Preview */}
        {imageUrl && (
          <div className="relative rounded-xl overflow-hidden border border-outline-variant max-h-52 bg-surface">
            <img src={imageUrl} alt="Attached meme" className="w-full h-52 object-cover" />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1.5 hover:bg-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Video Attachment Preview */}
        {videoUrl && (
          <div className="relative rounded-xl overflow-hidden border border-outline-variant max-h-52 bg-black aspect-video flex items-center justify-center">
            {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
              <div className="text-white text-xs font-bold p-3 text-center">
                🎬 YouTube Video Attached: <span className="underline">{videoUrl}</span>
              </div>
            ) : (
              <video src={videoUrl} controls className="w-full h-full object-contain" />
            )}
            <button
              type="button"
              onClick={() => setVideoUrl("")}
              className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1.5 hover:bg-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Media & Video Chooser Drawer */}
        {showPresets && (
          <div className="p-3.5 bg-surface-container-lowest rounded-xl border border-outline-variant space-y-3 animate-fadeIn">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-on-surface">Attach Media (Image / Video / YouTube):</span>
              <button
                type="button"
                onClick={() => setShowPresets(false)}
                className="text-on-surface-variant hover:text-on-surface p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Video / YouTube Link Input */}
            <div>
              <label className="text-[11px] font-bold text-on-surface-variant block mb-1">
                YouTube URL or Video Link:
              </label>
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=... or https://.../video.mp4"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full bg-surface border border-outline-variant rounded-lg px-2.5 py-1.5 text-xs text-on-surface"
              />
            </div>

            {/* Upload MP4 */}
            <div>
              <label className="flex items-center justify-center gap-2 p-2.5 border border-dashed border-outline-variant hover:border-primary rounded-xl cursor-pointer bg-surface text-xs font-bold text-primary transition-colors">
                <Upload className="w-4 h-4" />
                Upload MP4 / WebM Video File
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/*"
                  onChange={handleVideoFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Preset Images */}
            <div>
              <span className="text-[11px] font-bold text-on-surface-variant block mb-1.5">
                Or choose a meme template image:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {PRESET_MEMES.map((pm, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setImageUrl(pm.url);
                      setShowPresets(false);
                    }}
                    className="cursor-pointer rounded-lg overflow-hidden border border-outline-variant hover:border-primary transition-all relative group"
                  >
                    <img src={pm.url} alt={pm.name} className="h-16 w-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] truncate px-1 text-center font-semibold">
                      {pm.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Interactive Poll Creator Drawer (Educator / Admin only) */}
        {showPollCreator && canCreatePoll && (
          <div className="p-3.5 bg-surface-container-lowest rounded-2xl border border-primary/30 space-y-2.5 animate-fadeIn">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4" />
                Add Classroom Poll (Teacher Feature)
              </span>
              <button
                type="button"
                onClick={() => setShowPollCreator(false)}
                className="text-on-surface-variant hover:text-on-surface p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Poll Question (e.g. Is 'Rizz' still used in your class?)"
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
              className="w-full bg-surface border border-outline-variant rounded-xl px-3 py-1.5 text-xs text-on-surface font-semibold focus:outline-none focus:border-primary"
            />

            <div className="space-y-1.5">
              {pollOptions.map((opt, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Option ${idx + 1}`}
                  value={opt}
                  onChange={(e) => handlePollOptionChange(idx, e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-xl px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              ))}
            </div>

            {pollOptions.length < 4 && (
              <button
                type="button"
                onClick={handleAddPollOption}
                className="text-xs text-primary font-bold hover:underline flex items-center gap-1 pt-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Option
              </button>
            )}
          </div>
        )}

        {/* Category & Hashtags Bar */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`text-[11px] px-2.5 py-0.5 rounded-full border transition-all ${
                category === cat
                  ? "bg-primary text-on-primary border-primary font-bold shadow-xs"
                  : "bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:bg-surface-variant"
              }`}
            >
              #{cat}
            </button>
          ))}

          {/* Added Hashtags */}
          {hashtags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container flex items-center gap-1"
            >
              #{tag}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-600"
                onClick={() => handleRemoveHashtag(tag)}
              />
            </span>
          ))}

          <input
            type="text"
            placeholder="+ tag & enter"
            value={hashtagInput}
            onChange={(e) => setHashtagInput(e.target.value)}
            onKeyDown={handleAddHashtag}
            className="bg-transparent text-[11px] text-on-surface placeholder:text-outline w-24 focus:w-32 transition-all focus:outline-none border-b border-outline-variant/60"
          />
        </div>

        {/* Actions & Submit Row */}
        <div className="flex items-center justify-between pt-2 border-t border-outline-variant/60">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowPresets(!showPresets)}
              className="p-2 text-primary hover:bg-primary-container/20 rounded-xl transition-colors flex items-center gap-1 text-xs font-bold"
              title="Add Image or Video"
            >
              <Film className="w-4 h-4" />
              <span className="hidden sm:inline">Media / Video</span>
            </button>

            <button
              type="button"
              onClick={handlePollToggle}
              className={`p-2 rounded-xl transition-colors flex items-center gap-1 text-xs font-bold ${
                canCreatePoll
                  ? "text-secondary hover:bg-secondary-container/20"
                  : "text-outline hover:bg-surface-variant/40"
              }`}
              title={canCreatePoll ? "Add Poll" : "Teacher/Admin feature"}
            >
              <BarChart2 className="w-4 h-4" />
              <span className="hidden sm:inline">Poll</span>
              {!canCreatePoll && <Lock className="w-3 h-3 ml-0.5 text-outline" />}
            </button>

            <button
              type="button"
              onClick={handleAIEnhance}
              disabled={isEnhancing || !content.trim()}
              className="p-2 text-primary hover:bg-primary-container/20 rounded-xl transition-colors flex items-center gap-1 text-xs font-bold disabled:opacity-50"
              title="Enhance with AI Slang Context"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">{isEnhancing ? "Analyzing..." : "AI Assist"}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-on-surface-variant font-medium">
              {content.length}/500
            </span>
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs py-2 px-5 rounded-xl shadow-md disabled:opacity-50 transition-all flex items-center gap-1.5 active:scale-95 glow-hover"
            >
              <Send className="w-3.5 h-3.5" />
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
