const ICONS = {
  "ux-ui": {
    color: "bg-brand-soft text-brand",
    path: "M3 4h18v13H3z M8 21h8 M12 17v4 M6 14h12",
  },
  "data-analysis": {
    color: "bg-info text-sky-700",
    path: "M4 13h3v8H4z M10.5 8h3v13h-3z M17 3h3v18h-3z",
  },
  development: {
    color: "bg-pink-100 text-pink-700",
    path: "m7 6-6 6 6 6 M17 6l6 6-6 6 M14 3l-4 18",
  },
  "project-management": {
    color: "bg-purple-100 text-brand",
    path: "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M18 15a4 4 0 0 1 4 4v2 M14 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M18 3a4 4 0 0 1 0 8",
  },
  "product-management": {
    color: "bg-brand-soft text-brand",
    path: "m12 2 9 5-9 5-9-5 9-5 M3 12l9 5 9-5 M3 17l9 5 9-5",
  },
  "qa-testing": {
    color: "bg-info text-sky-700",
    path: "m8 12 3 3 5-6 M12 2l8 3v6c0 5-4 9-8 11-4-2-8-6-8-11V5l8-3Z",
  },
  marketing: {
    color: "bg-pink-100 text-pink-700",
    path: "M3 9h5l12-5v16L8 15H3V9Z M8 15l2 6H6l-2-6 M8 9v6",
  },
};

// Decorative: the adjacent category title supplies the accessible name.
export default function WorkAreaIcon({ area }) {
  const icon = ICONS[area];
  if (!icon) return null;
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${icon.color}`}
    >
      <svg
        focusable="false"
        viewBox="0 0 24 24"
        className="h-7 w-7 fill-none stroke-current"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={icon.path} />
      </svg>
    </span>
  );
}
