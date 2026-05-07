import { useState, useEffect, useCallback } from 'react';
import storyService from '../services/storyService';
import { getErrorMessage } from '../utils/errorHandler';

/**
 * Custom hook to fetch paginated stories.
 * Encapsulates fetch logic, loading state, error handling, and pagination (SRP).
 * Reusable across any page/component that needs story data (DRY).
 *
 * @param {number} initialPage
 * @param {number} limit
 * @returns {{ stories, loading, error, page, totalPages, setPage, refetch }}
 */
const useStories = (initialPage = 1, limit = 10) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStories = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await storyService.getStories(page, limit);
      setStories(data.stories);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load stories'));
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  return { stories, loading, error, page, totalPages, setPage, refetch: fetchStories };
};

export default useStories;
