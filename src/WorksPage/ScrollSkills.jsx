import { Skills } from "./Skills";

export default function ScrollSkills() {
  return (
    <>
      <div className="flex w-full my-[4vh] overflow-hidden">
        <div className="scroll-track gap-[1em] flex justify-center will-change-transform animate-[scroll_35s_infinite_linear] pr-[1em]">
          {Object.entries(Skills.frontSkills).map(([skill, image]) => (
            <img
              key={skill}
              src={image}
              alt={skill}
              className="flex-[0_0_10vw] xl:flex-[0_0_6vw] aspect-square rounded-lg md:rounded-2xl mx-[2vw] w-[10vw] xl:w-[6vw]"
            />
          ))}
        </div>
        <div
          aria-hidden
          className="scroll-track gap-[1em] flex justify-center will-change-transform animate-[scroll_35s_infinite_linear] pr-[1em]"
        >
          {Object.entries(Skills.frontSkills).map(([skill, image]) => (
            <img
              key={skill}
              src={image}
              alt={skill}
              className="flex-[0_0_10vw] xl:flex-[0_0_6vw] aspect-square rounded-lg md:rounded-2xl mx-[2vw] w-[10vw] xl:w-[6vw]"
            />
          ))}
        </div>
      </div>
      <div className="flex w-full my-[4vh] overflow-hidden">
        <div className="gap-[1em] flex justify-center will-change-transform animate-[scroll_35s_infinite_linear] [animation-direction:reverse] pr-[1em]">
          {Object.entries(Skills.backSkills).map(([skill, image]) => (
            <img
              key={skill}
              src={image}
              alt={skill}
              className="flex-[0_0_10vw] xl:flex-[0_0_6vw] aspect-square rounded-lg md:rounded-2xl mx-[2vw] w-[10vw] xl:w-[6vw]"
            />
          ))}
        </div>
        <div
          aria-hidden
          className="gap-[1em] flex justify-center will-change-transform animate-[scroll_35s_infinite_linear] [animation-direction:reverse] pr-[1em]"
        >
          {Object.entries(Skills.backSkills).map(([skill, image]) => (
            <img
              key={skill}
              src={image}
              alt={skill}
              className="flex-[0_0_10vw] xl:flex-[0_0_6vw] aspect-square rounded-lg md:rounded-2xl mx-[2vw] w-[10vw] xl:w-[6vw]"
            />
          ))}
        </div>
      </div>
    </>
  );
}
