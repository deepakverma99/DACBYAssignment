const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/stories', require('./routes/storyRoutes'));
app.use('/api', require('./routes/scrapeRoutes'));

const PORT = process.env.PORT || 5000;

// Connect to DB and start server
const startServer = async () => {
  try {
    await connectDB();

    // Auto-run scraper on server start
    const { scrapeHackerNews } = require('./scraper/hnScraper');
    try {
      const count = await scrapeHackerNews();
      console.log(`[Scraper] Initial scrape complete — ${count} stories upserted`);
    } catch (err) {
      console.error('[Scraper] Initial scrape failed:', err.message);
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
