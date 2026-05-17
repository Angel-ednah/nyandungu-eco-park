import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const installGoogleAnalytics = () => {
  if (!measurementId || window.gtag) {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
};

const getSectionFromPath = (path: string) => {
  const section = path.replace(/^\/+/, "").split("/")[0];
  return section || "home";
};

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    installGoogleAnalytics();
  }, []);

  useEffect(() => {
    if (!measurementId || !window.gtag) {
      return;
    }

    const path = `${location.pathname}${location.search}`;
    const params = new URLSearchParams(location.search);
    const sectionId = params.get("section") ?? getSectionFromPath(location.pathname);

    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
      section_id: sectionId,
    });

    if (params.get("utm_source") === "qr") {
      window.gtag("event", "qr_scan", {
        section_id: sectionId,
        qr_source: params.get("utm_medium") ?? "park_sign",
        qr_campaign: params.get("utm_campaign") ?? "section_qr",
      });
    }
  }, [location.pathname, location.search]);
};
