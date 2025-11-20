import SocialMedia from "./SocialMedia.jsx";

function AboutPage({ id = "About" }) {
  const mediaUrls = {
    GitHub: "https://github.com/semrosin",
    Telegram: "https://t.me/too_selfish_4u",
    GMail: "https://mail.google.com/mail/?view=cm&to=semen.rosin1@gmail.com",
  };

  const insertText = (steps) => {
    document.documentElement.style.setProperty(
      "--animate-insert-text",
      `blinking-cursor 0.75s step-end infinite, insert-text 5s steps(${steps}) infinite`
    );

    return "animate-insert-text";
  };

  return (
    <section
      id={id}
      className="flex justify-start lg:justify-between lg:h-full my-3"
    >
      <div className="grid grid-cols-10 w-full mx-[5%] md:mx-[12%]">
        <div className="flex flex-col flex-wrap col-span-10 lg:col-span-6 justify-center md:content-center md:mb-14 font-sans">
          <div className="block lg:hidden col-span-2 h-[50px] w-[50px] my-[1em] border-[1px] border-solid border-pink-400 rounded-full bg-[url('/avatar_circle.png')] bg-center bg-cover "></div>
          <div className="lg:col-span-10 text-2xl lg:text-3xl xl:text-4xl ml-[4%] lg:ml-0 mt-2">
            <div className="block m-0">
              <h5>Hi! I'm Semyon Rosin</h5>
            </div>
            <span className="inline-block align-top mt-[1px] lg:mt-0 mr-[0.5em] select-none font-code font-light">
              <h5 className="inline-block whitespace-nowrap text-gray-500 text-base lg:text-xl xl:text-2xl">
                $
              </h5>
            </span>
            <span className="inline-block align-top mt-[3px] font-code">
              <h5
                className={`insert-text inline-block whitespace-nowrap text-pink-400 ${insertText(13)} overflow-hidden`}
              >
                Web Developer
              </h5>
            </span>
          </div>
          <div className="text-xl">
            <p>SE SPbu Student</p>
            <p>Love kittens, anime and front-end</p>
          </div>
          <div className="inline-flex flex-col gap-3 items-start mt-8 w-36">
            <a
              href="/CV.pdf"
              download="CV_Rosin_Semyon.pdf"
              className="inline-flex items-center w-full h-10 justify-center align-middle rounded-sm border-[1px] border-pink-400 hover:shadow-[0_0_18px_var(--color-pink-400)] hover:text-pink-400 transition-shadow duration-300"
            >
              Download CV
            </a>
            <SocialMedia mediaUrls={mediaUrls} className="w-full"/>
          </div>
        </div>
        <div className="col-span-4 hidden lg:flex flex-col mb-14 align-bottom justify-center">
          <div className="flex flex-row justify-end max-h-60">
            <a
              href="https://github.com/semrosin"
              target="_blank"
              className="flex aspect-square max-w-60 min-h-60 bg-[url('/avatar_square.jpg')] bg-center bg-cover hover:-translate-x-1 hover:-translate-y-1 shadow-[0.5rem_0.5rem_0px_0px_var(--color-pink-400)] hover:shadow-[0.75rem_0.75rem_0px_0px_var(--color-pink-400)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
