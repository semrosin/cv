import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const LangSwitcher = ({ className = "" }) => {
  const navigate = useNavigate();
  const { lang } = useParams();
  const location = useLocation();
  const [currentLang, setCurrentLang] = useState(lang);

  const switchLang = (newLang) => {
    const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`);
    localStorage.setItem("lang", newLang);
    setCurrentLang(newLang);
    navigate(newPath);
  };

  return (
    <div className={`flex ${className} items-center justify-center`}>
      <button onClick={() => switchLang(currentLang == "ru" ? "en" : "ru")} className="border border-gray-400 text-sm md:text-md px-1.5 rounded-lg bg-zinc-900 hover:border-pink-400 hover:text-pink-400 active:border-pink-400 active:text-pink-400">{currentLang == "ru" ? "en" : "ru"}</button>
    </div>
  );
};

export default LangSwitcher;
