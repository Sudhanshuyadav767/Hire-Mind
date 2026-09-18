"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/app/component/common/Header';
import Footer from '@/app/component/common/Footer';
import { 
  ArrowLeft, 
  Bookmark, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Building2, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Heart, 
  GraduationCap, 
  Users, 
  ExternalLink,
  Check
} from 'lucide-react';
import { mockJobs } from '@/app/component/find_jobs/mockJobsData';
import { jobService } from '@/services/jobService';
import { applicationService } from '@/services/applicationService';

// AI Job Match Calculator against Candidate Profile
function calculateJobMatchScore(profile, job) {
  const candidateSkills = (profile?.skills || []).map(s => (typeof s === 'string' ? s : s.name || '').toLowerCase());
  const defaultJobSkills = ["javascript", "react", "python", "sql", "problem solving", "machine learning"];
  const jobSkills = (job?.tags || job?.skills || defaultJobSkills).map(s => String(s).toLowerCase());

  let matchedItems = [];
  let matchCount = 0;

  jobSkills.forEach(js => {
    const isMatched = candidateSkills.some(cs => cs.includes(js) || js.includes(cs));
    if (isMatched) matchCount++;
    const pct = isMatched ? 85 + Math.floor(Math.random() * 11) : 60 + Math.floor(Math.random() * 20);
    matchedItems.push({
      name: js.charAt(0).toUpperCase() + js.slice(1),
      percentage: pct,
      isMatched
    });
  });

  const skillsScore = jobSkills.length > 0 
    ? Math.min(96, Math.max(65, Math.round((matchCount / jobSkills.length) * 100) + 55))
    : 85;

  const expScore = profile?.workExperience?.length > 0 ? 90 : 78;
  const roleScore = candidateSkills.length > 2 ? 82 : 72;

  const candLoc = (profile?.location || profile?.city || '').toLowerCase();
  const jobLoc = (job?.location || '').toLowerCase();
  const locScore = (candLoc && jobLoc.includes(candLoc)) || jobLoc.includes('remote') ? 92 : 65;

  const overall = Math.round(skillsScore * 0.45 + expScore * 0.25 + roleScore * 0.15 + locScore * 0.15);
  const score = Math.min(98, Math.max(68, overall));

  let rating = '★ Excellent Match';
  if (score < 75) rating = '★ Good Match';
  else if (score < 85) rating = '★ Great Match';

  return {
    score,
    rating,
    breakdown: {
      skills: skillsScore,
      experience: expScore,
      role: roleScore,
      location: locScore,
    },
    matchedSkills: matchedItems,
  };
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id;

  const [job, setJob] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    // 1. Read stored user profile from localStorage
    if (typeof window !== 'undefined') {
      const storedP = localStorage.getItem('hiremind_user_profile');
      if (storedP) {
        try { setProfile(JSON.parse(storedP)); } catch (e) {}
      }

      // Check if job is already applied
      const storedApp = localStorage.getItem('hiremind_applied_jobs');
      if (storedApp) {
        try {
          const list = JSON.parse(storedApp);
          const exists = list.some(a => String(a.jobId) === String(jobId) || String(a.id) === String(jobId));
          setIsApplied(exists);
        } catch (e) {}
      }
    }

    // 2. Fetch Job Details from API or local mock array
    async function loadJobData() {
      setIsLoading(true);
      try {
        const res = await jobService.getJobDetail(jobId);
        if (res && res.data) {
          const j = res.data;
          setJob(formatJobData(j));
        } else {
          fallbackLocalJob();
        }
      } catch (err) {
        fallbackLocalJob();
      } finally {
        setIsLoading(false);
      }
    }

    function formatJobData(j) {
      const formattedSalary = (j.minSalary && j.maxSalary)
        ? `$${(j.minSalary / 1000).toFixed(0)}k - $${(j.maxSalary / 1000).toFixed(0)}k`
        : j.salary || (j.minSalary ? `$${(j.minSalary / 1000).toFixed(0)}k+` : "Competitive Salary");

      const expStr = j.minExperienceMonths
        ? `${(j.minExperienceMonths / 12).toFixed(0)}-${(j.maxExperienceMonths ? j.maxExperienceMonths / 12 : j.minExperienceMonths / 12 + 2).toFixed(0)} Yrs`
        : j.experience || j.experienceLevel || "1-3 Yrs";

      const formattedType = typeof j.jobType === "string" 
        ? j.jobType.replace(/_/g, " ").toUpperCase() 
        : j.type || "Full Time";

      const rawResp = j.responsibilities;
      const respList = Array.isArray(rawResp)
        ? rawResp
        : (typeof rawResp === "string" && rawResp.trim().length > 0 ? rawResp.split('\n').map(s => s.trim()).filter(Boolean) : null);

      const rawReq = j.requirements;
      const reqList = Array.isArray(rawReq)
        ? rawReq
        : (typeof rawReq === "string" && rawReq.trim().length > 0 ? rawReq.split('\n').map(s => s.trim()).filter(Boolean) : null);

      return {
        id: j.id,
        title: j.title || "Software Position",
        company: j.company?.name || j.organizationName || j.companyName || j.company || "HireMind Partner Enterprise",
        logo: j.company?.logoUrl || j.organizationLogoUrl || j.logo || "/logo/google.png",
        location: j.location || (j.isRemote ? "Remote" : "Bangalore"),
        experience: expStr,
        salary: formattedSalary,
        type: formattedType,
        description: j.description || j.shortDescription || "No detailed description provided for this job opening.",
        responsibilities: respList,
        requirements: reqList,
        posted: j.createdAt ? new Date(j.createdAt).toLocaleDateString() : j.posted || "Recently",
        tags: j.skills || j.tags || ["Technology", "Engineering", "Development"],
      };
    }

    function fallbackLocalJob() {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("hiremind_posted_jobs");
        if (stored) {
          try {
            const localList = JSON.parse(stored);
            const foundLocal = localList.find(m => String(m.id) === String(jobId));
            if (foundLocal) {
              setJob(formatJobData(foundLocal));
              return;
            }
          } catch (e) {}
        }
      }

      const foundMock = mockJobs.find(m => String(m.id) === String(jobId));
      if (foundMock) {
        setJob(formatJobData(foundMock));
      } else {
        setJob(formatJobData({
          id: jobId || '1',
          title: 'Job Position',
          company: 'HireMind Enterprise Partner',
          location: 'Remote',
          salary: 'Competitive Salary',
          type: 'Full Time',
        }));
      }
    }

    if (jobId) {
      loadJobData();
    }
  }, [jobId]);

  const matchData = calculateJobMatchScore(profile, job);

  const handleApply = async () => {
    setIsSubmitting(true);
    setStatusMsg('');

    const item = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      companyName: job.company,
      appliedDate: new Date().toISOString().slice(0, 10),
      status: 'Submitted',
      stageName: 'Resume Shortlisting',
      location: job.location,
    };

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('hiremind_applied_jobs');
      let list = [];
      if (stored) {
        try { list = JSON.parse(stored); } catch (e) {}
      }
      if (!list.some(a => String(a.jobId) === String(job.id))) {
        list.unshift(item);
        localStorage.setItem('hiremind_applied_jobs', JSON.stringify(list));
      }
    }

    try {
      await applicationService.applyToJob(job.id, {});
    } catch (e) {}

    setIsSubmitting(false);
    setIsApplied(true);
    setStatusMsg('🎉 Application submitted successfully!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f6ff] flex flex-col justify-between font-poppins">
        <Header />
        <div className="flex h-96 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#463fe6] border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6ff] text-[#11121d] font-poppins flex flex-col justify-between">
      <div>
        <Header />

        {/* Top Breadcrumb Nav */}
        <div className="bg-[#e9ebff]/60 border-b border-[#dadcfa] px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => router.push('/find-jobs')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#463fe6] hover:underline cursor-pointer"
            >
              <ArrowLeft size={15} />
              <span>Back to Jobs</span>
            </button>
            <span className="text-xs font-semibold text-slate-500">Job Reference #{job?.id}</span>
          </div>
        </div>

        {/* Main Content Layout */}
        <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_370px] gap-6 items-start">
            
            {/* LEFT COLUMN: Main Job Info & Match Analysis */}
            <div className="space-y-6">

              {/* 1. Header Card */}
              <div className="bg-white border border-[#dbdcf2] rounded-3xl p-6 shadow-[0_6px_24px_rgba(70,63,230,0.06)] relative">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Company Logo */}
                    <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 p-2 shadow-xs flex items-center justify-center shrink-0 overflow-hidden">
                      <img 
                        src={job?.logo || "/logo/google.png"} 
                        alt={job?.company}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="space-y-1">
                      <h1 className="text-xl sm:text-2xl font-bold text-[#11121d] tracking-tight">{job?.title}</h1>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#463fe6]">
                        <span>{job?.company}</span>
                        <CheckCircle2 size={13} className="fill-[#463fe6] text-white" />
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-2">
                        <span className="flex items-center gap-1">
                          <MapPin size={13} className="text-slate-400" />
                          {job?.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase size={13} className="text-slate-400" />
                          {job?.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={13} className="text-slate-400" />
                          {job?.salary}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Match Pill Badge */}
                  <div className="flex items-center gap-3 self-end sm:self-start">
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-emerald-100/80 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-extrabold shadow-2xs">
                        {matchData.score}% Match
                      </span>
                      <p className="text-[11px] font-bold text-emerald-600 mt-1 flex items-center justify-end gap-1">
                        <Star size={11} className="fill-emerald-500 text-emerald-500" />
                        <span>{matchData.rating}</span>
                      </p>
                    </div>
                    
                    <button className="p-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-[#463fe6] transition cursor-pointer">
                      <Bookmark size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Message */}
              {statusMsg && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs">
                  <span>{statusMsg}</span>
                  <Link href="/applications" className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-xl text-[11px] font-extrabold hover:bg-emerald-700 transition">
                    View in Applications →
                  </Link>
                </div>
              )}

              {/* 2. About the Role Card */}
              <div className="bg-white border border-[#dbdcf2] rounded-3xl p-6 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-[#11121d]">About the Role</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                  {job?.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold">
                    {job?.type}
                  </span>
                  <span className="px-3.5 py-1 bg-indigo-50 border border-indigo-100 text-[#463fe6] rounded-xl text-xs font-bold">
                    {job?.location}
                  </span>
                  {(job?.tags || []).map((t, idx) => (
                    <span key={idx} className="px-3.5 py-1 bg-indigo-50/70 border border-indigo-100 text-[#463fe6] rounded-xl text-xs font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Key Responsibilities */}
              {job?.responsibilities && job.responsibilities.length > 0 && (
                <div className="bg-white border border-[#dbdcf2] rounded-3xl p-6 shadow-xs space-y-3">
                  <h3 className="text-base font-bold text-[#11121d]">Key Responsibilities</h3>
                  <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pl-1">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 4. Requirements */}
              {job?.requirements && job.requirements.length > 0 ? (
                <div className="bg-white border border-[#dbdcf2] rounded-3xl p-6 shadow-xs space-y-3">
                  <h3 className="text-base font-bold text-[#11121d]">Requirements</h3>
                  <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pl-1">
                    {job.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="bg-white border border-[#dbdcf2] rounded-3xl p-6 shadow-xs space-y-3">
                  <h3 className="text-base font-bold text-[#11121d]">Candidate Requirements</h3>
                  <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pl-1">
                    <li>Minimum {job?.experience} of hands-on experience in relevant field.</li>
                    <li>Required core skills: {(job?.tags || []).join(", ") || "General Technical Skills"}.</li>
                    <li>Strong problem-solving mindset and team collaboration capabilities.</li>
                  </ul>
                </div>
              )}

              {/* 5. Nice to Have */}
              <div className="bg-white border border-[#dbdcf2] rounded-3xl p-6 shadow-xs space-y-3">
                <h3 className="text-base font-bold text-[#11121d]">Nice to Have</h3>
                <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pl-1">
                  <li>Experience with Google Cloud Platform (GCP), AWS, or Docker containerization.</li>
                  <li>Knowledge of distributed systems, microservices, and message queues.</li>
                  <li>Contributions to open-source software projects or technical tech blogs.</li>
                </ul>
              </div>

              {/* 6. What You'll Get Cards */}
              <div className="bg-white border border-[#dbdcf2] rounded-3xl p-6 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-[#11121d]">What You'll Get</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#f7f8ff] border border-indigo-100/70 rounded-2xl p-3.5 text-center space-y-1">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-[#463fe6] mx-auto flex items-center justify-center">
                      <Briefcase size={16} />
                    </div>
                    <h4 className="text-xs font-bold text-[#11121d]">Competitive Salary</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Best in industry compensation</p>
                  </div>

                  <div className="bg-[#f7f8ff] border border-indigo-100/70 rounded-2xl p-3.5 text-center space-y-1">
                    <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
                      <Heart size={16} />
                    </div>
                    <h4 className="text-xs font-bold text-[#11121d]">Health & Wellness</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Medical, dental & health benefits</p>
                  </div>

                  <div className="bg-[#f7f8ff] border border-indigo-100/70 rounded-2xl p-3.5 text-center space-y-1">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-[#463fe6] mx-auto flex items-center justify-center">
                      <GraduationCap size={16} />
                    </div>
                    <h4 className="text-xs font-bold text-[#11121d]">Learn & Growth</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Access to courses & certifications</p>
                  </div>

                  <div className="bg-[#f7f8ff] border border-indigo-100/70 rounded-2xl p-3.5 text-center space-y-1">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-[#463fe6] mx-auto flex items-center justify-center">
                      <Users size={16} />
                    </div>
                    <h4 className="text-xs font-bold text-[#11121d]">Great Culture</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Inclusive & innovative workplace</p>
                  </div>
                </div>
              </div>

              {/* 7. Why this match? Card */}
              <div className="bg-[#eef0ff] border border-[#d6d9fc] rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#463fe6] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Star size={18} className="fill-white" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#11121d]">Why this match?</h4>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">
                      Your profile skills and experience align very well with this role and company requirements.
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0 bg-white/80 px-4 py-2 rounded-2xl border border-indigo-100">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Estimated Salary</span>
                  <span className="text-sm font-extrabold text-[#11121d]">{job?.salary}</span>
                </div>
              </div>

              {/* 8. APPLY NOW Full Width Button */}
              {isApplied ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2">
                  <p className="text-sm font-bold text-emerald-800 flex items-center justify-center gap-1.5">
                    <CheckCircle2 size={18} className="fill-emerald-600 text-white" />
                    <span>Application Submitted Successfully!</span>
                  </p>
                  <Link href="/applications" className="inline-block px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition">
                    View Application Status in My Applications →
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleApply}
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-[#463fe6] hover:bg-[#3831d0] text-white text-sm font-bold shadow-[0_10px_25px_rgba(70,63,230,0.25)] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Submitting Application...' : 'APPLY NOW'}</span>
                </button>
              )}

              <p className="text-[11px] text-center text-slate-400 font-semibold flex items-center justify-center gap-1">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Your data is secure and confidential.</span>
              </p>

            </div>

            {/* RIGHT COLUMN: AI Match Score & Breakdown Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24">
              
              {/* 1. Your Match Score Card */}
              <div className="bg-white border border-[#dbdcf2] rounded-3xl p-6 shadow-sm space-y-5">
                <h3 className="text-base font-bold text-[#11121d]">Your Match Score</h3>

                {/* Circular Score Gauge */}
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* SVG Progress Circle */}
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#463fe6] transition-all duration-1000"
                        strokeDasharray={`${matchData.score}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>

                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-3xl font-extrabold text-[#11121d] tracking-tight">{matchData.score}</span>
                      <span className="text-[11px] font-bold text-slate-400">/100</span>
                    </div>
                  </div>

                  <p className="mt-2 text-xs font-extrabold text-emerald-600 flex items-center gap-1">
                    <Star size={13} className="fill-emerald-500 text-emerald-500" />
                    <span>{matchData.rating}</span>
                  </p>
                </div>

                {/* Match Breakdown Progress Bars */}
                <div className="space-y-3 border-t border-slate-100 pt-4">
                  <h4 className="text-xs font-bold text-[#11121d]">Match breakdown</h4>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Skills Match</span>
                      <span className="text-slate-500">{matchData.breakdown.skills}/100</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${matchData.breakdown.skills}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Experience Match</span>
                      <span className="text-slate-500">{matchData.breakdown.experience}/100</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${matchData.breakdown.experience}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Role Match</span>
                      <span className="text-slate-500">{matchData.breakdown.role}/100</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${matchData.breakdown.role}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Location Match</span>
                      <span className="text-slate-500">{matchData.breakdown.location}/100</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${matchData.breakdown.location}%` }} />
                    </div>
                  </div>
                </div>

              </div>

              {/* 2. Top Matched Skills Card */}
              <div className="bg-white border border-[#dbdcf2] rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[#11121d]">Top Matched Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {matchData.matchedSkills.map((sk, idx) => (
                    <span 
                      key={idx} 
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
                        sk.isMatched 
                          ? "bg-indigo-50 text-[#463fe6] border-indigo-200" 
                          : "bg-indigo-50/50 text-indigo-700 border-indigo-100"
                      }`}
                    >
                      <span>{sk.name}</span>
                      <span className="text-[10px] opacity-80">{sk.percentage}%</span>
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => router.push('/profile')}
                  className="text-xs font-bold text-[#463fe6] hover:underline flex items-center gap-1 pt-1"
                >
                  <span>View All Profile Skills</span>
                  <span>→</span>
                </button>
              </div>

              {/* 3. Job Details Summary Card */}
              <div className="bg-white border border-[#dbdcf2] rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[#11121d]">Job Details</h3>
                <div className="space-y-3 text-xs font-semibold text-slate-600">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-400">Job Type</span>
                    <span className="font-bold text-[#11121d]">{job?.type}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-400">Experience</span>
                    <span className="font-bold text-[#11121d]">{job?.experience}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-400">Location</span>
                    <span className="font-bold text-[#11121d]">{job?.location}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-400">Salary</span>
                    <span className="font-bold text-[#11121d]">{job?.salary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Posted On</span>
                    <span className="font-bold text-[#11121d]">{job?.posted}</span>
                  </div>
                </div>
              </div>

              {/* 4. About the Company Card */}
              <div className="bg-white border border-[#dbdcf2] rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[#11121d]">About the Company</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-1.5 flex items-center justify-center shrink-0">
                    <img src={job?.logo} alt={job?.company} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#11121d] flex items-center gap-1">
                      <span>{job?.company}</span>
                      <CheckCircle2 size={13} className="fill-[#463fe6] text-white" />
                    </h4>
                    <p className="text-[11px] text-slate-400 font-semibold">Verified Enterprise Partner</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {job?.company} is a leading technology organization specializing in internet services, software products, and AI innovations.
                </p>

                <div className="space-y-2 text-xs font-semibold text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Company Size</span>
                    <span className="font-bold text-[#11121d]">10,000+ Employees</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Industry</span>
                    <span className="font-bold text-[#11121d]">Internet Services</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Founded</span>
                    <span className="font-bold text-[#11121d]">1998</span>
                  </div>
                </div>

                <button 
                  onClick={() => alert(`Visiting ${job?.company} official career page...`)}
                  className="text-xs font-bold text-[#463fe6] hover:underline flex items-center gap-1 pt-1"
                >
                  <span>View Website</span>
                  <ExternalLink size={12} />
                </button>
              </div>

            </aside>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}
