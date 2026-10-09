import CountPill from "./CountPill.jsx";

// Homepage card for one work area. The whole card is clickable,
// but only the title is the actual link (the "stretched link" pattern):
// the link's ::after covers the card, so mouse users can click anywhere,
// while screen readers hear one short link name ("UX/UI") instead of
// the entire card's text. has-[a:focus-visible] draws the focus ring
// around the whole card when the link is focused with the keyboard.
function WorkAreaCard({
  name,
  description,
  taskCount,
  href,
  headingLevel = 3,
}) {
  const Heading = `h${headingLevel}`;

  return (
    <article className="relative flex flex-col gap-4 rounded-2xl border border-brand-line bg-white p-4 transition-shadow hover:shadow-md has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-brand">
      <div className="flex items-start justify-between gap-4">
        <Heading className="text-xl font-semibold">
          <a
            href={href}
            className="after:absolute after:inset-0 after:rounded-2xl focus:outline-none"
          >
            {name}
          </a>
        </Heading>
        {/* Decorative arrow: the link text already says where it goes */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="mt-1 h-5 w-5 shrink-0 fill-none stroke-ink stroke-2"
        >
          <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" />
        </svg>
      </div>
      {description && <p>{description}</p>}
      <div>
        <CountPill count={taskCount} />
      </div>
    </article>
  );
}

export default WorkAreaCard;