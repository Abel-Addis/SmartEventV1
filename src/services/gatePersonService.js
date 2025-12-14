import apiClient from "./api";

export const gatePersonService = {
  /**
   * Create a new gate person
   * @param {Object} data - GatePersonCreateUpdateDto
   * @returns {Promise} Response with created gate person
   */
  async createGatePerson(data) {
    const response = await apiClient.post("/gatepersons/createScanner", data);
    return response.data;
  },

  /**
   * Update gate person information
   * @param {string} id - Gate person user ID
   * @param {Object} data - GatePersonCreateUpdateDto
   * @returns {Promise} Response with updated gate person
   */
  async updateGatePerson(id, data) {
    const response = await apiClient.put(
      `/gatepersons/updateScanner/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Delete or deactivate gate person
   * @param {string} id - Gate person user ID
   * @param {boolean} hardDelete - If true, permanently delete; if false, deactivate
   * @returns {Promise} Response confirming deletion
   */
  async deleteGatePerson(id, hardDelete = false) {
    const response = await apiClient.delete(
      `/gatepersons/deleteOrDeacticate/${id}?hardDelete=${hardDelete}`
    );
    return response.data;
  },

  /**
   * Get all gate persons for the organizer
   * @returns {Promise} Response with array of gate persons
   */
  async getAllGatePersons() {
    const response = await apiClient.get("/gatepersons/getAllScanners");
    return response.data;
  },

  /**
   * Get organizer's events for assignment dropdown
   * @returns {Promise} Response with array of events {eventId, eventName}
   */
  async getAssignmentEvents() {
    const response = await apiClient.get("/gatepersons/get-assignment-events");
    return response.data;
  },
};
