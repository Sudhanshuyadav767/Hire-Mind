"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Folder, 
  MessageSquare, 
  Bot 
} from "lucide-react";
import { 
  fetchRecommendedTracks,
  fetchSkillGapData,
  fetchCareerOutcomes,
  fetchTopSkills,
  fetchDiscussions
} from "./mockData";

// 1. Recommended For You Component
export function RecommendedForYou() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchRecommendedTracks().then(res => {
      if (active) {
        setTracks(res);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  return (
    <section className="rounded-3xl border border-[#e2e8f0] bg-[#f0f2ff] p-5 shadow-xs">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#101014]">Recommended For You</h3>
        </div>
        <button className="text-sm font-semibold text-[#433be2] hover:text-[#3129c8] inline-flex items-center gap-1 cursor-pointer">
          <span>View All</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="mobile-card-swipe grid gap-4 sm:grid-cols-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-[96px] bg-white rounded-2xl animate-pulse"></div>
          ))
        ) : (
          tracks.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-start gap-3 rounded-2xl border border-white bg-white p-4 shadow-xs hover:shadow-sm transition"
            >
              {/* Sparkle Icon Container */}
              <div className="p-2 rounded-xl bg-[#f0efff] text-[#433be2]">
                <Sparkles size={16} className="fill-[#433be2]/10" />
              </div>
              
              {/* Content */}
              <div className="space-y-1.5 flex-1">
                <h4 className="text-sm font-semibold text-[#101014]">{item.title}</h4>
                <p className="text-xs font-semibold text-[#64748b]">{item.type}</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#eef1ff] px-2 py-0.5 text-[10px] font-semibold text-[#433be2]">
                  <CheckCircle2 size={10} className="fill-[#433be2]/10" />
                  Verified
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

// 2. Skill Gap Analyzer Component
export function SkillGapAnalyzer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchSkillGapData().then(res => {
      if (active) {
        setData(res);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  return (
    <div className="rounded-3xl border border-[#e2e8f0] bg-white p-5 shadow-xs flex flex-col justify-between h-full min-h-[300px]">
      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-5 w-40 bg-slate-200 rounded"></div>
          <div className="h-4 w-full bg-slate-100 rounded"></div>
          <div className="grid grid-cols-[100px_1fr] gap-5 mt-5">
            <div className="h-24 w-24 bg-slate-150 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-slate-100 rounded"></div>
              <div className="h-3 w-4/5 bg-slate-100 rounded"></div>
              <div className="h-3 w-5/6 bg-slate-100 rounded"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>
            {/* Title */}
            <h3 className="text-lg font-semibold text-[#433be2]">Skill Gap Analyzer</h3>
            
            {/* Sub-header row */}
            <div className="mt-1 flex items-center justify-between text-xs font-semibold text-[#64748b]">
              <span>Current role: <span className="text-[#334155]">{data.currentRole}</span></span>
              <span>Target role: <span className="text-[#334155]">{data.targetRole}</span></span>
            </div>

            {/* Chart Layout */}
            <div className="mt-5 grid grid-cols-[100px_1fr] gap-5 items-center">
              {/* Circular Score Gauge */}
              <div className="relative flex items-center justify-center w-24 h-24">
                <svg className="w-full h-full transform -rotate-95" viewBox="0 0 36 36">
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
                    className="text-[#433be2]"
                    strokeDasharray={`${data.overallScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-xl font-semibold text-[#101014]">{data.overallScore}</span>
                  <span className="text-[10px] font-semibold text-[#64748b] -mt-1">/100</span>
                </div>
              </div>

              {/* Skill Progress Bars */}
              <div className="space-y-2.5">
                {data.skills.map((skill) => (
                  <div key={skill.title} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#334155]">
                      <span>{skill.title}</span>
                      <span>{skill.value}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-100 border border-gray-50">
                      <div 
                        className={`h-full rounded-full ${skill.color}`} 
                        style={{ width: `${skill.value}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Missing Skills & Button */}
          <div className="mt-5 pt-3 border-t border-[#f1f5f9] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 self-start">
              <span className="text-xs font-semibold text-[#64748b]">Missing Skills:</span>
              {data.missingSkills.map((sk) => (
                <span key={sk} className="rounded-lg bg-[#eef2ff] px-2.5 py-1 text-xs font-semibold text-[#433be2]">
                  {sk}
                </span>
              ))}
            </div>
            <Link href="/ai-services/courses/generate" className="w-full sm:w-auto">
              <button className="w-full rounded-xl bg-[#433be2] hover:bg-[#3129c8] px-4.5 py-2.5 text-xs font-semibold text-white shadow-sm transition cursor-pointer text-center whitespace-nowrap">
                Generate Courses
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

// 3. Career Outcomes Component
export function CareerOutcomes() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchCareerOutcomes().then(res => {
      if (active) {
        setCareers(res);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  return (
    <div className="rounded-3xl border border-[#e2e8f0] bg-white p-5 shadow-xs flex flex-col justify-between h-full min-h-[300px]">
      <div>
        <h3 className="text-lg font-semibold text-[#433be2] mb-3">Career Outcomes</h3>
        
        {/* List */}
        <div className="space-y-2.5">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 bg-slate-50 border border-slate-100 rounded-xl animate-pulse"></div>
            ))
          ) : (
            careers.map((career) => (
              <div 
                key={career.title} 
                className="flex items-center justify-between rounded-xl border border-[#f1f5f9] bg-[#f8fafc] px-3.5 py-2.5 hover:border-[#cbd5e1] transition"
              >
                <div className="flex items-center gap-2.5">
                  <Folder size={16} className="text-[#433be2]" />
                  <span className="text-sm font-semibold text-[#334155]">{career.title}</span>
                </div>
                <button className="text-xs font-semibold text-[#433be2] hover:text-[#3129c8] inline-flex items-center gap-0.5 cursor-pointer">
                  <span>View skills</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <button className="mt-4 w-full py-2.5 rounded-xl border border-[#cbd5e1] hover:border-[#94a3b8] bg-white text-[#475569] text-xs font-semibold transition cursor-pointer">
        View All Careers
      </button>
    </div>
  );
}

// 4. Top Skills Component
export function TopSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchTopSkills().then(res => {
      if (active) {
        setSkills(res);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  return (
    <div className="rounded-3xl border border-[#e2e8f0] bg-white p-5 shadow-xs flex flex-col justify-between h-full min-h-[220px]">
      <div>
        <h3 className="text-md font-semibold text-[#433be2] mb-3">Top Skills This Month</h3>
        
        {/* List */}
        <div className="space-y-2">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 bg-slate-50 rounded-xl animate-pulse"></div>
            ))
          ) : (
            skills.map((skill) => (
              <div 
                key={skill.name} 
                className="flex items-center justify-between rounded-xl bg-[#f8fafc] px-3 py-2 text-xs"
              >
                <div className="flex items-center gap-2">
                  <Folder size={14} className="text-[#433be2]" />
                  <span className="font-semibold text-[#334155]">{skill.name}</span>
                </div>
                <span className="font-semibold text-[#10b981]">{skill.percentage}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <button className="mt-4 text-center text-xs font-semibold text-[#433be2] hover:text-[#3129c8] cursor-pointer">
        View All Skills
      </button>
    </div>
  );
}

// 5. AI Learning Coach Component
export function LearningCoach() {
  return (
    <div className="rounded-3xl border border-[#e2e8f0] bg-white p-5 shadow-xs flex flex-col justify-between h-full min-h-[220px] relative overflow-hidden">
      <div>
        <h3 className="text-md font-semibold text-[#433be2]">AI Learning Coach</h3>
        <p className="text-xs font-semibold text-[#64748b] mt-0.5">Your personal AI mentor</p>
        <p className="text-xs font-semibold text-[#334155] mt-3.5 leading-relaxed max-w-[160px]">
          Need help choosing the right course or learning path?
        </p>
      </div>

      <div className="mt-4.5 z-10">
        <button className="rounded-xl bg-[#433be2] hover:bg-[#3129c8] px-4.5 py-2.5 text-xs font-semibold text-white shadow-sm transition cursor-pointer">
          Ask AI Coach
        </button>
      </div>

      {/* Decorative robot illustration on bottom right */}
      <div className="absolute bottom-2 right-2 text-[#433be2] opacity-70">
        <Bot size={72} className="stroke-1" />
      </div>
    </div>
  );
}

// 6. Recent Discussions Component
export function RecentDiscussions() {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchDiscussions().then(res => {
      if (active) {
        setDiscussions(res);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  return (
    <div className="rounded-3xl border border-[#e2e8f0] bg-white p-5 shadow-xs flex flex-col justify-between h-full min-h-[220px]">
      <div>
        <h3 className="text-md font-semibold text-[#433be2]">Recent Discussions</h3>
        <p className="text-xs font-semibold text-[#64748b] mt-0.5">Join the learning Community</p>
        
        {/* Discussions List */}
        <div className="mt-3.5 space-y-2">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-14 bg-slate-50 rounded-xl animate-pulse"></div>
            ))
          ) : (
            discussions.map((disc, idx) => (
              <div key={idx} className="flex gap-2 rounded-xl bg-[#f8fafc] p-2.5 border border-[#f1f5f9] hover:border-[#cbd5e1] transition">
                <MessageSquare size={14} className="text-[#433be2] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-[#334155] leading-tight line-clamp-2">
                    {disc.title}
                  </p>
                  <p className="text-[10px] text-[#64748b] font-semibold">
                    {disc.replies} replies • {disc.time}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <button className="mt-3 text-right text-xs font-semibold text-[#433be2] hover:text-[#3129c8] cursor-pointer">
        + Show More
      </button>
    </div>
  );
}

// Placeholder main component so that it doesn't break if imported elsewhere
export default function LearningInsights() {
  return (
    <div className="space-y-6">
      <RecommendedForYou />
      <div className="mobile-card-swipe grid gap-6 md:grid-cols-2">
        <SkillGapAnalyzer />
        <CareerOutcomes />
      </div>
      <div className="mobile-card-swipe grid gap-6 md:grid-cols-3">
        <TopSkills />
        <LearningCoach />
        <RecentDiscussions />
      </div>
    </div>
  );
}
