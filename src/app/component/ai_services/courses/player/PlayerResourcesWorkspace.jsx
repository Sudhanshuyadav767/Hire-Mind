"use client";

import { useState } from "react";
import { 
  Download, 
  Search, 
  ChevronDown, 
  FileText, 
  FolderArchive, 
  FileCode, 
  Table, 
  Presentation, 
  Bot,
  HelpCircle,
  FolderOpen
} from "lucide-react";

const categories = [
  { label: "All Resources", count: 24, id: "all" },
  { label: "Course Slides", count: 4, id: "slides" },
  { label: "Cheat Sheets", count: 3, id: "cheats" },
  { label: "Guides & Notes", count: 1, id: "guides" },
  { label: "Practice Datasets", count: 2, id: "datasets" },
  { label: "Code Examples", count: 4, id: "code" },
  { label: "Ebooks", count: 3, id: "ebooks" },
  { label: "Videos", count: 2, id: "videos" }
];

const types = [
  { label: "PDF", count: 11 },
  { label: "ZIP", count: 6 },
  { label: "Jupyter Notebook", count: 4 },
  { label: "PPTX", count: 2 },
  { label: "CSV", count: 1 }
];

const resourcesData = [
  { id: 1, title: "Course Slides", desc: "Complete slide deck for all modules in this course.", format: "PDF", size: "12.4 MB", pages: "25 Pages", date: "May 10, 2024", type: "pdf" },
  { id: 2, title: "Cheat Sheet", desc: "Python data science cheat sheet with important syntax and libraries.", format: "PDF", size: "1.2 MB", pages: "6 Pages", date: "May 10, 2024", type: "pdf" },
  { id: 3, title: "Python basics Guide", desc: "A quick guide to Python basics for beginners.", format: "PDF", size: "3.6 MB", pages: "18 Pages", date: "May 10, 2024", type: "pdf" },
  { id: 4, title: "Practice Datasets", desc: "Datasets used in the course for hands-on practice.", format: "ZIP", size: "1.2 MB", pages: null, date: "May 10, 2024", type: "zip" },
  { id: 5, title: "Code Examples", desc: "Jupyter Notebook examples for all lessons.", format: "IPYNB", size: "1.2 MB", pages: null, date: "May 10, 2024", type: "ipynb" },
  { id: 6, title: "Sales Data.csv", desc: "Sample sales dataset used in data analysis exercises.", format: "CSV", size: "1.2 MB", pages: "1.2K Rows", date: "May 10, 2024", type: "csv" },
  { id: 7, title: "Data Visualization with Python", desc: "Presentation on data visualization techniques.", format: "PPTX", size: "1.2 MB", pages: "15 Slides", date: "May 10, 2024", type: "pptx" },
  { id: 8, title: "Mini Project Starter Kit", desc: "Starter code and files for the final mini project.", format: "ZIP", size: "1.2 MB", pages: null, date: "May 10, 2024", type: "zip" }
];

const iconMap = {
  pdf: { icon: FileText, color: "text-red-500 bg-red-50 border-red-100" },
  zip: { icon: FolderArchive, color: "text-blue-500 bg-blue-50 border-blue-100" },
  ipynb: { icon: FileCode, color: "text-green-500 bg-green-50 border-green-100" },
  csv: { icon: Table, color: "text-emerald-500 bg-emerald-50 border-emerald-100" },
  pptx: { icon: Presentation, color: "text-orange-500 bg-orange-50 border-orange-100" }
};

