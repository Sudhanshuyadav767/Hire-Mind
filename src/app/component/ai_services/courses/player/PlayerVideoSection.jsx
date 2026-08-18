"use client";

import { 
  Play, 
  Pause,
  Volume2, 
  Settings, 
  Maximize, 
  ArrowLeft, 
  ArrowRight, 
  Lightbulb, 
  Code
} from "lucide-react";

export default function PlayerVideoSection({
  activeLesson,
  isPlaying,
  currentTime,
  onPlayPause,
  onNext,
  onPrev,
  isFirstLesson,
  isLastLesson
}) {
  
  // Format seconds to MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-5">
      
      {/* Video Viewport Container (16:9 Aspect Ratio) */}
      <div className="relative aspect-video w-full bg-gradient-to-br from-[#020725] to-[#0c1033] text-white rounded-2xl overflow-hidden shadow-md flex flex-col justify-between p-3 sm:p-4 group">
        
        {/* Grid pattern overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_28px] opacity-25 animate-pulse" />
        
        {/* Top bar info */}
        <div className="relative z-10 self-start text-[8px] sm:text-[10px] uppercase font-medium tracking-widest text-slate-400 select-none">
          Lesson {activeLesson.id}: {activeLesson.title.replace(/^\d+\.\s*/, "")}
        </div>

        {/* Center: Cover art and Play button */}
        <div className={`relative z-10 flex flex-col items-center justify-center flex-1 my-2 transition-all duration-500 ${
          isPlaying ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
        }`}>
          {/* Python Graphic */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2 sm:mb-4 select-none">
            <span className="text-xl sm:text-4xl font-medium tracking-wide drop-shadow-md text-white">Python</span>
            <span className="text-xs sm:text-2xl text-[#ffa000] font-medium uppercase tracking-widest drop-shadow-md">for Data Science</span>
          </div>

          {/* Large circular play button */}
          <button 
            onClick={onPlayPause}
            className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-white text-black flex items-center justify-center shadow-lg transition hover:scale-105 cursor-pointer"
          >
            <Play size={20} className="fill-black ml-0.5 sm:ml-1 text-black" />
          </button>
        </div>

        {/* Bottom controls panel */}
        <div className="relative z-10 w-full bg-black/60 backdrop-blur-xs border border-white/10 rounded-xl p-2 sm:p-3 flex items-center justify-between text-[10px] sm:text-xs text-slate-200">
          
          {/* Left Controls */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            <button 
              onClick={onPlayPause}
              className="hover:text-white transition cursor-pointer flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause size={13} className="fill-slate-200" />
              ) : (
                <Play size={13} className="fill-slate-200" />
              )}
            </button>
            <button className="hover:text-white transition cursor-pointer">
              <Volume2 size={13} />
            </button>
            <span className="font-medium select-none text-[9px] sm:text-xs">
              {formatTime(currentTime)} / {activeLesson.duration}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hover:text-white transition cursor-pointer font-medium select-none text-[9px] sm:text-xs">
              1.0x
            </button>
            <button className="hover:text-white transition cursor-pointer font-medium border border-slate-400/55 px-1 py-0.5 rounded text-[8px] sm:text-[10px] select-none">
              CC
            </button>
            <button className="hover:text-white transition cursor-pointer">
              <Settings size={13} />
            </button>
            <button className="hover:text-white transition cursor-pointer">
              <Maximize size={13} />
            </button>
          </div>

        </div>

      </div>

      {/* Lesson details & Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2 border-b border-[#cbd5e1]/40">
        <div className="space-y-0.5 w-full sm:w-auto">
          <h2 className="text-lg sm:text-xl font-medium text-[#101014] leading-snug">
            {activeLesson.title.replace(/^\d+\.\s*/, "")}
          </h2>
          <p className="text-[11px] sm:text-xs font-medium text-[#5e637d] leading-relaxed">
            {activeLesson.subtext}
          </p>
        </div>

        <div className="flex gap-2 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
          <button 
            type="button" 
            onClick={onPrev}
            disabled={isFirstLesson}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1 rounded-xl border border-[#cbd5e1] bg-white text-[#475569] px-4.5 py-2.5 text-xs font-medium transition shadow-2xs ${
              isFirstLesson 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:border-[#94a3b8] hover:bg-[#f8fafc] cursor-pointer"
            }`}
          >
            <ArrowLeft size={14} />
            <span>Previous</span>
          </button>
          <button 
            type="button" 
            onClick={onNext}
            disabled={isLastLesson}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1 rounded-xl text-white px-4.5 py-2.5 text-xs font-medium transition shadow-sm ${
              isLastLesson 
                ? "bg-slate-300 cursor-not-allowed text-slate-500" 
                : "bg-[#433be2] hover:bg-[#3129c8] cursor-pointer"
            }`}
          >
            <span>Next Lesson</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Learning Tip Banner */}
      <div className="rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-2.5 w-full sm:w-auto">
          <Lightbulb size={20} className="text-[#15803d] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-medium text-[#14532d]">Learning Tip</h4>
            <p className="text-[11px] font-medium text-[#166534] leading-snug">
              Try writing and running code in the editor to reinforce your learning.
            </p>
          </div>
        </div>
        
        <button 
          type="button" 
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#bbf7d0] bg-white hover:bg-[#e8fbf0] text-[#15803d] px-4 py-2.5 text-xs font-medium transition shadow-3xs cursor-pointer shrink-0"
        >
          <Code size={13} />
          <span>Open Code Editor</span>
        </button>
      </div>

    </div>
  );
}
