import React from "react";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  ListTodo,
  Award,
  CheckCircle2,
  Lock,
  Bookmark
} from "lucide-react";

export default function SkillAssessmentReview({
  selectedSkill,
  selectedLevel,
  mockQuestions,
  answers,
  markedForReview,
  reviewPage,
  setReviewPage,
  itemsPerReviewPage,
  setCurrentStep,
  handleFinishTest
}) {
  const totalPages = Math.ceil(mockQuestions.length / itemsPerReviewPage);
  const currentQuestions = mockQuestions.slice(
    (reviewPage - 1) * itemsPerReviewPage,
    reviewPage * itemsPerReviewPage
  );

  return (
    <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 space-y-5 text-left">
      {/* Header info bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="space-y-1.5">
          <button 
            onClick={() => setCurrentStep("assessment")}
            className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#2D24D0] hover:underline cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>Back to Test</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-950 font-poppins">{selectedSkill} Assessment Review</h1>
            <span className="px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-[9px] sm:text-[10px] font-bold text-[#2D24D0]">{selectedLevel}</span>
          </div>
          <p className="text-xs text-slate-400 font-semibold font-poppins">Review your answers before final submission</p>
        </div>
      </div>

      {/* Stepper Progress bar tracker */}
      <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-xl mx-auto relative select-none">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-100 -translate-y-1/2 z-0" />
          <div className="absolute top-1/2 left-0 w-2/3 h-[2px] bg-[#2D24D0] -translate-y-1/2 z-0" />

          {[
            { key: 1, label: "Instructions", active: false, done: true },
            { key: 2, label: "Assessment", active: false, done: true },
            { key: 3, label: "Review", active: true, done: false },
            { key: 4, label: "Results", active: false, done: false }
          ].map((step) => (
            <div key={step.key} className="flex flex-col items-center gap-1 z-10">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border transition ${
                step.key === 3 ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                step.key <= 2 ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                "bg-white border-slate-200 text-slate-400"
              }`}>
                {step.key}
              </div>
              <span className={`text-[9px] sm:text-[10px] font-bold ${step.key <= 3 ? "text-[#2D24D0]" : "text-slate-400"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-900 border-b border-slate-100 pb-2">Questions Review List</h3>

        <div className="space-y-3">
          {currentQuestions.map((q) => {
            const isAns = !!answers[q.id];
            const isMarked = !!markedForReview[q.id];

            return (
              <div key={q.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#2D24D0]">Q{q.id}.</span>
                    <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">{q.question}</h4>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block">Category: {q.category}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isMarked && (
                    <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-800 text-[9px] font-bold flex items-center gap-1">
                      <Bookmark size={9} /> Marked
                    </span>
                  )}
                  {isAns ? (
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Answered: Option {answers[q.id]}
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-800 text-[10px] font-bold">
                      Not Answered
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <button 
              disabled={reviewPage === 1}
              onClick={() => setReviewPage(reviewPage - 1)}
              className="border border-[#cbd5e1] disabled:opacity-40 hover:bg-slate-50 text-[#5e637d] font-bold text-xs px-3 py-1.5 rounded-xl transition cursor-pointer"
            >
              Prev
            </button>
            <span className="text-xs font-bold text-slate-600">Page {reviewPage} of {totalPages}</span>
            <button 
              disabled={reviewPage === totalPages}
              onClick={() => setReviewPage(reviewPage + 1)}
              className="border border-[#cbd5e1] disabled:opacity-40 hover:bg-slate-50 text-[#5e637d] font-bold text-xs px-3 py-1.5 rounded-xl transition cursor-pointer"
            >
              Next
            </button>
          </div>

          <button 
            onClick={handleFinishTest}
            className="bg-[#2D24D0] hover:bg-[#1f1a8c] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
          >
            Submit Test Now
          </button>
        </div>
      </div>
    </main>
  );
}
