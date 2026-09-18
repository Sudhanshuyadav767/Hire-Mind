import React from "react";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Award,
  Lock,
  Signal,
  Code2,
  Monitor,
  Sparkles
} from "lucide-react";

export default function SkillAssessmentInstructions({
  selectedSkill,
  selectedLevel,
  selectedCategory,
  setCurrentStep,
  handleBeginAssessment
}) {
  return (
    <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 space-y-5 sm:space-y-6 text-left">
      {/* Header / Nav Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div className="space-y-1">
          <button 
            onClick={() => setCurrentStep("dashboard")}
            className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#2D24D0] hover:underline cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>Back to Skill Assessment</span>
          </button>
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-950 tracking-tight font-poppins">
              {selectedSkill} Assessment
            </h1>
            <span className="px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-[9px] sm:text-[10px] font-bold text-[#2D24D0]">
              {selectedLevel}
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-slate-400 font-semibold font-poppins">
            Test your {selectedSkill} skills and knowledge
          </p>
        </div>

        <div className="bg-[#eef1ff] border border-blue-100 rounded-2xl p-2.5 sm:p-3.5 flex items-center gap-2.5 shrink-0 self-start sm:self-center">
          <Clock size={16} className="text-[#2D24D0]" />
          <div className="text-left leading-tight">
            <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase block">Duration</span>
            <b className="text-[10px] sm:text-xs font-bold text-[#2D24D0]">30 - 45 Minutes</b>
          </div>
        </div>
      </div>

      {/* Step Progress Tracker */}
      <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-xl mx-auto relative select-none">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-100 -translate-y-1/2 z-0" />
          <div className="absolute top-1/2 left-0 w-1/3 h-[2px] bg-[#2D24D0] -translate-y-1/2 z-0" />

          {[
            { key: 1, label: "Instructions", active: true, done: false },
            { key: 2, label: "Assessment", active: false, done: false },
            { key: 3, label: "Review", active: false, done: false },
            { key: 4, label: "Results", active: false, done: false }
          ].map((step) => (
            <div key={step.key} className="flex flex-col items-center gap-1 z-10">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border transition ${
                step.key === 1 ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                "bg-white border-slate-200 text-slate-400"
              }`}>
                {step.key}
              </div>
              <span className={`text-[9px] sm:text-[10px] font-bold ${step.key === 1 ? "text-[#2D24D0]" : "text-slate-400"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-[1.8fr_1fr] items-start">
        {/* Instructions Panel */}
        <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm space-y-4 sm:space-y-6">
          <div className="space-y-0.5">
            <h3 className="text-sm sm:text-base font-bold text-[#1e293b]">Before You Start</h3>
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium">Please read the instructions carefully before beginning the assessment.</p>
          </div>

          <div className="space-y-3.5">
            {[
              { icon: Clock, bg: "bg-blue-50 text-blue-500", title: "Time Duration", desc: "The assessment has a time limit of 30-45 minutes. Make sure you have enough time to complete it." },
              { icon: HelpCircle, bg: "bg-amber-50 text-amber-500", title: "Questions", desc: "The assessment contains 10-15 questions covering Javascript concepts, problem solving, and best practices." },
              { icon: Award, bg: "bg-emerald-50 text-emerald-500", title: "Passing Score", desc: "You need to score 60% or higher to pass this assessment." },
              { icon: Lock, bg: "bg-purple-50 text-purple-500", title: "No Pause", desc: "The timer will start immediately and cannot be paused. Make sure you are ready to begin." },
              { icon: Signal, bg: "bg-cyan-50 text-cyan-500", title: "Stable Connection", desc: "Ensure you have a stable internet connection throughout the assessment." },
              { icon: Code2, bg: "bg-rose-50 text-rose-500", title: "Code Editor", desc: "For coding questions, use the built-in code editor. Your code will be automatically saved." }
            ].map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div key={index} className="flex gap-3 items-start border-b border-slate-50 pb-2.5 last:border-0 last:pb-0 text-left">
                  <div className={`p-[2vw] sm:p-2.5 rounded-xl ${item.bg} shrink-0`}>
                    <ItemIcon size={15} className="stroke-[1.5]" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[clamp(10px,3.2vw,12px)] font-bold text-[#334155]">{item.title}</h4>
                    <p className="text-[clamp(8.5px,2.6vw,10px)] text-slate-400 font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}

            <div className="bg-[#2D24D0]/5 border border-[#2D24D0]/10 rounded-2xl p-3 sm:p-4.5 flex gap-2.5 text-left">
              <Monitor size={15} className="text-[#2D24D0] shrink-0" />
              <div className="space-y-0.5">
                <h4 className="text-[11px] sm:text-xs font-bold text-[#2D24D0]">Assessment Integrity</h4>
                <p className="text-[9px] text-[#2D24D0]/80 font-bold leading-normal">
                  This assessment is monitored to ensure fairness and integrity. Please do not switch tabs or use any external help.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <button 
              onClick={() => setCurrentStep("dashboard")}
              className="border border-[#cbd5e1] hover:bg-slate-50 text-[#5e637d] font-bold text-[10px] sm:text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
            >
              Back
            </button>
            <button 
              onClick={handleBeginAssessment}
              className="bg-[#2D24D0] hover:bg-[#1f1a8c] text-white font-bold text-[10px] sm:text-xs px-5 py-3 rounded-xl transition flex items-center justify-center gap-1 cursor-pointer shadow-sm"
            >
              <span>Start Assessment</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Right column details */}
        <div className="space-y-5 sm:space-y-6">
          <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-5 rounded-3xl shadow-sm text-left space-y-3.5">
            <h3 className="text-[10px] sm:text-xs font-bold text-[#1e293b] uppercase tracking-wider select-none">Assessment Summary</h3>
            
            <div className="flex items-center gap-2.5 bg-slate-50/50 p-2 sm:p-2.5 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-extrabold text-[10px] sm:text-xs border border-amber-200">
                JS
              </div>
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold text-[#1E2229] leading-tight">{selectedSkill}</h4>
                <span className="text-[9px] font-bold text-slate-400">{selectedCategory}</span>
              </div>
            </div>
          </div>

          {/* Success Tips */}
          <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-5 rounded-3xl shadow-sm text-left space-y-3.5">
            <h3 className="text-[10px] sm:text-xs font-bold text-[#1e293b] uppercase tracking-wider select-none">Tips for Success</h3>
            
            <div className="space-y-3">
              {[
                { icon: HelpCircle, bg: "bg-blue-50 text-[#2D24D0]", title: "Read Carefully", desc: "Read each question carefully and understand what is being asked." },
                { icon: Clock, bg: "bg-purple-50 text-purple-600", title: "Manage Your Time", desc: "Keep an eye on the timer and manage your time effectively." },
                { icon: Code2, bg: "bg-blue-50 text-[#2D24D0]", title: "Test your Code", desc: "For coding questions, test your code with different inputs." },
                { icon: Sparkles, bg: "bg-cyan-50 text-cyan-600", title: "Stay Focused", desc: "Minimize distractions and focus on one question at a time." }
              ].map((tip, i) => {
                const TipIcon = tip.icon;
                return (
                  <div key={i} className="flex gap-2 text-left">
                    <div className="p-1.5 rounded-xl bg-blue-50 text-[#2D24D0] shrink-0">
                      <TipIcon size={12} className="stroke-[1.5]" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-[clamp(9.5px,2.8vw,11px)] font-bold text-slate-700">{tip.title}</h4>
                      <p className="text-[clamp(8.5px,2.6vw,10px)] text-slate-400 font-semibold leading-snug">{tip.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1 text-[9px] font-bold text-slate-400 pt-3 select-none">
        <Lock size={10} />
        <span>Your assessment data is secure and confidential.</span>
      </div>
    </main>
  );
}
