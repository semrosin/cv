import assert from "node:assert/strict";
import test from "node:test";
import { Works, getWorkBySlug } from "../src/data/Works.js";

test("lists HwProj first and the personal CV second", () => {
  assert.deepEqual(
    Works.map((work) => work.slug),
    ["hwproj", "cv"]
  );
});

test("uses the approved public stack labels", () => {
  assert.deepEqual(getWorkBySlug("hwproj").stack, [
    "C#",
    "ASP.NET Core",
    "EF Core",
    "React",
    "TypeScript",
    "Material UI",
    "Vite",
  ]);
  assert.deepEqual(getWorkBySlug("cv").stack, [
    "JavaScript",
    "React",
    "Tailwind CSS",
    "Vite",
    "Motion",
  ]);
});

test("exposes complete HwProj evidence", () => {
  const hwproj = getWorkBySlug("hwproj");

  assert.equal(hwproj.source.url, "https://github.com/InteIIigeNET/HwProj-2.0.1");
  assert.equal(hwproj.features.length, 3);
  assert.deepEqual(
    hwproj.features.flatMap((feature) => feature.links),
    [
      {
        label: "PR #636",
        url: "https://github.com/InteIIigeNET/HwProj-2.0.1/pull/636",
      },
      {
        label: "PR #663",
        url: "https://github.com/InteIIigeNET/HwProj-2.0.1/pull/663",
      },
      {
        label: "PR #667",
        url: "https://github.com/InteIIigeNET/HwProj-2.0.1/pull/667",
      },
    ]
  );
});

test("returns undefined for an unknown project slug", () => {
  assert.equal(getWorkBySlug("missing"), undefined);
});

test("gives every portfolio entry its own source link and cover", () => {
  for (const work of Works) {
    assert.match(work.source.url, /^https:\/\//);
    assert.match(work.imageURL, /^img\//);
    assert.ok(work.summary.length > 40);
  }
});
