"use client";

import { useState, useEffect } from "react";
import { 
  GraduationCap, 
  Clock3, 
  Rocket, 
  Award, 
  Lightbulb, 
  Bot 
} from "lucide-react";
import { fetchUserOverview } from "./mockData";

const iconMap = {
  completed: GraduationCap,
  hours: Clock3,
  skills: Rocket,
  readiness: Award
};

export default function CoursesOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchUserOverview().then(res => {
      if (active) {
        setData(res);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-[#e3e5fc] to-[#ebedff] px-4 py-6 lg:px-8 shadow-sm">
        <div className="mx-auto max-w-7xl animate-pulse">
          {/* Breadcrumbs Skeleton */}
          <div className="h-4 w-40 bg-slate-300/60 rounded-md mb-2"></div>
          {/* Title Skeleton */}
          <div className="h-8 w-60 bg-slate-300/80 rounded-md mb-1.5"></div>
          <div className="h-4 w-96 bg-slate-300/50 rounded-md mb-5"></div>

          {/* Cards Row Skeleton */}
          <div className="mt-5 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-5 h-[168px] bg-white/70 rounded-2xl border border-white/20"></div>
            <div className="lg:col-span-3 h-[168px] bg-white/70 rounded-2xl border border-white/20"></div>
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="h-[78px] bg-white/70 rounded-2xl"></div>
              <div className="h-[78px] bg-white/70 rounded-2xl"></div>
              <div className="h-[78px] bg-white/70 rounded-2xl"></div>
              <div className="h-[78px] bg-white/70 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-[#e3e5fc] to-[#ebedff] px-4 py-6 lg:px-8 shadow-sm">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <p className="mb-2 text-sm text-[#5e637d]">
          Home <span className="px-1.5">›</span> AI Learning <span className="px-1.5">›</span> <b className="text-[#433be2] font-semibold">All Courses</b>
        </p>

        {/* Title */}
        <h1 className="text-3xl font-semibold font-poppins text-[#101014] sm:text-4xl tracking-tight">
          All Courses
        </h1>
        <p className="mt-1 text-sm font-medium text-[#5e637d]">
          Discover, learn and grow with AI-powered personalized courses.
        </p>

        {/* Horizontal Cards Row */}
        <div className="mt-5 grid gap-4 lg:grid-cols-12">
          
          {/* Welcome back Aman Card */}
          <div className="lg:col-span-5 grid gap-4 rounded-2xl border border-[#d2d6f0] bg-white p-4 shadow-xs sm:grid-cols-2">
            {/* Left side: AI Score & Continue Learning */}
            <div className="flex flex-col justify-between border-b border-[#eef1ff] pb-3 sm:border-b-0 sm:border-r sm:border-[#eef1ff] sm:pb-0 sm:pr-4">
              <div>
                <h2 className="text-base font-semibold text-[#101014]">{data.welcomeMessage}</h2>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#5e637d] leading-tight">Your AI learning Score</span>
                  <div className="relative flex items-center justify-center h-12 w-12 rounded-full border-4 border-[#eef1ff] border-t-[#433be2]">
                    <span className="text-sm font-semibold text-[#101014]">
                      {data.learningScore}<small className="text-[9px] text-[#5e637d]">/100</small>
                    </span>
                  </div>
                </div>
              </div>
              <button 
                type="button" 
                className="mt-3 w-full rounded-xl bg-[#433be2] hover:bg-[#3129c8] py-2 text-xs font-semibold text-white shadow-sm transition cursor-pointer"
              >
                Continue Learning
              </button>
            </div>
            
            {/* Right side: Goal & Generate Path */}
            <div className="flex flex-col justify-between text-xs space-y-2">
              <div>
                <p className="text-[#5e637d] font-semibold uppercase tracking-wider text-[10px]">Current Goal</p>
                <b className="text-sm text-[#433be2] font-semibold block mt-0.5">{data.currentGoal}</b>
                
                <p className="mt-3 text-[#5e637d] font-semibold uppercase tracking-wider text-[10px]">Recommended Next Skill</p>
                <b className="text-sm text-[#433be2] font-semibold block mt-0.5">{data.recommendedSkill}</b>
              </div>
              <button 
                type="button" 
                className="mt-2 w-full rounded-xl border border-[#d9dcf7] bg-white hover:bg-[#f8fafc] py-2 text-xs font-semibold text-[#433be2] shadow-xs transition cursor-pointer"
              >
                Generate Learning Path
              </button>
            </div>
          </div>

          {/* AI Suggestion Card */}
          <div className="lg:col-span-3 relative overflow-hidden rounded-2xl border border-[#d2d6f0] bg-white p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[#433be2]">
                <Lightbulb size={18} className="fill-[#eef1ff]" />
                <b className="text-sm font-semibold text-[#101014]">AI Suggestion</b>
              </div>
              <p className="mt-2.5 max-w-[200px] text-xs font-medium text-[#475569] leading-relaxed">
                Based on your profile, learning <span className="font-semibold text-[#433be2]">Machine Learning</span> can increase your job match score by <span className="font-semibold text-[#433be2]">27%</span>.
              </p>
            </div>
            
            {/* Cute robot vector SVG / Icon */}
            <div className="absolute bottom-2 right-2 text-[#433be2] opacity-80 animate-bounce-slow">
              <Bot size={56} className="text-[#433be2] stroke-1" />
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            {data.statistics.map(({ type, label, value }) => {
              const Icon = iconMap[type] || GraduationCap;
              return (
                <div 
                  className="flex flex-col items-center justify-center rounded-2xl border border-[#d2d6f0] bg-white p-3 text-center shadow-xs hover:border-[#433be2] transition" 
                  key={label}
                >
                  <div className="p-2 rounded-full bg-[#f1f3ff] text-[#433be2] mb-1.5">
                    <Icon size={18} />
                  </div>
                  <span className="text-xs font-semibold text-[#64748b] leading-tight px-1">{label}</span>
                  <b className="mt-1 text-lg font-semibold text-[#101014]">{value}</b>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
