import React from "react";
import { MediaUrls } from "../../../data/MediaUrls.js";
import Typed from "typed.js";
import { useTranslation } from "react-i18next";

function AboutSection({ id = "About" }) {
  const { t } = useTranslation();
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Vibe-", "Web-Developer ^400"],
      typeSpeed: 100,
      cursorChar: "",
      loop: true,
      loopCount: Infinity,
      backSpeed: 50,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section
      id={id}
      className="flex flex-nowrap flex-col justify-start w-full md:justify-center md:h-[100vh]"
    >
      <div className="grid grid-cols-10 mx-[5%] lg:mx-[12%]">
        <div className="flex flex-col col-span-10 md:col-span-6 font-sans h-full justify-center">
          <img
            src="img/avatar_circle.png"
            alt="avatar"
            width="50px"
            height="50px"
            className="block md:hidden col-span-2 my-[1em] border-[1px] border-solid border-pink-400 rounded-full"
          />
          <div className="md:col-span-6 font-bold text-3xl md:text-4xl xl:text-6xl ml-[4%] md:ml-0 mt-2">
            <div className="block m-0 font-sans">{t("title.main")}</div>
            <span className="inline-flex align-middle my-[1vh] font-code">
              <h5 className="inline-flex flex-col justify-center whitespace-nowrap mt-1 select-none font-light text-gray-500 text-base lg:text-xl xl:text-3xl">
                $
              </h5>
              <pre> </pre>
              <span
                ref={el}
                className="inline-block whitespace-nowrap font-code font-medium text-pink-400 bg-pink-400 bg-clip-text overflow-hidden"
              ></span>
            </span>
          </div>
          <div className="text-lg md:text-xl lg:text-2xl my-2">
            <p>{t("description.main.1")}</p>
            <p>{t("description.main.2")}</p>
          </div>
        </div>
        <div className="col-span-4 hidden md:flex flex-row items-center justify-center">
          <a
            href={MediaUrls.GitHub}
            target="_blank"
            className="flex aspect-square min-h-60 lg:min-h-75 bg-[url('/img/avatar_square.jpg')] bg-center bg-cover hover:-translate-x-1 hover:-translate-y-1 shadow-[0.5rem_0.5rem_0px_0px_var(--color-pink-400)] hover:shadow-[0.75rem_0.75rem_0px_0px_var(--color-pink-400)]"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
