import ScrollSkills from "../../../components/ScrollSkills.jsx";
import { WorkCard } from "../../../components/WorkCard.jsx";
import { Works } from "../../../data/Works.js";
import { MediaUrls } from "../../../data/MediaUrls.js";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function WorksSection({ id = "Works" }) {
  const { t } = useTranslation();
  const { lang } = useParams();

  return (
    <section id={id} className="min-h-[100vh]">
      <ScrollSkills />
      <div className="flex flex-wrap justify-center my-45 mx-10 text-center text-white text-5xl font-sans leading-[1.2]">
        {t("title.works.pre")}
        <a href={MediaUrls.GitHub} target="_blank">
          <pre className="inline-flex text-5xl text-pink-400 font-sans leading-[1.2]">
            {t("title.works.link")}
          </pre>
        </a>
      </div>
      <div
        className="flex flex-wrap content-between justify-center lg:justify-start gap-5 mb-35 lg:mx-[8vw]"
      >
        {Object.values(Works).map((work, index) => (
          <WorkCard
            key={index}
            work={work}
          />
        ))}
      </div>
    </section>
  );
}
