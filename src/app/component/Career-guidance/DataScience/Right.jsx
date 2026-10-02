"use client";

import {
  BriefcaseBusiness,
  ChevronRight,
} from "lucide-react";

import {
  topHiringIndustries,
  topJobRoles,
} from "@/Data/data2";

export default function HiringSection() {
  return (
    <div className="w-full max-w-2xl space-y-7">

      {/* ================= TOP HIRING INDUSTRIES ================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-lg font-bold text-gray-900">
          Top Hiring Industries
        </h2>

        <div>
          {topHiringIndustries.map((industry, index) => {
            const Icon = industry.icon;

            return (
              <div
                key={index}
                className={`flex items-center justify-between py-4 ${
                  index !== topHiringIndustries.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                {/* Left */}
                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
                    <Icon
                      size={22}
                      className="text-blue-600"
                    />
                  </div>

                  <span className="text-sm font-semibold text-gray-800">
                    {industry.name}
                  </span>
                </div>

                {/* Demand */}
                <span className="text-sm font-semibold text-emerald-500">
                  {industry.demand}
                </span>

              </div>
            );
          })}
        </div>
      </div>


      {/* ================= TOP JOB ROLES ================= */}

      <div className="min-h-[620px] rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">

          <h2 className="text-lg font-bold text-gray-900">
            Top Job Roles for You
          </h2>

          <button className="font-semibold text-blue-600 transition hover:text-blue-800">
            View All
          </button>

        </div>


        {/* Jobs */}
        <div>
          {topJobRoles.map((job, index) => (
            <div
              key={index}
              className="group flex items-center justify-between border-b border-gray-200 py-5 last:border-b-0"
            >

              {/* Job info */}
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                  <BriefcaseBusiness
                    size={22}
                    className="text-blue-500"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {job.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {job.salary}
                  </p>
                </div>

              </div>


              {/* Demand + arrow */}
              <div className="flex items-center gap-5">

                <span
                  className={`text-sm font-semibold ${
                    job.demand === "High demand"
                      ? "text-emerald-400"
                      : "text-orange-400"
                  }`}
                >
                  {job.demand}
                </span>

                <ChevronRight
                  size={19}
                  className="text-gray-500 transition-transform group-hover:translate-x-1"
                />

              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}