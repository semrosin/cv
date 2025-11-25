import SocialMedia from "./SocialMedia";

function NavBar(props) {
  const sectionRefs = props.sections.map((sectionName) => ({
    sectionRef: `#${sectionName}`,
    sectionName: sectionName,
  }));

  return (
    <div className="flex flex-row position-fixed w-full bg-black" id="Navbar">
      <ul className="flex flex-row justify-start w-full text-white my-3 md:my-4 2xl:my-5 font-sans text-sm md:text-lg xl:text-2xl">
        {sectionRefs.map((ref) => (
          <li key={ref.sectionName} className="ml-3 md:ml-5">
            <a
              href={ref.sectionRef}
              className="font-bold hover:text-pink-400 transition-all duration-150 ease-in-out"
            >
              {ref.sectionName}
            </a>
          </li>
        ))}
      </ul>
      <SocialMedia className="self-center mr-5" />
    </div>
  );
}

export default NavBar;
