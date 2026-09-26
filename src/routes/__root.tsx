import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { site } from "@/data/content";
import { pageMeta } from "@/lib/seo";
import appCss from "../styles.css?url";

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%230d1015'/%3E%3Ccircle cx='16' cy='16' r='12.5' fill='none' stroke='%23c9955a' stroke-width='1.5'/%3E%3Cpath d='M10 21 L16 9 L22 21' fill='none' stroke='%23c9955a' stroke-width='2.2' stroke-linejoin='round'/%3E%3Cpath d='M12.5 17 H19.5' stroke='%238fa3b8' stroke-width='2.2' stroke-linecap='round'/%3E%3C/svg%3E";

const rootMeta = pageMeta({
  title: `${site.name} — ${site.tagline}`,
  description:
    "AV Family Enterprise LLC builds local-first software for AI evaluation, operations research, developer tooling and education, published with its evidence.",
  path: "/",
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0d1015" },
      { name: "author", content: site.founder },
      ...rootMeta.meta,
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=IBM+Plex+Mono:wght@400;500&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&display=swap",
      },
      { rel: "icon", href: FAVICON, type: "image/svg+xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.legalName,
          url: site.origin,
          founder: { "@type": "Person", name: site.founder, sameAs: [site.linkedin, site.orcid, site.research] },
          sameAs: [site.github],
        }),
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  );
}
