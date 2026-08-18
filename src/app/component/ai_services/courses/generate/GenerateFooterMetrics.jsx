"use client";

import { 
  TrendingUp, 
  DollarSign, 
  Award, 
  Clock, 
  BookOpen, 
  Calendar, 
  Sliders, 
  Download 
} from "lucide-react";

export default function GenerateFooterMetrics() {
  const skillsProgress = [
    { name: "Python", value: 65 },
    { name: "Machine Learning", value: 60 },
    { name: "Deep Learning", value: 70 },
    { name: "NLP", value: 90 },
    { name: "Data Analysis", value: 30 },
    { name: "SQL", value: 32 }
  ];

  return (
    <section className="grid gap-6 md:grid-cols-3">
      
      {/* Card 1: Skill Gap Coverage */}
      <div className="rounded-3xl border border-[#e2e8f0] bg-white p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h3 className="text-md font-semibold text-[#101014]">Skill Gap Coverage</h3>
          <p className="text-[11px] font-semibold text-[#64748b] mt-0.5 leading-snug">
            These courses will help you improve in the following skills
          </p>

          {/* Skill Bars */}
          <div className="mt-4.5 space-y-3">
            {skillsProgress.map((skill) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-[#334155]">
                  <span>{skill.name}</span>
                  <span>{skill.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100 border border-gray-50">
                  <div 
                    className="h-full rounded-full bg-[#433be2]" 
                    style={{ width: `${skill.value}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 2: Estimate Outcomes */}
      <div className="rounded-3xl border border-[#e2e8f0] bg-white p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h3 className="text-md font-semibold text-[#101014] mb-3">Estimate Outcomes</h3>
          
          <div className="space-y-3.5">
            {/* Job Match Score */}
            <div className="flex items-center justify-between border-b border-[#f8fafc] pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#e8fbf4] text-[#10b981]">
                  <TrendingUp size={16} />
                </div>
                <span className="text-xs font-semibold text-[#475569]">Job Match score</span>
              </div>
              <span className="text-xs font-semibold text-[#10b981] bg-[#e8fbf4] px-2 py-0.5 rounded-lg">
                Increase by 87% ↑
              </span>
            </div>

            {/* Salary Potential */}
            <div className="flex items-center justify-between border-b border-[#f8fafc] pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#e8fbf4] text-[#10b981]">
                  <DollarSign size={16} />
                </div>
                <span className="text-xs font-semibold text-[#475569]">Salary Potential</span>
              </div>
              <span className="text-xs font-semibold text-[#10b981] bg-[#e8fbf4] px-2 py-0.5 rounded-lg">
                Increase by 21% ↑
              </span>
            </div>

            {/* Career Readiness */}
            <div className="flex items-center justify-between border-b border-[#f8fafc] pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#e8fbf4] text-[#10b981]">
                  <Award size={16} />
                </div>
                <span className="text-xs font-semibold text-[#475569]">Career Readiness</span>
              </div>
              <span className="text-xs font-semibold text-[#10b981] bg-[#e8fbf4] px-2 py-0.5 rounded-lg">
                Increase by 80% ↑
              </span>
            </div>

            {/* Time to Achieve Goal */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#f0efff] text-[#433be2]">
                  <Calendar size={16} />
                </div>
                <span className="text-xs font-semibold text-[#475569]">Time to Achieve Goal</span>
              </div>
              <span className="text-xs font-semibold text-[#433be2] bg-[#f0efff] px-2.5 py-0.5 rounded-lg">
                3 - 4 Months
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Learning Plan Overview */}
      <div className="rounded-3xl border border-[#e2e8f0] bg-white p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h3 className="text-md font-semibold text-[#101014] mb-3">Learning Plan Overview</h3>
          
          <div className="space-y-3.5 text-xs font-semibold text-[#475569]">
            {/* Total Courses */}
            <div className="flex items-center justify-between border-b border-[#f8fafc] pb-2.5">
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-[#64748b]" />
                <span>Total Courses</span>
              </div>
              <span className="text-[#101014] font-semibold">8</span>
            </div>

            {/* Total Hours */}
            <div className="flex items-center justify-between border-b border-[#f8fafc] pb-2.5">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#64748b]" />
                <span>Total Hours</span>
              </div>
              <span className="text-[#101014] font-semibold">184</span>
            </div>

            {/* Difficulty Level */}
            <div className="flex items-center justify-between border-b border-[#f8fafc] pb-2.5">
              <div className="flex items-center gap-2">
                <Sliders size={14} className="text-[#64748b]" />
                <span>Difficulty Level</span>
              </div>
              <span className="text-[#433be2] font-semibold">Intermediate</span>
            </div>

            {/* Recommended Duration */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#64748b]" />
                <span>Recommended Duration</span>
              </div>
              <span className="text-[#101014] font-semibold">3 - 4 Months</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-5">
          <button 
            type="button" 
            className="flex-1 py-2.5 rounded-xl border border-[#cbd5e1] hover:border-[#94a3b8] bg-white text-[#475569] text-xs font-semibold transition cursor-pointer"
          >
            Update Goal
          </button>
          <button 
            type="button" 
            className="flex-1 py-2.5 rounded-xl bg-[#433be2] hover:bg-[#3129c8] text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Download size={14} />
            <span>Export Plan</span>
          </button>
        </div>
      </div>

    </section>
  );
}
