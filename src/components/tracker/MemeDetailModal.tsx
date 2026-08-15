"use client";

import React from "react";
import { X, Sparkles, BookOpen, GraduationCap, School, Share2 } from "lucide-react";
import { MemeTrend } from "@/lib/data/mock-data";

interface MemeDetailModalProps {
  meme: MemeTrend | null;
  onClose: () => void;
}

export default function MemeDetailModal({ meme, onClose }: MemeDetailModalProps) {
  if (!meme) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container">
              {meme.category}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-surface-container border border-outline-variant text-on-surface-variant">
              {meme.trend_status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-full hover:bg-surface-variant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-4">
          {/* Media Header */}
          <div className="rounded-xl overflow-hidden border border-outline-variant max-h-56 w-full bg-black flex items-center justify-center">
            <img
              src={meme.image_url}
              alt={meme.title}
              className="w-full h-56 object-cover"
            />
          </div>

          <div>
            <h3 className="font-headline-md text-2xl font-extrabold text-on-surface">
              {meme.title}
            </h3>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              {meme.description}
            </p>
          </div>

          {/* Slang Keywords */}
          {meme.slang_terms && meme.slang_terms.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {meme.slang_terms.map((st, i) => (
                <span
                  key={i}
                  className="text-[11px] font-semibold bg-surface-container border border-outline-variant text-on-surface px-2.5 py-1 rounded-lg"
                >
                  #{st}
                </span>
              ))}
            </div>
          )}

          {/* Cultural Context */}
          {meme.cultural_context && (
            <div className="p-3.5 bg-surface-container rounded-xl border border-outline-variant/60 text-xs space-y-1">
              <span className="font-bold text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Cultural Vectors & Student Meaning:
              </span>
              <p className="text-on-surface leading-relaxed">{meme.cultural_context}</p>
            </div>
          )}

          {/* Teacher vs Student Guidance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Teacher Tips */}
            <div className="p-3.5 bg-primary-container/30 border border-primary/25 rounded-xl text-xs space-y-1">
              <span className="font-bold text-primary flex items-center gap-1.5">
                <School className="w-4 h-4" />
                For Teachers:
              </span>
              <p className="text-on-surface leading-relaxed">
                {meme.teacher_tips || "Use with light irony; perfect for slide transitions and rapport building."}
              </p>
            </div>

            {/* Student Notes */}
            <div className="p-3.5 bg-secondary-container/40 border border-secondary/30 rounded-xl text-xs space-y-1">
              <span className="font-bold text-secondary flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                For Students:
              </span>
              <p className="text-on-surface leading-relaxed">
                {meme.student_notes || "Keep it friendly and inclusive in group study chats."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
