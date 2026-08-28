export const Works = [
  {
    slug: "hwproj",
    title: "HwProj",
    summary:
      "Full-stack feature development for a microservice-based homework platform.",
    stack: ["React", "TypeScript", "Material UI", "Vite", "C#", "ASP.NET Core"],
    skills: ["TypeScript", "React", "MaterialUI", "CSharp", "NetCore", "Vite"],
    cardImageURL: "img/HwProjCard.png",
    cardImageAlt: "HwProj homework-management interface",
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
            label: "View code",
            url: "https://github.com/InteIIigeNET/HwProj-2.0.1/pull/636",
          },
        ],
        visual: {
          imageURL: "img/HwProj-file-submissions.png",
          imageAlt: "HwProj student submission with attached files",
        },
      },
      {
        title: "Assignments tailored to student groups",
        points: [
          "Added group creation and selection to the homework editor so assignments are visible only to the intended students.",
          "Extended the course visibility model, API/DTOs, service and repository layers, EF Core migrations, and solution statistics UI to reflect group-specific access.",
        ],
        links: [
          {
            label: "View code",
            url: "https://github.com/InteIIigeNET/HwProj-2.0.1/pull/663",
          },
        ],
        visual: {
          imageURL: "img/HwProj-group-assignment.png",
          imageAlt: "HwProj homework editor with selected student groups",
        },
      },
      {
        title: "Developer experience",
        points: [
          "Added VS Code tasks to start the full system, all backend services, the frontend, or an individual service from one menu.",
        ],
        links: [
          {
            label: "View code",
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
    cardImageURL: "img/CVCard.png",
    cardImageAlt: "Personal CV website card",
    imageURL: "img/CV.png",
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
        visual: {
          imageURL: "img/PersonalCV-responsive.png",
          imageAlt: "Personal CV website shown on desktop and mobile",
        },
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
