"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, FileText, UploadCloud, AlertCircle, Loader2 } from "lucide-react";
import { resumeService } from "../../../services/resumeService";
import { profileService } from "../../../services/profileService";

export default function ChoseFileHero({ onParsedData }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedResume, setUploadedResume] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState("");
  const [autofillSuccess, setAutofillSuccess] = useState(false);

  const handleFileChange = async (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setError("");
    setIsUploading(true);

    try {
      const res = await resumeService.uploadResume(selected);
      if (res.data) {
        setUploadedResume(res.data);
        if (res.data.parsed) {
          setParsedData(res.data.parsed);
          if (onParsedData) onParsedData(res.data.parsed);
        }
      }
    } catch (err) {
      setError(err.message || "Failed to upload resume. Make sure backend is running.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAutofillProfile = async () => {
    if (!parsedData) return;
    try {
      // 1. Update backend profile summary and location
      await profileService.updateProfile({
        summary: parsedData.summary,
        location: parsedData.location,
      });

      // 2. Add skills via API
      if (parsedData.skills && Array.isArray(parsedData.skills)) {
        for (const s of parsedData.skills.slice(0, 10)) {
          try {
            await profileService.addSkill(typeof s === 'string' ? s : s.name);
          } catch (e) {}
        }
      }

      // 3. Update localStorage profile object with all parsed fields
      if (typeof window !== 'undefined') {
        const storedProfile = localStorage.getItem('hiremind_user_profile');
        let currentP = {};
        if (storedProfile) {
          try { currentP = JSON.parse(storedProfile); } catch (e) {}
        }

        const formattedSkills = (parsedData.skills || []).map(s => typeof s === 'string' ? { name: s, level: 'Intermediate' } : s);
        const formattedExp = (parsedData.experience || parsedData.experiences || []).map(e => ({
          role: e.designation || e.title || e.role || 'Position',
          company: e.companyName || e.company || 'Company',
          duration: e.duration || (e.startDate ? `${e.startDate} - ${e.endDate || 'Present'}` : ''),
          description: e.description || ''
        }));
        const formattedEdu = (parsedData.education || parsedData.educations || []).map(ed => ({
          degree: ed.degree || 'Degree',
          institute: ed.institution || ed.school || ed.institute || 'Institution',
          years: ed.years || (ed.startDate ? `${ed.startDate} - ${ed.endDate || 'Present'}` : '')
        }));
        const formattedProj = (parsedData.projects || []).map(p => ({
          name: p.title || p.name || 'Project',
          description: p.description || ''
        }));

        const updatedProfile = {
          ...currentP,
          about: parsedData.summary || currentP.about,
          skills: formattedSkills.length ? formattedSkills : currentP.skills,
          workExperience: formattedExp.length ? formattedExp : currentP.workExperience,
          education: formattedEdu.length ? formattedEdu : currentP.education,
          projects: formattedProj.length ? formattedProj : currentP.projects,
          resume: {
            filename: file?.name || 'Uploaded_Resume.pdf',
            modified: 'Uploaded just now'
          }
        };

        localStorage.setItem('hiremind_user_profile', JSON.stringify(updatedProfile));
      }

      setAutofillSuccess(true);
      setTimeout(() => setAutofillSuccess(false), 4000);
    } catch (e) {
      setError("Failed to autofill profile: " + e.message);
    }
  };

  return (
    <section className="bg-[#E2E4F8] px-4 py-8 lg:px-10 rounded-b-3xl my-2 mx-auto max-w-7xl shadow-3xs overflow-hidden text-left">
      <div className="mx-auto max-w-7xl grid grid-cols-12 gap-6 items-center">
        {/* Left Column Text & File Box */}
        <div className="col-span-12 md:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200 shadow-xs">
              <CheckCircle2 size={22} className="stroke-[2.2]" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold text-[#1E2229] tracking-tight leading-tight">
              AI Resume Parser & Optimizer
            </h1>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm font-semibold pl-12">
            Upload your PDF/DOCX resume to instantly analyze ATS score and autofill your profile.
          </p>

          {/* Interactive File Upload Box */}
          <div className="bg-white border-2 border-dashed border-indigo-200 rounded-2xl p-5 shadow-xs max-w-lg ml-0 sm:ml-12 mt-3">
            {!uploadedResume ? (
              <label className="flex flex-col items-center justify-center cursor-pointer space-y-2">
                {isUploading ? (
                  <div className="flex items-center gap-2 text-[#463fe6] font-semibold text-sm">
                    <Loader2 size={24} className="animate-spin" />
                    <span>Uploading & Parsing Resume with AI...</span>
                  </div>
                ) : (
                  <>
                    <div className="p-3 rounded-full bg-indigo-50 text-[#463fe6]">
                      <UploadCloud size={28} />
                    </div>
                    <span className="text-sm font-bold text-[#1E2229]">Click to Upload PDF / DOCX</span>
                    <span className="text-xs text-slate-400">Max size 5MB</span>
                  </>
                )}
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </label>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-xl bg-blue-50 text-[#2D24D0] shrink-0 border border-blue-100">
                      <FileText size={24} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold text-[#1E2229] truncate">
                        {file?.name || "Uploaded_Resume.pdf"}
                      </h3>
                      <span className="text-[10px] text-emerald-600 font-semibold">
                        Parse Status: {uploadedResume.parseStatus || "Completed"}
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0 ml-2" />
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <label className="text-xs text-[#463fe6] font-semibold cursor-pointer hover:underline">
                    Re-upload Resume
                    <input type="file" accept=".pdf,.docx,.doc" className="hidden" onChange={handleFileChange} />
                  </label>
                  <button
                    onClick={handleAutofillProfile}
                    className="px-3 py-1.5 rounded-lg bg-[#463fe6] text-white text-xs font-bold hover:bg-[#3831d0] shadow-xs"
                  >
                    1-Click Profile Autofill
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-red-500">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            {autofillSuccess && (
              <div className="mt-3 text-xs font-semibold text-emerald-600">
                ✅ Candidate profile successfully updated with parsed resume data!
              </div>
            )}
          </div>
        </div>

        {/* Right Illustration */}
        <div className="col-span-12 md:col-span-5 relative flex items-center justify-center h-[160px] sm:h-[220px] shrink-0">
          <div className="relative w-44 h-44 sm:w-56 sm:h-56">
            <Image
              src="/Images/docs.png"
              alt="Resume Docs Illustration"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
