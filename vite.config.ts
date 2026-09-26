import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Static build for GitHub Pages, the same shape as thetempleoftwo.com: every
 * route is prerendered to HTML at build time.
 */
export default defineConfig(() => ({
  server: { port: 8090, strictPort: true },
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      target: "static",
      prerender: {
        enabled: true,
        crawlLinks: true,
        pages: ["/", "/capabilities", "/research", "/government", "/about", "/contact", "/notices"].map((path) => ({ path })),
      },
    }),
    viteReact(),
  ],
}));
