# Nyandungu Eco Connect

Nyandungu Eco Connect is a Vite + React web app for Nyandungu Eco Park. It gives visitors a QR-powered way to explore park sections, read bilingual content, browse galleries, and leave feedback. It also includes a simple admin area for authentication, QR printing, and local visit summaries.

## Features

- Public landing page introducing the park and its main sections
- QR-linked section pages for:
  - Nyandungu Info
  - Peacock Site
  - Top 10 Sites
  - Trails and Wildlife
- English and Kinyarwanda content support
- Image galleries and rotating highlight carousels
- Visitor feedback form on section pages
- Admin login with Supabase authentication
- Printable QR cards for park signage and visitor sharing

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui and Radix UI
- Supabase Auth
- React Router
- TanStack Query

## Getting Started

### 1. Install dependencies

```bash
npm install
```

If `npm install` stops with a peer dependency resolution error related to `vite` and `@vitejs/plugin-react-swc`, use:

```bash
npm install --legacy-peer-deps
```

### 2. Configure environment variables

Create a `.env` file in the project root with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
```

Only `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are required by the current app code.

### 3. Start the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` creates a production build
- `npm run build:dev` builds using development mode
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint
- `npm run test` runs Vitest once
- `npm run test:watch` runs Vitest in watch mode

## Project Structure

```text
src/
  assets/                  Images and media
  components/              Shared UI and app components
  data/                    Static bilingual section content
  hooks/                   Auth and UI hooks
  integrations/supabase/   Supabase client and generated types
  lib/                     Utilities such as visit tracking
  pages/                   Route-level pages
  test/                    Vitest setup and tests
public/
  robots.txt               Public crawler rules
supabase/
  config.toml              Supabase local config
```

## Current Behavior Notes

- Supabase is currently used for authentication.
- Visit tracking and visitor feedback are currently stored in `localStorage`, not in the database.
- The admin dashboard shows local browser-based stats, so totals are not shared across all devices yet.

## Deployment Notes

Before deploying, make sure:

- the Supabase environment variables are set correctly
- the Vite build completes successfully in your environment
- the admin users exist in Supabase Auth

## License

This repository is private unless you choose to publish it under your own license.
