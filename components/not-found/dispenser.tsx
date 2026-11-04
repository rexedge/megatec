/**
 * The 404 page's picture: a MEGA-TEC fuel dispenser whose display reads 404 on seven-segment
 * digits, with an OUT OF SERVICE tag hanging from its nozzle. Drawn rather than photographed
 * so the display can say 404. The display stutters on and the tag sways, unless the visitor
 * has asked for reduced motion.
 */

// One seven-segment digit, 26 × 46: the seven bars, and which of them light up for each figure.
const SEGMENTS = {
  a: { x: 3, y: 0, width: 20, height: 5 },
  b: { x: 21, y: 3, width: 5, height: 19 },
  c: { x: 21, y: 24, width: 5, height: 19 },
  d: { x: 3, y: 41, width: 20, height: 5 },
  e: { x: 0, y: 24, width: 5, height: 19 },
  f: { x: 0, y: 3, width: 5, height: 19 },
  g: { x: 3, y: 20.5, width: 20, height: 5 },
} as const;

type Segment = keyof typeof SEGMENTS;

const LIT: Record<string, Segment[]> = {
  "0": ["a", "b", "c", "d", "e", "f"],
  "4": ["b", "c", "f", "g"],
};

const READING = "404";
const DIGIT_X = [99, 137, 175];
const DIGIT_Y = 132;

function Bars({ segments, x }: { segments: readonly Segment[]; x: number }) {
  return (
    <g transform={`translate(${x} ${DIGIT_Y}) skewX(-6)`}>
      {segments.map((segment) => (
        <rect key={segment} {...SEGMENTS[segment]} rx={2.5} />
      ))}
    </g>
  );
}

export function Dispenser({ className }: { className?: string }) {
  const all = Object.keys(SEGMENTS) as Segment[];
  return (
    <svg viewBox="12 24 304 396" className={className} aria-hidden="true" focusable="false">
      {/* Shadow on the forecourt */}
      <ellipse cx="150" cy="410" rx="118" ry="7" className="fill-ink/10" />

      {/* The hose, looping from the nozzle over the side and back into the cabinet */}
      <path
        d="M250 122 C250 90 300 90 300 150 C300 250 302 356 236 372"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        className="stroke-ink"
      />

      {/* Plinth, cabinet and the branded crown */}
      <rect x="46" y="384" width="208" height="22" rx="6" className="fill-ink" />
      <rect x="60" y="62" width="180" height="326" rx="16" strokeWidth="2" className="fill-white stroke-border" />
      <rect x="54" y="36" width="192" height="48" rx="12" className="fill-sea" />
      <text
        x="150"
        y="66"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        letterSpacing="3"
        className="font-accent fill-white"
      >
        MEGA-TEC
      </text>

      {/* The display: litres on seven-segment digits */}
      <rect x="80" y="102" width="140" height="106" rx="10" className="fill-navy" />
      <text x="94" y="121" fontSize="8" letterSpacing="1.6" className="fill-navy-text/60">
        LITRES
      </text>
      <text x="206" y="121" fontSize="8" letterSpacing="1.6" textAnchor="end" className="fill-navy-text/60">
        PUMP 04
      </text>
      <g className="fill-accent-soft/10">
        {DIGIT_X.map((x) => (
          <Bars key={x} segments={all} x={x} />
        ))}
      </g>
      <g className="fill-accent-soft motion-safe:animate-lcd-on filter-[drop-shadow(0_0_3px_rgb(187_231_246/0.55))]">
        {DIGIT_X.map((x, i) => (
          <Bars key={x} segments={LIT[READING[i]]} x={x} />
        ))}
      </g>
      <text
        x="150"
        y="197"
        fontSize="7.5"
        letterSpacing="1.8"
        textAnchor="middle"
        className="fill-accent-soft/75"
      >
        PAGE NOT FOUND
      </text>

      {/* Keypad */}
      <g className="fill-muted">
        {[226, 242, 258, 274].map((y) =>
          [103, 137, 171].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="26" height="11" rx="3" />)
        )}
      </g>

      {/* Brand stripes and the vents below them */}
      <rect x="61" y="300" width="178" height="7" className="fill-sky" />
      <rect x="61" y="307" width="178" height="4" className="fill-leaf" />
      <g strokeWidth="2" strokeLinecap="round" className="stroke-muted">
        {[332, 342, 352, 362].map((y) => (
          <path key={y} d={`M86 ${y}H214`} />
        ))}
      </g>

      {/* Holster, and the nozzle resting in it */}
      <rect x="240" y="148" width="20" height="60" rx="4" strokeWidth="2" className="fill-muted stroke-border" />
      <rect x="244" y="118" width="12" height="46" rx="6" className="fill-ink" />

      {/* OUT OF SERVICE tag, swinging from the holster */}
      <g className="motion-safe:animate-tag-sway" style={{ transformOrigin: "250px 208px" }}>
        <rect x="221" y="224" width="58" height="36" rx="5" fill="#fbbf24" />
        <circle cx="250" cy="231" r="2.5" className="fill-white" />
        <path d="M250 208V230" strokeWidth="1.5" strokeLinecap="round" className="stroke-ink/70" />
        <text x="250" y="245" fontSize="8" fontWeight="700" letterSpacing="0.8" textAnchor="middle" className="fill-ink">
          OUT OF
        </text>
        <text x="250" y="255" fontSize="8" fontWeight="700" letterSpacing="0.8" textAnchor="middle" className="fill-ink">
          SERVICE
        </text>
      </g>
    </svg>
  );
}
