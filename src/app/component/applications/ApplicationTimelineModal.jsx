"use client";

import React from 'react';
import { X } from 'lucide-react';

/**
 * ApplicationTimelineModal Component
 * Interactive modal overlay displaying chronological hiring pipeline updates for a job application.
 */
export default function ApplicationTimelineModal({ timeline, onClose }) {
  if (!timeline) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-[#11121b]">Application Status Timeline</h3>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:text-black hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 pl-2 border-l-2 border-indigo-200 ml-2 py-2">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative pl-5">
              <span className="absolute -left-[17px] top-0.5 h-3.5 w-3.5 rounded-full bg-[#463fe6] border-2 border-white ring-2 ring-indigo-100" />
              <h4 className="text-xs font-bold text-[#11121b]">{item.title || item.event}</h4>
              <p className="text-[11px] text-slate-400 font-semibold">{item.date || item.createdAt}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-xl bg-[#463fe6] py-2.5 text-xs font-bold text-white hover:bg-[#3831d0] transition cursor-pointer"
        >
          Close Timeline
        </button>
      </div>
    </div>
  );
}
