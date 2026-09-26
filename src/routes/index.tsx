import { createFileRoute, Link } from "@tanstack/react-router";
import { areas, csLabel } from "@/data/content";
import { Eyebrow, Figure, Steps, Ext } from "@/components/ui";

export const Route = createFileRoute("/")({ component: Home });

const identity = [
  ["Veteran-owned", "Founded and led by a U.S. Army veteran"],
  ["Pennsylvania-based", "Registered Pennsylvania LLC"],
  ["Founder-led", "Scoped engagements with direct accountability"],
  ["Evidence-first", "Every claim carries its type, lifecycle and evidence"],
];

const portfolio = [
  ["Sovereign Stack", "instrument, in use"],
  ["Phenomenological Compass", "study, supported within scope"],
  ["The Black Box Boundary", "study, bounded n=1"],
  ["Entropy as a Tunable Equilibrium", "study, bounded null"],
  ["Project Epistemic Bound", "instrument, release blocked"],
  ["Master Operations Agent", "research workbench, ongoing"],
];

function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="on-navy bg-navy text-on-navy">
        <div className="wrap grid items-center gap-12 py-[clamp(56px,8vw,104px)] lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="eyebrow">AV Family Enterprise LLC · Veteran-owned · Pennsylvania</p>
            <h1 className="h1 mt-5 text-white lg:text-[clamp(40px,4.1vw,58px)]">
              Applied intelligence.
              <br />
              Accountable systems.
            </h1>
            <p className="lead mt-6 text-on-navy">
              An independent, veteran-owned research and development company working across scientific software,
              artificial intelligence, computational modeling, and research infrastructure.
            </p>
            <p className="mt-5 max-w-[640px] text-on-navy-soft">
              We build instruments for understanding complex systems — and infrastructure for keeping the resulting
              work accountable. A hypothesis is not a result, a prototype is not a deployed system, and an AI-generated
              proposal is not an authorized action.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/capabilities" className="btn btn-primary">Explore our capabilities</Link>
              <Link to="/research" className="btn btn-ghost">View research & demonstrations</Link>
            </div>
          </div>

          <div className="grid gap-4">
            <figure>
              <div className="overflow-hidden rounded-md border border-white/15">
                <div className="mono bg-navy-tile px-3 py-1.5 text-gold">Fig. 01 · Software</div>
                <Figure
                  src="/images/sim-unit01.webp"
                  alt="Unit 01 process graphic from the independent operator training simulator: feed tank, jacketed reactor, preheater and flash drum"
                  width={1800}
                  height={1323}
                  ratio="1800/1323"
                  eager
                />
              </div>
              <figcaption className="mt-2 font-mono text-[11.5px] leading-snug text-on-navy-soft">
                Synthetic training environment — independent operator training simulator, Unit 01. Not a Honeywell
                product.
              </figcaption>
            </figure>
            <div className="grid grid-cols-2 gap-4">
              <figure>
                <div className="overflow-hidden rounded-md border border-white/15">
                  <div className="mono bg-navy-tile px-3 py-1.5 text-gold">Fig. 02 · Science</div>
                  <Figure
                    src="/images/vdac1-diagram.webp"
                    alt="VDAC1 rendered as a gate, annotated with hexokinase-II, Bcl-xL, and the cholesterol ratio"
                    width={784}
                    height={1168}
                    ratio="4/3"
                    position="center 30%"
                    eager
                  />
                </div>
                <figcaption className="mt-2 font-mono text-[11px] leading-snug text-on-navy-soft">
                  VDAC1 Pharmacology Atlas — computational hypotheses, untested in vivo.
                </figcaption>
              </figure>
              <figure>
                <div className="h-full overflow-hidden rounded-md border border-white/15 bg-navy-tile">
                  <div className="mono px-3 py-1.5 text-gold">Fig. 03 · Record</div>
                  <dl className="grid gap-4 px-3 pb-3 pt-1 font-mono text-[11px] leading-relaxed text-on-navy" aria-label="Illustration: two example standing records">
                    {[
                      ["Instrument", "Living · v1.21.0", "In use, self-verifying"],
                      ["Study", "Closed · v4.3", "Bounded null"],
                    ].map(([t, l, e]) => (
                      <div key={t} className="border-t border-white/10 pt-2">
                        <div className="grid grid-cols-[72px_1fr]"><dt className="text-on-navy-soft">type</dt><dd>{t}</dd></div>
                        <div className="grid grid-cols-[72px_1fr]"><dt className="text-on-navy-soft">lifecycle</dt><dd>{l}</dd></div>
                        <div className="grid grid-cols-[72px_1fr]"><dt className="text-on-navy-soft">evidence</dt><dd>{e}</dd></div>
                      </div>
                    ))}
                  </dl>
                </div>
                <figcaption className="mt-2 font-mono text-[11px] leading-snug text-on-navy-soft">
                  Illustration — the standing every project carries: type, lifecycle, evidence.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Identity strip */}
      <section className="border-b border-rule bg-card">
        <ul className="wrap grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {identity.map(([h, t]) => (
            <li key={h} className="gold-rule pt-4">
              <p className="font-semibold">{h}</p>
              <p className="mt-1 text-[15px] text-ink-soft">{t}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Capabilities */}
      <section className="section">
        <div className="wrap">
          <Eyebrow>01 / Capabilities</Eyebrow>
          <h2 className="h2 mt-4">Six areas of work, one method</h2>
          <p className="lead mt-4 text-ink-soft">
            Each area turns a difficult question into inspectable models, bounded experiments, and documented findings.
            Projects appear beneath the capability they substantiate — not the other way round.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <article key={a.n} className="card flex flex-col">
                <p className="mono text-ink-soft">{a.n}</p>
                <h3 className="h3 mt-2">{a.title}</h3>
                <p className="mt-3 flex-1 text-[15px] text-ink-soft">{a.short}</p>
                <p className="mt-4 text-[13px] text-ink-soft">Evidence: {a.evidenceShort}</p>
              </article>
            ))}
          </div>
          <Link to="/capabilities" className="tlink mt-8 inline-block">
            Problems addressed, deliverables and boundaries for each area →
          </Link>
        </div>
      </section>

      {/* 4. Selected evidence */}
      <section className="section border-y border-rule bg-card">
        <div className="wrap">
          <Eyebrow>02 / Selected evidence</Eyebrow>
          <h2 className="h2 mt-4">Three branches, three kinds of standing</h2>
          <p className="lead mt-4 text-ink-soft">
            A published protocol, a shipping training instrument, and an untested hypothesis set. They are not the same
            kind of thing, and the labels say so.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <EvidenceCard
              media={
                <div className="relative flex aspect-video flex-col justify-end bg-navy p-4 font-mono text-[12.5px] leading-relaxed text-on-navy" role="img" aria-label="Illustration of the protocol invariants">
                  <span className="absolute left-3 top-3 rounded-sm bg-navy-tile px-2 py-0.5 text-[10.5px] uppercase tracking-[0.1em] text-gold">Illustration · Protocol invariants</span>
                  <p><span className="text-on-navy-soft">ground state</span> → <b className="text-white">deny</b></p>
                  <p><span className="text-on-navy-soft">allow</span> → requires an unforgeable sentinel</p>
                  <p><span className="text-on-navy-soft">boundary</span> → kernel sandbox floor, not the policy layer</p>
                </div>
              }
              standing="Governed AI · RFC · Published v1.1 · Supported within scope"
              title="COSMIC-ALLOW"
              text="A cross-vendor proof-of-allow protocol for AI coding-agent cockpits. Deny is the ground state; allow requires positive, unforgeable proof; the sandbox floor is the load-bearing boundary. Reference implementation in cosmic-cli (Apache-2.0)."
              limits="Not a claim that any specific deployment is secure."
              link={<Ext href="https://doi.org/10.5281/zenodo.21461197">DOI 10.5281/zenodo.21461197 →</Ext>}
            />
            <EvidenceCard
              media={
                <Figure src="/images/sim-alarms.webp" alt="Alarm summary during a simulated feed-pump trip drill, with one urgent unacknowledged alarm" tag="Synthetic training environment" width={1800} height={1323} />
              }
              standing="Simulation · Independent training aid · v3.1.0 · Shipping"
              title="Operator training simulator"
              text="A browser-based environment for exploring synthetic process behavior, alarms, trends, operator controls, and instructor-driven scenarios, with training records and a standalone offline build."
              limits="Not a Honeywell product. No certified qualification or site connection implied."
              link={<Ext href="https://github.com/templetwo/experion-station-sim">Repository →</Ext>}
            />
            <EvidenceCard
              media={
                <Figure src="/images/vdac1-diagram.webp" alt="VDAC1 rendered as a gate with annotated cofactors" tag="Scientific illustration" width={784} height={1168} position="center 30%" />
              }
              standing="Computational biology · Hypothesis set · Awaiting wet-lab validation · Untested in vivo"
              title="VDAC1 Pharmacology Atlas"
              text="Mechanistic hypothesis development for mitochondrial gating: a cofactor model of how hexokinase-II, Bcl-xL, and cholesterol jointly set the apoptotic threshold, with 24 testable predictions and a candidate biomarker."
              limits="None of the 24 predictions has been tested at a bench. Two of three cohorts returned nulls."
              link={<Ext href="https://doi.org/10.17605/OSF.IO/C9RQB">Atlas on OSF →</Ext>}
            />
          </div>
          <div className="mt-10 border-t border-rule pt-6">
            <p className="mono text-ink-soft">Also in the portfolio</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px]">
              {portfolio.map(([n, s]) => (
                <li key={n}><b className="font-semibold">{n}</b> <span className="text-ink-soft">· {s}</span></li>
              ))}
            </ul>
            <Link to="/research" className="tlink mt-4 inline-block">The full portfolio, organised by research area →</Link>
          </div>
        </div>
      </section>

      {/* 5. Working method */}
      <section className="section">
        <div className="wrap">
          <Eyebrow>03 / Working method</Eyebrow>
          <h2 className="h2 mt-4 max-w-4xl">
            What are you trying to understand? What instrument will help? What evidence would justify trusting the
            result?
          </h2>
          <p className="lead mt-4 text-ink-soft">
            Every engagement answers those three questions before it answers anything else. Methods, limitations, and
            corrections stay part of the work.
          </p>
          <Steps variant="home" />
        </div>
      </section>

      {/* 6. Founder */}
      <section className="section border-y border-rule bg-card">
        <div className="wrap grid items-center gap-10 md:grid-cols-[minmax(0,360px)_1fr] md:gap-16">
          <figure>
            <img src="/images/anthony-portrait.webp" alt="Anthony J. Vasquez Sr. at the console" width={1125} height={1500} loading="lazy" className="aspect-[4/5] w-full rounded-md object-cover" />
            <figcaption className="mt-2 font-mono text-[11.5px] leading-snug text-ink-soft">
              Anthony J. Vasquez Sr. at the console. Photograph from the founder’s public research site.
            </figcaption>
          </figure>
          <div>
            <Eyebrow>04 / Founder</Eyebrow>
            <h2 className="h2 mt-4">Anthony J. Vasquez Sr.</h2>
            <p className="mt-2 font-mono text-[13px] text-ink-soft">
              Founder and managing member · U.S. Army veteran · Independent researcher
            </p>
            <p className="mt-5 max-w-[640px] text-ink-soft">
              Anthony brings a practical, hands-on perspective to software and AI research, with an emphasis on
              accountability, useful tools, and disciplined technical follow-through. His wider public research —
              spanning governed AI, dynamical systems, AI architecture, and computational pharmacology — is published
              through The Temple of Two.
            </p>
            <Link to="/about" className="tlink mt-5 inline-block">
              About Anthony, the research origins, and the standards behind every claim →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Closing invitation */}
      <section className="on-navy border-t border-gold bg-navy text-on-navy">
        <div className="wrap grid gap-10 py-[clamp(56px,8vw,96px)] lg:grid-cols-2">
          <div>
            <h2 className="h2 text-white">Bring a defined problem. Build a reviewable path forward.</h2>
            <p className="lead mt-5 text-on-navy-soft">
              Government organizations, research institutions, and industry partners are welcome to discuss scoped
              software development, computational studies, evaluation tools, and research collaborations.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-md border border-white/20 p-5">
              <p className="mono text-gold">Technical project</p>
              <p className="mt-2 text-[15px]">
                A defined prototype, evaluation tool, simulation environment, or evidence-management workflow — with
                agreed scope, acceptance criteria, data handling, documentation, and handoff.
              </p>
            </div>
            <div className="rounded-md border border-white/20 p-5">
              <p className="mono text-gold">Research collaboration</p>
              <p className="mt-2 text-[15px]">
                A question, the work already completed, the unresolved limitation, and the expertise or validation
                needed next.
              </p>
            </div>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary">Start a conversation</Link>
              <Link to="/contact" className="btn btn-ghost">{csLabel}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function EvidenceCard({
  media,
  standing,
  title,
  text,
  limits,
  link,
}: {
  media: React.ReactNode;
  standing: string;
  title: string;
  text: string;
  limits: string;
  link: React.ReactNode;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-rule bg-page">
      {media}
      <div className="flex flex-1 flex-col p-5">
        <p className="mono leading-relaxed text-ink-soft">{standing}</p>
        <h3 className="h3 mt-2">{title}</h3>
        <p className="mt-3 flex-1 text-[15px] text-ink-soft">{text}</p>
        <p className="mono mt-4 text-ink-soft">Limits</p>
        <p className="mt-1 text-[13.5px] text-ink-soft">{limits}</p>
        <div className="mt-4">{link}</div>
      </div>
    </article>
  );
}
