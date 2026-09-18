import { apiClient } from './apiClient';

export const resumeReviewService = {
  // Trigger AI review for existing uploaded resume
  reviewUploadedResume: async (resumeId, jobDescription = '') => {
    return apiClient(`/profile/resume/${resumeId}/review`, {
      method: 'POST',
      body: JSON.stringify({ jobDescription }),
    });
  },

  // Get AI review result for resume
  getResumeReview: async (resumeId) => {
    return apiClient(`/profile/resume/${resumeId}/review`, { method: 'GET' });
  },

  // Get review report by reviewId
  getReviewById: async (reviewId) => {
    return apiClient(`/resume-reviews/${reviewId}`, { method: 'GET' });
  },

  // Upload file directly and perform AI resume review
  directAnalyzeResume: async (file, jobDescription = '') => {
    const formData = new FormData();
    formData.append('file', file);
    if (jobDescription) formData.append('jobDescription', jobDescription);

    return apiClient('/resume-review/direct-analyze', {
      method: 'POST',
      body: formData,
    });
  },
};
