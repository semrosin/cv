import { frontSkills, backSkills } from "../data/Skills.js";

export default function ScrollSkills({ className = "" }) {
  return (
    <div className={`mb-[2em] mt-[4.5em] ${className}`}>
      <div className="flex w-full py-[1em] overflow-hidden">
        <div className="scroll-track min-w-[200%] flex gap-[1em] justify-center will-change-transform animate-[scroll_35s_infinite_linear]  pr-[1em] flex-shrink-0">
          {Object.entries(frontSkills).map(([skill, image]) => (
            <img 
              key={skill} 
              src={image} 
              alt={skill} 
              className="shrink-0 h-[14vw] md:h-[10vw] xl:h-[6vw] aspect-square rounded-lg md:rounded-2xl mx-[2vw] object-cover select-none min-w-0" 
            />
          ))}
          {Object.entries(frontSkills).map(([skill, image]) => (
            <img 
              key={`dup-${skill}`} 
              src={image} 
              alt={skill} 
              className="shrink-0 h-[14vw] md:h-[10vw] xl:h-[6vw] aspect-square rounded-lg md:rounded-2xl mx-[2vw] object-cover select-none min-w-0" 
            />
          ))}
        </div>
      </div>
      <div className="flex w-full py-[1em] overflow-hidden">
        <div className="min-w-[200%] flex gap-[1em] justify-center will-change-transform animate-[scroll-reverse_35s_infinite_linear] pr-[1em] flex-shrink-0">
          {Object.entries(backSkills).map(([skill, image]) => (
            <img 
              key={skill} 
              src={image} 
              alt={skill} 
              className="shrink-0 h-[14vw] md:h-[10vw] xl:h-[6vw] aspect-square rounded-lg md:rounded-2xl mx-[2vw] object-cover select-none min-w-0" 
            />
          ))}
          {Object.entries(backSkills).map(([skill, image]) => (
            <img 
              key={`dup-${skill}`} 
              src={image} 
              alt={skill} 
              className="shrink-0 h-[14vw] md:h-[10vw] xl:h-[6vw] aspect-square rounded-lg md:rounded-2xl mx-[2vw] object-cover select-none min-w-0" 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
