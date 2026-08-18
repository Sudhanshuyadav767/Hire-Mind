"use client";

import { Search, ChevronDown } from "lucide-react";

export default function GenerateSearchBar() {
  return (
    <section className="bg-white border-b border-[#e2e8f0] py-4 px-4 lg:px-8 shadow-sm">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search Container */}
        <div className="flex flex-1 items-center gap-2 rounded-full border border-[#cbd5e1] bg-white pl-4 pr-1 py-1 sm:max-w-[480px]">
          <Search size={18} className="text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search courses, skills, careers..."
            className="w-full bg-transparent text-sm text-[#1e293b] outline-none placeholder:text-[#94a3b8] py-1.5"
          />
          <button className="rounded-full bg-[#433be2] hover:bg-[#3129c8] px-5 py-2 text-sm font-semibold text-white transition flex items-center gap-1.5 cursor-pointer">
            <Search size={14} />
            <span>Search</span>
          </button>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 text-sm text-[#64748b] self-end md:self-auto">
          <span className="font-semibold text-[#475569]">Sort by:</span>
          <button 
            type="button" 
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#cbd5e1] bg-white px-4 py-2 text-xs font-semibold text-[#1e293b] shadow-xs hover:bg-[#f8fafc] cursor-pointer"
          >
            <span>Recommended</span>
            <ChevronDown size={14} className="text-gray-500" />
          </button>
        </div>

      </div>
    </section>
  );
}
