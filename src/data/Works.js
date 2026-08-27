export const Works = [
  {
    slug: "hwproj",
    title: "HwProj",
    summary:
      "Full-stack feature development for a microservice-based homework platform.",
    stack: ["C#", "ASP.NET Core", "React", "TypeScript", "Material UI", "Vite"],
    skills: ["TypeScript", "React", "MaterialUI", "CSharp", "NetCore", "Vite"],
    imageURL: "img/HwProj.png",
    imageAlt: "HwProj homework-management interface",
    features: [
      {
        title: "Secure file submissions",
        points: [
          "Built the UI for attaching files to student submissions and displaying them after publication; included asynchronous handling and a five-file limit.",
          "Added upload/download permission checks plus MIME-type and binary-signature validation that blocks executable ELF, EXE, and Mach-O files.",
        ],
        links: [
          {
            label: "PR #636",
            url: "https://github.com/InteIIigeNET/HwProj-2.0.1/pull/636",
          },
        ],
      },
      {
        title: "Assignments tailored to student groups",
        points: [
          "Added group creation and selection to the homework editor so assignments are visible only to the intended students.",
          "Extended the course visibility model, API/DTOs, service and repository layers, EF Core migrations, and solution statistics UI to reflect group-specific access.",
        ],
        links: [
          {
            label: "PR #663",
            url: "https://github.com/InteIIigeNET/HwProj-2.0.1/pull/663",
          },
        ],
      },
      {
        title: "Developer experience",
        points: [
          "Added VS Code tasks to start the full system, all backend services, the frontend, or an individual service from one menu.",
        ],
        links: [
          {
            label: "PR #667",
            url: "https://github.com/InteIIigeNET/HwProj-2.0.1/pull/667",
          },
        ],
      },
    ],
  },
  {
    slug: "cv",
    title: "Personal CV",
    summary: "A responsive CV website with a direct contact point.",
    stack: ["JavaScript", "React", "Tailwind CSS", "Vite", "Motion"],
    imageURL: "img/name.png",
    imageAlt: "Personal CV website cover",
    source: {
      label: "View code",
      url: "https://github.com/semrosin/cv",
    },
    features: [
      {
        title: "Responsive presentation",
        points: [
          "Built a mobile-aware hero, navigation, project showcase, and adaptive layouts.",
        ],
        links: [],
      },
      {
        title: "A small amount of personality",
        points: [
          "Added typewriter text, animated skill ribbons, subtle Motion transitions, and kitten details.",
        ],
        links: [],
      },
      {
        title: "Clear contact paths",
        points: [
          "Made the downloadable PDF CV, social links, and the existing mail-service contact form easy to reach.",
        ],
        links: [],
      },
    ],
  },
];

export function getWorkBySlug(slug) {
  return Works.find((work) => work.slug === slug);
}
