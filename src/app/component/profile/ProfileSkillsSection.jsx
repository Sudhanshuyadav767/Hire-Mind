"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Award } from 'lucide-react';

/**
 * ProfileSkillsSection Component
 * Displays parsed candidate technical skills pills and navigation link to edit skills.
 */
export default function ProfileSkillsSection({ skills }) {
  const router = useRouter();

  return (
    <section className="bg-white border border-[#e4e5ee] rounded-[24px] p-5 sm:p-6 shadow-[0_4px_18px_rgba(20,24,60,0.04)] hover:shadow-md transition">
      <div className="flex items-center justify-between border-b border-[#f0f1f7] pb-3.5 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#f0efff] text-[#463fe6] flex items-center justify-center shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-[#141522]">Skills</h3>
        </div>
        <button 
          onClick={() => router.push('/edit-profile?section=skills')} 
          className="text-xs font-semibold text-[#463fe6] hover:underline cursor-pointer"
        >
          {skills?.length ? 'Manage' : '+ Add Skills'}
        </button>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {skills && skills.length > 0 ? (
          skills.map((skill, index) => {
            const skillName = typeof skill === 'string' ? skill : (skill.name || skill);
            return (
              <span
                key={index}
                className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-[#f4f3ff] text-[#463fe6] border border-[#e0ddff] text-xs sm:text-sm font-semibold hover:bg-[#463fe6] hover:text-white transition-all duration-200 shadow-2xs hover:shadow-xs cursor-default"
              >
                {skillName}
              </span>
            );
          })
        ) : (
          <p className="text-xs text-slate-400 py-2 text-center w-full">
            No skills added yet. Upload resume to parse skills automatically.
          </p>
        )}
      </div>
    </section>
  );
}
