"use client";

import { BookOpen, FolderOpen, ClipboardList, MessageSquare, FileText, Award } from "lucide-react";

const playerTabs = [
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "resources", label: "Resources", icon: FolderOpen },
  { id: "assignments", label: "Assignments", icon: ClipboardList },
  { id: "discussions", label: "Discussions", icon: MessageSquare },
  { id: "notes", label: "Notes", icon: FileText },
  { id: "achievements", label: "Achievements", icon: Award }
];

export default function PlayerTabMenu({ activeMainTab, onMainTabChange }) {
  return (
    <section className="bg-white border-b border-[#cbd5e1]/40 shadow-xs py-1 px-3 sm:px-4 lg:px-8">
      {/* Scrollable Container with Hidden Scrollbars */}
      <div 
        className="mx-auto max-w-7xl flex items-center gap-0.5 sm:gap-1.5 overflow-x-auto whitespace-nowrap pr-3 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {playerTabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeMainTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onMainTabChange(tab.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs font-medium transition cursor-pointer relative shrink-0 ${
                isActive 
                  ? "text-[#433be2]" 
                  : "text-[#64748b] hover:text-[#334155]"
              }`}
            >
              <TabIcon size={14} className={isActive ? "text-[#433be2]" : "text-[#64748b]"} />
              <span>{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#433be2] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
