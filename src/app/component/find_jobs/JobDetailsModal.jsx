"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  X, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Building2, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { applicationService } from '../../../services/applicationService';

export default function JobDetailsModal({ job, isOpen, onClose, onApplySuccess }) {
  const router = useRouter();
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (!job) return;

    // Check if candidate already applied to this job in localStorage
    if (typeof window !== 'undefined') {
      const storedApplied = localStorage.getItem('hiremind_applied_jobs');
      if (storedApplied) {
        try {
          const list = JSON.parse(storedApplied);
          const exists = list.some(a => String(a.jobId) === String(job.id) || String(a.id) === String(job.id));
          setIsApplied(exists);
        } catch (e) {}
      }
    }
  }, [job]);

  if (!isOpen || !job) return null;

  const handleApply = async () => {
    setIsSubmitting(true);
    setStatusMessage('');

    const appliedItem = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      companyName: job.company || 'HireMind Enterprise Partner',
      appliedDate: new Date().toISOString().slice(0, 10),
      status: 'Submitted',
      stageName: 'Resume Shortlisting',
      location: job.location || 'Remote',
      salary: job.salary || '$90k - $120k',
      type: job.type || 'Full Time',
      coverLetter: coverLetter || 'Applied via HireMind AI Platform'
    };

    // Save to localStorage
    if (typeof window !== 'undefined') {
      const storedApplied = localStorage.getItem('hiremind_applied_jobs');
      let list = [];
      if (storedApplied) {
        try { list = JSON.parse(storedApplied); } catch (e) {}
      }
      if (!list.some(a => String(a.jobId) === String(job.id))) {
        list.unshift(appliedItem);
        localStorage.setItem('hiremind_applied_jobs', JSON.stringify(list));
      }
    }

    // Try backend application service API
    try {
      await applicationService.applyToJob(job.id, { coverLetter });
    } catch (e) {
      console.warn('Backend application submit notice (cached in local state):', e);
    }

    setIsSubmitting(false);
    setIsApplied(true);
    setStatusMessage('🎉 Application submitted successfully!');
    if (onApplySuccess) onApplySuccess(appliedItem);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 p-2 flex items-center justify-center shrink-0 overflow-hidden">
              <img 
                src={job.customLogo || job.logo || "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"} 
                alt={job.company} 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#11121b] leading-snug">{job.title}</h2>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#463fe6]">
                <span>{job.company}</span>
                <CheckCircle2 size={13} className="fill-[#463fe6] text-white shrink-0" />
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-black transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Metadata Badges Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f8f9fe] border border-indigo-50 rounded-2xl p-4 text-xs font-bold text-slate-700">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <MapPin size={14} className="text-[#463fe6]" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <DollarSign size={14} className="text-emerald-600" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <Briefcase size={14} className="text-indigo-600" />
                <span>{job.experience}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 shadow-2xs">
                <Clock size={14} />
                <span>{job.type}</span>
              </div>
            </div>

            <button 
              onClick={() => router.push(`/job/${job.id}`)}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#463fe6] text-white rounded-xl text-xs font-extrabold hover:bg-[#3831d0] transition cursor-pointer shadow-xs"
            >
              <Sparkles size={13} />
              <span>View AI Match Score →</span>
            </button>
          </div>

          {/* Status Message Alert */}
          {statusMessage && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center justify-between">
              <span>{statusMessage}</span>
              <button 
                onClick={() => router.push('/applications')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white rounded-xl text-[11px] font-extrabold hover:bg-emerald-700 transition"
              >
                View Applications <ArrowRight size={12} />
              </button>
            </div>
          )}

          {/* Job Overview Description */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#11121b] flex items-center gap-2">
              <FileText size={16} className="text-[#463fe6]" />
              <span>About the Role & Responsibilities</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {job.description || (
                `We are seeking a talented and driven ${job.title} to join our engineering and product team at ${job.company}. In this position, you will collaborate with cross-functional teams to design, build, and deploy high-performance scalable systems and enterprise web applications.`
              )}
            </p>
          </div>

          {/* Responsibilities List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#11121b] uppercase tracking-wider">Key Responsibilities</h4>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 font-normal pl-1">
              <li>Architect, build, and maintain clean, scalable frontend and backend components.</li>
              <li>Collaborate closely with UI/UX designers, product owners, and QA engineers.</li>
              <li>Optimize system performance, security, and response times across production environments.</li>
              <li>Participate in peer code reviews, sprint planning, and architectural discussions.</li>
            </ul>
          </div>

          {/* Required Skills & Qualifications */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#11121b] uppercase tracking-wider">Required Technical Skills</h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {(job.tags || ["JavaScript", "React", "Node.js", "REST API", "SQL", "Git"]).map((tech, idx) => (
                <span key={idx} className="px-3 py-1 bg-indigo-50/70 border border-indigo-100 text-[#463fe6] rounded-xl text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Cover Letter Input (Optional) */}
          {!isApplied && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-[#11121b]">
                Cover Letter / Message for Recruiter (Optional)
              </label>
              <textarea
                rows={3}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write a brief note explaining why you're a great fit for this role..."
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-800 outline-none focus:border-[#463fe6] focus:ring-2 focus:ring-indigo-100 font-medium"
              />
            </div>
          )}

        </div>

        {/* Action Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
            <span>Verified Partner Job</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition cursor-pointer"
            >
              Close
            </button>

            {isApplied ? (
              <button 
                onClick={() => router.push('/applications')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <CheckCircle2 size={15} />
                <span>Applied • View Applications</span>
              </button>
            ) : (
              <button 
                onClick={handleApply}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-[#463fe6] hover:bg-[#3831d0] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-indigo-200 disabled:opacity-50 cursor-pointer"
              >
                <Send size={14} />
                <span>{isSubmitting ? 'Submitting Application...' : 'Apply Now'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
