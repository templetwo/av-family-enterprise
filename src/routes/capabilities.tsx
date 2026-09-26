import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/capabilities")({
  head: () =>
    pageMeta({
      title: "Capabilities | AV Family Enterprise LLC",
      description:
        "Six areas of work, clearly bounded: the problem each addresses, deliverables available for scoping, and where the boundary sits.",
      path: "/capabilities",
    }),
  component: Capabilities,
});

const blocks = [
  {
    n: "01",
    title: "Governed AI & agent authorization",
    problem:
      "What must happen before an AI agent is permitted to act — and what happens when the permission mechanism fails? Most harnesses fail open and document the action afterward.",
    body: "We research and prototype AI systems with explicit permissions, pre-action controls, human review points, and records that distinguish a proposed action from an executed result. The commercial proposition is not that an AI can always be trusted; it is that the conditions under which it may act become explicit, testable, and reviewable.",
    evidence: "COSMIC-ALLOW (published RFC) · T2Helix (instrument, in use) · Project Epistemic Bound (instrument, release blocked)",
    deliverables: [
      "Permission architecture",
      "Bounded automation prototype",
      "Adversarial test plan",
      "Implementation review",
      "Event and evidence schema; replayable evidence bundle",
    ],
    boundary:
      "A protocol or workbench is not a guarantee that a particular deployment is secure, and not a certificate of any model’s integrity.",
  },
  {
    n: "02",
    title: "Persistent knowledge & research infrastructure",
    problem:
      "Preserving usable knowledge across changes in people, models, sessions, and software — so a successor can recover an experiment’s assumptions, decisions, evidence, and open questions, and tell an authoritative record from an AI-generated summary.",
    body: "We design software architectures for preserving research context, tracing claims to evidence, recording corrections that supersede earlier claims rather than silently replacing them, and supporting continuity across technical workflows.",
    evidence: "Sovereign Stack (instrument, in use) · public chronicle mirror · temple-harness (read-only access layer for local models)",
    deliverables: [
      "Claim and evidence record design",
      "Continuity architecture review",
      "Read-only access layer for local models",
      "Correction and supersession workflow",
      "Handoff and recovery documentation",
    ],
    boundary:
      "A design that works for one founder-led practice is not yet a demonstration that it suits an institutional deployment. Suitability is established per engagement.",
  },
  {
    n: "03",
    title: "AI evaluation & human–AI workflows",
    problem:
      "Most of what shapes a deployed model’s output is application-layer material that is inspectable but never inspected. And human direction, machine contribution, approval, attribution, and correction interact in ways that are rarely documented.",
    body: "We build research tools and assessment workflows for examining model inputs, system behavior, evidence quality, human oversight, and the limits of an evaluation’s conclusions. Corrections are retained: one readable example of a claim that changed after testing says more than a paragraph about integrity.",
    evidence: "The Black Box Boundary (study, bounded n=1) · governed co-creation case study and retrospective · Master Operations Agent (research workbench)",
    deliverables: [
      "Evaluation harness",
      "Input-provenance audit",
      "Reproducible comparison",
      "Failure analysis",
      "Documented human-review workflow",
    ],
    boundary:
      "An application-boundary study is not an interpretability claim about model weights. A single case study is not a population-level validation of human–AI collaboration.",
  },
  {
    n: "04",
    title: "Local-first AI & architecture R&D",
    problem:
      "Indiscriminate scaling is not the only route to useful AI. Which architectural choices actually change what a model computes, and what can run well on appropriately sized local hardware?",
    body: "We investigate experimental AI architectures, locally operated inference workflows, and comparative studies of model behavior under practical computing constraints — measuring task quality, latency, memory, and energy where instrumented.",
    evidence: "Phenomenological Compass (study + instrument, supported within scope) · Phase-Modulated Attention (study, supported within scope, standing on a published negative result)",
    deliverables: [
      "Architecture comparison",
      "Local inference prototype",
      "Ablation study",
      "Task-specific test harness",
      "Deployment runbook or feasibility report",
    ],
    boundary:
      "“We investigate resource-conscious AI” is a supported research direction. Outperforming larger models at lower energy would need a separate, controlled result. A local component does not make a whole workflow offline.",
  },
  {
    n: "05",
    title: "Scientific modeling & simulation",
    problem:
      "Investigating how a complex system behaves — a process unit, an oscillator network, a thermodynamic hypothesis — without using the live system as the experiment, and keeping what the investigation actually showed.",
    body: "We build computational models, interactive scientific instruments, synthetic scenarios, and experimental software for examining complex system behavior. The industrial simulator is one instance of this capability, not the company’s identity.",
    evidence: "Entropy as a Tunable Equilibrium (study, bounded null) · operator training simulator (independent training aid) · Temple Lab (chemistry workbench, shipping) · Kuramoto Teaching Instrument",
    deliverables: [
      "Model implementation",
      "Parameter or sensitivity study",
      "Visualization or teaching instrument",
      "Synthetic training scenario or instructor workflow",
      "Simulation-based evaluation environment",
    ],
    boundary:
      "Live industrial control, site-specific safety engineering, vendor certification, and production commissioning are separate scopes. The entropy studies are a research process, not an energy technology.",
  },
  {
    n: "06",
    title: "Computational biology & pharmacology research",
    problem:
      "Turning a mechanistic question about cellular decision-making into predictions that a laboratory can actually test — and stating plainly which have been tested.",
    body: "We do mechanistic modeling, literature-linked hypothesis development, and computational analysis in support of experimentally testable biological questions. The contribution is a model, evidence map, analysis workflow, or experiment-forward research package — with the next validation step named.",
    evidence: "VDAC1 Pharmacology Atlas (hypothesis set, untested in vivo) · Gate-Jamming Score (candidate biomarker) · CBD dual-pathway mechanism (literature concordance, not validation)",
    deliverables: [
      "Mechanistic model",
      "Evidence map linked to literature",
      "Cohort or transcriptomic analysis workflow",
      "Preregistered prediction set",
      "Experiment-forward research package",
    ],
    boundary: "Not a demonstrated therapy, validated diagnostic, or wet-lab service. No treatment claims or implied clinical performance.",
  },
];

