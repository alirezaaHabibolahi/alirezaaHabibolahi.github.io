# Alireza Habibollahi — Portfolio

An interactive resume site adapted from the supplied Vite portfolio template using Alireza's CV. It presents his Senior Front-End Engineer and Mid-Level Back-End Developer profile, with experience descriptions copied from the resume.

## Run locally

The npm scripts use Node.js 24 or newer. On this Codex desktop installation, they automatically use its bundled Node 24 even if `npm` starts under Node 18. On another machine, install Node 24 or set `PORTFOLIO_NODE` to its executable path.

```bash
npm install
npm run dev
npm run build
```

The production build is written to `dist/`. Deploy that folder at the root of a static host. Set `VITE_SITE_URL` to the final site URL before a production build to enable an absolute Open Graph image URL and canonical link. For the included GitHub Pages workflow, set the repository variable `SITE_URL` to the final site URL.

## Content

- `src/data/profile.ts` — name, introduction, location and email
- `src/data/experience.ts` — dated work history
- `src/data/projects.ts` — project details and public demo links
- `src/data/skills.ts` and `src/data/system.ts` — front-end and back-end technology maps
- `src/data/socials.ts` — GitHub, LinkedIn and email
- `src/data/thinking.ts` — front-end work process
- `public/alireza_habibollahi_cv.pdf` — downloadable CV

The form opens the visitor's email app; it does not send to a server. Its draft is stored only in the visitor's browser. The site includes a 2D fallback for the interactive 3D technology map and respects reduced-motion preferences.

Source facts and public URLs were taken from the two supplied CVs. Project diagrams summarize the listed tools and features; they are illustrative, not internal system documentation.
