import apiClient from '../api/axios';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

/**
 * Auth service — encapsulates all authentication API calls.
 * Follows Single Responsibility: only handles auth-related HTTP requests.
 * Components and context never call apiClient directly for auth (DRY).
 */
const authService = {
  /**
   * Register a new user.
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{token: string, user: object}>}
   */
  register: async (name, email, password) => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, {
      name,
      email,
      password,
    });
    return data;
  },

  /**
   * Login with existing credentials.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{token: string, user: object}>}
   */
  login: async (email, password) => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    return data;
  },
};

export default authService;
