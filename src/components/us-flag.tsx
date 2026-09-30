/**
 * The flag of the United States, drawn to Executive Order 10834 proportions:
 * hoist 1 : fly 1.9, union 7/13 of the hoist tall and 0.76 of it wide,
 * 13 stripes, 50 stars in 9 rows alternating 6 and 5. Units are 1/3900 of
 * the hoist. Official colors, unmodified; nothing is ever drawn over it.
 * No <defs> or ids, so it can appear more than once on a page.
 */
const STAR = "M0,-120 L70.53,97.08 L-114.13,-37.08 L114.13,-37.08 L-70.53,97.08 Z";

const stars: [number, number][] = [];
for (let r = 1; r <= 9; r++) {
  for (let c = r % 2 ? 1 : 2; c <= 11; c += 2) stars.push([247 * c, 210 * r]);
}

export function UsFlag({ className }: { className?: string }) {
  return (
    <svg role="img" aria-label="Flag of the United States" viewBox="0 0 7410 3900" className={className}>
      <rect width="7410" height="3900" fill="#B22234" />
      {[300, 900, 1500, 2100, 2700, 3300].map((y) => (
        <rect key={y} y={y} width="7410" height="300" fill="#FFFFFF" />
      ))}
      <rect width="2964" height="2100" fill="#3C3B6E" />
      {stars.map(([x, y]) => (
        <path key={`${x}-${y}`} d={STAR} transform={`translate(${x} ${y})`} fill="#FFFFFF" />
      ))}
    </svg>
  );
}
