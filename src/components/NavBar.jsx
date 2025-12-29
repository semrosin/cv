import { MediaUrls } from "../data/MediaUrls.js";
import SocialMedia from "./SocialMedia.jsx";

const NavBar = ({ sections }) => {
  return (
    <div
      className="flex flex-row w-full bg-black gap-3 shadow-[0_-12px_100px_28px_black]"
      id="Navbar"
    >
      <ul className="flex flex-row justify-start items-center w-full text-white my-4 2xl:my-5 font-sans text-mg sm:text-lg xl:text-2xl">
        {Object.entries(sections).map(([name, ref]) => (
          <li key={name} className="ml-3 md:ml-5">
            <a
              href={ref}
              className="font-bold hover:text-pink-400 transition-all duration-150 ease-in-out"
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex">
        <SocialMedia className="self-center mr-6 items-center" />
      </div>
    </div>
  );
};

export default NavBar;
