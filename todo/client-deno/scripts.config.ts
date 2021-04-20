import { DenonConfig } from "https://deno.land/x/denon@2.4.7/mod.ts";

const config: DenonConfig = {
  scripts: {
    dev: {
      cmd: "deno bundle src/index.ts public/index.bundle.js",
      desc: "Running in development mode",
      tsconfig: "tsconfig.json",
      importmap: 'import_map.json',
    },
  },
  watcher: {
    exts: ["ts"],
  }
};

export default config;