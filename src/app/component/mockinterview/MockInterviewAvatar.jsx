"use client";

import React from 'react';

/**
 * MockInterviewAvatar Component
 * Animated AI Bot Avatar representation for the mock interview screen.
 */
export default function MockInterviewAvatar() {
  return (
    <div className="w-32 h-32 rounded-full bg-[#e9e8ff] flex items-center justify-center mb-5 shadow-sm border border-indigo-100">
      <div className="relative">
        <div className="w-24 h-14 rounded-3xl bg-[#24235c] flex items-center justify-center gap-5">
          <span className="text-cyan-400 text-xl animate-pulse">⌒</span>
          <span className="text-cyan-400 text-xl animate-pulse">⌒</span>
        </div>

        <div className="absolute -left-3 top-4 w-3 h-8 bg-[#5654d9] rounded-full" />
        <div className="absolute -right-3 top-4 w-3 h-8 bg-[#5654d9] rounded-full" />
        <div className="absolute -top-5 left-3 w-18 h-7 border-4 border-[#5654d9] border-b-0 rounded-t-full" />
        <div className="absolute -bottom-7 left-10 w-6 h-2 rounded-full bg-[#292857]" />
      </div>
    </div>
  );
}
