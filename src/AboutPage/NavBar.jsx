function NavBar(props) {
  const sectionRefs = props.sections.map((sectionName) => ({
    sectionRef: `#${sectionName}`,
    sectionName: sectionName,
  }));

  return (
    <div className="flex flex-row position-fixed w-full bg-black" id="navbar">
      <div className="flex flex-row justify-center w-full text-white my-3 md:my-4 2xl:my-5 font-sans text-md md:text-lg xl:text-2xl">
        {sectionRefs?.map((ref) => (
          <span className="mx-[1vw]">
            <a
              href={ref.sectionRef}
              className="border-b border-solid border-pink-400 font-normal hover:border-b-2 hover:font-bold transition-all duration-100 ease-in-out"
            >
              {ref.sectionName}
            </a>
          </span>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
