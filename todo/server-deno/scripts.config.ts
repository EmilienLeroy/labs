
import { DenonConfig } from "https://deno.land/x/denon@2.4.7/mod.ts";
import { config as env } from "https://deno.land/x/dotenv/mod.ts";

const config: DenonConfig = {
  scripts: {
    dev: {
      cmd: "deno run src/index.ts",
      desc: "Running in development mode",
      importmap: 'import_map.json',
      allow: ['net', 'env'],
      env: env()
    },
  },
};

export default config;