import NavBar from "./NavBar/NavBar";
import AboutPage from "./AboutPage/AboutPage";

function App() {
  const sections = ["About", "Works", "Contacts"];

  return (
    <div className="flex flex-col h-[100vh] bg-[#0a0a0a]">
      <NavBar sections={sections} />
      <AboutPage />
    </div>
  );
}

export default App
