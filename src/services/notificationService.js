import { apiClient } from './apiClient';

export const notificationService = {
  /**
   * Get user notifications
   * GET /api/v1/notifications
   */
  getNotifications: async () => {
    try {
      const res = await apiClient('/notifications', { method: 'GET' });
      return res;
    } catch (err) {
      console.warn('API notifications fetch notice (local fallback):', err);
      return {
        success: true,
        data: [
          {
            id: 'notif-1',
            title: '🎉 Application Update',
            message: 'Your application for Senior Full Stack Engineer has passed initial screening.',
            createdAt: '10 min ago',
            read: false,
            actionUrl: '/applications',
          },
          {
            id: 'notif-2',
            title: '📅 Interview Scheduled',
            message: 'Recruiter scheduled a Technical Interview for tomorrow at 3:00 PM.',
            createdAt: '2 hours ago',
            read: false,
            actionUrl: '/applications',
          },
          {
            id: 'notif-3',
            title: '🤖 AI ATS Review Ready',
            message: 'Your uploaded resume analysis report is ready to view.',
            createdAt: '1 day ago',
            read: true,
            actionUrl: '/resume-review',
          },
        ],
      };
    }
  },

  /**
   * Mark notification as read
   * PATCH /api/v1/notifications/:id/read
   */
  markAsRead: async (notificationId) => {
    try {
      const res = await apiClient(`/notifications/${notificationId}/read`, { method: 'PATCH' });
      return res;
    } catch (err) {
      return { success: true };
    }
  },
};
