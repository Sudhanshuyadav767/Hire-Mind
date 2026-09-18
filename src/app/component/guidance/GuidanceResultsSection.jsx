import { useState } from "react";
import Link from "next/link";
import { BarChart3, CheckCircle2, ArrowRight, Star, Sparkles, AlertCircle, Briefcase, MapPin, IndianRupee, TrendingUp, Compass, Award } from "lucide-react";

export default function GuidanceResultsSection({ data, isLoading }) {
  const [activeTab, setActiveTab] = useState("recommended");

  const tabs = [
    { id: "recommended", label: "Recommended Paths" },
    { id: "skillGap", label: "Skill Gap Analysis" },
    { id: "roadmap", label: "Roadmap" },
    { id: "jobRoles", label: "Top Job Roles" },
    { id: "insights", label: "Industry Insights" }
  ];

  if (isLoading) {
    return (
      <div className="bg-white border border-[#cbd5e1]/45 p-8 rounded-3xl shadow-sm text-center space-y-4 animate-pulse">
        <div className="w-12 h-12 rounded-2xl bg-[#2D24D0]/10 text-[#2D24D0] flex items-center justify-center mx-auto">
          <Sparkles size={24} className="animate-spin" />
        </div>
        <h3 className="text-base font-bold font-poppins text-[#1E2229]">
          Generating Your AI Career Guidance...
        </h3>
        <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto">
          Analyzing your interests, skills, and current market hiring trends to build personalized recommendations.
        </p>
      </div>
    );
  }

  const role = data || {
    topRole: "Data Scientist",
    matchScore: 92,
    description: "Data Scientists analyze complex data to help organizations make better decisions and build data-driven solutions.",
    whyMatch: [
      "Strong match with your skills in Python, SQL and data analysis",
      "High demand in the job market with great growth potential",
      "Aligns with your interest in Technology and Problem Solving",
      "Average salary range: ₹10-₹22 LPA"
    ],
    secondaryRoles: [
      { title: "AI Research Engineer", match: 88, salary: "₹14-₹26 LPA" },
      { title: "Machine Learning Specialist", match: 85, salary: "₹12-₹20 LPA" }
    ],
    skills: {
      mastered: ["Python", "SQL Querying", "Data Analysis", "Statistics"],
      missing: [
        { name: "PyTorch & Deep Learning", progress: 45 },
        { name: "Cloud MLOps (AWS/GCP)", progress: 30 },
        { name: "Distributed Data (Spark)", progress: 35 }
      ]
    },
    roadmap: [
      { num: 1, title: "Foundation", duration: "0-3 Months", desc: "Learn Python, Statistics, and SQL basics" },
      { num: 2, title: "Core Skills", duration: "3-6 Months", desc: "Master Machine Learning, Feature Engineering" },
      { num: 3, title: "Advanced Skills", duration: "6-12 Months", desc: "Deep Learning, PyTorch & MLOps Pipelines" },
      { num: 4, title: "Build & Apply", duration: "12+ Months", desc: "Work on Production ML projects and apply for top roles" }
    ],
    jobRoles: [
      { title: "Senior Data Scientist", company: "Google", location: "Bangalore, KA", salary: "₹18-28 LPA", tags: ["Python", "SQL", "MLOps"] },
      { title: "AI Research Engineer", company: "Microsoft", location: "Remote", salary: "₹16-24 LPA", tags: ["PyTorch", "NLP", "Deep Learning"] },
      { title: "ML Specialist", company: "Amazon", location: "Hyderabad, TS", salary: "₹15-22 LPA", tags: ["AWS Sagemaker", "Python", "Docker"] }
    ],
    insights: {
      marketDemand: "High (+34% YoY Growth)",
      hiringLocations: "Bangalore, Remote, Hyderabad, Gurgaon",
      salaryRange: "₹8 LPA (Entry) to ₹35+ LPA (Lead/Principal)",
      hiringSpeed: "Fast (Average 2-3 weeks time-to-hire)"
    }
  };

  return (
    <div className="bg-white border border-[#cbd5e1]/45 p-5 sm:p-6 rounded-3xl shadow-sm text-left space-y-4">
      {/* Header & Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <h2 className="text-lg sm:text-xl font-bold font-poppins text-[#1E2229]">
          Your AI Career Guidance Results
        </h2>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 self-start sm:self-auto select-none flex items-center gap-1">
          <Sparkles size={13} />
          <span>Tailored AI Recommendations</span>
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 sm:gap-6 border-b border-slate-100 overflow-x-auto no-scrollbar text-xs font-semibold text-slate-400 select-none pb-0.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 whitespace-nowrap transition cursor-pointer border-b-2 ${
              activeTab === tab.id
                ? "border-[#2D24D0] text-[#2D24D0] font-bold"
                : "border-transparent hover:text-slate-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: RECOMMENDED PATHS */}
      {activeTab === "recommended" && (
        <div className="space-y-4">
          <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 bg-white grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 items-start">
            {/* Left Column */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#2D24D0] flex items-center justify-center shrink-0 border border-blue-100">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Top Career Match</span>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold font-poppins text-[#1E2229]">{role.topRole}</h3>
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                      {role.matchScore}% Match
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {role.description}
              </p>

              <div className="pt-2">
                <Link href="/find-jobs">
                  <button className="bg-[#2D24D0] hover:bg-[#1e1c75] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition active:scale-98 cursor-pointer">
                    <span>Explore Open Jobs</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span>Why this is a great match?</span>
              </div>

              <div className="space-y-1.5 text-[11px] font-semibold text-slate-600">
                {role.whyMatch?.map((reason, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>

              {/* Confidence bar */}
              <div className="pt-2 space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-500">
                  <span>Confidence Score</span>
                  <span className="text-[#2D24D0]">{role.matchScore}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2D24D0] rounded-full transition-all duration-500" style={{ width: `${role.matchScore}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Matched Roles */}
          {role.secondaryRoles && role.secondaryRoles.length > 0 && (
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-700">Alternative Recommended Roles</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {role.secondaryRoles.map((sec, idx) => (
                  <div key={idx} className="border border-slate-200/70 bg-slate-50/60 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#1E2229] block">{sec.title}</span>
                      <span className="text-[10px] font-semibold text-slate-400">{sec.salary}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 text-[#2D24D0] text-[10px] font-bold">
                      {sec.match}% Match
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SKILL GAP ANALYSIS */}
      {activeTab === "skillGap" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mastered Skills */}
            <div className="border border-emerald-100 bg-emerald-50/40 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Mastered & Strong Skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {role.skills?.mastered?.map((skill, idx) => (
                  <span key={idx} className="bg-white border border-emerald-200 px-3 py-1 rounded-xl text-xs font-bold text-emerald-800 shadow-3xs">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Target Skills to Bridge */}
            <div className="border border-blue-100 bg-blue-50/30 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-[#2D24D0] text-xs font-bold">
                <Compass size={16} />
                <span>Recommended Skill Upgrades</span>
              </div>
              <div className="space-y-2.5">
                {role.skills?.missing?.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-slate-700">
                      <span>{item.name}</span>
                      <span className="text-[#2D24D0]">{item.progress}% Proficiency</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2D24D0] rounded-full" style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-slate-700 text-xs font-semibold">
              <Award size={18} className="text-[#2D24D0] shrink-0" />
              <span>Verify your skill proficiency with official platform tests</span>
            </div>
            <Link href="/ai-services/skill-assessment">
              <button className="bg-[#2D24D0] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#1e1c75] transition cursor-pointer shrink-0">
                Take Skill Assessment
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* TAB 3: ROADMAP */}
      {activeTab === "roadmap" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {role.roadmap?.map((step) => (
              <div key={step.num} className="border border-slate-200/80 rounded-2xl p-4 bg-white space-y-2 relative hover:border-[#2D24D0]/40 transition">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-xl bg-[#2D24D0] text-white flex items-center justify-center font-extrabold text-xs">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {step.duration}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#1E2229] font-poppins pt-1">{step.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TOP JOB ROLES */}
      {activeTab === "jobRoles" && (
        <div className="space-y-3">
          <div className="space-y-2.5">
            {role.jobRoles?.map((job, idx) => (
              <div key={idx} className="border border-slate-200/80 hover:border-[#2D24D0]/40 rounded-2xl p-4 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition shadow-3xs">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1E2229] font-poppins">{job.title}</h4>
                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 flex-wrap">
                    <span className="text-[#2D24D0] font-bold">{job.company}</span>
                    <span className="flex items-center gap-0.5"><MapPin size={12} /> {job.location}</span>
                    <span className="flex items-center gap-0.5 text-emerald-700 font-bold"><IndianRupee size={12} /> {job.salary}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.tags?.map((t, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 font-bold text-slate-600 px-2 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href="/find-jobs">
                  <button className="bg-[#2D24D0] hover:bg-[#1e1c75] text-white px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer">
                    Apply Now
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: INDUSTRY INSIGHTS */}
      {activeTab === "insights" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50/50 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Market Growth Trend</span>
            <p className="text-sm font-bold text-[#1E2229] flex items-center gap-1.5">
              <TrendingUp size={16} className="text-emerald-600" />
              <span>{role.insights?.marketDemand}</span>
            </p>
          </div>

          <div className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50/50 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Top Hiring Hubs</span>
            <p className="text-sm font-bold text-[#1E2229]">{role.insights?.hiringLocations}</p>
          </div>

          <div className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50/50 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Salary Benchmark</span>
            <p className="text-sm font-bold text-emerald-700">{role.insights?.salaryRange}</p>
          </div>

          <div className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50/50 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Recruitment Speed</span>
            <p className="text-sm font-bold text-[#1E2229]">{role.insights?.hiringSpeed}</p>
          </div>
        </div>
      )}
    </div>
  );
}

