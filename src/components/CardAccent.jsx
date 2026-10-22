const COLORS = {
  "data-analysis": "fill-info/70",
  "qa-testing": "fill-info/70",
  development: "fill-pink-100/70",
  marketing: "fill-pink-100/70",
};

// A quiet corner accent; category text and icons carry the meaning.
export default function CardAccent({ area }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 180 100"
      className={`pointer-events-none absolute right-0 bottom-0 -z-10 h-24 w-44 ${COLORS[area] ?? "fill-brand-soft/70"}`}
    >
      <path d="M0 100C45 95 65 45 120 50S160 15 180 5V100Z" />
      <path d="M45 100C95 90 125 65 180 70V100Z" className="fill-white/50" />
    </svg>
  );
}
