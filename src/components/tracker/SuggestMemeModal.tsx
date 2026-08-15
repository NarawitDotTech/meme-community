"use client";

import React, { useState } from "react";
import { X, Sparkles, RefreshCw, Layers, CheckCircle, AlertTriangle } from "lucide-react";
import { MemeTrend } from "@/lib/data/mock-data";

interface SuggestMemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMemeAnalyzed?: (meme: MemeTrend) => void;
}

export default function SuggestMemeModal({
  isOpen,
  onClose,
  onMemeAnalyzed,
}: SuggestMemeModalProps) {
  const [query, setQuery] = useState("");
  const [context, setContext] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      // 1. Call OpenAI API for cultural analysis
      let analysis: any = null;
      try {
        const aiRes = await fetch("/api/ai/explain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: query.trim(), context: context.trim() }),
        });
        const aiData = await aiRes.json();
        if (aiData.data) {
          analysis = aiData.data;
        }
      } catch (aiErr) {
        console.warn("AI explain network error:", aiErr);
      }

      // Robust fallback if AI analysis was unavailable
      if (!analysis) {
        analysis = {
          title: query.trim(),
          description: `Analysis for "${query.trim()}". ${context ? `Context: ${context}` : "Trending internet slang and digital culture format."}`,
          category: "Slang & Culture",
          trend_status: "Trending Up",
          origin: context || "Online student discourse & social media.",
          slang_terms: [query.trim().split(" ")[0] || "Slang", "Meme", "Culture"],
          cultural_context: `"${query.trim()}" is widely recognized in online student conversations. Understanding this format helps educators connect with modern youth vernacular.`,
          teacher_tips: `Use "${query.trim()}" to spark classroom conversations about language evolution, satire, and digital media.`,
          student_notes: `Keep usage friendly and inclusive. Avoid using in exclusionary inside jokes.`,
        };
      }

      // 2. Save into memes database/state
      const memePayload = {
        action: "suggest",
        title: analysis.title || query.trim(),
        description: analysis.description || `Internet culture breakdown for ${query.trim()}`,
        category: analysis.category || "Slang & Culture",
        trend_status: analysis.trend_status || "Trending Up",
        origin: analysis.origin || "Community submitted",
        slang_terms: Array.isArray(analysis.slang_terms) ? analysis.slang_terms : [query.trim()],
        cultural_context: analysis.cultural_context || "Modern youth cultural term.",
        teacher_tips: analysis.teacher_tips || "Connect with students through relatable media examples.",
        student_notes: analysis.student_notes || "Use with empathy in digital spaces.",
      };

      const saveRes = await fetch("/api/memes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memePayload),
      });
      const saveData = await saveRes.json();

      setResult(analysis);
      if (onMemeAnalyzed && saveData.data) {
        onMemeAnalyzed(saveData.data);
      }
    } catch (err) {
      console.error("Meme suggestion analysis error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuery("");
    setContext("");
    setResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-[540px] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <h3 className="font-headline-md text-[18px] md:text-[20px] font-bold text-on-surface flex items-center gap-sm">
            <Sparkles className="w-5 h-5 text-primary" />
            Suggest & Analyze a Meme / Slang
          </h3>
          <button
            onClick={handleReset}
            className="text-on-surface-variant hover:text-on-surface transition-colors p-1 rounded-full hover:bg-surface-variant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="p-xl flex flex-col items-center justify-center gap-lg min-h-[300px] text-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-surface-variant rounded-full"></div>
              <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
              <Sparkles className="w-6 h-6 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <div className="flex flex-col gap-xs">
              <p className="font-headline-md text-[18px] font-bold text-on-surface">
                Generating explanation with AI...
              </p>
              <p className="font-body-sm text-xs text-outline">
                Analyzing cultural vectors, semantic origins, and teacher translation.
              </p>
            </div>
          </div>
        ) : result ? (
          /* Analysis Result Display */
          <div className="p-6 overflow-y-auto max-h-[75vh] space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container">
                {result.category}
              </span>
              <span className="text-xs font-semibold text-primary flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Added to Live Tracker
              </span>
            </div>

            <div>
              <h4 className="font-headline-md text-xl font-extrabold text-on-surface">
                {result.title}
              </h4>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                {result.description}
              </p>
            </div>

            {/* Cultural Context */}
            <div className="p-3 bg-surface-container rounded-xl border border-outline-variant/60 text-xs space-y-1">
              <span className="font-bold text-primary block">🌐 Cultural Impact & Meaning</span>
              <p className="text-on-surface leading-relaxed">{result.cultural_context}</p>
            </div>

            {/* Teacher Tips */}
            <div className="p-3 bg-primary-container/30 border border-primary/20 rounded-xl text-xs space-y-1">
              <span className="font-bold text-primary block">🎓 Teacher Translation & Usage Tips</span>
              <p className="text-on-surface leading-relaxed">{result.teacher_tips}</p>
            </div>

            {/* Slang Keywords */}
            {result.slang_terms && result.slang_terms.length > 0 && (
              <div className="flex gap-1.5 flex-wrap pt-1">
                {result.slang_terms.map((term: string, i: number) => (
                  <span
                    key={i}
                    className="text-[11px] bg-surface-container-highest px-2 py-0.5 rounded-md border border-outline-variant text-on-surface font-semibold"
                  >
                    #{term}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={handleReset}
                className="bg-primary text-on-primary px-5 py-2 rounded-xl text-xs font-bold hover:bg-primary/90 transition-all"
              >
                Done & View Tracker
              </button>
            </div>
          </div>
        ) : (
          /* Form Input State */
          <form onSubmit={handleAnalyze} className="p-lg flex flex-col gap-lg">
            <div className="flex flex-col gap-sm">
              <label className="font-label-md text-label-md text-on-surface-variant font-semibold">
                Meme Name, Slang Term, or Link
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 'Rizz', 'Crashout', 'The Corporate Void', 'Skibidi'"
                className="w-full bg-surface border border-outline-variant rounded-xl px-md py-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-body-md text-sm placeholder:text-outline-variant"
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-sm">
              <label className="font-label-md text-label-md text-on-surface-variant font-semibold">
                Context (Optional)
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Where did you see this trending? (e.g. Student group chat, TikTok audio, Math class whiteboard)"
                rows={3}
                className="w-full bg-surface border border-outline-variant rounded-xl px-md py-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-body-md text-sm placeholder:text-outline-variant resize-none"
              ></textarea>
            </div>

            <div className="flex justify-end gap-md pt-sm">
              <button
                type="button"
                onClick={handleReset}
                className="font-label-md text-xs text-on-surface-variant px-md py-2 hover:bg-surface-variant transition-colors border border-outline-variant rounded-xl bg-transparent font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!query.trim()}
                className="bg-primary text-on-primary font-label-md text-xs py-2 px-lg rounded-xl hover:shadow-[0_0_12px_rgba(109,40,217,0.3)] transition-all flex items-center gap-xs font-bold disabled:opacity-50"
              >
                Analyze with AI
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
