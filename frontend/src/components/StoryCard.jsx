import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import storyService from '../services/storyService';
import { getErrorMessage } from '../utils/errorHandler';
import { ROUTES } from '../constants/routes';

const StoryCard = ({ story, isBookmarked = false, onBookmarkToggle, isSelected = false, onClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [toggling, setToggling] = useState(false);

  const handleBookmark = async (e) => {
    e.stopPropagation();
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
    <article
      className={`flex items-center justify-between gap-4 p-5 border rounded-xl transition-all duration-250 cursor-pointer min-h-[136px] h-auto ${
        isSelected
          ? 'bg-surface-hover border-primary shadow-[0_8px_24px_rgba(255,102,0,0.08)]'
          : 'bg-surface border-border hover:bg-surface-hover hover:border-primary/50'
      }`}
      id={`story-${story._id}`}
      onClick={onClick}
    >
      <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
        <h3 className="text-base font-semibold mb-2 leading-snug line-clamp-2">
          {story.url ? (
            <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-primary" onClick={(e) => e.stopPropagation()}>
              {story.title}
            </a>
          ) : (
            <span className="text-gray-200">{story.title}</span>
          )}
        </h3>
        <div className="flex flex-wrap gap-4 text-xs text-muted">
          <span className="text-primary font-semibold">▲ {story.points} points</span>
          <span>by {story.author}</span>
          {story.postedAt && <span>{story.postedAt}</span>}
        </div>
      </div>

      <button
        className={`bg-transparent border-none text-2xl cursor-pointer p-1 shrink-0 transition-all duration-150 hover:scale-120 ${
          bookmarked ? 'text-bookmark drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]' : 'text-muted'
        }`}
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
