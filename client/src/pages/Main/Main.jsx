import NavBar from "../../components/NavBar.jsx";
import AboutSection from "./sections/aboutSection.jsx";
import WorksSection from "./sections/worksSection.jsx";
import Footer from "./sections/footer.jsx";
import { useTranslation } from "react-i18next";

function MainPage() {
    const { t } = useTranslation();
    const sections = {"#About": t("nav.about"), "#Works": t("nav.works"), "#Contacts": t("nav.contacts")};

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
