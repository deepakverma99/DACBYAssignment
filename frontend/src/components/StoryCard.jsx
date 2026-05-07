import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import storyService from '../services/storyService';
import { getErrorMessage } from '../utils/errorHandler';
import { ROUTES } from '../constants/routes';

const StoryCard = ({ story, isBookmarked = false, onBookmarkToggle }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [toggling, setToggling] = useState(false);

  const handleBookmark = async () => {
    if (!user) { navigate(ROUTES.LOGIN); return; }
    setToggling(true);
    setBookmarked((prev) => !prev);
    try {
      const data = await storyService.toggleBookmark(story._id);
      setBookmarked(data.bookmarked);
      if (onBookmarkToggle) onBookmarkToggle(data.bookmarks);
    } catch (err) {
      setBookmarked((prev) => !prev);
      console.error('Bookmark failed:', getErrorMessage(err));
    } finally {
      setToggling(false);
    }
  };

  return (
    <article className="story-card" id={`story-${story._id}`}>
      <div className="story-content">
        <h3 className="story-title">
          {story.url ? (
            <a href={story.url} target="_blank" rel="noopener noreferrer">{story.title}</a>
          ) : (
            story.title
          )}
        </h3>
        <div className="story-meta">
          <span className="story-points">▲ {story.points} points</span>
          <span className="story-author">by {story.author}</span>
          {story.postedAt && <span className="story-time">{story.postedAt}</span>}
        </div>
      </div>
      <button
        className={`btn-bookmark ${bookmarked ? 'bookmarked' : ''}`}
        onClick={handleBookmark}
        disabled={toggling}
        aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        id={`bookmark-${story._id}`}
      >
        {bookmarked ? '★' : '☆'}
      </button>
    </article>
  );
};

export default StoryCard;
