import { apiClient } from './apiClient';

export const applicationService = {
  // Candidate: Get My Applications
  getMyApplications: async (page = 1, limit = 10) => {
    return apiClient(`/applications/me?page=${page}&limit=${limit}`, { method: 'GET' });
  },

  // Candidate: Apply to Job
  applyToJob: async (jobId, data) => {
    return apiClient(`/jobs/${jobId}/apply`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get Application Timeline
  getTimeline: async (applicationId) => {
    return apiClient(`/applications/${applicationId}/timeline`, { method: 'GET' });
  },

  // Candidate: Withdraw Application
  withdrawApplication: async (applicationId, reason = '') => {
    return apiClient(`/applications/${applicationId}/withdraw`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },

  // Recruiter: Get Applications for Job
  getJobApplications: async (jobId, params = {}) => {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.stageId) query.append('stageId', params.stageId);
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit || 20);

    const queryString = query.toString();
    return apiClient(`/jobs/${jobId}/applications${queryString ? `?${queryString}` : ''}`, { method: 'GET' });
  },

  // Recruiter: Change Application Stage
  changeStage: async (applicationId, stageId, remarks = '') => {
    return apiClient(`/applications/${applicationId}/stage`, {
      method: 'PATCH',
      body: JSON.stringify({ stageId, remarks }),
    });
  },

  // Recruiter: Add Note to Application
  addNote: async (applicationId, note, isPrivate = false) => {
    return apiClient(`/applications/${applicationId}/notes`, {
      method: 'POST',
      body: JSON.stringify({ note, isPrivate }),
    });
  },

  // Recruiter: Update Application Labels
  updateLabels: async (applicationId, labels = []) => {
    return apiClient(`/applications/${applicationId}/labels`, {
      method: 'PATCH',
      body: JSON.stringify({ labels }),
    });
  },

  // Recruiter: Add Call Log
  addCallLog: async (applicationId, data) => {
    return apiClient(`/applications/${applicationId}/call-log`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Recruiter: Get Call Logs
  getCallLogs: async (applicationId) => {
    return apiClient(`/applications/${applicationId}/call-logs`, { method: 'GET' });
  },

  // Recruiter: Resume Views
  getResumeViews: async (applicationId) => {
    return apiClient(`/applications/${applicationId}/resume-views`, { method: 'GET' });
  },

  // Recruiter: Generate AI Candidate Summary
  generateCandidateSummary: async (applicationId) => {
    return apiClient(`/applications/${applicationId}/candidate-summary`, { method: 'POST' });
  },

  // Recruiter: Search Applications
  searchApplications: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.mobile) query.append('mobile', params.mobile);
    if (params.email) query.append('email', params.email);
    if (params.candidateId) query.append('candidateId', params.candidateId);
    if (params.resumeId) query.append('resumeId', params.resumeId);

    return apiClient(`/applications/search?${query.toString()}`, { method: 'GET' });
  },

  // Pipeline Stages
  getStages: async () => {
    return apiClient('/application-stages', { method: 'GET' });
  },

  createStage: async (data) => {
    return apiClient('/application-stages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  configureSla: async (data) => {
    return apiClient('/application-stages/sla', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
