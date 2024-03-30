/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly READWISE_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
