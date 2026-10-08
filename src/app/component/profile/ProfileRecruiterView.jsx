"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '../common/Header';
import { authService } from '../../../services/authService';
import { Building2, Award, Sparkles, Briefcase, User, Plus, LogOut } from 'lucide-react';

/**
 * ProfileRecruiterView Component
 * Dedicated profile view for HR/Recruiter corporate users with permission dashboard and quick links.
 */
export default function ProfileRecruiterView({ profile, fullName, handle }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f6f7fc] text-[#181924] font-sans pb-24 md:pb-16 text-left">
      <Header />

      {/* Sticky Action Bar */}
      <div className="bg-white border-b border-[#e6e7f0] sticky top-[64px] sm:top-[80px] z-40 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#2D24D0]/10 text-[#2D24D0] font-extrabold text-[10px] tracking-wider uppercase border border-[#2D24D0]/20">
              Recruiter Profile
            </span>
            <h1 className="text-xl font-bold text-[#141522] tracking-tight">HR Executive Profile</h1>
          </div>

          <button
            onClick={() => router.push('/recruiter')}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#2D24D0] text-white text-xs font-bold hover:bg-[#1e1c75] transition shadow-xs cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Recruiter Dashboard</span>
          </button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-3 sm:px-6 pt-6 space-y-6">
        {/* Recruiter Hero Identity Card */}
        <div className="bg-[#e9e8fe] border border-[#d8d6fc] rounded-[24px] p-6 sm:p-8 shadow-[0_4px_20px_rgba(45,36,208,0.08)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#2D24D0] text-white flex items-center justify-center font-extrabold text-2xl shadow-md border-2 border-white shrink-0">
                <span>{(fullName.charAt(0) || 'R').toUpperCase()}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#11121d]">{fullName}</h2>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                    Verified HR
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#2D24D0]">{profile.email || handle}</p>
                <p className="text-xs font-medium text-slate-600 flex items-center gap-1.5 pt-1">
                  <Building2 size={14} className="text-[#2D24D0]" />
                  <span>HireMind Corporate & Enterprise Talent Network</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => router.push('/recruiter')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2D24D0] hover:bg-[#1e1c75] text-white text-xs font-bold shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Building2 size={14} />
                <span>Go to Recruiter Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account & HR Scope */}
          <div className="bg-white border border-[#e4e5ee] rounded-[24px] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-[#141522] flex items-center gap-2">
                <Award size={18} className="text-[#2D24D0]" />
                <span>HR Account & Access Permissions</span>
              </h3>
              <span className="text-[11px] font-bold text-slate-400">ID: HR-EXEC-2026</span>
            </div>

            <div className="space-y-2.5 text-xs font-semibold text-slate-700">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Designated Role:</span>
                <span className="text-[#2D24D0] font-bold">Enterprise HR & Hiring Manager</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Job Postings Management:</span>
                <span className="text-emerald-700 font-bold">✓ Full Access</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Candidate Pipeline & Interviews:</span>
                <span className="text-emerald-700 font-bold">✓ Full Access</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Mailpit Credentials Dispatcher:</span>
                <span className="text-emerald-700 font-bold">✓ Connected (Port 8025)</span>
              </div>
            </div>
          </div>

          {/* Quick Management Actions */}
          <div className="bg-white border border-[#e4e5ee] rounded-[24px] p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-[#141522] flex items-center gap-2">
                <Sparkles size={18} className="text-[#2D24D0]" />
                <span>Recruiter Quick Actions</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => router.push('/recruiter/jobs')}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-[#2D24D0] bg-slate-50/50 hover:bg-blue-50/30 transition text-left cursor-pointer space-y-1 group"
              >
                <Briefcase size={18} className="text-[#2D24D0]" />
                <h4 className="text-xs font-bold text-[#1E2229] group-hover:text-[#2D24D0]">Manage Job Vacancies</h4>
                <p className="text-[10px] text-slate-400">Post, edit or pause job openings</p>
              </button>

              <button
                onClick={() => router.push('/recruiter/applications/job-101')}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-[#2D24D0] bg-slate-50/50 hover:bg-blue-50/30 transition text-left cursor-pointer space-y-1 group"
              >
                <User size={18} className="text-[#2D24D0]" />
                <h4 className="text-xs font-bold text-[#1E2229] group-hover:text-[#2D24D0]">Candidate Pipeline</h4>
                <p className="text-[10px] text-slate-400">Review candidate submissions & match scores</p>
              </button>

              <button
                onClick={() => router.push('/recruiter')}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-[#2D24D0] bg-slate-50/50 hover:bg-blue-50/30 transition text-left cursor-pointer space-y-1 group"
              >
                <Plus size={18} className="text-[#2D24D0]" />
                <h4 className="text-xs font-bold text-[#1E2229] group-hover:text-[#2D24D0]">Create HR Sub-Accounts</h4>
                <p className="text-[10px] text-slate-400">Delegate tasks & send email credentials</p>
              </button>

              <button
                onClick={() => router.push('/find-jobs')}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-[#2D24D0] bg-slate-50/50 hover:bg-blue-50/30 transition text-left cursor-pointer space-y-1 group"
              >
                <Building2 size={18} className="text-[#2D24D0]" />
                <h4 className="text-xs font-bold text-[#1E2229] group-hover:text-[#2D24D0]">Platform Overview</h4>
                <p className="text-[10px] text-slate-400">View live candidate platform UI</p>
              </button>
            </div>
          </div>
        </div>

        {/* Account Session Logout */}
        <div className="bg-white border border-rose-100 rounded-[24px] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
              <LogOut className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-[#141522]">HR Account Session</h4>
              <p className="text-xs text-slate-500">Sign out of your Recruiter & HR Manager Portal account</p>
            </div>
          </div>

          <button
            type="button"
            onClick={async () => {
              try {
                await authService.logout();
              } catch (e) {}
              if (typeof window !== 'undefined') {
                localStorage.removeItem('hiremind_user');
                localStorage.removeItem('hiremind_user_profile');
                localStorage.removeItem('hiremind_user_role');
                sessionStorage.clear();
              }
              router.push('/login');
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout HR Account</span>
          </button>
        </div>
      </main>
    </div>
  );
}
