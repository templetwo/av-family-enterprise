import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { products, shotsFor, heroFor } from "@/data/content";
import { pageMeta } from "@/lib/seo";
import { Shot } from "@/components/shot";

export const Route = createFileRoute("/software/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageMeta({
          title: `${loaderData.name} — AV Family Enterprise`,
          description: loaderData.summary,
          path: `/software/${loaderData.slug}`,
          image: heroFor(loaderData.project)?.src,
        })
      : {},
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const hero = heroFor(p.project);
  const rest = shotsFor(p.project).filter((s) => s !== hero);
  return (
    <article className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
      <Link to="/software" className="text-sm text-muted no-underline hover:text-fg">← All software</Link>
      <p className="eyebrow mt-6 text-steel">{p.kind}</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">{p.name}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-fg-soft">{p.summary}</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4 leading-relaxed text-fg-soft">
          {p.body.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
        <aside className="h-fit rounded-lg border border-border bg-surface p-5 text-sm">
          <p className="eyebrow">Status, from the README</p>
          <p className="mt-2 leading-relaxed">{p.status}</p>
          <a className="link mt-4 inline-block" href={p.repo}>View the repository</a>
        </aside>
      </div>
      {hero && (
        <div className="mt-10">
          <Shot shot={hero} eager />
        </div>
      )}
      {rest.length > 0 && (
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {rest.map((s) => (
            <Shot key={s.src} shot={s} />
          ))}
        </div>
      )}
      <p className="mt-8 text-xs text-muted">
        Screenshots captured from commit {hero?.commit} on synthetic, scripted or offline data.
      </p>
    </article>
  );
}
