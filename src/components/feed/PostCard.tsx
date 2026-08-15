"use client";

import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Share2,
  BadgeCheck,
  Send,
  MoreHorizontal,
  Trash2,
  Sparkles,
  School,
  GraduationCap,
  HelpCircle,
  Check,
  CheckCircle2,
  UserPlus,
  UserCheck,
  ExternalLink,
  X,
  Pin,
  Edit3,
  ShieldAlert,
  Flag,
  LogIn,
  Play,
  Lock,
} from "lucide-react";
import { Post, CommentItem } from "@/lib/data/mock-data";
import { useAuth } from "@/context/AuthContext";
import EditPostModal from "./EditPostModal";
import RequestRemoveModal from "./RequestRemoveModal";
import Link from "next/link";
import { parseVideoSource } from "@/components/learn/VideoPlayerModal";
import { markClientPostDeleted } from "@/lib/data/client-cache";

interface PostCardProps {
  post: Post;
  onPostUpdate?: () => void;
  onDeletePost?: (postId: string) => void;
  onOpenProfile?: (authorHandle: string) => void;
}

export default function PostCard({
  post,
  onPostUpdate,
  onDeletePost,
  onOpenProfile,
}: PostCardProps) {
  const { user, toggleFollow, isFollowingUser, toggleBookmark, isPostBookmarked } = useAuth();

  const [isLiked, setIsLiked] = useState<boolean>(!!post.is_liked);
  const [likesCount, setLikesCount] = useState<number>(post.likes_count);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    user ? isPostBookmarked(post.id) || !!post.is_bookmarked : !!post.is_bookmarked
  );
  const [bookmarksCount, setBookmarksCount] = useState<number>(post.bookmarks_count || 0);
  const [isReposted, setIsReposted] = useState<boolean>(!!post.is_reposted);
  const [sharesCount, setSharesCount] = useState<number>(post.shares_count);
  const [isPinned, setIsPinned] = useState<boolean>(!!post.is_pinned);

  const isFollowing = user ? isFollowingUser(post.author_handle) : false;
  const [followersCount, setFollowersCount] = useState<number>(post.author_followers || 12);

  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentItem[]>(post.comments || []);
  const [newCommentText, setNewCommentText] = useState<string>("");
  const [isSubmittingComment, setIsSubmittingComment] = useState<boolean>(false);

  const [showSlangBreakdown, setShowSlangBreakdown] = useState<boolean>(false);
  const [showAuthorProfile, setShowAuthorProfile] = useState<boolean>(false);
  const [showLightbox, setShowLightbox] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRequestRemoveOpen, setIsRequestRemoveOpen] = useState(false);

  // Poll State
  const [poll, setPoll] = useState(post.poll);
  const [isVoting, setIsVoting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const requireAuth = (): boolean => {
    if (!user) {
      showToast("Please sign in to like, comment, or interact with posts!");
      return false;
    }
    return true;
  };

  // Permission Logic:
  // - Admin can delete ANY post (pinned or not)
  // - Author can delete their own post
  // - Admin can pin/unpin
  const isOwner =
    user?.username && post.author_handle.toLowerCase() === user.username.toLowerCase();
  const isAdmin = user?.role === "admin";
  const isTeacher = user?.role === "educator";

  const canEdit = user && (isOwner || isAdmin);
  const canDelete = Boolean(user && (isOwner || isAdmin));
  const canPin = Boolean(user && isAdmin);
  const canRequestRemove = Boolean(user && !isAdmin);

  const handleLike = async () => {
    if (!requireAuth()) return;
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikesCount((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like", postId: post.id, userHandle: user?.username }),
      });
      if (onPostUpdate) onPostUpdate();
    } catch (e) {
      console.warn("Like error:", e);
    }
  };

  const handleBookmark = async () => {
    if (!requireAuth()) return;
    const nextBookmarked = !isBookmarked;
    setIsBookmarked(nextBookmarked);
    toggleBookmark(post.id);
    setBookmarksCount((prev) => (nextBookmarked ? prev + 1 : Math.max(0, prev - 1)));
    showToast(nextBookmarked ? "Post saved to your bookmarks!" : "Post removed from bookmarks.");

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "bookmark", postId: post.id, userHandle: user?.username }),
      });
      if (onPostUpdate) onPostUpdate();
    } catch (e) {
      console.warn("Bookmark error:", e);
    }
  };

  const handleRepost = async () => {
    if (!requireAuth()) return;
    const nextReposted = !isReposted;
    setIsReposted(nextReposted);
    setSharesCount((prev) => (nextReposted ? prev + 1 : Math.max(0, prev - 1)));
    showToast(nextReposted ? "Amplified to community feed!" : "Amplification undone.");

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "repost", postId: post.id, userHandle: user?.username }),
      });
      if (onPostUpdate) onPostUpdate();
    } catch (e) {
      console.warn("Repost error:", e);
    }
  };

  const handleVotePoll = async (optionId: string) => {
    if (!requireAuth()) return;
    if (!poll || isVoting) return;
    setIsVoting(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "vote_poll", postId: post.id, optionId, userHandle: user?.username }),
      });
      const data = await res.json();
      if (data.data?.poll) {
        setPoll(data.data.poll);
        showToast("Vote recorded!");
      }
    } catch (e) {
      console.warn("Poll vote error:", e);
    } finally {
      setIsVoting(false);
    }
  };

  const handleFollowToggle = () => {
    if (!requireAuth()) return;
    toggleFollow(post.author_handle);
    const nextFollow = !isFollowing;
    setFollowersCount((prev) => (nextFollow ? prev + 1 : Math.max(0, prev - 1)));
    showToast(nextFollow ? `Following ${post.author_handle}` : `Unfollowed ${post.author_handle}`);
    if (onPostUpdate) onPostUpdate();
  };

  const handleTogglePin = async () => {
    if (!canPin) return;
    const nextPinned = !isPinned;
    setIsPinned(nextPinned);
    showToast(nextPinned ? "Post pinned to top of feed!" : "Post unpinned.");

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggle_pin",
          postId: post.id,
          userRole: user?.role,
        }),
      });
      if (onPostUpdate) onPostUpdate();
    } catch (e) {
      console.warn("Pin error:", e);
    }
  };

  const handleDelete = async () => {
    if (!requireAuth()) return;
    if (!canDelete) {
      showToast("Only the post author or an Admin can delete this post.");
      return;
    }

    const confirmMsg = isAdmin && !isOwner
      ? `Admin Action: Permanently delete post by ${post.author_handle}?`
      : "Are you sure you want to permanently delete your post?";

    if (!confirm(confirmMsg)) return;

    try {
      markClientPostDeleted(post.id);
      if (onDeletePost) onDeletePost(post.id);

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          postId: post.id,
          userRole: user?.role,
          userHandle: user?.username,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast("Post permanently removed.");
        window.dispatchEvent(new Event("posts-updated"));
      } else {
        showToast(data.error || "Failed to delete post.");
      }
    } catch (e) {
      console.warn("Delete error:", e);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireAuth()) return;
    if (!newCommentText.trim()) return;

    setIsSubmittingComment(true);
    const commentPayload = {
      action: "comment",
      postId: post.id,
      author_name: user?.display_name || user?.username.replace("@", "") || "Scholar",
      author_handle: user?.username || "@scholar",
      author_avatar: user?.avatar_url,
      author_role: user?.role || "student",
      content: newCommentText.trim(),
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentPayload),
      });
      const data = await res.json();
      if (data.comment) {
        setComments((prev) => [...prev, data.comment]);
        showToast("Comment added!");
      }
      setNewCommentText("");
      if (onPostUpdate) onPostUpdate();
    } catch (e) {
      console.warn("Comment error:", e);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!requireAuth()) return;
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const nextLiked = !c.is_liked;
          return {
            ...c,
            is_liked: nextLiked,
            likes_count: nextLiked ? (c.likes_count || 0) + 1 : Math.max(0, (c.likes_count || 0) - 1),
          };
        }
        return c;
      })
    );

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like_comment", postId: post.id, commentId, userHandle: user?.username }),
      });
    } catch (e) {
      console.warn("Like comment error:", e);
    }
  };

  const hasVideo = post.video_url || (post.image_url && (post.image_url.includes(".mp4") || post.image_url.includes("youtube.com") || post.image_url.includes("youtu.be")));
  const postVideoSrc = hasVideo ? parseVideoSource(post.video_url || post.image_url) : null;

  return (
    <article className="bg-surface-container border border-outline-variant rounded-[18px] p-4 md:p-5 inner-glow transition-all hover:border-outline duration-200 relative group">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-2 right-4 z-30 bg-on-background text-background text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg animate-fadeIn flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
          <span>{toastMessage}</span>
          {!user && (
            <Link href="/auth" className="underline text-primary ml-1 font-extrabold">
              Sign In
            </Link>
          )}
        </div>
      )}

      {/* Pinned Post Badge */}
      {isPinned && (
        <div className="flex items-center justify-between text-[11px] font-bold text-primary mb-2.5 pb-1 border-b border-outline-variant/40">
          <div className="flex items-center gap-1.5">
            <Pin className="w-3.5 h-3.5 fill-primary" />
            <span>Pinned Post</span>
          </div>
          {isAdmin && (
            <span className="text-[10px] text-on-surface-variant font-normal">
              Admin Moderation Enabled
            </span>
          )}
        </div>
      )}

      <div className="flex gap-3 md:gap-4 items-start">
        {/* Author Avatar */}
        <div className="relative shrink-0">
          <img
            src={post.author_avatar}
            alt={post.author_name}
            onClick={() => {
              if (onOpenProfile) onOpenProfile(post.author_handle);
              else setShowAuthorProfile(!showAuthorProfile);
            }}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border border-outline-variant cursor-pointer hover:scale-105 transition-transform"
          />

          {/* Author Popover Profile Card */}
          {showAuthorProfile && (
            <div className="absolute top-12 left-0 z-40 w-64 bg-surface-container-lowest border border-outline-variant rounded-2xl p-4 shadow-2xl space-y-3 animate-fadeIn">
              <div className="flex justify-between items-start">
                <img
                  src={post.author_avatar}
                  alt={post.author_name}
                  className="w-12 h-12 rounded-full object-cover border border-outline-variant"
                />
                {!isOwner && (
                  <button
                    onClick={handleFollowToggle}
                    className={`text-xs font-bold px-3 py-1 rounded-full border transition-all flex items-center gap-1 ${
                      isFollowing
                        ? "bg-surface-container border-outline-variant text-on-surface hover:bg-red-50 hover:border-red-200 hover:text-red-700"
                        : "bg-primary text-on-primary border-primary hover:bg-primary/90"
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5" /> Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" /> Follow
                      </>
                    )}
                  </button>
                )}
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-bold text-sm text-on-surface">{post.author_name}</h4>
                  {post.is_verified && <BadgeCheck className="w-3.5 h-3.5 text-primary" />}
                </div>
                <p className="text-xs text-on-surface-variant">{post.author_handle}</p>
              </div>

              <p className="text-xs text-on-surface leading-relaxed">
                {post.author_bio || "Educator & meme community member."}
              </p>

              <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant pt-1 border-t border-outline-variant/60">
                <span>
                  <strong className="text-on-surface">{followersCount.toLocaleString()}</strong> Followers
                </span>
                <span className="capitalize px-2 py-0.5 rounded-full bg-primary-container/60 text-on-primary-container text-[10px] font-bold">
                  {post.author_role}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Post Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 flex-wrap min-w-0">
              <span
                onClick={() => {
                  if (onOpenProfile) onOpenProfile(post.author_handle);
                  else setShowAuthorProfile(!showAuthorProfile);
                }}
                className="font-bold text-sm text-on-surface truncate cursor-pointer hover:underline"
              >
                {post.author_name}
              </span>
              {post.is_verified && (
                <span title="Verified Scholar" className="inline-flex items-center">
                  <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
                </span>
              )}
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  post.author_role === "educator"
                    ? "bg-purple-100 text-purple-900 border border-purple-300"
                    : post.author_role === "admin"
                    ? "bg-rose-100 text-rose-900 border border-rose-300"
                    : "bg-blue-100 text-blue-900 border border-blue-300"
                }`}
              >
                {post.author_role === "educator" ? "🎓 Educator" : post.author_role === "admin" ? "🛡️ Admin" : "🎒 Student"}
              </span>
              <span className="text-xs text-on-surface-variant shrink-0">
                {post.author_handle} • {post.created_at}
              </span>
            </div>

            {/* Post Context Menu */}
            <div className="relative shrink-0">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-variant transition-colors"
                title="Post Actions"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-6 z-30 w-52 bg-surface-container-lowest border border-outline-variant rounded-xl p-1.5 shadow-xl space-y-1 text-xs animate-fadeIn">
                  {/* Share Link */}
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      showToast("Link copied to clipboard!");
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-surface-container flex items-center gap-2 text-on-surface"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Copy Link
                  </button>

                  {/* Decode Slang */}
                  {post.slang_breakdown && (
                    <button
                      onClick={() => {
                        setShowSlangBreakdown(!showSlangBreakdown);
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-surface-container flex items-center gap-2 text-primary font-bold"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Decode Slang
                    </button>
                  )}

                  {/* Pin to Top (Admin only) */}
                  {canPin && (
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        handleTogglePin();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-surface-container flex items-center gap-2 text-primary font-bold"
                    >
                      <Pin className="w-3.5 h-3.5" />
                      {isPinned ? "Unpin from Top" : "Pin to Top (Admin)"}
                    </button>
                  )}

                  {/* Edit Post (Author or Admin) */}
                  {canEdit && (
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        setIsEditModalOpen(true);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-surface-container flex items-center gap-2 text-on-surface font-semibold"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-primary" />
                      Edit Post
                    </button>
                  )}

                  {/* Request Remove (Teacher/Student feature) */}
                  {canRequestRemove && (
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        setIsRequestRemoveOpen(true);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-amber-50 flex items-center gap-2 text-amber-800 font-semibold"
                    >
                      <Flag className="w-3.5 h-3.5 text-amber-600" />
                      Request Removal
                    </button>
                  )}

                  {/* Delete Post (Author or Admin) */}
                  {canDelete ? (
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        handleDelete();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-red-50 text-red-600 font-bold flex items-center gap-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {isAdmin && !isOwner ? "Delete Post (Admin)" : "Delete Post"}
                    </button>
                  ) : (
                    <div className="px-2.5 py-1 text-[10px] text-outline italic border-t border-outline-variant/50 pt-1 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-outline" />
                      {!user ? "Sign in as Admin to delete" : "Delete requires Author or Admin"}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Body Text */}
          <p className="text-xs md:text-sm text-on-surface mb-3 whitespace-pre-line leading-relaxed">
            {post.content}
          </p>

          {/* Hashtag / Slang Pills */}
          {post.slang_tags && post.slang_tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap mb-3">
              {post.slang_tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-surface-container-high border border-outline-variant text-primary hover:bg-primary-container transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Interactive Poll Component */}
          {poll && (
            <div className="mb-4 p-3.5 bg-surface-container-lowest border border-outline-variant rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-primary" />
                  {poll.question}
                </span>
                <span className="text-[11px] text-on-surface-variant font-normal">
                  {poll.total_votes.toLocaleString()} votes
                </span>
              </div>

              <div className="space-y-2">
                {poll.options.map((option) => {
                  const hasVoted = !!poll.user_voted_option;
                  const isSelected = poll.user_voted_option === option.id;
                  const percentage =
                    poll.total_votes > 0
                      ? Math.round((option.votes / poll.total_votes) * 100)
                      : 0;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={isVoting}
                      onClick={() => handleVotePoll(option.id)}
                      className={`relative w-full text-left p-2.5 rounded-xl border text-xs overflow-hidden transition-all flex items-center justify-between ${
                        isSelected
                          ? "border-primary bg-primary/5 font-bold text-primary"
                          : "border-outline-variant/70 hover:border-primary/60 bg-surface text-on-surface"
                      }`}
                    >
                      {hasVoted && (
                        <div
                          className={`absolute inset-y-0 left-0 transition-all duration-500 opacity-20 ${
                            isSelected ? "bg-primary" : "bg-on-surface-variant"
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      )}

                      <span className="relative z-10 flex items-center gap-2">
                        {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                        {option.text}
                      </span>

                      {hasVoted && (
                        <span className="relative z-10 font-bold text-[11px]">
                          {percentage}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real Video Attachment (YouTube or MP4) */}
          {postVideoSrc && (
            <div className="rounded-2xl overflow-hidden border border-outline-variant mb-3 bg-black aspect-video max-h-[380px] flex items-center justify-center">
              {postVideoSrc.type === "youtube" ? (
                <iframe
                  src={postVideoSrc.src}
                  title="Post video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-none"
                ></iframe>
              ) : (
                <video
                  src={postVideoSrc.src}
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                >
                  Your browser does not support HTML5 video.
                </video>
              )}
            </div>
          )}

          {/* Meme Image Attachment (if not video) */}
          {!hasVideo && post.image_url && (
            <div
              onClick={() => setShowLightbox(true)}
              className="rounded-2xl overflow-hidden border border-outline-variant mb-3 bg-surface-container-lowest max-h-[440px] flex items-center justify-center cursor-pointer group/img relative"
            >
              <img
                src={post.image_url}
                alt="Meme visual"
                className="w-full h-auto object-cover max-h-[440px] group-hover/img:scale-[1.01] transition-transform duration-300"
              />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover/img:opacity-100 transition-opacity">
                Click to expand
              </div>
            </div>
          )}

          {/* AI Slang Decoder Drawer */}
          {post.slang_breakdown && post.slang_breakdown.length > 0 && (
            <div className="mb-3">
              <button
                type="button"
                onClick={() => setShowSlangBreakdown(!showSlangBreakdown)}
                className="text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-container/40 border border-primary/20 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                {showSlangBreakdown ? "Hide Slang Guide" : "🧠 Teacher's Slang Breakdown"}
              </button>

              {showSlangBreakdown && (
                <div className="mt-2 p-3 bg-surface-container-lowest border border-primary/30 rounded-xl space-y-2 text-xs animate-fadeIn">
                  {post.slang_breakdown.map((item, i) => (
                    <div key={i} className="space-y-0.5 pb-2 border-b border-outline-variant/40 last:border-none last:pb-0">
                      <span className="font-bold text-primary block">
                        Term: &ldquo;{item.term}&rdquo;
                      </span>
                      <p className="text-on-surface">{item.definition}</p>
                      <p className="text-on-surface-variant text-[11px] italic">
                        💡 <strong>For Classroom:</strong> {item.for_teachers}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Actions Footer Bar */}
          <div className="flex items-center justify-between text-on-surface-variant pr-1 pt-2 border-t border-outline-variant/50">
            {/* Likes */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 transition-all p-1.5 rounded-xl hover:bg-rose-50 ${
                isLiked ? "text-rose-600 font-bold" : "hover:text-rose-600"
              }`}
              title="Like post"
            >
              <Heart
                className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${
                  isLiked ? "fill-rose-600 text-rose-600 scale-110" : ""
                }`}
              />
              <span className="text-xs font-semibold">{likesCount.toLocaleString()}</span>
            </button>

            {/* Comments */}
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1.5 hover:text-primary transition-colors p-1.5 rounded-xl hover:bg-primary-container/20"
              title="Comments"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs font-semibold">{comments.length}</span>
            </button>

            {/* Repost */}
            <button
              onClick={handleRepost}
              className={`flex items-center gap-1.5 transition-colors p-1.5 rounded-xl hover:bg-emerald-50 ${
                isReposted ? "text-emerald-600 font-bold" : "hover:text-emerald-600"
              }`}
              title="Amplify / Repost"
            >
              <Repeat2 className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs font-semibold">{sharesCount}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={handleBookmark}
              className={`flex items-center gap-1.5 transition-colors p-1.5 rounded-xl hover:bg-amber-50 ${
                isBookmarked ? "text-amber-600 font-bold" : "hover:text-amber-600"
              }`}
              title="Bookmark post"
            >
              <Bookmark
                className={`w-4 h-4 md:w-5 md:h-5 ${isBookmarked ? "fill-amber-500 text-amber-500" : ""}`}
              />
              <span className="text-xs font-semibold">{bookmarksCount}</span>
            </button>

            {/* Share */}
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast("Post link copied!");
              }}
              className="p-1.5 rounded-xl hover:text-primary hover:bg-primary-container/20 transition-colors"
              title="Share link"
            >
              <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Comments Thread Drawer */}
          {showComments && (
            <div className="mt-4 pt-3 border-t border-outline-variant/60 flex flex-col gap-3 animate-fadeIn">
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {comments.length === 0 ? (
                  <p className="text-xs text-on-surface-variant italic py-1 text-center">
                    No comments yet. Share your thoughts or ask for a meme breakdown!
                  </p>
                ) : (
                  comments.map((c) => (
                    <div
                      key={c.id}
                      className="bg-surface-container-lowest p-3 rounded-2xl border border-outline-variant/60 flex gap-2.5 text-xs group/cmt"
                    >
                      <img
                        src={c.author_avatar}
                        alt={c.author_name}
                        className="w-7 h-7 rounded-full object-cover border border-outline-variant shrink-0 mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-on-surface">{c.author_name}</span>
                            <span className="text-[10px] text-on-surface-variant">{c.author_handle}</span>
                            <span className="text-[10px] text-outline">• {c.created_at}</span>
                          </div>
                          <button
                            onClick={() => handleLikeComment(c.id)}
                            className={`flex items-center gap-1 text-[11px] p-1 rounded hover:bg-rose-50 transition-colors ${
                              c.is_liked ? "text-rose-600 font-bold" : "text-on-surface-variant"
                            }`}
                          >
                            <Heart className={`w-3 h-3 ${c.is_liked ? "fill-rose-600" : ""}`} />
                            <span>{c.likes_count || 0}</span>
                          </button>
                        </div>
                        <p className="text-on-surface text-xs leading-relaxed">{c.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment Input */}
              {user ? (
                <form onSubmit={handleAddComment} className="flex gap-2 items-center pt-1">
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Reply or share context..."
                    className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl px-3.5 py-2 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingComment || !newCommentText.trim()}
                    className="bg-primary hover:bg-primary/90 text-on-primary p-2.5 rounded-xl text-xs font-bold disabled:opacity-50 transition-all shrink-0 active:scale-95 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="pt-2 text-center">
                  <Link
                    href="/auth"
                    className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    Sign in to leave a comment
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {showLightbox && post.image_url && (
        <div
          onClick={() => setShowLightbox(false)}
          className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center">
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-black transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={post.image_url}
              alt="Expanded view"
              className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Edit Post Modal */}
      {isEditModalOpen && (
        <EditPostModal
          post={post}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onPostUpdated={() => {
            showToast("Post updated!");
            if (onPostUpdate) onPostUpdate();
          }}
        />
      )}

      {/* Request Remove Modal */}
      {isRequestRemoveOpen && (
        <RequestRemoveModal
          post={post}
          isOpen={isRequestRemoveOpen}
          onClose={() => setIsRequestRemoveOpen(false)}
          onReportSubmitted={(msg) => showToast(msg)}
        />
      )}
    </article>
  );
}
