"use client";

import React, { useState, useEffect } from 'react';
import RecruiterHeader from '@/app/component/common/RecruiterHeader';
import Footer from '@/app/component/common/Footer';
import Link from 'next/link';
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
  Search
} from 'lucide-react';
import { jobService } from '@/services/jobService';

export default function RecruiterJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Post Job Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    jobType: 'full_time',
    workMode: 'remote',
    minSalary: 80000,
    maxSalary: 120000,
  });

  // Edit Job Modal State
  const [editingJob, setEditingJob] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    location: '',
    jobType: 'full_time',
    minSalary: 80000,
    maxSalary: 120000,
  });

  const [errorMsg, setErrorMsg] = useState('');

  const loadJobs = async () => {
    setIsLoading(true);
    let apiJobs = [];

    // Read jobs strictly from Backend API
    try {
      let res;
      try {
        res = await jobService.getMyPostedJobs();
      } catch (err) {
        res = await jobService.listJobs({ limit: 50 });
      }

      const list = res?.data?.items || res?.data?.jobs || (Array.isArray(res?.data) ? res.data : []);
      if (list && list.length > 0) {
        apiJobs = list.map(j => ({
          id: j.id,
          title: j.title,
          status: j.status || 'published',
          location: j.location || (j.isRemote ? 'Remote' : 'Hybrid'),
          jobType: j.jobType || 'full_time',
          minSalary: j.minSalary || 80000,
          maxSalary: j.maxSalary || 120000,
          description: j.description || '',
          applicantCount: j.applicantCount || j.applicationsCount || 0,
          createdAt: j.createdAt ? new Date(j.createdAt).toLocaleDateString() : 'Today',
        }));
      }
    } catch (e) {
      console.warn('Backend recruiter jobs fetch notice:', e);
    }

    setJobs(prev => {
      const mergedMap = new Map();
      // Keep optimistic items already added in current session
      prev.forEach(j => mergedMap.set(String(j.id), j));
      apiJobs.forEach(j => mergedMap.set(String(j.id), j));
      return Array.from(mergedMap.values());
    });
    setIsLoading(false);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await jobService.createJob({
        title: formData.title,
        shortDescription: formData.description?.slice(0, 150) || formData.title,
        description: formData.description,
        location: formData.location || 'Remote',
        jobType: formData.jobType || 'full_time',
      });

      const createdJob = res?.data || {};
      const newJobItem = {
        id: createdJob.id || `job-${Date.now()}`,
        title: createdJob.title || formData.title,
        status: createdJob.status || 'published',
        location: createdJob.location || formData.location || 'Remote',
        jobType: createdJob.jobType || formData.jobType || 'full_time',
        minSalary: createdJob.minSalary || formData.minSalary || 80000,
        maxSalary: createdJob.maxSalary || formData.maxSalary || 120000,
        description: createdJob.description || formData.description || '',
        applicantCount: 0,
        createdAt: createdJob.createdAt ? new Date(createdJob.createdAt).toLocaleDateString() : 'Just now',
      };

      if (createdJob.id) {
        try {
          await jobService.publishJob(createdJob.id);
          newJobItem.status = 'published';
        } catch (pubErr) {}
      }

      // Optimistically push to UI state immediately
      setJobs(prev => [newJobItem, ...prev.filter(j => String(j.id) !== String(newJobItem.id))]);

      setShowCreateModal(false);
      setFormData({
        title: '',
        description: '',
        location: '',
        jobType: 'full_time',
        workMode: 'remote',
        minSalary: 80000,
        maxSalary: 120000,
      });

      await loadJobs();
    } catch (err) {
      console.error("Failed to create job:", err);
      setErrorMsg(err.message || 'Failed to create job on server. Please check your credentials.');
    }
  };

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
    };

    try {
      await jobService.updateJob(editingJob.id, editFormData);
    } catch (e) {}

    const updatedJobs = jobs.map(j => String(j.id) === String(editingJob.id) ? updatedJobObj : j);
    setJobs(updatedJobs);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hiremind_posted_jobs', JSON.stringify(updatedJobs));
    }
    setEditingJob(null);
  };

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
    }
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setEditFormData({
      title: job.title || '',
      description: job.description || '',
      location: job.location || '',
      jobType: job.jobType || 'full_time',
      minSalary: job.minSalary || 80000,
      maxSalary: job.maxSalary || 120000,
    });
  };

  const filteredJobs = jobs.filter(j => 
    j.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    j.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f9ff] font-poppins text-[#101014] flex flex-col justify-between">
      <div>
        {/* Recruiter Dedicated Header */}
        <RecruiterHeader onOpenPostModal={() => setShowCreateModal(true)} />

        <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#11121b]">Recruiter Job Postings Manager</h1>
              <p className="mt-1 text-xs sm:text-sm text-[#66687a]">
                Publish new job openings, edit descriptions, pause listings, and view candidate applications.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 rounded-xl border border-slate-200 pl-8 pr-3 text-xs outline-none focus:border-[#463fe6] w-48"
                />
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#463fe6] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#3831d0] shadow-md shrink-0 cursor-pointer"
              >
                <Plus size={16} />
                <span>Post New Job</span>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#463fe6] border-t-transparent"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-14 border-2 border-dashed border-slate-200 rounded-3xl space-y-3 bg-white">
              <Briefcase className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="text-base font-bold text-[#11121b]">No Job Openings Found</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">Create a job posting to list vacancies and start reviewing candidate applications.</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#463fe6] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#3831d0] cursor-pointer shadow-md"
              >
                <Plus size={16} />
                <span>Post Your First Job</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold border ${
                          job.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          job.status === 'paused' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {(job.status || 'published').toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">• {job.location || 'Remote'}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#11121b]">{job.title}</h3>
                      <p className="text-xs text-slate-500 font-medium">Created: {job.createdAt || 'Recently'}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/recruiter/applications/${job.id}`}
                        className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-bold text-[#463fe6] hover:bg-indigo-100"
                      >
                        <Users size={14} />
                        <span>Applicants ({job.applicantCount || 0})</span>
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

          {/* Create Job Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
              <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-[#11121b]">Post a New Job Opening</h3>
                  <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-black font-bold">✕</button>
                </div>

                <form onSubmit={handleCreateJob} className="space-y-3">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-[#11121b]">Job Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior Frontend Engineer"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-[#463fe6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#11121b]">Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bangalore, India (or Remote)"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-[#463fe6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#11121b]">Job Description *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write job duties and requirements..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-[#463fe6]"
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
                      className="flex-1 rounded-xl bg-[#463fe6] py-2.5 text-xs font-bold text-white hover:bg-[#3831d0] cursor-pointer"
                    >
                      Create & Post Job
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
                  <h3 className="text-base font-bold text-[#11121b]">Edit Job Posting</h3>
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
                      className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-[#463fe6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#11121b]">Location</label>
                    <input
                      type="text"
                      required
                      value={editFormData.location}
                      onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                      className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-[#463fe6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#11121b]">Job Description</label>
                    <textarea
                      rows={4}
                      required
                      value={editFormData.description}
                      onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-[#463fe6]"
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
                      className="flex-1 rounded-xl bg-[#463fe6] py-2.5 text-xs font-bold text-white hover:bg-[#3831d0] cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
