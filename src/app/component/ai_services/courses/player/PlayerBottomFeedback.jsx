"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";

export default function PlayerBottomFeedback({
  activeLessonId,
  feedbackStatus,
  onFeedbackChange
}) {
  
  // Calculate percentage dynamically
  const progressPercent = (activeLessonId / 24) * 100;

  return (
    <section className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-4.5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
      
      {/* Was this helpful ratings */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-[#475569]">Was this lesson helpful?</span>
        <div className="flex gap-2">
          {/* Thumbs Up Button */}
          <button 
            onClick={() => onFeedbackChange(feedbackStatus === "liked" ? null : "liked")}
            className={`p-2 border rounded-xl transition cursor-pointer ${
              feedbackStatus === "liked"
                ? "border-[#433be2] bg-[#eef1ff] text-[#433be2]"
                : "border-[#cbd5e1] hover:border-[#433be2] hover:bg-[#eef1ff] hover:text-[#433be2] text-[#64748b]"
            }`}
          >
            <ThumbsUp size={14} />
          </button>
          
          {/* Thumbs Down Button */}
          <button 
            onClick={() => onFeedbackChange(feedbackStatus === "disliked" ? null : "disliked")}
            className={`p-2 border rounded-xl transition cursor-pointer ${
              feedbackStatus === "disliked"
                ? "border-red-500 bg-red-50 text-red-500"
                : "border-[#cbd5e1] hover:border-red-500 hover:bg-red-50 hover:text-red-500 text-[#64748b]"
            }`}
          >
            <ThumbsDown size={14} />
          </button>
        </div>
      </div>

      {/* Lesson Count Progress */}
      <div className="flex items-center gap-3 w-full md:max-w-md flex-1">
        <span className="text-xs font-medium text-[#475569] whitespace-nowrap">
          Lesson {activeLessonId} of 24
        </span>
        <div className="h-2 bg-gray-100 border border-gray-50 rounded-full w-full overflow-hidden">
          <div 
            className="h-full bg-[#433be2] rounded-full transition-all duration-300" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </div>

      {/* Write Feedback */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs font-medium text-[#64748b] hidden sm:inline">Have feedback?</span>
        <button 
          type="button" 
          className="rounded-xl border border-[#cbd5e1] hover:border-[#94a3b8] bg-white hover:bg-slate-50 px-4.5 py-2.5 text-xs font-medium text-[#475569] transition shadow-3xs cursor-pointer"
        >
          Give Feedback
        </button>
      </div>

    </section>
  );
}
