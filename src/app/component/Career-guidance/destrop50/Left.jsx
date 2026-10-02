"use client";

import { useState } from "react";

export default function LeftSidebar() {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [levelOpen, setLevelOpen] = useState(true);
  const [durationOpen, setDurationOpen] = useState(true);
  const [providerOpen, setProviderOpen] = useState(true);

  return (
    <aside className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:w-[280px] lg:shrink-0">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">
          Filter Courses
        </h2>

        <button className="text-sm font-semibold text-indigo-600">
          Clear All
        </button>
      </div>

      {/* Skill Category */}
      <div className="border-t border-gray-200 py-5">

        <button
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="mb-4 flex w-full items-center justify-between"
        >
          <span className="font-semibold text-gray-800">
            Skill Category
          </span>

          <span>{categoryOpen ? "⌃" : "⌄"}</span>
        </button>

        {categoryOpen && (
          <div className="space-y-3">

            <CheckBox text="All Categories" checked />

            <CheckBox text="Artificial Intelligence" />
            <CheckBox text="Machine Learning" />
            <CheckBox text="NLP" />
            <CheckBox text="Gen AI" />

            <button className="text-sm font-semibold text-indigo-600">
              + Show More
            </button>

          </div>
        )}
      </div>

      {/* Level */}
      <div className="border-t border-gray-200 py-5">

        <button
          onClick={() => setLevelOpen(!levelOpen)}
          className="mb-4 flex w-full items-center justify-between"
        >
          <span className="font-semibold text-gray-800">
            Level
          </span>

          <span>{levelOpen ? "⌃" : "⌄"}</span>
        </button>

        {levelOpen && (
          <div className="space-y-3">
            <CheckBox text="Beginner" checked />
            <CheckBox text="Intermediate" checked />
            <CheckBox text="Advanced" checked />
          </div>
        )}
      </div>

      {/* Duration */}
      <div className="border-t border-gray-200 py-5">

        <button
          onClick={() => setDurationOpen(!durationOpen)}
          className="mb-4 flex w-full items-center justify-between"
        >
          <span className="font-semibold text-gray-800">
            Duration
          </span>

          <span>{durationOpen ? "⌃" : "⌄"}</span>
        </button>

        {durationOpen && (
          <div className="space-y-3">

            <CheckBox text="All Duration" checked />
            <CheckBox text="5-10 Hours" />
            <CheckBox text="10-20 Hours" />
            <CheckBox text="20-30 Hours" />

            <button className="text-sm font-semibold text-indigo-600">
              + Show More
            </button>

          </div>
        )}
      </div>

      {/* Provider */}
      <div className="border-t border-gray-200 py-5">

        <button
          onClick={() => setProviderOpen(!providerOpen)}
          className="mb-4 flex w-full items-center justify-between"
        >
          <span className="font-semibold text-gray-800">
            Provider
          </span>

          <span>{providerOpen ? "⌃" : "⌄"}</span>
        </button>

        {providerOpen && (
          <div className="space-y-3">

            <CheckBox text="Coursera" />
            <CheckBox text="Udemy" />
            <CheckBox text="Google" />
            <CheckBox text="IBM" />
            <CheckBox text="Microsoft" />
            <CheckBox text="Course" />
            <CheckBox text="Specialization" />
            <CheckBox text="Professional Certificate" />

            <button className="text-sm font-semibold text-indigo-600">
              + Show More
            </button>

          </div>
        )}
      </div>

      {/* Apply */}
      <button className="w-full rounded-lg border-2 border-indigo-400 bg-indigo-50 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white">
        Apply Filters
      </button>

    </aside>
  );
}


/* Checkbox Component */
function CheckBox({ text, checked = false }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">

      <input
        type="checkbox"
        defaultChecked={checked}
        className="h-5 w-5 accent-indigo-600"
      />

      <span>{text}</span>

    </label>
  );
}