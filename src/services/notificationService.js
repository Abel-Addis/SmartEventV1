import apiClient from "./api";

export const notificationService = {
  /**
   * Get all notifications for the authenticated user
   * @returns {Promise} Response with notifications array
   */
  async getUserNotifications() {
    const response = await apiClient.get("/Notification/user");
    return response.data;
  },

  /**
   * Mark a notification as read
   * @param {string} id - Notification ID (GUID)
   * @returns {Promise} Response confirming the action
   */
  async markAsRead(id) {
    const response = await apiClient.post(`/Notification/${id}/read`);
    return response.data;
  },

  /**
   * Send a test notification (for testing purposes)
   * @returns {Promise} Response confirming the test notification was sent
   */
  async sendTestNotification() {
    const response = await apiClient.post("/Notification/test");
    return response.data;
  },
};
