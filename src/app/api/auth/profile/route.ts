import { NextRequest, NextResponse } from "next/server";
import { UserProfile } from "@/lib/data/mock-data";
import { getUsersAsync, saveUsersAsync } from "@/lib/data/storage";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const username = searchParams.get("username");
  const id = searchParams.get("id");

  const users = await getUsersAsync();

  if (id) {
    const user = users.find((u) => u.id === id);
    return NextResponse.json({ success: true, data: user || null });
  }

  if (email) {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    return NextResponse.json({ success: true, data: user || null });
  }

  if (username) {
    const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase());
    return NextResponse.json({ success: true, data: user || null });
  }

  return NextResponse.json({ success: true, data: users });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, profile } = body;
    let users = await getUsersAsync();

    if (action === "sync_user" && profile) {
      const existingIdx = users.findIndex(
        (u) => u.id === profile.id || u.email.toLowerCase() === profile.email.toLowerCase()
      );

      if (existingIdx >= 0) {
        users[existingIdx] = {
          ...users[existingIdx],
          ...profile,
        };
        await saveUsersAsync(users);
        return NextResponse.json({ success: true, data: users[existingIdx] });
      } else {
        const newUser: UserProfile = {
          id: profile.id || `u-${Date.now()}`,
          username: profile.username.startsWith("@") ? profile.username : `@${profile.username}`,
          display_name: profile.display_name || profile.username.replace("@", ""),
          email: profile.email,
          role: profile.role || "student",
          avatar_url:
            profile.avatar_url ||
            (profile.role === "educator"
              ? "https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw"
              : "https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw"),
          is_active: true,
          bio: profile.bio || (profile.role === "educator" ? "Educator & meme scholar." : "Student scholar."),
          followers_count: profile.followers_count || 0,
          following_count: profile.following_count || 0,
          following_handles: profile.following_handles || [],
          bookmarked_post_ids: [],
          liked_post_ids: [],
          created_at: new Date().toISOString(),
        };
        users = [newUser, ...users];
        await saveUsersAsync(users);
        return NextResponse.json({ success: true, data: newUser });
      }
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
