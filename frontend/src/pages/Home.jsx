import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import StoryCard from '../components/StoryCard';
import useStories from '../hooks/useStories';

const Home = () => {
  const { user, updateBookmarks } = useAuth();
  const { stories, loading, error, page, totalPages, setPage } = useStories();
  const [selectedStory, setSelectedStory] = useState(null);
  const previewRef = useRef(null);

  // Reset scroll position when selected story changes
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scrollTop = 0;
    }
  }, [selectedStory]);

  // Automatically select the first story when stories load (only on desktop)
  useEffect(() => {
    if (stories.length > 0 && window.innerWidth >= 1024) {
      // If no story is selected, or the selected story is not on the current page, select the first one
      const isSelectedInCurrentPage = selectedStory && stories.some(s => s._id === selectedStory._id);
      if (!selectedStory || !isSelectedInCurrentPage) {
        setSelectedStory(stories[0]);
      }
    }
  }, [stories]);

  const isBookmarked = (storyId) => user?.bookmarks?.includes(storyId) || false;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6" id="home-page">
        <div className="flex items-center justify-center py-12">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6" id="home-page">
        <div className="bg-red-500/10 text-red-400 border border-red-500/20 rounded-md px-4 py-2 text-sm">
          {error}
        </div>
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
    <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col" id="home-page">
      <header className="shrink-0 py-4 mb-2 border-b border-border/30">
        <h1 className="text-2xl sm:text-3xl font-bold">Top Stories</h1>
        <p className="text-muted text-sm mt-1">Latest from Hacker News, sorted by points</p>
      </header>

      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 py-4">
        {/* Left Pane: Stories List */}
        <div className="lg:col-span-5 h-full overflow-y-auto pr-2 hide-scrollbar flex flex-col gap-4">
          {stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              isBookmarked={isBookmarked(story._id)}
              onBookmarkToggle={updateBookmarks}
              isSelected={selectedStory?._id === story._id}
              onClick={() => setSelectedStory(story)}
            />
          ))}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 mb-8 shrink-0" id="pagination">
              <button
                className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-sm font-semibold rounded-md border border-border text-muted hover:border-primary hover:text-primary transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                onClick={() => { setSelectedStory(null); setPage(page - 1); }}
                disabled={page <= 1}
                id="btn-prev"
              >
                ← Prev
              </button>
              <span className="text-sm text-muted">Page {page} of {totalPages}</span>
              <button
                className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-sm font-semibold rounded-md border border-border text-muted hover:border-primary hover:text-primary transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                onClick={() => { setSelectedStory(null); setPage(page + 1); }}
                disabled={page >= totalPages}
                id="btn-next"
              >
                Next →
              </button>
            </div>
          )}
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
            <span className="text-lg">←</span> Back to Stories
          </button>
        </div>
        <div className="flex-1 overflow-y-auto bg-surface pb-8">
           {previewContent}
        </div>
      </div>
    </div>
  );
};

export default Home;
