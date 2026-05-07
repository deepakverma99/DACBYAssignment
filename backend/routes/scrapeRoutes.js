const express = require('express');
const router = express.Router();
const { scrapeHackerNews } = require('../scraper/hnScraper');

// POST /api/scrape — manually trigger the HackerNews scraper
router.post('/scrape', async (req, res) => {
  try {
    const count = await scrapeHackerNews();
    res.json({ success: true, count, message: `${count} stories scraped/updated` });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Scraping failed', error: err.message });
  }
});

module.exports = router;
