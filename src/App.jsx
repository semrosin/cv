import NavBar from "./AboutPage/NavBar";
import AboutPage from "./AboutPage/AboutPage";
import WorksPage from "./WorksPage/WorksPage";

function App() {
  const sections = ["About", "Works", "Contacts"];

  return (
    <div className="h-auto bg-[#0a0a0a]">
      <NavBar sections={sections} />
      <AboutPage />
      <WorksPage />
    </div>
  );
}

export default App;
