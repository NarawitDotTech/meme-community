import { NextRequest, NextResponse } from "next/server";
import { Post, MemeReport } from "@/lib/data/mock-data";
import {
  getPostsAsync,
  savePostsAsync,
  getBookmarksAsync,
  saveBookmarksAsync,
  getReportsAsync,
  saveReportsAsync,
} from "@/lib/data/storage";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const tab = searchParams.get("tab") || "foryou";
  const search = searchParams.get("search");
  const followingHandlesParam = searchParams.get("following_handles");
  const bookmarkedIdsParam = searchParams.get("bookmarked_ids");
  const userHandleParam = searchParams.get("user_handle");
  const authorHandle = searchParams.get("author");

  let allPosts = await getPostsAsync();
  let userBookmarks = await getBookmarksAsync();
  let filtered = [...allPosts];

  // Filter by author profile if requested
  if (authorHandle) {
    filtered = filtered.filter((p) => p.author_handle.toLowerCase() === authorHandle.toLowerCase());
    return NextResponse.json({ success: true, data: filtered });
  }

  // Category filter
  if (category && category.toLowerCase() !== "all") {
    filtered = filtered.filter(
      (p) => p.category?.toLowerCase() === category.toLowerCase()
    );
  }

  // Search filter
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.content.toLowerCase().includes(q) ||
        p.author_name.toLowerCase().includes(q) ||
        p.author_handle.toLowerCase().includes(q) ||
        p.slang_tags?.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Tab filtering & sorting
  if (tab === "following") {
    let followingList: string[] = [];
    if (followingHandlesParam) {
      try {
        followingList = JSON.parse(followingHandlesParam);
      } catch (e) {
        followingList = followingHandlesParam.split(",");
      }
    }
    const cleanFollowList = followingList.map((h) => h.toLowerCase().trim());
    if (userHandleParam) {
      cleanFollowList.push(userHandleParam.toLowerCase().trim());
    }
    filtered = filtered.filter(
      (p) =>
        p.is_following_author ||
        cleanFollowList.includes(p.author_handle.toLowerCase().trim())
    );
  } else if (tab === "saved") {
    let savedList: string[] = [];
    if (bookmarkedIdsParam) {
      try {
        savedList = JSON.parse(bookmarkedIdsParam);
      } catch (e) {
        savedList = bookmarkedIdsParam.split(",");
      }
    }
    if (userHandleParam && userBookmarks[userHandleParam.toLowerCase()]) {
      savedList = Array.from(new Set([...savedList, ...userBookmarks[userHandleParam.toLowerCase()]]));
    }
    filtered = filtered.filter((p) => p.is_bookmarked || savedList.includes(p.id));
  } else if (tab === "latest") {
    // Newest posts first (already prepended at index 0)
    filtered.sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return 0; // preserve newest-first insertion order
    });
  } else {
    // "For You" - Pinned posts first, then newest/trending posts
    filtered.sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return 0; // preserve newest-first order so fresh posts appear right below pinned posts
    });
  }

  // Extract real dynamic trending hashtags from existing posts
  const tagCounts: { [tag: string]: number } = {};
  allPosts.forEach((p) => {
    p.slang_tags?.forEach((t) => {
      const clean = t.replace(/^#/, "");
      tagCounts[clean] = (tagCounts[clean] || 0) + 1;
    });
  });

  const dynamicTrending = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag, count], i) => ({
      id: i + 1,
      tag: `#${tag}`,
      category: "Community Trend",
      count: `${count} ${count === 1 ? "Post" : "Posts"}`,
    }));

  return NextResponse.json({
    success: true,
    data: filtered,
    trendingTags: dynamicTrending,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, userRole, userHandle } = body;

    let posts = await getPostsAsync();
    let userBookmarks = await getBookmarksAsync();
    let reports = await getReportsAsync();

    // 1. CREATE POST (Must be authenticated)
    if (action === "create") {
      const {
        author_name,
        author_handle,
        author_avatar,
        author_role,
        content,
        image_url,
        video_url,
        category,
        slang_tags,
        poll_question,
        poll_options,
      } = body;

      const creatorHandle = userHandle || author_handle;
      if (!creatorHandle) {
        return NextResponse.json(
          { error: "Authentication required: Please sign in to create posts." },
          { status: 401 }
        );
      }

      if (!content) {
        return NextResponse.json({ error: "Content is required" }, { status: 400 });
      }

      // Check poll permission: Only Educator or Admin can attach polls
      let pollData = undefined;
      if (poll_question && Array.isArray(poll_options) && poll_options.length >= 2) {
        if (author_role === "educator" || author_role === "admin" || userRole === "educator" || userRole === "admin") {
          pollData = {
            id: `poll-${Date.now()}`,
            question: poll_question,
            options: poll_options.map((opt: string, i: number) => ({
              id: `opt-${i + 1}`,
              text: opt,
              votes: 0,
            })),
            total_votes: 0,
          };
        }
      }

      const newPost: Post = {
        id: `post-${Date.now()}`,
        author_name: author_name || "Scholar",
        author_handle: creatorHandle,
        author_avatar:
          author_avatar ||
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw",
        author_role: author_role || userRole || "student",
        author_bio: author_role === "educator" ? "Educator sharing classroom insights." : "Student contributor.",
        author_followers: 10,
        is_following_author: false,
        is_verified: author_role === "educator" || author_role === "admin" || userRole === "educator" || userRole === "admin",
        content,
        image_url: image_url || undefined,
        video_url: video_url || undefined,
        category: category || "Culture",
        slang_tags: slang_tags || [],
        poll: pollData,
        likes_count: 0,
        comments_count: 0,
        shares_count: 0,
        bookmarks_count: 0,
        created_at: "Just now",
        is_liked: false,
        is_bookmarked: false,
        is_reposted: false,
        is_pinned: false,
        comments: [],
      };

      posts = [newPost, ...posts];
      await savePostsAsync(posts);
      return NextResponse.json({ success: true, data: newPost });
    }

    // 2. EDIT POST (Author or Admin)
    if (action === "edit") {
      const { postId, content, category, slang_tags, image_url, video_url } = body;
      const target = posts.find((p) => p.id === postId);

      if (!target) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      const isOwner = userHandle && target.author_handle.toLowerCase() === userHandle.toLowerCase();
      const isAdmin = userRole === "admin";

      if (!isOwner && !isAdmin) {
        return NextResponse.json(
          { error: "Unauthorized: You can only edit your own posts." },
          { status: 403 }
        );
      }

      posts = posts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            content: content !== undefined ? content : p.content,
            category: category !== undefined ? category : p.category,
            slang_tags: slang_tags !== undefined ? slang_tags : p.slang_tags,
            image_url: image_url !== undefined ? image_url : p.image_url,
            video_url: video_url !== undefined ? video_url : p.video_url,
          };
        }
        return p;
      });

      await savePostsAsync(posts);
      const updated = posts.find((p) => p.id === postId);
      return NextResponse.json({ success: true, data: updated });
    }

    // 3. DELETE POST (Student/Educator can delete own, Admin can remove ANY post)
    if (action === "delete") {
      const { postId } = body;
      const target = posts.find((p) => p.id === postId);

      if (!target) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      const isOwner = userHandle && target.author_handle.toLowerCase() === userHandle.toLowerCase();
      const isAdmin = userRole === "admin";

      if (!isOwner && !isAdmin) {
        return NextResponse.json(
          { error: "Unauthorized: Only the author or an Admin can delete this post." },
          { status: 403 }
        );
      }

      posts = posts.filter((p) => p.id !== postId);
      await savePostsAsync(posts);
      return NextResponse.json({ success: true, message: "Post successfully deleted" });
    }

    // 4. PIN / UNPIN POST (Admin only)
    if (action === "toggle_pin") {
      const { postId } = body;
      if (userRole !== "admin") {
        return NextResponse.json(
          { error: "Unauthorized: Only Admins can pin posts." },
          { status: 403 }
        );
      }

      posts = posts.map((p) => {
        if (p.id === postId) {
          return { ...p, is_pinned: !p.is_pinned };
        }
        return p;
      });

      await savePostsAsync(posts);
      const updated = posts.find((p) => p.id === postId);
      return NextResponse.json({ success: true, data: updated });
    }

    // 5. REQUEST REMOVE / REPORT (Educator or Student flag for Admin review)
    if (action === "request_remove") {
      const { postId, reason, reportedBy, reporterRole } = body;
      const target = posts.find((p) => p.id === postId);

      const newReport: MemeReport = {
        id: `rep-${Date.now()}`,
        post_id: postId,
        trend_name: target ? `Post by ${target.author_handle}: "${target.content.slice(0, 40)}..."` : `Post ID #${postId}`,
        reported_by: reportedBy || "@user",
        reported_by_role: reporterRole || userRole || "educator",
        reason: reason || "Flagged for teacher review & school appropriateness",
        status: "pending",
        created_at: "Just now",
      };

      reports = [newReport, ...reports];
      await saveReportsAsync(reports);
      return NextResponse.json({ success: true, data: newReport });
    }

    // 6. LIKE TOGGLE
    if (action === "like") {
      const { postId } = body;
      posts = posts.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.is_liked;
          return {
            ...p,
            is_liked: isLiked,
            likes_count: isLiked ? p.likes_count + 1 : Math.max(0, p.likes_count - 1),
          };
        }
        return p;
      });

      await savePostsAsync(posts);
      const updated = posts.find((p) => p.id === postId);
      return NextResponse.json({ success: true, data: updated });
    }

    // 7. BOOKMARK TOGGLE
    if (action === "bookmark") {
      const { postId } = body;
      posts = posts.map((p) => {
        if (p.id === postId) {
          const isBookmarked = !p.is_bookmarked;
          return {
            ...p,
            is_bookmarked: isBookmarked,
            bookmarks_count: isBookmarked
              ? (p.bookmarks_count || 0) + 1
              : Math.max(0, (p.bookmarks_count || 0) - 1),
          };
        }
        return p;
      });

      await savePostsAsync(posts);

      // Track user bookmark
      if (userHandle) {
        const uHandle = userHandle.toLowerCase();
        if (!userBookmarks[uHandle]) userBookmarks[uHandle] = [];
        if (userBookmarks[uHandle].includes(postId)) {
          userBookmarks[uHandle] = userBookmarks[uHandle].filter((id) => id !== postId);
        } else {
          userBookmarks[uHandle].push(postId);
        }
        await saveBookmarksAsync(userBookmarks);
      }

      const updated = posts.find((p) => p.id === postId);
      return NextResponse.json({ success: true, data: updated });
    }

    // 8. REPOST TOGGLE
    if (action === "repost") {
      const { postId } = body;
      posts = posts.map((p) => {
        if (p.id === postId) {
          const isReposted = !p.is_reposted;
          return {
            ...p,
            is_reposted: isReposted,
            shares_count: isReposted ? p.shares_count + 1 : Math.max(0, p.shares_count - 1),
          };
        }
        return p;
      });

      await savePostsAsync(posts);
      const updated = posts.find((p) => p.id === postId);
      return NextResponse.json({ success: true, data: updated });
    }

    // 9. POLL VOTE
    if (action === "vote_poll") {
      const { postId, optionId } = body;
      posts = posts.map((p) => {
        if (p.id === postId && p.poll) {
          const prevVoted = p.poll.user_voted_option;
          if (prevVoted === optionId) return p;

          const updatedOptions = p.poll.options.map((opt) => {
            if (opt.id === optionId) return { ...opt, votes: opt.votes + 1 };
            if (opt.id === prevVoted) return { ...opt, votes: Math.max(0, opt.votes - 1) };
            return opt;
          });

          const totalVotes = updatedOptions.reduce((acc, cur) => acc + cur.votes, 0);

          return {
            ...p,
            poll: {
              ...p.poll,
              options: updatedOptions,
              total_votes: totalVotes,
              user_voted_option: optionId,
            },
          };
        }
        return p;
      });

      await savePostsAsync(posts);
      const updated = posts.find((p) => p.id === postId);
      return NextResponse.json({ success: true, data: updated });
    }

    // 10. COMMENT
    if (action === "comment") {
      const { postId, author_name, author_handle, author_avatar, author_role, content } = body;
      if (!postId || !content) {
        return NextResponse.json({ error: "PostId and content required" }, { status: 400 });
      }

      const newComment = {
        id: `c-${Date.now()}`,
        post_id: postId,
        author_name: author_name || "Scholar",
        author_handle: author_handle || "@scholar",
        author_avatar:
          author_avatar ||
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw",
        author_role: author_role || "student",
        content,
        likes_count: 0,
        is_liked: false,
        created_at: "Just now",
      };

      posts = posts.map((p) => {
        if (p.id === postId) {
          const comments = p.comments || [];
          return {
            ...p,
            comments_count: (p.comments_count || 0) + 1,
            comments: [...comments, newComment],
          };
        }
        return p;
      });

      await savePostsAsync(posts);
      const updated = posts.find((p) => p.id === postId);
      return NextResponse.json({ success: true, data: updated, comment: newComment });
    }

    // 11. LIKE COMMENT
    if (action === "like_comment") {
      const { postId, commentId } = body;
      posts = posts.map((p) => {
        if (p.id === postId && p.comments) {
          const updatedComments = p.comments.map((c) => {
            if (c.id === commentId) {
              const isLiked = !c.is_liked;
              return {
                ...c,
                is_liked: isLiked,
                likes_count: isLiked ? (c.likes_count || 0) + 1 : Math.max(0, (c.likes_count || 0) - 1),
              };
            }
            return c;
          });
          return { ...p, comments: updatedComments };
        }
        return p;
      });

      await savePostsAsync(posts);
      const updated = posts.find((p) => p.id === postId);
      return NextResponse.json({ success: true, data: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
