import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import AboutSection from "./sections/About";
import WorksSection from "./sections/Works";
import ContactsSection from "./sections/Contacts.jsx";
import ProjectDetails from "./sections/ProjectDetails.jsx";
import { getWorkBySlug } from "./data/Works.js";
import { parseHashRoute } from "./utils/hashRoute.js";

function App() {
  const sections = { About: "#About", Works: "#Works", Contacts: "#Contacts" };
  const [route, setRoute] = useState(() => parseHashRoute(window.location.hash));

  useEffect(() => {
    const updateRoute = () => setRoute(parseHashRoute(window.location.hash));
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  useEffect(() => {
    if (route.kind !== "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (route.section) {
      requestAnimationFrame(() => {
        document.getElementById(route.section)?.scrollIntoView({
          behavior: "smooth",
        });
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

  if (route.kind === "project") {
    const work = getWorkBySlug(route.slug);

    if (work) {
      return (
        <div className="h-auto bg-[#0a0a0a]">
          <NavBar sections={sections} projectPage />
          <ProjectDetails work={work} />
        </div>
      );
    }
  }

  if (route.kind === "notFound" || route.kind === "project") {
    return (
      <div className="h-auto bg-[#0a0a0a]">
        <NavBar sections={sections} projectPage />
        <section className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
          <h1 className="text-4xl font-bold">Project not found</h1>
          <a href="#Works" className="mt-6 font-code text-pink-400 hover:text-pink-300">
            Back to projects
          </a>
        </section>
      </div>
    );
  }

  return (
    <div className="h-auto bg-[#0a0a0a]">
      <NavBar sections={sections} />
      <AboutSection />
      <WorksSection />
      <ContactsSection />
    </div>
  );
}

export default App;
