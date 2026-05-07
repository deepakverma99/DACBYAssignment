const express = require('express');
const router = express.Router();
const { getStories, getStory, toggleBookmark } = require('../controllers/storyController');
const auth = require('../middleware/auth');

// GET /api/stories — all stories sorted by points desc (paginated)
router.get('/', getStories);

// GET /api/stories/:id — single story by ID
router.get('/:id', getStory);

// POST /api/stories/:id/bookmark — toggle bookmark (auth required)
router.post('/:id/bookmark', auth, toggleBookmark);

module.exports = router;
