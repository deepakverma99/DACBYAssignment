import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import StoryCard from '../components/StoryCard';
import useStories from '../hooks/useStories';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const Bookmarks = () => {
  const { user, updateBookmarks } = useAuth();
  const { stories, loading, error } = useStories(1, 100);
  const [selectedStory, setSelectedStory] = useState(null);
  const previewRef = useRef(null);

  // Reset scroll position when selected story changes
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scrollTop = 0;
    }
  }, [selectedStory]);

  const bookmarkedStories = stories.filter((story) =>
    user?.bookmarks?.includes(story._id)
  );

  // Automatically select the first story when bookmarked stories load (only on desktop)
  useEffect(() => {
    if (bookmarkedStories.length > 0 && !selectedStory && window.innerWidth >= 1024) {
      setSelectedStory(bookmarkedStories[0]);
    }
  }, [bookmarkedStories, selectedStory]);

  // Deselect if unbookmarked
  useEffect(() => {
    if (selectedStory && !user?.bookmarks?.includes(selectedStory._id)) {
      setSelectedStory(null);
    }
  }, [user?.bookmarks, selectedStory]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6" id="bookmarks-page">
        <div className="flex items-center justify-center py-12">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6" id="bookmarks-page">
        <div className="bg-red-500/10 text-red-400 border border-red-500/20 rounded-md px-4 py-2 text-sm">
          {error}
        </div>
      </div>
    );
  }

  if (bookmarkedStories.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center" id="bookmarks-empty">
        <span className="text-6xl mb-6 block">📚</span>
        <h2 className="text-2xl font-bold mb-4">No bookmarks yet</h2>
        <p className="text-muted mb-8">Save interesting stories to read them later.</p>
        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-md bg-primary text-white hover:bg-primary-hover transition-all duration-200"
        >
          Discover Stories
        </Link>
      </div>
    );
  }

  const previewContent = selectedStory ? (
    <>
      <div className="w-full h-56 bg-black/40 flex items-center justify-center border-b border-border relative overflow-hidden shrink-0">
        {selectedStory.imageUrl ? (
          <img src={selectedStory.imageUrl} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center text-muted">
            <span className="text-5xl mb-2">📰</span>
            <span>No image available</span>
          </div>
        )}
      </div>
      <div className="p-6 lg:p-8 flex flex-col gap-6 shrink-0">
        <div>
          <h2 className="text-2xl font-bold leading-tight mb-3">{selectedStory.title}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-muted mb-4">
            <span className="text-primary font-semibold">▲ {selectedStory.points} points</span>
            <span>by {selectedStory.author}</span>
            {selectedStory.postedAt && <span>{selectedStory.postedAt}</span>}
          </div>
        </div>

        {/* Content Area */}
        {selectedStory.content ? (
          <div className="pr-3 text-gray-200 text-base leading-loose whitespace-pre-wrap font-sans border-t border-b border-border/50 py-4">
            {selectedStory.content}
          </div>
        ) : (
          <div className="flex items-center justify-center text-muted italic border-t border-b border-border/50 py-4">
            Content preview not available.
          </div>
        )}

        {selectedStory.url ? (
          <a
            href={selectedStory.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover transition-all duration-150 text-center w-fit mx-auto mt-auto"
          >
            Read Full Story
          </a>
        ) : (
          <div className="text-center px-8 py-3 bg-white/5 rounded-md text-muted border border-border w-fit mx-auto mt-auto">
            This is a native Hacker News post (no external link).
          </div>
        )}
      </div>
    </>
  ) : null;

  return (
    <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col" id="bookmarks-page">
      <header className="shrink-0 py-4 mb-2 border-b border-border/30">
        <h1 className="text-2xl sm:text-3xl font-bold">Your Bookmarks</h1>
        <p className="text-muted text-sm mt-1">Stories you've saved for later</p>
      </header>

      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 py-4">
        {/* Left Pane: Stories List */}
        <div className="lg:col-span-5 h-full overflow-y-auto pr-2 hide-scrollbar flex flex-col gap-4">
          {bookmarkedStories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              isBookmarked={true}
              onBookmarkToggle={updateBookmarks}
              isSelected={selectedStory?._id === story._id}
              onClick={() => setSelectedStory(story)}
            />
          ))}
        </div>

        {/* Right Pane: Story Preview (Desktop) */}
        <div className="lg:col-span-7 h-full hidden lg:block overflow-hidden">
          {selectedStory ? (
            <div 
              ref={previewRef}
              className="bg-surface border border-border rounded-2xl overflow-y-auto custom-scrollbar flex flex-col shadow-xl h-full"
            >
              {previewContent}
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center h-full text-muted">
              <span className="text-5xl mb-4">👈</span>
              <h3 className="text-xl font-semibold mb-2">Select a story</h3>
              <p>Click on a story from the list to see its preview here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Preview Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-[60] bg-[#0a0f1a] transition-transform duration-300 flex flex-col ${selectedStory ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-16 border-b border-border flex items-center px-4 bg-[#0a0f1a]/95 backdrop-blur shrink-0">
          <button 
            onClick={() => setSelectedStory(null)} 
            className="text-gray-300 font-medium flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
          >
            <span className="text-lg">←</span> Back to Bookmarks
          </button>
        </div>
        <div className="flex-1 overflow-y-auto bg-surface pb-8">
           {previewContent}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
