const BENEFITS = [
  {
    title: "Built for you",
    description:
      "Designed with and for women and underrepresented genders in tech.",
    path: "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M18 15a4 4 0 0 1 4 4v2 M14 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M18 3a4 4 0 0 1 0 8",
  },
  {
    title: "Practical & beginner-friendly",
    description: "Real workplace examples you can use today.",
    path: "M9 18h6 M9 21h6 M8 14a7 7 0 1 1 8 0c-1 1-1 2-1 2H9s0-1-1-2 M12 1v2 M2 7l2 1 M20 8l2-1",
  },
  {
    title: "A supportive community",
    description: "Learn, share and grow together.",
    path: "M12 21 3.5 12.5a5.5 5.5 0 0 1 8.5-7 5.5 5.5 0 0 1 8.5 7L12 21Z",
  },
  {
    title: "Closing the AI gap",
    description: "More access. More confidence. More opportunities.",
    path: "M4 22 9 2 M15 22 20 2 M8 6h11 M7 10h11 M6 14h11 M5 18h11",
  },
];

export default function HomeBenefits() {
  return (
    <footer
      aria-label="AI4U benefits"
      className="px-6 pb-6 sm:px-10 lg:px-[5%]"
    >
      <ul className="mx-auto grid w-full max-w-[1296px] rounded-3xl bg-brand-soft px-4 py-2 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map(({ title, description, path }) => (
          <li
            key={title}
            className="flex items-start gap-3 border-t border-brand-line px-3 py-4 first:border-t-0 sm:border-t-0 sm:odd:border-r lg:[&:not(:last-child)]:border-r"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              className="pointer-events-none mt-0.5 h-8 w-8 shrink-0 fill-none stroke-brand"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={path} />
            </svg>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold leading-snug">{title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </footer>
  );
}
