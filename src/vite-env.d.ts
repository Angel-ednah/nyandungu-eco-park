/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ENDPOINT?: string;
  readonly VITE_QR_SCAN_FORMSPREE_ENDPOINT?: string;
  readonly VITE_QR_SCAN_EXTRA_FORMSPREE_ENDPOINTS?: string;
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GTM_ID?: string;
  readonly VITE_QR_SCAN_EMAIL_NOTIFICATIONS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}
