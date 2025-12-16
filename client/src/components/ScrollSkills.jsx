import { frontSkills, backSkills } from "../data/Skills.js";

export default function ScrollSkills({ className = "" }) {
  return (
    <div className={`my-[4em] ${className}`}>
      <div className="flex w-full py-[1em] overflow-hidden">
        <div className="scroll-track gap-[1em] flex justify-center will-change-transform animate-[scroll_35s_infinite_linear] pr-[1em]">
          {Object.entries(frontSkills).map(([skill, image]) => (
            <img
              key={skill}
              src={image}
              alt={skill}
              className="flex-[0_0_14vw] xl:flex-[0_0_6vw] aspect-square rounded-lg md:rounded-2xl mx-[2vw] w-[14vw] xl:w-[6vw] select-none"
            />
          ))}
        </div>
        <div
          aria-hidden
          className="scroll-track gap-[1em] flex justify-center will-change-transform animate-[scroll_35s_infinite_linear] pr-[1em]"
        >
          {Object.entries(frontSkills).map(([skill, image]) => (
            <img
              key={skill}
              src={image}
              alt={skill}
              className="flex-[0_0_14vw] xl:flex-[0_0_6vw] aspect-square rounded-lg md:rounded-2xl mx-[2vw] w-[14vw] xl:w-[6vw] select-none"
            />
          ))}
        </div>
      </div>
      <div className="flex w-full py-[1em] overflow-hidden">
        <div className="gap-[1em] flex justify-center will-change-transform animate-[scroll_35s_infinite_linear] [animation-direction:reverse] pr-[1em]">
          {Object.entries(backSkills).map(([skill, image]) => (
            <img
              key={skill}
              src={image}
              alt={skill}
              className="flex-[0_0_14vw] xl:flex-[0_0_6vw] aspect-square rounded-lg md:rounded-2xl mx-[2vw] w-[14vw] xl:w-[6vw] select-none"
            />
          ))}
        </div>
        <div
          aria-hidden
          className="gap-[1em] flex justify-center will-change-transform animate-[scroll_35s_infinite_linear] [animation-direction:reverse] pr-[1em]"
        >
          {Object.entries(backSkills).map(([skill, image]) => (
            <img
              key={skill}
              src={image}
              alt={skill}
              className="flex-[0_0_14vw] xl:flex-[0_0_6vw] aspect-square rounded-lg md:rounded-2xl mx-[2vw] w-[14vw] xl:w-[6vw] select-none"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
