import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const { topic, subject, targetGrade, memeStyle } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Subject topic is required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      // Mocked intelligent lesson plan fallback if OpenAI key is not configured in Vercel env
      return NextResponse.json({
        success: true,
        data: {
          lesson_title: `Deconstructing ${topic} Through Modern Memes`,
          learning_objective: `Students will analyze core principles of ${topic} (${subject || "General Studies"}) by evaluating rhetorical devices and satire in digital culture.`,
          hook: `Show students a popular viral meme about ${topic} and ask them: "What underlying concept makes this joke work?"`,
          core_concepts: [
            {
              concept_name: `Fundamentals of ${topic}`,
              explanation: `Breaking down key terminology and foundational theory into relatable everyday metaphors.`,
              meme_analogy: `Think of this concept like an algorithmic feedback loop: inputs dictate outcomes.`,
            },
            {
              concept_name: "Rhetorical Media Analysis",
              explanation: "Examining how visual formats communicate tone, bias, and humor.",
              meme_analogy: "Comparing classical argumentation with modern image macro punchlines.",
            },
          ],
          activity: {
            title: `The ${topic} Meme Creation Lab`,
            instructions: `In pairs, create a constructive meme that accurately explains ${topic} without using jargon.`,
            deliverable: "1 original meme with a 3-sentence explanatory caption.",
          },
          discussion_prompts: [
            `How does humor help us remember difficult concepts in ${topic}?`,
            "Where is the boundary between healthy satire and misinformation in online learning?",
          ],
          formative_check: {
            question: `Which of the following best represents the key idea of ${topic}?`,
            options: [
              "A simplified model of complex systems",
              "A temporary viral trend with no academic value",
              "An isolated theoretical formula",
              "None of the above",
            ],
            correct_answer_index: 0,
            explanation: `Memes and models both serve to distill complex underlying mechanisms into accessible mental representations.`,
          },
        },
      });
    }

    const systemPrompt = `You are an award-winning instructional designer and master educator who excels at using internet memes, relatable analogies, and pop culture to teach rigorous academic concepts without patronizing students.

Return a strictly valid JSON object with the following schema:
{
  "lesson_title": "Catchy, meme-infused lesson title",
  "learning_objective": "Clear educational standard/takeaway",
  "hook": "An engaging 30-second meme-based classroom opener or icebreaker",
  "core_concepts": [
    {
      "concept_name": "Name of concept",
      "explanation": "Clear academic explanation",
      "meme_analogy": "Relatable meme comparison"
    }
  ],
  "activity": {
    "title": "Interactive student activity name",
    "instructions": "Step-by-step instructions for teachers",
    "deliverable": "What students submit/produce"
  },
  "discussion_prompts": ["Prompt 1", "Prompt 2"],
  "formative_check": {
    "question": "A quick multiple choice question to check understanding",
    "options": ["A", "B", "C", "D"],
    "correct_answer_index": 0,
    "explanation": "Why this answer is correct"
  }
}`;

    const userPrompt = `Generate a high-engagement educational lesson plan:
- Academic Topic: ${topic}
- Subject Domain: ${subject || "General Science & Humanities"}
- Target Audience/Grade: ${targetGrade || "High School / Undergraduate"}
- Meme Style / Vibe: ${memeStyle || "Smart Satire & Modern Slang"}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
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
    console.error("OpenAI Lesson Generator API Error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to generate lesson outline.",
      },
      { status: 500 }
    );
  }
}
