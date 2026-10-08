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
  XCircle,
  HelpCircle,
  Code2,
  Check,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  FileText
} from "lucide-react";

export default function SkillAssessmentResults({
  selectedSkill,
  selectedLevel,
  resultsScore,
  assessmentResult,
  mockQuestions,
  answers,
  setCurrentStep
}) {
  // Extract results from backend AI evaluation or fallback to local calculation
  const scorePercentage = assessmentResult?.percentage ?? resultsScore ?? 0;
  const isPassed = assessmentResult?.status === "passed" || scorePercentage >= 60;
  
  const totalQ = assessmentResult?.totalQuestions || mockQuestions?.length || 10;
  const correctCount = assessmentResult?.correctAnswers ?? (mockQuestions ? mockQuestions.filter(q => answers[q.id] === q.correct).length : 0);
  const incorrectCount = assessmentResult?.incorrectAnswers ?? (totalQ - correctCount);

  const questionReview = assessmentResult?.questionReview || mockQuestions?.map((q, idx) => ({
    questionNumber: idx + 1,
    question: q.question,
    selectedOption: answers[q.id] || "Not Answered",
    correctOption: q.correct,
    isCorrect: answers[q.id] === q.correct,
    explanation: q.explanation || `The correct option is ${q.correct}. Make sure to review basic ${selectedSkill} concepts for this topic.`,
    category: q.category || selectedSkill
  })) || [];

  const strengths = assessmentResult?.strengths || [
    `Solid grasp of core ${selectedSkill} syntax and standard conventions.`,
    `Strong problem-solving approach in ${selectedLevel} level topics.`
  ];

  const improvements = assessmentResult?.improvements || [
    `Practice edge-case handling and memory optimization techniques.`,
    `Review advanced ${selectedSkill} concepts and asynchronous patterns.`
  ];

  const recommendation = assessmentResult?.recommendation || 
    (isPassed 
      ? `Great job! You have demonstrated strong competency in ${selectedSkill} (${selectedLevel}). Consider taking advanced assessments to further validate your profile.`
      : `Keep practicing! We recommend reviewing fundamental ${selectedSkill} topics and retaking the assessment in a few days.`);

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
            { key: 4, label: "Results & Analysis", active: true, done: true }
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
          <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 flex flex-col items-center justify-center mx-auto shadow-inner ${
            isPassed ? "bg-emerald-50 border-emerald-500" : "bg-amber-50 border-amber-500"
          }`}>
            <span className={`text-3xl sm:text-4xl font-extrabold leading-none ${isPassed ? "text-emerald-600" : "text-amber-600"}`}>
              {Math.round(scorePercentage)}%
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">AI Overall Score</span>
          </div>

          <div>
            <h3 className={`text-lg font-extrabold ${isPassed ? "text-emerald-600" : "text-amber-600"}`}>
              {isPassed ? "🎉 Assessment Passed!" : "⚠️ Needs Improvement"}
            </h3>
            <p className="text-xs text-slate-400 font-semibold">Passing benchmark: 60%</p>
          </div>
        </div>

        <div className="space-y-4 text-left">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <TrendingUp size={16} className="text-[#2D24D0]" />
            <span>AI Performance Metrics</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-200/60">
              <span className="text-[10px] font-bold text-emerald-600 uppercase block">Correct Answers</span>
              <b className="text-base font-extrabold text-emerald-700">{correctCount} / {totalQ}</b>
            </div>
            <div className="p-3 rounded-2xl bg-rose-50/50 border border-rose-200/60">
              <span className="text-[10px] font-bold text-rose-600 uppercase block">Incorrect</span>
              <b className="text-base font-extrabold text-rose-700">{incorrectCount} / {totalQ}</b>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50/50 border border-blue-200/60 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-blue-600 uppercase block">Accuracy Score</span>
              <b className="text-base font-extrabold text-[#2D24D0]">{Math.round((correctCount / (totalQ || 1)) * 100)}%</b>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button 
              onClick={() => window.print()}
              className="bg-[#2D24D0] hover:bg-[#1f1a8c] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Download size={13} />
              <span>Download AI Report</span>
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

      {/* AI Feedback & Recommendation */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {/* Strengths */}
        <div className="bg-white border border-[#cbd5e1]/45 p-5 sm:p-6 rounded-3xl shadow-sm text-left space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 border-b border-slate-100 pb-2">
            <CheckCircle2 size={16} />
            <h3 className="text-xs sm:text-sm font-bold text-slate-800">Key Strengths Identified</h3>
          </div>
          <ul className="space-y-2">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="bg-white border border-[#cbd5e1]/45 p-5 sm:p-6 rounded-3xl shadow-sm text-left space-y-3">
          <div className="flex items-center gap-2 text-amber-600 border-b border-slate-100 pb-2">
            <AlertTriangle size={16} />
            <h3 className="text-xs sm:text-sm font-bold text-slate-800">Areas to Focus & Improve</h3>
          </div>
          <ul className="space-y-2">
            {improvements.map((imp, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/80 p-5 rounded-3xl text-left space-y-2">
        <div className="flex items-center gap-2 text-[#2D24D0]">
          <Sparkles size={16} />
          <h3 className="text-xs sm:text-sm font-bold">AI Career Copilot Recommendation</h3>
        </div>
        <p className="text-xs text-slate-700 font-medium leading-relaxed">{recommendation}</p>
      </div>

      {/* Detailed Question-by-Question Review with Correct Options & Explanations */}
      <div className="bg-white border border-[#cbd5e1]/45 p-5 sm:p-7 rounded-3xl shadow-sm space-y-5 text-left">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
              <FileText size={16} className="text-[#2D24D0]" />
              <span>Detailed Question Review & AI Explanations</span>
            </h3>
            <p className="text-xs text-slate-400 font-medium">Review correct options and concept explanations for each question.</p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {questionReview.length} Questions Evaluated
          </span>
        </div>

        <div className="space-y-4">
          {questionReview.map((q, idx) => {
            const isCorrect = q.isCorrect;
            return (
              <div 
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl border transition text-left space-y-3 ${
                  isCorrect 
                    ? "bg-emerald-50/30 border-emerald-200/70" 
                    : "bg-rose-50/30 border-rose-200/70"
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                      isCorrect ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                    }`}>
                      {q.questionNumber || idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">{q.question}</h4>
                      {q.category && (
                        <span className="text-[10px] font-semibold text-slate-400 block pt-0.5">
                          Category: {q.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 flex items-center gap-1 ${
                    isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                  }`}>
                    {isCorrect ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                    <span>{isCorrect ? "Correct" : "Incorrect"}</span>
                  </span>
                </div>

                {/* Choices Comparison Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                  <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-3xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Your Choice:</span>
                    <b className={`font-extrabold ${isCorrect ? "text-emerald-600" : "text-rose-600"}`}>
                      Option {q.selectedOption || "Not Answered"}
                    </b>
                  </div>

                  <div className="flex items-center gap-1.5 bg-emerald-100/70 border border-emerald-300 px-3 py-1.5 rounded-xl shadow-3xs">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase">Correct Option:</span>
                    <b className="font-extrabold text-emerald-800">Option {q.correctOption}</b>
                  </div>
                </div>

                {/* AI Explanation Box */}
                {q.explanation && (
                  <div className="bg-white/80 border border-slate-200/80 p-3.5 rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D24D0]">
                      <Lightbulb size={13} />
                      <span>AI Concept Explanation</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
