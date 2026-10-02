"use client";

import roadmapData from "@/Data/data3";
import Link from "next/link";
export default function Roadmap() {
  return (
    <section className="w-full bg-white px-4 py-10 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Roadmap */}
        <div className="relative">

          {/* Vertical Line */}
          <div className="absolute left-[22px] top-10 bottom-10 w-[2px] bg-indigo-200 md:left-[24px]" />

          <div className="space-y-6">
            {roadmapData.map((item) => (
              <div
                key={item.id}
                className="relative flex gap-4 md:gap-6"
              >

                {/* Number */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white shadow-md">
                  {item.id}
                </div>

                {/* Card */}
                <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-7">

                  {/* Top Section */}
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                    {/* Content */}
                    <div className="flex-1">

                      {/* Title + Duration */}
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <h2 className="text-base font-bold text-gray-900 md:text-lg">
                          {item.title}
                        </h2>

                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600">
                          {item.duration}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="mb-5 text-sm leading-6 text-gray-500">
                        {item.description}
                      </p>

                      {/* Skills */}
                      <div className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
                        {item.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2"
                          >
                            <span className="mt-1 flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-green-500">
                              <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            </span>

                            <span className="text-sm font-medium text-gray-600">
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-5xl">
                      {item.icon}
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="mt-7 flex flex-col gap-4 rounded-lg border border-gray-200 px-5 py-4 md:flex-row md:items-center md:justify-between">

                    <p className="text-sm leading-6 text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Outcome:
                      </span>{" "}
                      {item.outcome}
                    </p>

                <Link href="/Career-Guidance/DataScientistSkill">    <button
                      type="button"
                      className="flex shrink-0 items-center gap-2 font-semibold text-indigo-600 transition hover:text-indigo-800"
                    >
                      View Skills
                      <span className="text-lg">→</span>
                    </button>
</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}