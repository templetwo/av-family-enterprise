import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta({
      title: "About — AV Family Enterprise",
      description: `${site.legalName} is the company behind ${site.founder}'s independent software and research.`,
      path: "/about",
    }),
  component: About,
});

function About() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-14 sm:px-6">
      <p className="eyebrow">About</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold">{site.legalName}</h1>
      <div className="mt-6 space-y-5 text-lg leading-relaxed text-fg-soft">
        <p>
          AV Family Enterprise is a family company, founded and led by {site.founder} It is the home of his
          independent software: tools that run locally, work on data you control, and keep a record you can check.
        </p>
        <p>
          The research behind this software, including preprints, instruments and the published record, lives at{" "}
          <a className="link" href={site.research}>The Temple of Two</a>. The source for every project is public on{" "}
          <a className="link" href={site.github}>GitHub</a>.
        </p>
      </div>
      <div className="mt-10 rounded-lg border border-border bg-surface p-6">
        <h2 className="font-serif text-2xl font-semibold">Get in touch</h2>
        <p className="mt-2 leading-relaxed text-fg-soft">
          For inquiries, use the <a className="link" href={site.inquiry}>inquiry form</a> or reach {site.founder} on{" "}
          <a className="link" href={site.linkedin}>LinkedIn</a>.
        </p>
      </div>
    </section>
  );
}
