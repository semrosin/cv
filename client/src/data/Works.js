class Work {
  constructor(id, title, url, skills, imageURL) {
    (this.id = id),
      (this.title = title),
      (this.url = url),
      (this.skills = skills),
      (this.imageURL = imageURL);
  }
}

export const Works = {
  SemesterWorkOne: new Work(
    0,
    "File uploading as student's solutions in HwProj service",
    "https://github.com/InteIIigeNET/HwProj-2.0.1/pull/636",
    ["TypeScript", "React", "MaterialUI", "CSharp", "NetCore"],
    "/img/HwProj.png",
  ),
  CV: new Work(
    1,
    "This CV",
    "",
    ["JavaScript", "React", "Tailwind"],
    "/img/name.png",
  ),
};
