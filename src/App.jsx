import { useEffect, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import QuestionsPage from "./pages/QuestionsPage.jsx";
import WorkAreasPage from "./pages/WorkAreasPage.jsx";
import WorkAreaPage from "./pages/WorkAreaPage.jsx";
import TutorialPage from "./pages/TutorialPage.jsx";
import TutorialStepPage from "./pages/TutorialStepPage.jsx";
import TutorialFinishedPage from "./pages/TutorialFinishedPage.jsx";
import ComingSoonPage from "./pages/ComingSoonPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import { getTask, getWorkArea } from "./data/workAreas.js";
import { getTutorial } from "./data/tutorials.js";
import { startHistory, trackNavigation } from "./lib/history.js";

// Simple hash-based routing: the part of the URL after "#" picks the page.
//   #work-areas                          All work areas
//   #work-areas/ux-ui                    one work area's page
//   #work-areas/ux-ui/<task>             a task: its tutorial overview, or
//                                        "coming soon" if it has no tutorial
//   #work-areas/ux-ui/<task>/step-2      one tutorial step
//   #work-areas/ux-ui/<task>/done        "Tutorial finished"
//   #search?q=user%20interviews          search results
//   #contact                             contact page
//   #questions                           questions page
//   anything else                        homepage
// No extra library needed, and Netlify serves it without redirect rules.
// If the squad adds React Router later, this is the only place to change.
const TASK_ROUTE =
  /^#work-areas\/([\w-]+)\/([\w-]+)(?:\/(?:step-(\d+)|(done)))?$/;

function getRoute() {
  const hash = window.location.hash;

  if (hash === "#work-areas") return { page: "work-areas" };
  if (hash === "#questions") return { page: "questions" };
  if (hash === "#contact") return { page: "contact" };

  if (hash === "#search" || hash.startsWith("#search?")) {
    const params = new URLSearchParams(hash.slice("#search?".length));
    return { page: "search", query: (params.get("q") ?? "").trim() };
  }

  const areaMatch = hash.match(/^#work-areas\/([\w-]+)$/);
  if (areaMatch) {
    const area = getWorkArea(areaMatch[1]);
    // Unknown slug (typo, old link) falls back to the full list
    return area ? { page: "work-area", area } : { page: "work-areas" };
  }

  const taskMatch = hash.match(TASK_ROUTE);
  if (taskMatch) {
    const [, areaSlug, taskSlug, step, done] = taskMatch;
    const area = getWorkArea(areaSlug);
    if (!area) return { page: "work-areas" };
    const task = getTask(area, taskSlug);
    // Unknown task falls back to its work area
    if (!task) return { page: "work-area", area };

    const tutorial = getTutorial(area.slug, task.slug);
    if (!tutorial) return { page: "coming-soon", area, task };

    const stepNumber = Number(step);
    if (stepNumber >= 1 && stepNumber <= tutorial.steps.length) {
      return { page: "tutorial-step", area, task, tutorial, stepNumber };
    }
    if (done) return { page: "tutorial-done", area, task, tutorial };
    return { page: "tutorial", area, task, tutorial };
  }

  return { page: "home" };
}

// Each page's browser tab title, so tabs and history are easy to tell apart
// (screen readers also announce the title when a page loads)
function getTitle(route) {
  const site = "slumber-squad";
  switch (route.page) {
    case "work-areas":
      return `All work areas · ${site}`;
    case "work-area":
      return `${route.area.name} · ${site}`;
    case "tutorial":
      return `${route.task.title} · ${route.area.name} · ${site}`;
    case "tutorial-step": {
      const { stepNumber, tutorial, task } = route;
      const step = tutorial.steps[stepNumber - 1];
      return `Step ${stepNumber} of ${tutorial.steps.length}: ${step.title} · ${task.title} · ${site}`;
    }
    case "tutorial-done":
      return `Tutorial finished · ${route.task.title} · ${site}`;
    case "coming-soon":
      return `${route.task.title} (coming soon) · ${site}`;
    case "search":
      return route.query
        ? `Search results for “${route.query}” · ${site}`
        : `Search · ${site}`;
    case "contact":
      return `Contact us · ${site}`;
    case "questions":
      return `Tell us a bit about you · ${site}`;
    default:
      return site;
  }
}

function Page({ route }) {
  switch (route.page) {
    case "work-areas":
      return <WorkAreasPage />;
    case "work-area":
      return <WorkAreaPage area={route.area} />;
    case "tutorial":
      return <TutorialPage {...route} />;
    case "tutorial-step":
      return <TutorialStepPage {...route} />;
    case "tutorial-done":
      return <TutorialFinishedPage {...route} />;
    case "coming-soon":
      return <ComingSoonPage {...route} />;
    case "search":
      return <SearchPage query={route.query} />;
    case "contact":
      return <ContactPage />;
    case "questions":
      return <QuestionsPage />;
    default:
      return <HomePage />;
  }
}

// min-h-screen + flex-col lets <main> grow (flex-1) so the
// footer always sits at the bottom, matching the mockup.
function App() {
  const [route, setRoute] = useState(getRoute);
  // The URL when this route was picked: used as a React key so each page
  // (and each tutorial step) starts with fresh filters and state
  const [routeKey, setRouteKey] = useState(() => window.location.hash);
  const isFirstRender = useRef(true);
  const scrollTarget = useRef(0);

  useEffect(() => {
    startHistory();
    function handleHashChange() {
      // 0 for a new page; the saved position when you go back to one
      scrollTarget.current = trackNavigation();
      setRoute(getRoute());
      setRouteKey(window.location.hash);
    }
    // "hashchange" fires when a link like href="#questions" is clicked,
    // and when the browser back/forward buttons change the hash
    window.addEventListener("hashchange", handleHashChange);
    // Cleanup so we never stack up duplicate listeners
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    document.title = getTitle(route);

    // After navigating (not on first load), move keyboard focus to the new
    // page's <h1>. Otherwise focus stays on the link you clicked, which no
    // longer exists, and screen reader users don't hear that the page changed.
    // index.css shows a focus ring on it for keyboard users, so focus never
    // seems to "disappear" after pressing Enter on a link.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // New pages start at the top; going back puts you where you were
    window.scrollTo(0, scrollTarget.current);
    const heading = document.querySelector("main h1");
    if (heading) {
      heading.setAttribute("tabindex", "-1"); // focusable by script only
      heading.focus({ preventScroll: true });
    }
  }, [route]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header page={route.page} />
      {/* One <main> for every page. id="main-content" is the skip link's
          target; tabIndex={-1} lets script focus it without adding a Tab stop. */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col focus:outline-none"
      >
        <Page key={routeKey} route={route} />
      </main>
      <Footer page={route.page} />
    </div>
  );
}

export default App;
