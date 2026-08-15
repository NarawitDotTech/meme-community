import { NextRequest, NextResponse } from "next/server";
import { LearningVideo } from "@/lib/data/mock-data";
import { getVideosAsync, saveVideosAsync } from "@/lib/data/storage";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  let filtered = await getVideosAsync();

  if (category && category !== "All Courses") {
    filtered = filtered.filter(
      (v) => v.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.module_code.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ success: true, data: filtered });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;
    let videos = await getVideosAsync();

    // 1. CREATE VIDEO
    if (action === "create") {
      const {
        title,
        description,
        category,
        level,
        duration,
        module_code,
        status,
        video_url,
        thumbnail_url,
        instructor_name,
      } = body;

      if (!title || !description) {
        return NextResponse.json({ error: "Title and description required" }, { status: 400 });
      }

      const newVideo: LearningVideo = {
        id: `vid-${Date.now()}`,
        title,
        description,
        category: category || "Slang",
        level: level || "Beginner",
        duration: duration || "10:00",
        module_code: module_code || "Module 1.0",
        status: status || "published",
        views: "0",
        video_url: video_url || "https://www.youtube.com/watch?v=kYJydzP-x_0",
        thumbnail_url:
          thumbnail_url ||
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD8w0BosXmsRwR_S1Mho4YSomt_wWLfNbuMumLzgzLKq6hpLZARGnbBCrNk9ZQQzpC2kFS7puH8_KF3iR9_EOo449XXpY4DtAAXNRioyGDLRGn1hsUcnZyul7XpP5-jl1SAS0TCXzw9K_keWVzDoLjoi1q-EQgduyi5vUkcXfJWU1WlRzRg-Na3B9wXycKgg5oyZbaXXTl4NsSkgaRvImOXlDJSmyudQ5TwhXlB4dakSwJdamqRHN2QHg",
        instructor_name: instructor_name || "Memeology Dept.",
        instructor_subscribers: "1.2M Scholars",
        instructor_avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBelj7BrJI8cTV1RQfXWPDdnAfP4lGYfs5Y0kks60GBMNLhCdyCyaWnsE-f6GA8s9hLezKiU6um7NNQWzn7nBj_WXH28wBMIlZYIVLFKKfIoj7IVYO_zyM4MbTKhxRW7spnNUtd3p8aNA1FtKJVwioNIFBSb_ykel-mDi0PNhp9CgdBMCl8HARsYV-bABqHnXwtjtVMle3mjkGP8EEUSYFCdYtLbfJzxIKxcJ2x-NxVKAZDjOig6HD7OA",
        created_at: new Date().toISOString().split("T")[0],
      };

      videos = [newVideo, ...videos];
      await saveVideosAsync(videos);
      return NextResponse.json({ success: true, data: newVideo });
    }

    // 2. EDIT VIDEO
    if (action === "edit") {
      const { id, title, description, category, level, duration, module_code, status, video_url, thumbnail_url } = body;
      const target = videos.find((v) => v.id === id);
      if (!target) {
        return NextResponse.json({ error: "Video not found" }, { status: 404 });
      }

      videos = videos.map((v) => {
        if (v.id === id) {
          return {
            ...v,
            title: title !== undefined ? title : v.title,
            description: description !== undefined ? description : v.description,
            category: category !== undefined ? category : v.category,
            level: level !== undefined ? level : v.level,
            duration: duration !== undefined ? duration : v.duration,
            module_code: module_code !== undefined ? module_code : v.module_code,
            status: status !== undefined ? status : v.status,
            video_url: video_url !== undefined ? video_url : v.video_url,
            thumbnail_url: thumbnail_url !== undefined ? thumbnail_url : v.thumbnail_url,
          };
        }
        return v;
      });

      await saveVideosAsync(videos);
      const updated = videos.find((v) => v.id === id);
      return NextResponse.json({ success: true, data: updated });
    }

    // 3. TOGGLE PUBLISHED / DRAFT
    if (action === "toggle-status") {
      const { id } = body;
      videos = videos.map((v) => {
        if (v.id === id) {
          return {
            ...v,
            status: v.status === "published" ? "draft" : "published",
          };
        }
        return v;
      });

      await saveVideosAsync(videos);
      const updated = videos.find((v) => v.id === id);
      return NextResponse.json({ success: true, data: updated });
    }

    // 4. DELETE VIDEO
    if (action === "delete") {
      const { id } = body;
      videos = videos.filter((v) => v.id !== id);
      await saveVideosAsync(videos);
      return NextResponse.json({ success: true, message: "Video deleted" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
