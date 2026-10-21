import Breadcrumb from "../components/Breadcrumb.jsx";
import SpokenText from "../components/SpokenText.jsx";
import { TUTORIALS } from "../data/tutorials.js";
import { ALL_TASKS } from "../data/workAreas.js";

// Shown for any task that doesn't have a tutorial in data/tutorials.js yet,
// so every task card goes somewhere useful instead of a dead end.

// Tasks that do have a finished tutorial, to suggest instead
const READY_TASKS = ALL_TASKS.filter(
  (task) => TUTORIALS[`${task.area.slug}/${task.slug}`]
);

const linkClass =
  "font-semibold text-brand underline underline-offset-4 hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

function ComingSoonPage({ area, task }) {
  const suggestions = READY_TASKS.filter((ready) => ready.href !== task.href);

  return (
    <div className="flex-1 px-6 py-14 sm:px-10 lg:px-[5%]">
      <Breadcrumb
        items={[
          { label: "Home", href: "#" },
          { label: "All work areas", href: "#work-areas" },
          { label: area.name, href: `#work-areas/${area.slug}` },
        ]}
      />
      <div className="mt-8 max-w-2xl rounded-3xl border border-dashed border-brand-line bg-white p-6 sm:p-10">
        <p className="text-sm font-semibold text-brand">
          {area.name} · {task.stage}
        </p>
        <h1 className="mt-2 text-3xl break-words sm:text-4xl">
          <SpokenText text={task.title} spoken={task.spoken} />
        </h1>
        <p className="mt-4">
          We're still writing this guide. Check back soon, or try one of these
          in the meantime:
        </p>
        <ul className="mt-4 grid gap-2">
          <li>
            <a href={`#work-areas/${area.slug}`} className={linkClass}>
              More {area.name} tasks
            </a>
          </li>
          {suggestions.map((ready) => (
            <li key={ready.href}>
              <a href={ready.href} className={linkClass}>
                Try a finished guide: {ready.title}
              </a>
            </li>
          ))}
          <li>
            <a href="#work-areas" className={linkClass}>
              Browse all work areas
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ComingSoonPage;
