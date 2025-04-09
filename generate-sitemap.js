import { SitemapStream, streamToPromise } from 'sitemap';
import fs from 'fs';

// Array of pages to include in the sitemap
const pages = [
  '/',
  '/about',
  '/download',
  '/products',
  // Add other paths here if needed
];

// Base URL (corrected)
const baseUrl = 'https://nothanks.vercel.app'; // Ensure this is the correct URL

const sitemap = new SitemapStream({ hostname: baseUrl });

const writeStream = fs.createWriteStream('./public/sitemap.xml');

sitemap.pipe(writeStream);

pages.forEach(page => {
  // Make sure URLs are properly formed with base URL
  sitemap.write({ url: page, changefreq: 'weekly', priority: 0.7 });
});

sitemap.end();
