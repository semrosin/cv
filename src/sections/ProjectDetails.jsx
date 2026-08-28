import { useState } from "react";

function ProjectImageSlot({ visual }) {
  const [hasImage, setHasImage] = useState(false);

  return (
    <figure className="relative aspect-video overflow-hidden rounded-sm">
      {!hasImage && (
        <figcaption className="absolute inset-0 flex flex-col justify-end bg-linear-to-br from-zinc-900 via-zinc-900 to-pink-950/40 p-6">
          <p className="font-code text-sm text-pink-400">Image slot</p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-400">
            {visual.imageAlt}
          </p>
        </figcaption>
      )}
      <img
        src={visual.imageURL}
        alt={visual.imageAlt}
        loading="lazy"
        onLoad={() => setHasImage(true)}
        onError={() => setHasImage(false)}
        aria-hidden={!hasImage}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          hasImage ? "opacity-100" : "opacity-0"
        }`}
      />
    </figure>
  );
}

export default function ProjectDetails({ work }) {
  return (
    <section className="mb-16 min-h-screen px-[5%] py-12 lg:px-[8vw] lg:py-20">
      <article className="mt-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-bold lg:text-6xl">{work.title}</h1>
            <p className="mt-6 font-code font-bold text-lg leading-relaxed text-gray-300 xl:text-xl">
              {work.stack.join(" • ")}
            </p>
            <p className="mt-8 text-xl leading-relaxed text-gray-300 xl:text-xl">
              {work.summary}
            </p>
            {work.source && (
              <a
                href={work.source.url}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex rounded-lg border border-pink-400 px-5 py-2.5 font-medium transition-all hover:bg-pink-400 hover:text-black"
              >
                {work.source.label}
              </a>
            )}
          </div>
          <div className="overflow-hidden rounded-md md:rounded-xl bg-zinc-900 shadow-[0_0_15px_rgba(244,114,182,0.18)]">
            <img
              src={work.imageURL}
              alt={work.imageAlt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <section className="mt-24">
          <p className="justify-self-center my-12 sm:my-18 font-code font-medium text-xl md:text-2xl lg:text-3xl text-pink-400">
            What I built
          </p>
          <div className="mt-8 divide-y divide-zinc-800">
            {work.features.map((feature, index) => (
              <section
                key={feature.title}
                className="py-12 first:pt-0 lg:py-16"
              >
                <div
                  className={
                    feature.visual
                      ? "grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                      : "max-w-4xl"
                  }
                >
                  <div
                    className={feature.visual && index % 2 ? "lg:order-2" : ""}
                  >
                    <p className="font-code font-medium text-md text-pink-400">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-3 text-3xl font-bold lg:text-4xl">
                      {feature.title}
                    </h2>
                    <ul className="mt-6 list-disc space-y-4 pl-5 text-base leading-relaxed text-gray-300 lg:text-lg">
                      {feature.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    {feature.links.length > 0 && (
                      <div className="mt-7 ml-5 flex flex-wrap gap-4">
                        {feature.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-code font-medium text-md md:text-lg text-pink-400 hover:text-pink-300"
                          >
                            {link.label} →
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  {feature.visual && (
                    <div className={index % 2 ? "lg:order-1" : ""}>
                      <ProjectImageSlot visual={feature.visual} />
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </section>
      </article>
    </section>
  );
}
