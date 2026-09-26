import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Eyebrow, Steps, Ext } from "@/components/ui";
import { site } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta({
      title: "About | AV Family Enterprise LLC",
      description:
        "AV Family Enterprise LLC is an independent research and development company founded and led by Anthony J. Vasquez Sr., a U.S. Army veteran.",
      path: "/about",
    }),
  component: About,
});

const standards = [
  ["A question may precede the evidence. It may not answer.", "Every question entering the work is named as a question until an instrument says otherwise."],
  ["Every claim carries its standing.", "Type, lifecycle, and evidence travel with the claim wherever it appears. A shipping instrument, an untested hypothesis, and a first-person account are never shown as the same kind of thing."],
  ["Negative results stay visible.", "An idea that fails the test stays in the record. Constraining the hypothesis space is progress; deleting the failure destroys it."],
  ["Distinctions are kept.", "A hypothesis from a result; a prototype from a deployed system; an AI-generated proposal from an authorized action; a metric from its scope and date."],
];

function About() {
  return (
    <>
      <PageHeader eyebrow="About" title="Research. Software. Accountable systems.">
        AV Family Enterprise LLC is an independent research and development company working across scientific software,
        artificial intelligence, computational modeling, and research infrastructure. Our founder-led body of work spans
        governed AI workflows, persistent knowledge systems, local-first AI research, dynamical-system simulation, and
        computational biology.
      </PageHeader>

      <section className="section border-b border-rule bg-card">
        <div className="wrap grid items-start gap-10 md:grid-cols-[minmax(0,360px)_1fr] md:gap-16">
          <figure>
            <img src="/images/anthony-portrait.webp" alt="Anthony J. Vasquez Sr. at the console" width={1125} height={1500} className="aspect-[4/5] w-full rounded-md object-cover" />
            <figcaption className="mt-2 font-mono text-[11.5px] leading-snug text-ink-soft">
              At the console. Photograph from the founder’s public research site.
            </figcaption>
          </figure>
          <div>
            <h2 className="h2">Anthony J. Vasquez Sr.</h2>
            <p className="mt-2 font-mono text-[13px] text-ink-soft">
              Founder and managing member · U.S. Army veteran · Independent researcher ·{" "}
              <a className="tlink" href={site.orcid} target="_blank" rel="noopener">ORCID 0009-0000-6440-1506</a>
            </p>
            <p className="mt-5 max-w-[680px] text-ink-soft">
              Anthony J. Vasquez Sr. is the founder and managing member of AV Family Enterprise LLC. A U.S. Army veteran,
              he brings a practical, hands-on perspective to software and AI research, with an emphasis on
              accountability, useful tools, and disciplined technical follow-through.
            </p>
            <p className="mt-4 max-w-[680px] text-ink-soft">
              His background in automotive parts operations and industrial process work shaped a preference for tools
              that hold up in use: clear responsibilities, records that survive review, and room for a person to correct
              the system. His research interests span computational pharmacology, dynamical systems, AI architecture,
              and computational phenomenology.
            </p>
            <div className="gold-rule mt-8 max-w-[680px] pt-4">
              <h3 className="h3">Scale, stated plainly</h3>
              <p className="mt-2 text-ink-soft">
                AV Family Enterprise is founder-led. Projects are scoped to what one accountable engineer and named
                collaborators can deliver and stand behind. “Family” here means responsibility, continuity, and
                stewardship — not a staff roster.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Research origins</Eyebrow>
            <h2 className="h2 mt-4">The Temple of Two</h2>
            <p className="mt-5 text-ink-soft">
              The founder’s wider public research and human–AI collaboration practice is published through The Temple of
              Two. It began with a question across two substrates — biological and computational — about whether living
              cells and artificial systems share a grammar of threshold and commitment. Whether that recurrence is
              coincidence or constraint remains an open research question, and is labeled as one.
            </p>
            <p className="mt-4 text-ink-soft">
              Selected examples are referenced on this site to explain the technical approach and research lineage
              behind AV Family Enterprise’s work. Papers are published under CC BY 4.0; instruments carry their own
              licenses.
            </p>
            <p className="mt-4 text-ink-soft">
              AV Family Enterprise is the business-facing identity for scoped engagements; The Temple of Two is the
              wider research identity. A project’s appearance on this site does not change its license or ownership.
            </p>
            <a href={site.github} target="_blank" rel="noopener" className="tlink mt-5 inline-block">Public research on GitHub →</a>
          </div>
          <div>
            <Eyebrow>Standards applied to every claim</Eyebrow>
            <h2 className="h2 mt-4">Technical ambition, evidence discipline</h2>
            <ol className="mt-6 space-y-5">
              {standards.map(([h, t], i) => (
                <li key={h} className="grid grid-cols-[36px_1fr]">
                  <span className="mono pt-1 text-gold">0{i + 1}</span>
                  <div>
                    <p className="font-semibold">{h}</p>
                    <p className="mt-1 text-[15px] text-ink-soft">{t}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="card mt-8">
              <p className="mono text-ink-soft">A claim that changed after testing</p>
              <p className="mt-3 text-[15px]">
                Original thesis (2025): entropy maximisation is an engine that drives a system forward. Pre-registered
                test: if so, its effect should scale with the geometry of the state space in a specific way. Result (July
                2026): the geometry-scaling prediction failed; a second apparent effect dissolved under matched-estimator
                control. Published finding: entropy is a tunable equilibrium, not a prime mover — issued under its own
                DOI, with the earlier framing kept in the record.
              </p>
              <div className="mt-4">
                <Ext href="https://doi.org/10.5281/zenodo.21223845">DOI 10.5281/zenodo.21223845 ↗</Ext>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-rule bg-card">
        <div className="wrap">
          <Eyebrow>Working method</Eyebrow>
          <Steps variant="about" />
        </div>
      </section>
    </>
  );
}
