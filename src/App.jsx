import NavBar from "./AboutPage/NavBar";
import AboutPage from "./AboutPage/AboutPage";
import WorksPage from "./WorksPage/WorksPage";
import ContactsFooter from "./ContactsFooter/ContactsFooter";

function App() {
  const sections = ["About", "Works", "Contacts"];

  return (
    <div className="h-auto bg-[#0a0a0a]">
      <NavBar sections={sections} />
      <AboutPage />
      <WorksPage />
      <ContactsFooter />
    </div>
  );
}

export default App;
