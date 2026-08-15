import { Post } from "./mock-data";

const DELETED_KEY = "mc_deleted_post_ids_v1";
const CUSTOM_POSTS_KEY = "mc_custom_posts_v1";

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
    // Also remove from custom posts if present
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

  // Combine custom created posts at the top
  const combined = [...customPosts, ...posts];

  // Deduplicate by ID
  const seen = new Set<string>();
  const deduplicated: Post[] = [];

  for (const p of combined) {
    if (p && p.id && !seen.has(p.id)) {
      seen.add(p.id);
      // Ensure post is not in deleted registry
      if (!deletedIds.includes(p.id)) {
        deduplicated.push(p);
      }
    }
  }

  return deduplicated;
}
