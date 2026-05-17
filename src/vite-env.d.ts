/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_REVIEW_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}
