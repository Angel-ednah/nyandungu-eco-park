# Nyandungu Eco Connect

Nyandungu Eco Connect is a public visitor web app for Nyandungu Eco Park. Visitors can scan QR codes placed around the park to open bilingual section pages with stories, rules, galleries, and practical visit information.

This codebase now focuses only on the visitor-facing experience. Previous admin traffic tracking and Supabase authentication features have been removed in favor of using Google Analytics for visitor insights.

## Features

- Public landing page for Nyandungu Eco Park
- QR-linked section pages for key park areas
- English and Kinyarwanda content
- Image galleries and rotating highlight cards
- Visitor feedback form on section pages
- Printable and shareable QR cards on section pages
- SEO metadata and structured data for public pages

## Park Sections

- `/nyandungu-info` - Nyandungu Info
- `peacock` - Peacock Sanctuary
- `top-ten` - Top 10 Attractions
- `trails` - Trails and Wildlife

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui and Radix UI
- React Router
- Vitest
- Playwright

## Project Structure

```text
src/
  assets/                  Images and media
  components/              Shared UI and app components
  components/ui/           shadcn/ui building blocks
  data/                    Static bilingual content
  hooks/                   Reusable hooks such as SEO and UI helpers
  lib/                     Utility helpers
  pages/                   Route-level pages
  test/                    Test setup and sample tests

public/
  robots.txt
  og-image.svg
```

## Routes

- `/` - Home page
- `/nyandungu-info` - Nyandungu Info page
- `/peacock` - Peacock Sanctuary page
- `/top-ten` - Top 10 Attractions page
- `/trails` - Trails and Wildlife page

## Getting Started

### 1. Install dependencies

```bash
npm install
```

If Windows PowerShell blocks `npm`, use:

```bash
npm.cmd install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Configure feedback email

Create a Formspree form for `niyigabamartial@gmail.com` at https://formspree.io/. In the Formspree dashboard, open the form's Integration section and copy the endpoint URL. Then create a `.env` file from `.env.example` and paste the endpoint:

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

The feedback form posts to Formspree, which forwards visitor messages to the email address connected to that form.

QR scan notifications use this Formspree endpoint by default. When someone opens a QR link, the app sends an email notification with the section, QR sign ID, scanned page, scan time, referrer, browser/device string, language, and timezone.

```bash
VITE_QR_SCAN_EMAIL_NOTIFICATIONS=true
```

Set `VITE_QR_SCAN_EMAIL_NOTIFICATIONS=false` if scan notification emails become too noisy.

If QR scan emails should go to a different Formspree form than visitor feedback, create a second Formspree form and add its endpoint:

```bash
VITE_QR_SCAN_FORMSPREE_ENDPOINT=https://formspree.io/f/your-scan-form-id
```

To send QR scan emails to the normal form and an extra email address, create another Formspree form for the extra email address and add it here:

```bash
VITE_QR_SCAN_EXTRA_FORMSPREE_ENDPOINTS=https://formspree.io/f/extra-form-id
```

You can add more than one extra scan endpoint by separating them with commas.

To send QR scan emails to two people from the same Formspree form instead, invite the second email under **Account > Team** and make sure the invitation is accepted. Then add Formspree notification rules for the form: create one **Always** email rule for each verified recipient. Formspree's rules feature is the dashboard place that controls multiple email recipients.

### 4. Configure analytics

Create a Google Analytics 4 property for the website, then open the web data stream and copy the Measurement ID. Google says this ID starts with `G-`. Add it to `.env`:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

If you also use Google Tag Manager, create a GTM web container and add its container ID:

```bash
VITE_GTM_ID=GTM-XXXXXXX
```

QR codes include tracking parameters such as `utm_source=qr`, `section=top-ten`, and `qr_id=park_sign_top-ten`. When a visitor opens a QR link, the app sends a `qr_scan` event to Google Analytics with the section ID, QR sign ID, source, campaign, and page path. It also sends an email notification through Formspree when `VITE_QR_SCAN_EMAIL_NOTIFICATIONS` is enabled. If `VITE_QR_SCAN_FORMSPREE_ENDPOINT` is set, QR scan notifications use that endpoint; otherwise they use `VITE_FORMSPREE_ENDPOINT`. Any endpoints in `VITE_QR_SCAN_EXTRA_FORMSPREE_ENDPOINTS` also receive the same scan notification. If `VITE_GTM_ID` is set, the same event is pushed into the GTM data layer.

For testing, add `debug_analytics=1` to a QR URL and watch **Admin > DebugView** in Google Analytics. Example:

```text
https://nyandungu-eco-park.vercel.app/top-ten?utm_source=qr&utm_medium=park_sign&utm_campaign=section_qr&section=top-ten&qr_id=park_sign_top-ten&debug_analytics=1
```

In Google Analytics, check:

- **Reports > Realtime** to see current visitors and QR scans
- **Reports > Engagement > Events** to see `qr_scan`
- **Reports > Acquisition > Traffic acquisition** to see `utm_source=qr`

Analytics shows anonymous visitor data such as page, time, device, city/country, traffic source, section, and QR sign ID. It does not show the real person's name unless they submit feedback or identify themselves.

### 5. Build for production

```bash
npm run build
```

### 6. Preview the production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start the Vite dev server
- `npm run build` - Create a production build
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview the built app locally
- `npm run lint` - Run ESLint
- `npm run test` - Run Vitest once
- `npm run test:watch` - Run Vitest in watch mode

## Content Model

Section content is assembled from files in `src/data/sections/` and exported through `src/data/sectionData.ts`.

Each section can include:

- `title`
- `titleKn`
- `image`
- `video`
- `gallery`
- `highlights`
- `rules`

Each highlight can include:

- English and Kinyarwanda titles
- English and Kinyarwanda descriptions
- A single image or multiple carousel images
- Optional detail rows for facts or context

## QR Experience

Each section page includes a QR card that:

- builds the public section URL from `window.location.origin`
- adds QR tracking parameters for analytics
- renders a QR code for that section
- supports link copying
- supports print-friendly output

This keeps the QR output aligned with whichever environment is currently running: local, preview, or production.

## SEO

The app includes a reusable SEO hook that manages:

- page title
- meta description
- canonical URL
- Open Graph tags
- Twitter card tags
- JSON-LD structured data
- document language

## Analytics

The app supports Google Analytics 4 through `VITE_GA_MEASUREMENT_ID`.

Tracked activity includes:

- page views for every route
- QR scan events when a QR-tagged URL is opened
- section IDs for QR traffic, such as `top-ten`, `trails`, `peacock`, and `nyandungu-info`

## Testing

The repo includes:

- Vitest for unit-style testing
- Playwright for browser testing

Current note:

- test coverage is still minimal and should be expanded as the app evolves

## Deployment Notes

This app is suitable for static frontend deployment with client-side routing, such as Vercel.

Before deploying, make sure:

- the production build completes successfully
- SPA routing is handled correctly by the host
- `VITE_FORMSPREE_ENDPOINT` is configured in the deployment environment
- `VITE_GA_MEASUREMENT_ID` is configured in the deployment environment

## Recommended Next Steps

- add meaningful tests for the public QR flows
- optimize large image and video assets for mobile visitors
- decide whether visitor feedback should move from Formspree to a shared backend later

## License

This repository is private unless you choose to publish it under your own license.
