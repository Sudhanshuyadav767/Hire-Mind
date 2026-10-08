"use client";

import React from 'react';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';

/**
 * ApplicationEmptyState Component
 * Displays empty state card when candidate has no submitted job applications.
 */
export default function ApplicationEmptyState() {
  return (
    <div className="rounded-2xl bg-white p-12 text-center shadow-xs border border-slate-200">
      <Briefcase className="mx-auto h-12 w-12 text-slate-300" />
      <h3 className="mt-4 text-base font-bold text-[#11121b]">No Applications Found</h3>
      <p className="mt-1 text-xs text-slate-500">You have not applied to any job postings yet.</p>
      <Link 
        href="/find-jobs" 
        className="mt-4 inline-block rounded-xl bg-[#463fe6] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#3831d0] transition"
      >
        Browse & Apply to Jobs
      </Link>
    </div>
  );
}
