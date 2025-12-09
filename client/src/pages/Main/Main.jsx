import NavBar from "../../components/NavBar.jsx";
import AboutSection from "./sections/aboutSection.jsx";
import WorksSection from "./sections/worksSection.jsx";
import Footer from "./sections/footer.jsx";

function MainPage() {
    const sections = ["About", "Works", "Contacts"];

    return (
        <div className="h-auto bg-[#0a0a0a]">
            <NavBar sections={sections} />
            <AboutSection />
            <WorksSection />
            <Footer />
        </div>
    );
}

export default MainPage;
