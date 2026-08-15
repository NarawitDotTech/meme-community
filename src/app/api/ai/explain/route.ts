import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

    if (!process.env.OPENAI_API_KEY) {
      // Mocked intelligent fallback response if OpenAI API key is not configured
      const title = query.length > 25 ? `${query.slice(0, 25)}...` : query;
      return NextResponse.json({
        success: true,
        data: {
          title,
          category: "Digital Slang & Culture",
          origin: "Originated in online student communities and viral discourse.",
          slang_terms: [query.split(" ")[0] || "Slang", "Context", "Meme"],
          cultural_context: `"${query}" is widely used in modern internet conversations to express relatable student experiences, irony, or digital identity.`,
          teacher_tips: `Use "${query}" as an icebreaker or bridge to explore linguistic evolution and modern rhetoric in the classroom.`,
          student_notes: `Safe and relatable when used in friendly banter; avoid using in exclusive or targeted contexts.`,
        },
      });
    }

    const systemPrompt = `You are an expert socio-linguist and internet meme historian specializing in bridging the cultural communication gap between teachers/educators and Gen Z/Gen Alpha students.
Analyze the provided meme, internet trend, or slang phrase.

Return a strictly valid JSON object with the following schema:
{
  "title": "Clean, descriptive name of the meme or slang",
  "category": "e.g. Slang & Vernacular, Pop Culture, Academic Humor, Tech Satire, Surrealism",
  "origin": "Brief history / where it emerged (e.g. TikTok, Twitch, Reddit, Classroom)",
  "slang_terms": ["List", "of", "relevant", "keywords"],
  "cultural_context": "Deep, intellectual yet accessible explanation of what it means and why it resonates.",
  "teacher_tips": "Practical, actionable guidance for educators on how to interpret this in student work or classroom discussions without being 'cringe'.",
  "student_notes": "How students can use this creatively without crossing into cyberbullying or exclusionary behavior."
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Analyze this meme/slang query: "${query}"\nAdditional Context: ${context || "None provided"}`,
        },
      ],
      temperature: 0.7,
    });

    const rawContent = completion.choices[0]?.message?.content;
    if (!rawContent) {
      throw new Error("No response generated from OpenAI.");
    }

    const parsed = JSON.parse(rawContent);

    return NextResponse.json({
      success: true,
      data: parsed,
    });
  } catch (error: any) {
    console.error("OpenAI Explain API Error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to analyze meme.",
      },
      { status: 500 }
    );
  }
}
