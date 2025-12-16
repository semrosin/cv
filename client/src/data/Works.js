class Work {
  constructor(id, titles, url, skills, imageURL) {
    ((this.id = id),
      (this.titles = titles),
      (this.url = url),
      (this.skills = skills),
      (this.imageURL = imageURL));
  }
}

export const Works = {
  SemesterWorkOne: new Work(
    0,
    {
      en: "File uploading as student's solutions in HwProj service",
      ru: "Механизм загрузки файлов для студентов в сервисе HwProj",
    },
    "https://github.com/InteIIigeNET/HwProj-2.0.1/pull/636",
    ["TypeScript", "React", "MaterialUI", "CSharp", "NetCore"],
    "/img/HwProj.png",
  ),
  CV: new Work(
    1,
    { en: "This CV", ru: "Эта визитка" },
    "https://github.com/semrosin/cv",
    ["JavaScript", "React", "Tailwind"],
    "/img/name.png",
  ),
};
