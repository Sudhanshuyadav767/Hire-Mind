import React from "react";
import Link from "next/link";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  Award,
  Share2,
  Download,
  CheckCircle2,
  HelpCircle,
  Code2,
  Check
} from "lucide-react";

export default function SkillAssessmentResults({
  selectedSkill,
  selectedLevel,
  resultsScore,
  mockQuestions,
  answers,
  setCurrentStep
}) {
  const isPassed = resultsScore >= 60;
  const correctAnswersCount = mockQuestions.filter(q => answers[q.id] === q.correct).length;

  return (
    <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 space-y-6 text-left">
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
            <h1 className="text-xl sm:text-2xl font-bold text-gray-950 font-poppins">{selectedSkill} Assessment Results</h1>
            <span className="px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-[9px] sm:text-[10px] font-bold text-[#2D24D0]">{selectedLevel}</span>
          </div>
          <p className="text-xs text-slate-400 font-semibold font-poppins">Comprehensive AI performance breakdown and recommendations</p>
        </div>
      </div>

      {/* Stepper Progress bar tracker */}
      <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-xl mx-auto relative select-none">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#2D24D0] -translate-y-1/2 z-0" />

          {[
            { key: 1, label: "Instructions", active: false, done: true },
            { key: 2, label: "Assessment", active: false, done: true },
            { key: 3, label: "Review", active: false, done: true },
            { key: 4, label: "Results", active: true, done: true }
          ].map((step) => (
            <div key={step.key} className="flex flex-col items-center gap-1 z-10">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border transition bg-[#2D24D0] border-[#2D24D0] text-white">
                {step.key}
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#2D24D0]">
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Score Summary Box */}
      <div className="bg-white border border-[#cbd5e1]/45 p-6 sm:p-8 rounded-3xl shadow-sm grid gap-6 md:grid-cols-[1fr_2fr] items-center">
        <div className="text-center space-y-2 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-50 border-4 border-[#2D24D0] flex flex-col items-center justify-center mx-auto shadow-inner">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#2D24D0] leading-none">{resultsScore}%</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">Score</span>
          </div>

          <div>
            <h3 className={`text-lg font-extrabold ${isPassed ? "text-emerald-600" : "text-amber-600"}`}>
              {isPassed ? "Assessment Passed!" : "Needs Improvement"}
            </h3>
            <p className="text-xs text-slate-400 font-semibold">Passing criteria: 60%</p>
          </div>
        </div>

        <div className="space-y-4 text-left">
          <h3 className="text-sm font-bold text-slate-800">Performance Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Correct</span>
              <b className="text-base font-extrabold text-emerald-600">{correctAnswersCount} / {mockQuestions.length}</b>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Accuracy</span>
              <b className="text-base font-extrabold text-[#2D24D0]">{Math.round((correctAnswersCount / mockQuestions.length) * 100)}%</b>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Percentile</span>
              <b className="text-base font-extrabold text-purple-600">Top 15%</b>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button className="bg-[#2D24D0] hover:bg-[#1f1a8c] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm">
              <Download size={13} />
              <span>Download Report</span>
            </button>
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer">
              <Share2 size={13} />
              <span>Share Score</span>
            </button>
            <button 
              onClick={() => setCurrentStep("dashboard")}
              className="border border-[#cbd5e1] hover:bg-slate-50 text-[#5e637d] px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ml-auto"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
