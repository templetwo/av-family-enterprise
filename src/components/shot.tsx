import type { Screenshot } from "@/data/content";

export function Shot({ shot, eager = false, caption = true }: { shot: Screenshot; eager?: boolean; caption?: boolean }) {
  const [w, h] = shot.hero ? [1920, 1200] : shot.terminal ? [1100, 760] : [1600, 1000];
  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-surface shadow-[0_18px_50px_-20px_rgb(0_0_0/0.7)]">
      <img
        src={shot.src}
        alt={shot.alt}
        width={w}
        height={h}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full bg-surface-raised"
      />
      {caption && (
        <figcaption className="border-t border-border px-4 py-3 text-sm leading-relaxed text-fg-soft">
          {shot.caption}
        </figcaption>
      )}
    </figure>
  );
}
