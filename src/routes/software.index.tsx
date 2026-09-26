import { createFileRoute, Link } from "@tanstack/react-router";
import { products, shotsFor } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/software/")({
  head: () =>
    pageMeta({
      title: "Software — AV Family Enterprise",
      description: "Six local-first projects: agent evaluation, operations research, an AI research harness, developer tooling and a chemistry studio.",
      path: "/software",
    }),
  component: SoftwareIndex,
});

function SoftwareIndex() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
      <p className="eyebrow">Software</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold">Every project, with its status</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-fg-soft">
        Each entry links to its public repository. The status line is quoted from that repository, not written for
        this page.
      </p>
      <ul className="mt-10 divide-y divide-border border-y border-border">
        {products.map((p) => (
          <li key={p.slug} className="grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="eyebrow text-steel">{p.kind}</p>
              <Link to="/software/$slug" params={{ slug: p.slug }} className="mt-1 inline-block font-serif text-2xl font-semibold no-underline hover:text-brass-bright">
                {p.name}
              </Link>
              <p className="mt-1 leading-relaxed text-fg-soft">{p.summary}</p>
              <p className="mt-2 font-mono text-xs text-muted">Status: {p.status}</p>
            </div>
            <p className="text-sm text-muted sm:text-right">{shotsFor(p.project).length} screenshots</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
