"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Code } from 'lucide-react';

/**
 * ProfileProjectsSection Component
 * Displays candidate personal & academic projects portfolio.
 */
export default function ProfileProjectsSection({ projects }) {
  const router = useRouter();

  return (
    <section className="bg-white border border-[#e4e5ee] rounded-[24px] p-5 sm:p-6 shadow-[0_4px_18px_rgba(20,24,60,0.04)] hover:shadow-md transition">
      <div className="flex items-center justify-between border-b border-[#f0f1f7] pb-3.5 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#f0efff] text-[#463fe6] flex items-center justify-center shrink-0">
            <Code className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-[#141522]">Projects</h3>
        </div>
        <button 
          onClick={() => router.push('/edit-profile?section=projects')} 
          className="text-xs font-semibold text-[#463fe6] hover:underline cursor-pointer"
        >
          {projects?.length ? 'Edit' : '+ Add Project'}
        </button>
      </div>

      <div className="space-y-3">
        {projects && projects.length > 0 ? (
          projects.map((proj, idx) => (
            <div key={idx} className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-[#141522]">{proj.name}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-400 py-2 text-center">No projects added yet.</p>
        )}
      </div>
    </section>
  );
}
