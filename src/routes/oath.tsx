import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Eyebrow, Ext } from "@/components/ui";
import { site } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/oath")({
  head: () =>
    pageMeta({
      title: "The Oath | AV Family Enterprise LLC",
      description:
        "AV Family Enterprise is a veteran-owned business. The oath behind the work, and where veterans can find free, accredited help with a VA claim.",
      path: "/oath",
    }),
  component: Oath,
});

/**
 * Resources checked 29 September 2026 against the live pages linked here.
 * Wording follows the sources: VA (accredited help is free on initial claims),
 * PA DMVA (county directors are accredited and never charge veterans).
 * Re-check each link and phone number before any republication.
 */
const help: { label: string; title: string; body: ReactNode; links: [string, string][] }[] = [
  {
    label: "If you're in crisis",
    title: "Veterans Crisis Line",
    body: (
      <>
        Dial <strong>988, then press 1</strong>, or text <strong>838255</strong>. Free, confidential, 24/7, and you don't need to be
        enrolled in VA benefits or health care to call.
      </>
    ),
    links: [["https://www.veteranscrisisline.net/", "veteranscrisisline.net ↗"]],
  },
  {
    label: "What you may be owed",
    title: "Filing a VA claim is free",
    body: (
      <>
        Accredited help with an initial disability claim costs nothing. Before anyone helps with your claim, make sure
        they're accredited with VA.
      </>
    ),
    links: [
      ["https://www.va.gov/disability/", "VA disability benefits ↗"],
      ["https://www.va.gov/get-help-from-accredited-representative/find-rep/", "Find an accredited representative ↗"],
    ],
  },
  {
    label: "Help in Pennsylvania",
    title: "Your county director of veterans affairs",
    body: (
      <>
        Often at the county courthouse. County directors are accredited veterans service officers, and they never charge
        veterans for their help.
      </>
    ),
    links: [
      ["https://www.pa.gov/agencies/dmva/pennsylvania-veterans/county-director-of-veterans-affairs", "Find your county director ↗"],
      [
        "https://www.pa.gov/agencies/dmva/pennsylvania-veterans/pa-vetconnect/find-an-accredited-veteran-service-officer",
        "Find an accredited service officer ↗",
      ],
    ],
  },
];

function Oath() {
  return (
    <>
      {/* 1. The creed, and 2. the public statement */}
      <section className="on-navy bg-navy text-on-navy">
        <div className="wrap py-[clamp(64px,10vw,128px)]">
          <p className="eyebrow">The Oath</p>
          <blockquote className="mt-6">
            <h1 className="h1 max-w-4xl text-white lg:text-[clamp(44px,5.6vw,72px)]">
              “I will never leave a fallen comrade.”
            </h1>
            <footer className="mono mt-5 text-gold">From the Soldier’s Creed · United States Army</footer>
          </blockquote>
          <p className="lead mt-10 text-on-navy">
            {site.name} is a veteran-owned business. We stand with the people who served, and with the families who
            served beside them.
          </p>
        </div>
      </section>

      {/* 3. How the oath shows up in the work */}
      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
          <div>
            <Eyebrow>How the oath shows up in the work</Eyebrow>
          </div>
          <div className="max-w-[720px]">
            <p className="text-[19px] leading-relaxed">
              Our work runs on one standard: every claim carries its standing. Nothing gets lost, and every claim keeps
              its evidence.
            </p>
            <p className="mt-5 text-ink-soft">
              For a lot of veterans, the claim that matters most is the one they never filed, or filed without the
              evidence it needed. For a business like this one, leaving no one behind means building systems that
              don’t lose people.
            </p>
            <Link to="/about" className="tlink mt-6 inline-block">The standards behind the work →</Link>
          </div>
        </div>
      </section>

      {/* 4. In his words */}
      <section className="section border-y border-rule bg-card">
        <div className="wrap">
          <figure className="max-w-[820px] border-l-2 border-gold pl-[clamp(20px,3vw,40px)]">
            <blockquote className="space-y-4 text-[clamp(20px,2.2vw,26px)] leading-snug">
              <p>I crawled through the mud at Fort Benning.</p>
              <p>I stunk so long the stink became normal.</p>
              <p>I sent rounds downrange that couldn’t be taken back.</p>
              <p className="pt-2 text-ink-soft">
                If you carry something like that, you’re not alone here. And if the country still owes you, you deserve
                to know it.
              </p>
            </blockquote>
            <figcaption className="mono mt-8 text-ink-soft">{site.founder}, founder</figcaption>
          </figure>
        </div>
      </section>

      {/* 5. For whoever read this far */}
      <section className="section">
        <div className="wrap">
          <Eyebrow>For whoever read this far</Eyebrow>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {help.map((h) => (
              <article key={h.title} className="card">
                <p className="mono text-ink-soft">{h.label}</p>
                <h2 className="h3 mt-2">{h.title}</h2>
                <p className="mt-3 text-[15px]">{h.body}</p>
                <ul className="mt-4 space-y-1.5 text-[15px]">
                  {h.links.map(([href, text]) => (
                    <li key={href}><Ext href={href}>{text}</Ext></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-[13.5px] text-ink-soft">
            {site.name} is not a VA-accredited organization and does not prepare or file claims. These links go to
            official public resources.
          </p>
        </div>
      </section>
    </>
  );
}
