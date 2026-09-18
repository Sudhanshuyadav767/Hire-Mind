
"use client";

import { CheckCircle2 } from "lucide-react";
import { careerOverview, careerPath, skillsRequired } from "@/Data/data";

export default function CareerOverview() {
  return (
    <div className="w-full space-y-6">

      {/* ================= CAREER OVERVIEW ================= */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          {careerOverview.title}
        </h2>

        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-indigo-50">
            {(() => {
              const Icon = careerOverview.icon;
              return <Icon size={65} strokeWidth={1.5} className="text-indigo-600" />;
            })()}
          </div>

          <p className="max-w-3xl text-base leading-7 text-gray-600">
            {careerOverview.description}
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {careerOverview.stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3">
                  <Icon size={30} strokeWidth={1.8} className="text-blue-500" />
                  <span className="text-sm font-medium text-gray-500">
                    {item.title}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  {item.value}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        <div className="my-7 border-t border-gray-200" />

        <h3 className="mb-5 text-xl font-bold text-gray-900">
          What Does a Data Scientist Do?
        </h3>

        <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-10">
          {careerOverview.responsibilities.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle2
                size={20}
                className="shrink-0 text-green-500"
                fill="currentColor"
                strokeWidth={0}
              />
              <span className="text-sm font-medium text-gray-700">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CAREER PATH ================= */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-7 text-2xl font-bold text-gray-900">
          Career Progressive Path
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {careerPath.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`flex min-h-[145px] flex-col items-center justify-center rounded-xl border p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                  item.active
                    ? "border-indigo-400 bg-indigo-50 shadow-sm"
                    : "border-gray-200 bg-white"
                }`}
              >
                <Icon
                  size={38}
                  strokeWidth={1.7}
                  className="mb-4 text-blue-500"
                />

                <h3 className="text-sm font-bold text-gray-800">
                  {item.title}
                </h3>

                {item.secondTitle && (
                  <h3 className="text-sm font-bold text-gray-800">
                    {item.secondTitle}
                  </h3>
                )}

                <p className="mt-2 text-sm text-gray-500">
                  {item.experience}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-7 text-2xl font-bold text-gray-900">
          Skills Required
        </h2>

        <div className="space-y-6">
          {skillsRequired.map((skill, index) => {
            const levelStyle =
              skill.level === "High"
                ? "bg-green-100 text-green-600"
                : skill.level === "Medium"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-500";

            return (
              <div
                key={index}
                className="grid grid-cols-1 items-center gap-3 md:grid-cols-[180px_240px_1fr_70px]"
              >
                <div className="text-sm font-bold text-gray-800">
                  {skill.category}
                </div>

                <div className="text-sm text-gray-600">
                  {skill.technologies}
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>

                  <span className="w-10 text-sm font-medium text-gray-500">
                    {skill.percentage}%
                  </span>
                </div>

                <div
                  className={`rounded-md px-3 py-1 text-center text-xs font-semibold ${levelStyle}`}
                >
                  {skill.level}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="rounded-md border border-indigo-400 px-10 py-2.5 text-sm font-semibold text-indigo-600 transition-all duration-200 hover:bg-indigo-600 hover:text-white hover:shadow-md active:scale-[0.98]">
            View All Skills
          </button>
        </div>
      </section>

    </div>
  );
}

