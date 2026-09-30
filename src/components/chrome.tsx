import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { nav, site, trademarkNotice } from "@/data/content";

function Brand({ onNavy = true }: { onNavy?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 no-underline" aria-label="AV Family Enterprise, home">
      <img src="/brand/avfe-monogram-color.svg" alt="" width={54} height={30} className="h-[30px] w-auto" />
      <span className="leading-tight">
        <span className={`block text-[17px] font-semibold ${onNavy ? "text-white" : "text-ink"}`}>{site.name}</span>
        <span className="block max-w-[190px] font-mono text-[9.5px] uppercase leading-snug tracking-[0.12em] text-gold">
          {site.subline}
        </span>
      </span>
    </Link>
  );
}

const linkCls =
  "whitespace-nowrap border-b-2 border-transparent py-1 text-[14.5px] text-on-navy no-underline hover:text-white";
const activeCls = { className: "border-gold! text-white!" };

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-navy shadow-[0_1px_0_rgb(255_255_255/0.06)]">
      <div className="wrap flex min-h-[72px] items-center justify-between gap-6">
        <Brand />
        <nav aria-label="Main" className="hidden items-center gap-5 min-[1160px]:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className={linkCls} activeProps={activeCls} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-primary min-h-[40px]! px-5! text-[14.5px]!">
            Contact
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/25 text-white min-[1160px]:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-white/10 bg-navy min-[1160px]:hidden">
          <ul className="wrap flex flex-col py-3">
            {[...nav, { to: "/contact", label: "Contact" } as const].map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block border-l-2 border-transparent py-3 pl-3 text-on-navy no-underline"
                  activeProps={{ className: "border-gold! text-white!" }}
                  activeOptions={{ exact: true }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const col = "font-mono text-[11.5px] uppercase tracking-[0.12em] text-gold";
  const a = "text-on-navy-soft no-underline hover:text-white";
  return (
    <footer className="on-navy bg-navy-deep text-on-navy-soft">
      <div className="border-b border-white/10">
        <div className="wrap py-6">
          <Link to="/oath" className="group flex flex-col gap-1 no-underline sm:flex-row sm:items-baseline sm:gap-4">
            <span className="text-[17px] font-semibold text-white">“I will never leave a fallen comrade.”</span>
            <span className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-gold group-hover:text-white">The Oath →</span>
          </Link>
        </div>
      </div>
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Brand />
          <p className="mt-4 max-w-xs text-[14.5px] leading-relaxed">
            Independent, veteran-owned research and development: scientific software, accountable AI infrastructure,
            and computational tools for investigating complex systems.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-on-navy">
            {site.legalName} · {site.location.toUpperCase()}
          </p>
        </div>
        <div>
          <h2 className={col}>Pages</h2>
          <ul className="mt-4 space-y-2 text-[14.5px]">
            {[...nav, { to: "/contact", label: "Contact" } as const].map((n) => (
              <li key={n.to}>
                <Link to={n.to} className={a}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={col}>Notices</h2>
          <ul className="mt-4 space-y-2 text-[14.5px]">
            <li><Link to="/notices" hash="privacy" className={a}>Privacy notice</Link></li>
            <li><Link to="/notices" hash="accessibility" className={a}>Accessibility</Link></li>
            <li><Link to="/notices" hash="accessibility" className={a}>Report an accessibility barrier</Link></li>
            <li><Link to="/notices" hash="notices" className={a}>Trademarks and attributions</Link></li>
          </ul>
        </div>
        <div>
          <h2 className={col}>Research lineage</h2>
          <p className="mt-4 text-[14.5px] leading-relaxed">
            The founder’s wider public research and human–AI collaboration practice is published through The Temple of
            Two. Projects referenced here keep their own licenses and authorship.
          </p>
          <a href={site.github} target="_blank" rel="noopener" className="tlink mt-3 inline-block">
            The Temple of Two on GitHub →
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-[12.5px] leading-relaxed lg:flex-row lg:justify-between lg:gap-10">
          <p className="shrink-0">© 2026 {site.legalName}. All rights reserved.</p>
          <p className="max-w-3xl lg:text-right">{trademarkNotice}</p>
        </div>
      </div>
    </footer>
  );
}
