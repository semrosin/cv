import ScrollSkills from "./ScrollSkills";

export default function WorksPage({ id = "Works" }) {
  return (
    <section id={id} className="h-[100vh]">
      <ScrollSkills />
    </section>
  );
}
