import { useId } from "react";
import CountPill from "./CountPill.jsx";
import WorkAreaIcon from "./WorkAreaIcon.jsx";
import CardAccent from "./CardAccent.jsx";

// Homepage card for one work area. The whole card is clickable,
// but only the title is the actual link (the "stretched link" pattern):
// the link's ::after covers the card, so mouse users can click anywhere,
// while screen readers hear one short link name ("UX/UI") instead of
// the entire card's text. has-[a:focus-visible] draws the focus ring
// around the whole card when the link is focused with the keyboard.
//
// aria-describedby links the description and task count to the link, so
// tabbing to it reads the whole card: "UX/UI, link. Research, design and
// test products. 3 tasks" instead of just "UX/UI". (QA feedback, Oct 10)
function WorkAreaCard({
  name,
  description,
  taskCount,
  href,
  headingLevel = 3,
  variant = "default",
  areaSlug,
}) {
  const Heading = `h${headingLevel}`;
  const id = useId();
  const descriptionId = `${id}-description`;
  const countId = `${id}-count`;
  const isHomepage = variant === "homepage";

  return (
    <article
      className={`relative flex rounded-2xl border border-brand-line bg-white has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-brand ${isHomepage ? "group isolate min-h-[148px] items-start gap-3 overflow-hidden p-5 shadow-sm transition-[transform,translate,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md motion-reduce:translate-y-0!" : "flex-col gap-4 p-4 transition-shadow hover:shadow-md"}`}
    >
      {isHomepage && <CardAccent area={areaSlug} />}
      {isHomepage && <WorkAreaIcon area={areaSlug} />}
      <div
        className={
          isHomepage
            ? "flex min-w-0 flex-1 flex-col gap-1.5 self-stretch"
            : "contents"
        }
      >
        <div
          className={`flex items-start justify-between ${isHomepage ? "gap-2" : "gap-4"}`}
        >
          <Heading
            className={
              isHomepage
                ? "text-[17px] font-semibold leading-snug"
                : "text-xl font-semibold"
            }
          >
            <a
              href={href}
              aria-describedby={
                description ? `${descriptionId} ${countId}` : countId
              }
              className="after:absolute after:inset-0 after:rounded-2xl focus:outline-none"
            >
              {name}
            </a>
          </Heading>
          {/* Decorative arrow: the link text already says where it goes */}
          <span
            aria-hidden="true"
            className={
              isHomepage
                ? "pointer-events-none inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-line bg-white/80 text-brand"
                : "contents"
            }
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={
                isHomepage
                  ? "h-3.5 w-3.5 fill-none stroke-current stroke-2 transition-transform duration-200 group-hover:translate-x-0.5 group-focus-within:translate-x-0.5 motion-reduce:translate-x-0!"
                  : "mt-1 h-5 w-5 shrink-0 fill-none stroke-ink stroke-2"
              }
            >
              <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        {description && (
          <p
            id={descriptionId}
            className={
              isHomepage ? "text-sm leading-relaxed text-ink-muted" : undefined
            }
          >
            {description}
          </p>
        )}
        <div className={isHomepage ? "mt-auto pt-2" : undefined}>
          {isHomepage ? (
            <span
              id={countId}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-line/70 bg-white/80 px-2.5 py-1 text-xs font-medium text-ink-muted"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 fill-none stroke-brand"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15" />
              </svg>
              {taskCount} {taskCount === 1 ? "resource" : "resources"}
            </span>
          ) : (
            <CountPill id={countId} count={taskCount} />
          )}
        </div>
      </div>
    </article>
  );
}

export default WorkAreaCard;
