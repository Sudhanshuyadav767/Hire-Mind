"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { careerGuidanceService } from "@/services/careerGuidanceService";

export default function LeftCareerguidance() {
  const [interest, setInterest] = useState("Software Engineering & Development");
  const [education, setEducation] = useState("Bachelor's Degree (B.Tech / B.E. / B.Sc / BCA)");
  const [experienceField, setExperienceField] = useState("IT & Software Development");
  const [experienceYears, setExperienceYears] = useState("1-3 Years");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("report"); // 'report' | 'skills' | 'roadmap' | 'insights' | 'courses'
  const [guidanceData, setGuidanceData] = useState(null);
  const [subData, setSubData] = useState(null);

  // Trigger full personalized career guidance report
  const handleGetGuidance = async () => {
    setIsLoading(true);
    try {
      const payload = {
        targetRole: additionalInfo?.trim() || interest,
        interests: interest,
        field: experienceField,
        education,
        experience: experienceYears,
        additionalInfo: additionalInfo?.trim(),
        preferredLocation: "India / Remote"
      };

      const res = await careerGuidanceService.getCareerGuidanceReport(payload);
      if (res?.data) {
        setGuidanceData(res.data);
        setActiveTab("report");
      }
    } catch (err) {
      console.error("Guidance fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Switch tabs & fetch sub-resource endpoints (2.3 Skills, 2.4 Roadmap, 2.5 Insights, 2.6 Courses)
  const handleTabChange = async (tabKey) => {
    setActiveTab(tabKey);
    const payload = {
      targetRole: guidanceData?.topRole || additionalInfo?.trim() || interest,
      interests: interest,
      field: experienceField,
      education,
      experience: experienceYears,
      additionalInfo: additionalInfo?.trim(),
      preferredLocation: "India / Remote"
    };

    setIsLoading(true);

    try {
      if (tabKey === "skills") {
        const res = await careerGuidanceService.getSkillAnalysis(payload);
        if (res?.data) setSubData(res.data);
      } else if (tabKey === "roadmap") {
        const res = await careerGuidanceService.getLearningRoadmap(payload);
        if (res?.data) setSubData(res.data);
      } else if (tabKey === "insights") {
        const res = await careerGuidanceService.getMarketInsights(payload);
        if (res?.data) setSubData(res.data);
      } else if (tabKey === "courses") {
        const courseSearch = additionalInfo?.trim() || interest;
        const res = await careerGuidanceService.getRecommendedCourses(courseSearch, 6);
        if (res?.data) setSubData(res.data);
      }
    } catch (err) {
      console.error("Subtab fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const activeData = guidanceData || {
    topRole: "Full Stack Software Engineer",
    matchScore: 95,
    description: "Full Stack Engineers architect and build modern end-to-end web applications, scalable backend microservices, and cloud infrastructure.",
    whyMatch: [
      "Exceptional alignment with your expertise in JavaScript, React, Next.js & REST APIs",
      "Highest callback rate across tech startups & global MNCs",
      "Matches your problem solving and software development interest",
      "Average salary range: ₹12-₹26 LPA"
    ],
    roadmap: [
      { num: 1, title: "Modern Frontend", duration: "0-2 Months", desc: "Next.js App Router, SSR, Server Components & State Mgmt" },
      { num: 2, title: "Scalable Backend", duration: "2-4 Months", desc: "Fastify / Node.js, PostgreSQL ORM, Redis & Auth" },
      { num: 3, title: "DevOps & Cloud", duration: "4-8 Months", desc: "Docker, Kubernetes, AWS Deployment & Monitoring" },
      { num: 4, title: "System Architecture", duration: "8+ Months", desc: "Distributed Systems, Caching & Capstone Application" }
    ],
    insights: {
      marketDemand: "Critical (+42% YoY Growth)",
      hiringLocations: "Bangalore, Remote, Pune, Delhi NCR",
      salaryRange: "₹7 LPA (Entry) to ₹40+ LPA (Lead/Staff)",
      hiringSpeed: "Immediate (High priority hiring)"
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Input Form Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-2xs">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          What would you like guidance on?
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-5">
          Tell us about your background and let our AI suggest your personalized career path & roadmap.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">What are your main interests?</label>
            <select 
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="border border-slate-300 rounded-xl px-3 py-2.5 w-full text-xs sm:text-sm text-slate-800 bg-white focus:border-indigo-500 outline-none"
            >
              <option value="Software Engineering & Development">Software Engineering & Development</option>
              <option value="Data Science & Artificial Intelligence">Data Science & Artificial Intelligence</option>
              <option value="UI/UX & Product Design">UI/UX & Product Design</option>
              <option value="Product Management & Business Strategy">Product Management & Business Strategy</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Which field describes your experience?</label>
            <select
              value={experienceField}
              onChange={(e) => setExperienceField(e.target.value)}
              className="border border-slate-300 rounded-xl px-3 py-2.5 w-full text-xs sm:text-sm text-slate-800 bg-white focus:border-indigo-500 outline-none"
            >
              <option value="IT & Software Development">IT & Software Development</option>
              <option value="Design & Creative Arts">Design & Creative Arts</option>
              <option value="Business & Finance">Business & Finance</option>
              <option value="Engineering & Operations">Engineering & Operations</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Highest Education Level</label>
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="border border-slate-300 rounded-xl px-3 py-2.5 w-full text-xs sm:text-sm text-slate-800 bg-white focus:border-indigo-500 outline-none"
            >
              <option value="Bachelor's Degree (B.Tech / B.E. / B.Sc / BCA)">Bachelor's Degree (B.Tech / B.E. / B.Sc / BCA)</option>
              <option value="Master's Degree (M.Tech / M.Sc / MCA / MBA)">Master's Degree (M.Tech / M.Sc / MCA / MBA)</option>
              <option value="High School / Diploma">High School / Diploma</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Years of Experience</label>
            <select
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
              className="border border-slate-300 rounded-xl px-3 py-2.5 w-full text-xs sm:text-sm text-slate-800 bg-white focus:border-indigo-500 outline-none"
            >
              <option value="Fresher / 0 Years">Fresher / 0 Years</option>
              <option value="1-3 Years">1-3 Years</option>
              <option value="3-5 Years">3-5 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
          </div>

        </div>

        <div className="mt-4 space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Any other information / Specific Goal</label>
          <input
            type="text"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="e.g. editing apps, mobile app development, cybersecurity, AI video generation..."
            className="border border-slate-300 rounded-xl px-3 py-2.5 w-full text-xs sm:text-sm text-slate-800 bg-white focus:border-indigo-500 outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-4 mt-5">
          <button 
            onClick={handleGetGuidance}
            disabled={isLoading}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Get AI Guidance</span>
          </button>

          <button 
            onClick={() => {
              setAdditionalInfo("");
              setGuidanceData(null);
            }}
            className="text-xs font-medium text-slate-500 hover:text-slate-700 cursor-pointer"
          >
            Reset Form
          </button>
        </div>

      </div>

      {/* Guidance Results Display Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="sm:text-lg text-base font-bold text-slate-900">Your AI Career Guidance Report</h2>
            <p className="text-xs text-indigo-600 font-medium mt-0.5">Custom generated for your target role & specific goals</p>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shrink-0">
            <Check className="w-3.5 h-3.5" /> {activeData.matchScore || 95}% Role Match
          </span>
        </div>

        {/* Subtab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => handleTabChange("report")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "report" ? "bg-indigo-600 text-white shadow-2xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            🎯 Recommended Path
          </button>
          <button
            onClick={() => handleTabChange("skills")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "skills" ? "bg-indigo-600 text-white shadow-2xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            ⚡ Skill Gap Analysis
          </button>
          <button
            onClick={() => handleTabChange("roadmap")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "roadmap" ? "bg-indigo-600 text-white shadow-2xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            🗺️ Learning Roadmap
          </button>
          <button
            onClick={() => handleTabChange("insights")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "insights" ? "bg-indigo-600 text-white shadow-2xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            📊 Market Insights
          </button>
          <button
            onClick={() => handleTabChange("courses")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "courses" ? "bg-indigo-600 text-white shadow-2xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            📚 Recommended Courses
          </button>
        </div>

        {/* Tab Content Display */}
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500 text-xs">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600 mb-2" />
            <span>Analyzing career metrics & user focus with HireMind AI...</span>
          </div>
        ) : (
          <div>
            {activeTab === "report" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start pt-2">
                <div className="space-y-4">
                  <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4">
                    <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider">Top Career Match</p>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{activeData.topRole}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{activeData.description}</p>
                  </div>

                  <Link href="/ai-services/Career-Chatbot">
                    <button className="w-full text-center text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 py-2.5 rounded-xl hover:bg-indigo-100 transition-all flex items-center justify-center gap-1.5">
                      <span>Chat with AI Advisor About This Role</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    Why this is a great match?
                  </h4>
                  <ul className="space-y-2">
                    {activeData.whyMatch?.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">✓</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-4 pt-2">
                <h4 className="text-sm font-bold text-slate-900">AI Skill Gap Analysis for {activeData.topRole}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4">
                    <p className="text-xs font-bold text-emerald-800 mb-2">✅ Mastered Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(subData?.masteredSkills || activeData?.skills?.mastered || ["Core Languages", "Frameworks"]).map((sk, idx) => (
                        <span key={idx} className="text-xs bg-white text-emerald-700 font-semibold px-2.5 py-1 rounded-md border border-emerald-200">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4">
                    <p className="text-xs font-bold text-amber-800 mb-2">⚡ Priority Skill Gaps</p>
                    <div className="space-y-2">
                      {(subData?.missingSkills || activeData?.skills?.missing || []).map((sk, idx) => (
                        <div key={idx} className="text-xs bg-white p-2 rounded-lg border border-amber-200 flex items-center justify-between">
                          <span className="font-semibold text-slate-800">{sk.name || sk}</span>
                          <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">
                            {sk.priority ? `${sk.priority} Priority` : 'Skill Gap'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "roadmap" && (
              <div className="space-y-4 pt-2">
                <h4 className="text-sm font-bold text-slate-900">Step-by-Step Learning Roadmap</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {(subData?.milestones || activeData.roadmap || []).map((m, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                          {m.num || m.step || idx + 1}
                        </div>
                        <h5 className="font-bold text-xs text-slate-900">{m.title}</h5>
                        <p className="text-[10px] text-indigo-600 font-semibold mt-0.5">{m.duration}</p>
                        <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">{m.desc || m.topics?.join(", ")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "insights" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Market Growth Trend</p>
                  <p className="text-sm font-bold text-indigo-600 mt-1">{subData?.marketDemand || activeData.insights?.marketDemand}</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Expected Salary Range</p>
                  <p className="text-sm font-bold text-emerald-600 mt-1">{subData?.salaryRange || activeData.insights?.salaryRange}</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Top Hiring Locations</p>
                  <p className="text-xs font-semibold text-slate-800 mt-1">
                    {Array.isArray(subData?.topHiringLocations) ? subData.topHiringLocations.join(", ") : activeData.insights?.hiringLocations}
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Hiring Velocity</p>
                  <p className="text-xs font-semibold text-slate-800 mt-1">{subData?.hiringSpeed || activeData.insights?.hiringSpeed}</p>
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-slate-900">Recommended Courses for Skill Gaps</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(subData?.courses || []).map((c) => (
                    <div key={c.id} className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 hover:bg-white transition-all space-y-2">
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded">{c.provider}</span>
                      <h5 className="font-bold text-xs text-slate-900 leading-snug">{c.title}</h5>
                      <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-slate-200">
                        <span>{c.level}</span>
                        <span>⭐ {c.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}