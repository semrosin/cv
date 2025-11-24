class Work {
  constructor(title, url, skills, imageURL) {
    ((this.title = title),
      (this.url = url),
      (this.skills = skills),
      (this.imageURL = imageURL));
  }
}

export const Works = {
  SemesterWorkOne: new Work(
    "File uploading as student's solutions in HwProj service",
    "https://github.com/InteIIigeNET/HwProj-2.0.1/pull/636",
    ["TypeScript", "React", "MaterialUI", "CSharp", "NetCore"],
    "/IntelligeNET.png"
  ),
  CV: new Work(
    "This CV",
    "",
    ["JavaScript", "React", "Tailwind"],
    "/avatar_square.jpg"
  ),
};
