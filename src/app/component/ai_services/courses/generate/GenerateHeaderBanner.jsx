"use client";

import { useState } from "react";
import { Target, Compass, Bot } from "lucide-react";

export default function GenerateHeaderBanner() {
  const [goal] = useState({
    title: "Become AI/ML Engineer",
    targetRole: "AI/ML Engineer",
    experienceLevel: "Intermediate"
  });

  const [summary] = useState({
    skillsIdentified: 12,
    coursesFound: 24,
    learningHours: 18,
    matchPercent: "82%"
  });

  return (
    <section className="bg-gradient-to-b from-[#e3e5fc] to-[#ebedff] px-4 py-6 lg:px-8 shadow-sm">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <p className="mb-2 text-sm text-[#5e637d]">
          Home <span className="px-1.5">›</span> All Courses <span className="px-1.5">›</span> <b className="text-[#433be2] font-semibold">Generate Courses</b>
        </p>

        {/* Title */}
        <h1 className="text-3xl font-semibold font-poppins text-[#101014] sm:text-4xl tracking-tight mb-1">
          Generate Courses
        </h1>
        <p className="text-sm font-medium text-[#5e637d] mb-5">
          AI-powered course recommendations personalized for your career goals and skill gaps.
        </p>

        {/* Unified Dashboard Card */}
        <div className="bg-white border border-[#cbd5e1] rounded-2xl shadow-[0_6px_20px_rgba(67,59,226,0.05)] grid lg:grid-cols-[1.1fr_1.3fr_0.9fr] divide-y lg:divide-y-0 lg:divide-x divide-[#cbd5e1]/60">
          
          {/* Section 1: Your Learning Goal */}
          <div className="p-5 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-2.5">
                {/* Purple Hexagon Target Icon */}
                <div className="p-2 rounded-xl bg-[#f0efff] text-[#433be2] shrink-0">
                  <Target size={20} />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-semibold text-[#5e637d] uppercase tracking-wider block">Your Learning Goal</span>
                  <h3 className="text-sm font-semibold text-[#433be2]">{goal.title}</h3>
                </div>
              </div>

              <button 
                type="button" 
                className="rounded-xl border border-[#cbd5e1] hover:border-[#94a3b8] bg-white px-4 py-1.5 text-xs font-semibold text-[#433be2] transition shadow-2xs hover:bg-[#f8fafc] cursor-pointer shrink-0"
              >
                Change Goal
              </button>
            </div>

            <div className="mt-6 flex gap-12 text-xs">
              <div>
                <p className="text-[#64748b] font-semibold text-[10px]">Target role</p>
                <b className="text-[#101014] font-semibold block mt-0.5">{goal.targetRole}</b>
              </div>
              <div>
                <p className="text-[#64748b] font-semibold text-[10px]">Experience Level</p>
                <b className="text-[#101014] font-semibold block mt-0.5">{goal.experienceLevel}</b>
              </div>
            </div>
          </div>

          {/* Section 2: AI Recommendation Summary */}
          <div className="p-5 flex flex-col justify-between">
            <div className="flex items-start gap-2.5">
              {/* Compass summary icon */}
              <div className="p-2 rounded-xl bg-[#f0efff] text-[#433be2] shrink-0">
                <Compass size={20} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-semibold text-[#5e637d] uppercase tracking-wider block">AI Recommendation Summary</span>
                <p className="text-xs font-semibold text-[#475569] leading-snug">
                  We <span className="text-[#433be2] font-semibold underline cursor-pointer">analyzed your profile</span> and identified the skills you need to learn.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-2 text-center">
              <div className="bg-[#f0efff]/50 border border-[#e5e4fb] p-2.5 rounded-xl">
                <b className="text-base font-semibold text-[#334155] block leading-none">{summary.skillsIdentified}</b>
                <span className="text-[9px] font-semibold text-[#64748b] block mt-1 leading-none">Skill Identified</span>
              </div>
              <div className="bg-[#f0efff]/50 border border-[#e5e4fb] p-2.5 rounded-xl">
                <b className="text-base font-semibold text-[#334155] block leading-none">{summary.coursesFound}</b>
                <span className="text-[9px] font-semibold text-[#64748b] block mt-1 leading-none">Courses Found</span>
              </div>
              <div className="bg-[#f0efff]/50 border border-[#e5e4fb] p-2.5 rounded-xl">
                <b className="text-base font-semibold text-[#334155] block leading-none">{summary.learningHours}</b>
                <span className="text-[9px] font-semibold text-[#64748b] block mt-1 leading-none">Learning Hours</span>
              </div>
              <div className="bg-[#f0efff]/50 border border-[#e5e4fb] p-2.5 rounded-xl">
                <b className="text-base font-semibold text-[#334155] block leading-none">{summary.matchPercent}</b>
                <span className="text-[9px] font-semibold text-[#64748b] block mt-1 leading-none">Good Match</span>
              </div>
            </div>
          </div>

          {/* Section 3: AI Learning Assistant */}
          <div className="p-5 flex flex-col justify-between relative overflow-hidden min-h-[160px] lg:min-h-0">
            <div className="flex items-start gap-2.5 pr-20">
              {/* Bot icon */}
              <div className="p-2 rounded-xl bg-[#e0f2fe] text-[#0284c7] shrink-0">
                <Bot size={20} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-semibold text-[#0284c7] uppercase tracking-wider block">AI Learning Assistant</span>
                <p className="text-xs font-semibold text-[#475569] leading-relaxed mt-1">
                  These <span className="text-[#433be2] font-semibold underline cursor-pointer">courses will help you</span> close skill gaps and achieve your career goal faster.
                </p>
              </div>
            </div>
            
            {/* Detailed Vector SVG illustration of robot with briefcase and magnifier */}
            <div className="absolute bottom-2.5 right-2 w-24 h-24 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-bounce-slow">
                {/* Robot Body */}
                <rect x="35" y="45" width="30" height="30" rx="10" fill="#eef2f6" stroke="#433be2" strokeWidth="2.5" />
                <rect x="42" y="52" width="16" height="16" rx="4" fill="#cbd5e1" />
                
                {/* Robot Head */}
                <rect x="32" y="18" width="36" height="26" rx="8" fill="#ffffff" stroke="#433be2" strokeWidth="2.5" />
                {/* Eyes Visor */}
                <rect x="38" y="24" width="24" height="10" rx="3" fill="#1e293b" />
                <circle cx="44" cy="29" r="2" fill="#38bdf8" />
                <circle cx="56" cy="29" r="2" fill="#38bdf8" />
                
                {/* Ears */}
                <rect x="28" y="26" width="4" height="10" rx="2" fill="#433be2" />
                <rect x="68" y="26" width="4" height="10" rx="2" fill="#433be2" />
                
                {/* Antenna */}
                <line x1="50" y1="18" x2="50" y2="12" stroke="#433be2" strokeWidth="2.5" />
                <circle cx="50" cy="10" r="3" fill="#3b82f6" />
                
                {/* Left Hand holding Briefcase */}
                <path d="M26 62 Q31 55 35 55" stroke="#433be2" strokeWidth="2.5" fill="none" />
                {/* Blue Briefcase */}
                <rect x="16" y="58" width="16" height="14" rx="3" fill="#433be2" />
                <rect x="21" y="54" width="6" height="4" fill="none" stroke="#433be2" strokeWidth="1.5" />
                <circle cx="24" cy="65" r="1.5" fill="#f59e0b" />
                
                {/* Right Hand holding Magnifying Glass */}
                <path d="M65 60 Q69 60 74 58" stroke="#433be2" strokeWidth="2.5" fill="none" />
                {/* Magnifying Glass */}
                <circle cx="78" cy="56" r="6" fill="none" stroke="#433be2" strokeWidth="2.5" />
                <line x1="74" y1="60" x2="70" y2="65" stroke="#433be2" strokeWidth="2.5" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
