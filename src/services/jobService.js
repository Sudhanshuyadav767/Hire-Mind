import { apiClient } from './apiClient';

export const jobService = {
  // List/Search Jobs (Public/Candidate)
  listJobs: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.category) query.append('category', params.category);
    if (params.jobType) query.append('jobType', params.jobType);
    if (params.workMode) query.append('workMode', params.workMode);
    if (params.location) query.append('location', params.location);
    if (params.minSalary) query.append('minSalary', params.minSalary);
    if (params.maxSalary) query.append('maxSalary', params.maxSalary);
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit || 10);

    const queryString = query.toString();
    return apiClient(`/jobs${queryString ? `?${queryString}` : ''}`, { method: 'GET' });
  },

  // Get Job Categories with Job Counts
  getCategories: async () => {
    return apiClient('/jobs/categories', { method: 'GET' });
  },

  // Recommended Jobs (Candidate)
  getRecommended: async () => {
    return apiClient('/jobs/recommended', { method: 'GET' });
  },

  // Saved Jobs (Candidate)
  getSavedJobs: async () => {
    return apiClient('/jobs/saved', { method: 'GET' });
  },

  // Save / Unsave Job
  toggleSaveJob: async (jobId) => {
    return apiClient(`/jobs/${jobId}/save`, { method: 'POST' });
  },

  // Create Job Alert
  createJobAlert: async (data) => {
    return apiClient('/jobs/alerts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Job Details by ID
  getJobDetail: async (jobId) => {
    return apiClient(`/jobs/${jobId}`, { method: 'GET' });
  },

  // Recruiter: Get My Posted Jobs
  getMyPostedJobs: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit || 10);
    const queryString = query.toString();
    return apiClient(`/jobs/mine${queryString ? `?${queryString}` : ''}`, { method: 'GET' });
  },

  // Company Owner: Get Org Jobs
  getOrgJobs: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit || 10);
    const queryString = query.toString();
    return apiClient(`/jobs/org${queryString ? `?${queryString}` : ''}`, { method: 'GET' });
  },

  // Create Job Posting (Recruiter)
  createJob: async (jobData) => {
    const rawTitle = (jobData.title || 'Software Engineer').trim();
    const title = rawTitle.length < 3 ? `${rawTitle} Role` : rawTitle;

    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const uniqueSlug = `${baseSlug}-${Date.now().toString(36)}`;

    // Ensure shortDescription is at least 10 chars, max 490 chars
    let rawShort = (jobData.shortDescription || jobData.description || title || 'Job vacancy at enterprise partner').trim();
    if (rawShort.length < 10) {
      rawShort = `${rawShort} position overview`;
    }
    const shortDescription = rawShort.slice(0, 490);

    // Ensure description is at least 20 chars
    let description = (jobData.description || '').trim();
    if (description.length < 20) {
      description = `${description ? `${description} - ` : ''}Full detailed job description for this position at our enterprise partner.`;
    }

    const payload = {
      categoryId: jobData.categoryId || 'c1bc3184-a78a-46ef-a184-1a4e10efac88',
      jobTypeId: jobData.jobTypeId || 'ba9ef4ae-e1d4-4a0f-b47f-ed29bcce3dd5',
      experienceLevelId: jobData.experienceLevelId || 'de1d0f7e-18d9-4a2f-a8e9-b0c3f1dcc8cf',
      title: title,
      slug: jobData.slug || uniqueSlug,
      shortDescription: shortDescription,
      description: description,
      workplaceType: jobData.workplaceType || (jobData.location?.toLowerCase().includes('remote') ? 'remote' : 'onsite'),
      isRemote: jobData.isRemote ?? (jobData.location?.toLowerCase().includes('remote') || false),
    };

    if (jobData.location && jobData.location.trim()) {
      payload.locations = [{
        country: 'India',
        city: jobData.location.trim()
      }];
    }

    if (jobData.minSalary) payload.minSalary = String(jobData.minSalary);
    if (jobData.maxSalary) payload.maxSalary = String(jobData.maxSalary);

    return apiClient('/jobs', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Update Job Posting
  updateJob: async (jobId, jobData) => {
    return apiClient(`/jobs/${jobId}`, {
      method: 'PATCH',
      body: JSON.stringify(jobData),
    });
  },

  // Publish Job
  publishJob: async (jobId) => {
    return apiClient(`/jobs/${jobId}/publish`, { method: 'PATCH' });
  },

  // Pause Job
  pauseJob: async (jobId) => {
    return apiClient(`/jobs/${jobId}/pause`, { method: 'PATCH' });
  },

  // Close Job
  closeJob: async (jobId) => {
    return apiClient(`/jobs/${jobId}/close`, { method: 'PATCH' });
  },

  // Archive Job
  archiveJob: async (jobId) => {
    return apiClient(`/jobs/${jobId}/archive`, { method: 'PATCH' });
  },

  // Delete Job
  deleteJob: async (jobId) => {
    return apiClient(`/jobs/${jobId}`, { method: 'DELETE' });
  },

  // Assign Job to HR (Company Owner)
  assignJobToHr: async (jobId, hrUserId) => {
    return apiClient(`/jobs/${jobId}/assign`, {
      method: 'PATCH',
      body: JSON.stringify({ hrUserId }),
    });
  },

  // Approve Job (Admin)
  approveJob: async (jobId) => {
    return apiClient(`/jobs/${jobId}/approve`, { method: 'PATCH' });
  },
};
