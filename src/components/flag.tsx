/**
 * Dil seçicideki bayraklar: satır içi SVG (Windows emoji bayrağı göstermez). Sade ama tanınır çizimler, 3:2 oranı.
 * tr → Türkiye, en → Birleşik Krallık, tk → Türkmenistan.
 */

/** Beş köşeli yıldızın köşe noktaları. */
function star(cx: number, cy: number, r: number, rotate = -90): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = ((rotate + i * 36) * Math.PI) / 180;
    const rr = i % 2 === 0 ? r : r * 0.4;
    pts.push(`${(cx + rr * Math.cos(rad)).toFixed(2)},${(cy + rr * Math.sin(rad)).toFixed(2)}`);
  }
  return pts.join(" ");
}

function Turkey() {
  return (
    <svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice">
      <rect width="30" height="20" fill="#E30A17" />
      <circle cx="11" cy="10" r="5" fill="#FFFFFF" />
      <circle cx="12.25" cy="10" r="4" fill="#E30A17" />
      <polygon points={star(17.2, 10, 2.2, 180)} fill="#FFFFFF" />
    </svg>
  );
}

function UnitedKingdom() {
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 60,30 M60,0 0,30" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="2" />
      <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function Turkmenistan() {
  const stars = [
    [17.2, 3.4],
    [19.4, 3.4],
    [17.2, 5.6],
    [19.4, 5.6],
    [18.3, 7.6],
  ];
  return (
    <svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice">
      <rect width="30" height="20" fill="#00843D" />
      <rect x="4" width="6" height="20" fill="#D22630" />
      <path d="M4 3.5 H10 M4 7.5 H10 M4 11.5 H10 M4 15.5 H10" stroke="#8C1D24" strokeWidth="0.8" />
      <circle cx="14.6" cy="5" r="3" fill="#FFFFFF" />
      <circle cx="15.7" cy="4.6" r="2.7" fill="#00843D" />
      {stars.map(([x, y]) => (
        <polygon key={`${x}-${y}`} points={star(x, y, 0.85)} fill="#FFFFFF" />
      ))}
    </svg>
  );
}

const FLAGS: Record<string, () => React.JSX.Element> = { tr: Turkey, en: UnitedKingdom, tk: Turkmenistan };

/** Bayrak; yalnız görsel (adı, düğmenin aria-label/title'ında). */
export function Flag({ locale, size = "md" }: { locale: string; size?: "md" | "lg" }) {
  const Svg = FLAGS[locale] ?? UnitedKingdom;
  const box = size === "lg" ? "h-[18px] w-[27px]" : "h-[14px] w-[21px]";
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10 [&>svg]:block [&>svg]:h-full [&>svg]:w-full ${box}`}
    >
      <Svg />
    </span>
  );
}
