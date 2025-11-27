import { Skills } from "../data/Skills.js";

export default function WorkCard({ work, className = "" }) {
  return (
    <a
      href={work.url}
      className={`group flex flex-col h-120 min-w-70 w-77 rounded-2xl bg-zinc-900 ${className} hover:shadow-[0_0_18px_var(--color-pink-400)] hover:scale-101 transition-all duration-300 overflow-hidden`}
    >
      <div className="relative w-full overflow-hidden">
        <img
          src={work.imageURL}
          alt={work.title}
          className="w-full object-cover h-60 max-h-60"
        />
        {/* Gradient between and image card */}
        <div className="absolute left-0 right-0 bottom-0 h-16 pointer-events-none bg-gradient-to-b from-transparent to-zinc-900" />
      </div>

      <div className="flex flex-col h-full mx-5">
        <div className="flex justify-center min-h-30 text-xl font-sans font-bold mx-2 items-center text-center">
          {work.title}
        </div>
        <hr className="border-none mx-7 h-[0.2px] bg-pink-400"></hr>
        <div className="flex flex-col h-full max-h-full justify-end mb-5">
          <p className="p-2 text-gray-300 text-sm font-sans">Technologies</p>
          <div className="flex flex-row justify-start">
            {work.skills.map((skill) => (
              <img
                key={skill}
                src={Skills[skill]}
                alt={skill}
                className="flex aspect-square rounded-lg mx-2 w-7"
              />
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}
