/**
 * Shared site content. All wording is taken from handoff/01-page-copy.md
 * (approved design mock v2, 26 Sep 2026) and the standing labels from
 * handoff/03-claims-and-notices.md. Do not paraphrase a label or a number
 * without re-checking its public source.
 */

export const site = {
  name: "AV Family Enterprise",
  legalName: "AV FAMILY ENTERPRISE LLC",
  origin: "https://avfamilyenterprise.com",
  location: "Pennsylvania, USA",
  subline: "Research · Software · Accountable systems",
  founder: "Anthony J. Vasquez Sr.",
  github: "https://github.com/templetwo",
  orcid: "https://orcid.org/0009-0000-6440-1506",
  /**
   * Inquiry form endpoint. GitHub Pages cannot receive a form post, and the
   * business mailbox has not been tested yet, so this stays null until a
   * working endpoint exists. While null the Contact page says so instead of
   * showing a form that goes nowhere (launch checklist: no inactive buttons).
   */
  formEndpoint: null as string | null,
  /** "Request a capability statement" until an approved statement exists. */
  capabilityStatementUrl: null as string | null,
};

export const csLabel = site.capabilityStatementUrl
  ? "Download capability statement"
  : "Request a capability statement";

export const nav = [
  { to: "/", label: "Home" },
  { to: "/capabilities", label: "Capabilities" },
  { to: "/research", label: "Research & Demonstrations" },
  { to: "/government", label: "Government & Partners" },
  { to: "/about", label: "About" },
  { to: "/oath", label: "The Oath" },
] as const;

export type Area = {
  n: string;
  title: string;
  short: string;
  evidenceShort: string;
};

export const areas: Area[] = [
  {
    n: "01",
    title: "Governed AI & agent authorization",
    short:
      "AI systems with explicit permissions, pre-action controls, human review points, and records that distinguish a proposed action from an executed result.",
    evidenceShort: "COSMIC-ALLOW · T2Helix · Project Epistemic Bound",
  },
  {
    n: "02",
    title: "Persistent knowledge & research infrastructure",
    short:
      "Software architectures for preserving research context, tracing claims to evidence, recording corrections, and supporting continuity across people, models, sessions, and software.",
    evidenceShort: "Sovereign Stack · public chronicle · temple-harness",
  },
  {
    n: "03",
    title: "AI evaluation & human–AI workflows",
    short:
      "Research tools and assessment workflows for examining model inputs, system behavior, evidence quality, human oversight, and the limits of an evaluation’s conclusions.",
    evidenceShort: "The Black Box Boundary · co-creation case study · Master Operations Agent",
  },
  {
    n: "04",
    title: "Local-first AI & architecture R&D",
    short:
      "Experimental AI architectures, locally operated inference workflows, and comparative studies of model behavior under practical computing constraints.",
    evidenceShort: "Phenomenological Compass · Phase-Modulated Attention",
  },
  {
    n: "05",
    title: "Scientific modeling & simulation",
    short:
      "Computational models, interactive scientific instruments, synthetic scenarios, and experimental software for examining complex system behavior.",
    evidenceShort: "entropy campaigns · operator training simulator · Temple Lab",
  },
  {
    n: "06",
    title: "Computational biology & pharmacology research",
    short:
      "Mechanistic modeling, literature-linked hypothesis development, and computational analysis in support of experimentally testable biological questions.",
    evidenceShort: "VDAC1 Pharmacology Atlas · Gate-Jamming Score",
  },
];

/** Working method. Home and About differ by one word in step 1; both are kept as approved. */
export const steps = (variant: "home" | "about") => [
  {
    title: "Define the problem",
    text:
      variant === "home"
        ? "Agree what useful success looks like, what constraints matter, and what remains uncertain."
        : "Agree what useful success would look like, what constraints matter, and what remains uncertain.",
  },
  {
    title: "Bound the system",
    text: "Specify data access, actions, human approvals, failure handling, and what the prototype is not authorized to do.",
  },
  {
    title: "Build the smallest useful version",
    text: "Prefer a testable, understandable solution over unnecessary complexity or scale.",
  },
  {
    title: "Test against evidence",
    text: "Use appropriate scenarios and controls, record actual outcomes, and retain failures and unresolved questions.",
  },
  {
    title: "Hand over recoverable work",
    text: "Deliver documentation, versioned artifacts, and enough context for another competent person to review or continue the project.",
  },
];

export const trademarkNotice =
  "Experion® is a trademark of Honeywell International Inc. AV Family Enterprise is not affiliated with Honeywell. Research examples are labeled by type, lifecycle and evidence; none is a certified product, validated therapy, or deployed service.";
