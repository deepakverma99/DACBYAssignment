import { useAuth } from '../context/AuthContext';
import StoryCard from '../components/StoryCard';
import useStories from '../hooks/useStories';

const Home = () => {
  const { user, updateBookmarks } = useAuth();
  const { stories, loading, error, page, totalPages, setPage } = useStories();

  const isBookmarked = (storyId) => {
    return user?.bookmarks?.includes(storyId) || false;
  };

  if (loading) {
    return (
      <div className="page-container" id="home-page">
        <div className="loading-screen"><div className="spinner" /></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container" id="home-page">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="page-container" id="home-page">
      <header className="page-header">
        <h1>Top Stories</h1>
        <p className="page-subtitle">Latest from Hacker News, sorted by points</p>
      </header>

      <div className="stories-list">
        {stories.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
            isBookmarked={isBookmarked(story._id)}
            onBookmarkToggle={updateBookmarks}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination" id="pagination">
          <button className="btn btn-outline" onClick={() => setPage((p) => p - 1)}
            disabled={page <= 1} id="btn-prev">
            ← Prev
          </button>
          <span className="page-info">Page {page} of {totalPages}</span>
          <button className="btn btn-outline" onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages} id="btn-next">
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
