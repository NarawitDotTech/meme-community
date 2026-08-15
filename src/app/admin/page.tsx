"use client";

import React, { useState, useEffect } from "react";
import {
  INITIAL_VIDEOS,
  INITIAL_MEME_REPORTS,
  INITIAL_USERS,
  INITIAL_POSTS,
  LearningVideo,
  MemeReport,
  UserProfile,
  Post,
} from "@/lib/data/mock-data";
import AddVideoModal from "@/components/admin/AddVideoModal";
import EditVideoModal from "@/components/admin/EditVideoModal";
import EditPostModal from "@/components/feed/EditPostModal";
import {
  School,
  Sparkles,
  Users,
  AlertTriangle,
  Plus,
  Search,
  CheckCircle,
  Clock,
  Trash2,
  Edit,
  BadgeCheck,
  Check,
  X,
  PlayCircle,
  ShieldAlert,
  Lock,
  LogIn,
  Layers,
  MessageSquare,
  Pin,
  Flame,
  CheckCircle2,
  UserCheck,
  UserX,
  Filter,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { markClientPostDeleted } from "@/lib/data/client-cache";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  const [activeAdminTab, setActiveAdminTab] = useState<"videos" | "reports" | "users" | "posts">("videos");
  const [videos, setVideos] = useState<LearningVideo[]>(INITIAL_VIDEOS);
  const [reports, setReports] = useState<MemeReport[]>(INITIAL_MEME_REPORTS);
  const [users, setUsers] = useState<UserProfile[]>(INITIAL_USERS);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  // Searches & Filters
  const [videoSearch, setVideoSearch] = useState<string>("");
  const [userSearch, setUserSearch] = useState<string>("");
  const [postSearch, setPostSearch] = useState<string>("");

  // Modals
  const [isAddVideoOpen, setIsAddVideoOpen] = useState<boolean>(false);
  const [editingVideo, setEditingVideo] = useState<LearningVideo | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchAdminData = async () => {
    try {
      const [vRes, rRes, uRes, pRes] = await Promise.all([
        fetch(`/api/videos?_t=${Date.now()}`, { cache: "no-store", headers: { "Cache-Control": "no-cache, no-store, must-revalidate" } }),
        fetch(`/api/memes?type=reports&_t=${Date.now()}`, { cache: "no-store", headers: { "Cache-Control": "no-cache, no-store, must-revalidate" } }),
        fetch(`/api/admin/users?_t=${Date.now()}`, { cache: "no-store", headers: { "Cache-Control": "no-cache, no-store, must-revalidate" } }),
        fetch(`/api/posts?tab=latest&_t=${Date.now()}`, { cache: "no-store", headers: { "Cache-Control": "no-cache, no-store, must-revalidate" } }),
      ]);
      const vData = await vRes.json();
      const rData = await rRes.json();
      const uData = await uRes.json();
      const pData = await pRes.json();

      if (vData.data) setVideos(vData.data);
      if (rData.data) setReports(rData.data);
      if (uData.data) setUsers(uData.data);
      if (pData.data) setPosts(pData.data);
    } catch (e) {
      console.warn("Failed fetching admin data:", e);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchAdminData();
    }
  }, [user]);

  const showToast = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  // Video Actions
  const handleToggleVideoStatus = async (id: string) => {
    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle-status", id }),
      });
      const data = await res.json();
      if (data.data) {
        setVideos((prev) => prev.map((v) => (v.id === id ? data.data : v)));
        showToast("Video status updated!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this educational video?")) return;
    try {
      await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
      setVideos((prev) => prev.filter((v) => v.id !== id));
      showToast("Video removed from library.");
    } catch (e) {
      console.error(e);
    }
  };

  // Moderation Reports Actions
  const handleResolveReport = async (reportId: string, status: "resolved" | "dismissed") => {
    try {
      await fetch("/api/memes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "resolve-report", reportId, status }),
      });
      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? { ...r, status } : r))
      );
      showToast(`Report marked as ${status}`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteReportedPost = async (report: MemeReport) => {
    if (!confirm(`Admin: Delete reported post?`)) return;
    try {
      if (report.post_id) {
        markClientPostDeleted(report.post_id);
        await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "delete",
            postId: report.post_id,
            userRole: "admin",
          }),
        });
      }
      await handleResolveReport(report.id, "resolved");
      fetchAdminData();
      showToast("Reported post deleted and resolved.");
    } catch (e) {
      console.error(e);
    }
  };

  // User Actions
  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update-role", userId, role: newRole }),
      });
      const data = await res.json();
      if (data.data) {
        setUsers((prev) => prev.map((u) => (u.id === userId ? data.data : u)));
        showToast("User role updated successfully!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleUserActive = async (userId: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle-active", userId }),
      });
      const data = await res.json();
      if (data.data) {
        setUsers((prev) => prev.map((u) => (u.id === userId ? data.data : u)));
        showToast("User status updated.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Post Actions (Admin Direct Moderation)
  const handleTogglePinPost = async (postId: string) => {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_pin", postId, userRole: "admin" }),
      });
      const data = await res.json();
      if (data.data) {
        setPosts((prev) => prev.map((p) => (p.id === postId ? data.data : p)));
        showToast("Post pin status updated!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Admin Action: Delete this community post?")) return;
    try {
      markClientPostDeleted(postId);
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", postId, userRole: "admin" }),
      });
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      showToast("Post deleted from community feed.");
    } catch (e) {
      console.error(e);
    }
  };

  // Filtering
  const filteredVideos = videos.filter(
    (v) =>
      v.title.toLowerCase().includes(videoSearch.toLowerCase()) ||
      v.category.toLowerCase().includes(videoSearch.toLowerCase()) ||
      v.module_code.toLowerCase().includes(videoSearch.toLowerCase())
  );

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.role.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredPosts = posts.filter(
    (p) =>
      p.content.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.author_handle.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.category?.toLowerCase().includes(postSearch.toLowerCase())
  );

  // If not admin, show locking overlay
  if (!user || user.role !== "admin") {
    return (
      <div className="w-full min-h-screen flex items-center justify-center p-4">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-8 max-w-md w-full text-center shadow-2xl space-y-4 inner-glow animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h3 className="font-headline-md text-2xl font-extrabold text-on-surface">
            Admin Access Required
          </h3>
          <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
            This area is restricted to system administrators. Please sign in with an authorized admin account.
          </p>
          <div className="pt-2">
            <Link
              href="/auth"
              className="bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs py-2.5 px-6 rounded-xl inline-flex items-center gap-2 shadow-sm transition-all"
            >
              <LogIn className="w-4 h-4" />
              Sign In as Admin
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const pendingReportsCount = reports.filter((r) => r.status === "pending").length;
  const publishedVideosCount = videos.filter((v) => v.status === "published").length;

  return (
    <div className="flex-1 p-4 md:p-8 xl:p-12 max-w-[1280px] mx-auto w-full flex flex-col gap-8 relative pb-28 lg:pb-12">
      {/* Subtle radial glow background */}
      <div className="absolute top-[-10%] left-[50%] -translate-x-[50%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Success Toast */}
      {actionSuccess && (
        <div className="fixed top-5 right-5 z-50 bg-primary text-on-primary font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4" />
          {actionSuccess}
        </div>
      )}

      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display-sm text-2xl md:text-3xl font-extrabold text-on-surface">
              System Control & Admin
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
              🛡️ Super Admin Access
            </span>
          </div>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-1">
            Manage educational curriculum, resolve teacher/student reports, and regulate user privileges.
          </p>
        </div>

        <button
          onClick={() => setIsAddVideoOpen(true)}
          className="primary-btn flex items-center gap-2 shadow-sm font-bold active:scale-95 bg-primary hover:bg-primary/90 text-on-primary py-2.5 px-4 rounded-xl text-xs"
        >
          <Plus className="w-4 h-4" />
          Add Video Module
        </button>
      </header>

      {/* Top Interactive KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Videos Stat */}
        <div
          onClick={() => setActiveAdminTab("videos")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeAdminTab === "videos"
              ? "bg-primary-container/40 border-primary shadow-sm"
              : "bg-surface-container-lowest border-outline-variant hover:border-primary/50"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-on-surface-variant">Videos & Curriculum</span>
            <PlayCircle className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-extrabold text-on-surface">{videos.length}</div>
          <span className="text-[11px] text-on-surface-variant">
            {publishedVideosCount} Published • {videos.length - publishedVideosCount} Drafts
          </span>
        </div>

        {/* Reports Stat */}
        <div
          onClick={() => setActiveAdminTab("reports")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeAdminTab === "reports"
              ? "bg-amber-50 border-amber-400 shadow-sm"
              : "bg-surface-container-lowest border-outline-variant hover:border-amber-400/50"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-on-surface-variant">Moderation Queue</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-on-surface">{pendingReportsCount}</div>
          <span className="text-[11px] text-amber-700 font-semibold">
            {pendingReportsCount > 0 ? "Requires Review" : "All Clear"}
          </span>
        </div>

        {/* Users Stat */}
        <div
          onClick={() => setActiveAdminTab("users")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeAdminTab === "users"
              ? "bg-blue-50 border-blue-400 shadow-sm"
              : "bg-surface-container-lowest border-outline-variant hover:border-blue-400/50"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-on-surface-variant">Total Members</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-on-surface">{users.length}</div>
          <span className="text-[11px] text-on-surface-variant">
            {users.filter((u) => u.role === "educator").length} Teachers • {users.filter((u) => u.role === "student").length} Students
          </span>
        </div>

        {/* Posts Stat */}
        <div
          onClick={() => setActiveAdminTab("posts")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            activeAdminTab === "posts"
              ? "bg-purple-50 border-purple-400 shadow-sm"
              : "bg-surface-container-lowest border-outline-variant hover:border-purple-400/50"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-on-surface-variant">Forum Posts</span>
            <MessageSquare className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-on-surface">{posts.length}</div>
          <span className="text-[11px] text-on-surface-variant">
            {posts.filter((p) => p.is_pinned).length} Pinned Posts
          </span>
        </div>
      </div>

      {/* Admin Tab Navigation Bar */}
      <div className="flex border-b border-outline-variant gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveAdminTab("videos")}
          className={`pb-3 px-4 flex items-center gap-1.5 transition-all border-b-2 ${
            activeAdminTab === "videos"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <PlayCircle className="w-4 h-4" />
          Video Curriculum ({videos.length})
        </button>

        <button
          onClick={() => setActiveAdminTab("reports")}
          className={`pb-3 px-4 flex items-center gap-1.5 transition-all border-b-2 ${
            activeAdminTab === "reports"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          Moderation Queue ({reports.length})
        </button>

        <button
          onClick={() => setActiveAdminTab("users")}
          className={`pb-3 px-4 flex items-center gap-1.5 transition-all border-b-2 ${
            activeAdminTab === "users"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <Users className="w-4 h-4" />
          User Roles ({users.length})
        </button>

        <button
          onClick={() => setActiveAdminTab("posts")}
          className={`pb-3 px-4 flex items-center gap-1.5 transition-all border-b-2 ${
            activeAdminTab === "posts"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Feed Posts ({posts.length})
        </button>
      </div>

      {/* Tab 1: Video Curriculum Manager */}
      {activeAdminTab === "videos" && (
        <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div>
              <h3 className="font-headline-md text-lg font-bold text-on-surface">
                Educational Video Library
              </h3>
              <p className="text-xs text-on-surface-variant">
                Manage lesson curriculum, slide decks, and publication states
              </p>
            </div>

            <div className="relative w-full sm:w-[280px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search videos & modules..."
                value={videoSearch}
                onChange={(e) => setVideoSearch(e.target.value)}
                className="bg-surface-container border border-outline-variant rounded-xl py-2 pl-9 pr-3 text-on-surface text-xs focus:outline-none focus:border-primary w-full"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-xs">
              <thead>
                <tr className="border-b border-outline-variant text-left text-on-surface-variant font-bold">
                  <th className="pb-3 w-[40%]">Title</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Views</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50">
                {filteredVideos.map((video) => (
                  <tr
                    key={video.id}
                    className="group hover:bg-surface-container/40 transition-colors"
                  >
                    <td className="py-3 pr-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-surface-variant rounded-xl flex-shrink-0 overflow-hidden border border-outline-variant/60">
                          <img
                            src={video.thumbnail_url}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-on-surface text-xs">
                            {video.title}
                          </div>
                          <div className="text-[11px] text-on-surface-variant">
                            {video.module_code} • {video.duration} • {video.level}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3">
                      <span className="bg-surface-container border border-outline-variant text-on-surface-variant rounded-full px-2.5 py-0.5 text-[10px] font-bold">
                        {video.category}
                      </span>
                    </td>

                    <td className="py-3">
                      <button
                        onClick={() => handleToggleVideoStatus(video.id)}
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-all flex items-center gap-1 ${
                          video.status === "published"
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                            : "bg-amber-50 border-amber-300 text-amber-800"
                        }`}
                        title="Click to toggle status"
                      >
                        {video.status === "published" ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Published
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 text-amber-600" />
                            Draft
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3 text-on-surface-variant font-semibold">
                      {video.views}
                    </td>

                    <td className="py-3 text-right space-x-1">
                      <button
                        onClick={() => setEditingVideo(video)}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary-container/20 transition-colors"
                        title="Edit Module"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteVideo(video.id)}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Module"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Tab 2: Moderation Review Queue */}
      {activeAdminTab === "reports" && (
        <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm flex flex-col animate-fadeIn">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-outline-variant">
            <div>
              <h3 className="font-headline-md text-base font-bold text-on-surface flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Moderation & Removal Review Queue
              </h3>
              <p className="text-xs text-on-surface-variant">
                Teacher removal requests and student safety flags
              </p>
            </div>
            <span className="text-xs text-primary font-bold">
              {pendingReportsCount} Pending Review
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {reports.length === 0 ? (
              <p className="text-xs text-on-surface-variant italic text-center py-8">
                No moderation reports in queue.
              </p>
            ) : (
              reports.map((report) => (
                <div
                  key={report.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-surface-container border border-outline-variant gap-3"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-on-surface">
                        {report.trend_name}
                      </div>
                      <div className="text-[11px] text-on-surface-variant mt-0.5">
                        <strong>Reason:</strong> {report.reason}
                      </div>
                      <div className="text-[10px] text-outline mt-0.5">
                        Flagged by: {report.reported_by} ({report.reported_by_role}) • {report.created_at}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {report.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleDeleteReportedPost(report)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                          title="Delete post and resolve"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete Post
                        </button>
                        <button
                          onClick={() => handleResolveReport(report.id, "resolved")}
                          className="p-1.5 bg-emerald-100 text-emerald-800 rounded-xl hover:bg-emerald-200 transition-colors"
                          title="Approve / Keep"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleResolveReport(report.id, "dismissed")}
                          className="p-1.5 bg-surface-container-highest text-on-surface rounded-xl hover:bg-surface-variant transition-colors"
                          title="Dismiss"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full capitalize ${
                        report.status === "resolved" ? "bg-emerald-100 text-emerald-800" : "bg-surface-variant text-on-surface-variant"
                      }`}>
                        {report.status}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {/* Tab 3: User Role Management */}
      {activeAdminTab === "users" && (
        <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm flex flex-col animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-2 border-b border-outline-variant">
            <div>
              <h3 className="font-headline-md text-base font-bold text-on-surface flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                User Roles & Account Privileges
              </h3>
              <p className="text-xs text-on-surface-variant">
                Change user roles (Student, Educator, Admin) and toggle account activation
              </p>
            </div>

            <div className="relative w-full sm:w-[260px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="bg-surface-container border border-outline-variant rounded-xl py-2 pl-9 pr-3 text-on-surface text-xs focus:outline-none focus:border-primary w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredUsers.map((usr) => (
              <div
                key={usr.id}
                className="flex items-center justify-between p-3 rounded-xl bg-surface-container border border-outline-variant gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={usr.avatar_url}
                    alt={usr.username}
                    className="w-10 h-10 rounded-full object-cover border border-outline-variant shrink-0"
                  />
                  <div className="truncate">
                    <div className="font-bold text-xs text-on-surface flex items-center gap-1 truncate">
                      {usr.display_name || usr.username}
                      <span className="text-[10px] font-normal text-on-surface-variant">{usr.username}</span>
                    </div>
                    <div className="text-[11px] text-on-surface-variant truncate">
                      {usr.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    aria-label={`Role for ${usr.username}`}
                    value={usr.role}
                    onChange={(e) => handleUpdateRole(usr.id, e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant text-on-surface text-xs rounded-xl px-2.5 py-1.5 font-bold focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="student">🎒 Student</option>
                    <option value="educator">🎓 Educator</option>
                    <option value="admin">🛡️ Admin</option>
                  </select>

                  <button
                    onClick={() => handleToggleUserActive(usr.id)}
                    title={usr.is_active ? "Active Account (Click to suspend)" : "Suspended (Click to activate)"}
                    className={`p-1.5 rounded-xl border transition-all ${
                      usr.is_active
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                        : "bg-red-50 border-red-300 text-red-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
                    }`}
                  >
                    {usr.is_active ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab 4: Direct Community Post Moderation */}
      {activeAdminTab === "posts" && (
        <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm flex flex-col animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-2 border-b border-outline-variant">
            <div>
              <h3 className="font-headline-md text-base font-bold text-on-surface flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Community Post Moderation
              </h3>
              <p className="text-xs text-on-surface-variant">
                Pin quality educational content or delete policy-violating posts
              </p>
            </div>

            <div className="relative w-full sm:w-[260px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search posts..."
                value={postSearch}
                onChange={(e) => setPostSearch(e.target.value)}
                className="bg-surface-container border border-outline-variant rounded-xl py-2 pl-9 pr-3 text-on-surface text-xs focus:outline-none focus:border-primary w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {filteredPosts.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-xl bg-surface-container border border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <img
                    src={p.author_avatar}
                    alt={p.author_name}
                    className="w-9 h-9 rounded-full object-cover border border-outline-variant shrink-0 mt-0.5"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-xs text-on-surface">{p.author_name}</span>
                      <span className="text-[11px] text-on-surface-variant">{p.author_handle}</span>
                      <span className="text-[10px] font-bold px-2 py-0.2 bg-primary-container text-on-primary-container rounded">
                        {p.category}
                      </span>
                      {p.is_pinned && (
                        <span className="text-[10px] font-bold px-2 py-0.2 bg-purple-100 text-purple-900 rounded flex items-center gap-0.5">
                          <Pin className="w-2.5 h-2.5" /> Pinned
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface mt-1 line-clamp-2">{p.content}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleTogglePinPost(p.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 ${
                      p.is_pinned
                        ? "bg-purple-100 border-purple-300 text-purple-900"
                        : "bg-surface-container-lowest border-outline-variant text-on-surface hover:border-primary"
                    }`}
                  >
                    <Pin className="w-3.5 h-3.5" />
                    {p.is_pinned ? "Unpin" : "Pin"}
                  </button>

                  <button
                    onClick={() => setEditingPost(p)}
                    className="p-1.5 rounded-xl bg-surface-container-lowest border border-outline-variant text-on-surface hover:text-primary hover:border-primary transition-all"
                    title="Edit Post"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeletePost(p.id)}
                    className="p-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 transition-all"
                    title="Delete Post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Add Video Modal */}
      {isAddVideoOpen && (
        <AddVideoModal
          isOpen={isAddVideoOpen}
          onClose={() => setIsAddVideoOpen(false)}
          onVideoAdded={() => {
            fetchAdminData();
            showToast("Educational module added!");
          }}
        />
      )}

      {/* Edit Video Modal */}
      {editingVideo && (
        <EditVideoModal
          isOpen={!!editingVideo}
          video={editingVideo}
          onClose={() => setEditingVideo(null)}
          onVideoUpdated={() => {
            fetchAdminData();
            showToast("Educational module updated!");
          }}
        />
      )}

      {/* Edit Post Modal */}
      {editingPost && (
        <EditPostModal
          isOpen={!!editingPost}
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onPostUpdated={() => {
            fetchAdminData();
            showToast("Post updated!");
          }}
        />
      )}
    </div>
  );
}
