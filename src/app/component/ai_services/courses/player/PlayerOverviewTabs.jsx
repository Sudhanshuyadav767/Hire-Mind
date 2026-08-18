"use client";

import { CheckCircle2, Award, ShieldAlert, Users, MessageSquare } from "lucide-react";

const subTabs = [
  { id: "overview", label: "Overview" },
  { id: "whatLearn", label: "What You'll Learn" },
  { id: "requirements", label: "Requirements" },
  { id: "instructors", label: "Instructors" },
  { id: "review", label: "Review" }
];

const learningObjectives = [
  "Understand Python basics and syntax",
  "Work with data using NumPy and Pandas",
  "Visualize data with Matplotlib and Seaborn",
  "Clean and analyze real datasets",
  "Build a data science project",
  "Best practices in Python programming"
];

export default function PlayerOverviewTabs({ activeTab, onTabChange }) {
  return (
    <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      
      {/* Sub tabs list (horizontal scrollable on mobile) */}
      <div 
        className="flex border-b border-[#cbd5e1]/40 overflow-x-auto gap-1 sm:gap-3 pb-0.5 whitespace-nowrap scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {subTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`pb-2.5 px-2 text-[11px] sm:text-xs font-medium transition cursor-pointer relative shrink-0 whitespace-nowrap ${
                isActive 
                  ? "text-[#433be2]" 
                  : "text-[#64748b] hover:text-[#334155]"
              }`}
            >
              <span>{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#433be2] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content wrapper */}
      <div className="space-y-4 pt-1 transition-all duration-300">
        {activeTab === "overview" && (
          <>
            <p className="text-xs font-medium text-[#5e637d] leading-relaxed">
              This course is designed for beginners who want to learn Python programming and apply it to data science. By the end of the course, you will be able to analyze data, visualize insights and build real-world projects.
            </p>

            {/* 2-column checklist grid */}
            <div className="grid gap-3 sm:grid-cols-2">
              {learningObjectives.map((obj) => (
                <div key={obj} className="flex items-start gap-2 text-xs font-medium text-[#334155]">
                  <CheckCircle2 size={15} className="text-[#10b981] fill-[#e8fbf4] shrink-0 mt-0.5" />
                  <span className="leading-snug">{obj}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "whatLearn" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#433be2]">
              <Award size={16} />
              <h4 className="text-xs font-medium uppercase tracking-wide">Key Learning Outcomes</h4>
            </div>
            <p className="text-xs font-medium text-[#5e637d] leading-relaxed">
              Through hands-on notebooks, you will master writing logical structures, loop loops, dictionary manipulation, functions, object-oriented concepts, and statistical analysis. You will also learn to clean messy CSVs and deploy automated code scripts.
            </p>
          </div>
        )}

        {activeTab === "requirements" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#f59e0b]">
              <ShieldAlert size={16} />
              <h4 className="text-xs font-medium uppercase tracking-wide">Prerequisites</h4>
            </div>
            <p className="text-xs font-medium text-[#5e637d] leading-relaxed">
              No prior coding experience is necessary! All you need is a basic understanding of computer operations, access to a laptop/desktop, and a desire to learn data logic.
            </p>
          </div>
        )}

        {activeTab === "instructors" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#433be2]">
              <Users size={16} />
              <h4 className="text-xs font-medium uppercase tracking-wide">Your Educators</h4>
            </div>
            <p className="text-xs font-medium text-[#5e637d] leading-relaxed">
              Led by Dr. Jane Doe and industry AI practitioners. Supported by research mentors who actively monitor discussion boards to clarify coding doubts.
            </p>
          </div>
        )}

        {activeTab === "review" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#10b981]">
              <MessageSquare size={16} />
              <h4 className="text-xs font-medium uppercase tracking-wide">Learner Reviews</h4>
            </div>
            <p className="text-xs font-medium text-[#5e637d] leading-relaxed">
              Rated ★ 4.8 from over 12.4K reviews. Learners praised the interactive Jupyter Notebook templates and clear operations walk-throughs.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
