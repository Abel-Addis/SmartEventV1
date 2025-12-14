import apiClient from "./api";

export const adminService = {
  /**
   * Get pending organizer approvals
   * @param {Object} params - Pagination params {pageNumber, pageSize, sortBy, sortDirection}
   * @returns {Promise} PaginatedResult<OrganizerPendingResponse>
   */
  async getPendingOrganizers(params = {}) {
    const queryParams = new URLSearchParams({
      pageNumber: params.pageNumber || 1,
      pageSize: params.pageSize || 10,
      ...(params.sortBy && { sortBy: params.sortBy }),
      ...(params.sortDirection && { sortDirection: params.sortDirection }),
    });
    const response = await apiClient.get(
      `/admin/organizers/get-pending?${queryParams}`
    );
    return response.data;
  },

  /**
   * Get all organizers
   * @param {Object} params - Pagination and filter params
   * @returns {Promise} PaginatedResult<UserListResponse>
   */
  async getAllOrganizers(params = {}) {
    const queryParams = new URLSearchParams({
      pageNumber: params.pageNumber || 1,
      pageSize: params.pageSize || 10,
      ...(params.status && { status: params.status }),
      ...(params.sortBy && { sortBy: params.sortBy }),
      ...(params.sortDirection && { sortDirection: params.sortDirection }),
    });
    const response = await apiClient.get(
      `/admin/organizers/get-all?${queryParams}`
    );
    return response.data;
  },

  /**
   * Get organizer details by ID
   * @param {string} id - Organizer ID
   * @returns {Promise} OrganizerDetailResponse
   */
  async getOrganizerById(id) {
    const response = await apiClient.get(`/admin/organizers/get-by-id/${id}`);
    return response.data;
  },

  /**
   * Approve organizer
   * @param {string} id - Organizer ID
   * @param {string} adminNotes - Optional admin notes
   * @returns {Promise} Success message
   */
  async approveOrganizer(id, adminNotes = null) {
    const response = await apiClient.post(`/admin/organizers/approve/${id}`, {
      adminNotes,
    });
    return response.data;
  },

  /**
   * Reject organizer
   * @param {string} id - Organizer ID
   * @param {string} adminNotes - Optional admin notes
   * @returns {Promise} Success message
   */
  async rejectOrganizer(id, adminNotes = null) {
    const response = await apiClient.post(`/admin/organizers/reject/${id}`, {
      adminNotes,
    });
    return response.data;
  },

  /**
   * Get all users
   * @param {Object} params - Pagination and filter params
   * @returns {Promise} PaginatedResult<UserListResponse>
   */
  async getAllUsers(params = {}) {
    const queryParams = new URLSearchParams({
      pageNumber: params.pageNumber || 1,
      pageSize: params.pageSize || 10,
      ...(params.role && { role: params.role }),
      ...(params.status && { status: params.status }),
      ...(params.sortBy && { sortBy: params.sortBy }),
      ...(params.sortDirection && { sortDirection: params.sortDirection }),
    });
    const response = await apiClient.get(`/admin/users/get-all?${queryParams}`);
    return response.data;
  },

  /**
   * Search users
   * @param {Object} searchParams - Search criteria
   * @param {Object} pageParams - Pagination params
   * @returns {Promise} PaginatedResult<UserListResponse>
   */
  async searchUsers(searchParams, pageParams = {}) {
    const queryParams = new URLSearchParams({
      pageNumber: pageParams.pageNumber || 1,
      pageSize: pageParams.pageSize || 10,
      ...(pageParams.sortBy && { sortBy: pageParams.sortBy }),
      ...(pageParams.sortDirection && {
        sortDirection: pageParams.sortDirection,
      }),
      ...(searchParams.fullName && { fullName: searchParams.fullName }),
      ...(searchParams.email && { email: searchParams.email }),
      ...(searchParams.phoneNumber && {
        phoneNumber: searchParams.phoneNumber,
      }),
      ...(searchParams.role && { role: searchParams.role }),
      ...(searchParams.status && { status: searchParams.status }),
    });
    const response = await apiClient.get(`/admin/users/search?${queryParams}`);
    return response.data;
  },

  /**
   * Update user status
   * @param {string} userId - User ID
   * @param {boolean} isActive - Active status
   * @returns {Promise} AuthResponse
   */
  async updateUserStatus(userId, isActive) {
    const response = await apiClient.post("/admin/users/update-status", {
      userId,
      isActive,
    });
    return response.data;
  },

  /**
   * Get all events
   * @returns {Promise} Array of EventResponseDto
   */
  async getAllEvents() {
    const response = await apiClient.get("/admin/events");
    return response.data;
  },
};
