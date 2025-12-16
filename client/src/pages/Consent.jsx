import { FaArrowLeft } from "react-icons/fa";
import { MAIN_ROUTE } from "../utils/consts";
import useLanguageAwareRoutes from "../hooks/useLanguageAwareRoutes";
import { useTranslation } from "react-i18next";

const ConsentPage = () => {
  const routes = useLanguageAwareRoutes();
  const { t } = useTranslation();
  return (
  <section className="flex flex-col bg-black w-screen min-h-screen">
    <div className="flex text-pink-400 pt-7 items-center px-7">
      <a href={routes.auth}><FaArrowLeft size={20}/></a>
    </div>
    <div className="flex flex-col w-full h-full justify-center mt-9 px-3 md:px-20 lg:px-50 xl:px-145">
      <h1 className="text-4xl mt-0.5 font-sans font-bold text-center text-pink-400">{t("title.consent")}</h1>
      <div className="flex flex-col border w-full h-full rounded-xl my-12 p-8 max-sm:px-5 text-lg gap-4">
        <p>{t("consent.p1")}
        </p>
        <p>
          {t("consent.listname")}
          <ul className="list-disc pl-5">
            <li>{t("consent.list1")}</li>
            <li>{t("consent.list2")}</li>
            <li>{t("consent.list3")}</li>
          </ul>
        </p>
        <p>{t("consent.p2")}</p>
        <p>{t("consent.p3")}</p>
        <p>{t("consent.p4")}</p>
      </div>
    </div>
  </section>
  );
};

export default ConsentPage;
