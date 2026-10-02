"use client";

import { skillCategories } from "@/Data/data4";

export default function Skill() {
  return (
    <section className="w-full bg-white px-4 py-5">

      {/* Top Heading */}
      <div className="mb-5 flex items-center gap-2">
        <h2 className="text-[15px] font-semibold text-gray-900">
          All Skills
        </h2>

        <span className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-medium text-indigo-500">
          12 Skills
        </span>
      </div>

      {/* Categories */}
      <div className="overflow-hidden rounded-lg border border-gray-200">

        {skillCategories.map((category, categoryIndex) => {
          const CategoryIcon = category.icon;

          return (
            <div key={category.title}>

              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">

                <div className="flex items-center gap-3">

                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-50">
                    <CategoryIcon
                      size={15}
                      className="text-indigo-500"
                    />
                  </div>

                  <h3 className="text-[15px] font-semibold text-gray-900">
                    {category.title}
                  </h3>
                </div>

                <span className="text-[11px] font-medium text-indigo-600">
                  {category.count} Skills
                </span>

              </div>

              {/* Skills */}
              {category.skills.map((skill) => (

                <div
                  key={skill.name}
                  className="flex min-h-[74px] items-center gap-4 border-b border-gray-200 px-5 py-3 last:border-b-0"
                >

                  {/* Skill Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-[17px] font-semibold text-indigo-600">
                    {skill.icon}
                  </div>

                  {/* Name + Description */}
                  <div className="min-w-0 flex-1">

                    <h4 className="text-[13px] font-semibold text-gray-900">
                      {skill.name}
                    </h4>

                    <p className="mt-1 text-[11px] leading-[15px] text-gray-500">
                      {skill.description}
                    </p>

                  </div>

                  {/* Progress */}
                  <div className="flex w-[180px] shrink-0 items-center gap-2">

                    <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-indigo-600"
                        style={{
                          width: `${skill.percentage}%`,
                        }}
                      />
                    </div>

                    <span className="w-[30px] text-[11px] text-gray-500">
                      {skill.percentage}%
                    </span>

                  </div>

                  {/* Level */}
                  <span
                    className={`w-[82px] rounded-md px-2 py-[5px] text-center text-[10px] font-medium ${
                      skill.level === "Advanced"
                        ? "bg-emerald-50 text-emerald-500"
                        : "bg-amber-50 text-amber-500"
                    }`}
                  >
                    {skill.level}
                  </span>

                  {/* Arrow */}
                  <span className="text-[18px] text-gray-500">
                    ›
                  </span>

                </div>

              ))}

            </div>
          );
        })}

      </div>
    </section>
  );
}