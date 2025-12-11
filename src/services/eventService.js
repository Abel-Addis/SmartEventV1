import apiClient from './api'

export const eventService = {
  /**
   * Create a new event
   * @param {FormData} formData - Event data with files
   * @returns {Promise} Created event data
   */
  async createEvent(formData) {
    const response = await apiClient.post('/events/create-event', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  /**
   * Add ticket type to event
   * @param {string} eventId - Event ID
   * @param {Object} ticketData - Ticket type data (Name, Description, BasePrice, Quantity)
   * @returns {Promise}
   */
  async addTicketType(eventId, ticketData) {
    const response = await apiClient.post(`/events/add-ticket-type-to-event/${eventId}`, ticketData)
    return response.data
  },

  /**
   * Add pricing rule to ticket type
   * @param {string} ticketTypeId - Ticket Type ID
   * @param {Object} ruleData - Pricing rule data (RuleType, Description, and type-specific fields)
   * @returns {Promise}
   */
  async addPricingRule(ticketTypeId, ruleData) {
    const response = await apiClient.post(`/events/add-pricing-rule-to-ticket-type/${ticketTypeId}`, ruleData)
    return response.data
  },

  /**
   * Update an event
   * @param {string} eventId - Event ID
   * @param {FormData} formData - Updated event data
   * @returns {Promise}
   */
  async updateEvent(eventId, formData) {
    const response = await apiClient.put(`/events/update-event/${eventId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  /**
   * Publish an event
   * @param {string} eventId - Event ID
   * @returns {Promise}
   */
  async publishEvent(eventId) {
    const response = await apiClient.post(`/events/publish-event/${eventId}`)
    return response.data
  },

  /**
   * Get event by ID
   * @param {string} eventId - Event ID
   * @returns {Promise}
   */
  async getEventById(eventId) {
    const response = await apiClient.get(`/events/get-event-by-id/${eventId}`)
    return response.data
  },

  /**
   * Get organizer's events
   * @param {string} organizerId - Organizer ID
   * @returns {Promise}
   */
  async getOrganizerEvents(organizerId) {
    const response = await apiClient.get(`/events/get-events-by-organizer/${organizerId}`)
    return response.data
  },

  /**
   * Get default ticket types
   * @returns {Promise}
   */
  async getDefaultTicketTypes() {
    const response = await apiClient.get('/events/get-default-ticket-types')
    return response.data
  },

  /**
   * Get default pricing rules
   * @returns {Promise}
   */
  async getDefaultPricingRules() {
    const response = await apiClient.get('/events/get-default-pricing-rules')
    return response.data
  },

  /**
   * Post event to Telegram
   * @param {string} eventId - Event ID
   * @returns {Promise}
   */
  async postEventToTelegram(eventId) {
    const response = await apiClient.post(`/events/post-event-Telgram/${eventId}`)
    return response.data
  },
}

