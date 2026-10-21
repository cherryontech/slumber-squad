import { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb.jsx";
import CopyButton from "../components/CopyButton.jsx";
import SpokenText from "../components/SpokenText.jsx";
import ToolLogo from "../components/ToolLogo.jsx";
import { getProgress } from "../lib/storage.js";

// Tutorial overview, e.g. #work-areas/ux-ui/prepare-interview-questions.
// Content comes from data/tutorials.js.
//
// Accessibility:
// - "On this page" is a <nav> with a numbered list of the 7 sections.
//   Because the site uses #hash routing, a normal "#section" link would
//   change the page, so each link scrolls to its section and moves focus
//   to the section heading instead (screen readers read it right away).
// - The section you're reading is highlighted in the list and marked
//   aria-current (NVDA: "current").
// - The "01", "02" badges are hidden from screen readers; the ordered list
//   already says "1 of 7", and "zero one" is just noise.
// - The copy button is icon-only on screen, but its name is "Copy prompt",
//   and it announces "Prompt copied to clipboard".

const SECTIONS = [
  { id: "how-ai-can-help", title: "How AI can help" },
  { id: "before-you-start", title: "Before you start" },
  { id: "tools", title: "Tools you can use" },
  { id: "workflow", title: "Suggested workflow" },
  { id: "prompt", title: "Prompt" },
  { id: "example", title: "Example" },
  { id: "check", title: "Check your result" },
];

const pad = (number) => String(number).padStart(2, "0");

function jumpToSection(event, id) {
  event.preventDefault();
  const heading = document.getElementById(`${id}-heading`);
  if (!heading) return;
  heading.setAttribute("tabindex", "-1"); // focusable by script only
  heading.scrollIntoView({ block: "start" });
  heading.focus({ preventScroll: true });
}

// Which section is at the top of the screen right now
function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.dataset.section);
      },
      // A section counts as "current" when it's in the top third
      { rootMargin: "0px 0px -66% 0px" }
    );
    document
      .querySelectorAll("[data-section]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return [active, setActive];
}

function Section({ number, id, title, children }) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      data-section={id}
      className="scroll-mt-6"
    >
      <h2
        id={`${id}-heading`}
        className="flex scroll-mt-6 items-center gap-2 text-xl font-semibold"
      >
        <span
          aria-hidden="true"
          className="rounded bg-brand-soft px-1.5 py-0.5 text-xs font-semibold text-brand"
        >
          {pad(number)}
        </span>
        {title}
      </h2>
      <div className="mt-3 text-sm">{children}</div>
    </section>
  );
}

function CircleCheck() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mt-px h-5 w-5 shrink-0 fill-none stroke-ink stroke-[1.5]"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TutorialPage({ area, task, tutorial }) {
  const key = `${area.slug}/${task.slug}`;
  const progress = getProgress(key);
  const total = tutorial.steps.length;
  const [activeSection, setActiveSection] = useActiveSection();

  // Pick up where you left off (saved on this device)
  const resumeStep = progress.done ? 1 : Math.max(1, progress.step);
  const startLabel = progress.done
    ? "Start tutorial again"
    : progress.step > 1
      ? `Continue tutorial (step ${progress.step} of ${total})`
      : "Start tutorial";

  return (
    <div className="flex flex-1 flex-col">
      {/* Light blue top: breadcrumb + purple title banner */}
      <div className="px-6 pt-6 pb-8 sm:px-10 lg:px-[5%]">
        <Breadcrumb
          items={[
            { label: "Home", href: "#" },
            { label: "All work areas", href: "#work-areas" },
            { label: area.name, href: `#work-areas/${area.slug}` },
          ]}
        />
        <div className="mt-6 rounded-2xl bg-brand-soft px-6 py-6 sm:px-8">
          <ul aria-label="Tags" className="flex flex-wrap gap-2">
            {[tutorial.level, tutorial.topic].map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-brand-line bg-white px-3 py-0.5 text-xs"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl break-words sm:text-4xl">
              <SpokenText text={task.title} spoken={task.spoken} />
            </h1>
            <a
              href={`${task.href}/step-${resumeStep}`}
              className="shrink-0 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {startLabel}
            </a>
          </div>
          <p className="mt-4 text-sm">{tutorial.intro}</p>
        </div>
      </div>

      {/* Light gray content area, full width */}
      <div className="grid flex-1 gap-10 bg-surface px-6 py-10 sm:px-10 lg:grid-cols-[11rem_1fr] lg:gap-8 lg:px-[5%]">
        {/* On this page (sticks to the top while scrolling on desktop) */}
        <nav
          aria-labelledby="on-this-page"
          className="lg:sticky lg:top-6 lg:self-start"
        >
          <h2 id="on-this-page" className="text-xs font-semibold">
            On this page:
          </h2>
          <ol className="mt-3 grid gap-1.5">
            {SECTIONS.map((section, index) => (
              <li key={section.id}>
                <a
                  href={task.href}
                  aria-current={
                    activeSection === section.id ? "true" : undefined
                  }
                  onClick={(event) => {
                    setActiveSection(section.id);
                    jumpToSection(event, section.id);
                  }}
                  className="flex gap-2 rounded-md bg-white px-2 py-1.5 text-xs hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand aria-[current=true]:bg-brand-soft aria-[current=true]:font-semibold aria-[current=true]:text-brand"
                >
                  <span aria-hidden="true">{pad(index + 1)}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid min-w-0 content-start gap-10">
          <Section number={1} {...SECTIONS[0]}>
            <p>{tutorial.howAiCanHelp}</p>
          </Section>

          <Section number={2} {...SECTIONS[1]}>
            <ul className="grid gap-4 sm:grid-cols-3">
              {tutorial.beforeYouStart.map((card) => (
                <li key={card.title} className="rounded-xl bg-page p-4">
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="mt-1">{card.text}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section number={3} {...SECTIONS[2]}>
            <p>{tutorial.toolsIntro}</p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-3">
              {tutorial.tools.map((tool) => (
                <li
                  key={tool.name}
                  className="flex items-center gap-3 rounded-xl border border-line bg-white p-3"
                >
                  <ToolLogo name={tool.name} src={tool.logo} />
                  <div className="min-w-0">
                    <h3 className="font-semibold">{tool.name}</h3>
                    <p className="text-xs">{tool.use}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section number={4} {...SECTIONS[3]}>
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
              {tutorial.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="border-t-4 border-brand-line pt-3"
                >
                  <p className="text-xs font-semibold text-brand uppercase">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-1 font-semibold">
                    <a
                      href={`${task.href}/step-${index + 1}`}
                      className="underline-offset-4 hover:text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      {step.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-xs">{step.description}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section number={5} {...SECTIONS[4]}>
            <div className="relative rounded-xl border border-brand-line bg-purple-50 py-5 pr-16 pl-5">
              <p className="leading-relaxed">{tutorial.prompt}</p>
              <div className="absolute top-3 right-3">
                <CopyButton text={tutorial.prompt} />
              </div>
            </div>
          </Section>

          <Section number={6} {...SECTIONS[5]}>
            <p className="leading-relaxed">{tutorial.example}</p>
          </Section>

          <Section number={7} {...SECTIONS[6]}>
            <p>{tutorial.checklistIntro}</p>
            <ul className="mt-4 grid gap-x-8 gap-y-4 rounded-2xl bg-info p-5 sm:grid-cols-2">
              {tutorial.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CircleCheck />
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}

export default TutorialPage;
