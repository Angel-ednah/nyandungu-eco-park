import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TagManager from "react-gtm-module";

const defaultMeasurementId = "G-BF5SLPQQQ8";
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || defaultMeasurementId;
const gtmId = import.meta.env.VITE_GTM_ID?.trim() ?? "";
const formspreeEndpoint =
  import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() || "https://formspree.io/f/xaqklnde";
const qrScanFormspreeEndpoint = import.meta.env.VITE_QR_SCAN_FORMSPREE_ENDPOINT?.trim() || formspreeEndpoint;
const qrScanExtraFormspreeEndpoints =
  import.meta.env.VITE_QR_SCAN_EXTRA_FORMSPREE_ENDPOINTS?.split(",")
    .map((endpoint) => endpoint.trim())
    .filter(Boolean) ?? [];
const qrScanFormspreeEndpoints = [qrScanFormspreeEndpoint, ...qrScanExtraFormspreeEndpoints].filter(Boolean);
const shouldNotifyQrScans = import.meta.env.VITE_QR_SCAN_EMAIL_NOTIFICATIONS !== "false";
let isTagManagerInstalled = false;

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

const installGoogleTagManager = () => {
  if (!gtmId || isTagManagerInstalled) {
    return;
  }

  TagManager.initialize({ gtmId });
  isTagManagerInstalled = true;
};

const getSectionFromPath = (path: string) => {
  const section = path.replace(/^\/+/, "").split("/")[0];
  return section || "home";
};

const notifyQrScan = (qrScanEvent: Record<string, unknown>) => {
  if (!shouldNotifyQrScans || qrScanFormspreeEndpoints.length === 0) {
    return;
  }

  const notificationKey = `qr_scan_notified:${window.location.href}`;
  if (sessionStorage.getItem(notificationKey)) {
    return;
  }

  sessionStorage.setItem(notificationKey, "true");

  const formData = new FormData();
  formData.set("subject", `Nyandungu Eco Park QR scan: ${qrScanEvent.section_id}`);
  formData.set("from_name", "Nyandungu Eco Park QR Tracker");
  formData.set("event", "qr_scan");
  formData.set("scanned_at", new Date().toISOString());
  formData.set("page", window.location.href);
  formData.set("referrer", document.referrer || "Direct / no referrer");
  formData.set("visitor_language", navigator.language || "Unknown");
  formData.set("visitor_timezone", Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown");
  formData.set("visitor_device", navigator.userAgent);

  Object.entries(qrScanEvent).forEach(([key, value]) => {
    formData.set(key, String(value));
  });

  qrScanFormspreeEndpoints.forEach((endpoint) => {
    fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
      keepalive: true,
    }).catch(() => {
      sessionStorage.removeItem(notificationKey);
    });
  });
};

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    installGoogleAnalytics();
    installGoogleTagManager();
  }, []);

  useEffect(() => {
    if (!measurementId || !window.gtag) {
      return;
    }

    const path = `${location.pathname}${location.search}`;
    const params = new URLSearchParams(location.search);
    const sectionId = params.get("section") ?? getSectionFromPath(location.pathname);
    const debugMode = import.meta.env.DEV || params.get("debug_analytics") === "1";

    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
      section_id: sectionId,
      debug_mode: debugMode,
    });

    if (params.get("utm_source") === "qr") {
      const qrScanEvent = {
        section_id: sectionId,
        qr_id: params.get("qr_id") ?? `park_sign_${sectionId}`,
        qr_source: params.get("utm_medium") ?? "park_sign",
        qr_campaign: params.get("utm_campaign") ?? "section_qr",
        page_path: path,
        debug_mode: debugMode,
      };

      window.gtag("event", "qr_scan", qrScanEvent);
      notifyQrScan(qrScanEvent);

      TagManager.dataLayer({
        dataLayer: {
          event: "qr_scan",
          ...qrScanEvent,
        },
      });

      if (debugMode) {
        console.info("[analytics] qr_scan sent", {
          measurementId,
          ...qrScanEvent,
        });
      }
    }
  }, [location.pathname, location.search]);
};
