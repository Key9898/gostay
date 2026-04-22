# Handoff: GoStay Warm SEA Redesign + 2 New Features

## Overview
This handoff applies a full redesign to the existing **GoStay** codebase — a React 19 + TypeScript + Vite + Tailwind v4 + DaisyUI app for accommodation listings, roommate finding, and community discussions across Myanmar and Thailand.

The redesign:
1. Introduces a **Warm SEA-inspired aesthetic** (terracotta + cream, Fraunces serif display + Inter body).
2. Redesigns every existing page (Home, Listings, Listing Detail, Roommate, Community, Profile, Login, Register).
3. Adds **two new feature areas** with full page scaffolds:
   - **Property / Rental Management** (`/manage`) — owner dashboard, tenants, invoices, maintenance.
   - **Neighborhood Kitchen** (`/kitchen`) — local home-cooked food, QR ordering, merchant flow.
4. Updates translations (EN, MY, TH) for all new strings.

## About the Design Files
The files in this bundle (`pages/*.tsx`, `components/**/*.tsx`, `global.css`, `index.html`, `locales/**/*.json`, `router.tsx`) are **production-ready React + TypeScript source files** written to drop directly into the existing GoStay project. They are NOT HTML design references — they use the project's existing tooling:

- Tailwind v4 utility classes (via `@tailwindcss/vite`)
- DaisyUI components (already in the project; the redesign shifts to custom tokens defined in `global.css`)
- `react-router-dom` v7 with path aliases `@components/*`, `@pages/*`, `@context/*`, etc.
- `react-i18next` for translations — all strings route through `t('...')`
- `framer-motion` already installed (not added as new dep)
- `lucide-react` icons (already installed)

The files match the existing project's path alias conventions and file structure exactly. Place them at the indicated paths, and the app should compile with `npm run typecheck` and run with `npm run dev`.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, and layouts are final. The developer (or Claude Code) should place the files as specified — no re-implementation needed beyond resolving any local drift (custom code additions in the original files that should be preserved).

## File Placement

Copy each file from this bundle to the specified path in the existing `gostay/` repo:

| Source (this bundle) | Destination (in `gostay/`) | Action |
|---|---|---|
| `index.html` | `index.html` | **Replace** |
| `global.css` | `src/global.css` | **Replace** |
| `router.tsx` | `src/router.tsx` | **Replace** (adds 2 new routes) |
| `components/layout/Header/Header.tsx` | `src/components/layout/Header/Header.tsx` | **Replace** |
| `components/layout/Footer/Footer.tsx` | `src/components/layout/Footer/Footer.tsx` | **Replace** |
| `components/common/Card/Card.tsx` | `src/components/common/Card/Card.tsx` | **Replace** |
| `pages/Home.tsx` | `src/pages/Home.tsx` | **Replace** |
| `pages/Listings.tsx` | `src/pages/Listings.tsx` | **Replace** |
| `pages/ListingDetail.tsx` | `src/pages/ListingDetail.tsx` | **Replace** |
| `pages/Roommate.tsx` | `src/pages/Roommate.tsx` | **Replace** |
| `pages/Community.tsx` | `src/pages/Community.tsx` | **Replace** |
| `pages/Profile.tsx` | `src/pages/Profile.tsx` | **Replace** |
| `pages/Login.tsx` | `src/pages/Login.tsx` | **Replace** |
| `pages/Register.tsx` | `src/pages/Register.tsx` | **Replace** |
| `pages/Manage.tsx` | `src/pages/Manage.tsx` | **NEW file** |
| `pages/Kitchen.tsx` | `src/pages/Kitchen.tsx` | **NEW file** |
| `pages/index.ts` | `src/pages/index.ts` | **Replace** (adds Manage + Kitchen exports) |
| `locales/en/translation.json` | `src/locales/en/translation.json` | **Replace** |
| `locales/my/translation.json` | `src/locales/my/translation.json` | **Replace** |
| `locales/th/translation.json` | `src/locales/th/translation.json` | **Replace** |

## Post-Copy Steps

```bash
cd gostay
git add -A && git commit -m "pre-redesign snapshot"   # safety snapshot
# apply the files per table above
npm install                                            # no new deps, but safe to run
npm run typecheck
npm run lint:fix
npm run dev
```

