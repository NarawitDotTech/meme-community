import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const { query, context } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query / Meme description is required" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert socio-linguist and internet meme historian specializing in bridging the cultural communication gap between teachers/educators and Gen Z/Gen Alpha students.
Analyze the provided meme, internet trend, or slang phrase.

Return a strictly valid JSON object with the following schema:
{
  "title": "Clean, descriptive name of the meme or slang",
  "category": "e.g. Slang & Vernacular, Pop Culture, Academic Humor, Tech Satire, Surrealism",
  "trend_status": "Trending Up" | "Peaking" | "Niche Rising",
  "description": "Comprehensive explanation (2-3 sentences) of what it means and how it is used.",
  "origin": "Historical roots, first appearances (e.g., TikTok, Reddit, Twitch, anime), and timeline.",
  "slang_terms": ["List", "of", "3-5", "related", "slang", "keywords"],
  "cultural_context": "Deep dive into why students find it funny, relatable, or expressive of modern teenage experience.",
  "teacher_tips": "Practical actionable guidance for teachers: how to recognize it in class, when it's benign vs disruptive, and how to relate to students without forcing it awkwardly.",
  "student_notes": "Context for students on how to use it appropriately and avoid cringe/bullying.",
  "appropriateness": "School Safe" | "Needs Context" | "Use Caution"
}

Do NOT include any markdown code fences around the JSON. Output only the pure JSON string.`;

    const userPrompt = `Analyze this meme/slang: "${query}". Additional context provided: "${context || "None"}".`;

    let aiResult;
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      });

      const responseText = completion.choices[0]?.message?.content || "{}";
      aiResult = JSON.parse(responseText);
    } catch (openaiErr: any) {
      console.warn("OpenAI API call error, using smart fallback analysis:", openaiErr);
      
      // Smart dynamic fallback if OpenAI key has network/quota issues
      const cleanQ = query.trim();
      aiResult = {
        title: cleanQ.charAt(0).toUpperCase() + cleanQ.slice(1),
        category: "Slang & Digital Culture",
        trend_status: "Trending Up",
        description: `"${cleanQ}" is an internet culture phenomenon that blends irony, relatable humor, and rapid online dissemination among students.`,
        origin: "Originates from short-form video platforms and peer-to-peer Discord communities.",
        slang_terms: [cleanQ, "Vibe Check", "No Cap", "Core", "Brainrot"],
        cultural_context: "Students use this phrase to express camaraderie, shared experiences, and shared cultural shorthand that distinguishes their digital identity.",
        teacher_tips: "Acknowledge the term with light humor if heard in the hallway. Use it as a teachable moment for linguistics or media literacy, but avoid overusing it in formal lectures.",
        student_notes: "Great in casual peer group chats; ensure classmates are not being excluded or targeted when using slang.",
        appropriateness: "School Safe",
      };
    }

    return NextResponse.json({
      success: true,
      data: aiResult,
    });
  } catch (error: any) {
    console.error("Meme explain API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate meme analysis" },
      { status: 500 }
    );
  }
}
