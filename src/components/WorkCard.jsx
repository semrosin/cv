import { forwardRef } from "react";
import { motion } from "motion/react";
import { createProjectHash } from "../utils/hashRoute.js";

export const WorkCard = forwardRef(({ work, className = "" }, ref) => {
  return (
    <a
      ref={ref}
      href={createProjectHash(work.slug)}
      title={`Open ${work.title}`}
      className={`group flex w-full basis-full flex-col-reverse overflow-hidden rounded-2xl bg-zinc-900 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_18px_var(--color-pink-400)] lg:min-h-105 lg:flex-row ${className}`}
    >
      <div className="flex w-full flex-col justify-between p-6 lg:w-1/2 lg:p-10">
        <div>
          <p className="font-code text-sm text-pink-400">Selected project</p>
          <h3 className="mt-3 text-3xl font-bold lg:text-5xl">{work.title}</h3>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-300 lg:text-lg">
            {work.summary}
          </p>
        </div>
        <div className="mt-8">
          <p className="mb-3 text-sm text-gray-400">Stack</p>
          <p className="font-code text-sm leading-relaxed text-gray-300 lg:text-base">
            {work.stack.join(" • ")}
          </p>
          <p className="mt-8 font-code text-sm text-pink-400">Open project →</p>
        </div>
      </div>
      <div className="relative w-full overflow-hidden lg:w-1/2">
        <img
          src={work.imageURL}
          alt={work.imageAlt}
          loading="lazy"
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:h-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-900/70 via-transparent to-transparent lg:bg-linear-to-l" />
      </div>
    </a>
  );
});

export const MWorkCard = motion.create(WorkCard);
