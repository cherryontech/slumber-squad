import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import QuestionsPage from "./pages/QuestionsPage.jsx";

// Simple hash-based routing: the part of the URL after "#" picks the page.
// e.g. slumber-squad.netlify.app/#questions shows the questions page.
// No extra library needed, and Netlify serves it without redirect rules.
// If the squad adds React Router later, this is the only place to change.
function getPage() {
  return window.location.hash === "#questions" ? "questions" : "home";
}

// min-h-screen + flex-col lets <main> grow (flex-1) so the
// footer always sits at the bottom, matching the mockup.
function App() {
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    function handleHashChange() {
      setPage(getPage());
      window.scrollTo(0, 0); // start each page at the top
    }
    // "hashchange" fires when a link like href="#questions" is clicked,
    // and when the browser back/forward buttons change the hash
    window.addEventListener("hashchange", handleHashChange);
    // Cleanup so we never stack up duplicate listeners
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {page === "questions" ? <QuestionsPage /> : <HomePage />}
      <Footer />
    </div>
  );
}

export default App;