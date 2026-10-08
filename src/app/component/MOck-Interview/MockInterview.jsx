"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { popularrole } from "@/Data/data";
import { Clock, Video, FileText, Monitor, Presentation, Sparkles, CheckCircle2 } from "lucide-react";

export default function MockInterview() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("Software Engineer");
  const [experience, setExperience] = useState("Mid Level (2-5 Years)");
  const [type, setType] = useState("Technical & HR Interview");
  const [difficulty, setDifficulty] = useState("Medium");

  const handleStartInterview = () => {
    const sessionDetails = {
      role: selectedRole,
      experience,
      type,
      difficulty
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("hiremind_mock_setup", JSON.stringify(sessionDetails));
    }
    router.push("/mockinterview");
  };

  return (
    <div className="space-y-6">
      
      {/* Parameters Selection Container */}
      <div className="border border-slate-200/90 max-w-7xl mx-auto shadow-xl shadow-indigo-900/5 rounded-3xl p-5 sm:p-7 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#2D24D0]" />
            Setup Your Mock Interview
          </h2>
          <span className="text-xs font-semibold text-[#2D24D0] bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            Real-time AI Simulation
          </span>
        </div>

        {/* Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Target Job Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-[#2D24D0]"
            >
              <option value="Software Engineer">Software Engineer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Frontend Engineer">Frontend Engineer (React/Next.js)</option>
              <option value="Backend Developer">Backend Developer (Node.js/Python)</option>
              <option value="Data Scientist">Data Scientist & AI Specialist</option>
              <option value="Product Manager">Product Manager</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Experience Level</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-[#2D24D0]"
            >
              <option value="Fresher / 0-1 Year">Fresher (0-1 Year)</option>
              <option value="Junior (1-2 Years)">Junior (1-2 Years)</option>
              <option value="Mid Level (2-5 Years)">Mid Level (2-5 Years)</option>
              <option value="Senior (5+ Years)">Senior (5+ Years)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Interview Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-[#2D24D0]"
            >
              <option value="Technical & HR Interview">Technical & HR Interview</option>
              <option value="Coding & Algorithm Round">Coding & Algorithm Round</option>
              <option value="System Design & Architecture">System Design & Architecture</option>
              <option value="Behavioral & HR Round">Behavioral & HR Round</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Difficulty Level</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-[#2D24D0]"
            >
              <option value="Easy">Easy (Fundamental concepts)</option>
              <option value="Medium">Medium (Standard technical problems)</option>
              <option value="Hard">Hard (Deep technical & edge cases)</option>
            </select>
          </div>

        </div>

        {/* Popular Roles Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 mr-1">Popular Roles:</span>
          {["Software Engineer", "Full Stack Developer", "Data Scientist", "Frontend Engineer", "UI/UX Designer"].map((roleName, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedRole(roleName)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer border ${
                selectedRole === roleName
                  ? "bg-[#2D24D0] text-white border-[#2D24D0]"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {roleName}
            </button>
          ))}
        </div>

        {/* Action Button & Meta */}
        <div className="mt-7 flex flex-col items-center justify-center space-y-3">
          <button
            onClick={handleStartInterview}
            className="flex items-center justify-center gap-3 bg-[#2D24D0] hover:bg-[#1e1c75] text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-900/20 transition-all transform hover:-translate-y-0.5 active:scale-98 cursor-pointer w-full sm:w-auto"
          >
            <Video size={18} />
            <span>Configure & Start Mock Interview</span>
          </button>

          <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock size={15} className="text-[#2D24D0]" />
              Duration: 25-35 Minutes
            </span>
            <span>•</span>
            <span>Questions: 5 AI Evaluated</span>
          </div>
        </div>
      </div>

      {/* How It Works Process Container */}
      <div className="max-w-7xl mx-auto border border-slate-200/90 rounded-3xl bg-white p-5 sm:p-7 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">How HireMind AI Mock Interview Works?</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
              1
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Choose Preferences</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Select job role, experience level, and preferred interview format.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
              2
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Live AI Questions</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Answer questions via voice recording or text in a proctored environment.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
              3
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Instant AI Evaluation</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Receive real-time feedback on your code reasoning, clarity, and vocal tone.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
              4
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Performance Report</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Get a score breakdown and actionable tips to ace live tech interviews.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}