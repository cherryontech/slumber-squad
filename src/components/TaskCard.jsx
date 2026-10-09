// One task on a work area page: title, AI tools, and "Tutorial · 15 min · 2d".
//
// Tools: the card shows the first two tools plus "+1", like the mockup.
// Screen readers get the full list instead ("Tools: Claude, ChatGPT, Gemini"),
// because "+1" on its own doesn't tell you which tool is hidden.
//
// Meta line: sighted users see the short "15 min · 2d"; screen readers hear
// "15 minutes, updated 2 days ago".
//
// When a task guide page exists, pass `href` and the whole card becomes a
// link (same stretched-link pattern as WorkAreaCard), with the ↗ arrow.

const VISIBLE_TOOLS = 2;

function daysAgo(dateString) {
  const updated = new Date(`${dateString}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((today - updated) / 86_400_000));
}

function TaskCard({ title, tools = [], format, minutes, updated, href }) {
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

  return (
    <article
      className={`relative flex flex-col gap-4 rounded-2xl border border-brand-line bg-white p-4 ${
        href
          ? "transition-shadow hover:shadow-md has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-brand"
          : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold">
          {href ? (
            <a
              href={href}
              className="after:absolute after:inset-0 after:rounded-2xl focus:outline-none"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
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
      )}

      {meta.length > 0 && (
        <p className="text-sm text-ink-muted">
          <span aria-hidden="true">
            {meta.map((item) => item.short).join(" · ")}
          </span>
          <span className="sr-only">
            {meta.map((item) => item.spoken).join(", ")}
          </span>
        </p>
      )}
    </article>
  );
}

export default TaskCard;