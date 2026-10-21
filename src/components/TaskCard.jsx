// One task card: optional label chip, title, AI tools, "Tutorial · 15 min · 2d".
// Used on work area pages, search results, and "more tutorials" lists.
//
// Tools: the card shows the first two tools plus "+1", like the mockup.
// Screen readers get the full list instead ("Tools: Claude, ChatGPT, Gemini"),
// because "+1" on its own doesn't tell you which tool is hidden.
//
// Meta line: sighted users see the short "15 min · 2d"; screen readers hear
// "15 minutes, updated 2 days ago".
//
// label: small chip above the title, e.g. "Research" or "UX/UI · Research"
// minutesChip: also show "15 mins" as a chip on the right of that row
// (decorative: the meta line already says "15 minutes" to screen readers)
// (search results and related tutorials, where the area/stage isn't obvious).
//
// With `href`, the whole card is a link (same stretched-link pattern as
// WorkAreaCard), with the ↗ arrow. aria-describedby adds the label, tools
// and meta to the link, so tabbing to it reads the whole card:
// "Prepare interview questions, link. Research. Tools: Claude, ChatGPT,
// Copilot. Tutorial, 15 minutes, updated 2 days ago."

import { useId } from "react";
import SpokenText from "./SpokenText.jsx";

const VISIBLE_TOOLS = 2;

function daysAgo(dateString) {
  const updated = new Date(`${dateString}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((today - updated) / 86_400_000));
}

function TaskCard({
  title,
  spoken,
  tools = [],
  format,
  minutes,
  updated,
  href,
  label,
  minutesChip = false,
  headingLevel = 3,
  className = "",
}) {
  const Heading = `h${headingLevel}`;
  const id = useId();
  const shownTools = tools.slice(0, VISIBLE_TOOLS);
  const hiddenCount = tools.length - shownTools.length;
  const days = updated ? daysAgo(updated) : null;

  const meta = [
    format && { short: format, spoken: format },
    minutes && { short: `${minutes} min`, spoken: `${minutes} minutes` },
    days !== null && {
      short: `${days}d`,
      spoken:
        days === 0
          ? "updated today"
          : `updated ${days} ${days === 1 ? "day" : "days"} ago`,
    },
  ].filter(Boolean);

  const describedBy = [
    label && `${id}-label`,
    tools.length > 0 && `${id}-tools`,
    meta.length > 0 && `${id}-meta`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={`relative flex flex-col gap-4 rounded-2xl border border-brand-line bg-white p-4 ${
        href
          ? "transition-shadow hover:shadow-md has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-brand"
          : ""
      } ${className}`}
    >
      {label && (
        <div className="-mb-2 flex items-center justify-between gap-2">
          <p id={`${id}-label`}>
            <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
              {/* "UX/UI · Research" is read as "UX/UI, Research" (no "dot") */}
              <SpokenText text={label} spoken={label.replaceAll(" · ", ", ")} />
            </span>
          </p>
          {minutesChip && minutes && (
            <span
              aria-hidden="true"
              className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand"
            >
              {minutes} mins
            </span>
          )}
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <Heading className="text-xl font-semibold">
          {href ? (
            <a
              href={href}
              aria-describedby={describedBy || undefined}
              className="after:absolute after:inset-0 after:rounded-2xl focus:outline-none"
            >
              <SpokenText text={title} spoken={spoken} />
            </a>
          ) : (
            <SpokenText text={title} spoken={spoken} />
          )}
        </Heading>
        {href && (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="mt-1 h-5 w-5 shrink-0 fill-none stroke-ink stroke-2"
          >
            <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {tools.length > 0 && (
        <>
          {/* Read only as the link's description ("Tools: Claude, ChatGPT,
              Copilot"). aria-hidden keeps NVDA's browse mode from reading
              it twice, since the list below already says the same thing. */}
          <span id={`${id}-tools`} aria-hidden="true" className="sr-only">
            Tools: {tools.join(", ")}.
          </span>
          <ul aria-label="Tools" className="flex flex-wrap gap-2">
            {tools.map((tool, index) => (
              <li
                key={tool}
                // Tools past the first two stay in the list for screen readers
                className={
                  index < VISIBLE_TOOLS
                    ? "rounded-full bg-brand-soft px-3 py-1 text-sm text-brand"
                    : "sr-only"
                }
              >
                {tool}
              </li>
            ))}
            {hiddenCount > 0 && (
              <li
                aria-hidden="true"
                className="rounded-full bg-brand-soft px-3 py-1 text-sm text-brand"
              >
                +{hiddenCount}
              </li>
            )}
          </ul>
        </>
      )}

      {meta.length > 0 && (
        <p className="mt-auto text-sm text-ink-muted">
          <span aria-hidden="true">
            {meta.map((item) => item.short).join(" · ")}
          </span>
          <span id={`${id}-meta`} className="sr-only">
            {meta.map((item) => item.spoken).join(", ")}
          </span>
        </p>
      )}
    </article>
  );
}

export default TaskCard;
