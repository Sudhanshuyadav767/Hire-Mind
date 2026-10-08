"use client";

import React from 'react';
import { Calendar, Clock } from 'lucide-react';

/**
 * ApplicationCard Component
 * Displays candidate job application status badge, title, company name, applied date, and action buttons.
 */
export default function ApplicationCard({
  app,
  onViewTimeline,
  onWithdraw
}) {
  const isWithdrawnOrRejected = app.status === 'Withdrawn' || app.status === 'Rejected';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold border ${
              isWithdrawnOrRejected 
                ? 'bg-rose-50 text-rose-700 border-rose-100' 
                : 'bg-emerald-50 text-emerald-700 border-emerald-100'
            }`}>
              {app.status || 'Submitted'}
            </span>
            <span className="text-xs text-slate-400 font-medium">• {app.location}</span>
          </div>
          <h3 className="text-base font-bold text-[#11121b]">{app.jobTitle || app.job?.title}</h3>
          <p className="text-xs font-semibold text-[#463fe6]">{app.companyName || app.job?.companyName}</p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              Applied: {app.appliedDate || app.createdAt?.slice(0, 10)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              Stage: {app.stageName || 'In Pipeline'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 sm:pt-0">
          <button
            onClick={() => onViewTimeline(app.id)}
            className="rounded-xl border border-indigo-200 bg-indigo-50/60 px-4 py-2 text-xs font-bold text-[#463fe6] hover:bg-indigo-100 transition cursor-pointer"
          >
            View Timeline
          </button>

          {!isWithdrawnOrRejected && (
            <button
              onClick={() => onWithdraw(app.id)}
              className="rounded-xl border border-rose-200 bg-rose-50/60 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100 transition cursor-pointer"
            >
              Withdraw
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
