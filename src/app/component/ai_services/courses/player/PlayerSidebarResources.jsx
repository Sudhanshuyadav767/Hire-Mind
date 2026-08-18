"use client";

import { Download, FileText, FolderArchive } from "lucide-react";

const resources = [
  { title: "Course Slides", format: "PDF", size: "12.4MB", type: "pdf" },
  { title: "Cheat Sheet", format: "PDF", size: "1.2MB", type: "pdf" },
  { title: "Python Basics Guide", format: "PDF", size: "3.6MB", type: "pdf" },
  { title: "Practice Datasets", format: "ZIP", size: "45.8MB", type: "zip" }
];

export default function PlayerSidebarResources() {
  return (
    <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-medium border-b border-[#f1f5f9] pb-3">
        <h3 className="text-[#101014] text-sm">Resources</h3>
        <button className="text-[#433be2] hover:text-[#3129c8] hover:underline cursor-pointer">
          Download All
        </button>
      </div>

      {/* Resources list */}
      <div className="space-y-3">
        {resources.map((res) => {
          return (
            <div 
              key={res.title}
              className="flex items-center justify-between p-2 rounded-xl border border-gray-100 hover:border-[#433be2]/50 transition bg-[#f8fafc] group"
            >
              <div className="flex items-center gap-2.5">
                {/* File Icon Container */}
                <div className={`p-2 rounded-lg shrink-0 ${
                  res.type === "pdf" ? "bg-red-50 text-red-500" : "bg-purple-50 text-purple-500"
                }`}>
                  {res.type === "pdf" ? <FileText size={16} /> : <FolderArchive size={16} />}
                </div>
                
                {/* Details */}
                <div className="space-y-0.5">
                  <h4 className="text-xs font-medium text-[#334155] leading-snug line-clamp-1">
                    {res.title}
                  </h4>
                  <p className="text-[10px] font-medium text-[#94a3b8] uppercase">
                    {res.format} <span className="px-0.5">•</span> {res.size}
                  </p>
                </div>
              </div>

              {/* Download Icon */}
              <button 
                type="button" 
                className="p-1.5 rounded-lg hover:bg-[#eef1ff] hover:text-[#433be2] text-[#64748b] transition cursor-pointer"
              >
                <Download size={14} />
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}
