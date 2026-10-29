import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import MobileDock from "./components/MobileDock.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import PageTransition from "./components/PageTransition.jsx";
import Home from "./pages/Home.jsx";
import CardCash from "./pages/CardCash.jsx";
import Travel from "./pages/Travel.jsx";
import Trading from "./pages/Trading.jsx";
import Infra from "./pages/Infra.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

const routes = [
  { path: "/", el: <Home /> },
  { path: "/card-cash", el: <CardCash /> },
  { path: "/travel", el: <Travel /> },
  { path: "/trading", el: <Trading /> },
  { path: "/infra", el: <Infra /> },
  { path: "/contact", el: <Contact /> },
  { path: "*", el: <NotFound /> },
];

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {routes.map(({ path, el }) => (
          // keyed so the fade-in replays on every page change
          <Route key={path} path={path} element={<PageTransition key={path}>{el}</PageTransition>} />
        ))}
      </Routes>
      <Footer />
      <MobileDock />
    </>
  );
}
