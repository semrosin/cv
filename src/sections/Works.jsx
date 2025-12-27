import ScrollSkills from "../components/ScrollSkills.jsx";
import { MWorkCard } from "../components/WorkCard.jsx";
import { Works } from "../data/Works.js";
import { MediaUrls } from "../data/MediaUrls.js";
import { motion } from "motion/react";

export default function WorksSection({ id = "Works" }) {
  const cardAnimation = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: (custom) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.3 },
    }),
  };
  return (
    <section id={id} className="min-h-[100vh]">
      <ScrollSkills />
      <div className="flex flex-wrap justify-center my-45 mx-10 text-center text-white text-5xl font-sans leading-[1.2]">
        Check out
        <a href={MediaUrls.GitHub} target="_blank">
          <pre className="inline-flex text-5xl text-pink-400 font-sans leading-[1.2]">
            {" my code"}
          </pre>
        </a>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.05, once: true }}
        className="flex flex-wrap content-between justify-center lg:justify-start gap-5 mb-35 lg:mx-[8vw]"
      >
        {Object.values(Works).map((work, index) => (
          <MWorkCard
            custom={index}
            variants={cardAnimation}
            key={work.title}
            work={work}
          />
        ))}
      </motion.div>
    </section>
  );
}
