import { SitemapStream, streamToPromise } from 'sitemap';
import fs from 'fs';
import path from 'path';

// Create a stream for the sitemap
const sitemapStream = new SitemapStream({ hostname: 'hhttps://nothanks.vercel.app' });

// List all the routes of your app
const pages = [
  '/',
  '/about',
  '/download',
  '/products',
 
  // Add other paths you want to include
];

pages.forEach((page) => {
  sitemapStream.write({ url: page, changefreq: 'weekly', priority: 0.7 });
});

sitemapStream.end();

// Save sitemap to file
streamToPromise(sitemapStream).then((data) => {
  fs.writeFileSync(path.resolve('public', 'sitemap.xml'), data);
});
