"use client";

import React, { useState } from "react";
import { X, Plus, Video, Upload, Youtube, CheckCircle2, Film } from "lucide-react";
import { LearningVideo } from "@/lib/data/mock-data";

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoAdded?: (video: LearningVideo) => void;
}

export default function AddVideoModal({ isOpen, onClose, onVideoAdded }: AddVideoModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<any>("Slang");
  const [level, setLevel] = useState<any>("Beginner");
  const [duration, setDuration] = useState("10:00");
  const [moduleCode, setModuleCode] = useState("Module 1.2");
  const [status, setStatus] = useState<any>("published");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploadMode, setUploadMode] = useState<"url" | "file">("url");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setVideoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        action: "create",
        title: title.trim(),
        description: description.trim(),
        category,
        level,
        duration,
        module_code: moduleCode,
        status,
        video_url: videoUrl.trim() || "https://www.youtube.com/watch?v=kYJydzP-x_0",
        thumbnail_url: thumbnailUrl.trim() || undefined,
      };

      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.data && onVideoAdded) {
        onVideoAdded(data.data);
      }
      onClose();
    } catch (err) {
      console.error("Add video error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <h3 className="font-bold text-on-surface text-base flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            Add Educational Module / Video
          </h3>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-variant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="text-xs font-bold text-on-surface block mb-1">Module Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Navigating Multi-Layered Post-Irony"
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          {/* Video Source Picker: YouTube URL vs MP4 Upload */}
          <div className="space-y-2 p-3 bg-surface-container rounded-2xl border border-outline-variant">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-primary" />
                Video Source (YouTube / MP4)
              </label>
              <div className="flex gap-1 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setUploadMode("url")}
                  className={`px-2.5 py-0.5 rounded-lg transition-all ${
                    uploadMode === "url"
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-lowest text-on-surface-variant"
                  }`}
                >
                  Link (YouTube/MP4)
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode("file")}
                  className={`px-2.5 py-0.5 rounded-lg transition-all ${
                    uploadMode === "file"
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-lowest text-on-surface-variant"
                  }`}
                >
                  Upload MP4
                </button>
              </div>
            </div>

            {uploadMode === "url" ? (
              <div className="relative">
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... or https://.../video.mp4"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            ) : (
              <div>
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-outline-variant hover:border-primary rounded-xl cursor-pointer bg-surface-container-lowest transition-colors">
                  <Upload className="w-6 h-6 text-primary mb-1" />
                  <span className="text-xs font-bold text-on-surface">
                    {uploadedFileName ? uploadedFileName : "Click or drag MP4 video here"}
                  </span>
                  <span className="text-[10px] text-on-surface-variant mt-0.5">
                    Supports .mp4, .webm (HTML5 direct player)
                  </span>
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="Foundations">Foundations</option>
                <option value="Slang">Slang</option>
                <option value="Memes">Memes</option>
                <option value="Culture">Culture</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">Module Code</label>
              <input
                type="text"
                value={moduleCode}
                onChange={(e) => setModuleCode(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="12:30"
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface block mb-1">Thumbnail Image URL (Optional)</label>
            <input
              type="url"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface block mb-1">Description / Syllabus</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Educational overview of this video module..."
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary resize-none"
            ></textarea>
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
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-on-primary px-5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Module"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
