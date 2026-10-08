"use client";

import { useState } from "react";
import {
  jobTypes,
  experienceLevels,
  locations,
  salaryRange,
} from "@/Data/data4";

export default function JobFilters() {
  const [selectedJobTypes, setSelectedJobTypes] = useState(["all"]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [minSalary, setMinSalary] = useState(salaryRange.min);
  const [maxSalary, setMaxSalary] = useState(salaryRange.max);

  const [locationSearch, setLocationSearch] = useState("");
  const [showMoreLocations, setShowMoreLocations] = useState(false);

  const [openSections, setOpenSections] = useState({
    jobType: true,
    experience: true,
    salary: true,
    location: true,
  });

  // Section open/close
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Job Type
  const handleJobType = (id) => {
    if (id === "all") {
      setSelectedJobTypes(["all"]);
      return;
    }

    setSelectedJobTypes((prev) => {
      let updated = prev.filter((item) => item !== "all");

      if (updated.includes(id)) {
        updated = updated.filter((item) => item !== id);
      } else {
        updated.push(id);
      }

      return updated;
    });
  };

  // Experience
  const handleExperience = (id) => {
    setSelectedExperience((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // Location
  const handleLocation = (id) => {
    setSelectedLocations((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // Clear all
  const clearAll = () => {
    setSelectedJobTypes(["all"]);
    setSelectedExperience([]);
    setSelectedLocations([]);
    setMinSalary(salaryRange.min);
    setMaxSalary(salaryRange.max);
    setLocationSearch("");
  };

  const filteredLocations = locations.filter((location) =>
    location.label.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const visibleLocations = showMoreLocations
    ? filteredLocations
    : filteredLocations.slice(0, 5);

  return (
    <div className="w-full max-w-[340px] rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Filters Jobs
        </h2>

        <button
          onClick={clearAll}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          Clear All
        </button>
      </div>

      {/* ================= JOB TYPE ================= */}
      <div className="py-5 border-b border-gray-200">

        <button
          onClick={() => toggleSection("jobType")}
          className="flex w-full items-center justify-between"
        >
          <h3 className="text-base font-semibold text-gray-900">
            Job Type
          </h3>

          <span
            className={`text-xl transition-transform ${
              openSections.jobType ? "rotate-180" : ""
            }`}
          >
            ⌃
          </span>
        </button>

        {openSections.jobType && (
          <div className="mt-5 space-y-3">

            {jobTypes.map((job) => (
              <label
                key={job.id}
                className="flex cursor-pointer items-center gap-4"
              >
                <input
                  type="checkbox"
                  checked={selectedJobTypes.includes(job.id)}
                  onChange={() => handleJobType(job.id)}
                  className="peer hidden"
                />

                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-md border transition
                  ${
                    selectedJobTypes.includes(job.id)
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {selectedJobTypes.includes(job.id) && "✓"}
                </span>

                <span
                  className={`text-base ${
                    selectedJobTypes.includes(job.id)
                      ? "text-gray-600"
                      : "text-gray-500"
                  }`}
                >
                  {job.label}
                </span>
              </label>
            ))}

          </div>
        )}
      </div>

      {/* ================= EXPERIENCE ================= */}
      <div className="py-5 border-b border-gray-200">

        <button
          onClick={() => toggleSection("experience")}
          className="flex w-full items-center justify-between"
        >
          <h3 className="text-base font-semibold text-gray-900">
            Experience Level
          </h3>

          <span
            className={`text-xl transition-transform ${
              openSections.experience ? "rotate-180" : ""
            }`}
          >
            ⌃
          </span>
        </button>

        {openSections.experience && (
          <div className="mt-5 space-y-4">

            {experienceLevels.map((experience) => (
              <label
                key={experience.id}
                className="flex cursor-pointer items-center gap-4"
              >
                <input
                  type="checkbox"
                  checked={selectedExperience.includes(experience.id)}
                  onChange={() => handleExperience(experience.id)}
                  className="peer hidden"
                />

                <span
                  className={`h-5 w-5 rounded-md border ${
                    selectedExperience.includes(experience.id)
                      ? "border-indigo-600 bg-indigo-600"
                      : "border-gray-300 bg-white"
                  }`}
                />

                <span className="text-base text-gray-500">
                  {experience.label} ({experience.count})
                </span>
              </label>
            ))}

          </div>
        )}
      </div>

      {/* ================= SALARY ================= */}
      <div className="py-5 border-b border-gray-200">

        <button
          onClick={() => toggleSection("salary")}
          className="flex w-full items-center justify-between"
        >
          <h3 className="text-base font-semibold text-gray-900">
            Salary Range
          </h3>
        </button>

        {openSections.salary && (
          <div className="mt-6">

            {/* Slider */}
            <div className="relative">

              <input
                type="range"
                min={salaryRange.min}
                max={salaryRange.max}
                value={minSalary}
                onChange={(e) =>
                  setMinSalary(
                    Math.min(Number(e.target.value), maxSalary)
                  )
                }
                className="absolute w-full accent-indigo-600"
              />

              <input
                type="range"
                min={salaryRange.min}
                max={salaryRange.max}
                value={maxSalary}
                onChange={(e) =>
                  setMaxSalary(
                    Math.max(Number(e.target.value), minSalary)
                  )
                }
                className="w-full accent-indigo-600"
              />

            </div>

            {/* Salary Inputs */}
            <div className="mt-8 flex gap-5">

              <div className="flex-1 rounded-lg border border-gray-200 px-4 py-3">
                <span className="text-gray-700">
                  ₹{minSalary.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex-1 rounded-lg border border-gray-200 px-4 py-3">
                <span className="text-gray-700">
                  ₹{maxSalary.toLocaleString("en-IN")}+
                </span>
              </div>

            </div>

          </div>
        )}
      </div>

      {/* ================= LOCATION ================= */}
      <div className="pt-5">

        <button
          onClick={() => toggleSection("location")}
          className="flex w-full items-center justify-between"
        >
          <h3 className="text-base font-semibold text-gray-900">
            Location
          </h3>

          <span
            className={`text-xl transition-transform ${
              openSections.location ? "rotate-180" : ""
            }`}
          >
            ⌃
          </span>
        </button>

        {openSections.location && (
          <div className="mt-5">

            {/* Search */}
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 shadow-sm">

              <span className="text-xl text-gray-400">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search Location"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />

            </div>

            {/* Locations */}
            <div className="mt-5 space-y-4">

              {visibleLocations.map((location) => (
                <label
                  key={location.id}
                  className="flex cursor-pointer items-center gap-4"
                >

                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(location.id)}
                    onChange={() => handleLocation(location.id)}
                    className="peer hidden"
                  />

                  <span
                    className={`h-5 w-5 rounded-md border ${
                      selectedLocations.includes(location.id)
                        ? "border-indigo-600 bg-indigo-600"
                        : "border-gray-300 bg-white"
                    }`}
                  />

                  <span className="text-base text-gray-500">
                    {location.label} ({location.count})
                  </span>

                </label>
              ))}

            </div>

            {/* Show More */}
            {filteredLocations.length > 5 && (
              <button
                onClick={() =>
                  setShowMoreLocations(!showMoreLocations)
                }
                className="mt-5 flex items-center gap-2 pl-12 font-medium text-indigo-600"
              >
                {showMoreLocations ? "Show Less" : "Show More"}

                <span
                  className={`transition-transform ${
                    showMoreLocations ? "rotate-180" : ""
                  }`}
                >
                 ⌄
                </span>
              </button>
            )}

          </div>
        )}

      </div>

    </div>
  );
}