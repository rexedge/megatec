# Megatec

Marketing site for Megatec — fuel dispensers, CNG and LPG systems, and EV charging
infrastructure — built with Next.js (App Router) and Tailwind CSS.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project structure

- `app/` — routes (App Router): landing page, `about`, `products/*`, `services/*`
- `components/` — shared UI (`ui/`) and page sections (`sections/`)
- `lib/` — shared data (nav/product/service lists) and helpers
- `public/images/` — brand assets, landing/marketing images, and product photography
  (`public/images/factory/`, organized by product line)

## Scripts

- `pnpm dev` — start the local dev server
- `pnpm build` — production build
- `pnpm start` — run the production build
- `pnpm lint` — run ESLint
