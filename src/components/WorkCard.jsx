import { forwardRef } from "react";
import { motion } from "motion/react";
import { createProjectHash } from "../utils/hashRoute.js";

export const WorkCard = forwardRef(({ work, className = "" }, ref) => {
  return (
    <a
      ref={ref}
      href={createProjectHash(work.slug)}
      title={`Open ${work.title}`}
      className={`group flex w-full basis-[90%] flex-col-reverse overflow-hidden rounded-2xl bg-zinc-900 transition-all duration-300 hover:scale-[1.002] hover:shadow-[0_0_12px_var(--color-pink-400)] md:flex-row xl:basis-[80%] ${className}`}
    >
      <div className="flex w-full flex-col justify-between p-6 md:w-1/2 md:p-10">
        <div>
          <h3 className="mt-3 mb-6 text-3xl font-bold lg:text-5xl">
            {work.title}
          </h3>
          <p className="font-code font-medium text-md leading-relaxed text-gray-300 xl:text-xl">
            {work.stack.join(" • ")}
          </p>
          <p className="my-5 max-w-xl text-base leading-relaxed text-gray-300 xl:text-xl">
            {work.summary}
          </p>
        </div>
        <p className="mt-8 justify-self-end font-code text-md xl:text-lg text-pink-400">
          Open project →
        </p>
      </div>
      <div className="relative w-full overflow-hidden md:w-1/2">
        <img
          src={work.imageURL}
          alt={work.imageAlt}
          loading="lazy"
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-900/70 via-transparent to-transparent lg:bg-linear-to-l" />
      </div>
    </a>
  );
});

export const MWorkCard = motion.create(WorkCard);
