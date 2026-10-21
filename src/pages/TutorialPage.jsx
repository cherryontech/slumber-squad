import Breadcrumb from "../components/Breadcrumb.jsx";
import CopyButton from "../components/CopyButton.jsx";
import SpokenText from "../components/SpokenText.jsx";
import { getProgress } from "../lib/storage.js";

// Tutorial overview, e.g. #work-areas/ux-ui/prepare-interview-questions.
// Content comes from data/tutorials.js.
//
// Accessibility:
// - "On this page" is a <nav> with a numbered list of the 7 sections.
//   Because the site uses #hash routing, a normal "#section" link would
//   change the page, so each link scrolls to its section and moves focus
//   to the section heading instead (screen readers read it right away).
// - The "01", "02" numbers are hidden from screen readers; the ordered
//   list already says "1 of 7", and "zero one" is just noise.
// - Placeholders in the prompt ([topic]) are highlighted, and the Copy
//   button announces "Prompt copied to clipboard".

const SECTIONS = [
  { id: "how-ai-can-help", title: "How AI can help" },
  { id: "before-you-start", title: "Before you start" },
  { id: "tools", title: "Tools you can use" },
  { id: "workflow", title: "Suggested workflow" },
  { id: "prompt", title: "Prompt" },
  { id: "example", title: "Example" },
  { id: "check", title: "Check your result" },
];

const primaryButton =
  "inline-block rounded-full bg-brand px-5 py-2 font-semibold text-white hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

function jumpToSection(event, id) {
  event.preventDefault();
  const heading = document.getElementById(`${id}-heading`);
  if (!heading) return;
  heading.setAttribute("tabindex", "-1"); // focusable by script only
  heading.scrollIntoView({ block: "start" });
  heading.focus({ preventScroll: true });
}

// "Write about [topic]" -> "Write about " + highlighted "[topic]"
function PromptText({ text }) {
  return text.split(/(\[[^\]]+\])/).map((part, index) =>
    part.startsWith("[") ? (
      <mark
        key={index}
        className="rounded bg-brand-line px-1 font-semibold text-brand"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function Section({ number, id, title, children }) {
  return (
    <section aria-labelledby={`${id}-heading`} className="scroll-mt-6">
      <h2
        id={`${id}-heading`}
        className="flex scroll-mt-6 items-baseline gap-3 text-2xl font-semibold sm:text-3xl"
      >
        <span aria-hidden="true" className="text-base text-brand sm:text-lg">
          {String(number).padStart(2, "0")}
        </span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`shrink-0 fill-none stroke-current stroke-2 ${className}`}
    >
      <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TutorialPage({ area, task, tutorial }) {
  const key = `${area.slug}/${task.slug}`;
  const progress = getProgress(key);
  const total = tutorial.steps.length;

  // Pick up where you left off (saved on this device)
  const resumeStep = progress.done ? 1 : Math.max(1, progress.step);
  const startLabel = progress.done
    ? "Start tutorial again"
    : progress.step > 1
      ? `Continue tutorial (step ${progress.step} of ${total})`
      : "Start tutorial";
  const startHref = `${task.href}/step-${resumeStep}`;

  return (
    <div className="flex-1">
      {/* White intro band */}
      <div className="bg-white px-6 pt-14 pb-12 sm:px-10 lg:px-[5%]">
        <Breadcrumb
          items={[
            { label: "Home", href: "#" },
            { label: "All work areas", href: "#work-areas" },
            { label: area.name, href: `#work-areas/${area.slug}` },
          ]}
        />
        <ul aria-label="Tags" className="mt-8 flex flex-wrap gap-2">
          {[tutorial.level, tutorial.topic].map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand"
            >
              {tag}
            </li>
          ))}
        </ul>
        <h1 className="mt-4 text-3xl break-words sm:text-4xl lg:text-5xl">
          <SpokenText text={task.title} spoken={task.spoken} />
        </h1>
        <p className="mt-4 max-w-3xl">{tutorial.intro}</p>
        <a href={startHref} className={`mt-6 ${primaryButton}`}>
          {startLabel}
        </a>
      </div>

      <div className="grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[14rem_1fr] lg:gap-16 lg:px-[5%]">
        {/* On this page (sticks to the top while scrolling on desktop) */}
        <nav
          aria-labelledby="on-this-page"
          className="lg:sticky lg:top-6 lg:self-start"
        >
          <h2
            id="on-this-page"
            className="text-sm font-semibold text-ink-muted"
          >
            On this page
          </h2>
          <ol className="mt-3 grid gap-1 border-l-2 border-brand-line">
            {SECTIONS.map((section, index) => (
              <li key={section.id}>
                <a
                  href={task.href}
                  onClick={(event) => jumpToSection(event, section.id)}
                  className="-ml-0.5 flex gap-3 border-l-2 border-transparent py-1.5 pl-4 text-sm hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span aria-hidden="true" className="text-ink-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid min-w-0 max-w-4xl gap-14">
          <Section number={1} {...SECTIONS[0]}>
            <div className="grid gap-4">
              {tutorial.howAiCanHelp.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Section>

          <Section number={2} {...SECTIONS[1]}>
            <ul className="grid gap-4 sm:grid-cols-3">
              {tutorial.beforeYouStart.map((card) => (
                <li
                  key={card.title}
                  className="rounded-2xl border border-brand-line bg-white p-4"
                >
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm">{card.text}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section number={3} {...SECTIONS[2]}>
            <ul className="grid gap-4 sm:grid-cols-3">
              {tutorial.tools.map((tool) => (
                <li
                  key={tool.name}
                  className="rounded-2xl border border-brand-line bg-white p-4"
                >
                  <h3 className="inline-block rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand">
                    {tool.name}
                  </h3>
                  <p className="mt-3">{tool.use}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section number={4} {...SECTIONS[3]}>
            <ol className="grid gap-3">
              {tutorial.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex items-center gap-4 rounded-2xl border border-brand-line bg-white p-4"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white"
                  >
                    {index + 1}
                  </span>
                  <a
                    href={`${task.href}/step-${index + 1}`}
                    className="font-semibold underline-offset-4 hover:text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    {step.title}
                  </a>
                </li>
              ))}
            </ol>
          </Section>

          <Section number={5} {...SECTIONS[4]}>
            <div className="rounded-2xl border border-brand-line bg-white p-5">
              <p className="leading-relaxed">
                <PromptText text={tutorial.prompt} />
              </p>
              <p className="mt-3 text-sm text-ink-muted">
                Replace the highlighted parts in [brackets] with your own
                details.
              </p>
              <div className="mt-4">
                <CopyButton text={tutorial.prompt} />
              </div>
            </div>
          </Section>

          <Section number={6} {...SECTIONS[5]}>
            <div className="grid gap-4 rounded-2xl bg-brand-soft p-5">
              <div>
                <h3 className="text-sm font-semibold">Prompt</h3>
                <p className="mt-1 leading-relaxed">
                  {tutorial.example.prompt}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">
                  What the AI came back with (shortened)
                </h3>
                <ol className="mt-1 grid list-decimal gap-1 pl-6">
                  {tutorial.example.result.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ol>
              </div>
            </div>
          </Section>

          <Section number={7} {...SECTIONS[6]}>
            <p>For each question the AI gives you, ask yourself:</p>
            <ul className="mt-4 grid gap-3">
              {tutorial.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <a href={startHref} className={`mt-8 ${primaryButton}`}>
              {startLabel}
            </a>
          </Section>
        </div>
      </div>
    </div>
  );
}

export default TutorialPage;
