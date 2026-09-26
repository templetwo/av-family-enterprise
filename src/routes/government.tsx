import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui";
import { csLabel, site } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/government")({
  head: () =>
    pageMeta({
      title: "Government & Partners | AV Family Enterprise LLC",
      description:
        "Technical project discussions, research collaboration discussions, and the verified business record: UEI, CAGE and NAICS codes.",
      path: "/government",
    }),
  component: Government,
});

// Identifiers from handoff/03-claims-and-notices.md. Re-verify against the live SAM.gov record before each publication.
const record: [string, string][] = [
  ["Legal name", site.legalName],
  ["Business type", "Veteran-owned small business · Pennsylvania limited liability company"],
  ["Location", site.location],
  ["UEI", "PB6RGTBQKUL8"],
  ["CAGE", "9GDM0"],
  ["SAM.gov", "Registered entity — record checked 26 September 2026"],
  ["NAICS", "541511 · 541690 · 541720"],
  ["Principal", "Anthony J. Vasquez Sr., founder and managing member"],
  ["Research portfolio", "Founder-led; published through The Temple of Two under each project’s own license"],
];

function Government() {
  return (
    <>
      <PageHeader eyebrow="Government & Partners" title="Two ways to engage, one business you can look up">
        Government organizations, research institutions, and industry partners are prospective audiences and
        collaborators. This page separates technical project work from research collaboration, and both from the
        verified business record. No agency relationship, award history, or procurement eligibility is implied.
      </PageHeader>

      <section className="section">
        <div className="wrap grid gap-6 lg:grid-cols-2">
          <article className="card border-t-4 border-t-blue">
            <p className="mono text-blue">Path A</p>
            <h2 className="h2 mt-2">Technical project discussions</h2>
            <p className="mt-4 text-ink-soft">
              These lead to something concrete: a defined software prototype, an evaluation tool, a simulation
              environment, or an evidence-management workflow.
            </p>
            <h3 className="h3 mt-6">Agreed before work starts</h3>
            <ul className="mt-3 space-y-2 text-[15px]">
              {[
                "Scope and acceptance criteria",
                "Data handling and authority boundaries",
                "Documentation and provenance of artifacts",
                "Handoff so another competent person can continue the work",
              ].map((d) => (
                <li key={d} className="flex gap-3"><span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />{d}</li>
              ))}
            </ul>
            <p className="mt-6 text-[14.5px] text-ink-soft">
              Relevant areas: governed AI and agent authorization · custom software and technical interfaces ·
              persistent knowledge infrastructure · simulation and training environments · AI evaluation workflows.
            </p>
          </article>
          <article className="card border-t-4 border-t-gold">
            <p className="mono text-ink-soft">Path B</p>
            <h2 className="h2 mt-2">Research collaboration discussions</h2>
            <p className="mt-4 text-ink-soft">
              These start from a question: the work already completed, the unresolved limitation, and the expertise or
              validation needed next. This is where the biology and alternative-architecture investigations belong.
            </p>
            <h3 className="h3 mt-6">Expertise the open work needs</h3>
            <ul className="mt-3 space-y-2 text-[15px]">
              {[
                "Wet-lab collaborator (VDAC assays)",
                "Electrophysiology (ion channel recording)",
                "Pharmacology reviewer",
                "Dynamical systems theorist",
                "Computational phenomenology researcher",
              ].map((d) => (
                <li key={d} className="flex gap-3"><span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{d}</li>
              ))}
            </ul>
            <p className="mt-6 text-[14.5px] text-ink-soft">
              Not every research direction is ready for procurement or deployment — and early research does not make
              the company ordinary software contracting.
            </p>
          </article>
        </div>
      </section>

      <section className="section border-t border-rule bg-card">
        <div className="wrap grid gap-8 lg:grid-cols-[1.25fr_1fr]">
          <div className="card">
            <h2 className="h3">Verified business record</h2>
            <dl className="mt-4">
              {record.map(([k, v]) => (
                <div key={k} className="grid gap-1 border-t border-rule py-3 sm:grid-cols-[170px_1fr] sm:gap-4">
                  <dt className="mono pt-0.5 text-ink-soft">{k}</dt>
                  <dd className="text-[15px]">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[13.5px] text-ink-soft">
              Identifiers are drawn from the entity’s official records and re-verified before each publication.
              Registration is not a certification of capability.
            </p>
          </div>
          <div className="grid content-start gap-6">
            <div className="on-navy rounded-lg bg-navy p-6 text-on-navy">
              <p className="mono text-gold">Capability statement</p>
              <p className="mt-3 text-[15px]">
                A concise statement covering the business summary, six core competencies, relevant founder-led work,
                identifiers, confirmed classifications, and verified contact details. Portfolio work is distinguished
                from customer past performance; research availability from production support.
              </p>
              <Link to="/contact" className="btn btn-primary mt-5">{csLabel}</Link>
            </div>
            <div>
              <h3 className="h3">How an engagement is described</h3>
              <p className="mt-2 text-[15px] text-ink-soft">
                In terms of defined deliverables, acceptance against stated requirements and intended use, evaluation
                method, provenance of every artifact, and usable outputs another team can review. Those are standards we
                describe work against — not certifications we hold.
              </p>
            </div>
            <div>
              <h3 className="h3">What this page does not claim</h3>
              <p className="mt-2 text-[15px] text-ink-soft">
                No government customer relationships, contract awards, GSA Schedule, agency endorsements, security
                clearances, CMMC/ISO/SOC certifications, FedRAMP authorization, clinical results, or vendor partnerships.
                Certification badges appear only when current status has been verified. Listing research on this site
                does not assign its ownership to the LLC.
              </p>
            </div>
            <Link to="/contact" className="tlink">Go to contact →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
