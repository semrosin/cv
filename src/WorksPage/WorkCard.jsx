import { Skills } from "./Skills";

export default function WorkCard({ work, className = "" }) {
  console.log(work);
  return (
    <a
      href={work.url}
      className={`flex flex-col h-120 min-w-70 w-77 rounded-2xl bg-zinc-900 ${className} hover:shadow-[0_0_18px_var(--color-pink-400)] hover:scale-101 transition-all duration-300`}
    >
      <img
        src={work.imageURL}
        alt={work.title}
        className={`flex object-cover min-h-50 w-full rounded-2xl`}
      />

      <div className="flex flex-col h-full mx-5">
        <div className="flex justify-center min-h-30 text-xl font-sans mx-2 mb-3 items-center">
          {work.title}
        </div>
        <hr className="border-none mx-7 h-[0.2px] bg-pink-400"></hr>
        <div className="flex flex-col h-full max-h-40 justify-end mb-5">
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
