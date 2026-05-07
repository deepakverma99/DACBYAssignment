const Story = require('../models/Story');
const User = require('../models/User');

// @desc    Get all stories with pagination, sorted by points desc
// @route   GET /api/stories
// @access  Public
const getStories = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const totalCount = await Story.countDocuments();
    const stories = await Story.find()
      .sort({ points: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.json({
      stories,
      totalCount,
      page: pageNum,
      totalPages: Math.ceil(totalCount / limitNum),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get single story by ID
// @route   GET /api/stories/:id
// @access  Public
const getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (err) {
    // Handle invalid ObjectId
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Story not found — invalid ID' });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Toggle bookmark on a story
// @route   POST /api/stories/:id/bookmark
// @access  Private (auth required)
const toggleBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const storyId = req.params.id;

    // Verify story exists
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    const user = await User.findById(userId);

    const isBookmarked = user.bookmarks.includes(storyId);

    if (isBookmarked) {
      // Remove bookmark
      await User.findByIdAndUpdate(userId, { $pull: { bookmarks: storyId } });
    } else {
      // Add bookmark
      await User.findByIdAndUpdate(userId, { $push: { bookmarks: storyId } });
    }

    const updatedUser = await User.findById(userId);

    res.json({
      bookmarked: !isBookmarked,
      bookmarks: updatedUser.bookmarks,
    });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Story not found — invalid ID' });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getStories, getStory, toggleBookmark };
