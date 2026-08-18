"use client";

import { Play, Clock, Folder, CheckSquare } from "lucide-react";

export default function PlayerSidebarProgress({ lessonsCompletedTotal, progressPercentage }) {
  return (
    <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Title & Percent */}
      <div className="flex items-center justify-between text-sm font-medium">
        <h3 className="text-[#101014]">Course Progress</h3>
        <span className="text-[#433be2]">{progressPercentage}% Complete</span>
      </div>

      {/* Progress track */}
      <div className="h-2 w-full bg-gray-100 border border-gray-50 rounded-full overflow-hidden">
        <div className="h-full bg-[#433be2] rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
      </div>

      {/* Grid of completed counts */}
      <div className="grid grid-cols-2 gap-2 text-center text-xs">
        {/* Box 1 */}
        <div className="bg-[#f8fafc] border border-gray-150 rounded-xl p-3 flex flex-col items-center">
          <Play size={16} className="text-[#433be2] mb-1.5" />
          <b className="text-sm font-medium text-[#334155]">{lessonsCompletedTotal.toString().padStart(2, "0")}</b>
          <span className="text-[10px] font-medium text-[#64748b] mt-0.5">Lessons Done</span>
        </div>
        
        {/* Box 2 */}
        <div className="bg-[#f8fafc] border border-gray-150 rounded-xl p-3 flex flex-col items-center">
          <CheckSquare size={16} className="text-[#433be2] mb-1.5" />
          <b className="text-sm font-medium text-[#334155]">04</b>
          <span className="text-[10px] font-medium text-[#64748b] mt-0.5">Quizzes Done</span>
        </div>
        
        {/* Box 3 */}
        <div className="bg-[#f8fafc] border border-gray-150 rounded-xl p-3 flex flex-col items-center">
          <Folder size={16} className="text-[#433be2] mb-1.5" />
          <b className="text-sm font-medium text-[#334155]">01</b>
          <span className="text-[10px] font-medium text-[#64748b] mt-0.5">Project Done</span>
        </div>
        
        {/* Box 4 */}
        <div className="bg-[#f8fafc] border border-gray-150 rounded-xl p-3 flex flex-col items-center">
          <Clock size={16} className="text-[#433be2] mb-1.5" />
          <b className="text-sm font-medium text-[#334155]">12</b>
          <span className="text-[10px] font-medium text-[#64748b] mt-0.5">Hours Learned</span>
        </div>
      </div>

    </div>
  );
}
