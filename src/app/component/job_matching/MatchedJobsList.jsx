"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, MapPin, Briefcase, IndianRupee, CheckCircle2, ChevronRight, X, Sparkles, Target, Award, ArrowRight } from "lucide-react";
import { jobmatching } from "@/Data/data";
import JobDetailsModal from "../find_jobs/JobDetailsModal";

export default function MatchedJobsList() {
  const [jobs, setJobs] = useState(jobmatching);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);
  const [selectedMatchModal, setSelectedMatchModal] = useState(null);

  const toggleBookmark = (idx) => {
    setBookmarkedIds((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="space-y-4 text-left">
      {/* Header with Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 select-none">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-poppins text-[#1E2229]">
            Top Matched Jobs
          </h2>
          <p className="text-xs text-slate-400 font-semibold">
            Jobs ranked by AI match score
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Sort by:</span>
          <select className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-[#1E2229] font-bold outline-none cursor-pointer">
            <option>Best Match</option>
            <option>Highest Salary</option>
            <option>Newest Jobs</option>
          </select>
        </div>
      </div>

      {/* Jobs Stack */}
      <div className="space-y-4">
        {jobs.map((item, index) => {
          const isSaved = bookmarkedIds.includes(index);
          return (
            <div
              key={index}
              className="bg-white border border-[#cbd5e1]/45 hover:border-[#2D24D0]/40 rounded-3xl p-5 shadow-3xs hover:shadow-xs transition relative text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              {/* Bookmark ribbon top-right */}
              <button
                onClick={() => toggleBookmark(index)}
                className={`absolute top-4 right-4 transition cursor-pointer ${
                  isSaved ? "text-[#2D24D0] fill-[#2D24D0]" : "text-slate-400 hover:text-[#2D24D0]"
                }`}
                title={isSaved ? "Remove Bookmark" : "Save Job"}
              >
                <Bookmark size={18} />
              </button>

              {/* Left Info Column */}
              <div className="flex items-start gap-4 flex-1 min-w-0 pr-8 md:pr-0">
                {/* Logo */}
                <div className="w-14 h-14 rounded-2xl border border-slate-100 bg-slate-50 p-2 shrink-0 flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.companyname}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>

                {/* Text & Meta */}
                <div className="space-y-1 min-w-0 flex-1">
                  <h3 className="text-base font-bold font-poppins text-[#1E2229]">
                    {item.jobtype}
                  </h3>

                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                    <span>{item.companyname}</span>
                    <CheckCircle2 size={13} className="text-blue-500 fill-blue-500 text-white" />
                  </div>

                  {/* Sub Meta Row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-slate-400" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={12} className="text-slate-400" />
                      {item.experience}
                    </span>
                    <span className="flex items-center gap-1">
                      <IndianRupee size={12} className="text-slate-400" />
                      {item.package}
                    </span>
                  </div>

                  {/* Pill Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                      Full Time
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                      Remote
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold">
                      React
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold">
                      Python
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold">
                      +3
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Action Column */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                <div className="text-left md:text-right">
                  <span className="inline-block px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                    87% Match
                  </span>
                  <span className="block text-[10px] font-bold text-emerald-600 pt-0.5">
                    ★ Excellent Match
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <button
                    onClick={() =>
                      setSelectedJobForModal({
                        id: `job-${index + 1}`,
                        title: item.jobtype,
                        company: item.companyname,
                        location: item.location,
                        experience: item.experience,
                        minSalary: 80000,
                        maxSalary: 140000,
                        salary: item.package,
                        description: `We are looking for a ${item.jobtype} to join ${item.companyname}. You will work on high-scale web platforms and backend services using React, Python, and REST APIs.`,
                      })
                    }
                    className="bg-[#2D24D0] hover:bg-[#1e1c75] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs transition cursor-pointer active:scale-98"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => setSelectedMatchModal(item)}
                    className="text-[11px] font-bold text-[#2D24D0] hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Why this match?</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View More Link */}
      <div className="text-center pt-2">
        <Link href="/find-jobs">
          <button className="text-xs font-bold text-[#2D24D0] hover:underline inline-flex items-center gap-1 cursor-pointer">
            <span>Explore All Matching Jobs</span>
            <ChevronRight size={14} />
          </button>
        </Link>
      </div>

      {/* 1. Job Details & Application Modal */}
      {selectedJobForModal && (
        <JobDetailsModal
          job={selectedJobForModal}
          isOpen={!!selectedJobForModal}
          onClose={() => setSelectedJobForModal(null)}
          onApplySuccess={() => {
            setSelectedJobForModal(null);
            alert("Application submitted successfully!");
          }}
        />
      )}

      {/* 2. AI Match Score Breakdown Modal */}
      {selectedMatchModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl relative space-y-5 text-left">
            <button
              onClick={() => setSelectedMatchModal(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full cursor-pointer transition"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-2.5 rounded-2xl bg-indigo-50 text-[#2D24D0] border border-indigo-100">
                <Sparkles size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1E2229] leading-tight">
                  AI Match Analysis — {selectedMatchModal.jobtype}
                </h3>
                <p className="text-xs text-slate-400 font-semibold">{selectedMatchModal.companyname}</p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-emerald-800 block">Excellent Compatibility</span>
                <p className="text-[11px] font-semibold text-emerald-700">
                  Your resume matches 87% of core job requirements.
                </p>
              </div>
              <div className="text-2xl font-extrabold text-emerald-700 bg-white px-3.5 py-1.5 rounded-xl shadow-2xs border border-emerald-200">
                87%
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span>Matched Skills & Qualifications</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px]">React</span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px]">Python</span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px]">REST API</span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px]">JavaScript</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Target size={14} className="text-indigo-600" />
                  <span>Recommendations to Reach 95%+</span>
                </h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  Add experience with Docker containers and GraphQL API design to your resume to increase callback odds.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedMatchModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              <Link
                href="/edit-profile"
                onClick={() => setSelectedMatchModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#2D24D0] hover:bg-[#1e1c75] shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>Update Resume Skills</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
