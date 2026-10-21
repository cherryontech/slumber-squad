import { useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb.jsx";
import TaskCard from "../components/TaskCard.jsx";
import { saveProgress } from "../lib/storage.js";

// "Tutorial finished" page, e.g. #work-areas/ux-ui/prepare-interview-questions/done
// Shows two ways forward, then 3 more tutorials from the same work area
// (same stage first), each labeled with its stage like the mockup.

const RELATED_COUNT = 3;

function relatedTasks(area, task) {
  const others = area.tasks.filter((t) => t.slug !== task.slug);
  const sameStage = others.filter((t) => t.stage === task.stage);
  const otherStages = others.filter((t) => t.stage !== task.stage);
  return [...sameStage, ...otherStages].slice(0, RELATED_COUNT);
}

function TutorialFinishedPage({ area, task }) {
  const key = `${area.slug}/${task.slug}`;

  useEffect(() => {
    saveProgress(key, { done: true });
  }, [key]);

  return (
    <div className="flex-1 px-6 py-10 sm:px-10 lg:px-[5%]">
      <Breadcrumb
        items={[
          { label: "Home", href: "#" },
          { label: area.name, href: `#work-areas/${area.slug}` },
          { label: task.title, href: task.href },
        ]}
      />

      <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center rounded-3xl bg-brand-soft px-6 py-10 text-center sm:px-12">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 fill-none stroke-current stroke-[3]"
          >
            <path
              d="m5 12 5 5 9-10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="mt-4 text-sm font-semibold text-brand">
          Tutorial finished
        </p>
        <h1 className="mt-2 text-3xl leading-tight sm:text-4xl">
          Done! That's one more tool in your toolkit.
        </h1>
        <a
          href={`#work-areas/${area.slug}`}
          className="mt-6 inline-block rounded-full bg-brand px-5 py-2 font-semibold text-white hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Explore more tasks
        </a>
        <p className="mt-4 text-sm">
          Need more support?{" "}
          <a
            href={task.href}
            className="font-semibold text-brand underline underline-offset-4 hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Go back to guidance
            <span aria-hidden="true"> →</span>
          </a>
        </p>
      </div>

      <section aria-labelledby="more-heading" className="mt-14">
        <h2 id="more-heading" className="text-2xl font-semibold sm:text-3xl">
          You can also take a look at...
        </h2>
        <p className="mt-2">We have more tutorials to check out.</p>
        <ul className="mt-6 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedTasks(area, task).map((related) => (
            <li key={related.slug} className="grid">
              <TaskCard {...related} label={related.stage} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default TutorialFinishedPage;
