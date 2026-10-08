"use client";

import {
  topLocations,
  topHiringCompanies,
  inDemandSkills,
} from "@/Data/data5";

export default function JobMarketStats() {
  // Highest location opening
  const maxLocationOpenings = Math.max(
    ...topLocations.map((item) => item.openings)
  );

  // Format numbers
  const formatNumber = (number) => {
    return number.toLocaleString("en-IN");
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

      {/* ================================================= */}
      {/* TOP LOCATIONS */}
      {/* ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <h2 className="text-lg font-bold text-gray-900">
              Top Locations
            </h2>

            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[10px] text-gray-400">
              i
            </span>

          </div>

          <button className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600">

            <span>By Job Openings</span>

            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>

          </button>

        </div>


        {/* Locations */}
        <div className="space-y-6">

          {topLocations.map((location) => {

            const percentage =
              (location.openings / maxLocationOpenings) * 100;

            return (
              <div
                key={location.name}
                className="flex items-center gap-4"
              >

                {/* Name */}
                <div className="w-[110px] shrink-0 text-sm font-medium text-gray-700">
                  {location.name}
                </div>


                {/* Progress */}
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">

                  <div
                    className="h-full rounded-full bg-indigo-600"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>


                {/* Number */}
                <div className="w-12 text-right text-sm text-gray-500">
                  {formatNumber(location.openings)}
                </div>

              </div>
            );
          })}

        </div>


        {/* Button */}
        <button className="mt-7 flex w-full items-center justify-center gap-3 rounded-lg border border-indigo-500 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50">

          <span>View All Locations</span>

          <span className="text-lg">
            →
          </span>

        </button>

      </div>


      {/* ================================================= */}
      {/* TOP HIRING COMPANIES */}
      {/* ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <h2 className="text-lg font-bold text-gray-900">
              Top Hiring Companies
            </h2>

            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[10px] text-gray-400">
              i
            </span>

          </div>

          <button className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600">

            <span>By Job Openings</span>

            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>

          </button>

        </div>


        {/* Companies */}
        <div className="space-y-2">

          {topHiringCompanies.map((company) => (

            <div
              key={company.name}
              className="flex items-center justify-between"
            >

              {/* Company */}
              <div className="flex items-center gap-4">

                {/* Logo */}
                <div
                  className={`
                    flex h-8 w-8 items-center justify-center
                    rounded-md text-sm font-bold
                    ${company.logoType === "google"
                      ? "text-blue-600"
                      : ""
                    }
                    ${company.logoType === "microsoft"
                      ? "text-orange-500"
                      : ""
                    }
                    ${company.logoType === "amazon"
                      ? "text-gray-800"
                      : ""
                    }
                    ${company.logoType === "tcs"
                      ? "text-pink-500"
                      : ""
                    }
                    ${company.logoType === "accenture"
                      ? "text-purple-600"
                      : ""
                    }
                  `}
                >
                  {company.logo}
                </div>


                <span className="text-sm font-medium text-gray-700">
                  {company.name}
                </span>

              </div>


              {/* Openings */}
              <span className="text-sm font-medium text-gray-700">
                {formatNumber(company.openings)}
              </span>

            </div>

          ))}

        </div>


        {/* Button */}
        <button className="mt-7 flex w-full items-center justify-center gap-3 rounded-lg border border-indigo-500 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50">

          <span>View All Companies</span>

          <span className="text-lg">
            →
          </span>

        </button>

      </div>


      {/* ================================================= */}
      {/* IN-DEMAND SKILLS */}
      {/* ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <h2 className="text-lg font-bold text-gray-900">
              In-Demand Skills
            </h2>

            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[10px] text-gray-400">
              i
            </span>

          </div>


          <button className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600">

            <span>By Demand</span>

            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>

          </button>

        </div>


        {/* Skills */}
        <div className="space-y-4">

          {inDemandSkills.map((skill, index) => (

            <div
              key={skill.name}
              className="flex items-center justify-between"
            >

              {/* Skill */}
              <div className="flex items-center gap-2">

                <span className="text-sm font-medium text-gray-800">
                  {index + 1}.
                </span>

                <span className="text-sm font-medium text-gray-800">
                  {skill.name}
                </span>

              </div>


              {/* Demand */}
              <span className="text-sm font-semibold text-emerald-500">
                {skill.demand}%
              </span>

            </div>

          ))}

        </div>


        {/* Button */}
        <button className="mt-7 flex w-full items-center justify-center gap-3 rounded-lg border border-indigo-500 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50">

          <span>View All Skills</span>

          <span className="text-lg">
            →
          </span>

        </button>

      </div>

    </div>
  );
}