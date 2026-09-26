import { Link } from "@tanstack/react-router";
import { site } from "@/data/content";

const nav = [
  { to: "/software", label: "Software" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <Mark />
          <span className="font-serif text-xl font-semibold tracking-wide">{site.name}</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-fg-soft">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="hover:text-fg" activeProps={{ className: "text-brass-bright" }}>
              {n.label}
            </Link>
          ))}
          <a href={site.github} className="hidden hover:text-fg sm:inline">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-muted sm:grid-cols-2 sm:px-6">
        <div>
          <p className="font-serif text-lg text-fg">{site.legalName}</p>
          <p className="mt-1">Founder: {site.founder}</p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
          <li><a className="hover:text-fg" href={site.github}>GitHub</a></li>
          <li><a className="hover:text-fg" href={site.research}>Temple of Two research</a></li>
          <li><a className="hover:text-fg" href={site.linkedin}>LinkedIn</a></li>
          <li><a className="hover:text-fg" href={site.orcid}>ORCID</a></li>
        </ul>
      </div>
    </footer>
  );
}

/** Two joined arcs: a family mark, drawn inline so it needs no request. */
export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" fill="none" stroke="var(--color-brass)" strokeWidth="1.5" />
      <path d="M9 22 L16 8 L23 22" fill="none" stroke="var(--color-brass)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 17 H20" stroke="var(--color-steel)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
