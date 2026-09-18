"use client";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import {
  jobMatchingData,
  jobSummaryData,
  jobSummary,
  iconMap,
} from "@/Data/job-matching";

const applicationTips = [
  {
    icon: "user",
    title: "Complete Your Profile",
    description:
      "Make sure your profile information is complete and up to date.",
  },
  {
    icon: "network",
    title: "Highlight Relevant Skills",
    description:
      "Showcase skills that match the requirements of this job.",
  },
  {
    icon: "file",
    title: "Customize Your Resume",
    description:
      "Tailor your resume to highlight relevant experience and achievements.",
  },
  {
    icon: "arrow",
    title: "Apply Early",
    description:
      "Applying early can increase your chances of getting noticed by recruiters.",
  },
];

export default function Right() {
  const score = jobMatchingData.job.match;

  return (
    <div className="w-full max-w-xl space-y-7">

      {/* ================= JOB SUMMARY ================= */}
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

        <h2 className="mb-4 text-lg font-bold text-gray-900">
          Job Summary
        </h2>

        {/* Company */}
        <div className="mb-2 flex items-center gap-5">

          {/* Google Logo */}
          <div className="flex h-24 w-24 items-center justify-center">
            <Image
            src="/logo/google.jpg"
            alt=""
            width={80}
            height={80}
            className="object-contain"
            />
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900">
              {jobMatchingData.job.title}
            </h3>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-500">
                {jobMatchingData.job.company}
              </span>

              {jobMatchingData.job.verified && (
                <BadgeCheck
                  size={18}
                  className="fill-blue-500 text-white"
                />
              )}
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-2">

          {jobSummary.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="grid grid-cols-[32px_1fr_1fr] items-center gap-2"
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className="text-indigo-400"
                />

                <span className="text-sm font-medium text-gray-600">
                  {item.label}
                </span>

                <span className="text-sm font-medium text-gray-600">
                  {item.value}
                </span>
              </div>
            );
          })}

        </div>

        <div className="my-2 h-px bg-gray-200" />

        {/* Match Score */}
        <div className="flex flex-col items-center">

          <div className="relative h-40 w-40">

          <svg
  className="h-full w-full -rotate-90"
  viewBox="0 0 80 80"
>
  {/* Background Circle */}
  <circle
    cx="40"
    cy="40"
    r="32"
    fill="none"
    stroke="#eeeeee"
    strokeWidth="4"
  />

  {/* Progress Circle */}
  <circle
    cx="40"
    cy="40"
    r="32"
    fill="none"
    stroke="#4035e8"
    strokeWidth="4"
    strokeLinecap="round"
    strokeDasharray={`${score * 2.0106} 201.06`}
  />
</svg>
            {/* Score */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[30px] font-medium leading-none text-black">
                {score}
              </span>

              <span className="text-[14px] font-medium text-gray-600">
                /100
              </span>
            </div>

          </div>

          <div className="mt-2 flex items-center gap-2 text-[17px] font-bold text-emerald-500">
            <span className="text-xl">★</span>
            {jobMatchingData.job.matchText}
          </div>

        </div>
      </div>

      {/* ================= APPLICATION TIPS ================= */}
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

        <h2 className="mb-4 text-lg font-bold text-gray-900">
          Application Tips
        </h2>

        <div className="space-y-4">

          {applicationTips.map((tip, index) => {

            const Icon = iconMap[tip.icon];

            return (
              <div
                key={index}
                className="flex items-start gap-4"
              >

                {/* Icon Circle */}
                <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-indigo-50">
                  <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-indigo-200">
                    <Icon
                      size={20}
                      strokeWidth={1.7}
                      className="text-indigo-500"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="pt-1">

                  <h3 className="text-base font-bold text-gray-900">
                    {tip.title}
                  </h3>

                  <p className="mt-1 max-w-[330px] text-sm leading-6 text-gray-500">
                    {tip.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}