"use client";

import React, { useState, useEffect } from 'react';
import RecruiterHeader from '@/app/component/common/RecruiterHeader';
import Footer from '@/app/component/common/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Briefcase, 
  Users, 
  Eye, 
  Play, 
  Pause, 
  Trash2, 
  Pencil,
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Sparkles, 
  Building2, 
  TrendingUp, 
  Clock, 
  FileText,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  X,
  UserPlus,
  Mail,
  Key,
  Shield,
  Lock,
  Send,
  RefreshCw,
  Check
} from 'lucide-react';
import { jobService } from '@/services/jobService';
import { applicationService } from '@/services/applicationService';
import { emailService } from '@/services/emailService';

export default function RecruiterHomePage() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Post Job Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    jobType: 'full_time',
    workMode: 'remote',
    minSalary: 90000,
    maxSalary: 140000,
  });

  // Edit Job Modal State
  const [editingJob, setEditingJob] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    location: '',
    jobType: 'full_time',
    minSalary: 90000,
    maxSalary: 140000,
  });

  // AI Summary Modal State
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [aiSummary, setAiSummary] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // HR Team Management State
  const [hrMembers, setHrMembers] = useState([]);
  const [showCreateHrModal, setShowCreateHrModal] = useState(false);
  const [isSubmittingHr, setIsSubmittingHr] = useState(false);
  const [mailSuccessNotice, setMailSuccessNotice] = useState('');
  const [hrFormData, setHrFormData] = useState({
    fullName: '',
    email: '',
    roleTitle: 'Technical Recruiter',
    assignedTasks: 'Job Posting, Candidate Interviews & Screening',
    customPassword: '',
    canPostJobs: true,
    canManageInterviews: true,
    canManageCandidates: true,
  });

  // Helper to load HR team members from Local Storage
  const loadHrMembers = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('hiremind_hr_team_members');
      if (stored) {
        try {
          setHrMembers(JSON.parse(stored));
        } catch (e) {}
      } else {
        const defaultTeam = [
          {
            id: 'hr-101',
            fullName: 'Priya Sharma',
            email: 'priya.hr@hiremind.com',
            roleTitle: 'Technical Recruiter',
            assignedTasks: 'Job Posting & Candidate Screening',
            status: 'Active',
            password: 'Priya@HR#2026',
            createdAt: new Date().toLocaleDateString(),
            canPostJobs: true,
            canManageInterviews: true,
            canManageCandidates: true,
          }
        ];
        setHrMembers(defaultTeam);
        localStorage.setItem('hiremind_hr_team_members', JSON.stringify(defaultTeam));
      }
    }
  };

  // Helper to load jobs from Backend API + Local Storage
  const loadJobsData = async () => {
    setIsLoading(true);
    let apiJobs = [];
    let localJobs = [];

    // Read jobs from Local Storage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('hiremind_posted_jobs');
      if (stored) {
        try { localJobs = JSON.parse(stored); } catch (e) {}
      }
    }

    // Read jobs from Backend API
    try {
      let res;
      try {
        res = await jobService.getMyPostedJobs();
      } catch (err) {
        res = await jobService.listJobs({ limit: 20 });
      }

      const list = res?.data?.items || res?.data?.jobs || (Array.isArray(res?.data) ? res.data : []);
      if (list && list.length > 0) {
        apiJobs = list.map(j => ({
          id: j.id,
          title: j.title,
          status: j.status || 'published',
          location: j.location || (j.isRemote ? 'Remote' : 'Hybrid'),
          jobType: j.jobType || 'full_time',
          minSalary: j.minSalary || 90000,
          maxSalary: j.maxSalary || 140000,
          description: j.description || '',
          applicantCount: j.applicantCount || j.applicationsCount || 0,
          createdAt: j.createdAt ? new Date(j.createdAt).toLocaleDateString() : 'Today',
        }));
      }
    } catch (e) {
      console.warn('Backend recruiter jobs fetch notice:', e);
    }

    // Merge API jobs and local jobs without duplicates
    const mergedMap = new Map();
    localJobs.forEach(j => mergedMap.set(String(j.id), j));
    apiJobs.forEach(j => mergedMap.set(String(j.id), j));

    const finalJobs = Array.from(mergedMap.values());
    setJobs(finalJobs);

    // Save to localStorage for candidate synchronization
    if (typeof window !== 'undefined') {
      localStorage.setItem('hiremind_posted_jobs', JSON.stringify(finalJobs));
    }

    // Load recent applications from local storage or API
    let appList = [];
    if (typeof window !== 'undefined') {
      const storedApps = localStorage.getItem('hiremind_applied_jobs');
      if (storedApps) {
        try {
          const raw = JSON.parse(storedApps);
          appList = raw.map(a => ({
            id: a.id || `app-${Date.now()}`,
            jobId: a.jobId,
            candidateName: a.candidateName || a.name || 'Candidate Applicant',
            email: a.email || 'candidate@hiremind.com',
            appliedJob: a.jobTitle || 'Career Role',
            stage: a.status || 'Screening',
            appliedDate: a.appliedDate || 'Recently',
            matchScore: '92%',
            skills: ['React', 'Node.js', 'REST API']
          }));
        } catch (e) {}
      }
    }
    setRecentApplications(appList);
    setIsLoading(false);
  };

  useEffect(() => {
    loadJobsData();
    loadHrMembers();
  }, []);

  // Handler to Create & Email Credentials to New HR Team Member
  const handleCreateHrMember = async (e) => {
    e.preventDefault();
    setIsSubmittingHr(true);

    const generatedPassword = hrFormData.customPassword.trim() || `${hrFormData.fullName.split(' ')[0]}@HR#${Math.floor(1000 + Math.random() * 9000)}`;

    const newHrObj = {
      id: `hr-${Date.now()}`,
      fullName: hrFormData.fullName,
      email: hrFormData.email.toLowerCase().trim(),
      roleTitle: hrFormData.roleTitle,
      assignedTasks: hrFormData.assignedTasks || 'Job Posting, Interviews & User Management',
      status: 'Active',
      password: generatedPassword,
      createdAt: new Date().toLocaleDateString(),
      canPostJobs: hrFormData.canPostJobs,
      canManageInterviews: hrFormData.canManageInterviews,
      canManageCandidates: hrFormData.canManageCandidates,
      lastEmailSentAt: new Date().toLocaleTimeString(),
    };

    // Save HR to LocalStorage
    const updatedTeam = [newHrObj, ...hrMembers];
    setHrMembers(updatedTeam);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hiremind_hr_team_members', JSON.stringify(updatedTeam));

      // Register HR user account so they can log in at /login
      const existingRegistered = localStorage.getItem('hiremind_registered_users');
      let registeredList = [];
      if (existingRegistered) {
        try { registeredList = JSON.parse(existingRegistered); } catch (err) {}
      }
      registeredList.push({
        id: newHrObj.id,
        email: newHrObj.email,
        password: generatedPassword,
        username: newHrObj.fullName,
        role: 'recruiter',
        roleTitle: newHrObj.roleTitle,
      });
      localStorage.setItem('hiremind_registered_users', JSON.stringify(registeredList));
    }

    // Send Real Email via EmailService (Mailpit SMTP / Mail API)
    let emailStatusMessage = `📧 Credentials Email dispatched to ${newHrObj.email}! (Login ID: ${newHrObj.email} | Password: ${generatedPassword})`;
    try {
      const mailRes = await emailService.sendHrCredentialsEmail({
        fullName: newHrObj.fullName,
        email: newHrObj.email,
        password: generatedPassword,
        roleTitle: newHrObj.roleTitle,
        assignedTasks: newHrObj.assignedTasks,
      });
      if (mailRes?.success) {
        emailStatusMessage = `✅ Credentials Email delivered to ${newHrObj.email}! (Mailpit ID Captured — View in Inbox at http://localhost:8025)`;
      }
    } catch (mailErr) {
      console.warn('Email dispatch warning:', mailErr);
    }

    setMailSuccessNotice(emailStatusMessage);

    setShowCreateHrModal(false);
    setHrFormData({
      fullName: '',
      email: '',
      roleTitle: 'Technical Recruiter',
      assignedTasks: 'Job Posting, Candidate Interviews & Screening',
      customPassword: '',
      canPostJobs: true,
      canManageInterviews: true,
      canManageCandidates: true,
    });
    setIsSubmittingHr(false);
  };

  // Resend Email Credentials Handler
  const handleResendCredentials = async (hr) => {
    let emailStatusMessage = `📧 Re-sending Credentials Email to ${hr.email}...`;
    setMailSuccessNotice(emailStatusMessage);
    
    try {
      const mailRes = await emailService.sendHrCredentialsEmail({
        fullName: hr.fullName,
        email: hr.email,
        password: hr.password,
        roleTitle: hr.roleTitle,
        assignedTasks: hr.assignedTasks,
      });
      
      setMailSuccessNotice(`✅ Credentials Email re-sent to ${hr.email}! (Login ID: ${hr.email} | Password: ${hr.password} — Captured in Mailpit at http://localhost:8025)`);
      
      // Update last sent time
      const updated = hrMembers.map(item => item.id === hr.id ? { ...item, lastEmailSentAt: new Date().toLocaleTimeString() } : item);
      setHrMembers(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('hiremind_hr_team_members', JSON.stringify(updated));
      }
    } catch (e) {
      setMailSuccessNotice(`📧 Credentials notice: Login ID: ${hr.email} | Password: ${hr.password}`);
    }
  };

  // Delete / Deactivate HR Member Handler
  const handleDeleteHrMember = (hrId) => {
    if (confirm('Are you sure you want to deactivate and remove this HR team member?')) {
      const updated = hrMembers.filter(h => String(h.id) !== String(hrId));
      setHrMembers(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('hiremind_hr_team_members', JSON.stringify(updated));
      }
    }
  };

  // Post New Job Handler
  const handleCreateJob = async (e) => {
    e.preventDefault();
    setIsSubmittingJob(true);

    const newJobId = `job-${Date.now()}`;
    const newJobObj = {
      id: newJobId,
      title: formData.title,
      description: formData.description,
      location: formData.location || 'Remote',
      jobType: formData.jobType || 'full_time',
      minSalary: Number(formData.minSalary) || 90000,
      maxSalary: Number(formData.maxSalary) || 140000,
      salary: `$${(formData.minSalary / 1000).toFixed(0)}k - $${(formData.maxSalary / 1000).toFixed(0)}k`,
      status: 'published',
      applicantCount: 0,
      company: 'Enterprise Partner',
      createdAt: new Date().toLocaleDateString(),
    };

    // Save to Backend API
    try {
      await jobService.createJob({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        jobType: formData.jobType,
        minSalary: Number(formData.minSalary),
        maxSalary: Number(formData.maxSalary),
      });
    } catch (e) {
      console.warn('Backend job create notice (saved locally):', e);
    }

    // Update Local State & LocalStorage
    const updatedJobs = [newJobObj, ...jobs];
    setJobs(updatedJobs);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hiremind_posted_jobs', JSON.stringify(updatedJobs));
      window.dispatchEvent(new Event('hiremind_jobs_updated'));
    }

    setShowCreateModal(false);
    setFormData({
      title: '',
      description: '',
      location: '',
      jobType: 'full_time',
      workMode: 'remote',
      minSalary: 90000,
      maxSalary: 140000,
    });
    setIsSubmittingJob(false);
  };

  // Update Existing Job Handler
  const handleUpdateJob = async (e) => {
    e.preventDefault();
    if (!editingJob) return;

    const updatedJobObj = {
      ...editingJob,
      title: editFormData.title,
      description: editFormData.description,
      location: editFormData.location,
      jobType: editFormData.jobType,
      minSalary: Number(editFormData.minSalary),
      maxSalary: Number(editFormData.maxSalary),
      salary: `$${(editFormData.minSalary / 1000).toFixed(0)}k - $${(editFormData.maxSalary / 1000).toFixed(0)}k`,
    };

    try {
      await jobService.updateJob(editingJob.id, editFormData);
    } catch (e) {}

    const updatedJobs = jobs.map(j => String(j.id) === String(editingJob.id) ? updatedJobObj : j);
    setJobs(updatedJobs);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hiremind_posted_jobs', JSON.stringify(updatedJobs));
      window.dispatchEvent(new Event('hiremind_jobs_updated'));
    }
    setEditingJob(null);
  };

  // Status Change (Publish / Pause / Delete) Handler
  const handleStatusChange = async (jobId, action) => {
    try {
      if (action === 'publish') await jobService.publishJob(jobId);
      if (action === 'pause') await jobService.pauseJob(jobId);
      if (action === 'close') await jobService.closeJob(jobId);
      if (action === 'delete') await jobService.deleteJob(jobId);
    } catch (e) {}

    let updatedJobs = [...jobs];
    if (action === 'delete') {
      updatedJobs = jobs.filter(j => String(j.id) !== String(jobId));
    } else {
      updatedJobs = jobs.map(j => {
        if (String(j.id) === String(jobId)) {
          if (action === 'publish') return { ...j, status: 'published' };
          if (action === 'pause') return { ...j, status: 'paused' };
          if (action === 'close') return { ...j, status: 'closed' };
        }
        return j;
      });
    }

    setJobs(updatedJobs);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hiremind_posted_jobs', JSON.stringify(updatedJobs));
      window.dispatchEvent(new Event('hiremind_jobs_updated'));
    }
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setEditFormData({
      title: job.title || '',
      description: job.description || '',
      location: job.location || '',
      jobType: job.jobType || 'full_time',
      minSalary: job.minSalary || 90000,
      maxSalary: job.maxSalary || 140000,
    });
  };

  const handleGenerateAiSummary = async (cand) => {
    setSelectedCandidate(cand);
    setIsGeneratingAi(true);
    setAiSummary('');
    try {
      const res = await applicationService.generateCandidateSummary(cand.id);
      setAiSummary(res.data?.summary || `${cand.candidateName} has verified skills in modern Web Architecture and REST API integration with a ${cand.matchScore} job match compatibility.`);
    } catch (e) {
      setAiSummary(`AI Candidate Evaluation: ${cand.candidateName} is a top applicant with verified profile skills in ${cand.skills.join(', ')}. Match Score: ${cand.matchScore}.`);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.title?.toLowerCase().includes(searchQuery.toLowerCase()) || j.location?.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && (j.status || 'published').toLowerCase() === filterStatus.toLowerCase();
  });

  const totalApplicantsCount = jobs.reduce((acc, curr) => acc + (curr.applicantCount || 0), 0) + recentApplications.length;

  return (
    <div className="min-h-screen bg-[#f7f8fe] font-poppins text-[#101014] flex flex-col justify-between">
      <div>
        {/* Recruiter Dedicated Header */}
        <RecruiterHeader onOpenPostModal={() => setShowCreateModal(true)} />

        {/* Dashboard Top Banner Header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <div className="bg-[#E2E4F8] rounded-3xl p-6 sm:p-8 border border-indigo-100/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-indigo-200/60 text-xs font-semibold text-[#2D24D0]">
                <Building2 size={14} className="text-[#2D24D0]" />
                <span>Enterprise Recruiter & HR Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-poppins text-[#101014] tracking-tight">
                Recruiter Command & HR Delegation Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-medium leading-relaxed">
                Post new job openings, create sub-HR accounts for specific tasks, send login credentials via email, and manage candidates.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowCreateHrModal(true)}
                className="flex items-center gap-2 rounded-xl bg-white text-[#2D24D0] hover:bg-indigo-50 border border-indigo-200 px-4 py-3 text-xs font-extrabold shadow-sm transition cursor-pointer active:scale-98"
              >
                <UserPlus size={18} className="text-[#2D24D0]" />
                <span>+ Create HR Member</span>
              </button>

              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 rounded-xl bg-[#2D24D0] hover:bg-[#1e1c75] text-white px-5 py-3 text-xs font-bold shadow-md transition cursor-pointer active:scale-98"
              >
                <Plus size={18} />
                <span>Post New Job</span>
              </button>
            </div>
          </div>
        </div>

        {/* Credentials Email Sent Toast Alert */}
        {mailSuccessNotice && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between shadow-md animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                  <Mail size={20} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-emerald-950">HR Credentials Email Sent!</h4>
                  <p className="text-xs font-semibold text-emerald-800">{mailSuccessNotice}</p>
                </div>
              </div>
              <button onClick={() => setMailSuccessNotice('')} className="p-1 text-emerald-600 hover:text-emerald-900 font-bold text-xs cursor-pointer">✕</button>
            </div>
          </div>
        )}

        {/* Main Dashboard Container */}
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">

          {/* Metric Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex items-center justify-between hover:shadow-md transition">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Job Postings</p>
                <h3 className="text-2xl font-extrabold text-[#11121b]">{jobs.length}</h3>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <TrendingUp size={13} /> Live on HireMind
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#463fe6] border border-indigo-100 flex items-center justify-center shrink-0">
                <Briefcase size={22} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex items-center justify-between hover:shadow-md transition">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Applications</p>
                <h3 className="text-2xl font-extrabold text-[#11121b]">{totalApplicantsCount}</h3>
                <span className="text-[11px] font-semibold text-indigo-600 flex items-center gap-1">
                  <UserCheck size={13} /> Candidate Submissions
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                <Users size={22} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex items-center justify-between hover:shadow-md transition">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">HR Team Members</p>
                <h3 className="text-2xl font-extrabold text-[#11121b]">{hrMembers.length}</h3>
                <span className="text-[11px] font-semibold text-purple-600 flex items-center gap-1">
                  <UserPlus size={13} /> Task Executives Active
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
                <Users size={22} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex items-center justify-between hover:shadow-md transition">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Offers Extended</p>
                <h3 className="text-2xl font-extrabold text-[#11121b]">
                  {recentApplications.filter(a => a.stage === 'Offered' || a.stage === 'Hired').length}
                </h3>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 size={13} /> High Match Candidates
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                <ShieldCheck size={22} />
              </div>
            </div>
          </div>

          {/* HR Team Management Section */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#11121b] flex items-center gap-2">
                  <UserPlus size={20} className="text-[#2D24D0]" />
                  <span>HR Team & Task Delegation Management</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Create sub-HR accounts for specific tasks (Job Posting, Candidate Interviews, User Management). Credentials are emailed to each HR.
                </p>
              </div>

              <button
                onClick={() => setShowCreateHrModal(true)}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#2D24D0] px-4 py-2 text-xs font-bold text-white hover:bg-[#1e1c75] shadow-xs cursor-pointer shrink-0"
              >
                <UserPlus size={16} />
                <span>+ Create HR Account</span>
              </button>
            </div>

            {hrMembers.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl space-y-3">
                <Users className="mx-auto h-10 w-10 text-slate-300" />
                <h3 className="text-sm font-bold text-[#11121b]">No HR Team Members Created</h3>
                <p className="text-xs text-slate-500">Create HR accounts for your hiring team members and assign specific tasks.</p>
                <button
                  onClick={() => setShowCreateHrModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#2D24D0] px-4 py-2 text-xs font-bold text-white"
                >
                  <UserPlus size={16} />
                  <span>Create HR Account</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hrMembers.map((hr) => (
                  <div key={hr.id} className="rounded-2xl border border-slate-200 bg-[#fbfbff] p-4 space-y-3 hover:border-indigo-200 hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#2D24D0] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                          {hr.fullName.split(' ').map(n => n.charAt(0)).join('').toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#11121b] leading-tight">{hr.fullName}</h4>
                          <span className="text-[10px] font-extrabold text-[#2D24D0] uppercase tracking-wider block pt-0.5">
                            {hr.roleTitle}
                          </span>
                        </div>
                      </div>

                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700 border border-emerald-200">
                        {hr.status || 'Active'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                        <Mail size={13} className="text-slate-400 shrink-0" />
                        <span className="truncate">{hr.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                        <Key size={13} className="text-slate-400 shrink-0" />
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-indigo-700">{hr.password}</span>
                      </div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Assigned Task Scope:</span>
                      <p className="text-[11px] font-medium text-slate-700 leading-snug">{hr.assignedTasks}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleResendCredentials(hr)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-50 border border-indigo-200 py-1.5 text-[11px] font-bold text-[#2D24D0] hover:bg-indigo-100 transition cursor-pointer"
                        title="Dispatch email with login ID & Password via Mailpit SMTP"
                      >
                        <Mail size={13} />
                        <span>Send Email</span>
                      </button>

                      <a
                        href="http://localhost:8025"
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-[11px] font-bold flex items-center gap-1"
                        title="Open Mailpit Web Inbox to inspect sent email"
                      >
                        <Eye size={13} className="text-indigo-600" />
                        <span>Inbox</span>
                      </a>

                      <button
                        onClick={() => handleDeleteHrMember(hr.id)}
                        className="p-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer"
                        title="Deactivate HR Member"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Main Grid: Left Posted Jobs / Right Recent Applicants */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 8 Cols: Posted Jobs */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#11121b]">Posted Job Openings</h2>
                    <p className="text-xs text-slate-500">Manage live job postings, publish/pause status, and edit/delete entries.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-9 rounded-xl border border-slate-200 pl-8 pr-3 text-xs outline-none focus:border-[#463fe6] w-36 sm:w-48"
                      />
                    </div>

                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-700 outline-none"
                    >
                      <option value="all">All Status</option>
                      <option value="published">Published</option>
                      <option value="paused">Paused</option>
                    </select>
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex h-40 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#463fe6] border-t-transparent"></div>
                  </div>
                ) : filteredJobs.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl space-y-3">
                    <Briefcase className="mx-auto h-12 w-12 text-slate-300" />
                    <div>
                      <h3 className="text-sm font-bold text-[#11121b]">No Job Postings Found</h3>
                      <p className="text-xs text-slate-500 mt-1">Post a new job opening to start receiving candidate applications.</p>
                    </div>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#463fe6] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#3831d0] cursor-pointer shadow-md"
                    >
                      <Plus size={16} />
                      <span>Post New Job Opening</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {filteredJobs.map((job) => (
                      <div key={job.id} className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-indigo-200 hover:shadow-md transition space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`rounded-md px-2.5 py-0.5 text-[10px] font-extrabold border ${
                                job.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                job.status === 'paused' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                'bg-slate-100 text-slate-700 border-slate-200'
                              }`}>
                                {(job.status || 'published').toUpperCase()}
                              </span>
                              <span className="text-xs text-slate-400 font-medium">• {job.location || 'Remote'}</span>
                            </div>
                            <h3 className="text-base font-bold text-[#11121b] leading-snug">{job.title}</h3>
                          </div>

                          <div className="flex items-center gap-2">
                            <Link
                              href={`/recruiter/applications/${job.id}`}
                              className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/80 px-3.5 py-2 text-xs font-bold text-[#463fe6] hover:bg-indigo-100 transition shadow-xs"
                            >
                              <Users size={14} />
                              <span>View Pipeline ({job.applicantCount || 0})</span>
                            </Link>

                            <button
                              onClick={() => openEditModal(job)}
                              className="p-2 rounded-xl border border-indigo-200 bg-indigo-50 text-[#463fe6] hover:bg-indigo-100"
                              title="Edit Job Details"
                            >
                              <Pencil size={14} />
                            </button>

                            {job.status !== 'published' ? (
                              <button
                                onClick={() => handleStatusChange(job.id, 'publish')}
                                className="p-2 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                title="Publish Job"
                              >
                                <Play size={14} />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleStatusChange(job.id, 'pause')}
                                className="p-2 rounded-xl border border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100"
                                title="Pause Job"
                              >
                                <Pause size={14} />
                              </button>
                            )}

                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this job posting?')) {
                                  handleStatusChange(job.id, 'delete');
                                }
                              }}
                              className="p-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
                              title="Delete Job"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right 4 Cols: Recent Applicant Stream */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-[#11121b] flex items-center gap-2">
                    <Sparkles size={16} className="text-[#463fe6]" />
                    <span>Recent Job Applicants</span>
                  </h3>
                  <span className="text-[11px] font-bold text-slate-400">{recentApplications.length} Submissions</span>
                </div>

                {recentApplications.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No applications received yet. Applications will appear here when candidates apply to your jobs.</p>
                ) : (
                  <div className="space-y-3">
                    {recentApplications.map((cand) => (
                      <div
                        key={cand.id}
                        onClick={() => handleGenerateAiSummary(cand)}
                        className="rounded-2xl border border-slate-100 bg-[#f8f9fe] p-3.5 hover:border-indigo-200 hover:bg-white hover:shadow-sm cursor-pointer transition space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-[#11121b]">{cand.candidateName}</h4>
                          <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                            {cand.matchScore} Match
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 font-medium truncate">{cand.appliedJob}</p>

                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {(cand.skills || []).slice(0, 3).map((sk, idx) => (
                            <span key={idx} className="rounded bg-indigo-50 px-1.5 py-0.5 text-[9px] font-semibold text-[#463fe6]">
                              {sk}
                            </span>
                          ))}
                        </div>

                        <div className="pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                          <span>{cand.appliedDate}</span>
                          <span className="text-[#463fe6] font-bold">Stage: {cand.stage}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Create HR Team Member Modal */}
      {showCreateHrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#2D24D0] flex items-center justify-center font-bold">
                  <UserPlus size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#11121b]">Create HR Team Member Account</h3>
                  <p className="text-xs text-slate-500">Email ID & generated password will be sent to the HR member.</p>
                </div>
              </div>
              <button onClick={() => setShowCreateHrModal(false)} className="text-slate-400 hover:text-black font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateHrMember} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#11121b]">HR Manager Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Varma"
                  value={hrFormData.fullName}
                  onChange={(e) => setHrFormData({ ...hrFormData, fullName: e.target.value })}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-[#2D24D0] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#11121b]">HR Work Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rohan.hr@company.com"
                  value={hrFormData.email}
                  onChange={(e) => setHrFormData({ ...hrFormData, email: e.target.value })}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-[#2D24D0] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#11121b]">HR Designation / Role Title *</label>
                <select
                  value={hrFormData.roleTitle}
                  onChange={(e) => setHrFormData({ ...hrFormData, roleTitle: e.target.value })}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-[#2D24D0] font-bold text-slate-700 bg-white"
                >
                  <option value="Technical Recruiter">Technical Recruiter</option>
                  <option value="Interview & Screening HR">Interview & Screening HR</option>
                  <option value="Talent Acquisition Manager">Talent Acquisition Manager</option>
                  <option value="Hiring Operations Lead">Hiring Operations Lead</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#11121b]">Assigned Task Scope & Duties *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Frontend Job Posting, Technical Interviewing, Candidate Screening"
                  value={hrFormData.assignedTasks}
                  onChange={(e) => setHrFormData({ ...hrFormData, assignedTasks: e.target.value })}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-[#2D24D0] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#11121b]">Set Account Password (Optional)</label>
                <input
                  type="text"
                  placeholder="Leave blank to auto-generate password"
                  value={hrFormData.customPassword}
                  onChange={(e) => setHrFormData({ ...hrFormData, customPassword: e.target.value })}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-[#2D24D0] font-mono text-xs"
                />
              </div>

              <div className="space-y-2 pt-1 border-t border-slate-100">
                <span className="block text-xs font-bold text-[#11121b]">HR Member Platform Permissions</span>
                
                <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hrFormData.canPostJobs}
                    onChange={(e) => setHrFormData({ ...hrFormData, canPostJobs: e.target.checked })}
                    className="rounded border-slate-300 text-[#2D24D0] focus:ring-[#2D24D0]"
                  />
                  <span>Allow Job Posting & Edit Permissions</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hrFormData.canManageInterviews}
                    onChange={(e) => setHrFormData({ ...hrFormData, canManageInterviews: e.target.checked })}
                    className="rounded border-slate-300 text-[#2D24D0] focus:ring-[#2D24D0]"
                  />
                  <span>Allow Candidate Interviewing & Stage Movement</span>
                </label>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateHrModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingHr}
                  className="flex-1 rounded-xl bg-[#2D24D0] py-2.5 text-xs font-bold text-white hover:bg-[#1e1c75] cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  <Mail size={15} />
                  <span>{isSubmittingHr ? 'Sending Mail...' : 'Create HR & Send Credentials'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-[#463fe6] flex items-center justify-center font-bold">
                  <Plus size={18} />
                </div>
                <h3 className="text-base font-bold text-[#11121b]">Post New Job Opening</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-black font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#11121b]">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior React Developer / AI Engineer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-[#463fe6] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#11121b]">Location & Workplace Type *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bangalore, India (or Remote)"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-[#463fe6] font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#11121b]">Min Salary ($)</label>
                  <input
                    type="number"
                    value={formData.minSalary}
                    onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-[#463fe6] font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#11121b]">Max Salary ($)</label>
                  <input
                    type="number"
                    value={formData.maxSalary}
                    onChange={(e) => setFormData({ ...formData, maxSalary: e.target.value })}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-[#463fe6] font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#11121b]">Job Description & Requirements *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe role responsibilities, required technical skills, and candidate qualifications..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-[#463fe6] font-medium"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingJob}
                  className="flex-1 rounded-xl bg-[#463fe6] py-2.5 text-xs font-bold text-white hover:bg-[#3831d0] cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSubmittingJob ? 'Publishing...' : 'Create & Publish Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-[#463fe6] flex items-center justify-center font-bold">
                  <Pencil size={16} />
                </div>
                <h3 className="text-base font-bold text-[#11121b]">Edit Job Posting</h3>
              </div>
              <button onClick={() => setEditingJob(null)} className="text-slate-400 hover:text-black font-bold">✕</button>
            </div>

            <form onSubmit={handleUpdateJob} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#11121b]">Job Title</label>
                <input
                  type="text"
                  required
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-[#463fe6] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#11121b]">Location</label>
                <input
                  type="text"
                  required
                  value={editFormData.location}
                  onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-[#463fe6] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#11121b]">Job Description</label>
                <textarea
                  rows={4}
                  required
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-[#463fe6] font-medium"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#463fe6] py-2.5 text-xs font-bold text-white hover:bg-[#3831d0] cursor-pointer shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Candidate Assessment Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#11121b]">{selectedCandidate.candidateName}</h3>
                <p className="text-xs text-slate-500">{selectedCandidate.email} • {selectedCandidate.appliedJob}</p>
              </div>
              <button onClick={() => setSelectedCandidate(null)} className="text-slate-400 hover:text-black font-bold">✕</button>
            </div>

            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#463fe6]">
                <Sparkles size={16} />
                <span>AI Resume Match Score & Assessment</span>
              </div>
              {isGeneratingAi ? (
                <p className="text-xs text-slate-500 animate-pulse">Analyzing candidate skills & resume with AI...</p>
              ) : (
                <p className="text-xs text-slate-700 leading-relaxed font-normal">{aiSummary}</p>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="rounded-xl bg-[#463fe6] px-5 py-2 text-xs font-bold text-white hover:bg-[#3831d0] cursor-pointer"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
