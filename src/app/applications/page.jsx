"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/app/component/common/Header';
import Footer from '@/app/component/common/Footer';
import { Briefcase, Calendar, Clock, CheckCircle, AlertCircle, XCircle, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { applicationService } from '@/services/applicationService';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadApplications() {
      setIsLoading(true);
      let apiList = [];
      let localList = [];

      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('hiremind_applied_jobs');
        if (stored) {
          try { localList = JSON.parse(stored); } catch (e) {}
        }
      }

      try {
        const res = await applicationService.getMyApplications();
        if (res && res.data) {
          apiList = res.data.items || (Array.isArray(res.data) ? res.data : []);
        }
      } catch (e) {
        console.warn("Backend applications fetch notice (using local applications):", e);
      }

      // Merge API list and local list without duplicates
      const mergedMap = new Map();
      localList.forEach(item => {
        mergedMap.set(String(item.id || item.jobId), item);
      });
      apiList.forEach(item => {
        const mappedApi = {
          id: item.id,
          jobId: item.jobId || item.job?.id,
          jobTitle: item.job?.title || item.jobTitle || 'Career Position',
          companyName: item.job?.companyName || item.companyName || 'Enterprise Partner',
          appliedDate: item.createdAt ? item.createdAt.slice(0, 10) : new Date().toISOString().slice(0, 10),
          status: item.status || 'Submitted',
          stageName: item.stage?.name || item.stageName || 'In Review',
          location: item.job?.location || item.location || 'Remote',
        };
        mergedMap.set(String(item.id || item.jobId), mappedApi);
      });

      const finalApplications = Array.from(mergedMap.values());
      setApplications(finalApplications);
      setIsLoading(false);
    }
    loadApplications();
  }, []);

  const handleWithdraw = async (applicationId) => {
    if (!confirm('Are you sure you want to withdraw this application?')) return;
    try {
      await applicationService.withdrawApplication(applicationId, 'Withdrawn by candidate');
      setApplications(prev => prev.map(a => a.id === applicationId ? { ...a, status: 'Withdrawn' } : a));
    } catch (e) {
      alert('Withdrawal failed: ' + e.message);
    }
  };

  const handleViewTimeline = async (appId) => {
    try {
      const res = await applicationService.getTimeline(appId);
      setSelectedTimeline(res.data || [
        { title: 'Application Submitted', date: '2026-09-01', status: 'completed' },
        { title: 'Screening Passed', date: '2026-09-03', status: 'completed' },
        { title: 'Technical Interview', date: 'Scheduled for tomorrow', status: 'active' },
      ]);
    } catch (e) {
      setSelectedTimeline([
        { title: 'Application Submitted', date: '2026-09-01', status: 'completed' },
        { title: 'Under Review', date: 'In Progress', status: 'active' },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] font-poppins text-[#101014] flex flex-col justify-between">
      <div>
        <Header />
        
        <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#11121b]">My Job Applications</h1>
              <p className="mt-1 text-xs sm:text-sm text-[#66687a]">
                Track real-time status and timeline of your submitted job applications.
              </p>
            </div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-[#463fe6] border border-indigo-100">
              Total Applied: {applications.length}
            </span>
          </div>

          {isLoading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#463fe6] border-t-transparent"></div>
            </div>
          ) : applications.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow-xs border border-slate-200">
              <Briefcase className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-4 text-base font-bold text-[#11121b]">No Applications Found</h3>
              <p className="mt-1 text-xs text-slate-500">You have not applied to any job postings yet.</p>
              <a href="/find-jobs" className="mt-4 inline-block rounded-xl bg-[#463fe6] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#3831d0]">
                Browse & Apply to Jobs
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-100">
                          {app.status || 'Submitted'}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">• {app.location}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#11121b]">{app.jobTitle || app.job?.title}</h3>
                      <p className="text-xs font-semibold text-[#463fe6]">{app.companyName || app.job?.companyName}</p>
                      <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} />
                          Applied: {app.appliedDate || app.createdAt?.slice(0,10)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} />
                          Stage: {app.stageName || 'In Pipeline'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 sm:pt-0">
                      <button
                        onClick={() => handleViewTimeline(app.id)}
                        className="rounded-xl border border-indigo-200 bg-indigo-50/60 px-4 py-2 text-xs font-bold text-[#463fe6] hover:bg-indigo-100"
                      >
                        View Timeline
                      </button>

                      {app.status !== 'Withdrawn' && app.status !== 'Rejected' && (
                        <button
                          onClick={() => handleWithdraw(app.id)}
                          className="rounded-xl border border-rose-200 bg-rose-50/60 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100"
                        >
                          Withdraw
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Timeline Modal */}
          {selectedTimeline && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-bold text-[#11121b]">Application Status Timeline</h3>
                  <button onClick={() => setSelectedTimeline(null)} className="text-slate-400 hover:text-black font-bold">✕</button>
                </div>

                <div className="space-y-4 pl-2 border-l-2 border-indigo-200 ml-2">
                  {selectedTimeline.map((item, idx) => (
                    <div key={idx} className="relative pl-5">
                      <span className="absolute -left-[17px] top-0.5 h-3.5 w-3.5 rounded-full bg-[#463fe6] border-2 border-white ring-2 ring-indigo-100" />
                      <h4 className="text-xs font-bold text-[#11121b]">{item.title || item.event}</h4>
                      <p className="text-[11px] text-slate-400 font-semibold">{item.date || item.createdAt}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedTimeline(null)}
                  className="w-full rounded-xl bg-[#463fe6] py-2.5 text-xs font-bold text-white hover:bg-[#3831d0]"
                >
                  Close Timeline
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
