"use client";

import { useState, useEffect } from "react";
import { 
  ChevronDown, 
  Terminal, 
  Database, 
  Cpu, 
  Brain, 
  Sparkles, 
  Sliders, 
  CheckSquare, 
  Square,
  Network
} from "lucide-react";
import { fetchFilterConfig, fetchRoadmap } from "./mockData";

const iconMap = {
  terminal: Terminal,
  database: Database,
  network: Network,
  brain: Brain,
  sparkles: Sparkles,
  cpu: Cpu
};

export default function FiltersSidebar({ onFilterChange }) {
  const [filterConfig, setFilterConfig] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [loadingRoadmap, setLoadingRoadmap] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    let active = true;
    fetchFilterConfig().then(res => {
      if (active) {
        setFilterConfig(res);
        setLoadingFilters(false);
      }
    });
    fetchRoadmap().then(res => {
      if (active) {
        setRoadmap(res);
        setLoadingRoadmap(false);
      }
    });
    return () => { active = false; };
  }, []);

  const toggleFilter = (sectionId, option) => {
    const section = selectedFilters[sectionId] || [];
    const updated = section.includes(option)
      ? section.filter(item => item !== option)
      : [...section, option];
    
    const newFilters = { ...selectedFilters, [sectionId]: updated };
    setSelectedFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleResetAll = () => {
    setSelectedFilters({});
    if (onFilterChange) {
      onFilterChange({});
    }
  };

  const isChecked = (sectionId, option) => {
    return (selectedFilters[sectionId] || []).includes(option);
  };

  return (
    <div className="space-y-6">
      {/* Filters Title & Reset */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
          <h3 className="text-lg font-semibold text-[#101014] flex items-center gap-2">
            <Sliders size={18} className="text-[#433be2]" />
            <span>Filters</span>
          </h3>
          <button 
            onClick={handleResetAll}
            className="text-sm font-semibold text-[#433be2] hover:text-[#3129c8] hover:underline cursor-pointer"
          >
            Reset All
          </button>
        </div>

        {/* Filter List */}
        <div className="space-y-4">
          {loadingFilters ? (
            <div className="space-y-4 animate-pulse">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-20 bg-slate-200 rounded"></div>
                  <div className="h-3.5 w-full bg-slate-100 rounded"></div>
                  <div className="h-3.5 w-4/5 bg-slate-100 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            filterConfig.map((section) => (
              <div key={section.id} className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#334155]">{section.title}</h4>
                  <ChevronDown size={16} className="text-[#64748b] cursor-pointer" />
                </div>
                <div className="space-y-2">
                  {section.options.map((option) => {
                    const checked = isChecked(section.id, option);
                    return (
                      <label 
                        key={option} 
                        className="flex items-center gap-2.5 text-sm text-[#475569] font-medium cursor-pointer select-none hover:text-[#101014] transition"
                      >
                        <input 
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleFilter(section.id, option)}
                          className="hidden"
                        />
                        {checked ? (
                          <CheckSquare size={18} className="text-[#433be2] fill-[#eef1ff]" />
                        ) : (
                          <Square size={18} className="text-[#cbd5e1] hover:border-[#94a3b8] transition rounded" />
                        )}
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
                {section.hasShowMore && (
                  <button type="button" className="text-xs font-semibold text-[#433be2] hover:text-[#3129c8] mt-1 flex items-center cursor-pointer">
                    + Show More
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Learning Path Explorer */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#101014]">Learning Path Explorer</h3>
          <p className="text-sm font-semibold text-[#433be2] mt-0.5">AI Engineer Roadmap</p>
        </div>

        {/* Vertical Timeline Roadmap */}
        {loadingRoadmap ? (
          <div className="space-y-3.5 animate-pulse pl-6 relative">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-100" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="absolute -left-[19px] w-4 h-4 rounded-full bg-slate-200" />
                <div className="h-8 bg-slate-100 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative pl-6 space-y-4.5 py-1">
            {/* Central Line */}
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-[#e2e8f0]" />

            {roadmap.map((step) => {
              const StepIcon = iconMap[step.type] || Terminal;
              return (
                <div key={step.name} className="relative flex items-center gap-3 group">
                  {/* Timeline Dot Indicator */}
                  <div className="absolute -left-[19px] w-4 h-4 rounded-full border-2 border-white bg-[#433be2] flex items-center justify-center shadow-sm z-10">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                  
                  {/* Step Item */}
                  <div className="flex items-center gap-2.5 py-1.5 px-3 rounded-xl border border-[#f1f5f9] bg-[#f8fafc] w-full hover:border-[#433be2] transition shadow-xs">
                    <div className="p-1 rounded-lg bg-[#eef1ff] text-[#433be2]">
                      <StepIcon size={16} />
                    </div>
                    <span className="text-sm font-semibold text-[#334155]">{step.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          <button type="button" className="w-full py-2.5 rounded-xl bg-[#433be2] hover:bg-[#3129c8] text-white text-sm font-semibold shadow-sm transition cursor-pointer">
            Start Path
          </button>
          <button type="button" className="w-full py-2.5 rounded-xl border border-[#d9dcf7] bg-white hover:bg-[#f8fafc] text-[#433be2] text-sm font-semibold shadow-xs transition cursor-pointer">
            Track Progress
          </button>
        </div>
      </div>
    </div>
  );
}
