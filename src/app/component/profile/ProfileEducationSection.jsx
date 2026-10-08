"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap } from 'lucide-react';

/**
 * ProfileEducationSection Component
 * Displays candidate educational background, degrees, and academic institutions.
 */
export default function ProfileEducationSection({ education }) {
  const router = useRouter();

  return (
    <section className="bg-white border border-[#e4e5ee] rounded-[24px] p-5 sm:p-6 shadow-[0_4px_18px_rgba(20,24,60,0.04)] hover:shadow-md transition">
      <div className="flex items-center justify-between border-b border-[#f0f1f7] pb-3.5 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#f0efff] text-[#463fe6] flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-[#141522]">Education</h3>
        </div>
        <button 
          onClick={() => router.push('/edit-profile?section=education')} 
          className="text-xs font-semibold text-[#463fe6] hover:underline cursor-pointer"
        >
          {education?.length ? 'Edit' : '+ Add Education'}
        </button>
      </div>

      <div className="space-y-4">
        {education && education.length > 0 ? (
          education.map((edu, idx) => (
            <div key={idx} className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-[#141522] leading-snug">{edu.degree}</h4>
              <p className="text-xs font-semibold text-[#463fe6]">{edu.institute}</p>
              {edu.years ? <p className="text-[11px] text-slate-400 font-medium">{edu.years}</p> : null}
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-400 py-2 text-center">No education details added yet.</p>
        )}
      </div>
    </section>
  );
}
