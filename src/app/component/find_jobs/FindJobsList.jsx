"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Bookmark, 
  MapPin, 
  Briefcase, 
  Mail, 
  DollarSign, 
  ChevronDown, 
  Grid, 
  List as ListIcon, 
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import JobDetailsModal from "./JobDetailsModal";

const jobTabs = [
  { label: "All Jobs", count: 4520, id: "all" },
  { label: "Full Time", count: 2540, id: "fullTime" },
  { label: "Part Time", count: 1000, id: "partTime" },
  { label: "Remote", count: 500, id: "remote" },
  { label: "Internship", count: 240, id: "internship" },
  { label: "Freelance", count: 100, id: "freelance" }
];

export default function FindJobsList({
  jobs = [],
  isLoading = false,
  activeTab,
  onTabChange,
  currentPage,
  onPageChange,
  onOpenPostModal
}) {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState(null);

  // Calculate dynamic tab counts based strictly on active recruiter posted jobs
  const allJobsCount = jobs.length;
  const fullTimeCount = jobs.filter(j => j.type?.toLowerCase().includes('full')).length;
  const partTimeCount = jobs.filter(j => j.type?.toLowerCase().includes('part')).length;
  const remoteCount = jobs.filter(j => j.type?.toLowerCase().includes('remote') || j.location?.toLowerCase().includes('remote')).length;
  const internshipCount = jobs.filter(j => j.type?.toLowerCase().includes('intern')).length;
  const freelanceCount = jobs.filter(j => j.type?.toLowerCase().includes('free')).length;

  const jobTabs = [
    { label: "All Jobs", count: allJobsCount, id: "all" },
    { label: "Full Time", count: fullTimeCount, id: "fullTime" },
    { label: "Part Time", count: partTimeCount, id: "partTime" },
    { label: "Remote", count: remoteCount, id: "remote" },
    { label: "Internship", count: internshipCount, id: "internship" },
    { label: "Freelance", count: freelanceCount, id: "freelance" }
  ];

  // Extract unique hiring companies from actual posted jobs
  const uniqueCompanies = Array.from(new Set(jobs.map(j => j.company))).filter(Boolean);

  return (
    <div className="space-y-6">
      
      {/* 1. Job Tabs Bar & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#cbd5e1]/40 pb-0.5 select-none gap-2">
        <div className="flex items-center gap-1 overflow-x-auto max-w-full no-scrollbar pr-2">
          {jobTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`pb-2.5 px-3 text-xs font-bold transition cursor-pointer relative whitespace-nowrap shrink-0 ${
                  isActive 
                    ? "text-[#433be2]" 
                    : "text-[#64748b] hover:text-[#334155]"
                }`}
              >
                <span>{tab.label}({tab.count})</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#433be2] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Buttons: My Applications */}
        <div className="flex items-center gap-2 shrink-0 sm:mb-1.5">
          <Link
            href="/applications"
            className="rounded-xl bg-[#433be2] hover:bg-[#342bc7] text-white px-4 py-2 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer whitespace-nowrap"
          >
            <Briefcase size={14} />
            <span>My Job Applications</span>
          </Link>
        </div>
      </div>

      {/* 2. Header count and sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs font-bold text-[#64748b] order-2 sm:order-1 select-none">
          Showing {jobs.length > 0 ? 1 : 0}-{jobs.length} of {jobs.length} jobs
        </p>
        
        <div className="flex items-center justify-between sm:justify-end gap-3 order-1 sm:order-2 w-full sm:w-auto">
          {/* Sort selection */}
          <div className="flex items-center gap-1.5 text-xs text-[#64748b] select-none">
            <span>Sort by:</span>
            <button 
              type="button" 
              className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 font-bold text-[#334155] shadow-2xs hover:bg-[#f8fafc] cursor-pointer"
            >
              <span>Most Relevant</span>
              <ChevronDown size={12} className="text-gray-500" />
            </button>
          </div>

          {/* View Toggles */}
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs select-none">
            <button className="p-2 bg-slate-50 text-[#433be2] border-r border-gray-200 cursor-pointer">
              <ListIcon size={14} />
            </button>
            <button className="p-2 text-[#64748b] hover:text-[#334155] cursor-pointer">
              <Grid size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Featured Hiring Companies (Only rendered if recruiters have posted jobs) */}
      {uniqueCompanies.length > 0 && (
        <div className="bg-white border border-[#cbd5e1] rounded-2xl p-4 shadow-xs space-y-3">
          <h4 className="text-xs font-poppins font-bold text-[#101014] select-none">Hiring Enterprise Companies</h4>
          <div className="flex flex-wrap items-center gap-2">
            {uniqueCompanies.map((c, idx) => (
              <span key={idx} className="border border-indigo-100 bg-indigo-50/60 rounded-xl px-3 py-1.5 text-xs font-bold text-[#433be2] flex items-center gap-1.5">
                <CheckCircle size={12} className="text-[#433be2]" />
                <span>{c}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 4. Job Listings */}
      <div className="space-y-3.5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-[#cbd5e1] rounded-2xl shadow-sm space-y-4">
            <div className="loader" />
            <p className="text-xs font-bold text-slate-400 animate-pulse">Fetching recruiter job postings...</p>
          </div>
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <article 
              key={job.id}
              onClick={() => router.push(`/job/${job.id}`)}
              className="bg-white border border-[#cbd5e1] hover:border-[#433be2] rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in cursor-pointer group"
            >
              {/* Left and Center details */}
              <div className="flex items-start gap-3.5 w-full sm:w-auto">
                
                {/* Real Google G SVG Icon Logo or uploaded custom logo */}
                <div className="w-10 h-10 rounded-full border border-gray-150 flex items-center justify-center bg-white shadow-xs shrink-0 p-1.5 overflow-hidden">
                  <img 
                    src={job.customLogo || "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"} 
                    alt={job.company} 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="space-y-1">
                  {/* Title */}
                  <h3 className="text-sm font-poppins font-semibold text-[#101014] group-hover:text-[#433be2] transition leading-snug flex items-center gap-1.5">
                    <span>{job.title}</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition text-[#433be2]" />
                  </h3>

                  {/* Company Name & Verified */}
                  <div className="flex items-center gap-1 text-[11px] font-poppins font-bold text-[#433be2]">
                    <span>{job.company}</span>
                    <CheckCircle size={10} className="fill-[#433be2] text-white" />
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-[11px] text-[#64748b] font-semibold">
                    <MapPin size={11} />
                    <span>{job.location}</span>
                  </div>

                  {/* Row of metadata badges */}
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-[10px] font-bold text-[#475569]">
                    <div className="flex items-center gap-1">
                      <Briefcase size={12} className="text-gray-400" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail size={12} className="text-gray-400" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={12} className="text-gray-400" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side items */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2.5 self-stretch sm:self-auto border-t sm:border-t-0 border-[#f1f5f9] pt-2 sm:pt-0 shrink-0">
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); router.push(`/job/${job.id}`); }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#433be2] hover:bg-[#352ed0] text-white text-xs font-bold transition shadow-2xs cursor-pointer flex items-center gap-1"
                  >
                    <span>View & Apply</span>
                  </button>

                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-400 hover:text-[#433be2] cursor-pointer p-1"
                  >
                    <Bookmark size={16} />
                  </button>
                </div>

                {/* Tag pill & time */}
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-[#e8fbf4] px-2.5 py-0.5 text-[10px] font-bold text-[#10b981]">
                    {job.type}
                  </span>
                  <span className="text-[10px] font-semibold text-[#94a3b8]">
                    {job.posted}
                  </span>
                </div>
              </div>

            </article>
          ))
        ) : (
          <div className="bg-white border border-[#cbd5e1] rounded-2xl p-12 text-center space-y-3 shadow-xs">
            <Briefcase className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="text-sm font-bold text-[#101014]">No Jobs Posted Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              There are currently no active job postings. When recruiters or admins publish new job openings, they will appear here automatically.
            </p>
          </div>
        )}
      </div>

      {/* 5. Job Details Modal */}
      <JobDetailsModal 
        job={selectedJob}
        isOpen={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
      />

      {/* 5. Pagination Bar */}
      <div className="border-t border-[#f1f5f9] pt-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-semibold text-[#64748b] order-3 md:order-1">
          Showing 1-{jobs.length} of {jobs.length} jobs
        </p>

        {/* Navigator controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 text-xs font-bold text-[#475569] order-1 md:order-2">
          <button className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-slate-50 cursor-pointer">
            <ChevronLeft size={14} />
          </button>
          
          <button 
            onClick={() => onPageChange(1)}
            className={`h-8 w-8 rounded-lg flex items-center justify-center shadow-xs cursor-pointer ${
              currentPage === 1 ? "bg-[#433be2] text-white" : "border border-gray-200 bg-white hover:bg-slate-50"
            }`}
          >
            1
          </button>
          
          {["2", "3", "4", "5", "...", "256"].map((num, i) => {
            const numVal = Number(num);
            const isSelected = currentPage === numVal;
            return (
              <button 
                key={i} 
                onClick={() => !isNaN(numVal) && onPageChange(numVal)}
                className={`h-8 w-8 rounded-lg items-center justify-center shadow-2xs cursor-pointer ${
                  num === "..." 
                    ? "flex border-none bg-transparent hover:bg-transparent shadow-none cursor-default" 
                    : ["3", "4", "5"].includes(num)
                      ? `hidden sm:flex ${isSelected ? "bg-[#433be2] text-white" : "border border-gray-200 bg-white hover:bg-slate-50"}`
                      : `flex ${isSelected ? "bg-[#433be2] text-white" : "border border-gray-200 bg-white hover:bg-slate-50"}`
                }`}
              >
                {num}
              </button>
            );
          })}
          
          <button className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-slate-50 cursor-pointer">
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Page sizes */}
        <div className="flex items-center gap-1.5 text-xs text-[#64748b] order-2 md:order-3">
          <button 
            type="button" 
            className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 font-bold text-[#334155] shadow-2xs hover:bg-[#f8fafc] cursor-pointer"
          >
            <span>10 / Page</span>
            <ChevronDown size={12} className="text-gray-500" />
          </button>
        </div>

      </div>

    </div>
  );
}
