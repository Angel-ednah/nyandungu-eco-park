import { useEffect } from "react";

const SITE_NAME = "Discover Nyandungu Eco Park";
const DEFAULT_DESCRIPTION =
  "Explore Nyandungu Eco Park in Kigali, Rwanda. Scan QR codes to discover wildlife, trails, birds, gardens, and visitor information.";
const DEFAULT_IMAGE = "/og-image.svg";
const FALLBACK_SITE_URL = "https://nyandungu-eco-park.vercel.app";

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

interface SEOOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: string;
  keywords?: string[];
  noindex?: boolean;
  lang?: string;
  jsonLd?: JsonLd;
}

function normalizeSiteUrl(value?: string) {
  if (!value) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
}

function getSiteUrl() {
  return (
    normalizeSiteUrl(import.meta.env.VITE_SITE_URL) ??
    normalizeSiteUrl(window.location.origin) ??
    FALLBACK_SITE_URL
  );
}

function toAbsoluteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return new URL(value, getSiteUrl()).toString();
}

function upsertMeta(
  selector: string,
  attributeName: "name" | "property",
  attributeValue: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function removeMeta(selector: string) {
  document.head.querySelector(selector)?.remove();
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function useSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_IMAGE,
  imageAlt = SITE_NAME,
  type = "website",
  keywords = [],
  noindex = false,
  lang = "en",
  jsonLd,
}: SEOOptions) {
  useEffect(() => {
    const url = toAbsoluteUrl(path ?? window.location.pathname);
    const imageUrl = toAbsoluteUrl(image);
    const robots = noindex
      ? "noindex, nofollow, noarchive"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    const normalizedTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const locale = lang.startsWith("rw") ? "rw_RW" : "en_RW";

    document.title = normalizedTitle;
    document.documentElement.lang = lang;

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="robots"]', "name", "robots", robots);
    upsertMeta('meta[name="googlebot"]', "name", "googlebot", robots);
    upsertMeta("meta[name=\"application-name\"]", "name", "application-name", SITE_NAME);
    upsertMeta('meta[name="theme-color"]', "name", "theme-color", "#1f5b45");
    upsertMeta('meta[name="author"]', "name", "author", SITE_NAME);
    upsertMeta('meta[name="creator"]', "name", "creator", SITE_NAME);
    upsertMeta('meta[name="publisher"]', "name", "publisher", SITE_NAME);

    if (keywords.length > 0) {
      upsertMeta('meta[name="keywords"]', "name", "keywords", keywords.join(", "));
    } else {
      removeMeta('meta[name="keywords"]');
    }

    upsertMeta('meta[property="og:title"]', "property", "og:title", normalizedTitle);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:type"]', "property", "og:type", type);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
    upsertMeta('meta[property="og:image:secure_url"]', "property", "og:image:secure_url", imageUrl);
    upsertMeta('meta[property="og:image:alt"]', "property", "og:image:alt", imageAlt);
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", SITE_NAME);
    upsertMeta('meta[property="og:locale"]', "property", "og:locale", locale);

    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", normalizedTitle);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);
    upsertMeta('meta[name="twitter:image:alt"]', "name", "twitter:image:alt", imageAlt);

    upsertLink("canonical", url);

    const existingJsonLd = document.head.querySelector<HTMLScriptElement>("#seo-jsonld");
    if (jsonLd) {
      const script = existingJsonLd ?? document.createElement("script");
      script.id = "seo-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);

      if (!existingJsonLd) {
        document.head.appendChild(script);
      }
    } else if (existingJsonLd) {
      existingJsonLd.remove();
    }
  }, [description, image, imageAlt, jsonLd, keywords, lang, noindex, path, title, type]);
}

export { DEFAULT_DESCRIPTION, SITE_NAME };
