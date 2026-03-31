// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import sharp from "sharp";

// https://astro.build/config
export default defineConfig({
  site: "https://lmlgestion.com.ar",
  integrations: [mdx(), sitemap()],
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
});
