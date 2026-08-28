# AGENT.md

## Project overview

This repository is a single-page personal CV website built with React 19, Vite 7, and Tailwind CSS 4. It is an ESM project and is deployed as a static site at `semrosin.ru`.

## Commands

Use npm as the canonical package manager: the lockfile and CI workflow use it.

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

- Run `npm run lint` and `npm run build` after code changes.
- Tests are intentionally absent from this project; do not add them.
- Keep changes compatible with Node.js 22, which is the version used in GitHub Actions.
- Do not commit generated `dist/` output or `node_modules/`.
- `bun.lock` is present, but do not update or introduce lockfiles unless the dependency-management change is intentional.

## Code layout

- `src/main.jsx` mounts the application in `StrictMode`.
- `src/App.jsx` composes the navigation and the `About`, `Works`, and `Contacts` page sections.
- Put page-level UI and state in `src/sections/`.
- Put reusable UI in `src/components/`.
- Keep static portfolio content, skills, and social links in `src/data/` rather than duplicating it in components.
- Keep third-party integrations in `src/utils/`; do not add service configuration to UI components.
- Put images and downloadable files in `public/`. Reference them with the existing root-relative paths, such as `img/...` and `docs/...`.

## Implementation conventions

- Use functional React components. UI modules use `.jsx`; data and utility modules use `.js`.
- Follow the existing relative-import style and preserve explicit file extensions where they are already used.
- Prefer Tailwind utility classes for component styling. Reserve `src/index.css` for global styles, theme tokens, fonts, and shared animations.
- Preserve the current responsive, dark-and-pink visual language unless a redesign is explicitly requested. Reuse `font-sans`, `font-code`, and the custom `ml` breakpoint where appropriate.
- For new animations or timers, follow React lifecycle patterns and clean them up in effects.
- Keep content changes data-driven: add portfolio entries in `src/data/Works.js`, skills in `src/data/Skills.js`, and social URLs in `src/data/MediaUrls.js`.
- Give images meaningful `alt` text. New external links opened in a new tab should include `target="_blank"` and an appropriate `rel` value such as `noreferrer`.

## Deployment and hosting

- `.github/workflows/deploy.yml` builds with `npm ci` and `npm run build`, then deploys on pushes to `main`.
- Do not run `npm run deploy` or alter deployment configuration unless deployment is explicitly requested: it changes external GitHub Pages state.
- Preserve Vite's `base: "/"`, `public/CNAME`, and root-domain URLs in `index.html` when making ordinary site changes. A domain migration must update these together.

## Change discipline

- Keep diffs focused on the requested change and avoid unrelated refactors.
- Inspect existing data, assets, and patterns before adding duplicates.
- Do not expose new credentials, tokens, or private contact data. Treat the EmailJS integration in `src/utils/MailService.js` as the single existing integration point.