No new dependencies are introduced. All imports use packages already in `package.json` (`react`, `react-router-dom`, `react-i18next`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`).

## Design Tokens

Defined in `src/global.css` as CSS custom properties on `:root`:

### Colors — Warm Editorial palette
| Token | Hex | Use |
|---|---|---|
| `--color-cream` | `#FBF6EE` | Default page background |
| `--color-cream-deep` | `#F4E9D8` | Section band background |
| `--color-ink` | `#1F1A17` | Primary text |
| `--color-ink-soft` | `#5C5149` | Secondary text |
| `--color-terracotta` | `#C2573A` | Primary CTA, accent |
| `--color-terracotta-deep` | `#9E4328` | Hover state for primary |
| `--color-saffron` | `#E8A33D` | Highlight, star ratings |
| `--color-jade` | `#4A6B57` | Success, verified badges |
| `--color-dusk` | `#7E5B8A` | Secondary accent (community tag) |
| `--color-line` | `#E8DDC9` | Borders, dividers |
| `--color-card` | `#FFFFFF` | Card surface |

### Typography
- **Display / headings**: `'Fraunces', 'Noto Serif Myanmar', serif`
- **Body / UI**: `'Inter', 'Noto Sans Myanmar', 'Noto Sans Thai', system-ui, sans-serif`
- Heading scale uses `clamp()` for fluid sizing: `h1: clamp(2.25rem, 5vw, 4rem)`, `h2: clamp(1.75rem, 3.5vw, 2.75rem)`.

Fonts are loaded via `<link>` in `index.html` from Google Fonts (Fraunces, Inter, Noto Sans Myanmar, Noto Sans Thai, Noto Serif Myanmar). The `index.html` already includes `preconnect` hints.

### Spacing & radius
- Tailwind v4 defaults used throughout.
- Card radius: `rounded-2xl` (1rem) for content cards, `rounded-full` for pills/chips.
- Section vertical padding: `py-20 md:py-28`.

### Shadows
- Soft card: `shadow-[0_1px_2px_rgba(31,26,23,0.04),0_8px_24px_-8px_rgba(31,26,23,0.08)]`
- Elevated (hover/focus): `shadow-[0_2px_4px_rgba(31,26,23,0.06),0_20px_40px_-12px_rgba(31,26,23,0.15)]`

## Screens

### 1. Home (`/`)
Editorial landing page. Sections in order:
1. **Hero** — cream background, large serif headline with "warm" highlighted in terracotta italic; dual search input (location + type); stats strip; verified badge chip.
2. **Pillars** — 5-card grid (Stay, Roommate, Kitchen, Manage, Community). Each card is an anchor link to its route.
3. **Featured listings** — horizontal scroll of 6 listing cards.
4. **Neighborhood Kitchen CTA** — full-bleed banner with warm tone, "Browse kitchens" and "Become a merchant" buttons.
5. **Final CTA** — sign-up prompt.

### 2. Listings (`/listings`)
Browse grid. Layout: 2-col (sidebar filter 300px + results). Filters: city, price range, bed count. Grid toggles: Grid / List / Map (map is a placeholder). Each card shows photo, price, city, beds/baths/area, verified badge.

### 3. ListingDetail (`/listings/:id`)
Hero gallery (5-image masonry). Title + price + location. Tabs: Overview, Amenities, Reviews. Right rail: contact owner card (sticky). Map placeholder at bottom.

### 4. Roommate (`/roommate`)
Split layout: left = compatibility quiz CTA card; right = grid of roommate posts with profile photo, budget, move-in date, tags.

### 5. Community (`/community`)
Reddit-meets-Airbnb feed. Left sidebar: categories (General, Market, Tips, Q&A). Center: post list with upvote column, title, preview, comment count. Right sidebar: Trending + Community Guidelines card.

### 6. Profile (`/profile`)
Profile header with avatar + stats strip (Listings / Posts / Saved / Rating). Tabs: My Posts, My Listings, Saved, Settings.

### 7. Login (`/login`) + Register (`/register`)
Editorial split — left column: warm hero image/gradient with quote; right column: form. Google OAuth button on top.

### 8. Manage (`/manage`) — **NEW**
Owner dashboard:
- KPI row: Properties, Occupied tenants, Monthly revenue, Open maintenance requests.
- Left column: Revenue chart (bar/line, SVG placeholder) + Upcoming invoices list.
- Right column: Tenants table (name, unit, rent, status, tenant since).
- Tabs: Overview / Tenants / Invoices / Maintenance.
- "Add property" CTA in header.

### 9. Kitchen (`/kitchen`) — **NEW**
Food-delivery style layout:
- Hero: "Dinner tonight, from a kitchen nearby" + delivery address input + search.
- Chip row: QR Scan in Lobby · Delivery · Pickup.
- Category chips: All / Breakfast / Curry / Noodles / Snacks / Thai / Vegetarian.
- Grid of dish cards (photo, dish name, kitchen name, price, pickup/delivery badge).
- Merchant CTA section: "Turn your kitchen into income" with steps.
- Sub-route `/kitchen/merchant` reuses Kitchen page (merchant-facing layout). Can be split later.

### 10. NotFound (`/*`)
Existing file — not modified.

## Translations

All three locale files (`en`, `my`, `th`) are fully updated. Keys are grouped by feature:
- `common.*` — shared utilities (loading, save, cancel, etc.)
- `nav.*` — header/footer navigation
- `auth.*` — login/register
- `home.*`, `listings.*`, `roommate.*`, `community.*`, `profile.*`
- `manage.*` — NEW, all property-management strings
- `kitchen.*` — NEW, all neighborhood-kitchen strings
- `footer.*`, `currency.*`, `language.*`

Every user-visible string in the new pages calls `t('namespace.key')`. No hard-coded English text in the page bodies.

## State Management

No global state changes. All new pages use local `useState` for UI state (active tab, filters, search input). Manage and Kitchen pages currently render seeded mock data inline — replace with Firebase queries using the existing `AuthContext` / service pattern when wiring up.

## Assets

- **Fonts**: Google Fonts (Fraunces, Inter, Noto Sans Myanmar, Noto Sans Thai, Noto Serif Myanmar). Loaded in `index.html`.
- **Icons**: `lucide-react` (already installed). Icons used: `Search`, `MapPin`, `Star`, `Heart`, `Home`, `Users`, `MessageSquare`, `ChefHat`, `Building2`, `Wrench`, `Bell`, `QrCode`, etc.
- **Imagery**: All listing/dish photos use Unsplash CDN URLs (hotlink-safe). The `src` values are inline in each page. Replace with Firebase Storage URLs when production data is wired.
- **Logo**: Uses text wordmark "GoStay" in Fraunces; no logo SVG shipped. Existing `public/favicon/favicon.svg` kept.

## Interactions & Behavior

- **Routing**: `react-router-dom` v7 `<Link>` for all nav. Two new routes added: `/manage`, `/kitchen` (and nested `/kitchen/merchant`).
- **Language switch**: Unchanged — still uses `i18next.changeLanguage()` via existing `SettingsContext`.
- **Animations**: Subtle `framer-motion` fades on Hero section only. All other sections use CSS transitions on hover (`transition-colors`, `transition-shadow`).
- **Forms**: `react-hook-form` + `zod` pattern retained in Login/Register (validation schemas inline). Manage and Kitchen pages are display-only (no forms yet).
- **Responsive**: Desktop-first. Breakpoints used: `md:` (768px) and `lg:` (1024px). Mobile collapses grids to single column and hides sidebars.

## Known Follow-ups (not in this bundle)

- `Manage.tsx` and `Kitchen.tsx` render mock data. Wire to Firebase Firestore collections (`properties`, `tenants`, `invoices`, `maintenance`, `kitchens`, `dishes`, `orders`).
- `/kitchen/merchant` currently aliases to `Kitchen.tsx`. Split into a dedicated `KitchenMerchant.tsx` when the merchant flow is ready.
- Map view on `/listings` is a placeholder div. Wire to `react-leaflet` or `@vis.gl/react-google-maps`.
- Existing `NotFound.tsx`, `AuthContext`, `SettingsContext`, `Button`, `Skeleton`, `Layout`, and utility files are **not** modified.

## Files in This Bundle

```
handoff/
├── README.md                                   (this file)
├── index.html                                  (fonts + meta)
├── global.css                                  (tokens + base styles)
├── router.tsx                                  (+ /manage, /kitchen routes)
├── components/
│   ├── common/
│   │   └── Card/Card.tsx
│   └── layout/
│       ├── Header/Header.tsx
│       └── Footer/Footer.tsx
├── pages/
│   ├── index.ts
│   ├── Home.tsx
│   ├── Listings.tsx
│   ├── ListingDetail.tsx
│   ├── Roommate.tsx
│   ├── Community.tsx
│   ├── Profile.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Manage.tsx                              (NEW)
│   └── Kitchen.tsx                             (NEW)
└── locales/
    ├── en/translation.json
    ├── my/translation.json
    └── th/translation.json
```

## One-line Prompt for Claude Code

> "Read `README.md` in this folder and apply every file in the bundle to the target paths listed in the File Placement table. Then run `npm run typecheck` and fix any import or type errors. Do not modify files outside the listed destinations."
