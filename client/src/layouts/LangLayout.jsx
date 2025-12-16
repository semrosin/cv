import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import i18n from "../i18n";

const supportedLangs = ["ru", "en"];

export default function LangLayout() {
  const { lang } = useParams();
  const navigate = useNavigate();
  const [isValidLang, setIsValidLang] = useState(false);

  useEffect(() => {
    const langIsValid = supportedLangs.includes(lang);
    setIsValidLang(langIsValid);

    if (!langIsValid) {
      navigate("/ru", { replace: true });
      return;
    }

    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("lang", lang);
    }
  }, [lang, navigate]);

  if (!isValidLang) {
    return null;
  }

  return <Outlet />;
}
