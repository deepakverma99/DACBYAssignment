/**
 * Centralized API endpoint constants.
 * Single source of truth — avoids hardcoding URLs across components (DRY).
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  STORIES: {
    LIST: '/stories',
    SINGLE: (id) => `/stories/${id}`,
    BOOKMARK: (id) => `/stories/${id}/bookmark`,
  },
  SCRAPE: '/scrape',
};
