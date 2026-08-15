"use client";

import React, { useState } from "react";
import { X, Sparkles, Bot, Clock, HelpCircle, Check, BookOpen, Download, RefreshCw } from "lucide-react";

interface AILessonGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AILessonGeneratorModal({ isOpen, onClose }: AILessonGeneratorModalProps) {
  const [subject, setSubject] = useState("Biology");
  const [topic, setTopic] = useState("Cellular Respiration & Mitochondria");
  const [targetGrade, setTargetGrade] = useState("High School (9-12)");
  const [memeStyle, setMemeStyle] = useState("Post-Irony & Modern Gaming Analogies");

  const [isLoading, setIsLoading] = useState(false);
  const [generatedLesson, setGeneratedLesson] = useState<any>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setGeneratedLesson(null);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);

    try {
      const res = await fetch("/api/ai/generate-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          topic,
          targetGrade,
          memeStyle,
        }),
      });

      const data = await res.json();
      if (data.data) {
        setGeneratedLesson(data.data);
      }
    } catch (err) {
      console.error("Lesson generation failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedLesson) return;
    const blob = new Blob([JSON.stringify(generatedLesson, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.replace(/\s+/g, "_")}_Meme_Lesson_Plan.json`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 md:p-5 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-headline-md text-base md:text-lg font-bold text-on-surface flex items-center gap-1.5">
                AI Meme Video & Lesson Generator
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                  GPT-4o Mini
                </span>
              </h3>
              <p className="text-[11px] text-on-surface-variant">
                Transform academic curriculum standards into high-retention meme lessons.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors p-2 rounded-full hover:bg-surface-variant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 md:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Input Form */}
          <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface-container/50 p-4 rounded-xl border border-outline-variant/60">
            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="Biology / STEM">Biology / Life Sciences</option>
                <option value="Physics / Mathematics">Physics / Mathematics</option>
                <option value="History / Social Studies">History / Social Studies</option>
                <option value="English / Literature">English / Literature</option>
                <option value="Computer Science / Coding">Computer Science / Coding</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">Target Grade</label>
              <select
                value={targetGrade}
                onChange={(e) => setTargetGrade(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="Middle School (6-8)">Middle School (Grades 6-8)</option>
                <option value="High School (9-12)">High School (Grades 9-12)</option>
                <option value="Undergraduate / College">Undergraduate / College</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-on-surface block mb-1">Lesson Topic / Concept</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Photosynthesis, Newton's 3rd Law, Shakespearean Irony, Quadratic Formula"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-on-surface block mb-1">Meme Tone / Slang Approach</label>
              <input
                type="text"
                value={memeStyle}
                onChange={(e) => setMemeStyle(e.target.value)}
                placeholder="e.g., Classic Doge, Brainrot Subversion, Relatable Gaming Analogies"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end pt-1">
              <button
                type="submit"
                disabled={isLoading || !topic.trim()}
                className="bg-primary hover:bg-primary/90 text-on-primary font-label-md text-xs py-2 px-6 rounded-xl flex items-center gap-2 shadow-sm disabled:opacity-50 transition-all font-bold"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Synthesizing Curriculum...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Meme Lesson
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Loading Animation */}
          {isLoading && (
            <div className="p-8 flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full border-4 border-primary-container border-t-primary animate-spin"></div>
              <p className="text-sm font-bold text-on-surface">Designing Memetic Lesson Framework...</p>
              <p className="text-xs text-on-surface-variant">Connecting pedagogical objectives with modern digital vernacular.</p>
            </div>
          )}

          {/* Generated Result View */}
          {generatedLesson && (
            <div className="space-y-5 animate-fadeIn">
              {/* Title & Header */}
              <div className="p-4 bg-gradient-to-r from-primary-container/60 to-secondary-container/40 rounded-xl border border-primary/30 flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-base font-extrabold text-on-surface mb-1">
                    {generatedLesson.lesson_title}
                  </h4>
                  <p className="text-xs text-on-surface-variant font-medium">
                    🎯 <strong>Objective:</strong> {generatedLesson.learning_objective}
                  </p>
                </div>
                <button
                  onClick={handleDownload}
                  className="p-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-primary hover:bg-surface-container text-xs font-bold flex items-center gap-1 shrink-0"
                  title="Export Lesson"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>

              {/* Classroom Hook */}
              <div className="p-3.5 bg-surface-container rounded-xl border border-outline-variant space-y-1">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Classroom Opener / 30-Sec Hook
                </span>
                <p className="text-xs text-on-surface leading-relaxed">
                  {generatedLesson.hook}
                </p>
              </div>

              {/* Meme Analogy */}
              <div className="p-3.5 bg-surface-container rounded-xl border border-outline-variant space-y-1">
                <span className="text-xs font-bold text-secondary flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  The Memetic Analogy
                </span>
                <p className="text-xs text-on-surface leading-relaxed">
                  {generatedLesson.meme_analogy}
                </p>
              </div>

              {/* Short Video Script Outline */}
              <div className="space-y-2">
                <h5 className="text-xs font-extrabold text-on-surface uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  Micro-Video Script (Classroom Presentation)
                </h5>
                <div className="space-y-2">
                  {generatedLesson.short_video_script?.map((scene: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between font-bold text-primary text-[11px]">
                        <span>Scene {idx + 1} ({scene.timestamp})</span>
                        <span className="text-on-surface-variant font-normal italic truncate max-w-[200px]">
                          Visual: {scene.visual}
                        </span>
                      </div>
                      <p className="text-on-surface pt-1 leading-relaxed">
                        &ldquo;{scene.script}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discussion Prompts */}
              {generatedLesson.discussion_prompts && (
                <div className="p-3.5 bg-surface-container rounded-xl border border-outline-variant space-y-2 text-xs">
                  <span className="font-bold text-on-surface">💡 Socratic Discussion Prompts:</span>
                  <ul className="list-disc pl-4 space-y-1 text-on-surface-variant">
                    {generatedLesson.discussion_prompts.map((dp: string, i: number) => (
                      <li key={i}>{dp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Interactive Quick Quiz */}
              {generatedLesson.quick_check_quiz && (
                <div className="p-4 bg-surface-container-lowest border border-primary/30 rounded-xl space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                    <HelpCircle className="w-4 h-4" />
                    <span>Instant Check for Understanding</span>
                  </div>
                  <p className="text-xs font-semibold text-on-surface">
                    {generatedLesson.quick_check_quiz.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {generatedLesson.quick_check_quiz.options?.map((opt: string, idx: number) => {
                      const isSelected = selectedQuizOption === opt;
                      const isCorrect = opt === generatedLesson.quick_check_quiz.correct_answer;
                      let btnStyle = "bg-surface-container border-outline-variant text-on-surface";
                      if (quizSubmitted) {
                        if (isCorrect) btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-900 font-bold";
                        else if (isSelected) btnStyle = "bg-red-100 border-red-500 text-red-900";
                      } else if (isSelected) {
                        btnStyle = "bg-primary-container border-primary text-on-primary-container font-bold";
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            if (!quizSubmitted) setSelectedQuizOption(opt);
                          }}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      type="button"
                      disabled={!selectedQuizOption}
                      onClick={() => setQuizSubmitted(true)}
                      className="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-xs font-bold disabled:opacity-50"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <div className="p-2.5 bg-surface-container rounded-lg text-xs text-on-surface space-y-1">
                      <p className="font-bold flex items-center gap-1 text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                        Explanation:
                      </p>
                      <p className="text-on-surface-variant">
                        {generatedLesson.quick_check_quiz.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
