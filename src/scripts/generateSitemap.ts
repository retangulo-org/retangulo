import fs from "node:fs";
import path from "node:path";
import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "node:fs";

const hostname: string = "https://retangulo.org";
const postsDir: string = path.resolve("./src/pages/blog/posts");

async function generateSitemap(): Promise<void> {
  const sitemap = new SitemapStream({ hostname });
  const writeStream = createWriteStream("./public/sitemap.xml");

  sitemap.pipe(writeStream);

  sitemap.write({ url: "/", priority: 1.0 });
  sitemap.write({ url: "/blog", priority: 0.9 });
  sitemap.write({ url: "/options", priority: 0.8 });

  const files: string[] = fs.readdirSync(postsDir);

  files.forEach((file: string) => {
    if (!file.endsWith(".mdx")) return;

    const slug: string = file.replace(".mdx", "");
    const filePath: string = path.join(postsDir, file);
    const content: string = fs.readFileSync(filePath, "utf8");

    const match: RegExpMatchArray | null =
      content.match(/lastmod:\s*["']?([\d-]+)["']?/);

    const lastmod: string | undefined = match?.[1];

    sitemap.write({
      url: `/blog/${slug}`,
      lastmod,
      priority: 0.7,
    });
  });

  sitemap.end();
  await streamToPromise(sitemap);

  console.log("sitemap.xml gerado");
}

generateSitemap().catch((err: unknown) => {
  console.error("Erro ao gerar sitemap:", err);
  process.exit(1);
});