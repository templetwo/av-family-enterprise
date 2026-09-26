import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Static build for GitHub Pages, the same shape as thetempleoftwo.com: every
 * route is prerendered to HTML at build time. Product pages are enumerated
 * from the content layer, so a new product is prerendered without touching
 * this file.
 */
async function productPaths(): Promise<string[]> {
  const { products } = await import("./src/data/content");
  return products.map((p) => `/software/${p.slug}`);
}

export default defineConfig(async () => ({
  server: { port: 8090, strictPort: true },
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      target: "static",
      prerender: {
        enabled: true,
        crawlLinks: true,
        pages: ["/", "/software", "/about", ...(await productPaths())].map((path) => ({ path })),
      },
    }),
    viteReact(),
  ],
}));
