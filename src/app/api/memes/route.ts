import { NextRequest, NextResponse } from "next/server";
import { MemeTrend, MemeReport } from "@/lib/data/mock-data";
import { getTrends, saveTrends, getReports, saveReports } from "@/lib/data/storage";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (type === "reports") {
    return NextResponse.json({ success: true, data: getReports() });
  }

  return NextResponse.json({ success: true, data: getTrends() });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;
    let memes = getTrends();
    let reports = getReports();

    if (action === "suggest") {
      const { title, description, category, trend_status, image_url, origin, slang_terms, cultural_context, teacher_tips, student_notes } = body;

      const newTrend: MemeTrend = {
        id: `trend-${Date.now()}`,
        title: title || "Community Suggested Meme",
        category: category || "Digital Vernacular",
        trend_status: trend_status || "Trending Up",
        image_url:
          image_url ||
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBuDg_HiECfLPYtI7JjUxN0mLnczGreCwu_t88pCijTYlkt1MSTVmm2hJfSlUBAP2YM2Dx4gwq4BVUSfVVKlW34B6tFqcT0rNzrbwXNLtCZK4yphDVwQoj3_T9ovxxKrKTzoo1gdK7Wd-Wz760bylciO2-IE_CVQ5_q0V_7aNx7TwONpvRR5R92BVDxZ_01q3LTPWmhJKxWeHijYVDdmHydjQ_iyD4h48dUq7vHsj8ZouihltMftETXRg",
        description: description || "Fresh internet trend analyzed by AI.",
        origin,
        slang_terms: slang_terms || [],
        cultural_context,
        teacher_tips,
        student_notes,
        is_ai_explained: true,
        created_at: new Date().toISOString().split("T")[0],
      };

      memes = [newTrend, ...memes];
      saveTrends(memes);

      // Add to admin review queue as a quality verification check
      const newReport: MemeReport = {
        id: `rep-${Date.now()}`,
        trend_name: `Meme: "${newTrend.title}"`,
        reason: "New AI Analysis Quality Verification",
        status: "pending",
        created_at: "Just now",
      };
      reports = [newReport, ...reports];
      saveReports(reports);

      return NextResponse.json({ success: true, data: newTrend });
    }

    if (action === "resolve-report") {
      const { reportId, status } = body;
      reports = reports.map((r) => {
        if (r.id === reportId) {
          return { ...r, status: status || "resolved" };
        }
        return r;
      });

      saveReports(reports);
      return NextResponse.json({ success: true, data: reports });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
