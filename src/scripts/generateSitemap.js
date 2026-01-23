import fs from 'fs';
import path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

const hostname = 'https://retangulo.org';
const postsDir = path.resolve('./src/pages/blog/posts');

const sitemap = new SitemapStream({ hostname });
const writeStream = createWriteStream('./public/sitemap.xml');
sitemap.pipe(writeStream);

sitemap.write({ url: '/', priority: 1.0 });
sitemap.write({ url: '/blog', priority: 0.9 });
sitemap.write({ url: '/options', priority: 0.8 });

const files = fs.readdirSync(postsDir);

files.forEach((file) => {
  if (!file.endsWith('.mdx')) return;

  const slug = file.replace('.mdx', '');
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/lastmod:\s*["']?([\d-]+)["']?/);
  const lastmod = match ? match[1] : null;

  sitemap.write({
    url: `/blog/${slug}`,
    lastmod: lastmod, // YYYY-MM-DD
    priority: 0.7,
  });
});

sitemap.end();
await streamToPromise(sitemap);

console.log('sitemap.xml gerado');
