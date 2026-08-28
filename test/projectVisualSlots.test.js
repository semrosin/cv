import assert from "node:assert/strict";
import test from "node:test";
import { getWorkBySlug } from "../src/data/Works.js";

test("declares only the agreed project screenshot slots", () => {
  const hwproj = getWorkBySlug("hwproj");
  const personalCv = getWorkBySlug("cv");

  assert.deepEqual(
    hwproj.features.map((feature) => feature.visual?.imageURL ?? null),
    [
      "img/HwProj-file-submissions.png",
      "img/HwProj-group-assignment.png",
      null,
    ],
  );
  assert.deepEqual(
    personalCv.features.map((feature) => feature.visual?.imageURL ?? null),
    ["img/PersonalCV-responsive.png", null, null],
  );
});
