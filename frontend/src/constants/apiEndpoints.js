/**
 * Centralized API endpoint constants.
 * Single source of truth — avoids hardcoding URLs across components (DRY).
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
  },
  STORIES: {
    LIST: '/api/stories',
    SINGLE: (id) => `/api/stories/${id}`,
    BOOKMARK: (id) => `/api/stories/${id}/bookmark`,
  },
  SCRAPE: '/api/scrape',
};