function Capabilities() {
  return (
    <>
      <PageHeader eyebrow="Capabilities" title="Six areas of work, clearly bounded">
        For each area: the problem it addresses, the kinds of deliverables available for scoping, and where the boundary
        sits. Founder-led projects are listed as evidence of experience, not as commercially supported products.
      </PageHeader>
      <div className="wrap">
        {blocks.map((b) => (
          <section key={b.n} id={`area-${b.n}`} className="grid gap-8 border-b border-rule py-[clamp(40px,6vw,72px)] lg:grid-cols-[1.5fr_1fr] lg:gap-14">
            <div>
              <p className="mono text-ink-soft">{b.n}</p>
              <h2 className="h2 mt-2">{b.title}</h2>
              <p className="mt-5 max-w-[720px]">
                <b className="font-semibold">The problem.</b> {b.problem}
              </p>
              <p className="mt-4 max-w-[720px] text-ink-soft">{b.body}</p>
              <p className="mt-5 font-mono text-[12.5px] leading-relaxed text-ink-soft">Evidence: {b.evidence}</p>
            </div>
            <div>
              <h3 className="h3">Deliverables available for scoping</h3>
              <ul className="mt-3 space-y-2 text-[15px]">
                {b.deliverables.map((d) => (
                  <li key={d} className="flex gap-3"><span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />{d}</li>
                ))}
              </ul>
              <div className="card mt-6">
                <p className="mono text-ink-soft">Boundary</p>
                <p className="mt-2 text-[15px]">{b.boundary}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
      <section className="border-b border-rule bg-card">
        <div className="wrap flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <p className="lead">
            Work begins with an agreed objective, deliverables, evidence requirements, and clear boundaries for data,
            authority, deployment, and ownership.
          </p>
          <Link to="/contact" className="btn btn-primary shrink-0">Discuss a scoped project</Link>
        </div>
      </section>
    </>
  );
}
