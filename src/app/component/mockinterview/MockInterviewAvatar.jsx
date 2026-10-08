"use client";

import React from 'react';

/**
 * MockInterviewAvatar Component
 * Animated AI Bot Avatar with glowing pulse rings, reactive voice equalizer, and HireMind indigo styling.
 */
export default function MockInterviewAvatar({ isSpeaking = false }) {
  return (
    <div className="relative flex items-center justify-center py-4 select-none">
      {/* Outer Pulse Halo */}
      <div className={`absolute w-40 h-40 rounded-full bg-indigo-500/10 ${isSpeaking ? 'animate-ping' : 'animate-pulse'}`} />
      <div className="absolute w-36 h-36 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-md" />

      {/* Main Avatar Container */}
      <div className="relative w-32 h-32 rounded-full bg-gradient-to-b from-[#2D24D0] to-[#1e179b] p-1 shadow-xl flex items-center justify-center border-2 border-indigo-300/40">
        <div className="w-full h-full rounded-full bg-[#121139] flex items-center justify-center relative overflow-hidden">
          
          {/* Background Grid Accent */}
          <div className="absolute inset-0 bg-[radial-gradient(#463fe6_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />

          {/* AI Face Structure */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Robot Head Visor */}
            <div className="w-22 h-13 rounded-2xl bg-[#0b0a24] border-2 border-[#463fe6] flex items-center justify-center shadow-inner relative">
              {/* Glowing Eyes */}
              <div className="flex items-center justify-center gap-4">
                <span className={`w-3 h-3 rounded-full transition-all duration-300 ${isSpeaking ? 'bg-emerald-400 shadow-[0_0_10px_#10b981] animate-bounce' : 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'}`} />
                <span className={`w-3 h-3 rounded-full transition-all duration-300 ${isSpeaking ? 'bg-emerald-400 shadow-[0_0_10px_#10b981] animate-bounce [animation-delay:0.2s]' : 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'}`} />
              </div>

              {/* Headphones Cups */}
              <div className="absolute -left-2.5 top-2.5 w-3 h-8 bg-[#463fe6] rounded-l-full shadow-sm" />
              <div className="absolute -right-2.5 top-2.5 w-3 h-8 bg-[#463fe6] rounded-r-full shadow-sm" />
            </div>

            {/* Vocal Equalizer Wave Bar */}
            <div className="flex items-center gap-1 mt-2.5">
              <span className={`w-1 bg-emerald-400 rounded-full transition-all duration-150 ${isSpeaking ? 'h-4 animate-bounce' : 'h-1.5'}`} />
              <span className={`w-1 bg-cyan-400 rounded-full transition-all duration-150 ${isSpeaking ? 'h-6 animate-bounce [animation-delay:0.1s]' : 'h-2.5'}`} />
              <span className={`w-1 bg-indigo-400 rounded-full transition-all duration-150 ${isSpeaking ? 'h-3 animate-bounce [animation-delay:0.2s]' : 'h-1.5'}`} />
              <span className={`w-1 bg-cyan-400 rounded-full transition-all duration-150 ${isSpeaking ? 'h-5 animate-bounce [animation-delay:0.3s]' : 'h-2'}`} />
            </div>
          </div>

          {/* Floating Status Pill */}
          <div className="absolute bottom-1.5 bg-indigo-950/90 border border-indigo-400/30 text-[9px] font-mono text-indigo-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            {isSpeaking ? 'AI Speaking' : 'Ready'}
          </div>
        </div>
      </div>
    </div>
  );
}
