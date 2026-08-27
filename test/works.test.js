import assert from "node:assert/strict";
import test from "node:test";
import { Works, getWorkBySlug } from "../src/data/Works.js";

test("lists HwProj first and the personal CV second", () => {
  assert.deepEqual(
    Works.map((work) => work.slug),
    ["hwproj", "cv"]
  );
});

test("exposes complete HwProj evidence", () => {
  const hwproj = getWorkBySlug("hwproj");

  assert.equal(hwproj.source.url, "https://github.com/InteIIigeNET/HwProj-2.0.1");
  assert.equal(hwproj.features.length, 3);
  assert.deepEqual(
    hwproj.features.flatMap((feature) => feature.links.map((link) => link.label)),
    ["PR #636", "PR #663", "PR #667"]
  );
});

test("gives every portfolio entry its own source link and cover", () => {
  for (const work of Works) {
    assert.match(work.source.url, /^https:\/\//);
    assert.match(work.imageURL, /^img\//);
    assert.ok(work.summary.length > 40);
  }
});
