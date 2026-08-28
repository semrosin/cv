export default function ProjectDetails({ work }) {
  return (
    <section className="min-h-screen px-[5%] py-12 lg:px-[16%] lg:py-20">
      <article className="mt-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-bold lg:text-6xl">{work.title}</h1>
            <p className="mt-6 font-code font-medium text-lg leading-relaxed text-gray-300 xl:text-xl">
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
          <div className="overflow-hidden rounded-2xl bg-zinc-900 shadow-[0_0_15px_rgba(244,114,182,0.18)]">
            <img
              src={work.imageURL}
              alt={work.imageAlt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <section className="mt-20">
          <p className="font-code text-sm text-pink-400">What I built</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {work.features.map((feature) => (
              <section
                key={feature.title}
                className="rounded-2xl bg-zinc-900 p-6"
              >
                <h2 className="text-xl font-bold">{feature.title}</h2>
                <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-gray-300">
                  {feature.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {feature.links.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {feature.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-code text-sm text-pink-400 hover:text-pink-300"
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </section>
      </article>
    </section>
  );
}
