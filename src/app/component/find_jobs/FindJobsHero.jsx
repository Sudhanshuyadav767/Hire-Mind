"use client";

import { Search, MapPin, Briefcase, Sparkles } from "lucide-react";

const popularSearches = ["Web Development", "App Development", "UI/UX Designer", "Product Manager"];

export default function FindJobsHero({
  searchQuery,
  onSearchQueryChange,
  searchLocation,
  onSearchLocationChange,
  category,
  onCategoryChange,
  onSearchTrigger
}) {
  
  const handlePopularClick = (text, e) => {
    e.preventDefault();
    onSearchQueryChange(text);
    // Trigger search instantly
    setTimeout(() => {
      onSearchTrigger();
    }, 50);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearchTrigger();
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#e3e5fc] to-[#ebedff] px-4 py-8 lg:px-8 shadow-sm">
      <div className="mx-auto max-w-7xl">
        
        {/* Top AI Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#433be2]/10 px-3.5 py-1 text-xs font-semibold text-[#433be2] mb-3 select-none">
          <Sparkles size={12} className="fill-[#433be2]/10" />
          <span>AI-Powered Job Portal</span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-3xl font-semibold text-[#101014] sm:text-4xl tracking-tight select-none">
          Find Jobs
        </h1>
        <p className="mt-1.5 text-sm font-semibold text-[#5e637d] max-w-lg select-none">
          Discover the best job opportunities and build your dream career.
        </p>

        {/* Search Panel */}
        <div className="mt-6 bg-white border border-[#cbd5e1] rounded-2xl p-2.5 shadow-sm max-w-4xl flex flex-col md:flex-row items-stretch md:items-center gap-3">
          
          {/* Input 1: Job Title */}
          <div className="flex flex-1 items-center gap-2 px-3 py-1.5 border-b md:border-b-0 md:border-r border-gray-200">
            <Search size={18} className="text-[#94a3b8]" />
            <input 
              type="text" 
              placeholder="Job title or company"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full bg-transparent text-sm text-[#1e293b] outline-none placeholder:text-[#94a3b8]"
            />
          </div>

          {/* Input 2: Location */}
          <div className="flex flex-1 items-center gap-2 px-3 py-1.5 border-b md:border-b-0 md:border-r border-gray-200">
            <MapPin size={18} className="text-[#94a3b8]" />
            <input 
              type="text" 
              placeholder="Location"
              value={searchLocation}
              onChange={(e) => onSearchLocationChange(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full bg-transparent text-sm text-[#1e293b] outline-none placeholder:text-[#94a3b8]"
            />
          </div>

          {/* Select 3: Categories */}
          <div className="flex flex-1 items-center gap-2 px-3 py-1.5">
            <Briefcase size={18} className="text-[#94a3b8]" />
            <select 
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full bg-transparent text-sm text-[#475569] font-semibold outline-none cursor-pointer"
            >
              <option>All Categories</option>
              <option>Web Development</option>
              <option>Data Science</option>
              <option>Product Design</option>
              <option>Marketing</option>
            </select>
          </div>

          {/* Search Button */}
          <button 
            onClick={onSearchTrigger}
            className="rounded-xl bg-[#433be2] hover:bg-[#3129c8] px-6 py-3 text-sm font-semibold text-white transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Search size={15} />
            <span>Search Jobs</span>
          </button>
        </div>

        {/* Popular Searches */}
        <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs text-[#64748b] select-none">
          <span className="font-semibold text-[#334155] mr-1">Popular Searches:</span>
          {popularSearches.map((text) => (
            <button
              key={text}
              onClick={(e) => handlePopularClick(text, e)}
              className="rounded-full border border-[#cbd5e1] hover:border-[#94a3b8] bg-white px-4 py-1.5 text-xs text-[#475569] font-semibold transition hover:bg-[#f8fafc] cursor-pointer"
            >
              {text}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
