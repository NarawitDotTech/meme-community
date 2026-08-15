import { Post, MemeTrend, LearningVideo } from "./mock-data";

const DELETED_KEY = "mc_deleted_post_ids_v1";
const CUSTOM_POSTS_KEY = "mc_custom_posts_v1";
const CUSTOM_TRENDS_KEY = "mc_custom_trends_v1";
const CUSTOM_VIDEOS_KEY = "mc_custom_videos_v1";

// --- POSTS ---
export function getClientDeletedPostIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(DELETED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function markClientPostDeleted(id: string): void {
  if (typeof window === "undefined" || !id) return;
  try {
    const current = getClientDeletedPostIds();
    if (!current.includes(id)) {
      localStorage.setItem(DELETED_KEY, JSON.stringify([...current, id]));
    }
    removeClientCustomPost(id);
  } catch (e) {
    console.warn("Client cache delete error:", e);
  }
}

export function getClientCustomPosts(): Post[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_POSTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveClientCustomPost(post: Post): void {
  if (typeof window === "undefined" || !post || !post.id) return;
  try {
    const current = getClientCustomPosts();
    const filtered = current.filter((p) => p.id !== post.id);
    localStorage.setItem(CUSTOM_POSTS_KEY, JSON.stringify([post, ...filtered]));
  } catch (e) {
    console.warn("Client cache save error:", e);
  }
}

export function removeClientCustomPost(id: string): void {
  if (typeof window === "undefined" || !id) return;
  try {
    const current = getClientCustomPosts();
    const updated = current.filter((p) => p.id !== id);
    localStorage.setItem(CUSTOM_POSTS_KEY, JSON.stringify(updated));
  } catch (e) {}
}

export function filterActivePosts(posts: Post[]): Post[] {
  const deletedIds = getClientDeletedPostIds();
  const customPosts = getClientCustomPosts();
  const combined = [...customPosts, ...posts];

  const seen = new Set<string>();
  const deduplicated: Post[] = [];

  for (const p of combined) {
    if (p && p.id && !seen.has(p.id)) {
      seen.add(p.id);
      if (!deletedIds.includes(p.id)) {
        deduplicated.push(p);
      }
    }
  }

  return deduplicated;
}

// --- MEME TRENDS ---
export function getClientCustomTrends(): MemeTrend[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_TRENDS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveClientCustomTrend(trend: MemeTrend): void {
  if (typeof window === "undefined" || !trend || !trend.id) return;
  try {
    const current = getClientCustomTrends();
    const filtered = current.filter((t) => t.id !== trend.id);
    localStorage.setItem(CUSTOM_TRENDS_KEY, JSON.stringify([trend, ...filtered]));
  } catch (e) {
    console.warn("Save trend error:", e);
  }
}

export function filterActiveTrends(trends: MemeTrend[]): MemeTrend[] {
  const customTrends = getClientCustomTrends();
  const combined = [...customTrends, ...trends];

  const seen = new Set<string>();
  const deduplicated: MemeTrend[] = [];

  for (const t of combined) {
    if (t && t.id && !seen.has(t.id)) {
      seen.add(t.id);
      deduplicated.push(t);
    }
  }

  return deduplicated;
}

// --- VIDEOS ---
export function getClientCustomVideos(): LearningVideo[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_VIDEOS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveClientCustomVideo(video: LearningVideo): void {
  if (typeof window === "undefined" || !video || !video.id) return;
  try {
    const current = getClientCustomVideos();
    const filtered = current.filter((v) => v.id !== video.id);
    localStorage.setItem(CUSTOM_VIDEOS_KEY, JSON.stringify([video, ...filtered]));
  } catch (e) {
    console.warn("Save video error:", e);
  }
}

export function filterActiveVideos(videos: LearningVideo[]): LearningVideo[] {
  const customVideos = getClientCustomVideos();
  const combined = [...customVideos, ...videos];

  const seen = new Set<string>();
  const deduplicated: LearningVideo[] = [];

  for (const v of combined) {
    if (v && v.id && !seen.has(v.id)) {
      seen.add(v.id);
      deduplicated.push(v);
    }
  }

  return deduplicated;
}
