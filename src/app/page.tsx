"use client";

import React, { useState, useEffect } from "react";
import PostCard from "@/components/feed/PostCard";
import FeedComposer from "@/components/feed/FeedComposer";
import TrendingSidebar from "@/components/feed/TrendingSidebar";
import CreatePostModal from "@/components/feed/CreatePostModal";
import ProfileModal from "@/components/feed/ProfileModal";
import { INITIAL_POSTS, Post, UserProfile, INITIAL_USERS } from "@/lib/data/mock-data";
import { useAuth } from "@/context/AuthContext";
import {
  Sparkles,
  RefreshCw,
  Search,
  Users,
  Compass,
  Bookmark,
  Clock,
  Plus,
  Flame,
  User,
} from "lucide-react";

import { filterActivePosts } from "@/lib/data/client-cache";

export default function HomeFeedPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [trendingTags, setTrendingTags] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"foryou" | "following" | "latest" | "saved">("foryou");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Profile modal state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [selectedProfileUser, setSelectedProfileUser] = useState<UserProfile | null>(null);

  // Load client cache on initial mount
  useEffect(() => {
    setPosts(filterActivePosts(INITIAL_POSTS));
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const url = new URL("/api/posts", window.location.origin);
      url.searchParams.set("tab", activeTab);
      if (activeCategory !== "All") url.searchParams.set("category", activeCategory);
      if (searchQuery) url.searchParams.set("search", searchQuery);

      // Pass user session data for dynamic tab filtering
      if (user?.username) {
        url.searchParams.set("user_handle", user.username);
      }
      if (user?.following_handles && user.following_handles.length > 0) {
        url.searchParams.set("following_handles", JSON.stringify(user.following_handles));
      }
      if (user?.bookmarked_post_ids && user.bookmarked_post_ids.length > 0) {
        url.searchParams.set("bookmarked_ids", JSON.stringify(user.bookmarked_post_ids));
      }

      url.searchParams.set("_t", Date.now().toString());

      const res = await fetch(url.toString(), {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      });
      const data = await res.json();
      if (data.data && Array.isArray(data.data)) {
        setPosts(filterActivePosts(data.data));
      }
      if (data.trendingTags && Array.isArray(data.trendingTags)) {
        setTrendingTags(data.trendingTags);
      }
    } catch (e) {
      console.warn("Feed fetch fallback:", e);
      setPosts(filterActivePosts(INITIAL_POSTS));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    const handleUpdate = () => fetchPosts();
    window.addEventListener("posts-updated", handleUpdate);
    return () => window.removeEventListener("posts-updated", handleUpdate);
  }, [activeTab, activeCategory, searchQuery, user?.following_handles, user?.bookmarked_post_ids, user?.username]);

  const handleOpenAuthorProfile = (handle: string) => {
    const found = INITIAL_USERS.find((u) => u.username.toLowerCase() === handle.toLowerCase()) || {
      id: `u-${handle}`,
      username: handle,
      display_name: handle.replace("@", ""),
      email: `${handle.replace("@", "")}@memecommunity.edu`,
      role: "student",
      avatar_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw",
      is_active: true,
      bio: "Meme Community member.",
      followers_count: 15,
      following_count: 8,
      following_handles: [],
      bookmarked_post_ids: [],
      liked_post_ids: [],
      created_at: new Date().toISOString(),
    };
    setSelectedProfileUser(found);
    setIsProfileModalOpen(true);
  };

  return (
    <div className="flex justify-center w-full min-h-screen">
      {/* Main Feed Column */}
      <div className="w-full max-w-[680px] flex flex-col min-h-screen border-x border-outline-variant/70 bg-background">
        {/* Sticky Feed Top Header with Tabs */}
        <div className="sticky top-0 z-30 glass-panel border-b border-outline-variant shadow-xs">
          {/* Header Row */}
          <div className="px-4 py-3 flex justify-between items-center border-b border-outline-variant/50">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-md text-xl md:text-2xl font-extrabold text-on-background tracking-tight">
                Meme Forum
              </h2>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container">
                Live Feed
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchPosts}
                title="Refresh Feed"
                className="p-2 text-on-surface-variant hover:text-primary rounded-xl hover:bg-surface-variant transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-on-primary font-bold text-xs py-1.5 px-3.5 rounded-xl glow-hover flex items-center gap-1 shadow-sm active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Post</span>
              </button>
            </div>
          </div>

          {/* Feed Filter Navigation Tabs */}
          <div className="flex items-center justify-around text-xs font-bold border-b border-outline-variant/60">
            <button
              onClick={() => setActiveTab("foryou")}
              className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === "foryou"
                  ? "border-primary text-primary bg-primary/5 font-extrabold"
                  : "border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>For You</span>
            </button>

            <button
              onClick={() => setActiveTab("following")}
              className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === "following"
                  ? "border-primary text-primary bg-primary/5 font-extrabold"
                  : "border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Following</span>
            </button>

            <button
              onClick={() => setActiveTab("latest")}
              className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === "latest"
                  ? "border-primary text-primary bg-primary/5 font-extrabold"
                  : "border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Latest</span>
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === "saved"
                  ? "border-primary text-primary bg-primary/5 font-extrabold"
                  : "border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved</span>
            </button>
          </div>

          {/* Search & Category Pills Bar */}
          <div className="px-4 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <div className="relative shrink-0 w-36 sm:w-44">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="text"
                placeholder="Search memes & slang..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-full pl-8 pr-3 py-1 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
              />
            </div>

            {["All", "Philosophy", "Tech", "Culture", "Classroom", "Slang"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-all border ${
                  activeCategory === cat
                    ? "bg-primary text-on-primary border-primary font-bold shadow-xs"
                    : "bg-surface-container border-outline-variant text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Feed Content Container */}
        <div className="p-3 md:p-4 pb-28 md:pb-12 space-y-4">
          {/* Inline Composer */}
          <FeedComposer onPostCreated={() => fetchPosts()} />

          {/* Feed Posts */}
          {isLoading && posts.length === 0 ? (
            /* Skeleton Loaders */
            [1, 2].map((i) => (
              <article
                key={i}
                className="bg-surface-container border border-outline-variant rounded-[18px] p-5 animate-pulse space-y-3"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-variant shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-surface-variant rounded"></div>
                    <div className="h-3 w-full bg-surface-variant rounded"></div>
                    <div className="h-3 w-4/5 bg-surface-variant rounded"></div>
                  </div>
                </div>
                <div className="h-44 w-full bg-surface-variant rounded-xl"></div>
              </article>
            ))
          ) : posts.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16 px-4 bg-surface-container-lowest rounded-2xl border border-outline-variant space-y-3 shadow-xs animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-primary-container mx-auto flex items-center justify-center text-primary">
                {activeTab === "saved" ? (
                  <Bookmark className="w-6 h-6" />
                ) : activeTab === "following" ? (
                  <Users className="w-6 h-6" />
                ) : (
                  <Compass className="w-6 h-6" />
                )}
              </div>
              <h3 className="font-bold text-base text-on-surface">
                {activeTab === "saved"
                  ? "No Bookmarked Posts"
                  : activeTab === "following"
                  ? "No Posts from Followed Users"
                  : "No memes found"}
              </h3>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                {activeTab === "saved"
                  ? "Bookmark interesting slang breakdowns or curriculum memes to review them here anytime!"
                  : activeTab === "following"
                  ? "Follow fellow educators and students to see their latest meme updates right here."
                  : "No posts match your filters. Be the first to start the conversation!"}
              </p>
              {activeTab !== "foryou" && (
                <button
                  onClick={() => {
                    setActiveTab("foryou");
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                  className="bg-primary text-on-primary text-xs font-bold px-4 py-2 rounded-xl hover:bg-primary/90 transition-all shadow-sm"
                >
                  Return to For You Feed
                </button>
              )}
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPostUpdate={() => fetchPosts()}
                onDeletePost={() => fetchPosts()}
                onOpenProfile={(handle) => handleOpenAuthorProfile(handle)}
              />
            ))
          )}
        </div>
      </div>

      {/* Right Column: Trending Sidebar */}
      <TrendingSidebar
        trendingTags={trendingTags}
        onSelectTag={(tag) => setSearchQuery(tag.replace("#", ""))}
        onOpenMyProfile={() => {
          setSelectedProfileUser(user);
          setIsProfileModalOpen(true);
        }}
      />

      {/* Create Post Modal */}
      {isModalOpen && (
        <CreatePostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onPostCreated={() => fetchPosts()}
        />
      )}

      {/* User Profile Modal */}
      {isProfileModalOpen && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          targetUser={selectedProfileUser}
          posts={posts}
          onPostUpdate={() => fetchPosts()}
        />
      )}
    </div>
  );
}
