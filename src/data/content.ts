/**
 * Site content. Every product description here is condensed from that
 * project's own README, and every `status` is the README's own words. Keep it
 * that way: this site may not claim more than the repositories do.
 *
 * Screenshots and their captions are generated into screenshots.json by
 * scripts/import-screenshots.mjs from the reviewed capture manifest.
 */
import shots from "./screenshots.json";

export const site = {
  name: "AV Family Enterprise",
  legalName: "AV Family Enterprise LLC",
  origin: "https://avfamilyenterprise.com",
  domain: "avfamilyenterprise.com",
  tagline: "Founder-led software that shows its evidence",
  founder: "Anthony Vasquez Sr.",
  github: "https://github.com/templetwo",
  research: "https://thetempleoftwo.com",
  inquiry: "https://thetempleoftwo.com/inquiry",
  linkedin: "https://www.linkedin.com/in/anthonyvasquez2025",
  orcid: "https://orcid.org/0009-0000-6440-1506",
};

export type Screenshot = (typeof shots)[number];

export type Product = {
  slug: string;
  /** project key used in the screenshot manifest */
  project: string;
  name: string;
  kind: string;
  summary: string;
  body: string[];
  /** verbatim status from the README, or a plain statement that it has none */
  status: string;
  repo: string;
};

export const products: Product[] = [
  {
    slug: "project-epistemic-bound",
    project: "peb",
    name: "Project Epistemic Bound",
    kind: "Agent evaluation workbench",
    summary:
      "A local workroom where an AI agent's assignments, permissions, proposed actions and observed effects are recorded and inspectable.",
    body: [
      "peb is built to show whether an agent chose to preserve the truth while it had permission to act, without confusing an external blocker with the agent's integrity.",
      "It ships a browser workroom and a terminal cockpit over the same recorded evidence. The screenshots use its scripted provider only.",
    ],
    status: "v0.1 integration state, not a release.",
    repo: "https://github.com/templetwo/project-epistemic-bound",
  },
  {
    slug: "master-operations-agent",
    project: "moa",
    name: "Master Operations Agent",
    kind: "Evidence-first operations research",
    summary:
      "An independent research workbench for an operations advisor that grounds every finding in evidence, and withholds one when the evidence is stale.",
    body: [
      "A local dashboard observes a synthetic sensor snapshot, produces a finding, and records it as a hash-linked evidence receipt that can be inspected afterwards.",
      "It publishes its failures as well as its passes: the repository keeps the receipts for every model comparison it has run.",
    ],
    status:
      "This release assesses synthetic observations. Its default provider is a deterministic reference baseline. It is not a trained operations expert, an autonomous controller, or a plant-ready product.",
    repo: "https://github.com/templetwo/master-operations-agent",
  },
  {
    slug: "conditioned-kernel",
    project: "conditioned-kernel",
    name: "Conditioned Kernel",
    kind: "Local-first AI research harness",
    summary:
      "The model supplies linguistic possibility; the substrate determines what becomes an answer.",
    body: [
      "A local-first experiment harness for substrate-conditioned generation. The language model is treated as a replaceable text-transduction kernel, and behaviour lives in the substrate around it: state, context, validation, repair and acceptance.",
      "Built as an edge product for a Jetson Orin Nano class device. Fully local, with no cloud dependency. The screenshots replay a scripted example offline.",
    ],
    status: "Preprint v0.1: The Black Box Is Smaller Than the Experience (doi:10.5281/zenodo.21683054).",
    repo: "https://github.com/templetwo/conditioned-kernel",
  },
  {
    slug: "t2helix",
    project: "t2helix",
    name: "T2Helix",
    kind: "Developer tooling",
    summary: "Persistent recall and a pre-action compass for Claude Code, running locally on your machine.",
    body: [
      "T2Helix remembers what a coding session learned and checks each action before it runs, classifying it as proceed, pause or witness, with the rule and the reason shown.",
      "A local Compass Observatory dashboard shows the live feed, the chronicle and a review queue where a person decides what gets promoted.",
    ],
    status: "Local Claude Code plugin; releases are listed in the repository changelog.",
    repo: "https://github.com/templetwo/t2helix",
  },
  {
    slug: "cosmic-cli",
    project: "cosmic-cli",
    name: "Cosmic CLI",
    kind: "Developer tooling",
    summary:
      "Mission protocol for coding cockpits: tool-shaped actions, compass-gated execution and an independent review seat.",
    body: [
      "A finished mission is only ever reported as verified or needs review, never a bare \"complete\", and the terminal always says which and why.",
      "Mission Control is a read-only browser view over the same mission log, compass verdicts and chronicle receipts.",
    ],
    status: "v0.9.5",
    repo: "https://github.com/templetwo/cosmic-cli",
  },
  {
    slug: "temple-lab",
    project: "temple-lab",
    name: "Temple Molecular Workbench",
    kind: "Education",
    summary:
      "An interactive 3D chemistry studio for the curious. Explore reference molecules, build structures, and see chemistry take shape.",
    body: [
      "Ten reference molecules with source-backed coordinates, a guided bonding coach, and a reaction lab that balances declared reactions and totals cited formation data.",
      "Every property carries its scientific status: measured, unverified, or withheld rather than guessed. It does not predict reactions.",
    ],
    status: "Opening description from the README; the README carries no release status line.",
    repo: "https://github.com/templetwo/temple-molecular-workbench",
  },
];

export function shotsFor(project: string): Screenshot[] {
  return shots.filter((s) => s.project === project);
}

export function heroFor(project: string): Screenshot | undefined {
  const list = shotsFor(project);
  return list.find((s) => s.hero) ?? list.find((s) => !s.terminal) ?? list[0];
}
