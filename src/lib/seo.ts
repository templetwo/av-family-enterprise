import { site } from "@/data/content";

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }) {
  const url = path === "/" ? `${site.origin}/` : `${site.origin}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:site_name", content: "AV Family Enterprise" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: `${site.origin}/images/sim-unit01.webp` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
