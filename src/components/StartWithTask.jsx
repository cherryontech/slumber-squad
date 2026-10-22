import { useId } from "react";
import { ALL_TASKS, POPULAR_TASKS } from "../data/workAreas.js";
import { getTutorial } from "../data/tutorials.js";

// Homepage presentation only; titles, categories, and destinations remain
// sourced from the shared task list, including existing Coming Soon routes.
const PRESENTATION = {
  "Prepare interview questions": {
    description: "Brainstorm thoughtful questions for your next interview.",
    color: "bg-brand-soft text-brand",
    gradient: "to-brand-soft/60",
    path: "M4 4h16v12H9l-5 4V4Z M9 8a3 3 0 0 1 6 0c0 2-3 2-3 4 M12 14h.01",
  },
  "Summarize interview notes": {
    description: "Turn lengthy notes into organized, actionable insights.",
    color: "bg-pink-100 text-pink-700",
    gradient: "to-pink-100/50",
    path: "M6 3h9l4 4v14H6V3Z M14 3v5h5 M9 12h7 M9 16h5",
  },
  "Clean messy data": {
    description:
      "Organize inconsistent information and prepare it for analysis.",
    color: "bg-info text-sky-700",
    gradient: "to-info/60",
    path: "M3 4h18v16H3V4Z M3 9h18 M9 4v16 M9 15h12 M14 12l2 2 3-3",
  },
};

function TaskLink({ area, task, href }) {
  const id = useId();
  const visual = PRESENTATION[task];
  const entry = ALL_TASKS.find((item) => item.href === href);
  const available = entry && Boolean(getTutorial(entry.area.slug, entry.slug));
  return (
    <a
      href={href}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-category ${id}-description ${id}-action`}
      className="group relative isolate flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-brand-line bg-white p-5 shadow-sm transition-[transform,translate,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:translate-y-0!"
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 bg-linear-to-b from-transparent ${visual?.gradient ?? "to-brand-soft/60"}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none flex items-center justify-between"
      >
        <span
          className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${visual?.color ?? "bg-brand-soft text-brand"}`}
        >
          <svg
            focusable="false"
            viewBox="0 0 24 24"
            className="h-6 w-6 fill-none stroke-current"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={visual?.path ?? "M4 4h16v16H4z M8 8h8 M8 12h6"} />
          </svg>
        </span>
      </div>
      <h3 id={`${id}-title`} className="text-lg font-semibold leading-snug">
        {task}
      </h3>
      <p
        id={`${id}-description`}
        className="text-sm leading-relaxed text-ink-muted"
      >
        {visual?.description}
      </p>
      <div className="mt-auto flex flex-col items-start gap-4 pt-2">
        <p
          id={`${id}-category`}
          className="rounded-full border border-brand-line/60 bg-white/80 px-2.5 py-1 text-xs font-medium text-ink-muted"
        >
          {area}
        </p>
        <span
          id={`${id}-action`}
          className="flex w-full items-center justify-between gap-3 text-sm font-semibold text-brand"
        >
          {available ? "Explore task" : "Coming soon"}
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-none stroke-current transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:translate-x-0!"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12h16m-6-6 6 6-6 6" />
          </svg>
        </span>
      </div>
    </a>
  );
}

export default function StartWithTask() {
  return (
    <section
      aria-labelledby="start-task-heading"
      className="mx-auto mt-8 max-w-[1296px] sm:mt-10"
    >
      <h2
        id="start-task-heading"
        className="text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
      >
        Start with a task
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        Not sure where to begin? Try one of these everyday workplace tasks.
      </p>
      <ul className="mt-5 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {POPULAR_TASKS.map((task) => (
          <li key={task.href} className="grid">
            <TaskLink {...task} />
          </li>
        ))}
      </ul>
    </section>
  );
}
