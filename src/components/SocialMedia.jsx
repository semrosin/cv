import { MediaUrls } from "../data/MediaUrls";
import { FaGithub, FaTelegramPlane } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function SocialMedia({ showName = false, className = "" }) {
  return (
    <div
      className={`inline-flex gap-2.5 md:gap-5 justify-between ${className}`}
    >
      <a
        key={"GitHub"}
        href={MediaUrls["GitHub"]}
        target="_blank"
        className={`group items-center inline-flex py-1 ${showName ? "ring-2 hover:ring-pink-400 rounded-full" : ""} bg-transparent ${showName ? "hover:bg-pink-400" : ""} text-white font-medium font-sans text-md ${showName ? "w-full pl-4 h-8 md:h-10" : "h-6 md:h-7 aspect-square"}`}
      >
        <FaGithub
          className={`${showName ? "w-5.5 h-5.5" : "w-full h-full hover:text-pink-400"}`}
        />
        {showName && (
          <span className="inline-block pr-4 pl-3 w-full text-center">
            GitHub
          </span>
        )}
      </a>
      <a
        key={"Telegram"}
        href={MediaUrls["Telegram"]}
        target="_blank"
        className={`group items-center inline-flex py-1 ${showName ? "ring-2 hover:ring-pink-400 rounded-full" : ""} bg-transparent ${showName ? "hover:bg-pink-400" : ""} text-white font-medium font-sans text-md ${showName ? "w-full pl-4 h-8 md:h-10" : "h-6 md:h-7 aspect-square"}`}
      >
        <FaTelegramPlane
          className={`${showName ? "w-5.5 h-5.5" : "w-full h-full hover:text-pink-400"}`}
        />
        {showName && (
          <span className="inline-block pr-4 pl-3 w-full text-center">
            Telegram
          </span>
        )}
      </a>
      <a
        key={"GMail"}
        href={MediaUrls["GMail"]}
        target="_blank"
        className={`group items-center inline-flex py-1 ${showName ? "ring-2 hover:ring-pink-400 rounded-full" : ""} bg-transparent ${showName ? "hover:bg-pink-400" : ""} text-white font-medium font-sans text-md ${showName ? "w-full pl-4 h-8 md:h-10" : "h-6 md:h-7 aspect-square"}`}
      >
        <SiGmail
          className={`${showName ? "w-5.5 h-5.5" : "w-full h-full hover:text-pink-400"}`}
        />
        {showName && (
          <span className="inline-block pr-4 pl-3 w-full text-center">
            Gmail
          </span>
        )}
      </a>
    </div>
  );
}
