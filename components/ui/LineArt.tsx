/**
 * Drawings used as decoration (photo corner accents, the hero's copper diagonals, the contact map, the beige squares
 * of the testimonials, the footer's wave). They are SVG or CSS shapes, so they stay sharp at every size; most of them
 * draw in `currentColor`, so each place sets the colour and size with classes.
 */
type ArtProps = { className?: string };

type CornerProps = {
  /** which corner of the framed block the accent hugs */
  corner: "top-left" | "bottom-right";
  /** position, size, line thickness and colour */
  className?: string;
};

/** Rounded corner line ("⌜" or "⌟") hugging a card or photo */
export const CornerAccent = ({ corner, className = "" }: CornerProps) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute border-solid ${
      corner === "top-left" ? "!border-b-0 !border-r-0" : "!border-l-0 !border-t-0"
    } ${className}`}
  />
);

/** The hero's copper diagonals at the bottom-right corner: a faint wide band, a softer one and a solid one in front */
export const HeroShapes = ({ className }: ArtProps) => (
  <svg viewBox="0 0 520 832" preserveAspectRatio="none" aria-hidden="true" className={className}>
    <defs>
      <linearGradient id="heroCopper" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="var(--color-hero-shape-dark)" />
        <stop offset="0.55" stopColor="var(--color-hero-shape-mid)" />
        <stop offset="1" stopColor="var(--color-hero-shape-light)" />
      </linearGradient>
    </defs>
    <polygon points="505,0 520,0 520,832 18,832" fill="url(#heroCopper)" opacity="0.3" />
    <polygon points="520,40 520,832 112,832" fill="url(#heroCopper)" opacity="0.32" />
    <polygon points="520,84 520,832 200,832" fill="url(#heroCopper)" opacity="0.9" />
    <line x1="452" y1="184" x2="96" y2="832" stroke="var(--color-hero-shape-edge)" strokeWidth="1.5" opacity="0.45" />
  </svg>
);

/** Two beige slanted squares (testimonials, top-right; turned around for the bottom-left pair) */
export const SkewSquares = ({ className }: ArtProps) => (
  <svg viewBox="0 0 152 112" aria-hidden="true" className={className}>
    <g fill="currentColor">
      <polygon points="82,0 152,0 142,70 72,70" />
      <polygon points="7,60 62,60 55,110 0,110" />
    </g>
  </svg>
);

/** Fine wavy lines fading out at the footer's bottom-left */
export const WaveLines = ({ className }: ArtProps) => (
  <svg viewBox="0 0 420 220" fill="none" aria-hidden="true" className={className}>
    <defs>
      <linearGradient id="waveFade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="currentColor" stopOpacity="0.05" />
        <stop offset="0.45" stopColor="currentColor" stopOpacity="0.85" />
        <stop offset="1" stopColor="currentColor" stopOpacity="0" />
      </linearGradient>
    </defs>
    <g stroke="url(#waveFade)" strokeWidth="1.4" strokeDasharray="2 2.5">
      {Array.from({ length: 16 }, (_, i) => (
        <path key={i} d={`M0 ${28 + i * 5}C${90 + i * 3} ${18 + i * 4} ${150 + i * 2} ${70 + i * 7} ${230 + i * 4} ${118 + i * 5}S${360} ${150 + i * 3} 420 ${146 + i * 2}`} />
      ))}
    </g>
  </svg>
);

// The contact map: a light street map (blocks, white streets, parks and a river) drawn once, so the page needs no
// map service. Streets are two families of parallel lines turned like the design's map, with a few main roads.
const minorA = Array.from({ length: 34 }, (_, i) => -420 + i * 46);
const minorB = Array.from({ length: 24 }, (_, i) => -320 + i * 64);
const mainRoads = [
  "M-40 520L880 120",
  "M-40 640L880 330",
  "M120 -40L420 700",
  "M560 -40L760 700",
  "M-40 260C200 300 420 420 880 470",
];
const parks = [
  "M40 70l70-20 22 62-74 18z",
  "M640 110l90-26 26 70-92 22z",
  "M80 460l86-24 20 58-88 26z",
  "M470 560l110-30 18 52-112 30z",
  "M300 270l52-14 16 40-54 14z",
  "M720 420l70-18 18 50-72 18z",
];
const river = "M250 -20C230 60 170 110 176 168S236 236 226 300C214 372 260 410 300 470C336 524 270 590 236 680";

export const MapArt = ({ className }: ArtProps) => (
  <svg viewBox="0 0 833 650" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
    <rect width="833" height="650" fill="var(--color-bg-map)" />
    <g fill="var(--color-map-park)">
      {parks.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
    <g stroke="var(--color-map-road)" strokeLinecap="round">
      <g transform="rotate(-24 416 325)" strokeWidth="5">
        {minorA.map((y) => (
          <line key={`a${y}`} x1="-300" y1={y} x2="1140" y2={y} />
        ))}
        {minorB.map((x) => (
          <line key={`b${x}`} x1={x} y1="-400" x2={x} y2="1050" />
        ))}
      </g>
      <g fill="none">
        {mainRoads.map((d) => (
          <path key={d} d={d} stroke="var(--color-map-block)" strokeWidth="17" />
        ))}
        {mainRoads.map((d) => (
          <path key={`${d}-top`} d={d} strokeWidth="12" />
        ))}
      </g>
    </g>
    <path d={river} fill="none" stroke="var(--color-map-water)" strokeWidth="13" strokeLinecap="round" />
  </svg>
);
