"use client";

import React, { useState } from "react";
import { X, Image as ImageIcon, Sparkles, Wand2, Tag, LogIn, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
}

const CATEGORIES = ["Philosophy", "Tech", "Culture", "Slang", "Classroom", "STEM"];

const PRESET_MEME_IMAGES = [
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

export default function CreatePostModal({ isOpen, onClose, onPostCreated }: CreatePostModalProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Culture");
  const [imageUrl, setImageUrl] = useState("");
  const [showImagePresets, setShowImagePresets] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-md p-6 text-center shadow-2xl space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary-container text-primary flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-on-surface">Authentication Required</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            You must be logged in to create posts and contribute to the Meme Community.
          </p>
          <div className="flex gap-2 pt-2 justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-variant rounded-xl"
            >
              Cancel
            </button>
            <Link
              href="/auth"
              onClick={onClose}
              className="bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs px-5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In / Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        action: "create",
        author_name: user.display_name || user.username.replace("@", "") || "Meme Scholar",
        author_handle: user.username || "@scholar",
        author_avatar: user.avatar_url,
        author_role: user.role || "student",
        content: content.trim(),
        image_url: imageUrl.trim() || undefined,
        category,
        userRole: user.role,
        userHandle: user.username,
      };

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setContent("");
        setImageUrl("");
        if (onPostCreated) onPostCreated();
        onClose();
      }
    } catch (e) {
      console.error("Create post error:", e);
    } finally {
      setIsSubmitting(false);
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
        const enriched = `${content}\n\n💡 Cultural Context: ${data.data.cultural_context?.slice(0, 140)}...\n🎓 Teacher Tip: ${data.data.teacher_tips?.slice(0, 120)}...`;
        setContent(enriched);
      }
    } catch (err) {
      console.warn("Enhance error:", err);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-[20px] w-full max-w-lg overflow-hidden shadow-[0_20px_50px_rgba(109,40,217,0.2)] inner-glow">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-outline-variant bg-surface-container-low">
          <button
            onClick={onClose}
            className="text-on-surface hover:bg-surface-variant rounded-full p-1.5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="font-bold text-on-surface text-sm">Create New Post</span>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !content.trim()}
            className="bg-primary text-on-primary font-label-md text-xs py-1.5 px-4 rounded-full glow-hover transition-all disabled:opacity-50 font-bold shadow-sm"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>

        {/* Body */}
        <div className="p-4 flex gap-3">
          <img
            src={user.avatar_url}
            alt={user.username}
            className="w-10 h-10 rounded-full object-cover border border-outline-variant shrink-0"
          />

          <div className="flex-1 flex flex-col gap-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Synthesize your thoughts, share a meme, or ask for a slang explanation..."
              rows={4}
              className="w-full bg-transparent text-on-surface font-body-md text-sm placeholder:text-outline-variant border-none focus:ring-0 resize-none outline-none"
            />

            {/* Category Tags */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <Tag className="w-3.5 h-3.5 text-on-surface-variant" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                    category === cat
                      ? "bg-primary text-on-primary border-primary font-bold shadow-xs"
                      : "bg-surface-container border-outline-variant text-on-surface-variant hover:bg-surface-variant"
                  }`}
                >
                  #{cat}
                </button>
              ))}
            </div>

            {/* Image Preview if selected */}
            {imageUrl && (
              <div className="relative mt-2 rounded-xl overflow-hidden border border-outline-variant max-h-48 bg-surface">
                <img src={imageUrl} alt="Selected preview" className="w-full h-48 object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 hover:bg-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Presets Gallery Drawer */}
            {showImagePresets && (
              <div className="p-2 bg-surface-container rounded-xl border border-outline-variant/80 mt-2 space-y-1.5">
                <p className="text-[11px] font-bold text-on-surface">Choose a Meme Visual:</p>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_MEME_IMAGES.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setImageUrl(img.url);
                        setShowImagePresets(false);
                      }}
                      className="cursor-pointer group rounded-lg overflow-hidden border border-outline-variant hover:border-primary transition-all relative"
                    >
                      <img src={img.url} alt={img.name} className="h-16 w-full object-cover group-hover:scale-105 transition-transform" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] truncate px-1 text-center">
                        {img.name}
                      </span>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Or paste custom image URL..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-2 py-1 text-xs text-on-surface mt-1"
                />
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Tools */}
        <div className="p-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-low">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowImagePresets(!showImagePresets)}
              className="text-primary hover:bg-primary/10 rounded-full p-2 transition-colors flex items-center gap-1 text-xs font-semibold"
              title="Add Image / Meme"
            >
              <ImageIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Add Media</span>
            </button>

            <button
              type="button"
              onClick={handleAIEnhance}
              disabled={isEnhancing || !content.trim()}
              className="text-primary hover:bg-primary/10 rounded-full p-2 transition-colors flex items-center gap-1 text-xs font-semibold disabled:opacity-50"
              title="Add AI Cultural Analysis"
            >
              <Wand2 className="w-5 h-5" />
              <span className="hidden sm:inline">{isEnhancing ? "Analyzing..." : "AI Context"}</span>
            </button>
          </div>

          <span className="text-[11px] text-on-surface-variant">
            {content.length}/500
          </span>
        </div>
      </div>
    </div>
  );
}
