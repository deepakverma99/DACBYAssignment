/**
 * Extracts a user-friendly error message from an Axios error response.
 * Used across all pages/components that make API calls (DRY).
 *
 * @param {Error} error — Axios error object
 * @param {string} fallback — fallback message if none found
 * @returns {string}
 */
export const getErrorMessage = (error, fallback = 'Something went wrong. Please try again.') => {
  return error?.response?.data?.message || error?.message || fallback;
};
