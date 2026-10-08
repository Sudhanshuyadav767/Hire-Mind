"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase } from 'lucide-react';

/**
 * ProfileExperienceSection Component
 * Displays candidate work history timeline and role descriptions.
 */
export default function ProfileExperienceSection({ workExperience }) {
  const router = useRouter();

  return (
    <section className="bg-white border border-[#e4e5ee] rounded-[24px] p-5 sm:p-6 shadow-[0_4px_18px_rgba(20,24,60,0.04)] hover:shadow-md transition">
      <div className="flex items-center justify-between border-b border-[#f0f1f7] pb-3.5 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#f0efff] text-[#463fe6] flex items-center justify-center shrink-0">
            <Briefcase className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-[#141522]">Work Experience</h3>
        </div>
        <button 
          onClick={() => router.push('/edit-profile?section=workExperience')} 
          className="text-xs font-semibold text-[#463fe6] hover:underline cursor-pointer"
        >
          {workExperience?.length ? 'Edit' : '+ Add Experience'}
        </button>
      </div>

      <div className="space-y-4">
        {workExperience && workExperience.length > 0 ? (
          workExperience.map((exp, idx) => (
            <div key={idx} className="space-y-1 border-l-2 border-[#463fe6]/30 pl-3.5 py-0.5">
              <h4 className="text-sm font-bold text-[#141522]">{exp.role}</h4>
              <p className="text-xs font-semibold text-[#463fe6]">{exp.company}</p>
              {exp.duration ? <p className="text-[11px] text-slate-400 font-medium">{exp.duration}</p> : null}
              {exp.description ? <p className="text-xs text-slate-600 pt-1 leading-relaxed">{exp.description}</p> : null}
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-400 py-2 text-center">No work experience added yet.</p>
        )}
      </div>
    </section>
  );
}
