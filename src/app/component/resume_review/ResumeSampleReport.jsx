"use client";

import React, { useState, useEffect } from "react";
import { FileCheck, FileText, ClipboardCheck, Sparkles, CheckCircle2 } from "lucide-react";

export default function ResumeSampleReport() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("hiremind_latest_resume_analysis");
      if (saved) {
        try {
          setReport(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse stored resume analysis", e);
        }
      }
    }

    const handleUpdate = (e) => {
      if (e.detail) {
        setReport(e.detail);
      }
    };

    window.addEventListener("hiremind_resume_updated", handleUpdate);
    return () => window.removeEventListener("hiremind_resume_updated", handleUpdate);
  }, []);

  const handleReviewAnother = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("hiremind_latest_resume_analysis");
      window.dispatchEvent(new CustomEvent("hiremind_reset_resume_upload"));
      setReport(null);
      document.getElementById("resume-upload-card")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const overallScore = report?.overallScore ?? 87;
  const ratingLabel = report?.ratingLabel ?? "Great Job!";
  const ratingMessage =
    report?.ratingMessage ??
    report?.summary ??
    "Your resume is strong. A few improvements can make it excellent.";

  const contentScore = report?.scores?.content ?? 85;
  const atsScore = report?.scores?.ats ?? 90;
  const skillScore = report?.scores?.skill ?? 77;
  const formattingScore = report?.scores?.formatting ?? 65;

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 65) return "bg-blue-500";
    if (score >= 50) return "bg-amber-400";
    return "bg-rose-500";
  };

  const scoresList = [
    { label: "Content Quality", score: `${contentScore}/100`, pct: `${contentScore}%`, color: getScoreColor(contentScore) },
    { label: "ATS Compatibility", score: `${atsScore}/100`, pct: `${atsScore}%`, color: getScoreColor(atsScore) },
    { label: "Skill & Keywords", score: `${skillScore}/100`, pct: `${skillScore}%`, color: getScoreColor(skillScore) },
    { label: "Formatting", score: `${formattingScore}/100`, pct: `${formattingScore}%`, color: getScoreColor(formattingScore) },
  ];

  const suggestions =
    report?.topSuggestions && report.topSuggestions.length > 0
      ? report.topSuggestions
      : [
          "Add more quantifiable achievements to showcase your impact.",
          "Include more relevant keywords related to your target role.",
          "Improve formatting in some sections for better readability.",
        ];

  const fileName = report?.fileName || "Aman_Singh_Resume.pdf";
  const uploadedOn = report?.uploadedAt || "20 May 2024, 10:30 AM";
  const reviewStatus = report?.status || "Completed";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6 text-left">
      {/* Sample AI Review Report */}
      <div className="bg-white border border-[#cbd5e1]/45 p-5 sm:p-6 rounded-3xl shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold font-poppins text-[#1E2229]">
            {report ? "AI Review Report" : "Sample AI Review Report"}
          </h2>
          {report && (
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100 flex items-center gap-1">
              <CheckCircle2 size={13} /> Live Upload Analysis
            </span>
          )}
        </div>

        {/* Score & Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 items-center">
          {/* Score Badge */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-4 border-[#2D24D0] flex flex-col items-center justify-center shrink-0 shadow-inner bg-indigo-50/30">
              <span className="text-2xl font-extrabold text-[#1E2229] leading-none">{overallScore}</span>
              <span className="text-[10px] text-slate-400 font-bold leading-none mt-0.5">/100</span>
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase">Overall Score</h4>
              <p className="text-xs font-bold text-[#2D24D0]">{ratingLabel}</p>
              <p className="text-[10px] text-slate-500 font-medium leading-tight line-clamp-3">
                {ratingMessage}
              </p>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-2">
            {scoresList.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between text-[11px] font-bold text-[#1E2229]">
                  <span>{item.label}</span>
                  <span className="text-slate-500">{item.score}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: item.pct }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Top Suggestions & Action Button */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#1E2229] uppercase tracking-wider">Top Suggestions</h3>

          <div className="space-y-2">
            {suggestions.slice(0, 3).map((sug, i) => {
              const IconComp = i === 0 ? FileCheck : i === 1 ? FileText : ClipboardCheck;
              const text = typeof sug === "string" ? sug : sug.text || sug.suggestion;
              return (
                <div key={i} className="flex items-start gap-2.5 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                  <IconComp size={16} className="text-[#2D24D0] shrink-0 mt-0.5" />
                  <p className="text-[11px] font-medium text-slate-600 leading-normal">
                    {text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer">
              View Full Report
            </button>
          </div>
        </div>
      </div>

      {/* Resume Summary */}
      <div className="bg-white border border-[#cbd5e1]/45 p-5 sm:p-6 rounded-3xl shadow-sm text-left flex flex-col justify-between h-full space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-poppins text-[#1E2229]">
            Resume Summary
          </h2>

          <div className="space-y-4 pt-4">
            <div>
              <span className="text-xs font-bold text-[#1E2229]">File Name:</span>
              <p className="text-xs font-medium text-slate-500 mt-0.5 break-all">{fileName}</p>
            </div>

            <div>
              <span className="text-xs font-bold text-[#1E2229]">Uploaded On:</span>
              <p className="text-xs font-medium text-slate-500 mt-0.5">{uploadedOn}</p>
            </div>

            <div>
              <span className="text-xs font-bold text-[#1E2229] block mb-1">Review Status:</span>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                {reviewStatus}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleReviewAnother}
          className="w-full bg-[#2D24D0] hover:bg-[#1e1c75] text-white py-3 rounded-xl text-xs font-bold shadow-md cursor-pointer transition active:scale-98"
        >
          Review Another Resume
        </button>
      </div>
    </div>
  );
}
