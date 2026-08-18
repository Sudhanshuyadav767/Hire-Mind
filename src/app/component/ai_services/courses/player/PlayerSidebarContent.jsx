"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, PlayCircle, Circle } from "lucide-react";

export default function PlayerSidebarContent({ lessons, activeLessonId, onSelectLesson }) {
  const [expandedSection, setExpandedSection] = useState(1);

  const sections = [
    {
      id: 1,
      title: "Section 1: Python Basics",
      completedCount: `${lessons.filter(l => l.status === "completed").length} / ${lessons.length}`,
      lessons: lessons
    },
    { id: 2, title: "Section 2: Data Structures", completedCount: "0 / 5", lessons: [] },
    { id: 3, title: "Section 3: NumPy", completedCount: "0 / 7", lessons: [] },
    { id: 4, title: "Section 4: Pandas", completedCount: "0 / 5", lessons: [] },
    { id: 5, title: "Section 5: Data Visualization", completedCount: "0 / 6", lessons: [] },
    { id: 6, title: "Section 6: Final Project", completedCount: "0 / 3", lessons: [] }
  ];

  return (
    <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Title */}
      <h3 className="text-sm font-medium text-[#101014]">Course Content</h3>

      {/* Accordion Menu */}
      <div className="space-y-2">
        {sections.map((sec) => {
          const isExpanded = expandedSection === sec.id;
          return (
            <div key={sec.id} className="rounded-xl border border-gray-150 overflow-hidden bg-[#f8fafc]">
              
              {/* Header trigger */}
              <button 
                onClick={() => setExpandedSection(isExpanded ? null : sec.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-xs font-medium text-[#334155] cursor-pointer hover:bg-slate-100 transition"
              >
                <span>{sec.title}</span>
                <div className="flex items-center gap-2 text-[10px] text-[#64748b]">
                  <span>{sec.completedCount}</span>
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </button>

              {/* Collapsible Panel */}
              {isExpanded && sec.lessons.length > 0 && (
                <div className="bg-white border-t border-gray-150 p-2 space-y-1.5">
                  {sec.lessons.map((les) => {
                    const isSelected = activeLessonId === les.id;
                    return (
                      <button 
                        key={les.id} 
                        onClick={() => onSelectLesson(les.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[11px] font-medium transition cursor-pointer text-left ${
                          isSelected 
                            ? "bg-[#eef1ff] text-[#433be2] border-l-2 border-[#433be2]" 
                            : "text-[#475569] hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2 pr-4">
                          {les.status === "completed" ? (
                            <CheckCircle2 size={13} className="text-[#10b981] fill-[#e8fbf4] shrink-0" />
                          ) : isSelected ? (
                            <PlayCircle size={13} className="text-[#433be2] fill-[#eef1ff] shrink-0" />
                          ) : (
                            <Circle size={13} className="text-[#cbd5e1] shrink-0" />
                          )}
                          <span className="line-clamp-1">{les.title}</span>
                        </div>
                        <span className="text-[#94a3b8] font-medium shrink-0">{les.duration}</span>
                      </button>
                    );
                  })}
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Curriculum View */}
      <button 
        type="button" 
        className="w-full py-2.5 rounded-xl border border-[#cbd5e1] hover:border-[#433be2] bg-white text-[#433be2] hover:bg-[#f8fafc] text-xs font-medium transition shadow-3xs cursor-pointer"
      >
        View Full Curriculum
      </button>

    </div>
  );
}
