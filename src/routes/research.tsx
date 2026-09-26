import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Figure, Standing, Note, Ext } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/research")({
  head: () =>
    pageMeta({
      title: "Research & Demonstrations | AV Family Enterprise LLC",
      description:
        "The founder-led portfolio by research area. Every entry carries its type, lifecycle and evidence, quoted from the project’s public record.",
      path: "/research",
    }),
  component: Research,
});

type Entry = {
  title: string;
  text: string;
  type: string;
  lifecycle: string;
  evidence: string;
  note?: [string, string];
  links: [string, string][];
  image?: { src: string; alt: string; tag: string; w: number; h: number; caption?: string };
};

const groups: { n: string; short: string; title: string; entries: Entry[] }[] = [
  {
    n: "01",
    short: "Governed AI",
    title: "Governed AI & agent authorization",
    entries: [
      {
        title: "COSMIC-ALLOW",
        text: "A cross-vendor proof-of-allow protocol for AI coding-agent cockpits: deny is the ground state, allow requires an unforgeable sentinel, and a kernel sandbox floor — not the policy layer — is the load-bearing boundary.",
        type: "RFC + reference implementation (cosmic-cli, Apache-2.0)",
        lifecycle: "Published · v1.1",
        evidence: "Supported within scope — the protocol holds across vendors; not a claim that any deployment is secure",
        note: ["What failed", "Policy-layer-only enforcement: it can be talked past by the thing it governs."],
        links: [
          ["DOI ↗", "https://doi.org/10.5281/zenodo.21461197"],
          ["cosmic-cli ↗", "https://github.com/templetwo/cosmic-cli"],
        ],
        image: {
          src: "/images/cosmic-verified.webp",
          alt: "cosmic-cli terminal: a scripted mission ends verified only after an operator-supplied check exits 0",
          tag: "Scripted mission · No model call",
          w: 1800,
          h: 531,
        },
      },
      {
        title: "T2Helix",
        text: "An editor plugin placing a governance check before a tool call rather than in the log afterward: destructive operations are hard-denied, credential use is gated, and method candidates are quarantined until a human promotes them. Local-only storage.",
        type: "Instrument",
        lifecycle: "Living · v0.13.1",
        evidence: "In use, local-only — a demonstration of placement, not a measured claim about how often it prevents harm",
        note: ["What failed", "The advisory-banner version was ignored, by the human as often as the model."],
        links: [["Repository ↗", "https://github.com/templetwo/t2helix"]],
        image: {
          src: "/images/t2helix-feed.webp",
          alt: "Compass Observatory live feed: shell commands classified OPEN, PAUSE or WITNESS before they run",
          tag: "Synthetic session · Local dashboard",
          w: 1800,
          h: 1106,
        },
      },
      {
        title: "Project Epistemic Bound",
        text: "A local workroom and evaluation workbench recording an AI agent’s assignments, permissions, proposals, corrections, and observed effects as a hash-linked event chain — keeping a proposal, an authorization, and an effect apart.",
        type: "Instrument",
        lifecycle: "v0.1 integration state · release blocked",
        evidence: "Untested — no behavioral result about any model yet",
        links: [["Repository ↗", "https://github.com/templetwo/project-epistemic-bound"]],
        image: {
          src: "/images/peb-run-detail.webp",
          alt: "Project Epistemic Bound workroom showing one recorded scripted run: its budget, evaluation report and outcome checks, each traced to events",
          tag: "Scripted provider · Recorded run",
          w: 1920,
          h: 1200,
          caption: "The workroom separates a proposal, an authorization, and an observed effect.",
        },
      },
    ],
  },
  {
    n: "02",
    short: "Knowledge infrastructure",
    title: "Persistent knowledge & research infrastructure",
    entries: [
      {
        title: "Sovereign Stack",
        text: "A persistent memory and governance layer with a self-verifying record: each claim’s identity is derived from its content (sha256), carries verified-by receipts, and is superseded rather than edited. Continuity treated as an infrastructure property, not a model property.",
        type: "Instrument",
        lifecycle: "Living · v1.21.0 · 52 tools on the running surface (heartbeat 2026-09-19)",
        evidence: "In use, self-verifying — demonstrates a design; does not test a hypothesis about minds",
        note: ["What failed", "The first design let a claim be edited in place, which made the record unfalsifiable. Supersession replaced mutation."],
        links: [
          ["Repository ↗", "https://github.com/templetwo/sovereign-stack"],
          ["Public chronicle mirror ↗", "https://github.com/templetwo/sovereign-stack-chronicle"],
        ],
      },
      {
        title: "temple-harness",
        text: "A read-only access layer that gives a local model running on the machine controlled recall of the record — seven named read-only doors, no master credential, and a canary suite that mutates each gate in turn to prove the checks are still there.",
        type: "Release",
        lifecycle: "Published · shim 0.4.0 (2026-09-07)",
        evidence: "Publicly verifiable; second-seat review observed, not yet enforceable",
        links: [["Repository ↗", "https://github.com/templetwo/temple-harness"]],
      },
    ],
  },
  {
    n: "03",
    short: "Evaluation",
    title: "AI evaluation & human–AI workflows",
    entries: [
      {
        title: "The Black Box Boundary",
        text: "A non-interventional, byte-exact reconstruction of the inference-event boundary around a small deployed language model. In the studied session the operator’s words were 0.56–14.00% of model-input bytes; the rest was enumerable application-layer material — inspectable, and never inspected.",
        type: "Study",
        lifecycle: "Published (2026-07-29)",
        evidence: "Bounded, n=1 session — measures the boundary, not the weights; not an interpretability claim",
        links: [
          ["DOI ↗", "https://doi.org/10.5281/zenodo.21683054"],
          ["Code + evidence ↗", "https://doi.org/10.5281/zenodo.21683073"],
        ],
      },
      {
        title: "Governed co-creation case study",
        text: "A documented investigation of how human direction, machine contribution, approval, attribution, and correction interact in one research practice — with a public retrospective of the occasions when claims exceeded the evidence.",
        type: "Case study + retrospective",
        lifecycle: "Published, maintained",
        evidence: "Single documented practice — not a population-level validation of human–AI collaboration",
        links: [["Retrospective ↗", "https://github.com/templetwo/templetwo-retrospective"]],
      },
      {
        title: "Master Operations Agent",
        text: "A research workbench for an evidence-first operations advisor on synthetic observations: bounded read tools, an independent validator, and a hash-linked evidence log. v0.7: the frozen policy-only model candidate scored 7 of 24 useful answers on the private synthetic holdout; the deterministic baseline scored 24 of 24. The failed acceptance is retained.",
        type: "Research workbench",
        lifecycle: "v0.7 · ongoing",
        evidence: "Development results, not model promotion — not a trained operations expert, autonomous controller, or plant-ready product",
        links: [["Repository and receipts ↗", "https://github.com/templetwo/master-operations-agent"]],
        image: {
          src: "/images/moa-withheld-finding.webp",
          alt: "Master Operations Agent dashboard withholding its assessment because a synthetic observation is too old",
          tag: "Synthetic observation · Offline baseline",
          w: 1600,
          h: 1000,
          caption: "Why a finding was released or held: freshness, required reads, envelope checks, content validation.",
        },
      },
    ],
  },
  {
    n: "04",
    short: "Local-first & architecture",
    title: "Local-first AI & architecture R&D",
    entries: [
      {
        title: "Phenomenological Compass",
        text: "A two-stage inference architecture: a small conditioning model reads the epistemic weight of a question and conditions a larger action model. Ships as a native macOS app, fully local on Apple Silicon. Token-level entropy profiling shows the conditioning restructures the probability distribution rather than restyling the output.",
        type: "Study + instrument",
        lifecycle: "Published (2026-04-02)",
        evidence: "Supported within scope — 96% signal accuracy (101/105) and ΔH = +0.47 nats on one architecture family and one evaluation set; not yet replicated across model scales",
        note: ["What changed", "The first framing treated the compass as an output filter. A filter cannot move token-level entropy before the tokens exist; the mechanism is conditioning, a different claim."],
        links: [
          ["DOI ↗", "https://doi.org/10.5281/zenodo.19377144"],
          ["Repository ↗", "https://github.com/templetwo/phenomenological-compass"],
        ],
      },
      {
        title: "Phase-Modulated Attention",
        text: "A 176M-parameter hybrid SSM-attention language model in which Kuramoto oscillators modulate attention routing. System-prompt framing induces attention-dependent entropy regime switching; placement — gating information flow rather than accompanying it — is the variable that matters.",
        type: "Study",
        lifecycle: "Published (2026-02-28)",
        evidence: "Supported within scope, standing on a published negative result",
        note: ["Negative result retained", "Liminal K-SSM: oscillators in hidden state were epiphenomenal — no language-modelling effect. That failure located the causal entry point."],
        links: [
          ["DOI ↗", "https://doi.org/10.5281/zenodo.18810911"],
          ["Repository ↗", "https://github.com/templetwo/phase-modulated-attention"],
        ],
      },
    ],
  },
  {
    n: "05",
    short: "Modeling & simulation",
    title: "Scientific modeling & simulation",
    entries: [
      {
        title: "Entropy as a Tunable Equilibrium",
        text: "Four pre-registered computational campaigns (v4.0–v4.3), each committing in advance to the result that would falsify the prior version. The horizon knob is real; the geometry-scaling prediction that would have made entropy an “engine” failed; an apparent short-horizon effect dissolved under matched-estimator control.",
        type: "Study",
        lifecycle: "Closed · v4.3 (2026-07-10)",
        evidence: "Bounded null — the correction is published under its own DOI, not folded into a later version",
        links: [
          ["DOI ↗", "https://doi.org/10.5281/zenodo.21223845"],
          ["Kinetics follow-up ↗", "https://doi.org/10.5281/zenodo.21288848"],
        ],
      },
      {
        title: "Independent operator training simulator",
        text: "A browser-based training simulator: four synthetic process units, an ISA-18.2 alarm lifecycle, PID faceplates, trends, an event journal, scored drills, an instructor station with snapshots and replay, an architecture-training view, and a self-contained offline build.",
        type: "Independent training aid",
        lifecycle: "Released · v3.1.0 (2026-09-03)",
        evidence: "Shipping — not a Honeywell product; drill scores independent of any vendor certification; not a diagnostic display or live control",
        links: [["Repository ↗", "https://github.com/templetwo/experion-station-sim"]],
        image: {
          src: "/images/sim-unit03.webp",
          alt: "Unit 03 graphic: fired preheater and exothermic fixed-bed reactor during a drill",
          tag: "Synthetic training environment",
          w: 1800,
          h: 1323,
        },
      },
      {
        title: "Temple Lab",
        text: "An interactive 3D chemistry workbench — 118 elements, reference molecules with published geometries, an electron lab, a bonding coach, and a reaction lab — in which each tool states on its face what it does not do. A missing value reads “Not available”, never zero.",
        type: "Release (MIT)",
        lifecycle: "Published · v1.3.0 (2026-09-10)",
        evidence: "Shipping, not a predictor — nothing in it predicts products, rates, or conditions",
        links: [["Releases ↗", "https://github.com/templetwo/temple-molecular-workbench/releases"]],
      },
    ],
  },
];

