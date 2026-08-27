# Project Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reliable project detail views to the CV, make the home-page project cards horizontal on large screens, and present evidence-based HwProj work alongside the personal CV.

**Architecture:** A small dependency-free hash-route parser keeps `#/projects/<slug>` links compatible with static GitHub Pages. `App` observes the hash and selects the landing page, a data-driven project detail view, or an unknown-project state. `Works.js` becomes the single source of truth for ordered project content, while `WorkCard` and `ProjectDetails` only render that data.

**Tech Stack:** React 19, JavaScript/JSX, Vite 7, Tailwind CSS 4, Motion, Node.js 22 built-in test runner.

**Spec:** `docs/superpowers/specs/2026-08-27-project-pages-design.md`

## Global Constraints

- Keep the current React, Vite, Tailwind CSS, and Motion stack; do not add a routing dependency.
- Use `#/`, `#/projects/hwproj`, and `#/projects/cv` as the supported home and project URLs.
- Keep public copy in English and use the exact HwProj claims and PR URLs from the specification.
- Reuse `img/HwProj.png` and `img/name.png`; these files are replaced by the user and must be used for both a card and its detail-page hero.
- Preserve the existing dark/zinc/pink palette, Poppins/IBM Plex Mono fonts, Motion entrance animation, and responsive behavior.
- Store exact public technology labels in `work.stack` and separate optional icon lookup keys in `work.skills`. Render `work.stack` as text separated by ` • ` on cards and detail pages; cards never show technology icons, while detail pages may map `work.skills` to existing icon assets.
- On project pages, the navbar's left side contains only `Home` (`href="#/"`) and its existing social controls remain on the right.
- External links opened in a new tab use `target="_blank"` and `rel="noreferrer"`.
- Do not modify, stage, or commit unrelated pre-existing changes, including files below `public/docs/` and `AGENT.md`.
- Use npm as the package manager. Run `npm test`, `npm run lint`, and `npm run build` after code changes.

---

## File structure

| File | Responsibility |
| --- | --- |
| `src/utils/hashRoute.js` | Parse supported location hashes and build an internal project hash URL. |
| `test/hashRoute.test.js` | Regression tests for home, legacy section, project, and invalid hashes. |
| `src/data/Works.js` | Ordered, complete content model for cards and project detail pages. |
| `test/works.test.js` | Data-contract tests for project order, source links, and feature groups. |
| `src/components/WorkCard.jsx` | Accessible internal project link and responsive horizontal card presentation. |
| `src/sections/Works.jsx` | Maps ordered project data into animated cards. |
| `src/sections/ProjectDetails.jsx` | Shared, data-driven project hero, source link, and detailed feature sections. |
| `src/components/NavBar.jsx` | Selects landing-page section links or the project-page-only Home link while preserving social controls. |
| `src/App.jsx` | Observes hash changes, restores legacy section navigation, and selects the active page. |
| `package.json` | Adds the Node test command only. |

### Task 1: Hash-route contract

**Files:**

- Create: `test/hashRoute.test.js`
- Create: `src/utils/hashRoute.js`
- Modify: `package.json`

**Interfaces:**

- Produces `parseHashRoute(hash)`, which returns one of:
  - `{ kind: "home", section: null }` for `""`, `"#"`, and `"#/"`;
  - `{ kind: "home", section: "About" | "Works" | "Contacts" }` for legacy landing-page anchors;
  - `{ kind: "project", slug: string }` for `#/projects/<slug>`;
  - `{ kind: "notFound" }` for every other hash.
- Produces `createProjectHash(slug)`, which returns `#/projects/<encoded slug>`.
- Later consumers: `WorkCard.jsx` calls `createProjectHash`; `App.jsx` calls `parseHashRoute`.

- [ ] **Step 1: Write the failing route tests**

Create `test/hashRoute.test.js` with this exact test surface:

```js
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
```

- [ ] **Step 2: Run the test to confirm it fails before implementation**

Run: `node --test test/hashRoute.test.js`

Expected: the run fails with `ERR_MODULE_NOT_FOUND` because `src/utils/hashRoute.js` does not exist yet.

- [ ] **Step 3: Implement the pure route helpers**

Create `src/utils/hashRoute.js`:

