"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, RotateCcw, Sparkles, X, FileText, Award, ArrowRight } from "lucide-react";
import { jobMatchService } from "@/services/jobMatchService";

export default function JobMatchingScoreBanner() {
  const [matchData, setMatchData] = useState({
    scoreValue: 87,
    matchScore: "87%",
    aiSummary: "Great! You have a strong match with several job opportunities.",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchMatchScore = async () => {
    setIsLoading(true);
    try {
      const res = await jobMatchService.compareJobMatch({
        jobId: "demo-job",
        candidateSkills: ["React", "JavaScript", "REST API", "Tailwind CSS"],
      });
      if (res?.data) {
        setMatchData(res.data);
      }
    } catch (e) {
      console.warn("Match score fetch notice:", e);
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  useEffect(() => {
    fetchMatchScore();
  }, []);

  return (
    <>
      <div className="w-full bg-[#E2E4F8] border border-[#cbd5e1]/45 rounded-3xl p-5 sm:p-6 shadow-3xs flex flex-col md:flex-row items-center justify-between gap-5 text-left">
        {/* Left: Score Badge */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#2D24D0] bg-white flex flex-col items-center justify-center shrink-0 shadow-inner">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#1E2229] leading-none">
              {matchData.scoreValue || 87}
            </span>
            <span className="text-[10px] text-slate-400 font-bold leading-none mt-0.5">/100</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D24D0]">
              <Sparkles size={14} />
              <span>AI Resume Match Analysis</span>
            </div>
            <h2 className="text-sm sm:text-lg font-bold font-poppins text-[#1E2229] leading-tight">
              {matchData.aiSummary || "Great! You have a strong match with several job opportunities."}
            </h2>

            <div className="space-y-1 pt-1 text-[11px] sm:text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                <span>Your skills align well with active platform roles</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                <span>High career growth and interview callback probability</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Retake Assessment Button */}
        <button
          onClick={() => setShowModal(true)}
          disabled={isLoading}
          className="bg-white hover:bg-slate-50 text-[#2D24D0] border border-slate-200 shadow-sm px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0 active:scale-98 disabled:opacity-60"
        >
          <RotateCcw size={14} className={isLoading ? "animate-spin" : ""} />
          <span>{isLoading ? "Recalculating..." : "Retake Assessment"}</span>
        </button>
      </div>

      {/* Retake Assessment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 text-left relative animate-in fade-in zoom-in duration-150">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D24D0]/10 text-[#2D24D0] flex items-center justify-center shrink-0">
                <Award size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold font-poppins text-[#1E2229]">
                  Retake AI Assessment
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Choose how you want to update your skill score
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              {/* Option 1: Full Test */}
              <Link
                href="/ai-services/skill-assessment"
                onClick={() => setShowModal(false)}
                className="block border-2 border-slate-100 hover:border-[#2D24D0] rounded-2xl p-4 transition group cursor-pointer bg-slate-50/50 hover:bg-blue-50/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText size={18} className="text-[#2D24D0]" />
                    <span className="text-sm font-bold text-[#1E2229]">Full Skill Quiz Test</span>
                  </div>
                  <ArrowRight size={16} className="text-slate-400 group-hover:text-[#2D24D0] group-hover:translate-x-1 transition" />
                </div>
                <p className="text-xs text-slate-500 mt-1 pl-7">
                  Take a 12-question timed quiz in JavaScript, React, or Python to earn verified skill badges.
                </p>
              </Link>

              {/* Option 2: Quick Rescan */}
              <button
                onClick={fetchMatchScore}
                className="w-full text-left border-2 border-slate-100 hover:border-[#2D24D0] rounded-2xl p-4 transition group cursor-pointer bg-slate-50/50 hover:bg-blue-50/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <Sparkles size={18} className="text-[#2D24D0]" />
                    <span className="text-sm font-bold text-[#1E2229]">Quick AI Profile Re-scan</span>
                  </div>
                  <RotateCcw size={16} className={`text-slate-400 group-hover:text-[#2D24D0] ${isLoading ? "animate-spin" : ""}`} />
                </div>
                <p className="text-xs text-slate-500 mt-1 pl-7">
                  Instantly re-evaluate your current profile against open platform positions.
                </p>
              </button>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

