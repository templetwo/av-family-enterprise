import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import { site } from "@/data/content";
import { pageMeta } from "@/lib/seo";
import appCss from "../styles.css?url";

// Search presentation from handoff/01-page-copy.md.
const rootMeta = pageMeta({
  title: "AV Family Enterprise LLC | Applied AI Research & Software",
  description:
    "Veteran-owned Pennsylvania business focused on governed AI research, custom software, and industrial simulation. Explore work and discuss a scoped project.",
  path: "/",
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0B1424" },
      ...rootMeta.meta,
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/brand/avfe-monogram-color.svg", type: "image/svg+xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.legalName,
          url: site.origin,
          logo: `${site.origin}/brand/avfe-monogram-color.svg`,
          address: { "@type": "PostalAddress", addressRegion: "PA", addressCountry: "US" },
          founder: { "@type": "Person", name: site.founder, sameAs: [site.orcid] },
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
