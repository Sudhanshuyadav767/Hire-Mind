
"use client";

import { useState } from "react";
import Image from "next/image";
import { jobs } from "@/Data/data4";
import { Bookmark } from "lucide-react";

export default function JobList() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Most Relevant");
  const [bookmarked, setBookmarked] = useState(new Set());

  // ================= BOOKMARK =================
  const toggleBookmark = (jobId) => {
    setBookmarked((prev) => {
      const next = new Set(prev);

      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }

      return next; 
    });
  };

  // ================= SEARCH =================
  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase().trim();

    return (
      job.title.toLowerCase().includes(searchText) ||
      job.company.toLowerCase().includes(searchText) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchText)
      )
    );
  });

  // ================= SORT =================
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sort === "Newest") {
      return new Date(b.posted) - new Date(a.posted);
    }

    if (sort === "Oldest") {
      return new Date(a.posted) - new Date(b.posted);
    }

    if (sort === "Highest Salary") {
      return String(b.salary).localeCompare(String(a.salary), undefined, {
        numeric: true,
      });
    }

    if (sort === "Lowest Salary") {
      return String(a.salary).localeCompare(String(b.salary), undefined, {
        numeric: true,
      });
    }

    return 0;
  });

  return (
    <div className="w-full px-4 sm:px-0">

      {/* ================= TOP BAR ================= */}
      <div className="mb-6 sm:mb-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-5">

        {/* Search */}
        <div className="relative w-full sm:max-w-[460px]">
          <input
            type="text"
            placeholder="Search job title, skills or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 sm:h-14 w-full rounded-lg border border-gray-200 bg-white px-4 sm:px-5 pr-12 text-sm outline-none shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />

          <span className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-xl sm:text-2xl text-gray-500">
            ⌕
          </span>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-sm text-gray-600 whitespace-nowrap">
            Sort by:
          </span>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-12 sm:h-14 w-full sm:w-[250px] rounded-lg border border-gray-200 bg-white px-4 sm:px-5 text-sm font-medium outline-none shadow-sm focus:border-indigo-500"
          >
            <option>Most Relevant</option>
            <option>Newest</option>
            <option>Oldest</option>
            <option>Highest Salary</option>
            <option>Lowest Salary</option>
          </select>
        </div>
      </div>


      {/* ================= JOB COUNT ================= */}
      <h2 className="mb-5 sm:mb-7 ml-1 sm:ml-7 text-base sm:text-lg font-bold text-gray-900">
        {sortedJobs.length} Jobs Found
      </h2>


      {/* ================= JOB LIST ================= */}
      <div className="flex flex-col gap-5">

        {sortedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isBookmarked={bookmarked.has(job.id)}
            onToggleBookmark={() => toggleBookmark(job.id)}
          />
        ))}

      </div>


      {/* ================= NO JOB ================= */}
      {sortedJobs.length === 0 && (
        <div className="mt-5 rounded-xl border border-gray-200 bg-white py-12 sm:py-16 text-center text-gray-500">
          No jobs found
        </div>
      )}

    </div>
  );
}


/* ================================================= */
/*                    JOB CARD                       */
/* ================================================= */

function JobCard({
  job,
  isBookmarked,
  onToggleBookmark,
}) {
  return (
    <div className="relative rounded-xl border border-gray-200 bg-white px-4 sm:px-6 lg:px-8 py-6 shadow-sm transition hover:shadow-md">

      {/* ================= BOOKMARK ================= */}
      <button
        type="button"
        onClick={onToggleBookmark}
        aria-label="Bookmark job"
        className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-gray-100"
      >
        <Bookmark
          size={20}
          strokeWidth={2}
          className={
            isBookmarked
              ? "fill-indigo-600 text-indigo-600"
              : "text-gray-500"
          }
        />
      </button>


      {/* ================= MAIN CONTENT ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">


        {/* ================= LEFT ================= */}
        <div className="flex min-w-0 flex-1 items-start gap-4 sm:gap-6 pr-10">

          {/* Company Logo */}
          <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
            <Image
              src={job.logo}
              alt={job.company}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>


          {/* Job Information */}
          <div className="min-w-0 flex-1">

            {/* Job Title */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              {job.title}
            </h3>

            {/* Company */}
            <p className="mt-1 text-sm sm:text-base font-semibold text-gray-900">
              {job.company}
            </p>


            {/* ================= META ================= */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-xs sm:text-sm text-gray-500">

              <span className="flex items-center gap-2">
                💼 {job.experience}
              </span>

              <span className="flex items-center gap-2">
                📍 {job.location}
              </span>

              <span className="flex items-center gap-2">
                ✉️ {job.jobType}
              </span>

            </div>


            {/* ================= SKILLS ================= */}
            <div className="mt-3 flex flex-wrap gap-2">

              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs sm:text-sm font-medium text-indigo-600"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>
        </div>


        {/* ================= RIGHT ================= */}
        <div className="w-full lg:w-[230px] shrink-0">

          <div className="flex flex-row lg:flex-col items-center lg:items-start justify-between gap-3">

            {/* Salary */}
            <h3 className="text-sm font-semibold text-gray-600">
              {job.salary}
            </h3>


            {/* Location */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
              <span>📍</span>
              {job.location}
            </div>


            {/* Posted */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
              <span>◷</span>
              {job.posted}
            </div>


            {/* View Job */}
            <button
              type="button"
              onClick={() => {
                console.log("Opening job:", job.id);
              }}
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white whitespace-nowrap transition hover:bg-indigo-700 active:scale-95"
            >
              View Job
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
