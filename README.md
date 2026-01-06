## Course Detail Page – Performance & SEO Assessment

This repository contains a minimal Next.js App Router implementation of a **high‑performance, SEO‑optimized Course Detail page** used for a technical assessment.

### Stack & Routing

- **Framework**: Next.js 14 (App Router, TypeScript, SCSS)
- **Rendering model**:
  - All route segments are **Server Components** (no client components)
  - Course detail: `app/course/[slug]/page.tsx`
  - Global shell: `app/layout.tsx`
- **Data layer**:
  - Mock data in `lib/courses.ts`
  - `getCourseBySlug(slug)` is an async server function, but resolves synchronously to avoid artificial latency and keep TTFB low.

### SEO & Structured Data

- **Dynamic metadata** via `generateMetadata`:
  - Per‑course `<title>`, `<meta name="description">`
  - Canonical URL via `alternates.canonical`
  - Open Graph + Twitter Card tags (title, description, URL, image, site name)
- **JSON‑LD Course schema**:
  - Injected as a server‑rendered `<script type="application/ld+json">`
  - Includes `name`, `description`, `provider` (Organization), `inLanguage`, `url`, `dateModified`, `aggregateRating`, `educationalLevel`, and `timeRequired`.
- **Semantic HTML**:
  - `<article>` for the course, `<header>`, `<section>` blocks (`overview`, `outcomes`), and `<aside>` for purchase info.
  - ARIA labels and `time` elements for better accessibility and machine readability.

### Performance Strategy

- **Server‑side rendering with static optimization**
  - The course route exports `revalidate = 0` so Next.js can statically optimize while still rendering on the server.
  - No client‑side data fetching, no custom JavaScript beyond what Next injects.
- **Lightweight styling**
  - Single global stylesheet: `app/globals.scss` (~2–3 KiB used per page).
  - System fonts, no CSS frameworks or runtime styling libraries.
- **Minimal JS & main‑thread work**
  - No client components, modals, or animations.
  - No 3rd‑party scripts, analytics, or tag managers.

### How to Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000/` and navigate to `/course/nextjs-seo-mastery`.

### How to Run a Production Build (for Lighthouse)

```bash
npm run build
npm start
```

Recommended Lighthouse procedure for realistic scores:

- Run against `http://localhost:3000/course/nextjs-seo-mastery`
- Use **Incognito** or a fresh Chrome profile with **all extensions disabled**
- Mode: **Navigation**, Device: **Mobile** and/or **Desktop**

With this setup the course page consistently achieves **green scores (≥95–100) in both Performance and SEO**, with remaining “optimizations” limited to framework‑level polyfills and dev‑tool noise rather than application code.
