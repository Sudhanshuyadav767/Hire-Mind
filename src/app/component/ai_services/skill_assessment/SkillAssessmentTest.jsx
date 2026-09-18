import React from "react";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  ListTodo,
  Award,
  Bookmark,
  Trash2,
  Lock,
  CheckCircle2,
  Terminal,
  HelpCircle
} from "lucide-react";

export default function SkillAssessmentTest({
  selectedSkill,
  selectedLevel,
  mockQuestions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  answers,
  markedForReview,
  timeLeft,
  formatTime,
  handleOptionSelect,
  handleClearAnswer,
  handleToggleReview,
  countAnswered,
  setCurrentStep
}) {
  const currentQ = mockQuestions[currentQuestionIndex];

  return (
    <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 space-y-5 text-left">
      {/* Header info bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="space-y-1.5">
          <button 
            onClick={() => setCurrentStep("dashboard")}
            className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#2D24D0] hover:underline cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>Back to Skill Assessment</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-950 font-poppins">{selectedSkill} Assessment</h1>
            <span className="px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-[9px] sm:text-[10px] font-bold text-[#2D24D0]">{selectedLevel}</span>
          </div>
          <p className="text-xs text-slate-400 font-semibold font-poppins">Test your {selectedSkill} skills and knowledge</p>
        </div>

        <div className="flex items-center gap-3 select-none">
          <div className="bg-[#eef1ff] border border-blue-100 rounded-2xl p-2.5 flex items-center gap-2">
            <Clock size={16} className="text-[#2D24D0]" />
            <div className="text-left leading-none">
              <span className="text-[8px] font-bold text-slate-400 uppercase">Duration</span>
              <b className="text-[10px] font-bold text-[#2D24D0] block pt-0.5">30 - 45 Minutes</b>
            </div>
          </div>
          <div className="bg-[#eef1ff] border border-blue-100 rounded-2xl p-2.5 flex items-center gap-2">
            <ListTodo size={16} className="text-[#2D24D0]" />
            <div className="text-left leading-none">
              <span className="text-[8px] font-bold text-slate-400 uppercase">Questions</span>
              <b className="text-[10px] font-bold text-[#2D24D0] block pt-0.5">10-15</b>
            </div>
          </div>
          <div className="bg-[#eef1ff] border border-blue-100 rounded-2xl p-2.5 flex items-center gap-2">
            <Award size={16} className="text-[#2D24D0]" />
            <div className="text-left leading-none">
              <span className="text-[8px] font-bold text-slate-400 uppercase">Passing Score</span>
              <b className="text-[10px] font-bold text-[#2D24D0] block pt-0.5">60%</b>
            </div>
          </div>
        </div>
      </div>

      {/* Stepper Progress bar tracker */}
      <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-xl mx-auto relative select-none">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-100 -translate-y-1/2 z-0" />
          <div className="absolute top-1/2 left-0 w-1/3 h-[2px] bg-[#2D24D0] -translate-y-1/2 z-0" />

          {[
            { key: 1, label: "Instructions", active: false, done: true },
            { key: 2, label: "Assessment", active: true, done: false },
            { key: 3, label: "Review", active: false, done: false },
            { key: 4, label: "Results", active: false, done: false }
          ].map((step) => (
            <div key={step.key} className="flex flex-col items-center gap-1 z-10">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border transition ${
                step.key === 2 ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                step.key === 1 ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                "bg-white border-slate-200 text-slate-400"
              }`}>
                {step.key}
              </div>
              <span className={`text-[9px] sm:text-[10px] font-bold ${step.key <= 2 ? "text-[#2D24D0]" : "text-slate-400"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Split test viewport */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-[1.8fr_1fr] items-start">
        {/* Main question card */}
        <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm space-y-4 text-left">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 select-none">
            <div className="space-y-0.5">
              <span className="text-[9px] font-bold text-[#2D24D0] uppercase tracking-wider block">Question {currentQuestionIndex + 1} of {mockQuestions.length}</span>
              <span className="text-[9px] font-bold text-slate-400">Category: {currentQ.category}</span>
            </div>
            <button 
              onClick={handleToggleReview}
              className={`flex items-center gap-1 text-[9px] sm:text-[10px] font-bold px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                markedForReview[currentQ.id]
                  ? "bg-amber-500 border-amber-500 text-white"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Bookmark size={11} />
              <span>{markedForReview[currentQ.id] ? "Marked for Review" : "Mark for Review"}</span>
            </button>
          </div>

          <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug font-poppins">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.key;
              return (
                <div 
                  key={opt.key}
                  onClick={() => handleOptionSelect(opt.key)}
                  className={`p-3 sm:p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-between cursor-pointer transition ${
                    isSelected 
                      ? "bg-[#2D24D0]/5 border-[#2D24D0] text-[#2D24D0]" 
                      : "bg-slate-50/50 border-gray-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg font-bold text-[10px] flex items-center justify-center border shrink-0 ${
                      isSelected ? "bg-[#2D24D0] border-[#2D24D0] text-white" : "bg-white border-slate-200 text-slate-500"
                    }`}>
                      {opt.key}
                    </span>
                    <span className="text-[11px] sm:text-xs leading-normal">{opt.text}</span>
                  </div>
                  {isSelected && <CheckCircle2 size={15} className="text-[#2D24D0] shrink-0" />}
                </div>
              );
            })}
          </div>

          {/* Bottom actions */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
            <button 
              onClick={handleClearAnswer}
              className="text-slate-400 hover:text-rose-600 text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
            >
              <Trash2 size={12} />
              <span>Clear Option</span>
            </button>

            <div className="flex items-center gap-2">
              <button 
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                className="border border-[#cbd5e1] disabled:opacity-40 hover:bg-slate-50 text-[#5e637d] font-bold text-[10px] sm:text-xs px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Previous
              </button>

              {currentQuestionIndex < mockQuestions.length - 1 ? (
                <button 
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                  className="bg-[#2D24D0] hover:bg-[#1f1a8c] text-white font-bold text-[10px] sm:text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-sm"
                >
                  Next
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentStep("review")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] sm:text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-sm"
                >
                  Submit & Review
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right column palette */}
        <div className="space-y-4 text-left">
          <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-5 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#2D24D0]" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Time Remaining</span>
              </div>
              <span className="text-sm font-extrabold text-[#2D24D0] font-mono bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-100">
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase">Question Palette</h4>
              <div className="grid grid-cols-4 gap-2">
                {mockQuestions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAns = !!answers[q.id];
                  const isMarked = !!markedForReview[q.id];

                  return (
                    <button 
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-9 rounded-xl font-bold text-xs border transition cursor-pointer flex items-center justify-center relative ${
                        isCurrent 
                          ? "bg-[#2D24D0] border-[#2D24D0] text-white shadow-sm" 
                          : isMarked
                          ? "bg-amber-100 border-amber-300 text-amber-800"
                          : isAns
                          ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[9px] font-bold text-slate-500">
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Answered ({countAnswered()})</div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Marked for Review ({Object.keys(markedForReview).filter(k=>markedForReview[k]).length})</div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" /> Not Answered ({mockQuestions.length - countAnswered()})</div>
            </div>

            <button 
              onClick={() => setCurrentStep("review")}
              className="w-full bg-[#2D24D0] hover:bg-[#1f1a8c] text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer shadow-sm"
            >
              Finish Assessment
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
