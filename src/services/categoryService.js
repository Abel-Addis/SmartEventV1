import apiClient from './api'

export const categoryService = {
  /**
   * Get all event categories
   * @returns {Promise} List of categories
   */
  async getAllCategories() {
    const response = await apiClient.get('/event-categories/get-all-categories')
    return response.data
  },

  /**
   * Get category by ID
   * @param {string} categoryId - Category ID
   * @returns {Promise}
   */
  async getCategoryById(categoryId) {
    const response = await apiClient.get(`/event-category/get-category-by-id/${categoryId}`)
    return response.data
  },
}
