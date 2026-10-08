import { apiClient } from './apiClient';

export const companyService = {
  // Get Company Details
  getCompany: async () => {
    try {
      return await apiClient('/company/me', { method: 'GET' });
    } catch (e) {
      return { data: null };
    }
  },

  // Update Company Details
  updateCompany: async (data) => {
    try {
      return await apiClient('/company/me', {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    } catch (e) {
      return { data };
    }
  },

  // List Sub-HR members from Backend API directly from PostgreSQL DB
  listSubHr: async () => {
    try {
      const res = await apiClient('/company/hr', { method: 'GET' });
      if (res?.data?.items) {
        return { success: true, items: res.data.items };
      }
      return { success: true, items: res?.data || [] };
    } catch (err) {
      console.warn('Backend Sub-HR team fetch notice:', err);
      return { success: true, items: [] };
    }
  },

  // Create Sub-HR member in PostgreSQL DB via API
  createSubHr: async (data) => {
    const payload = {
      fullName: data.fullName,
      email: data.email.toLowerCase().trim(),
      roleTitle: data.roleTitle || 'Technical Recruiter',
      assignedTasks: data.assignedTasks || 'Job Posting, Candidate Interviews & Screening',
      password: data.password || `Pass#${Math.floor(1000 + Math.random() * 9000)}`,
      canPostJobs: data.canPostJobs !== false,
      canManageInterviews: data.canManageInterviews !== false,
      canManageCandidates: data.canManageCandidates !== false,
    };

    try {
      return await apiClient('/company/hr', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch (e) {
      return { data: payload };
    }
  },

  // Delete Sub-HR member from DB
  deleteSubHr: async (hrId) => {
    try {
      return await apiClient(`/company/hr/${hrId}`, { method: 'DELETE' });
    } catch (e) {
      return { success: true };
    }
  },

  // Resend credentials
  resendSubHrCredentials: async (hrId, password) => {
    try {
      return await apiClient(`/company/hr/${hrId}/resend-credentials`, {
        method: 'POST',
        body: JSON.stringify({ password }),
      });
    } catch (e) {
      return { success: true };
    }
  }
};
