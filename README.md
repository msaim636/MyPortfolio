# Saim — Flutter Developer Portfolio

A single-page, no-backend portfolio built with Vite, React, TypeScript, Tailwind CSS and Framer Motion.
Inspired by the visual language of the reference video (bold editorial typography, orange accent,
floating cards) but built as an original identity around Flutter/Dart work.

## Run locally

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Before you publish

Two files still have clearly-marked placeholders — replace them with your real details:

- `src/sections/Contact.tsx` — email + LinkedIn URL
- `src/sections/Footer.tsx` — email + LinkedIn URL

Search for `REPLACE_WITH_YOUR_` to find every spot.

## Adding a new project

You never need to touch `ProjectCard.tsx` or `Projects.tsx`. Just open
`src/data/projects.ts` and add a new object to the `projects` array:

```ts
{
  id: "my-new-app",
  number: "07",
  title: "My New App",
  tagline: "Flutter · Dart · Supabase",
  description: "One or two sentences about what it does and who it's for.",
  technologies: ["Flutter", "Dart", "Supabase"],
  image: "/projects/my-new-app.svg", // drop the image in public/projects/
  category: "Mobile",
  featured: false, // true = large, full-width card at the top of the grid
  links: {
    githubUrl: "https://github.com/you/my-new-app",
    // only include the keys that actually exist — androidApkUrl, playStoreUrl,
    // appStoreUrl, webAppUrl, livePreviewUrl are all optional
  },
},
```

The grid, card, and preview modal all render automatically — buttons only
appear for links you actually provide.

## Replacing placeholder cover art

Each project currently uses a generated abstract SVG cover in `public/projects/`
(no fake screenshots were used). Swap these for real screenshots or short
demo clips whenever you have them — just point `image` (and optionally `video`)
in `projects.ts` at the new file.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, PostCSS
- **3D & Visuals:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations:** Framer Motion
- **Features:** 3D Tech Orbit ecosystem, GPU-accelerated 3D custom cursor, responsive design

## Notes

- Pure frontend client architecture deployed seamlessly on Vercel.
- The 3D Tech Orbit ecosystem showcases Flutter, Dart, and Git with interactive camera tilt and orbital physics.
- The custom 3D clay arrow cursor features zero-latency direct GPU tracking and pinpoint click wave animations.
- Fully responsive across desktop, tablet, and mobile with strict touch device detection.