```js
const homeSections = new Set(["About", "Works", "Contacts"]);

export function parseHashRoute(hash = "") {
  const route = hash.startsWith("#") ? hash.slice(1) : hash;

  if (route === "" || route === "/") {
    return { kind: "home", section: null };
  }

  if (homeSections.has(route)) {
    return { kind: "home", section: route };
  }

  const projectMatch = route.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    return { kind: "project", slug: decodeURIComponent(projectMatch[1]) };
  }

  return { kind: "notFound" };
}

export function createProjectHash(slug) {
  return `#/projects/${encodeURIComponent(slug)}`;
}
```

- [ ] **Step 4: Run the focused test to confirm the contract passes**

Run: `node --test test/hashRoute.test.js`

Expected: four passing subtests and no failures.

- [ ] **Step 5: Add the repository-level test command**

Add this script to `package.json` without changing dependency versions:

```json
"test": "node --test"
```

- [ ] **Step 6: Run the new npm command**

Run: `npm test`

Expected: the same four passing route tests.

- [ ] **Step 7: Commit the focused route task**

```bash
git add package.json src/utils/hashRoute.js test/hashRoute.test.js
git commit -m "feat: add hash route helpers"
```

### Task 2: Project content model

**Files:**

- Create: `test/works.test.js`
- Modify: `src/data/Works.js`

**Interfaces:**

- Consumes `Works` from the existing data module.
- Produces `Works`, an ordered array of records with `slug`, `title`, `summary`, public `stack` labels, icon-only `skills` lookup keys, `imageURL`, `imageAlt`, `source`, and `features`.
- Produces `getWorkBySlug(slug)`, which returns a record or `undefined`.
- Later consumers: `Works.jsx`, `WorkCard.jsx`, `ProjectDetails.jsx`, and `App.jsx`.

- [ ] **Step 1: Write the failing portfolio-data test**

Create `test/works.test.js`:

```js
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
```

- [ ] **Step 2: Run the test to confirm it fails before the model change**

Run: `node --test test/works.test.js`

Expected: the import fails because the current module does not export `getWorkBySlug`.

- [ ] **Step 3: Replace the minimal card-only records with the full ordered model**

Rewrite `src/data/Works.js` to export this shape and copy the exact approved public text:

```js
export const Works = [
  {
    slug: "hwproj",
    title: "HwProj",
    summary:
      "Full-stack feature development for a microservice-based homework platform: secure submission files, group-targeted assignments, and a smoother local development workflow.",
    stack: [
      "C#",
      "ASP.NET Core",
      "EF Core",
      "React",
      "TypeScript",
      "Material UI",
      "Vite",
    ],
    skills: ["TypeScript", "React", "MaterialUI", "CSharp", "NetCore", "Vite"],
    imageURL: "img/HwProj.png",
    imageAlt: "HwProj homework-management interface",
    source: {
      label: "View source code",
      url: "https://github.com/InteIIigeNET/HwProj-2.0.1",
    },
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
    summary:
      "A responsive React CV website that turns a traditional document into an interactive portfolio and a direct contact point.",
    stack: ["JavaScript", "React", "Tailwind CSS", "Vite", "Motion"],
    skills: ["JavaScript", "React", "Tailwind", "Vite"],
    imageURL: "img/name.png",
    imageAlt: "Personal CV website cover",
    source: {
      label: "View source code",
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
```

- [ ] **Step 4: Run the focused data test**

Run: `node --test test/works.test.js`

Expected: all five data-contract tests pass.

- [ ] **Step 5: Run all tests together**

Run: `npm test`

Expected: nine passing tests: four route tests and five portfolio-data tests.

- [ ] **Step 6: Commit the data task**

```bash
git add src/data/Works.js test/works.test.js
git commit -m "feat: add detailed project content"
```

### Task 3: Project card and detail-page presentation

**Files:**

- Modify: `src/components/WorkCard.jsx`
- Modify: `src/sections/Works.jsx`
- Create: `src/sections/ProjectDetails.jsx`

**Interfaces:**

- Consumes `work` records from Task 2 and `createProjectHash(slug)` from Task 1.
- Produces `WorkCard({ work })`, an anchor to `#/projects/<slug>`.
- Produces `ProjectDetails({ work })`, the shared project-page renderer.
- Later consumer: `App.jsx` renders `ProjectDetails` for a resolved project route.

- [ ] **Step 1: Run the existing tests as a presentation-change baseline**

Run: `npm test`

Expected: nine passing tests. These data and route contracts must remain green while JSX presentation is added.

- [ ] **Step 2: Convert `WorkCard` into an internal, responsive project link**

Replace the external `work.url` anchor in `src/components/WorkCard.jsx` with an anchor built from `createProjectHash(work.slug)`. Keep text first in the DOM, use `flex-col-reverse lg:flex-row` so mobile shows the cover first, give the desktop text and image containers `lg:w-1/2`, and give the card root `w-full basis-full` to guarantee one card per row.

Use this component structure and labels:

```jsx
<a
  href={createProjectHash(work.slug)}
  title={`Open ${work.title}`}
  className="group flex w-full basis-full flex-col-reverse overflow-hidden rounded-2xl bg-zinc-900 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_18px_var(--color-pink-400)] lg:min-h-105 lg:flex-row"
>
  <div className="flex w-full flex-col justify-between p-6 lg:w-1/2 lg:p-10">
    <div>
      <p className="font-code text-sm text-pink-400">Selected project</p>
      <h3 className="mt-3 text-3xl font-bold lg:text-5xl">{work.title}</h3>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-300 lg:text-lg">
        {work.summary}
      </p>
    </div>
    <div className="mt-8">
      <p className="mb-3 text-sm text-gray-400">Stack</p>
      <p className="font-code text-sm leading-relaxed text-gray-300 lg:text-base">
        {work.stack.join(" • ")}
      </p>
      <p className="mt-8 font-code text-sm text-pink-400">Open project →</p>
    </div>
  </div>
  <div className="relative w-full overflow-hidden lg:w-1/2">
    <img
      src={work.imageURL}
      alt={work.imageAlt}
      loading="lazy"
      className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:h-full"
    />
    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-900/70 via-transparent to-transparent lg:bg-linear-to-l" />
  </div>
</a>
```

Import `createProjectHash`; do not import `Skills` or render an external source link inside this clickable card.

- [ ] **Step 3: Preserve ordered card rendering and reveal animation**

In `src/sections/Works.jsx`, replace `Object.values(Works)` with `Works` so the explicit array order is preserved. Keep `MWorkCard`, `custom`, `variants`, and the current Motion viewport behavior unchanged.

- [ ] **Step 4: Build the shared `ProjectDetails` section**

Create `src/sections/ProjectDetails.jsx`. It must render:

```jsx
<section className="min-h-screen px-[5%] py-12 lg:px-[12%] lg:py-20">
  <a href="#Works" className="font-code text-sm text-pink-400 hover:text-pink-300">
    ← Back to projects
  </a>
  <article className="mt-10">
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="font-code text-sm text-pink-400">Selected project</p>
        <h1 className="mt-3 text-4xl font-bold lg:text-6xl">{work.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-300">{work.summary}</p>
        <p className="mt-8 font-code text-sm leading-relaxed text-gray-300 lg:text-base">
          {work.stack.join(" • ")}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {work.skills.map((skill) => (
            <img
              key={skill}
              src={Skills[skill]}
              alt={skill}
              className="h-9 w-9 rounded-lg"
              loading="lazy"
            />
          ))}
        </div>
        <a
          href={work.source.url}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex rounded-lg border border-pink-400 px-5 py-3 font-medium transition-all hover:bg-pink-400 hover:text-black"
        >
          {work.source.label}
        </a>
      </div>
      <div className="overflow-hidden rounded-2xl bg-zinc-900 shadow-[0_0_25px_rgba(244,114,182,0.18)]">
        <img src={work.imageURL} alt={work.imageAlt} className="h-full w-full object-cover" />
      </div>
    </div>
    <section className="mt-20">
      <p className="font-code text-sm text-pink-400">What I built</p>
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {work.features.map((feature) => (
          <section key={feature.title} className="rounded-2xl bg-zinc-900 p-6">
            <h2 className="text-xl font-bold">{feature.title}</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-gray-300">
              {feature.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            {feature.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {feature.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-code text-sm text-pink-400 hover:text-pink-300"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </section>
  </article>
</section>
```

For each feature, render `feature.title` as a heading, every `feature.points` entry as an `<li>`, and every `feature.links` entry as a visible external anchor with `target="_blank"` and `rel="noreferrer"`. Cards use `bg-zinc-900`, rounded corners, and a pink link treatment so the detailed content belongs to the existing design system.

- [ ] **Step 5: Run static checks after the JSX change**

Run: `npm test && npm run lint && npm run build`

Expected: all nine tests pass, ESLint exits with code 0, and Vite emits `dist/` successfully.

- [ ] **Step 6: Commit the presentation task**

```bash
git add src/components/WorkCard.jsx src/sections/Works.jsx src/sections/ProjectDetails.jsx
git commit -m "feat: add project detail presentation"
```

### Task 4: Application routing and project-page navbar

**Files:**

- Modify: `src/App.jsx`
- Modify: `src/components/NavBar.jsx`

**Interfaces:**

- Consumes `parseHashRoute`, `getWorkBySlug`, and `ProjectDetails`.
- Passes `projectPage={true}` to `NavBar` only for a valid project or unknown-project view.
- Preserves `NavBar` social-media rendering on every route.

- [ ] **Step 1: Run route tests before wiring the browser state**

Run: `node --test test/hashRoute.test.js`

Expected: all four route tests pass; this is the behavior that `App` must consume without duplicating parsing logic.

- [ ] **Step 2: Add route state and home-section restoration to `App.jsx`**

Import `useEffect` and `useState` from React, plus `getWorkBySlug`, `parseHashRoute`, and `ProjectDetails`. Keep the existing `sections` object. Use this route-state pattern:

```jsx
const [route, setRoute] = useState(() => parseHashRoute(window.location.hash));

useEffect(() => {
  const updateRoute = () => setRoute(parseHashRoute(window.location.hash));
  window.addEventListener("hashchange", updateRoute);
  return () => window.removeEventListener("hashchange", updateRoute);
}, []);

useEffect(() => {
  if (route.kind !== "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (route.section) {
    requestAnimationFrame(() => {
      document.getElementById(route.section)?.scrollIntoView({
        behavior: "smooth",
      });
    });
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}, [route]);
```

For `{ kind: "project" }`, look up the slug. When found, render `<NavBar sections={sections} projectPage />` followed by `<ProjectDetails work={work} />`. When the slug is unknown or the route is `{ kind: "notFound" }`, render the same project-page navbar and a semantic full-height not-found section with `Project not found` plus `<a href="#Works">Back to projects</a>`. For the home route, retain the current `AboutSection`, `WorksSection`, and `ContactsSection` composition.

- [ ] **Step 3: Give `NavBar` an explicit project-page mode**

Change the `NavBar` signature to:

```jsx
const NavBar = ({ sections, projectPage = false }) => {
```

Replace the left-side link map with a conditional. The project view must use the exact internal anchor below; the landing view continues mapping the current `sections` object:

```jsx
{projectPage ? (
  <li className="ml-4 md:ml-5">
    <a
      href="#/"
      className="font-medium transition-all duration-150 ease-in-out hover:text-pink-400 md:font-bold"
    >
      Home
    </a>
  </li>
) : (
  Object.entries(sections).map(([name, ref]) => (
    <li key={name} className="ml-4 md:ml-5">
      <a
        href={ref}
        className="font-medium transition-all duration-150 ease-in-out hover:text-pink-400 md:font-bold"
      >
        {name}
      </a>
    </li>
  ))
)}
```

Leave the right-side `<SocialMedia ... />` block unchanged.

- [ ] **Step 4: Run all automated checks**

Run: `npm test && npm run lint && npm run build`

Expected: nine tests pass, lint exits with code 0, and Vite completes a production build.

- [ ] **Step 5: Commit the routing and navbar task**

```bash
git add src/App.jsx src/components/NavBar.jsx
git commit -m "feat: route project pages"
```

### Task 5: Browser-level acceptance and independent review

**Files:**

- Inspect only: `src/App.jsx`, `src/components/NavBar.jsx`, `src/components/WorkCard.jsx`, `src/sections/ProjectDetails.jsx`, `src/data/Works.js`

**Interfaces:**

- Validates the route, content, responsive layout, source links, and navbar requirements delivered by Tasks 1–4.

- [ ] **Step 1: Start the local Vite server**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite prints a local URL such as `http://127.0.0.1:5173/`.

- [ ] **Step 2: Verify the home page and both project URLs**

Use the in-app browser when available to open:

```text
http://127.0.0.1:5173/#/
http://127.0.0.1:5173/#/projects/hwproj
http://127.0.0.1:5173/#/projects/cv
```

Check these exact acceptance conditions:

1. HwProj appears first and Personal CV second on the home page.
2. At desktop width, each card has text on the left and the image on the right; at mobile width, the image precedes the text.
3. Each detail hero uses the same `src` as its matching card.
4. HwProj shows its source link and visible links for PR #636, PR #663, and PR #667.
5. The personal CV page shows a source link to `https://github.com/semrosin/cv`.
6. A project-page navbar shows only `Home` on the left and the social controls on the right.
7. `Home` returns to the landing page; `#About`, `#Works`, and `#Contacts` return to the landing page and scroll to their sections.
8. An unsupported route such as `#/projects/missing` shows the not-found state and its return link works.

If the required in-app browser runtime is unavailable, record that limitation and perform the automated checks in the next step; do not claim browser-level visual verification.

- [ ] **Step 3: Run the final command-level verification**

Run: `npm test && npm run lint && npm run build`

Expected: nine tests pass, ESLint exits with code 0, and Vite writes a production build with no errors.

- [ ] **Step 4: Request independent code review**

Dispatch a fresh reviewer with the base SHA from immediately before Task 1 and the current HEAD SHA. Supply this requirement set: horizontal desktop cards; responsive mobile cards; two hash-routed project pages; data-driven approved copy; source and PR links; project-only Home navbar with social controls preserved; passing test, lint, and build commands.

- [ ] **Step 5: Resolve reviewer findings before handoff**

Fix every critical or important finding, rerun `npm test && npm run lint && npm run build`, and request a follow-up review if any critical or important issue required a change. Commit each correction with a focused `fix:` message that stages only files changed for that correction.
