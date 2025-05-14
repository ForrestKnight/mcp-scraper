#!/usr/bin/env node
require('dotenv').config();
const { chromium } = require('playwright');
const { OpenAI } = require('openai');

(async () => {
  const browser = await chromium.connectOverCDP(process.env.PLAYWRIGHT_WS_ENDPOINT);
  const context = await browser.newContext();
  const page = await context.newPage();

  const [,, city, checkin, checkout] = process.argv;

  if (!city || !checkin || !checkout) {
    console.error('Usage: travelAgent <city> <checkin YYYY-MM-DD> <checkout YYYY-MM-DD>');
    process.exit(1);
  }

  await page.goto(`https://www.booking.com/searchresults.html?ss=${city}&checkin=${checkin}&checkout=${checkout}`, { waitUntil: 'load', timeout: 60000 });
  await page.waitForSelector('[data-testid="property-card"]');

  const hotels = await page.$$eval('[data-testid="property-card"]', cards =>
    cards.slice(0, 5).map(card => ({
      title: card.querySelector('[data-testid="title"]')?.textContent,
      price: card.querySelector('[data-testid="price-and-discounted-price"]')?.textContent,
      rating: card.querySelector('[data-testid="review-score"]')?.textContent
    }))
  );

  await browser.close();

  console.log('\n🏨 Top Hotels:\n', hotels);

  const prompt = `Here are some hotels in ${city}:\n${hotels.map(h => `${h.title} - ${h.price}, Rated: ${h.rating}`).join('\n')}\nCreate a 3-day trip plan based on these.`;

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }]
  });

  console.log('\n📅 Itinerary:\n', res.choices[0].message.content);
})();
