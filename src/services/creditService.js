import apiClient from "./api";

export const creditService = {
  /**
   * Get current credit balance
   * @returns {Promise} Response with { balance: number }
   */
  async getBalance() {
    const response = await apiClient.get("/organizer-credit/balance");
    return response.data;
  },

  /**
   * Get credit purchase information (pricing)
   * @returns {Promise} Response with BuyCreditInfoDto { creditPriceETB, eventPublishCost, message }
   */
  async getPurchaseInfo() {
    const response = await apiClient.get("/organizer-credit/purchase-info");
    return response.data;
  },

  /**
   * Purchase credits
   * @param {number} credits - Number of credits to purchase
   * @returns {Promise} Response with CreditPurchaseResponseDto
   */
  async buyCredits(credits) {
    const response = await apiClient.post(
      `/organizer-credit/buy?credits=${credits}`
    );
    return response.data;
  },

  /**
   * Get credit transaction history
   * @returns {Promise} Response with array of CreditTransaction objects
   */
  async getTransactions() {
    const response = await apiClient.get("/organizer-credit/transactions");
    return response.data;
  },
};
