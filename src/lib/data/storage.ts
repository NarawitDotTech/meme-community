import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import {
  INITIAL_POSTS,
  INITIAL_VIDEOS,
  INITIAL_USERS,
  INITIAL_MEME_REPORTS,
  INITIAL_MEME_TRENDS,
  Post,
  LearningVideo,
  UserProfile,
  MemeReport,
  MemeTrend,
} from "./mock-data";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gegewgrpmqhnhutasjby.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2V3Z3JwbXFobmh1dGFzamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njc4NjY2NiwiZXhwIjoyMTAyMzYyNjY2fQ.t1xUu_hWfiZ_Z_bQdzOQo9D_Zs10kTr38ab8mT9CEFk";

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

const BUCKET_NAME = "app-data";
const DATA_DIR = path.join(process.cwd(), "data");

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (e) {
    // Serverless read-only filesystem
  }
}

// 1. CLOUD READ WITH COMPLETE NO-CACHE GUARANTEE
async function readCloudJson<T>(filename: string, fallback: T): Promise<T> {
  // A. Try direct download via authenticated client (bypasses public CDN)
  try {
    const { data: fileData, error: dlErr } = await supabase.storage.from(BUCKET_NAME).download(filename);
    if (!dlErr && fileData) {
      const text = await fileData.text();
      const parsed = JSON.parse(text) as T;
      try {
        ensureDataDir();
        fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(parsed, null, 2), "utf-8");
      } catch (e) {}
      return parsed;
    }
  } catch (err) {
    console.warn(`[CloudStorage] Direct download error for ${filename}:`, err);
  }

  // B. Fallback to public URL with aggressive cache busting
  try {
    const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filename);
    const response = await fetch(`${publicUrl}?_t=${Date.now()}&_r=${Math.random()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
        Pragma: "no-cache",
      },
    });

    if (response.ok) {
      const parsed = await response.json() as T;
      try {
        ensureDataDir();
        fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(parsed, null, 2), "utf-8");
      } catch (e) {}
      return parsed;
    }
  } catch (err) {
    console.warn(`[CloudStorage] Public URL read error for ${filename}:`, err);
  }

  // C. Fallback to local disk
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (fs.existsSync(filePath)) {
      const localData = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(localData) as T;
    }
  } catch (e) {}

  return fallback;
}

// 2. CLOUD WRITE WITH MAXIMUM BROADCAST
async function writeCloudJson<T>(filename: string, data: T): Promise<void> {
  const jsonString = JSON.stringify(data, null, 2);

  // Write to local disk if writable
  try {
    ensureDataDir();
    fs.writeFileSync(path.join(DATA_DIR, filename), jsonString, "utf-8");
  } catch (e) {}

  // Upload to Supabase Storage with cacheControl = 0
  try {
    const buffer = Buffer.from(jsonString, "utf-8");
    const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(filename, buffer, {
      upsert: true,
      contentType: "application/json",
      cacheControl: "0",
    });
    if (uploadError) {
      console.warn(`[CloudStorage] Upload warning for ${filename}:`, uploadError.message);
    }
  } catch (err) {
    console.error(`[CloudStorage] Write error for ${filename} to Supabase:`, err);
  }
}

// ==========================================
// --- POSTS (PostgreSQL Table + AppState) ---
// ==========================================
export async function getPostsAsync(): Promise<Post[]> {
  // 1. Try PostgreSQL `posts` table
  try {
    const { data: dbPosts, error: dbErr } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!dbErr && dbPosts && dbPosts.length > 0) {
      return dbPosts.map((p) => ({
        ...p,
        slang_tags: Array.isArray(p.slang_tags) ? p.slang_tags : [],
        comments: Array.isArray(p.comments) ? p.comments : [],
      }));
    }
  } catch (e) {}

  // 2. Try `app_state` key-value sync table
  try {
    const { data: stateData, error: stateErr } = await supabase
      .from("app_state")
      .select("data")
      .eq("key", "posts")
      .single();

    if (!stateErr && stateData?.data && Array.isArray(stateData.data) && stateData.data.length > 0) {
      return stateData.data as Post[];
    }
  } catch (e) {}

  // 3. Fallback to Cloud Storage JSON
  return readCloudJson<Post[]>("posts.json", INITIAL_POSTS);
}

export async function savePostsAsync(posts: Post[]): Promise<void> {
  // 1. Save to `app_state` table for real-time atomic sync across all phones
  try {
    await supabase.from("app_state").upsert({
      key: "posts",
      data: posts,
      updated_at: new Date().toISOString(),
    });
  } catch (e) {}

  // 2. Upsert to `posts` table if available
  try {
    if (posts.length > 0) {
      const topPosts = posts.slice(0, 50).map((p) => ({
        id: p.id,
        author_name: p.author_name,
        author_handle: p.author_handle,
        author_avatar: p.author_avatar || null,
        author_role: p.author_role || "student",
        author_bio: p.author_bio || null,
        author_followers: p.author_followers || 0,
        is_following_author: !!p.is_following_author,
        is_verified: !!p.is_verified,
        content: p.content,
        image_url: p.image_url || null,
        video_url: p.video_url || null,
        category: p.category || "Culture",
        slang_tags: Array.isArray(p.slang_tags) ? p.slang_tags : [],
        poll: p.poll || null,
        likes_count: p.likes_count || 0,
        comments_count: p.comments_count || 0,
        shares_count: p.shares_count || 0,
        bookmarks_count: p.bookmarks_count || 0,
        is_pinned: !!p.is_pinned,
        comments: Array.isArray(p.comments) ? p.comments : [],
      }));
      await supabase.from("posts").upsert(topPosts);
    }
  } catch (e) {}

  // 3. Write to Cloud Storage and local cache
  return writeCloudJson<Post[]>("posts.json", posts);
}

export function getPosts(): Post[] {
  return INITIAL_POSTS;
}
export function savePosts(posts: Post[]) {
  savePostsAsync(posts).catch((e) => console.warn(e));
}

// ==========================================
// --- VIDEOS (PostgreSQL Table + Storage) ---
// ==========================================
export async function getVideosAsync(): Promise<LearningVideo[]> {
  try {
    const { data: dbVideos, error: dbErr } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: true });

    if (!dbErr && dbVideos && dbVideos.length > 0) {
      return dbVideos.map((v) => ({
        ...v,
        curriculum: Array.isArray(v.curriculum) ? v.curriculum : [],
      }));
    }
  } catch (e) {}

  try {
    const { data: stateData, error: stateErr } = await supabase
      .from("app_state")
      .select("data")
      .eq("key", "videos")
      .single();

    if (!stateErr && stateData?.data && Array.isArray(stateData.data) && stateData.data.length > 0) {
      return stateData.data as LearningVideo[];
    }
  } catch (e) {}

  return readCloudJson<LearningVideo[]>("videos.json", INITIAL_VIDEOS);
}

export async function saveVideosAsync(videos: LearningVideo[]): Promise<void> {
  try {
    await supabase.from("app_state").upsert({
      key: "videos",
      data: videos,
      updated_at: new Date().toISOString(),
    });
  } catch (e) {}

  try {
    if (videos.length > 0) {
      await supabase.from("videos").upsert(videos);
    }
  } catch (e) {}

  return writeCloudJson<LearningVideo[]>("videos.json", videos);
}

export function getVideos(): LearningVideo[] {
  return INITIAL_VIDEOS;
}
export function saveVideos(videos: LearningVideo[]) {
  saveVideosAsync(videos).catch((e) => console.warn(e));
}

// ==========================================
// --- USERS / PROFILES ---
// ==========================================
export async function getUsersAsync(): Promise<UserProfile[]> {
  try {
    const { data: dbProfiles, error: dbErr } = await supabase.from("profiles").select("*");
    if (!dbErr && dbProfiles && dbProfiles.length > 0) {
      return dbProfiles;
    }
  } catch (e) {}

  try {
    const { data: stateData, error: stateErr } = await supabase
      .from("app_state")
      .select("data")
      .eq("key", "users")
      .single();

    if (!stateErr && stateData?.data && Array.isArray(stateData.data) && stateData.data.length > 0) {
      return stateData.data as UserProfile[];
    }
  } catch (e) {}

  return readCloudJson<UserProfile[]>("users.json", INITIAL_USERS);
}

export async function saveUsersAsync(users: UserProfile[]): Promise<void> {
  try {
    await supabase.from("app_state").upsert({
      key: "users",
      data: users,
      updated_at: new Date().toISOString(),
    });
  } catch (e) {}

  try {
    if (users.length > 0) {
      await supabase.from("profiles").upsert(users);
    }
  } catch (e) {}

  return writeCloudJson<UserProfile[]>("users.json", users);
}

export function getUsers(): UserProfile[] {
  return INITIAL_USERS;
}
export function saveUsers(users: UserProfile[]) {
  saveUsersAsync(users).catch((e) => console.warn(e));
}

// ==========================================
// --- MEME TRENDS (Radar) ---
// ==========================================
export async function getTrendsAsync(): Promise<MemeTrend[]> {
  try {
    const { data: dbTrends, error: dbErr } = await supabase.from("meme_trends").select("*");
    if (!dbErr && dbTrends && dbTrends.length > 0) {
      return dbTrends.map((t) => ({
        ...t,
        slang_terms: Array.isArray(t.slang_terms) ? t.slang_terms : [],
      }));
    }
  } catch (e) {}

  try {
    const { data: stateData, error: stateErr } = await supabase
      .from("app_state")
      .select("data")
      .eq("key", "trends")
      .single();

    if (!stateErr && stateData?.data && Array.isArray(stateData.data) && stateData.data.length > 0) {
      return stateData.data as MemeTrend[];
    }
  } catch (e) {}

  return readCloudJson<MemeTrend[]>("trends.json", INITIAL_MEME_TRENDS);
}

export async function saveTrendsAsync(trends: MemeTrend[]): Promise<void> {
  try {
    await supabase.from("app_state").upsert({
      key: "trends",
      data: trends,
      updated_at: new Date().toISOString(),
    });
  } catch (e) {}

  try {
    if (trends.length > 0) {
      await supabase.from("meme_trends").upsert(trends);
    }
  } catch (e) {}

  return writeCloudJson<MemeTrend[]>("trends.json", trends);
}

export function getTrends(): MemeTrend[] {
  return INITIAL_MEME_TRENDS;
}
export function saveTrends(trends: MemeTrend[]) {
  saveTrendsAsync(trends).catch((e) => console.warn(e));
}

// ==========================================
// --- REPORTS ---
// ==========================================
export async function getReportsAsync(): Promise<MemeReport[]> {
  try {
    const { data: dbReports, error: dbErr } = await supabase.from("meme_reports").select("*");
    if (!dbErr && dbReports && dbReports.length > 0) {
      return dbReports;
    }
  } catch (e) {}

  return readCloudJson<MemeReport[]>("reports.json", INITIAL_MEME_REPORTS);
}

export async function saveReportsAsync(reports: MemeReport[]): Promise<void> {
  try {
    await supabase.from("app_state").upsert({
      key: "reports",
      data: reports,
      updated_at: new Date().toISOString(),
    });
  } catch (e) {}

  try {
    if (reports.length > 0) {
      await supabase.from("meme_reports").upsert(reports);
    }
  } catch (e) {}

  return writeCloudJson<MemeReport[]>("reports.json", reports);
}

export function getReports(): MemeReport[] {
  return INITIAL_MEME_REPORTS;
}
export function saveReports(reports: MemeReport[]) {
  saveReportsAsync(reports).catch((e) => console.warn(e));
}

// ==========================================
// --- BOOKMARKS ---
// ==========================================
export async function getBookmarksAsync(): Promise<{ [userHandle: string]: string[] }> {
  try {
    const { data: stateData, error: stateErr } = await supabase
      .from("app_state")
      .select("data")
      .eq("key", "bookmarks")
      .single();

    if (!stateErr && stateData?.data && typeof stateData.data === "object") {
      return stateData.data as { [userHandle: string]: string[] };
    }
  } catch (e) {}

  return readCloudJson<{ [userHandle: string]: string[] }>("bookmarks.json", {});
}

export async function saveBookmarksAsync(bookmarks: { [userHandle: string]: string[] }): Promise<void> {
  try {
    await supabase.from("app_state").upsert({
      key: "bookmarks",
      data: bookmarks,
      updated_at: new Date().toISOString(),
    });
  } catch (e) {}

  return writeCloudJson<{ [userHandle: string]: string[] }>("bookmarks.json", bookmarks);
}

export function getBookmarks(): { [userHandle: string]: string[] } {
  return {};
}
export function saveBookmarks(bookmarks: { [userHandle: string]: string[] }) {
  saveBookmarksAsync(bookmarks).catch((e) => console.warn(e));
}
