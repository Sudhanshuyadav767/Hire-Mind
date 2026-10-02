"use client";

import React from "react";
import {
  CheckCircle2,
  Circle,
  Folder,
  ChevronRight,
  Star,
  Pencil,
} from "lucide-react";

import {
  careerProfile,
  popularCareerPaths,
  recommendedNextSteps,
} from "@/Data/data5";

export default function CareerProfile() {
  const percentage =
    (careerProfile.score / careerProfile.maxScore) * 100;

  return (
    <div className="w-full space-y-6">

      {/* ================= CAREER PROFILE ================= */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Your Career Profile
          </h2>

          <button className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            <Pencil size={15} />
            Edit Profile
          </button>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

          {/* Score Circle */}
          <div className="flex justify-center sm:w-[180px]">
            <div
              className="relative flex h-32 w-32 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#3024d8 ${percentage}%, #eeeeee ${percentage}% 100%)`
              }}
            >
              <div className="flex h-[106px] w-[106px] flex-col items-center justify-center rounded-full bg-white">
                <span className="text-3xl font-bold text-gray-900">
                  {careerProfile.score}
                </span>

                <span className="text-lg text-gray-500">
                  /{careerProfile.maxScore}
                </span>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            {careerProfile.checklist.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3"
              >
                {item.completed ? (
                  <CheckCircle2
                    size={18}
                    className="fill-green-500 text-white"
                  />
                ) : (
                  <Circle
                    size={18}
                    className="text-gray-300"
                  />
                )}

                <span
                  className={`text-sm ${
                    item.completed
                      ? "text-gray-600"
                      : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Card */}
        <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-5">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

            {/* Star */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white">
              <Star
                size={34}
                className="fill-yellow-400 text-yellow-400"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">
                Unlock Full Career Path
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Get detailed insights, roadmap,
                <br className="hidden sm:block" />
                and job recommendations
              </p>
            </div>

            {/* Button */}
            <button className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </section>


      {/* ================= POPULAR CAREER PATHS ================= */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Popular Career Paths
          </h2>

          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            View All
          </button>
        </div>

        <div>
          {popularCareerPaths.map((career, index) => (
            <div
              key={career.id}
              className={`flex items-center justify-between py-2 ${
                index !== popularCareerPaths.length - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <div className="flex items-center gap-4">

                {/* Folder Icon */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <Folder
                    size={22}
                    className="fill-blue-300 text-blue-400"
                  />
                </div>

                <span className="font-medium text-gray-800">
                  {career.title}
                </span>
              </div>

              <span
                className={`text-sm font-medium ${
                  career.status === "Growing"
                    ? "text-indigo-500"
                    : "text-emerald-500"
                }`}
              >
                {career.status}
              </span>
            </div>
          ))}
        </div>
      </section>


      {/* ================= RECOMMENDED NEXT STEPS ================= */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Recommended Next Steps
          </h2>

          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            View All
          </button>
        </div>

        <div className="space-y-1">

          {recommendedNextSteps.map((step) => (
            <button
              key={step.id}
              className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:border-indigo-200 hover:bg-indigo-50"
            >
              <div className="flex items-center gap-4">

                {/* Folder */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  <Folder
                    size={18}
                    className="fill-blue-300 text-blue-400"
                  />
                </div>

                <span className="text-sm font-medium text-gray-600">
                  {step.title}
                </span>
              </div>

              <ChevronRight
                size={18}
                className="shrink-0 text-gray-500"
              />
            </button>
          ))}

        </div>
      </section>

    </div>
  );
}