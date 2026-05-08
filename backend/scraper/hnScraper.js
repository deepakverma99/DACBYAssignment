const axios = require('axios');
const cheerio = require('cheerio');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
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
    let url = titleEl.attr('href') || null;

    // Handle relative HN URLs
    if (url && url.startsWith('item?id=')) {
      url = `https://news.ycombinator.com/${url}`;
    }

    const subtextRow = $(el).next('tr');
    const pointsText = subtextRow.find('.score').text();
    const points = parseInt(pointsText, 10) || 0;
    const author = subtextRow.find('.hnuser').text() || 'unknown';
    const postedAt = subtextRow.find('.age').attr('title') || subtextRow.find('.age').text() || '';

    if (title) {
      stories.push({ title, url, points, author, postedAt, imageUrl: null, content: null });
    }
  });

  // Fetch images and content concurrently
  console.log(`[Scraper] Fetching images and content for ${stories.length} stories...`);
  await Promise.allSettled(
    stories.map(async (story) => {
      if (!story.url || story.url.includes('news.ycombinator.com/item?id=')) return;
      try {
        const response = await axios.get(story.url, { timeout: 5000 });
        const html = response.data;
        const $$ = cheerio.load(html);
        const ogImage = $$('meta[property="og:image"]').attr('content');
        if (ogImage) {
          story.imageUrl = ogImage.startsWith('/') ? new URL(ogImage, story.url).href : ogImage;
        }

        // Use Readability to extract article text
        const dom = new JSDOM(html, { url: story.url });
        const reader = new Readability(dom.window.document);
        const article = reader.parse();
        if (article && article.textContent) {
          story.content = article.textContent.trim();
        }
      } catch (err) {
        // Ignore timeouts or errors for fetching details
      }
    })
  );

  let upsertCount = 0;
  for (const story of stories) {
    await Story.findOneAndUpdate(
      { url: story.url },
      { ...story, scrapedAt: new Date() },
      { upsert: true, returnDocument: 'after' }
    );
    upsertCount++;
  }

  console.log(`[Scraper] Finished — ${upsertCount} stories upserted at ${new Date().toISOString()}`);
  return upsertCount;
};

module.exports = { scrapeHackerNews };
