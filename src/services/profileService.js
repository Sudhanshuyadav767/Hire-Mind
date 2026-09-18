import { apiClient } from './apiClient';

export const profileService = {
  // Get Candidate Profile
  getProfile: async () => {
    return apiClient('/profile/me', { method: 'GET' });
  },

  // Update Profile Details
  updateProfile: async (data) => {
    return apiClient('/profile/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // Add Skill
  addSkill: async (name, level = 'intermediate', years = 1) => {
    return apiClient('/profile/skills', {
      method: 'POST',
      body: JSON.stringify({ name, level, years }),
    });
  },

  // Remove Skill
  removeSkill: async (skillId) => {
    return apiClient(`/profile/skills/${skillId}`, { method: 'DELETE' });
  },

  // Search Master Skills List
  searchSkills: async (query) => {
    return apiClient(`/skills/search?q=${encodeURIComponent(query)}`, { method: 'GET' });
  },

  // Education
  addEducation: async (data) => {
    return apiClient('/profile/education', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateEducation: async (id, data) => {
    return apiClient(`/profile/education/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteEducation: async (id) => {
    return apiClient(`/profile/education/${id}`, { method: 'DELETE' });
  },

  // Work Experience
  addExperience: async (data) => {
    return apiClient('/profile/experience', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateExperience: async (id, data) => {
    return apiClient(`/profile/experience/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteExperience: async (id) => {
    return apiClient(`/profile/experience/${id}`, { method: 'DELETE' });
  },

  // Projects
  addProject: async (data) => {
    return apiClient('/profile/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateProject: async (id, data) => {
    return apiClient(`/profile/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteProject: async (id) => {
    return apiClient(`/profile/projects/${id}`, { method: 'DELETE' });
  },

  // Certifications
  addCertification: async (data) => {
    return apiClient('/profile/certifications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateCertification: async (id, data) => {
    return apiClient(`/profile/certifications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteCertification: async (id) => {
    return apiClient(`/profile/certifications/${id}`, { method: 'DELETE' });
  },

  // Work Documents
  addWorkDocument: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient('/profile/work-documents', {
      method: 'POST',
      body: formData,
    });
  },

  getWorkDocuments: async () => {
    return apiClient('/profile/work-documents', { method: 'GET' });
  },

  deleteWorkDocument: async (id) => {
    return apiClient(`/profile/work-documents/${id}`, { method: 'DELETE' });
  },

  // Public Candidate Profile (for Recruiter)
  getPublicProfile: async (userId) => {
    return apiClient(`/profile/${userId}`, { method: 'GET' });
  },
};
