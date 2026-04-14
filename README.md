# Nyandungu Eco Connect

Nyandungu Eco Connect is a QR-guided visitor web app for Nyandungu Eco Park. Visitors can scan QR codes placed around the park to open section-specific pages with bilingual content, galleries, rules, and feedback prompts. The project also includes a lightweight admin area for login, QR printing, and browser-local visit summaries.

## What This Project Does

- Presents a public landing page for Nyandungu Eco Park
- Provides QR-linked content pages for major park sections
- Supports English and Kinyarwanda content
- Displays image galleries and section highlight carousels
- Lets visitors leave simple feedback on each section page
- Uses Supabase Auth for admin sign-in
- Generates printable QR cards for park signage and sharing

## Current Sections

- `nyandungu-info`: Visitor Guide
- `peacock`: Peacock Sanctuary
- `top-ten`: Top 10 Attractions
- `trails`: Trails and Wildlife

## Current Behavior

The app is already usable as a visitor information site, but some operational features are still lightweight:

- Visitor feedback is stored in browser `localStorage`
- Visit tracking is stored in browser `localStorage`
- Admin dashboard totals are device/browser-specific, not shared globally
- Supabase is currently used for authentication only

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui + Radix UI
- React Router
- TanStack Query
- Supabase Auth
- Vitest
- Playwright

## Project Structure

```text
src/
  assets/                  Images and video used across the site
  components/              Shared app and UI components
  components/ui/           shadcn/ui building blocks
  data/                    Static bilingual content for park sections
  hooks/                   App hooks (auth, SEO, utilities)
  integrations/supabase/   Supabase client and generated types
  lib/                     Utilities such as visit tracking
  pages/                   Route-level pages
  test/                    Vitest setup and example tests

public/
  robots.txt
  og-image.svg

supabase/
  config.toml
```

## Main Routes

- `/` - Landing page
- `/section/:id` - Section detail page opened from QR codes
- `/login` - Admin login/signup page
- `/admin` - Protected admin dashboard

## How the App Works

### Visitor experience

1. A visitor opens the landing page or scans a QR code in the park.
2. The QR code points to a section page such as `/section/peacock`.
3. The section page shows bilingual content, galleries, rules, and a feedback form.
4. The app stores the visit and feedback in the visitor's browser.

### Admin experience

1. An admin signs in using Supabase Auth.
2. The admin opens the dashboard at `/admin`.
3. The dashboard shows local visit counts and printable QR cards for each section.

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
```

Notes:

- `VITE_SUPABASE_URL` is required
- `VITE_SUPABASE_PUBLISHABLE_KEY` is required
- `VITE_SUPABASE_PROJECT_ID` is present in the project docs but is not currently required by the app code

## Getting Started

### 1. Install dependencies

```bash
npm install
```

If you are on Windows PowerShell and `npm` is blocked by script execution policy, use:

```bash
npm.cmd install
```

### 2. Configure environment variables

Add the `.env` file shown above.

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

- `npm run dev` - Start the Vite development server
- `npm run build` - Create a production build
- `npm run build:dev` - Build using development mode
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run Vitest once
- `npm run test:watch` - Run Vitest in watch mode

## Content Model

Section content is defined in `src/data/sections/` and assembled through `src/data/sectionData.ts`.

Each section can include:

- `title`
- `titleKn`
- `image`
- `video`
- `gallery`
- `highlights`
- `rules`

Each highlight can include:

- A title in English and Kinyarwanda
- A description in English and Kinyarwanda
- A single image or a small carousel
- Optional detail rows for structured facts

## QR Code Flow

The admin dashboard and section pages use QR code cards to generate links for each section. These links are based on `window.location.origin`, so the generated QR codes automatically match the current environment:

- local development
- preview environment
- production deployment

## SEO

The project includes a reusable SEO hook that updates:

- document title
- description
- canonical URL
- Open Graph tags
- Twitter card tags
- JSON-LD structured data
- document language

This is used on the landing page, section pages, and admin/login pages.

## Authentication

Authentication is handled with Supabase Auth.

Current implementation:

- Session state is managed in `src/hooks/useAuth.tsx`
- Protected routes rely on whether a user is signed in
- Login and signup are handled from the `/login` page

Important:

- The current admin protection is authentication-based, not role-based
- If you need stricter admin control, add authorization checks before production use

## Testing

The project includes:

- Vitest configuration for unit/integration tests
- Playwright configuration for browser tests

At the moment:

- The existing Vitest coverage is minimal
- There is currently only a simple example unit test
- Playwright is configured, but there are no meaningful end-to-end specs yet

## Deployment Notes

This app is suitable for static frontend deployment with client-side routing, for example on Vercel.

Before deploying, make sure:

- Supabase environment variables are configured in the hosting platform
- The production build completes successfully
- Admin accounts exist in Supabase Auth
- SPA routing is handled correctly by the platform

## Known Limitations

- Feedback is not persisted to a shared backend database
- Visit analytics are local to one browser
- Admin metrics are not true park-wide analytics
- Test coverage is still very limited
- Some lint/test configuration cleanup may still be needed depending on your environment

## Recommended Next Improvements

- Store visits and feedback in Supabase instead of `localStorage`
- Add admin role checks instead of allowing any authenticated user
- Add meaningful Vitest coverage for core pages and hooks
- Add Playwright end-to-end tests for QR flows and login flow
- Optimize large media assets for faster mobile loading

## License

This repository is private unless you choose to publish it under your own license.
