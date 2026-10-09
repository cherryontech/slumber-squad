import { useEffect, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import QuestionsPage from "./pages/QuestionsPage.jsx";
import WorkAreasPage from "./pages/WorkAreasPage.jsx";
import WorkAreaPage from "./pages/WorkAreaPage.jsx";
import { getWorkArea } from "./data/workAreas.js";

// Simple hash-based routing: the part of the URL after "#" picks the page.
//   #work-areas        All work areas
//   #work-areas/ux-ui  one work area's page (any slug from workAreas.js)
//   #questions         questions page
//   anything else      homepage
// No extra library needed, and Netlify serves it without redirect rules.
// If the squad adds React Router later, this is the only place to change.
function getRoute() {
  const hash = window.location.hash;

  if (hash === "#work-areas") return { page: "work-areas" };
  if (hash === "#questions") return { page: "questions" };

  const match = hash.match(/^#work-areas\/([\w-]+)$/);
  if (match) {
    const area = getWorkArea(match[1]);
    // Unknown slug (typo, old link) falls back to the full list
    return area ? { page: "work-area", area } : { page: "work-areas" };
  }

  return { page: "home" };
}

// Each page's browser tab title, so tabs and history are easy to tell apart
// (screen readers also announce the title when a page loads)
function getTitle(route) {
  const site = "slumber-squad";
  if (route.page === "work-areas") return `All work areas · ${site}`;
  if (route.page === "work-area") return `${route.area.name} · ${site}`;
  if (route.page === "questions") return `Tell us a bit about you · ${site}`;
  return site;
}

// min-h-screen + flex-col lets <main> grow (flex-1) so the
// footer always sits at the bottom, matching the mockup.
function App() {
  const [route, setRoute] = useState(getRoute);
  const isFirstRender = useRef(true);

  useEffect(() => {
    function handleHashChange() {
      setRoute(getRoute());
      window.scrollTo(0, 0); // start each page at the top
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
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const heading = document.querySelector("main h1");
    if (heading) {
      heading.setAttribute("tabindex", "-1"); // focusable by script only
      heading.focus({ preventScroll: true });
    }
  }, [route]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header page={route.page} />
      {route.page === "work-areas" && <WorkAreasPage />}
      {/* key resets the filters when you go from one area to another */}
      {route.page === "work-area" && (
        <WorkAreaPage key={route.area.slug} area={route.area} />
      )}
      {route.page === "questions" && <QuestionsPage />}
      {route.page === "home" && <HomePage />}
      <Footer />
    </div>
  );
}

export default App;