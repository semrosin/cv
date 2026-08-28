# Project pages and refreshed portfolio cards — design

## Goal

Turn the portfolio section of the CV into a small, navigable project showcase while preserving the existing dark, pink-accent visual language. The list must show HwProj first and the CV project second. Each card should open a dedicated, shareable project view with the same cover image, concise project metadata, a source-code link, and evidence-based feature descriptions.

## Scope and decisions

- Keep the current React, Vite, Tailwind CSS, and Motion stack. Do not add a routing dependency.
- Use a lightweight hash-route convention so direct links work on static GitHub Pages without server rewrites:
  - home: `#/`
  - HwProj: `#/projects/hwproj`
  - CV: `#/projects/cv`
- Preserve existing `#About`, `#Works`, and `#Contacts` navigation: the application treats these as home routes and scrolls to the matching section.
- Store all project copy, links, stack data, cover-image paths, and feature groups in `src/data/Works.js`. Rendering components must not duplicate portfolio content.
- Keep the public interface in English to match the current CV.

## Visual design

### Project cards

On `lg` screens and wider, cards become one-column, horizontal feature cards. The text block takes the left half and the cover image takes the right half. The text hierarchy is:

1. large project title;
2. compact `Stack` label and technology names separated by `•`;
3. short, outcome-oriented description;
4. a subtle `Open project →` affordance.

Cards retain the zinc background, rounded corners, pink glow, Poppins type, image-gradient treatment, and Motion entrance animation already used on the home page. Hover effects remain restrained: a small lift/glow for the card and a gentle image scale. At smaller widths, the card becomes vertical with the image first and readable text below it.

### Project page

Each page uses a generous two-column hero on desktop: an oversized version of the card's cover image and the same title, stack, and description. The stack may use the existing technology icons on this page only. A back link returns to the Projects section. Below the hero are a primary `View source code` link and clearly separated feature sections with short, scannable bullets. The layout collapses to one column on mobile and respects the existing black/zinc/pink palette.

An unknown project route shows a small not-found state with a link back to the portfolio instead of a blank page.

## Content model

### HwProj

**Card title:** `HwProj`

**Card description:** `Full-stack feature development for a microservice-based homework platform: secure submission files, group-targeted assignments, and a smoother local development workflow.`

**Stack:** `C#`, `ASP.NET Core`, `EF Core`, `React`, `TypeScript`, `Material UI`, `Vite`

**Source code:** `https://github.com/InteIIigeNET/HwProj-2.0.1`

**Page intro:** `Developed end-to-end product features across the React client and ASP.NET Core services, with attention to security, targeted assignment delivery, and team ergonomics.`

**Feature sections:**

1. **Secure file submissions**
   - Built the UI for attaching files to student submissions and displaying them after publication; included asynchronous handling and a five-file limit.
   - Added upload/download permission checks plus MIME-type and binary-signature validation that blocks executable ELF, EXE, and Mach-O files.
   - Evidence: [PR #636](https://github.com/InteIIigeNET/HwProj-2.0.1/pull/636).
2. **Assignments tailored to student groups**
   - Added group creation and selection to the homework editor so assignments are visible only to the intended students.
   - Extended the course visibility model, API/DTOs, service and repository layers, EF Core migrations, and solution statistics UI to reflect group-specific access.
   - Evidence: [PR #663](https://github.com/InteIIigeNET/HwProj-2.0.1/pull/663).
3. **Developer experience**
   - Added VS Code tasks to start the full system, all backend services, the frontend, or an individual service from one menu.
   - Evidence: [PR #667](https://github.com/InteIIigeNET/HwProj-2.0.1/pull/667).

This deliberately avoids unsupported claims such as owning the full microservice architecture or implementing CI/CD.

### Personal CV

**Card title:** `Personal CV`

**Card description:** `A responsive React CV website that turns a traditional document into an interactive portfolio and a direct contact point.`

**Stack:** `JavaScript`, `React`, `Tailwind CSS`, `Vite`, `Motion`

**Source code:** `https://github.com/semrosin/cv`

**Page intro:** `A personal site designed to make a CV easier to explore while keeping the content clear, personal, and quick to reach.`

**Feature sections:**

1. **Responsive presentation** — a mobile-aware hero, navigation, project showcase, and adaptive layouts.
2. **A small amount of personality** — typewriter text, animated skill ribbons, subtle Motion transitions, and the existing kitten details.
3. **Clear contact paths** — downloadable PDF CV, social links, and a contact form integrated through the existing mail service.

## Assets

The same file is used for the card preview and the project-page hero. Keep the existing public asset locations so the preview is not broken before new artwork arrives:

- HwProj cover: replace `public/img/HwProj.png`
- Personal CV cover: replace `public/img/name.png`

Landscape images at 1600×900 pixels or larger will crop well in both the desktop card and page hero. No separate mobile, thumbnail, or gallery assets are required.

## Components and data flow

- `src/data/Works.js`: export an ordered project collection and a lookup-by-slug helper. Each record holds card and detail data.
- `src/App.jsx`: derive the current view from `window.location.hash`, subscribe to `hashchange`, and choose between the landing page, a project page, and the not-found state.
- `src/sections/Works.jsx`: maps the ordered collection and keeps its current reveal animation.
- `src/components/WorkCard.jsx`: becomes an internal link to the project hash route and implements the responsive horizontal/vertical card layout with a text-only, bullet-separated stack.
- `src/sections/ProjectDetails.jsx`: renders the shared project-page structure from a project record.
- `src/components/NavBar.jsx`: remains the shared header. On the landing page it keeps the existing section links; on a project page its left side contains only `Home` (linking to `#/`), while the existing social-media controls remain on the right.

## Accessibility and resilience

- Use semantic anchors for in-app project navigation and external source links.
- Give cover images project-specific `alt` text; source links opened in a new tab use `rel="noreferrer"`.
- Preserve keyboard navigation and visible focus styles inherited from browser defaults/Tailwind utilities.
- Do not render raw PR text or untrusted external HTML.

## Verification

1. Run `npm run lint` and `npm run build` after implementation.
2. Start the Vite app and verify the two project URLs, back navigation, home-section navigation, and responsive card/page behavior. If the in-app browser runtime remains unavailable, report that limitation rather than claiming a visual browser check.
3. Request an independent code-review subagent before handoff and resolve all critical or important findings.
