"use client";

import { useState } from "react";
import { 
  CheckSquare, 
  ChevronDown, 
  Code, 
  PieChart, 
  List, 
  BarChart2, 
  Trophy, 
  HelpCircle, 
  Layers, 
  FileText,
  Calendar,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

const statuses = [
  { label: "All Assignments", count: 8, id: "all" },
  { label: "Completed", count: 4, id: "completed" },
  { label: "In Progress", count: 3, id: "inProgress" },
  { label: "Upcoming", count: 1, id: "upcoming" },
  { label: "Overdue", count: 2, id: "overdue" }
];

const types = [
  { label: "Practice", count: 4 },
  { label: "Quiz", count: 3 },
  { label: "Project", count: 2 }
];

const difficulties = [
  { label: "Easy", count: 4, color: "bg-green-500" },
  { label: "Medium", count: 3, color: "bg-yellow-500" },
  { label: "Hard", count: 2, color: "bg-red-500" }
];

const assignmentsList = [
  { id: 1, number: "1", title: "Python Basics Practice", tag: "Practice", desc: "Solve problems on variables, data types, operators and basic input/output.", meta: "Easy • 10 Questions • 30 Min", status: "completed", dateText: "Submitted on May 10, 2024", type: "practice" },
  { id: 2, number: "2", title: "NumPy Arrays Exercise", tag: "Practice", desc: "Work with NumPy arrays and perform operations like slicing, indexing and aggregations.", meta: "Medium • 8 Questions • 45 Min", status: "inProgress", dateText: "Due in 2 days May 10, 2024", type: "practice" },
  { id: 3, number: "3", title: "Pandas Data Manipulation", tag: "Practice", desc: "Manipulate and analyze datasets using Pandas DataFrame.", meta: "Medium • 10 Questions • 60 Min", status: "completed", dateText: "Submitted on May 10, 2024", type: "practice" },
  { id: 4, number: "4", title: "Data Visualization Task", tag: "Practice", desc: "Create various plots using Matplotlib and Seaborn to visualize data.", meta: "Medium • 1 Task • 60 Min", status: "inProgress", dateText: "Due in 2 days May 10, 2024", type: "practice" },
  { id: 5, number: "5", title: "Data Analysis Mini Project", tag: "Project", desc: "Perform end-to-end data analysis and derive insights from a dataset.", meta: "Hard • 1 Project • 3 - 4 Hours", status: "upcoming", dateText: "Starts on May 10, 2024", type: "project" },
  { id: 6, number: "6", title: "Python Quiz", tag: "Quiz", desc: "Test your understanding of Python concepts through this quiz.", meta: "Easy • 15 Questions • 20 Min", status: "completed", dateText: "Submitted on May 10, 2024", type: "quiz" },
  { id: 7, number: "7", title: "Real-world Data Challenge", tag: "Project", desc: "Analyze a real-world dataset and build a predictive model.", meta: "Hard • 1 Python • 4-5 Hours", status: "upcoming", dateText: "Starts on May 10, 2024", type: "project" },
  { id: 8, number: "8", title: "Final Assessment", tag: "Quiz", desc: "Final assessment to evaluate your overall learning in this course.", meta: "Medium • 20 Questions • 40 Min", status: "overdue", dateText: "Was due on May 10, 2024", type: "quiz" }
];

const iconMap = {
  1: { icon: Code, color: "text-green-500 bg-green-50 border-green-100" },
  2: { icon: PieChart, color: "text-amber-500 bg-amber-50 border-amber-100" },
  3: { icon: List, color: "text-rose-500 bg-rose-50 border-rose-100" },
  4: { icon: BarChart2, color: "text-purple-500 bg-purple-50 border-purple-100" },
  5: { icon: Trophy, color: "text-yellow-500 bg-yellow-50 border-yellow-100" },
  6: { icon: HelpCircle, color: "text-blue-500 bg-blue-50 border-blue-100" },
  7: { icon: Layers, color: "text-teal-500 bg-teal-50 border-teal-100" },
  8: { icon: FileText, color: "text-pink-500 bg-pink-50 border-pink-100" }
};

export default function PlayerAssignmentsWorkspace() {
  const [activeStatus, setActiveStatus] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleFilter = (sectionId, label) => {
    setSelectedFilters(prev => {
      const section = prev[sectionId] || [];
      const updated = section.includes(label)
        ? section.filter(l => l !== label)
        : [...section, label];
      return { ...prev, [sectionId]: updated };
    });
  };

  const isChecked = (sectionId, label) => {
    return (selectedFilters[sectionId] || []).includes(label);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      
      {/* Sidebar Filters */}
      <aside className="space-y-6">
        
        {/* Status filters */}
        <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-medium text-[#101014] flex items-center gap-2">
            <CheckSquare size={16} className="text-[#433be2]" />
            <span>Filter Assignments</span>
          </h3>

          <div className="space-y-1 max-h-[180px] overflow-y-auto sm:max-h-none sm:overflow-visible pr-1 sm:pr-0">
            {statuses.map((st) => {
              const isActive = activeStatus === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setActiveStatus(st.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition cursor-pointer text-left ${
                    isActive 
                      ? "bg-[#eef1ff] text-[#433be2]" 
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#101014]"
                  }`}
                >
                  <span>{st.label}</span>
                  <span className={`text-[10px] ${isActive ? "text-[#433be2]" : "text-[#94a3b8]"}`}>
                    {st.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Type filters */}
        <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-3.5">
          <h3 className="text-xs font-medium text-[#334155]">Type</h3>
          
          <div className="space-y-2">
            {types.map((type) => {
              const checked = isChecked("type", type.label);
              return (
                <button
                  key={type.label}
                  onClick={() => toggleFilter("type", type.label)}
                  className="w-full flex items-center justify-between text-xs text-[#475569] font-medium cursor-pointer select-none hover:text-[#101014] transition text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                      checked ? "border-[#433be2] bg-[#433be2] text-white" : "border-[#cbd5e1]"
                    }`}>
                      {checked && <span className="text-[10px] font-medium">✓</span>}
                    </div>
                    <span>{type.label}</span>
                  </div>
                  <span className="text-[#94a3b8] text-[10px]">{type.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty filters */}
        <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-3.5">
          <h3 className="text-xs font-medium text-[#334155]">Difficulty</h3>
          
          <div className="space-y-2">
            {difficulties.map((diff) => {
              const checked = isChecked("difficulty", diff.label);
              return (
                <button
                  key={diff.label}
                  onClick={() => toggleFilter("difficulty", diff.label)}
                  className="w-full flex items-center justify-between text-xs text-[#475569] font-medium cursor-pointer select-none hover:text-[#101014] transition text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                      checked ? "border-[#433be2] bg-[#433be2] text-white" : "border-[#cbd5e1]"
                    }`}>
                      {checked && <span className="text-[10px] font-medium">✓</span>}
                    </div>
                    {/* Circle Indicator */}
                    <div className={`w-2.5 h-2.5 rounded-full ${diff.color}`} />
                    <span>{diff.label}</span>
                  </div>
                  <span className="text-[#94a3b8] text-[10px]">{diff.count}</span>
                </button>
              );
            })}
          </div>
        </div>

      </aside>

      {/* Main Panel Content */}
      <div className="space-y-4">
        
        {/* Count and Sort header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#101014]">8 Assignments</h3>
          
          <div className="flex items-center gap-1.5 text-xs text-[#64748b]">
            <span>Sort by:</span>
            <button 
              type="button" 
              className="inline-flex items-center gap-1 rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-1.5 font-medium text-[#334155] shadow-2xs hover:bg-[#f8fafc] cursor-pointer"
            >
              <span>Due Date (Soonest)</span>
              <ChevronDown size={12} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Card deck */}
        <div className="space-y-3">
          {assignmentsList.map((item) => {
            const config = iconMap[item.id] || iconMap[1];
            const IconComp = config.icon;
            
            return (
              <div 
                key={item.id}
                className="bg-white border border-[#cbd5e1]/55 hover:border-[#433be2] rounded-2xl p-4 shadow-2xs hover:shadow-xs transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                
                {/* Details Left */}
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-xl border ${config.color} shrink-0`}>
                    <IconComp size={20} />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs font-medium text-[#101014]">
                        {item.number}. {item.title}
                      </h4>
                      <span className="rounded-lg bg-[#f0efff]/60 border border-[#cbd5e1]/20 px-2 py-0.5 text-[9px] font-medium text-[#433be2]">
                        {item.tag}
                      </span>
                    </div>

                    <p className="text-[11px] font-medium text-[#64748b] leading-normal line-clamp-2 sm:line-clamp-1">
                      {item.desc}
                    </p>

                    <div className="text-[10px] font-medium text-[#94a3b8] pt-0.5">
                      {item.meta}
                    </div>
                  </div>
                </div>

                {/* Right Side Status Panel */}
                <div className="flex items-center justify-between sm:justify-end gap-3.5 shrink-0 border-t sm:border-t-0 border-[#f1f5f9] pt-3 sm:pt-0 self-stretch sm:self-auto w-full sm:w-auto">
                  
                  {/* Status Render */}
                  {item.status === "completed" && (
                    <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                      <div className="space-y-0.5 text-left sm:text-right">
                        <span className="text-[10px] font-medium text-[#10b981] block">Completed</span>
                        <span className="text-[9px] font-medium text-[#94a3b8] block">{item.dateText}</span>
                      </div>
                      <CheckCircle2 size={18} className="text-[#10b981] fill-[#e8fbf4] shrink-0" />
                    </div>
                  )}

                  {item.status === "inProgress" && (
                    <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                      <div className="space-y-0.5 text-left sm:text-right">
                        <span className="text-[10px] font-medium text-[#433be2] block">In Progress</span>
                        <span className="text-[9px] font-medium text-[#94a3b8] block">{item.dateText}</span>
                      </div>
                      {/* 75% Progress Circle */}
                      <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#433be2" strokeWidth="3" strokeDasharray="75, 100" strokeLinecap="round" />
                        </svg>
                        <span className="absolute text-[8px] font-medium text-[#433be2]">75%</span>
                      </div>
                    </div>
                  )}

                  {item.status === "upcoming" && (
                    <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                      <div className="space-y-0.5 text-left sm:text-right">
                        <span className="text-[10px] font-medium text-slate-500 block">Upcoming</span>
                        <span className="text-[9px] font-medium text-[#94a3b8] block">{item.dateText}</span>
                      </div>
                      <Calendar size={18} className="text-[#433be2] shrink-0" />
                    </div>
                  )}

                  {item.status === "overdue" && (
                    <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                      <div className="space-y-0.5 text-left sm:text-right">
                        <span className="text-[10px] font-medium text-red-500 block">Overdue</span>
                        <span className="text-[9px] font-medium text-red-400 block">{item.dateText}</span>
                      </div>
                      <AlertTriangle size={18} className="text-red-500 shrink-0" />
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
