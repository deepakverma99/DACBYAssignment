import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StoryCard from '../components/StoryCard';
import useStories from '../hooks/useStories';
import { ROUTES } from '../constants/routes';

const Bookmarks = () => {
  const { user, updateBookmarks } = useAuth();
  const { stories, loading, error } = useStories(1, 100);
  const [selectedStory, setSelectedStory] = useState(null);

  const bookmarkedStories = stories.filter((story) =>
    user?.bookmarks?.includes(story._id)
  );

  // Automatically select the first story when bookmarked stories load
  useEffect(() => {
    if (bookmarkedStories.length > 0 && !selectedStory) {
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

  return (
    <div className="max-w-7xl mx-auto px-6" id="bookmarks-page">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Your Bookmarks</h1>
        <p className="text-muted text-sm mt-1">Stories you've saved for later</p>
      </header>

      {bookmarkedStories.length === 0 ? (
        <div className="text-center py-12" id="empty-bookmarks">
          <span className="text-5xl block mb-4">📑</span>
          <h2 className="text-xl font-semibold mb-2">No bookmarks yet</h2>
          <p className="text-muted mb-6">Start bookmarking stories you want to read later.</p>
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover hover:-translate-y-0.5 transition-all duration-150"
          >
            Browse Stories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Pane: Stories List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
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

          {/* Right Pane: Story Preview */}
          <div className="lg:col-span-7 sticky top-24 hidden lg:block">
            {selectedStory ? (
              <div className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col shadow-xl max-h-[calc(100vh-8rem)]">
                <div className="w-full h-64 bg-black/40 flex items-center justify-center border-b border-border relative overflow-hidden shrink-0">
                  {selectedStory.imageUrl ? (
                    <img src={selectedStory.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center text-muted">
                      <span className="text-5xl mb-2">📰</span>
                      <span>No image available</span>
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col gap-6 flex-1 min-h-0">
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
                    <div className="flex-1 overflow-y-auto pr-2 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans border-t border-b border-border/50 py-4 max-h-[400px]">
                      {selectedStory.content}
                    </div>
                  ) : (
                    <div className="flex-1 overflow-y-auto flex items-center justify-center text-muted italic border-t border-b border-border/50 py-4">
                      Content preview not available.
                    </div>
                  )}

                  {selectedStory.url ? (
                    <a
                      href={selectedStory.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover transition-all duration-150 text-center w-full mt-auto"
                    >
                      Read Full Story
                    </a>
                  ) : (
                    <div className="text-center py-3 bg-white/5 rounded-md text-muted border border-border mt-auto">
                      This is a native Hacker News post (no external link).
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-surface border border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center h-[500px] text-muted">
                <span className="text-5xl mb-4">👈</span>
                <h3 className="text-xl font-semibold mb-2">Select a story</h3>
                <p>Click on a story from the list to see its preview here.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
