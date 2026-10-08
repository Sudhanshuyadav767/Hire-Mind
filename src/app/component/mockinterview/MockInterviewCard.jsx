"use client";

import React from 'react';
import { Briefcase, Signal, Video, Award, Clock, Sparkles } from 'lucide-react';

export function InfoTile({ icon: Icon, title, value, badgeColor = "bg-indigo-50 text-indigo-700 border-indigo-200" }) {
  return (
    <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-indigo-200 hover:shadow-sm transition-all">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${badgeColor}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0 text-left">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function MockInterviewCard({ details = {} }) {
  return (
    <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl shadow-indigo-900/5 p-5 sm:p-7 border border-slate-200/90 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#2D24D0]" />
          Interview Parameters & Setup
        </h3>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
          AI Prepared ✓
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InfoTile
          icon={Briefcase}
          title="Target Role"
          value={details.role || "Software Engineer"}
          badgeColor="bg-indigo-50 text-[#2D24D0] border-indigo-100"
        />
        <InfoTile
          icon={Signal}
          title="Experience Level"
          value={details.experience || "Mid Level (2-5 Years)"}
          badgeColor="bg-emerald-50 text-emerald-700 border-emerald-100"
        />
        <InfoTile
          icon={Video}
          title="Interview Format"
          value={details.type || "Technical & HR Interview"}
          badgeColor="bg-purple-50 text-purple-700 border-purple-100"
        />
        <InfoTile
          icon={Award}
          title="Difficulty Level"
          value={details.difficulty || "Medium"}
          badgeColor="bg-amber-50 text-amber-700 border-amber-100"
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-100 px-1">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-indigo-600" /> Duration: ~25 Minutes
        </span>
        <span>Questions: 5 AI Evaluated</span>
      </div>
    </div>
  );
}
