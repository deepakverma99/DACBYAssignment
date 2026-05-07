const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  url: {
    type: String,
  },
  points: {
    type: Number,
    default: 0,
  },
  author: {
    type: String,
  },
  postedAt: {
    type: String,
  },
  scrapedAt: {
    type: Date,
    default: Date.now,
  },
});

// Unique index on url to prevent duplicate stories from re-scraping
storySchema.index({ url: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Story', storySchema);
