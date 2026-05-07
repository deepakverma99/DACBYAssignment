import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StoryCard from '../components/StoryCard';
import useStories from '../hooks/useStories';
import { ROUTES } from '../constants/routes';

const Bookmarks = () => {
  const { user, updateBookmarks } = useAuth();
  const { stories, loading, error } = useStories(1, 100);

  const bookmarkedStories = stories.filter((story) =>
    user?.bookmarks?.includes(story._id)
  );

  if (loading) {
    return (
      <div className="page-container" id="bookmarks-page">
        <div className="loading-screen"><div className="spinner" /></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container" id="bookmarks-page">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="page-container" id="bookmarks-page">
      <header className="page-header">
        <h1>Your Bookmarks</h1>
        <p className="page-subtitle">Stories you've saved for later</p>
      </header>

      {bookmarkedStories.length === 0 ? (
        <div className="empty-state" id="empty-bookmarks">
          <span className="empty-icon">📑</span>
          <h2>No bookmarks yet</h2>
          <p>Start bookmarking stories you want to read later.</p>
          <Link to={ROUTES.HOME} className="btn btn-primary">Browse Stories</Link>
        </div>
      ) : (
        <div className="stories-list">
          {bookmarkedStories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              isBookmarked={true}
              onBookmarkToggle={updateBookmarks}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
