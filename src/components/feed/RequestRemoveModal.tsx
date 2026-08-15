"use client";

import React, { useState } from "react";
import { X, ShieldAlert, Flag, Send } from "lucide-react";
import { Post } from "@/lib/data/mock-data";
import { useAuth } from "@/context/AuthContext";

interface RequestRemoveModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onReportSubmitted: (msg: string) => void;
}

const REPORT_REASONS = [
  "Inappropriate for School / Classroom Environment",
  "Bullying, Harassment, or Targeted Exclusion",
  "Misleading or Inaccurate Slang Definition",
  "Spam, Commercial, or Low Quality",
  "Other Policy Violation",
];

export default function RequestRemoveModal({
  post,
  isOpen,
  onClose,
  onReportSubmitted,
}: RequestRemoveModalProps) {
  const { user } = useAuth();
  const [selectedReason, setSelectedReason] = useState(REPORT_REASONS[0]);
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !post) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fullReason = details.trim()
        ? `${selectedReason}: ${details.trim()}`
        : selectedReason;

      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "request_remove",
          postId: post.id,
          reason: fullReason,
          reportedBy: user?.username || "@anonymous",
          reporterRole: user?.role || "educator",
        }),
      });

      onReportSubmitted("Removal request submitted to Admin Moderation Queue.");
      onClose();
    } catch (e) {
      console.warn("Report error:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-tertiary" />
            <h3 className="font-bold text-on-surface text-base">Request Post Removal</h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-variant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="p-3 bg-surface-container rounded-xl border border-outline-variant/60 text-xs">
            <span className="font-bold text-on-surface block mb-0.5">Reporting Post by {post.author_handle}:</span>
            <p className="text-on-surface-variant line-clamp-2 italic">&ldquo;{post.content}&rdquo;</p>
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1.5">
              Reason for Removal Request:
            </label>
            <div className="space-y-1.5">
              {REPORT_REASONS.map((r) => (
                <label
                  key={r}
                  onClick={() => setSelectedReason(r)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedReason === r
                      ? "border-primary bg-primary/5 text-primary font-bold"
                      : "border-outline-variant hover:bg-surface text-on-surface"
                  }`}
                >
                  <input
                    type="radio"
                    name="report_reason"
                    checked={selectedReason === r}
                    onChange={() => setSelectedReason(r)}
                    className="text-primary focus:ring-0"
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">
              Additional Context / Teacher Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Why should this post be moderated?"
              className="w-full bg-surface-container border border-outline-variant rounded-xl p-2.5 text-xs text-on-surface focus:outline-none focus:border-primary resize-none"
            ></textarea>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-variant"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-tertiary text-on-tertiary px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-50 hover:bg-tertiary/90"
            >
              <Send className="w-3.5 h-3.5" />
              {isSubmitting ? "Sending..." : "Submit Removal Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
