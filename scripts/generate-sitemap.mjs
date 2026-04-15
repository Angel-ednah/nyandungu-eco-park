import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const FALLBACK_SITE_URL = "https://nyandungu-eco-park.vercel.app";

const routes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/nyandungu-info", changefreq: "monthly", priority: "0.9" },
  { path: "/peacock", changefreq: "monthly", priority: "0.8" },
  { path: "/top-ten", changefreq: "monthly", priority: "0.8" },
  { path: "/trails", changefreq: "monthly", priority: "0.8" },
];

function normalizeSiteUrl(value) {
  if (!value) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
}

const siteUrl =
  normalizeSiteUrl(process.env.VITE_SITE_URL) ??
  normalizeSiteUrl(process.env.SITE_URL) ??
  normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  normalizeSiteUrl(process.env.VERCEL_URL) ??
  FALLBACK_SITE_URL;

const today = new Date().toISOString().split("T")[0];
const publicDir = path.resolve(process.cwd(), "public");

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

await mkdir(publicDir, { recursive: true });
await writeFile(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
await writeFile(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");

console.log(`[seo] Generated sitemap.xml and robots.txt for ${siteUrl}`);
