import apiClient from '../api/axios';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

/**
 * Story service — encapsulates all story-related API calls.
 * Follows Single Responsibility: only handles story HTTP requests.
 * Components never call apiClient directly for stories (DRY).
 */
const storyService = {
  /**
   * Fetch paginated stories sorted by points desc.
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<{stories: array, totalCount: number, page: number, totalPages: number}>}
   */
  getStories: async (page = 1, limit = 10) => {
    const { data } = await apiClient.get(API_ENDPOINTS.STORIES.LIST, {
      params: { page, limit },
    });
    return data;
  },

  /**
   * Fetch a single story by ID.
   * @param {string} id
   * @returns {Promise<object>}
   */
  getStory: async (id) => {
    const { data } = await apiClient.get(API_ENDPOINTS.STORIES.SINGLE(id));
    return data;
  },

  /**
   * Toggle bookmark status on a story. Requires authentication.
   * @param {string} id
   * @returns {Promise<{bookmarked: boolean, bookmarks: array}>}
   */
  toggleBookmark: async (id) => {
    const { data } = await apiClient.post(API_ENDPOINTS.STORIES.BOOKMARK(id));
    return data;
  },
};

export default storyService;
