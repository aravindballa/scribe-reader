/// <reference types="astro/client" />

type ENV = {
  READWISE_TOKEN: string;
};

// Depending on your adapter mode
// use `AdvancedRuntime<ENV>` for advance runtime mode
// use `DirectoryRuntime<ENV>` for directory runtime mode
type Runtime = import('@astrojs/cloudflare').AdvancedRuntime<ENV>;
declare namespace App {
  interface Locals extends Runtime {}
}
