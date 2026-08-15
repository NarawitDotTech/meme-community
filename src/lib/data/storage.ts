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

// In-memory cache for ultra-fast serverless response
const memoryCache: { [filename: string]: any } = {};

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (e) {
    // Read-only filesystem on serverless environments
  }
}

// 1. CLOUD READ
async function readCloudJson<T>(filename: string, fallback: T): Promise<T> {
  try {
    const { data, error } = await supabase.storage.from(BUCKET_NAME).download(filename);
    if (data && !error) {
      const text = await data.text();
      const parsed = JSON.parse(text) as T;
      memoryCache[filename] = parsed;
      // Also try writing to local disk cache if writable
      try {
        ensureDataDir();
        fs.writeFileSync(path.join(DATA_DIR, filename), text, "utf-8");
      } catch (e) {}
      return parsed;
    }
  } catch (err) {
    console.warn(`[CloudStorage] Error fetching ${filename} from Supabase:`, err);
  }

  // Fallback to memory cache
  if (memoryCache[filename]) {
    return memoryCache[filename];
  }

  // Fallback to local file if available
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (fs.existsSync(filePath)) {
      const localData = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(localData) as T;
      memoryCache[filename] = parsed;
      return parsed;
    }
  } catch (e) {}

  return fallback;
}

// 2. CLOUD WRITE
async function writeCloudJson<T>(filename: string, data: T): Promise<void> {
  memoryCache[filename] = data;
  const jsonString = JSON.stringify(data, null, 2);

  // Write to local disk if writable
  try {
    ensureDataDir();
    fs.writeFileSync(path.join(DATA_DIR, filename), jsonString, "utf-8");
  } catch (e) {}

  // Upload to Supabase Cloud Storage bucket
  try {
    const buffer = Buffer.from(jsonString, "utf-8");
    await supabase.storage.from(BUCKET_NAME).upload(filename, buffer, {
      upsert: true,
      contentType: "application/json",
    });
  } catch (err) {
    console.error(`[CloudStorage] Error uploading ${filename} to Supabase:`, err);
  }
}

// Synchronous local helpers
function readJsonFile<T>(filename: string, fallback: T): T {
  if (memoryCache[filename]) return memoryCache[filename];
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), "utf-8");
      return fallback;
    }
    const data = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(data) as T;
    memoryCache[filename] = parsed;
    return parsed;
  } catch (err) {
    return fallback;
  }
}

function writeJsonFile<T>(filename: string, data: T) {
  memoryCache[filename] = data;
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {}
  // Also asynchronously trigger cloud upload
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
