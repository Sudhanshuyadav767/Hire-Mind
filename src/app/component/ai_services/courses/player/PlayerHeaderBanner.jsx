"use client";

import { Heart, Share2, Star } from "lucide-react";

export default function PlayerHeaderBanner() {
  return (
    <section className="bg-gradient-to-b from-[#e3e5fc] to-[#ebedff] px-3 py-4 sm:px-4 sm:py-6 lg:px-8 shadow-sm font-poppins">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-4">
        
        {/* Left Side details */}
        <div className="space-y-2">
          {/* Breadcrumbs */}
          <p className="text-[10px] sm:text-xs text-[#5e637d] truncate">
            Home <span className="px-1.5">›</span> All Courses <span className="px-1.5">›</span> <b className="text-[#433be2] font-medium">Python for Data Science</b>
          </p>

          {/* Title and rating */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-3xl font-medium font-poppins text-[#101014] tracking-tight leading-snug">
              Python for Data Science
            </h1>
            <div className="flex items-center gap-1 bg-white border border-[#e2e8f0] px-2 py-1 rounded-xl text-[10px] sm:text-xs font-medium text-[#334155] shadow-2xs">
              <Star size={13} className="text-[#f59e0b] fill-[#f59e0b]" />
              <span>4.8</span>
              <span className="text-[#64748b] font-medium">(12.4K)</span>
            </div>
          </div>

          {/* Metadata */}
          <div className="text-[10px] sm:text-xs font-medium text-[#5e637d] flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Beginner Level</span>
            <span className="h-1 w-1 bg-[#5e637d] rounded-full"></span>
            <span>24 Hours</span>
            <span className="h-1 w-1 bg-[#5e637d] rounded-full"></span>
            <span>Coursera</span>
          </div>

          {/* Subtext */}
          <p className="text-[11px] sm:text-xs text-[#5e637d] font-medium leading-relaxed max-w-2xl">
            Learn Python programming from scratch and apply it to real-world data science problems. Includes NumPy, Pandas, Matplotlib and more.
          </p>
        </div>

        {/* Right Side Buttons (equal sizes on mobile) */}
        <div className="flex gap-2 shrink-0 md:mt-6 w-full md:w-auto">
          <button 
            type="button" 
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#cbd5e1] hover:border-[#433be2] bg-white text-[#433be2] hover:bg-[#f8fafc] px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs font-medium transition shadow-2xs cursor-pointer"
          >
            <Heart size={14} className="text-[#433be2]" />
            <span>Add to Wishlist</span>
          </button>
          
          <button 
            type="button" 
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#cbd5e1] hover:border-[#433be2] bg-white text-[#433be2] hover:bg-[#f8fafc] px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs font-medium transition shadow-2xs cursor-pointer"
          >
            <Share2 size={14} className="text-[#433be2]" />
            <span>Share</span>
          </button>
        </div>

      </div>
    </section>
  );
}