export default function PlayerResourcesWorkspace() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [checkedTypes, setCheckedTypes] = useState([]);

  const toggleType = (typeLabel) => {
    setCheckedTypes(prev => 
      prev.includes(typeLabel) 
        ? prev.filter(t => t !== typeLabel) 
        : [...prev, typeLabel]
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      
      {/* Sidebar Filter Menu */}
      <aside className="space-y-6">
        
        {/* Resource Categories */}
        <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-medium text-[#101014] flex items-center gap-2">
            <FolderOpen size={16} className="text-[#433be2]" />
            <span>Resource Categories</span>
          </h3>
          
          <div className="space-y-1 max-h-[220px] overflow-y-auto sm:max-h-none sm:overflow-visible pr-1 sm:pr-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition cursor-pointer text-left ${
                    isActive 
                      ? "bg-[#eef1ff] text-[#433be2]" 
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#101014]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] ${isActive ? "text-[#433be2]" : "text-[#94a3b8]"}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter by Type */}
        <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-3.5">
          <h3 className="text-xs font-medium text-[#334155]">Filter by Type</h3>
          
          <div className="space-y-2">
            {types.map((type) => {
              const isChecked = checkedTypes.includes(type.label);
              return (
                <button
                  key={type.label}
                  onClick={() => toggleType(type.label)}
                  className="w-full flex items-center justify-between text-xs text-[#475569] font-medium cursor-pointer select-none hover:text-[#101014] transition text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                      isChecked ? "border-[#433be2] bg-[#433be2] text-white" : "border-[#cbd5e1]"
                    }`}>
                      {isChecked && <span className="text-[10px] font-medium">✓</span>}
                    </div>
                    <span>{type.label}</span>
                  </div>
                  <span className="text-[#94a3b8] text-[10px]">{type.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ask AI Assistant */}
        <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-4 relative overflow-hidden flex flex-col items-center text-center">
          <div className="p-3 rounded-full bg-[#f0efff] text-[#433be2] inline-flex items-center justify-center">
            <Bot size={28} className="stroke-1" />
          </div>
          
          <div className="space-y-1">
            <h4 className="text-xs font-medium text-[#101014]">Need Help?</h4>
            <p className="text-[11px] font-medium text-[#64748b] leading-relaxed px-2">
              Can&apos;t find what you&apos;re looking for? Ask AI Assistant.
            </p>
          </div>

          <button className="w-full py-2.5 rounded-xl bg-[#433be2] hover:bg-[#3129c8] text-white text-xs font-medium transition shadow-sm cursor-pointer">
            Ask AI Assistant
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="space-y-4">
        
        {/* Search & Sort Panel */}
        <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 w-full sm:max-w-xs">
            <Search size={14} className="text-[#94a3b8]" />
            <input 
              type="text" 
              placeholder="Search resources..."
              className="w-full bg-transparent text-xs text-[#1e293b] outline-none placeholder:text-[#94a3b8]"
            />
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center justify-between sm:justify-end gap-1.5 text-xs text-[#64748b] w-full sm:w-auto border-t sm:border-t-0 border-[#f1f5f9] pt-2 sm:pt-0">
            <span>Sort by:</span>
            <button 
              type="button" 
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-1.5 font-medium text-[#334155] shadow-2xs hover:bg-[#f8fafc] cursor-pointer"
            >
              <span>Most Relevant</span>
              <ChevronDown size={12} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Resources Cards Grid */}
        <div className="grid gap-3.5 sm:grid-cols-2">
          {resourcesData.map((res) => {
            const config = iconMap[res.type] || iconMap.pdf;
            const IconComponent = config.icon;
            
            return (
              <div 
                key={res.id}
                className="bg-white border border-[#cbd5e1]/55 hover:border-[#433be2] rounded-2xl p-4 shadow-2xs hover:shadow-xs transition flex flex-col justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  {/* File Icon */}
                  <div className={`p-2.5 rounded-xl border ${config.color} shrink-0`}>
                    <IconComponent size={20} />
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-1">
                    <h3 className="text-xs font-medium text-[#101014] leading-snug line-clamp-1">
                      {res.title}
                    </h3>
                    <p className="text-[11px] font-medium text-[#64748b] leading-normal line-clamp-2">
                      {res.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="flex items-center justify-between border-t border-[#f1f5f9] pt-3 text-[10px] font-medium text-[#64748b] flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="uppercase text-[#433be2]">{res.format}</span>
                    <span>•</span>
                    <span>{res.size}</span>
                    {res.pages && (
                      <>
                        <span>•</span>
                        <span>{res.pages}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-auto sm:ml-0">
                    <span className="font-medium text-gray-400">Uploaded {res.date}</span>
                    <button className="p-1.5 rounded-lg hover:bg-[#eef1ff] hover:text-[#433be2] text-[#64748b] transition cursor-pointer">
                      <Download size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Update Notification Banner */}
        <div className="bg-[#fefce8] border border-[#fef08a] rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-3.5 shadow-3xs">
          <div className="flex items-start gap-2.5 text-xs text-[#854d0e] font-medium">
            <HelpCircle size={16} className="text-[#a16207] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Resource Update: New resources are added regularly. Last updated on{" "}
              <span className="font-medium">May 10, 2024</span>.
            </p>
          </div>
          
          <button 
            type="button" 
            className="w-full sm:w-auto rounded-xl border border-[#fef08a] bg-white hover:bg-yellow-50 px-4 py-2.5 text-xs font-medium text-[#854d0e] transition shadow-3xs cursor-pointer shrink-0 text-center"
          >
            Get Notified
          </button>
        </div>

      </div>

    </div>
  );
}
