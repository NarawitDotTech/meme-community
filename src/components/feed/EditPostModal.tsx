"use client";

import React, { useState } from "react";
import { X, Edit3, Save, Tag } from "lucide-react";
import { Post } from "@/lib/data/mock-data";
import { useAuth } from "@/context/AuthContext";

interface EditPostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onPostUpdated: () => void;
}

const CATEGORIES = ["Philosophy", "Tech", "Culture", "Classroom", "Slang", "STEM"];

export default function EditPostModal({ post, isOpen, onClose, onPostUpdated }: EditPostModalProps) {
  const { user } = useAuth();
  const [content, setContent] = useState(post?.content || "");
  const [category, setCategory] = useState(post?.category || "Culture");
  const [imageUrl, setImageUrl] = useState(post?.image_url || "");
  const [hashtagInput, setHashtagInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>(post?.slang_tags || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen || !post) return null;

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "edit",
          postId: post.id,
          content: content.trim(),
          category,
          slang_tags: hashtags,
          image_url: imageUrl.trim() || undefined,
          userRole: user?.role || "student",
          userHandle: user?.username || "@user",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update post");
      }

      onPostUpdated();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-on-surface text-base">Edit Post</h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-variant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-5 space-y-4">
          {errorMsg && (
            <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">Content</label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* Category Chips */}
          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1.5">Category</label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all ${
                    category === cat
                      ? "bg-primary text-on-primary border-primary font-bold shadow-xs"
                      : "bg-surface-container border-outline-variant text-on-surface-variant hover:bg-surface-variant"
                  }`}
                >
                  #{cat}
                </button>
              ))}
            </div>
          </div>

          {/* Hashtags */}
          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1.5">Hashtags</label>
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-surface-container rounded-xl border border-outline-variant">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container flex items-center gap-1"
                >
                  #{tag}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handleRemoveHashtag(tag)} />
                </span>
              ))}
              <input
                type="text"
                placeholder="+ tag & enter"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyDown={handleAddHashtag}
                className="bg-transparent text-xs text-on-surface placeholder:text-outline w-24 focus:outline-none"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">Image URL (Optional)</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-variant"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="bg-primary hover:bg-primary/90 text-on-primary px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
