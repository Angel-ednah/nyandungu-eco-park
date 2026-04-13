import { useEffect } from "react";

const SITE_NAME = "Discover Nyandungu Eco Park";
const DEFAULT_DESCRIPTION =
  "Explore Nyandungu Eco Park in Kigali, Rwanda. Scan QR codes to discover wildlife, trails, birds, gardens, and visitor information.";
const DEFAULT_IMAGE = "/og-image.svg";

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

interface SEOOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: string;
  keywords?: string[];
  noindex?: boolean;
  lang?: string;
  jsonLd?: JsonLd;
}

function toAbsoluteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return new URL(value, window.location.origin).toString();
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
  type = "website",
  keywords = [],
  noindex = false,
  lang = "en",
  jsonLd,
}: SEOOptions) {
  useEffect(() => {
    const url = toAbsoluteUrl(path ?? window.location.pathname);
    const imageUrl = toAbsoluteUrl(image);
    const robots = noindex ? "noindex, nofollow" : "index, follow";
    const normalizedTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const locale = lang.startsWith("rw") ? "rw_RW" : "en_RW";

    document.title = normalizedTitle;
    document.documentElement.lang = lang;

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="robots"]', "name", "robots", robots);
    upsertMeta("meta[name=\"application-name\"]", "name", "application-name", SITE_NAME);
    upsertMeta('meta[name="theme-color"]', "name", "theme-color", "#1f5b45");

    if (keywords.length > 0) {
      upsertMeta('meta[name="keywords"]', "name", "keywords", keywords.join(", "));
    }

    upsertMeta('meta[property="og:title"]', "property", "og:title", normalizedTitle);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:type"]', "property", "og:type", type);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", SITE_NAME);
    upsertMeta('meta[property="og:locale"]', "property", "og:locale", locale);

    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", normalizedTitle);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);

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
  }, [description, image, jsonLd, keywords, lang, noindex, path, title, type]);
}

export { SITE_NAME };
