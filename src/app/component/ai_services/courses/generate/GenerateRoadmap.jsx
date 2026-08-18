"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Target, 
  TrendingUp, 
  Cpu, 
  List, 
  ChevronUp, 
  Star,
  BookOpen
} from "lucide-react";

const tabs = [
  { id: "recommended", label: "Recommended for you", icon: Sparkles },
  { id: "skillGap", label: "Skill Gap Focused", icon: Target },
  { id: "careerPath", label: "Career Path Based", icon: Cpu },
  { id: "trending", label: "Trending Skills", icon: TrendingUp },
  { id: "all", label: "All Courses", icon: List }
];

const roadmapCourses = Array.from({ length: 8 }, (_, idx) => {
  const level = idx % 3 === 0 ? "Intermediate" : idx % 3 === 1 ? "Beginner" : "Advanced";
  const duration = idx % 2 === 0 ? "24 hours" : "32 hours";
  
  // Custom tag listings to look premium
  const tags = idx % 2 === 0 
    ? ["Python", "Pandas", "NumPy"] 
    : ["Machine Learning", "Scikit-Learn", "Regression"];

  return {
    id: idx + 1,
    title: idx % 3 === 0 ? "Python for Data Science" : idx % 3 === 1 ? "Machine Learning Fundamentals" : "Applied AI & Deep Learning",
    provider: "Coursera",
    level,
    duration,
    tags,
    aiMatch: "95%",
    rating: "4.8",
    reviews: "12.4K"
  };
});

export default function GenerateRoadmap() {
  const [activeTab, setActiveTab] = useState("recommended");

  return (
    <div className="space-y-5">
      
      {/* Dynamic Tab Bar */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#e2e8f0] bg-white rounded-2xl p-2 shadow-xs">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                isActive 
                  ? "bg-[#eef1ff] text-[#433be2]" 
                  : "text-[#64748b] hover:text-[#334155] hover:bg-slate-50"
              }`}
            >
              <TabIcon size={14} className={isActive ? "text-[#433be2]" : "text-[#64748b]"} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Top Recommendations Banner */}
      <div className="rounded-2xl border border-[#cbd5e1] bg-white p-4.5 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="text-[#433be2] fill-[#433be2]/10 shrink-0" size={20} />
          <div className="space-y-0.5">
            <h4 className="text-sm font-semibold text-[#101014]">Top Recommendations</h4>
            <p className="text-xs text-[#5e637d] font-semibold leading-snug">
              Complete these recommended courses to increase your job match score <span className="text-[#433be2] font-semibold">by 87%</span>.
            </p>
          </div>
        </div>

        {/* Circular Progress Gauge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold text-[#334155]">AI Match Score</span>
          <div className="relative flex items-center justify-center w-11 h-11">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#10b981]"
                strokeDasharray="85, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-[10px] font-semibold text-[#101014]">85%</div>
          </div>
        </div>
      </div>

      {/* Your Personalized Career Roadmap Title */}
      <div>
        <h3 className="text-md font-semibold text-[#101014] flex items-baseline gap-1.5">
          <span>Your Personalized Career Roadmap</span>
          <span className="text-xs font-semibold text-[#64748b]">({roadmapCourses.length} courses)</span>
        </h3>
      </div>

      {/* Numbered Vertical Timeline Grid */}
      <div className="relative pl-12 space-y-4">
        {/* Connection Line */}
        <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-[#e2e8f0]" />

        {roadmapCourses.map((course) => (
          <div key={course.id} className="relative flex items-center">
            
            {/* Timeline Number Circle */}
            <div className="absolute -left-[38px] w-8 h-8 rounded-full border-2 border-[#cbd5e1] bg-white text-[#64748b] text-xs font-semibold flex items-center justify-center shadow-xs z-10">
              {course.id}
            </div>

            {/* Course Card Details */}
            <div className="w-full rounded-2xl border border-[#e2e8f0] bg-white p-3.5 shadow-xs hover:border-[#433be2] transition flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* Left: Banner Graphic */}
              <div className="relative h-[90px] w-full md:w-[150px] overflow-hidden rounded-xl bg-gradient-to-br from-[#0c1033] to-[#1a237e] text-white flex flex-col items-center justify-center p-3 shrink-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:10px_16px] opacity-20" />
                <span className="text-xs font-semibold tracking-wider text-center drop-shadow-sm">Python</span>
                <span className="text-[8px] text-[#ffa000] font-semibold uppercase tracking-wider text-center drop-shadow-sm leading-none mt-0.5">Programming</span>
              </div>

              {/* Center: Info */}
              <div className="flex-1 space-y-2">
                <div>
                  <h4 className="text-sm font-semibold text-[#101014] leading-snug line-clamp-1">
                    {course.title}
                  </h4>
                  <button className="text-[11px] font-semibold text-[#433be2] hover:text-[#3129c8] hover:underline cursor-pointer mt-0.5 block">
                    {course.provider}
                  </button>
                </div>
                
                <div className="text-[11px] font-semibold text-[#64748b]">
                  {course.level} <span className="px-1">•</span> {course.duration}
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1">
                  {course.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="rounded-lg bg-gray-50 border border-gray-150 px-2 py-0.5 text-[9px] font-semibold text-[#475569]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Score, ratings, and button */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 md:border-l md:border-[#f1f5f9] md:pl-5 shrink-0">
                
                {/* AI Match Badge */}
                <div className="text-xs font-semibold text-[#10b981] flex items-center gap-1">
                  <span>AI Match</span>
                  <span>{course.aiMatch}</span>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#334155]">
                  <Star size={12} className="text-[#f59e0b] fill-[#f59e0b]" />
                  <span>{course.rating}</span>
                  <span className="text-[#64748b] font-medium">({course.reviews})</span>
                </div>

                {/* Button */}
                <button className="rounded-xl bg-[#433be2] hover:bg-[#3129c8] px-4.5 py-2 text-xs font-semibold text-white transition shadow-sm cursor-pointer">
                  View Course
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Show Less Button */}
      <div className="text-center pt-2">
        <button 
          type="button" 
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#cbd5e1] bg-white px-5 py-2.5 text-xs font-semibold text-[#475569] shadow-xs hover:bg-[#f8fafc] cursor-pointer"
        >
          <span>Show Less</span>
          <ChevronUp size={14} className="text-gray-500" />
        </button>
      </div>

    </div>
  );
}
