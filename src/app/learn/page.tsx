"use client";

import React, { useState, useEffect } from "react";
import { INITIAL_VIDEOS, LearningVideo } from "@/lib/data/mock-data";
import VideoPlayerModal from "@/components/learn/VideoPlayerModal";
import AILessonGeneratorModal from "@/components/learn/AILessonGeneratorModal";
import { Search, Play, Bot, Sparkles, Filter, BookOpen, Lock, LogIn, UserPlus, Plus, Video } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

import { filterActiveVideos } from "@/lib/data/client-cache";
import AddVideoModal from "@/components/admin/AddVideoModal";

const CATEGORIES = ["All Courses", "Classroom", "Technology", "Memes", "Slang", "Culture", "Foundations"];

export default function LearningCenterPage() {
  const { user } = useAuth();
  const [videos, setVideos] = useState<LearningVideo[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All Courses");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedVideo, setSelectedVideo] = useState<LearningVideo | null>(null);
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState<boolean>(false);
  const [isAddVideoOpen, setIsAddVideoOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setVideos(filterActiveVideos(INITIAL_VIDEOS));
  }, []);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const url = new URL("/api/videos", window.location.origin);
      if (activeCategory !== "All Courses") url.searchParams.set("category", activeCategory);
      if (searchQuery) url.searchParams.set("search", searchQuery);

      url.searchParams.set("_t", Date.now().toString());

      const res = await fetch(url.toString(), {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
      const data = await res.json();
      if (data.data) {
        setVideos(filterActiveVideos(data.data));
      }
    } catch (e) {
      console.warn("Failed to fetch videos from API:", e);
      setVideos(filterActiveVideos(INITIAL_VIDEOS));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();

    const interval = setInterval(() => {
      fetchVideos();
    }, 10000);

    const handleFocus = () => fetchVideos();
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, [activeCategory, searchQuery]);

  const canManageVideos = user?.role === "educator" || user?.role === "admin";

  return (
    <div className="relative w-full min-h-screen">
      {/* Locking Overlay if not logged in */}
      {!user && (
        <div className="absolute inset-0 z-30 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 md:p-8 max-w-md w-full text-center shadow-2xl space-y-4 animate-fadeIn inner-glow">
            <div className="w-14 h-14 rounded-2xl bg-primary-container text-primary flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="font-headline-md text-xl md:text-2xl font-extrabold text-on-surface">
              Unlock Learning Center
            </h3>
            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Sign in or create an account to access video curriculum modules, teacher guides, and the OpenAI Lesson Plan Generator.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pt-2 justify-center">
              <Link
                href="/auth"
                className="bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs py-2.5 px-5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
              <Link
                href="/auth"
                className="bg-surface-container border border-outline-variant hover:border-primary text-on-surface font-bold text-xs py-2.5 px-5 rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className={`w-full max-w-[1280px] mx-auto p-4 md:p-8 space-y-8 pb-28 lg:pb-12 ${!user ? "filter blur-[2px] pointer-events-none select-none" : ""}`}>
        {/* Hero Banner Section */}
        <section className="hero-gradient rounded-3xl p-8 md:p-12 border border-outline-variant relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-md">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/80 border border-primary/30 text-on-primary-container text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Teacher & Student Literacy Hub
            </div>
            <h2 className="font-display-lg text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              Level Up Your <span className="text-primary">Internet IQ</span>
            </h2>
            <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-xl leading-relaxed">
              Master the nuances of digital culture, dissect trending formats, and become fluent in modern memeology to create empathetic, highly-engaging classrooms.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsAIGeneratorOpen(true)}
                className="bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 glow-hover transition-all active:scale-95"
              >
                <Bot className="w-4 h-4" />
                Launch AI Lesson Generator
              </button>

              {canManageVideos && (
                <button
                  onClick={() => setIsAddVideoOpen(true)}
                  className="bg-surface-container-lowest border border-outline-variant hover:border-primary text-on-surface font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4 text-primary" />
                  Add Video Module
                </button>
              )}
            </div>
          </div>

          <div className="hidden lg:block relative z-10 w-48 h-48 rounded-full bg-primary-container/50 blur-3xl absolute right-12"></div>
          <div className="hidden lg:block relative z-10 w-32 h-32 rounded-full bg-secondary-container/60 blur-2xl absolute right-32 top-8"></div>
        </section>

        {/* Filter & Search Bar */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-label-md text-xs font-bold transition-all border ${
                  activeCategory === cat
                    ? "bg-primary border-primary text-on-primary shadow-sm"
                    : "bg-surface-container border-outline-variant text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-auto relative group">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lessons & slang..."
              className="w-full md:w-72 pl-10 pr-4 py-2.5 bg-surface-container border border-outline-variant rounded-xl text-on-surface font-body-md text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-outline"
            />
          </div>
        </section>

        {/* Video Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <article
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden card-lift group cursor-pointer shadow-sm flex flex-col"
            >
              <div className="relative h-48 w-full bg-surface-container overflow-hidden">
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg text-primary">
                    <Play className="w-6 h-6 fill-primary ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-bold text-white">
                  {video.duration}
                </span>
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-white">
                  {video.module_code}
                </span>
              </div>

              <div className="p-5 border-t border-outline-variant flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-md text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {video.title}
                  </h3>
                  <p className="font-body-md text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/40">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-surface-container border border-outline-variant text-[11px] font-bold text-on-surface-variant">
                      {video.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-surface-container border border-outline-variant text-[11px] font-bold text-on-surface-variant">
                      {video.level}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-primary">
                    Watch Lesson &rarr;
                  </span>
                </div>
              </div>
            </article>
          ))}

          {/* AI Meme Video Generator Card */}
          <article className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden relative group shadow-sm flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-transparent pointer-events-none"></div>
            
            <div className="relative h-48 w-full border-b border-outline-variant flex flex-col items-center justify-center bg-surface-container overflow-hidden">
              <Bot className="w-16 h-16 text-primary mb-2 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 right-4 bg-primary-container text-on-primary-container border border-primary/30 px-3 py-1 rounded-full text-[10px] font-extrabold pulse-glow shadow-xs">
                Live AI Tool
              </div>
              <span className="text-xs font-bold text-on-surface">Interactive Educator Studio</span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-headline-md text-base font-bold text-on-surface mb-2">
                  AI Meme Video & Lesson Generator
                </h3>
                <p className="font-body-md text-xs text-on-surface-variant mb-4 leading-relaxed">
                  Generate highly contextual, trend-aware lesson outlines, slide scripts, and formative quiz checks powered by OpenAI for your classroom.
                </p>
              </div>

              <button
                onClick={() => setIsAIGeneratorOpen(true)}
                className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                Open AI Lesson Studio
              </button>
            </div>
          </article>
        </section>

        {/* Video Modal Player */}
        {selectedVideo && (
          <VideoPlayerModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}

        {/* AI Lesson Generator Modal */}
        {isAIGeneratorOpen && (
          <AILessonGeneratorModal
            isOpen={isAIGeneratorOpen}
            onClose={() => setIsAIGeneratorOpen(false)}
          />
        )}

        {/* Add Video Module Modal */}
        {isAddVideoOpen && (
          <AddVideoModal
            isOpen={isAddVideoOpen}
            onClose={() => setIsAddVideoOpen(false)}
            onVideoAdded={(newVideo) => {
              setVideos((prev) => [newVideo, ...prev.filter((v) => v.id !== newVideo.id)]);
              fetchVideos();
            }}
          />
        )}
      </div>
    </div>
  );
}
