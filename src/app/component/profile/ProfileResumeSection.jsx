"use client";

import React from 'react';
import { FileCheck, Upload, Download, RefreshCw, FileUp } from 'lucide-react';

/**
 * ProfileResumeSection Component
 * Manages resume display, client/server file uploads, AI parsing progress indicator, and file downloads.
 */
export default function ProfileResumeSection({
  resume,
  isParsingResume,
  onResumeUpload
}) {
  return (
    <section className="bg-white border border-[#e4e5ee] rounded-[24px] p-5 sm:p-6 shadow-[0_4px_18px_rgba(20,24,60,0.04)] hover:shadow-md transition">
      <div className="flex items-center justify-between border-b border-[#f0f1f7] pb-3.5 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#f0efff] text-[#463fe6] flex items-center justify-center shrink-0">
            <FileCheck className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-[#141522]">Resume</h3>
        </div>

        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#463fe6] hover:bg-[#3932db] text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-xs">
          <Upload className="w-3.5 h-3.5" />
          <span>{resume ? 'Upload New' : 'Upload Resume'}</span>
          <input 
            type="file" 
            accept=".pdf,.doc,.docx,.txt" 
            className="hidden" 
            onChange={onResumeUpload}
            disabled={isParsingResume}
          />
        </label>
      </div>

      {isParsingResume && (
        <div className="p-4 mb-3 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center gap-2 text-xs font-semibold text-[#463fe6]">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Parsing resume & updating profile...</span>
        </div>
      )}

      {resume ? (
        <div className="bg-[#f8f9fe] border border-[#e5e7f5] rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center font-bold text-xs shrink-0">
              PDF
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#141522]">
                {resume.filename}
              </h4>
              <p className="text-[11px] text-slate-400 font-medium">
                {resume.modified || 'Uploaded'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert(`Resume file: ${resume.filename}`)}
            className="p-2 text-[#463fe6] hover:bg-indigo-50 rounded-xl transition cursor-pointer"
            title="Download / View Resume"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      ) : !isParsingResume && (
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center">
          <FileUp className="w-8 h-8 text-[#463fe6] mx-auto mb-2 opacity-60" />
          <p className="text-xs font-bold text-slate-700">No resume uploaded yet</p>
          <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
            Upload your PDF/DOCX resume to parse skills, work experience, and education automatically into your profile.
          </p>
        </div>
      )}
    </section>
  );
}
