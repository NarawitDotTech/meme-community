import { NextRequest, NextResponse } from "next/server";
import { UserProfile } from "@/lib/data/mock-data";
import { getUsersAsync, saveUsersAsync } from "@/lib/data/storage";

export async function GET() {
  const users = await getUsersAsync();
  return NextResponse.json({ success: true, data: users });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, userId, role, is_active } = body;
    let users = await getUsersAsync();

    if (action === "update-role") {
      users = users.map((u) => {
        if (u.id === userId) {
          return { ...u, role };
        }
        return u;
      });

      await saveUsersAsync(users);
      const updated = users.find((u) => u.id === userId);
      return NextResponse.json({ success: true, data: updated });
    }

    if (action === "toggle-active") {
      users = users.map((u) => {
        if (u.id === userId) {
          return { ...u, is_active: typeof is_active === "boolean" ? is_active : !u.is_active };
        }
        return u;
      });

      await saveUsersAsync(users);
      const updated = users.find((u) => u.id === userId);
      return NextResponse.json({ success: true, data: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
