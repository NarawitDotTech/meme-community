"use client";

import React, { useState } from "react";
import { X, Play, Pause, CheckCircle2, Bookmark, Share2, Youtube, Video as VideoIcon, ExternalLink } from "lucide-react";
import { LearningVideo } from "@/lib/data/mock-data";

interface VideoPlayerModalProps {
  video: LearningVideo | null;
  onClose: () => void;
}

export function parseVideoSource(url?: string): { type: "youtube" | "html5"; src: string } {
  if (!url || !url.trim()) {
    // Default educational YouTube meme analysis video
    return {
      type: "youtube",
      src: "https://www.youtube-nocookie.com/embed/kYJydzP-x_0?autoplay=1&rel=0",
    };
  }

  const cleanUrl = url.trim();

  // YouTube matchers: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID, youtube.com/shorts/ID
  const ytMatch = cleanUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/
  );

  if (ytMatch && ytMatch[1]) {
    return {
      type: "youtube",
      src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    };
  }

  // Otherwise assume HTML5 direct video (MP4, WebM, Blob, data-url)
  return {
    type: "html5",
    src: cleanUrl,
  };
}

export default function VideoPlayerModal({ video, onClose }: VideoPlayerModalProps) {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "notes">("overview");

  if (!video) return null;

  const videoSource = parseVideoSource(video.video_url);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-surface-container-lowest border border-outline-variant rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-3.5 md:p-4 border-b border-outline-variant bg-surface-container-low">
          <div className="flex items-center gap-2 truncate pr-4">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container shrink-0">
              {video.module_code}
            </span>
            <h3 className="font-headline-md text-sm md:text-base font-bold text-on-surface truncate">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors p-1.5 rounded-full hover:bg-surface-variant shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real Video Player Container */}
        <div className="aspect-video w-full bg-black relative flex items-center justify-center overflow-hidden">
          {videoSource.type === "youtube" ? (
            <iframe
              src={videoSource.src}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-none"
            ></iframe>
          ) : (
            <video
              src={videoSource.src}
              controls
              autoPlay
              playsInline
              poster={video.thumbnail_url}
              className="w-full h-full object-contain"
            >
              Your browser does not support HTML5 video playback.
            </video>
          )}
        </div>

        {/* Video Details & Curriculum Tabs */}
        <div className="p-4 md:p-6 bg-surface-container-low overflow-y-auto flex-1 space-y-4">
          {/* Channel / Instructor Bar */}
          <div className="flex items-center justify-between gap-4 flex-wrap pb-3 border-b border-outline-variant/60">
            <div className="flex items-center gap-3">
              <img
                src={video.instructor_avatar}
                alt={video.instructor_name}
                className="w-10 h-10 rounded-full object-cover border border-outline-variant"
              />
              <div>
                <p className="font-label-md text-sm font-bold text-on-surface">
                  {video.instructor_name}
                </p>
                <p className="font-label-sm text-xs text-on-surface-variant">
                  {video.instructor_subscribers} • {video.views} views
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`px-4 py-2 rounded-xl font-label-md text-xs font-bold transition-all shadow-sm ${
                  isSubscribed
                    ? "bg-surface-variant text-on-surface border border-outline"
                    : "bg-primary text-on-primary hover:bg-primary/90"
                }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 border-b border-outline-variant text-xs font-bold">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Overview & Breakdown
            </button>
            <button
              onClick={() => setActiveTab("curriculum")}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === "curriculum"
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Curriculum Roadmap
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === "notes"
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Educator Tips
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-3 text-xs text-on-surface-variant leading-relaxed">
              <p>{video.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                <div className="p-2.5 bg-surface-container rounded-xl border border-outline-variant/60">
                  <span className="font-bold text-on-surface block mb-0.5">Category</span>
                  <span>{video.category}</span>
                </div>
                <div className="p-2.5 bg-surface-container rounded-xl border border-outline-variant/60">
                  <span className="font-bold text-on-surface block mb-0.5">Difficulty</span>
                  <span>{video.level}</span>
                </div>
                <div className="p-2.5 bg-surface-container rounded-xl border border-outline-variant/60">
                  <span className="font-bold text-on-surface block mb-0.5">Duration</span>
                  <span>{video.duration}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "curriculum" && (
            <div className="space-y-2">
              {(video.curriculum || [
                "Origins and early emergence on Reddit/TikTok",
                "Visual anatomy and meme formats",
                "Semantic shifts and cultural adaptation",
                "Classroom discussion guide",
              ]).map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 bg-surface-container rounded-xl border border-outline-variant/50 text-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-bold text-on-surface">Step {idx + 1}:</span>
                  <span className="text-on-surface-variant">{step}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "notes" && (
            <div className="p-3 bg-primary-container/30 border border-primary/20 rounded-xl space-y-2 text-xs text-on-surface">
              <p className="font-bold text-primary flex items-center gap-1">
                <Bookmark className="w-4 h-4" />
                Teaching Takeaways:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-on-surface-variant">
                <li>Use this video as a 5-minute warm-up before literature or media analysis units.</li>
                <li>Encourage students to create their own academic memes as an alternative assessment.</li>
                <li>Emphasize internet safety, digital footprint, and respectful humor.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
