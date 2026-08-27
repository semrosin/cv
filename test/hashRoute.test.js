import assert from "node:assert/strict";
import test from "node:test";
import { createProjectHash, parseHashRoute } from "../src/utils/hashRoute.js";

test("parses the home hash", () => {
  assert.deepEqual(parseHashRoute("#/"), { kind: "home", section: null });
  assert.deepEqual(parseHashRoute(""), { kind: "home", section: null });
});

test("keeps the existing landing-page anchors working", () => {
  assert.deepEqual(parseHashRoute("#Works"), {
    kind: "home",
    section: "Works",
  });
});

test("parses a project hash and encodes project links", () => {
  assert.deepEqual(parseHashRoute("#/projects/hwproj"), {
    kind: "project",
    slug: "hwproj",
  });
  assert.equal(createProjectHash("personal cv"), "#/projects/personal%20cv");
});

test("marks unsupported hashes as not found", () => {
  assert.deepEqual(parseHashRoute("#/missing"), { kind: "notFound" });
  assert.deepEqual(parseHashRoute("#/projects/hwproj/extra"), {
    kind: "notFound",
  });
});
