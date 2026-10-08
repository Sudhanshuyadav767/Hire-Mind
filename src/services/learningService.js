import { apiClient } from './apiClient';

export const learningService = {
  // Candidate Skill Radar chart data
  getSkillRadar: async () => {
    return apiClient('/learning/skill-radar', { method: 'GET' });
  },

  // Learning stats & streak
  getLearningStats: async () => {
    return apiClient('/learning/stats', { method: 'GET' });
  },

  // Recommended courses
  getCourseRecommendations: async () => {
    return apiClient('/learning/courses/recommendations', { method: 'GET' });
  },

  // Search courses
  searchCourses: async (query = '') => {
    return apiClient(`/learning/courses/search?q=${encodeURIComponent(query)}`, { method: 'GET' });
  },

  // Get course details
  getCourseDetails: async (courseId) => {
    return apiClient(`/learning/courses/${courseId}`, { method: 'GET' });
  },

  // Enroll course
  enrollCourse: async (courseId) => {
    return apiClient('/learning/courses/enroll', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  },

  // Get enrolled courses
  getEnrolledCourses: async () => {
    return apiClient('/learning/courses/enrolled', { method: 'GET' });
  },

  // Update lesson progress
  updateProgress: async (courseId, lessonId, completed) => {
    return apiClient('/learning/progress', {
      method: 'POST',
      body: JSON.stringify({ courseId, lessonId, completed }),
    });
  },

  // Get certificates
  getCertificates: async () => {
    return apiClient('/learning/certificates', { method: 'GET' });
  },

  // Get learning roadmap
  getRoadmap: async () => {
    return apiClient('/learning/roadmap', { method: 'GET' });
  },

  // Get skill gap analysis
  getSkillGapAnalysis: async () => {
    return apiClient('/learning/skill-gap-analysis', { method: 'GET' });
  },
};
