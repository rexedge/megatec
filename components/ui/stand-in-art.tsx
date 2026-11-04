import { CATEGORY_GLYPHS } from "@/components/ui/category-glyphs";
import { cn } from "@/lib/cn";

/**
 * The picture shown where a product, spare part or project has no photo yet: shapes from
 * the trade on the brand's blues. A meter dial and its needle, a honeycomb of hexagons
 * (the gas molecule on CNG and LPG kit), pipeline stripes, and the category's own icon
 * on a white disc in the middle. Each item gets its own arrangement from its name, so
 * neighbouring cards differ, and the same item always looks the same.
 *
 * It fills its box (cropping, never stretching) and is decoration only: the item's name
 * is always written beside it.
 */

const SEA = "#165a8f";
const SKY = "#4a9fd8";
const LEAF = "#22c55e";
const NAVY = "#00182c";
const TINT = "#eaf3f8";
const ACCENT = "#d6eaf5";

/** The highlight colour each category leans on. */
const CATEGORY_ACCENT: Record<string, string> = {
  "fuel-solutions": LEAF,
  "cng-solutions": SKY,
  "lpg-solutions": LEAF,
  "ev-chargers": LEAF,
  "station-accessories": SKY,
};

/** A project's kind of work ("Fuel Dispensers", "LPG", …) as the category it draws. */
const PROJECT_CATEGORY: Record<string, string> = {
  "Fuel Dispensers": "fuel-solutions",
  LPG: "lpg-solutions",
  CNG: "cng-solutions",
  "EV Chargers": "ev-chargers",
};

/** The category a project's stand-in picture draws: its first kind of work. */
export function projectArtCategory(categories: readonly string[]) {
  return PROJECT_CATEGORY[categories[0]] ?? "fuel-solutions";
}

/** FNV-1a: a stable number from the item's name. */
function hash(text: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** A small seeded random sequence (mulberry32), so the arrangement repeats exactly. */
function sequence(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 10) / 10;

function hexagon(cx: number, cy: number, r: number) {
  const points = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${round(cx + r * Math.cos(a))},${round(cy + r * Math.sin(a))}`;
  });
  return `M${points.join("L")}Z`;
}

/** A point on a circle, angle in degrees clockwise from 12 o'clock. */
function polar(cx: number, cy: number, r: number, degrees: number) {
  const a = ((degrees - 90) * Math.PI) / 180;
  return [round(cx + r * Math.cos(a)), round(cy + r * Math.sin(a))] as const;
}

function arc(cx: number, cy: number, r: number, from: number, to: number) {
  const [x1, y1] = polar(cx, cy, r, from);
  const [x2, y2] = polar(cx, cy, r, to);
  return `M${x1} ${y1}A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`;
}

export function StandInArt({
  seed,
  category = "fuel-solutions",
  className,
}: {
  /** Usually the item's name. */
  seed: string;
  /** The category slug, which picks the icon and the highlight colour. */
  category?: string;
  className?: string;
}) {
  const h = hash(`${category}:${seed}`);
  const next = sequence(h);
  const id = `art-${h.toString(36)}`;
  const accent = CATEGORY_ACCENT[category] ?? LEAF;
  const glyph = CATEGORY_GLYPHS[category] ?? CATEGORY_GLYPHS["fuel-solutions"];

  // The dial is centred on one corner, so a quarter of a big gauge reaches into the picture;
  // `facing` is the bearing (clockwise from 12 o'clock) of its quarter. The pipeline stripes
  // cut across the opposite corner, and the middle stays clear for the icon.
  const corner = h % 4;
  const [dx, dy, facing] = (
    [
      [400, 400, 270],
      [0, 400, 0],
      [400, 0, 180],
      [0, 0, 90],
    ] as const
  )[corner];
  const needle = facing + 18 + Math.floor(next() * 54);
  const sweep = 20 + Math.floor(next() * 25);

  // A honeycomb across the whole picture, as one path, with a few cells filled in.
  const r = 24;
  const w = Math.sqrt(3) * r;
  const cells: string[] = [];
  const filled: string[] = [];
  for (let row = -1; row < 400 / (1.5 * r) + 1; row++) {
    for (let col = -1; col < 400 / w + 1; col++) {
      const cx = col * w + (row % 2 ? w / 2 : 0);
      const cy = row * 1.5 * r;
      const cell = hexagon(cx, cy, r - 2);
      cells.push(cell);
      if (next() < 0.045) filled.push(cell);
    }
  }

  // Three pipes cutting across the corner opposite the dial, square to its diagonal.
  const [ox, oy] = [400 - dx, 400 - dy];
  const [sx, sy] = [ox === 0 ? 1 : -1, oy === 0 ? 1 : -1];
  const reach = 95 + Math.floor(next() * 40);
  const pipes = [SEA, SKY, accent].map((colour, i) => {
    const c = reach + i * 30;
    return { colour, d: `M${ox + sx * c} ${oy - sy * 20}L${ox - sx * 20} ${oy + sy * c}` };
  });

  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={cn("absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <linearGradient id={`${id}-ground`} gradientTransform={`rotate(${45 + (h % 90)} 0.5 0.5)`}>
          <stop offset="0" stopColor={TINT} />
          <stop offset="1" stopColor={ACCENT} />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="400" fill={`url(#${id}-ground)`} />
      <path d={cells.join("")} fill="none" stroke={SEA} strokeOpacity="0.09" strokeWidth="1.5" />
      <path d={filled.join("")} fill={accent} fillOpacity="0.16" />

      {pipes.map((pipe) => (
        <path key={pipe.colour} d={pipe.d} stroke={pipe.colour} strokeOpacity="0.6" strokeWidth="11" strokeLinecap="round" />
      ))}

      {/* The meter dial: rings, a scale, the reading and the needle, out of one corner. */}
      {[110, 150, 190, 245].map((radius, i) => (
        <circle key={radius} cx={dx} cy={dy} r={radius} fill="none" stroke={SEA} strokeOpacity={0.2 - i * 0.03} strokeWidth="2" />
      ))}
      <g stroke={SEA} strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round">
        {Array.from({ length: 10 }, (_, i) => {
          const at = facing + 4.5 + i * 9;
          const [x1, y1] = polar(dx, dy, 160, at);
          const [x2, y2] = polar(dx, dy, i % 3 === 0 ? 180 : 172, at);
          return <path key={i} d={`M${x1} ${y1}L${x2} ${y2}`} />;
        })}
      </g>
      <path d={arc(dx, dy, 210, needle - sweep, needle)} fill="none" stroke={accent} strokeWidth="12" strokeLinecap="round" />
      <path d={`M${dx} ${dy}L${polar(dx, dy, 192, needle).join(" ")}`} stroke={NAVY} strokeOpacity="0.85" strokeWidth="5" strokeLinecap="round" />

      {/* The category's icon on a white disc, always in the middle. */}
      <circle cx="200" cy="200" r="110" fill={`url(#${id}-glow)`} />
      <circle cx="200" cy="200" r="72" fill="none" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="2" />
      <circle cx="200" cy="200" r="58" fill="#ffffff" />
      <g
        transform="translate(164 164) scale(3)"
        fill="none"
        stroke={SEA}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {glyph}
      </g>
    </svg>
  );
}
