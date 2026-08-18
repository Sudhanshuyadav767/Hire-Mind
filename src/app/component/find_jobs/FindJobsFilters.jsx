"use client";

import { useState } from "react";
import { Sliders, ChevronDown, CheckSquare, Square, Search } from "lucide-react";

export default function FindJobsFilters({
  activeJobTypes,
  onToggleJobType,
  activeExperienceLevels,
  onToggleExperienceLevel,
  activeLocations,
  onToggleLocation,
  searchLocText,
  onSearchLocTextChange,
  onReset
}) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const isJobTypeChecked = (type) => activeJobTypes.includes(type);
  const isExpChecked = (exp) => activeExperienceLevels.includes(exp);
  const isLocChecked = (loc) => activeLocations.includes(loc);

  return (
    <div className="w-full">
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        className="lg:hidden flex items-center justify-between w-full bg-white border border-[#cbd5e1] rounded-2xl px-4 py-3 text-xs font-bold text-[#101014] cursor-pointer shadow-2xs mb-2"
      >
        <div className="flex items-center gap-2">
          <Sliders size={14} className="text-[#433be2]" />
          <span>Filters & Refinements</span>
        </div>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${isMobileFiltersOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Main Filters Container */}
      <div className={`lg:block bg-white border border-[#cbd5e1] rounded-2xl p-5 shadow-sm space-y-5 ${
        isMobileFiltersOpen ? "block animate-fade-in" : "hidden"
      }`}>
        
        {/* Title */}
        <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
          <h3 className="text-sm font-semibold text-[#101014] flex items-center gap-2">
            <Sliders size={16} className="text-[#433be2]" />
            <span>Filters</span>
          </h3>
          <button 
            onClick={onReset}
            className="text-xs font-semibold text-[#433be2] hover:text-[#3129c8] hover:underline cursor-pointer"
          >
            Reset All
          </button>
        </div>

        {/* 1. Job Type */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-[#334155]">Job Type</h4>
            <ChevronDown size={14} className="text-[#64748b] cursor-pointer" />
          </div>
          <div className="space-y-2">
            {["All Jobs Type", "Full Time", "Part Time", "Remote", "Internship", "Freelance"].map((type) => {
              const checked = isJobTypeChecked(type);
              return (
                <label 
                  key={type} 
                  className="flex items-center gap-2.5 text-xs text-[#475569] font-semibold cursor-pointer select-none hover:text-[#101014] transition"
                >
                  <input 
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleJobType(type)}
                    className="hidden"
                  />
                  {checked ? (
                    <CheckSquare size={16} className="text-[#433be2] fill-[#eef1ff]" />
                  ) : (
                    <Square size={16} className="text-[#cbd5e1] hover:border-[#94a3b8] transition rounded" />
                  )}
                  <span>{type}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 2. Experience Level */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-[#334155]">Experience Level</h4>
            <ChevronDown size={14} className="text-[#64748b] cursor-pointer" />
          </div>
          <div className="space-y-2">
            {[
              { label: "Fresher(0-1Yr)", count: 1234 },
              { label: "1-3 Years", count: 2345 },
              { label: "3-5 Years", count: 1254 },
              { label: "5-10 Years", count: 1204 },
              { label: "10+ Years", count: 102 }
            ].map((exp) => {
              const checked = isExpChecked(exp.label);
              return (
                <label 
                  key={exp.label} 
                  className="flex items-center justify-between text-xs text-[#475569] font-semibold cursor-pointer select-none hover:text-[#101014] transition"
                >
                  <div className="flex items-center gap-2.5">
                    <input 
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleExperienceLevel(exp.label)}
                      className="hidden"
                    />
                    {checked ? (
                      <CheckSquare size={16} className="text-[#433be2] fill-[#eef1ff]" />
                    ) : (
                      <Square size={16} className="text-[#cbd5e1] hover:border-[#94a3b8] transition rounded" />
                    )}
                    <span>{exp.label}</span>
                  </div>
                  <span className="text-[#94a3b8] text-[10px]">({exp.count})</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 3. Salary Range */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-[#334155]">Salary Range</h4>
            <ChevronDown size={14} className="text-[#64748b] cursor-pointer" />
          </div>
          
          {/* Styled dual handle range slider track */}
          <div className="pt-2 px-1 select-none">
            <div className="relative h-1.5 w-full bg-[#cbd5e1] rounded-full">
              <div className="absolute left-0 right-0 h-full bg-[#433be2] rounded-full" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white bg-[#433be2] shadow-sm cursor-pointer" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white bg-[#433be2] shadow-sm cursor-pointer" />
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-2 pt-2 select-none">
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-center text-xs font-semibold text-[#475569]">
              ₹0
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-center text-xs font-semibold text-[#475569]">
              ₹50,00,000+
            </div>
          </div>
        </div>

        {/* 4. Location */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-[#334155]">Location</h4>
            <ChevronDown size={14} className="text-[#64748b] cursor-pointer" />
          </div>

          {/* Location search box */}
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search Location"
              value={searchLocText}
              onChange={(e) => onSearchLocTextChange(e.target.value)}
              className="w-full bg-transparent text-xs text-[#1e293b] outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-2">
            {[
              { label: "Bangalore", count: 1234 },
              { label: "Mumbai", count: 2345 },
              { label: "Delhi", count: 1254 },
              { label: "Pune", count: 1204 },
              { label: "Hyderabad", count: 102 }
            ].map((loc) => {
              const checked = isLocChecked(loc.label);
              return (
                <label 
                  key={loc.label} 
                  className="flex items-center justify-between text-xs text-[#475569] font-semibold cursor-pointer select-none hover:text-[#101014] transition"
                >
                  <div className="flex items-center gap-2.5">
                    <input 
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleLocation(loc.label)}
                      className="hidden"
                    />
                    {checked ? (
                      <CheckSquare size={16} className="text-[#433be2] fill-[#eef1ff]" />
                    ) : (
                      <Square size={16} className="text-[#cbd5e1] hover:border-[#94a3b8] transition rounded" />
                    )}
                    <span>{loc.label}</span>
                  </div>
                  <span className="text-[#94a3b8] text-[10px]">({loc.count})</span>
                </label>
              );
            })}
          </div>
          <button type="button" className="text-[10px] font-semibold text-[#433be2] hover:text-[#3129c8] mt-1 flex items-center cursor-pointer">
            + Show More
          </button>
        </div>

      </div>
    </div>
  );
}