function EntryCard({ e }: { e: Entry }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-rule bg-card">
      {e.image && (
        <figure>
          <Figure src={e.image.src} alt={e.image.alt} tag={e.image.tag} width={e.image.w} height={e.image.h} />
          {e.image.caption && (
            <figcaption className="border-b border-rule px-5 py-2 font-mono text-[11.5px] leading-snug text-ink-soft">
              {e.image.caption}
            </figcaption>
          )}
        </figure>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="h3">{e.title}</h3>
        <p className="mt-3 text-[15px] text-ink-soft">{e.text}</p>
        <Standing type={e.type} lifecycle={e.lifecycle} evidence={e.evidence} />
        {e.note && <Note label={e.note[0]}>{e.note[1]}</Note>}
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-5">
          {e.links.map(([label, href]) => (
            <Ext key={href} href={href}>{label}</Ext>
          ))}
        </div>
      </div>
    </article>
  );
}

function Group({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section id={`area-${n}`} className="border-b border-rule py-[clamp(40px,6vw,72px)]">
      <p className="mono text-ink-soft">{n}</p>
      <h2 className="h2 mt-2">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Research() {
  return (
    <>
      <PageHeader eyebrow="Research & Demonstrations" title="The portfolio, by research area">
        Founder-led work published through The Temple of Two, presented under its own licenses and authorship. Every
        entry carries three labels so a reviewer knows what they are looking at: Type (instrument, study, RFC,
        hypothesis set), Lifecycle (living, published, closed, awaiting validation), and Evidence (what the record
        actually supports).
      </PageHeader>
      <nav aria-label="Research areas" className="border-b border-rule bg-card">
        <ul className="wrap flex flex-wrap gap-x-6 gap-y-2 py-5 font-mono text-[12px] uppercase tracking-[0.1em]">
          {[...groups.map((g) => [g.n, g.short]), ["06", "Computational biology"]].map(([n, s]) => (
            <li key={n}>
              <a href={`#area-${n}`} className="text-ink-soft no-underline hover:text-blue">
                <span className="text-gold">{n}</span> {s}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="wrap">
        {groups.map((g) => (
          <Group key={g.n} n={g.n} title={g.title}>
            <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
              {g.entries.map((e) => (
                <EntryCard key={e.title} e={e} />
              ))}
            </div>
          </Group>
        ))}

        <Group n="06" title="Computational biology & pharmacology research">
          <article className="grid overflow-hidden rounded-lg border border-rule bg-card md:grid-cols-[minmax(0,340px)_1fr]">
            <figure className="bg-navy">
              <Figure
                src="/images/vdac1-diagram.webp"
                alt="VDAC1 rendered as a gate, annotated with hexokinase-II, Bcl-xL, and the cholesterol ratio"
                tag="Scientific illustration"
                width={784}
                height={1168}
                ratio="784/1168"
              />
              <figcaption className="px-4 py-2 font-mono text-[11.5px] leading-snug text-on-navy-soft">
                Scientific illustration from the Atlas — a hypothesis diagram, not a measurement.
              </figcaption>
            </figure>
            <div className="p-[clamp(22px,3vw,36px)]">
              <h3 className="h3">VDAC1 Pharmacology Atlas</h3>
              <p className="mt-3 max-w-[720px] text-[15px] text-ink-soft">
                The voltage-dependent anion channel modelled as a druggable mitochondrial decision gate: a cofactor
                equation for how hexokinase-II, Bcl-xL, and cholesterol jointly set the apoptotic threshold, expanded
                into six atlas layers and 22 mechanisms, plus the Gate-Jamming Score as a candidate biomarker for immune
                evasion.
              </p>
              <Standing
                type="Biomedical hypothesis set"
                lifecycle="Awaiting wet-lab validation"
                evidence="Untested in vivo — 24 testable predictions, 0 tested at the bench. Two of three transcriptomic cohorts returned nulls; the surviving signal is stratum-specific (n=209). Literature concordance is not validation."
              />
              <Note label="Next validation step">
                Bench assays with a wet-lab collaborator; electrophysiology for channel recording; independent
                pharmacology review.
              </Note>
              <div className="flex flex-wrap gap-x-5 gap-y-1 pt-5">
                <Ext href="https://doi.org/10.17605/OSF.IO/C9RQB">Atlas · OSF ↗</Ext>
                <Ext href="https://doi.org/10.5281/zenodo.20373134">Monograph DOI ↗</Ext>
                <Ext href="https://doi.org/10.21203/rs.3.rs-8935902/v1">Cohort preprint ↗</Ext>
              </div>
            </div>
          </article>
        </Group>
      </div>
      <section className="border-b border-rule bg-card">
        <div className="wrap flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <p className="max-w-[760px] text-[15px] text-ink-soft">
            Descriptions and standing labels are quoted from each project’s public record and were last reviewed on 26
            September 2026. A project’s appearance here does not change its license or ownership. Metrics carry their
            scope and date; read the linked source before relying on one.
          </p>
          <Link to="/contact" className="btn btn-primary shrink-0">Propose a collaboration</Link>
        </div>
      </section>
    </>
  );
}
