import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

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

    const systemPrompt = `You are an award-winning instructional designer and master educator who excels at using internet memes, relatable analogies, and pop culture to teach rigorous academic concepts without patronizing students.

Return a strictly valid JSON object with the following schema:
{
  "lesson_title": "Catchy, meme-infused lesson title",
  "learning_objective": "Clear educational standard/takeaway",
  "hook": "An engaging 30-second meme-based classroom opener or icebreaker",
  "meme_analogy": "How the core academic concept maps directly onto a popular meme format",
  "short_video_script": [
    { "timestamp": "0:00 - 0:15", "visual": "Description of visual/meme slide", "script": "What the teacher says" },
    { "timestamp": "0:15 - 0:45", "visual": "Description of visual/meme slide", "script": "What the teacher says" },
    { "timestamp": "0:45 - 1:15", "visual": "Description of visual/meme slide", "script": "What the teacher says" },
    { "timestamp": "1:15 - 1:30", "visual": "Description of visual/meme slide", "script": "Wrap-up and call to action" }
  ],
  "discussion_prompts": [
    "Discussion question 1",
    "Discussion question 2"
  ],
  "quick_check_quiz": {
    "question": "A multiple-choice question testing the concept via meme context",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_answer": "Option B",
    "explanation": "Why this answer is correct"
  }
}

Do NOT include markdown formatting or backticks around the JSON. Output only pure JSON string.`;

    const userPrompt = `Create a meme-based lesson plan for:
Subject: ${subject || "General"}
Topic: ${topic}
Target Grade: ${targetGrade || "High School (9-12)"}
Meme Style / Slang to leverage: ${memeStyle || "Doge / Modern Post-Irony / Relatable Student Humor"}`;

    let lessonData;
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
      lessonData = JSON.parse(responseText);
    } catch (err) {
      console.warn("OpenAI lesson generator fallback active:", err);
      lessonData = {
        lesson_title: `Mastering ${topic}: The Memetic Guide`,
        learning_objective: `Understand the fundamental mechanics of ${topic} through high-retention visual frameworks.`,
        hook: `Start the class displaying a split screen: on the left, a traditional textbook formula; on the right, a classic reaction meme labeled 'Me trying to comprehend ${topic}'.`,
        meme_analogy: `${topic} functions like viral information cascades—inputs trigger high-energy reactions that transform state across the system.`,
        short_video_script: [
          {
            timestamp: "0:00 - 0:15",
            visual: "Teacher holds up a confused Shiba Inu meme placard.",
            script: `Ever felt like ${topic} was speaking an alien language? Let's decode it in 60 seconds.`,
          },
          {
            timestamp: "0:15 - 0:45",
            visual: "Animated flowchart showing core components interacting with humorous captions.",
            script: `Think of rule #1 as the primary catalyst. Without it, the whole equation runs into a syntax error!`,
          },
          {
            timestamp: "0:45 - 1:15",
            visual: "Before and After comparison meme showing wrong way vs right way.",
            script: `Notice how balancing the variables prevents the whole structure from falling into the void.`,
          },
          {
            timestamp: "1:15 - 1:30",
            visual: "Verified checkmark sticker with classroom challenge question.",
            script: `Now it's your turn: apply this rule on page 42 and let's see who gets maximum rizz on the quiz!`,
          },
        ],
        discussion_prompts: [
          `How does breaking ${topic} into humorous analogies change your intuitive understanding?`,
          `Can you design your own meme template explaining this week's chapter?`,
        ],
        quick_check_quiz: {
          question: `In the context of ${topic}, what is the primary role of the driving mechanism?`,
          options: [
            "A) It shuts down all active processes",
            "B) It catalyzes and sustains the transformation cycle",
            "C) It only operates under extreme pressure",
            "D) It creates unnecessary friction",
          ],
          correct_answer: "B) It catalyzes and sustains the transformation cycle",
          explanation:
            "The driving mechanism acts as the engine that drives progression through each subsequent step of the system.",
        },
      };
    }

    return NextResponse.json({
      success: true,
      data: lessonData,
    });
  } catch (error: any) {
    console.error("Lesson generator error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate lesson" },
      { status: 500 }
    );
  }
}
