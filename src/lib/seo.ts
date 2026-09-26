import { site } from "@/data/content";

export function canonical(path: string): string {
  return path === "/" ? `${site.origin}/` : `${site.origin}${path}`;
}

export function pageMeta({
  title,
  description,
  path,
  image = "/images/software/moa--hero--1920x1200.webp",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const url = canonical(path);
  const og = `${site.origin}${image}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:site_name", content: site.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: og },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
