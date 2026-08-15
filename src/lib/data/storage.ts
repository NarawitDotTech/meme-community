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
    // Serverless read-only environment
  }
}

// 1. CLOUD READ WITH COMPLETE CACHE BUSTING
async function readCloudJson<T>(filename: string, fallback: T): Promise<T> {
  try {
    const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filename);
    const response = await fetch(`${publicUrl}?_t=${Date.now()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    });

    if (response.ok) {
      const parsed = await response.json() as T;
      // Also cache to local disk if environment is writable
      try {
        ensureDataDir();
        fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(parsed, null, 2), "utf-8");
      } catch (e) {}
      return parsed;
    }
  } catch (err) {
    console.warn(`[CloudStorage] Read error for ${filename}, attempting fallback:`, err);
  }

  // Fallback to local file if available
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (fs.existsSync(filePath)) {
      const localData = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(localData) as T;
    }
  } catch (e) {}

  return fallback;
}

// 2. CLOUD WRITE WITH 0 CACHE-CONTROL
async function writeCloudJson<T>(filename: string, data: T): Promise<void> {
  const jsonString = JSON.stringify(data, null, 2);

  // Write to local disk if writable
  try {
    ensureDataDir();
    fs.writeFileSync(path.join(DATA_DIR, filename), jsonString, "utf-8");
  } catch (e) {}

  // Upload to Supabase Cloud Storage bucket with cacheControl = 0
  try {
    const buffer = Buffer.from(jsonString, "utf-8");
    await supabase.storage.from(BUCKET_NAME).upload(filename, buffer, {
      upsert: true,
      contentType: "application/json",
      cacheControl: "0",
    });
  } catch (err) {
    console.error(`[CloudStorage] Write error for ${filename} to Supabase:`, err);
  }
}

// Synchronous local helpers
function readJsonFile<T>(filename: string, fallback: T): T {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), "utf-8");
      return fallback;
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch (err) {
    return fallback;
  }
}

function writeJsonFile<T>(filename: string, data: T) {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {}
  writeCloudJson(filename, data).catch((e) => console.warn(e));
}

// --- POSTS ---
export async function getPostsAsync(): Promise<Post[]> {
  return readCloudJson<Post[]>("posts.json", INITIAL_POSTS);
}
export async function savePostsAsync(posts: Post[]): Promise<void> {
  return writeCloudJson<Post[]>("posts.json", posts);
}
export function getPosts(): Post[] {
  return readJsonFile<Post[]>("posts.json", INITIAL_POSTS);
}
export function savePosts(posts: Post[]) {
  writeJsonFile("posts.json", posts);
}

// --- VIDEOS ---
export async function getVideosAsync(): Promise<LearningVideo[]> {
  return readCloudJson<LearningVideo[]>("videos.json", INITIAL_VIDEOS);
}
export async function saveVideosAsync(videos: LearningVideo[]): Promise<void> {
  return writeCloudJson<LearningVideo[]>("videos.json", videos);
}
export function getVideos(): LearningVideo[] {
  return readJsonFile<LearningVideo[]>("videos.json", INITIAL_VIDEOS);
}
export function saveVideos(videos: LearningVideo[]) {
  writeJsonFile("videos.json", videos);
}

// --- USERS ---
export async function getUsersAsync(): Promise<UserProfile[]> {
  return readCloudJson<UserProfile[]>("users.json", INITIAL_USERS);
}
export async function saveUsersAsync(users: UserProfile[]): Promise<void> {
  return writeCloudJson<UserProfile[]>("users.json", users);
}
export function getUsers(): UserProfile[] {
  return readJsonFile<UserProfile[]>("users.json", INITIAL_USERS);
}
export function saveUsers(users: UserProfile[]) {
  writeJsonFile("users.json", users);
}

// --- REPORTS ---
export async function getReportsAsync(): Promise<MemeReport[]> {
  return readCloudJson<MemeReport[]>("reports.json", INITIAL_MEME_REPORTS);
}
export async function saveReportsAsync(reports: MemeReport[]): Promise<void> {
  return writeCloudJson<MemeReport[]>("reports.json", reports);
}
export function getReports(): MemeReport[] {
  return readJsonFile<MemeReport[]>("reports.json", INITIAL_MEME_REPORTS);
}
export function saveReports(reports: MemeReport[]) {
  writeJsonFile("reports.json", reports);
}

// --- TRENDS ---
export async function getTrendsAsync(): Promise<MemeTrend[]> {
  return readCloudJson<MemeTrend[]>("trends.json", INITIAL_MEME_TRENDS);
}
export async function saveTrendsAsync(trends: MemeTrend[]): Promise<void> {
  return writeCloudJson<MemeTrend[]>("trends.json", trends);
}
export function getTrends(): MemeTrend[] {
  return readJsonFile<MemeTrend[]>("trends.json", INITIAL_MEME_TRENDS);
}
export function saveTrends(trends: MemeTrend[]) {
  writeJsonFile("trends.json", trends);
}

// --- BOOKMARKS ---
export async function getBookmarksAsync(): Promise<{ [userHandle: string]: string[] }> {
  return readCloudJson<{ [userHandle: string]: string[] }>("bookmarks.json", {});
}
export async function saveBookmarksAsync(bookmarks: { [userHandle: string]: string[] }): Promise<void> {
  return writeCloudJson<{ [userHandle: string]: string[] }>("bookmarks.json", bookmarks);
}
export function getBookmarks(): { [userHandle: string]: string[] } {
  return readJsonFile<{ [userHandle: string]: string[] }>("bookmarks.json", {});
}
export function saveBookmarks(bookmarks: { [userHandle: string]: string[] }) {
  writeJsonFile("bookmarks.json", bookmarks);
}
