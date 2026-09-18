
"use client";

import {
  Video,
  Briefcase,
  Gauge,
  Clock3,
  CalendarDays,
  CheckCircle2,
  Trophy,
  BarChart3,
} from "lucide-react";

import { candidate, strengths, improvements } from "@/Data/data";

export default function RightSection() {
  const details = [
    {
      label: "Interview Type",
      value: candidate.interviewType,
      icon: Video,
    },
    {
      label: "Experience Level",
      value: candidate.experienceLevel,
      icon: Briefcase,
    },
    {
      label: "Difficulty Level",
      value: candidate.difficulty,
      icon: Gauge,
    },
    {
      label: "Interview Duration",
      value: candidate.duration,
      icon: Clock3,
    },
    {
      label: "Completed On",
      value: candidate.completedOn,
      icon: CalendarDays,
    },
  ];

  return (
    <div className="space-y-6">

      {/* ================= CANDIDATE ================= */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold text-white">
            {candidate.initial}
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800">
              {candidate.name}
            </h2>

            <p className="text-sm text-gray-500">
              {candidate.role}
            </p>
          </div>
        </div>

        {/* Candidate Details */}
        <div className="space-y-5">
          {details.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-3"
              >
                <Icon
                  size={17}
                  className="shrink-0 text-indigo-500"
                />

                <span className="text-sm text-gray-500">
                  {item.label}
                </span>

                <span className="ml-auto text-right text-xs font-semibold text-gray-700">
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= STRENGTHS ================= */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-bold text-gray-800">
          🏆 Top Strengths
        </h2>

        <div className="space-y-4">
          {strengths.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3"
            >
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0 text-green-600"
              />

              <p className="text-sm leading-5 text-gray-600">
                {item}
              </p>
            </div>
          ))}
        </div>

        <hr className="my-6" />

        {/* Areas To Improve */}
        <h3 className="mb-4 font-bold text-gray-800">
          <span className="mr-2 text-orange-500">▮</span>
          Areas to Improve
        </h3>

        <div className="space-y-4">
          {improvements.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3"
            >
              <span className="mt-0.5 text-orange-500">
                ●
              </span>

              <p className="text-sm leading-5 text-gray-600">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= PRACTICE ================= */}
      <div className="rounded-lg border border-gray-200 bg-white p-7 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
          <Trophy
            size={40}
            className="text-indigo-600"
          />
        </div>

        <h2 className="text-lg font-bold text-gray-800">
          Keep Improving!
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Practice regularly and track your progress to ace your next
          interview
        </p>

        <button className="mx-auto mt-6 flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-5 py-3 font-semibold text-indigo-600 transition-all duration-200 hover:bg-indigo-100 hover:shadow-sm active:scale-[0.98]">
          <BarChart3 size={18} />
          Practice More Interviews
        </button>
      </div>

    </div>
  );
}

