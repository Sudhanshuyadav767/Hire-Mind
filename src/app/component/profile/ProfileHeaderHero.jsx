"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Building2, Pencil, Sparkles } from 'lucide-react';

/**
 * ProfileHeaderHero Component
 * Renders candidate hero identity card, avatar, domain tags, profile strength indicator, and action buttons.
 */
export default function ProfileHeaderHero({ profile, strengthScore, fullName, handle }) {
  const router = useRouter();

  return (
    <div className="bg-[#e9e8fe] border border-[#d8d6fc] rounded-[24px] p-5 sm:p-7 shadow-[0_4px_20px_rgba(70,63,230,0.08)] mb-6 transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-3 border-white shadow-md flex items-center justify-center shrink-0 overflow-hidden">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={fullName} className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 sm:w-12 sm:h-12 text-[#463fe6]" />
            )}
          </div>

          {/* Real User Identity Info */}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#11121d] tracking-tight">{fullName}</h2>
            <p className="text-xs sm:text-sm font-semibold text-[#463fe6]">{handle}</p>
            {profile.institute ? (
              <p className="text-xs text-slate-600 font-medium flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{profile.institute}</span>
              </p>
            ) : null}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-semibold">
              <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-indigo-200/60 text-[#463fe6]">
                {profile.userType || 'Candidate'}
              </span>
              {profile.domain ? (
                <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-indigo-200/60 text-[#463fe6]">
                  {profile.domain}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Profile Strength Indicator & Quick Actions */}
        <div className="w-full sm:w-64 bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-indigo-100/80 shadow-xs flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-500">Profile Strength:</span>
              <span className="text-emerald-600 font-extrabold">{strengthScore}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${strengthScore}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => router.push('/edit-profile?section=basic')}
              className="w-full py-2 bg-[#463fe6] hover:bg-[#3831d0] text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit Profile Info</span>
            </button>
            <Link href="/pricing" className="w-full block">
              <button className="w-full py-2 bg-[#2D24D0] hover:bg-[#1e1c75] text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Upgrade to Premium</span>
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
