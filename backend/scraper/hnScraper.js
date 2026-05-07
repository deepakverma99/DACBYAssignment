const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

/**
 * Scrapes the top 10 stories from Hacker News front page.
 * Uses axios + cheerio (no Puppeteer needed — HN renders static HTML).
 * Upserts stories into MongoDB to prevent duplicates.
 * @returns {Promise<number>} Number of stories upserted/updated.
 */
const scrapeHackerNews = async () => {
  console.log(`[Scraper] Starting scrape at ${new Date().toISOString()}`);

  const { data } = await axios.get('https://news.ycombinator.com');
  const $ = cheerio.load(data);

  const stories = [];
  const storyRows = $('.athing').slice(0, 10);

  storyRows.each((i, el) => {
    const titleEl = $(el).find('.titleline > a');
    const title = titleEl.text();
    const url = titleEl.attr('href') || null;

    // The subtext row is the next sibling <tr>
    const subtextRow = $(el).next('tr');
    const pointsText = subtextRow.find('.score').text();
    const points = parseInt(pointsText, 10) || 0;
    const author = subtextRow.find('.hnuser').text() || 'unknown';
    const postedAt = subtextRow.find('.age').attr('title') || subtextRow.find('.age').text() || '';

    if (title) {
      stories.push({ title, url, points, author, postedAt });
    }
  });

  let upsertCount = 0;
  for (const story of stories) {
    await Story.findOneAndUpdate(
      { url: story.url },
      { ...story, scrapedAt: new Date() },
      { upsert: true, new: true }
    );
    upsertCount++;
  }

  console.log(`[Scraper] Finished — ${upsertCount} stories upserted at ${new Date().toISOString()}`);
  return upsertCount;
};

module.exports = { scrapeHackerNews };
