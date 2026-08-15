import fs from "fs";
import path from "path";
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

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch (e) {
      console.warn("Could not create data dir:", e);
    }
  }
}

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
    console.warn(`Error reading ${filename}, using fallback:`, err);
    return fallback;
  }
}

function writeJsonFile<T>(filename: string, data: T) {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
  }
}

// 1. POSTS PERSISTENCE
export function getPosts(): Post[] {
  return readJsonFile<Post[]>("posts.json", INITIAL_POSTS);
}

export function savePosts(posts: Post[]) {
  writeJsonFile("posts.json", posts);
}

// 2. VIDEOS PERSISTENCE
export function getVideos(): LearningVideo[] {
  return readJsonFile<LearningVideo[]>("videos.json", INITIAL_VIDEOS);
}

export function saveVideos(videos: LearningVideo[]) {
  writeJsonFile("videos.json", videos);
}

// 3. USERS PERSISTENCE
export function getUsers(): UserProfile[] {
  return readJsonFile<UserProfile[]>("users.json", INITIAL_USERS);
}

export function saveUsers(users: UserProfile[]) {
  writeJsonFile("users.json", users);
}

// 4. REPORTS PERSISTENCE
export function getReports(): MemeReport[] {
  return readJsonFile<MemeReport[]>("reports.json", INITIAL_MEME_REPORTS);
}

export function saveReports(reports: MemeReport[]) {
  writeJsonFile("reports.json", reports);
}

// 5. TRENDS PERSISTENCE
export function getTrends(): MemeTrend[] {
  return readJsonFile<MemeTrend[]>("trends.json", INITIAL_MEME_TRENDS);
}

export function saveTrends(trends: MemeTrend[]) {
  writeJsonFile("trends.json", trends);
}

// 6. BOOKMARKS PERSISTENCE
export function getBookmarks(): { [userHandle: string]: string[] } {
  return readJsonFile<{ [userHandle: string]: string[] }>("bookmarks.json", {});
}

export function saveBookmarks(bookmarks: { [userHandle: string]: string[] }) {
  writeJsonFile("bookmarks.json", bookmarks);
}
