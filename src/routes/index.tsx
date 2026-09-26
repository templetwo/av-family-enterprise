import { createFileRoute, Link } from "@tanstack/react-router";
import { products, heroFor, site } from "@/data/content";
import { Shot } from "@/components/shot";

export const Route = createFileRoute("/")({ component: Home });

const principles = [
  { title: "Local first", text: "The software runs on your own machine. The demos shown here use scripted, synthetic or offline data." },
  { title: "Evidence over claims", text: "Findings point at recorded events and receipts you can open. Failures are published next to passes." },
  { title: "Honest status", text: "Each product states its own maturity, in the words of its repository. Research is labelled as research." },
];

function Home() {
  const lead = heroFor("temple-lab");
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:pt-20">
        <div>
          <p className="eyebrow">{site.legalName}</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Founder-led software that shows its evidence.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-soft">
            We build local-first tools for evaluating AI agents, researching operations advice, governing coding
            assistants, and teaching chemistry. Every screen below comes from the real software, running on
            synthetic or scripted data.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/software" className="rounded-md bg-brass px-5 py-2.5 font-semibold text-bg no-underline hover:bg-brass-bright">
              See the software
            </Link>
            <Link to="/about" className="rounded-md border border-border-strong px-5 py-2.5 font-semibold no-underline hover:border-brass">
              About the company
            </Link>
          </div>
        </div>
        {lead && <Shot shot={lead} eager />}
      </section>

      <section className="border-y border-border bg-surface/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
          {principles.map((p) => (
            <div key={p.title}>
              <h2 className="font-serif text-2xl font-semibold text-brass-bright">{p.title}</h2>
              <p className="mt-2 leading-relaxed text-fg-soft">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <p className="eyebrow">Software</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">What we build</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {products.map((p) => {
            const shot = heroFor(p.project);
            return (
              <Link
                key={p.slug}
                to="/software/$slug"
                params={{ slug: p.slug }}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface no-underline transition hover:border-brass"
              >
                {shot && (
                  <img src={shot.src} alt={shot.alt} width={1600} height={1000} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover object-top" />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <p className="eyebrow text-steel">{p.kind}</p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold group-hover:text-brass-bright">{p.name}</h3>
                  <p className="mt-2 leading-relaxed text-fg-soft">{p.summary}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
