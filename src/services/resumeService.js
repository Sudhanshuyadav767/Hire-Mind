import { apiClient } from './apiClient';

export const resumeService = {
  // Upload resume (PDF or DOCX), auto-parse, and return parsed autofill data
  uploadResume: async (file, title = '') => {
    const formData = new FormData();
    formData.append('file', file);
    if (title) formData.append('title', title);

    return apiClient('/profile/resume/upload', {
      method: 'POST',
      body: formData,
    });
  },

  // List all uploaded resumes for logged-in candidate
  listResumes: async () => {
    return apiClient('/profile/resumes', { method: 'GET' });
  },

  // Get parsed data for a specific resume
  getParseResult: async (resumeId) => {
    return apiClient(`/profile/resume/${resumeId}/parse`, { method: 'GET' });
  },

  // Set resume as primary
  setPrimary: async (resumeId) => {
    return apiClient(`/profile/resume/${resumeId}/primary`, { method: 'PATCH' });
  },

  // Delete resume
  deleteResume: async (resumeId) => {
    return apiClient(`/profile/resume/${resumeId}`, { method: 'DELETE' });
  },
};
