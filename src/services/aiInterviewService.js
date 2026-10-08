import { apiClient } from './apiClient';

export const aiInterviewService = {
  // Start AI Mock Interview session
  startInterview: async (data) => {
    return apiClient('/ai-interview/start', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get next interview question
  getNextQuestion: async (mockInterviewId) => {
    return apiClient(`/ai-interview/${mockInterviewId}/next`, {
      method: 'GET',
    });
  },

  // Submit answer to question
  submitAnswer: async (mockInterviewId, questionId, answerText) => {
    return apiClient(`/ai-interview/${mockInterviewId}/answer/${questionId}`, {
      method: 'POST',
      body: JSON.stringify({ answerText }),
    });
  },

  // Get interview final evaluation & result
  getResult: async (mockInterviewId) => {
    return apiClient(`/ai-interview/${mockInterviewId}/result`, {
      method: 'GET',
    });
  },

  // List all candidate mock interviews
  listInterviews: async () => {
    return apiClient('/ai-interview/list', {
      method: 'GET',
    });
  },
};
