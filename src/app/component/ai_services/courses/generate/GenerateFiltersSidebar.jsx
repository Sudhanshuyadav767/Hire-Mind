"use client";

import { useState } from "react";
import { Sliders, ChevronDown, CheckSquare, Square, Save } from "lucide-react";

const refineSections = [
  {
    id: "skillCategory",
    title: "Skill Category",
    options: ["Artificial Intelligence", "Machine Learning", "NLP", "Gen AI", "Python"],
    hasShowMore: true
  },
  {
    id: "level",
    title: "Level",
    options: ["Beginner", "Intermediate", "Advanced"],
    hasShowMore: false,
    defaultChecked: ["Intermediate"]
  },
  {
    id: "duration",
    title: "Duration",
    options: ["5-10 Hours", "10-20 Hours", "20-30 Hours", "30+ Hours"],
    hasShowMore: false
  },
  {
    id: "provider",
    title: "Provider",
    options: ["Coursera", "Udemy", "Google", "IBM", "Microsoft"],
    hasShowMore: true
  },
  {
    id: "type",
    title: "Type",
    options: ["Course", "Specialization", "Professional Certificate"],
    hasShowMore: true
  }
];

export default function GenerateFiltersSidebar() {
  const [selectedFilters, setSelectedFilters] = useState({
    level: ["Intermediate"] // default checked
  });

  const toggleFilter = (sectionId, option) => {
    setSelectedFilters(prev => {
      const section = prev[sectionId] || [];
      const updated = section.includes(option)
        ? section.filter(item => item !== option)
        : [...section, option];
      return { ...prev, [sectionId]: updated };
    });
  };

  const isChecked = (sectionId, option) => {
    return (selectedFilters[sectionId] || []).includes(option);
  };

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm space-y-5">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
        <h3 className="text-md font-semibold text-[#101014] flex items-center gap-2">
          <Sliders size={16} className="text-[#433be2]" />
          <span>Refine Results</span>
        </h3>
        <button 
          onClick={() => setSelectedFilters({})}
          className="text-xs font-semibold text-[#433be2] hover:text-[#3129c8] hover:underline cursor-pointer"
        >
          Reset All
        </button>
      </div>

      {/* Filter items */}
      <div className="space-y-4">
        {refineSections.map((section) => (
          <div key={section.id} className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-[#334155]">{section.title}</h4>
              <ChevronDown size={14} className="text-[#64748b] cursor-pointer" />
            </div>
            <div className="space-y-2">
              {section.options.map((option) => {
                const checked = isChecked(section.id, option);
                return (
                  <label 
                    key={option} 
                    className="flex items-center gap-2.5 text-xs text-[#475569] font-semibold cursor-pointer select-none hover:text-[#101014] transition"
                  >
                    <input 
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleFilter(section.id, option)}
                      className="hidden"
                    />
                    {checked ? (
                      <CheckSquare size={16} className="text-[#433be2] fill-[#eef1ff]" />
                    ) : (
                      <Square size={16} className="text-[#cbd5e1] hover:border-[#94a3b8] transition rounded" />
                    )}
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
            {section.hasShowMore && (
              <button type="button" className="text-[10px] font-semibold text-[#433be2] hover:text-[#3129c8] mt-1 flex items-center cursor-pointer">
                + Show More
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Save Plan Button */}
      <div className="border-t border-[#f1f5f9] pt-4">
        <button 
          type="button" 
          className="w-full py-2.5 rounded-xl border border-[#cbd5e1] hover:border-[#433be2] bg-white text-[#433be2] hover:bg-[#f8fafc] text-xs font-semibold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          <Save size={14} />
          <span>Save This Plan</span>
        </button>
      </div>
    </div>
  );
}
