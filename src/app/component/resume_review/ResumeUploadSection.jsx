"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Upload, Lock, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { resumeReviewService } from "../../../services/resumeReviewService";

export default function ResumeUploadSection() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reviewResult, setReviewResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setError("");
    setIsAnalyzing(true);

    try {
      const res = await resumeReviewService.directAnalyzeResume(selected);
      if (res.data) {
        setReviewResult(res.data);
      }
    } catch (err) {
      setError(err.message || "Failed to analyze resume with AI review service.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white border border-[#cbd5e1]/45 p-5 sm:p-6 rounded-3xl shadow-sm text-left flex flex-col justify-between h-full">
      <div>
        <h2 className="text-lg sm:text-xl font-bold font-poppins text-[#1E2229]">Upload Your Resume</h2>
        <p className="text-[10px] sm:text-xs text-slate-400 font-semibold mt-1">
          Supported format: PDF, DOC, DOCX (Max size : 5 MB)
        </p>

        <div className="mt-4 border-2 border-dashed border-indigo-200 rounded-2xl bg-[#F8F9FF] py-8 sm:py-10 px-4 flex flex-col items-center justify-center text-center">
          {isAnalyzing ? (
            <div className="flex flex-col items-center gap-2 text-[#2D24D0] font-semibold text-xs py-4">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span>Analyzing Resume with AI Engine...</span>
            </div>
          ) : reviewResult ? (
            <div className="space-y-3 w-full max-w-xs text-center">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 mx-auto w-fit">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xs font-bold text-[#1E2229] truncate">{file?.name || "Uploaded_Resume.pdf"}</h3>
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-2.5 text-center">
                <span className="text-[11px] font-bold text-[#2D24D0] flex items-center justify-center gap-1">
                  <Sparkles size={14} /> Overall Score: {reviewResult.score || reviewResult.atsScore || 85}/100
                </span>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                  {reviewResult.summary || "Resume analyzed successfully with automated ATS key metrics."}
                </p>
              </div>
              <label className="text-xs text-[#2D24D0] font-bold cursor-pointer hover:underline block">
                Analyze Another Resume
                <input type="file" accept=".pdf,.docx,.doc" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          ) : (
            <>
              <div className="p-3 bg-blue-50 text-[#2D24D0] rounded-2xl border border-blue-100 mb-2">
                <Upload className="w-6 h-6 stroke-[2]" />
              </div>

              <p className="text-xs font-semibold text-slate-600">
                Drag & Drop your resume here
              </p>

              <p className="my-1.5 text-[11px] text-slate-400 font-medium">or</p>

              <label className="bg-[#2D24D0] hover:bg-[#1e1c75] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer transition active:scale-98 inline-block">
                Choose File
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </>
          )}

          {error && (
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-red-500">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-5 text-[11px] text-slate-400 font-semibold select-none">
        <Lock size={13} />
        <span>Your data is secure and confidential</span>
      </div>
    </div>
  );
}

