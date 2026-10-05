import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";

// min-h-screen + flex-col lets <main> grow (flex-1) so the
// footer always sits at the bottom, matching the mockup.
function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;