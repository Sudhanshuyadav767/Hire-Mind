"use client";

import React from 'react';

/**
 * MockInterviewCard Component
 * Displays mock interview parameter info row (Role, Experience level, Interview type, Difficulty).
 */
export function InfoRow({ icon, title, value }) {
  return (
    <div className="flex flex-col items-center text-center py-4">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-base font-semibold text-gray-800 mt-1">{value}</p>
    </div>
  );
}

export function Divider() {
  return <div className="border-t border-gray-200" />;
}

export default function MockInterviewCard({ details }) {
  return (
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md mt-10 px-8 md:px-20 py-6 border border-slate-200/80">
      <InfoRow
        icon="💼"
        title="Job Role"
        value={details.role || "Software Engineer"}
      />
      <Divider />
      <InfoRow
        icon="📊"
        title="Experience Level"
        value={details.experience || "Mid Level (2-5 Years)"}
      />
      <Divider />
      <InfoRow
        icon="👨‍💼"
        title="Interview Type"
        value={details.type || "Technical Interview"}
      />
      <Divider />
      <InfoRow
        icon="⏱️"
        title="Difficulty Level"
        value={details.difficulty || "Medium"}
      />
    </div>
  );
}
