import type { ReactNode } from "react";
import { steps as stepsFor } from "@/data/content";

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="on-navy bg-navy text-on-navy">
      <div className="wrap py-[clamp(56px,8vw,96px)]">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="h1 mt-4 max-w-4xl text-white">{title}</h1>
        {children && <div className="lead mt-5 text-on-navy-soft">{children}</div>}
      </div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

/** A screenshot or illustration with the mono standing tag kept on the image (build notes §4). */
export function Figure({
  src,
  alt,
  tag,
  width,
  height,
  ratio = "16/9",
  fit = "cover",
  position = "top",
  eager = false,
}: {
  src: string;
  alt: string;
  tag?: string;
  width: number;
  height: number;
  ratio?: string;
  fit?: "cover" | "contain";
  position?: string;
  eager?: boolean;
}) {
  return (
    <div className="relative overflow-hidden bg-placeholder" style={{ aspectRatio: ratio }}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full"
        style={{ objectFit: fit, objectPosition: position }}
      />
      {tag && <span className="tag">{tag}</span>}
    </div>
  );
}

export function Steps({ variant }: { variant: "home" | "about" }) {
  return (
    <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
      {stepsFor(variant).map((s, i) => (
        <li key={s.title} className="gold-rule pt-4">
          <p className="mono text-ink-soft">Step {i + 1}</p>
          <h3 className="h3 mt-2">{s.title}</h3>
          <p className="mt-2 text-[15px] text-ink-soft">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Type / Lifecycle / Evidence, the three labels every portfolio entry carries. */
export function Standing({ type, lifecycle, evidence }: { type: string; lifecycle: string; evidence: string }) {
  const row = "grid grid-cols-[92px_1fr] gap-3 border-t border-rule py-2";
  return (
    <dl className="mt-4 text-[14.5px]">
      <div className={row}><dt className="mono pt-0.5 text-ink-soft">Type</dt><dd>{type}</dd></div>
      <div className={row}><dt className="mono pt-0.5 text-ink-soft">Lifecycle</dt><dd>{lifecycle}</dd></div>
      <div className={`${row} border-b`}><dt className="mono pt-0.5 text-ink-soft">Evidence</dt><dd>{evidence}</dd></div>
    </dl>
  );
}

export function Note({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-4 border-l-2 border-gold bg-page px-4 py-3 text-[14.5px]">
      <p className="mono text-ink-soft">{label}</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}

export function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="tlink">
      {children}
    </a>
  );
}
