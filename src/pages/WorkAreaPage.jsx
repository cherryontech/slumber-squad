import { useMemo, useState } from "react";
import Breadcrumb from "../components/Breadcrumb.jsx";
import StageFilter from "../components/StageFilter.jsx";
import SelectPill from "../components/SelectPill.jsx";
import TaskCard from "../components/TaskCard.jsx";

const SORT_OPTIONS = [
  { value: "popular", label: "Most popular" },
  { value: "newest", label: "Newest" },
  { value: "shortest", label: "Shortest" },
];

// One page per work area, e.g. #work-areas/ux-ui.
// Everything on it comes from that area's entry in data/workAreas.js,
// so every area gets this page for free.
function WorkAreaPage({ area }) {
  const { name, intro, stages = [], tasks } = area;

  // Start on the first stage (like the mockup); null = show every stage
  const [stage, setStage] = useState(stages[0] ?? null);
  const [tool, setTool] = useState("all");
  const [sort, setSort] = useState("popular");

  // Tool dropdown options come from whatever tools this area's tasks use
  const toolOptions = useMemo(() => {
    const tools = [...new Set(tasks.flatMap((task) => task.tools ?? []))];
    return [
      { value: "all", label: "All" },
      ...tools.map((t) => ({ value: t, label: t })),
    ];
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    const filtered = tasks.filter(
      (task) =>
        (!stage || task.stage === stage) &&
        (tool === "all" || task.tools?.includes(tool))
    );
    if (sort === "newest") {
      return [...filtered].sort((a, b) =>
        (b.updated ?? "").localeCompare(a.updated ?? "")
      );
    }
    if (sort === "shortest") {
      return [...filtered].sort(
        (a, b) => (a.minutes ?? Infinity) - (b.minutes ?? Infinity)
      );
    }
    return filtered; // "popular" = the order in workAreas.js
  }, [tasks, stage, tool, sort]);

  const count = visibleTasks.length;

  return (
    <main className="flex-1">
      {/* White intro band */}
      <div className="bg-white px-6 pt-14 pb-14 sm:px-10 lg:px-[5%]">
        <Breadcrumb
          items={[
            { label: "Home", href: "#" },
            { label: "All work areas", href: "#work-areas" },
          ]}
        />
        <h1 className="mt-8 text-5xl">{name}</h1>
        {intro && <p className="mt-4 max-w-4xl">{intro}</p>}
      </div>

      {/* Tasks */}
      <section
        aria-labelledby="tasks-heading"
        className="px-6 py-6 sm:px-10 lg:px-[5%]"
      >
        <h2 id="tasks-heading" className="sr-only">
          Tasks
        </h2>

        {stages.length > 0 && (
          <StageFilter stages={stages} selected={stage} onSelect={setStage} />
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          {/* aria-live announces the new count when a filter changes */}
          <p aria-live="polite" className="text-sm font-semibold">
            {count} {count === 1 ? "task" : "tasks"}
          </p>
          <div className="flex flex-wrap gap-3">
            {toolOptions.length > 1 && (
              <SelectPill
                label="Tool"
                value={tool}
                options={toolOptions}
                onChange={setTool}
              />
            )}
            <SelectPill
              label="Sort"
              value={sort}
              options={SORT_OPTIONS}
              onChange={setSort}
            />
          </div>
        </div>

        {count > 0 ? (
          <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTasks.map((task) => (
              <li key={task.title} className="grid">
                {/* TODO: pass href once task guide pages exist */}
                <TaskCard {...task} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 rounded-2xl border border-dashed border-brand-line bg-white p-6 text-ink-muted">
            No tasks here yet. Try another stage or tool.
          </p>
        )}
      </section>
    </main>
  );
}

export default WorkAreaPage;