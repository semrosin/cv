import NavBar from "./components/NavBar";
import AboutSection from "./sections/About";
import WorksSection from "./sections/Works";
import ContactsSection from "./sections/Contacts.jsx";

function App() {
  const sections = { About: "#About", Works: "#Works", Contacts: "#Contacts" };

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
