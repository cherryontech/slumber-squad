import { useEffect } from "react";
import TaskCard from "../components/TaskCard.jsx";
import { saveProgress } from "../lib/storage.js";

// "Tutorial finished" page, e.g. #work-areas/ux-ui/prepare-interview-questions/done
// Shows two ways forward, then 3 more tutorials from the same work area
// (same stage first), each with its stage and time chips like the mockup.

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
    <div className="flex-1 bg-white px-6 py-14 sm:px-10 lg:px-[5%]">
      <div className="flex flex-col items-center text-center">
        {/* Green check (decorative: the heading says it's finished) */}
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="h-12 w-12 fill-none stroke-success stroke-[3]"
        >
          <circle cx="24" cy="24" r="21" />
          <path
            d="m15 24.5 6 6 12-13"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="mt-4 text-3xl sm:text-4xl">Tutorial finished</h1>
        <p className="mt-3 text-sm">
          Done! That's one more tool in your toolkit.
        </p>
        <a
          href={`#work-areas/${area.slug}`}
          className="mt-6 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Explore more tasks
        </a>
        <a
          href={task.href}
          className="mt-8 inline-flex items-center gap-2 text-sm text-brand-hover underline underline-offset-4 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Need more support? Go back to guidance
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-none stroke-current stroke-2"
          >
            <path
              d="M5 12h14m-6-6 6 6-6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <section aria-labelledby="more-heading" className="mt-16">
        <h2 id="more-heading" className="text-2xl">
          You can also take a look at...
        </h2>
        <p className="mt-2 text-sm">We have more tutorials to check out.</p>
        <ul className="mt-6 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedTasks(area, task).map((related) => (
            <li key={related.slug} className="grid">
              <TaskCard {...related} label={related.stage} minutesChip />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default TutorialFinishedPage;
