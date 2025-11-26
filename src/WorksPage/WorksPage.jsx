import ScrollSkills from "./ScrollSkills";
import WorkCard from "./WorkCard";
import { Works } from "../data/Works.js";

export default function WorksPage({ id = "Works" }) {
  return (
    <section id={id} className="min-h-[100vh]">
      <ScrollSkills />
      <div className="flex flex-wrap content-between justify-center lg:justify-start gap-5 mt-25 lg:mx-[8vw]">
        {Object.values(Works).map((work) => (
          <WorkCard key={work.title} work={work} />
        ))}
      </div>
    </section>
  );
}
