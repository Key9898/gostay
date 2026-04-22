# GoStay Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Fixed - 2026-04-22 (Pre-git final audit — Prettier, ESLint, TypeScript, Storybook, tests)

- **Prettier**: auto-formatted 30 files (`npm run format`) — all `src/**/*.{ts,tsx,css}` now pass `format:check`
- **ESLint**: 0 errors · 0 warnings (`npm run lint` EXIT:0)
- **TypeScript**: frontend + API both clean (`npm run typecheck` / `cd api && npm run typecheck` EXIT:0)
- **Tests**: 20/20 pass (`npm test -- --run`)
- **Storybook build**: all 9 stories compile (`npm run build-storybook` — `Storybook build completed successfully`)

### Fixed - 2026-04-22 (Second-pass responsive polish — 0 issues remaining)

#### All remaining issues from deep scan (73+)
- **Login / Register H1**: `text-4xl` → `text-3xl sm:text-4xl`; sub text `text-sm sm:text-base`
- **PostForm / ListingForm / RoommateForm H1**: `text-4xl` → `text-3xl sm:text-4xl`
- **Button component**: `md:btn-md` → `btn-md` (size only applied on md+ before — broken on mobile)
- **Community**: search `min-w-[280px]` → `min-w-0 sm:min-w-[280px]`; post H3 `text-xl` → `text-lg sm:text-xl`
- **Home**: hero card container `h-[460px]` → `h-[340px] sm:h-[420px] md:h-[460px]`; hero image `h-[280px]` → `h-[220px] sm:h-[280px] md:h-[320px]`; featured card image `h-64` → `h-48 sm:h-56 md:h-64`; search button full-width on mobile; all 3 sections `py-20` → `py-12 md:py-20 lg:py-28`; hero `pt-16` → `pt-10 sm:pt-16`; CTA `pb-24` → `pb-14 md:pb-24`
- **Kitchen**: hero card `h-[420px]` → `h-[320px] sm:h-[380px] lg:h-[420px]`; hero image responsive; CTA tiles `grid-cols-3` → `grid-cols-2 sm:grid-cols-3`; CTA section `p-10` → `p-7 sm:p-10 lg:p-16`
- **Header**: mobile menu `max-h-[80vh] overflow-y-auto` (very tall menus no longer clip)
- **Manage**: hero `py-12` → `py-8 md:py-12`; EmptyState `p-12` → `p-8 md:p-12`
- **All pages** — empty states: `py-16` → `py-8 md:py-16` (Community / Kitchen / Listings / Roommate)
- **Roommate**: search `min-w-[280px]` → `min-w-0 sm:min-w-[280px]`
- **ListingDetail**: price display `text-4xl` → `text-3xl sm:text-4xl`
- **Listings**: pre-existing `useMemo` warning fixed — `listings` wrapped in `useMemo`
- **Result**: `npm run lint` 0 errors 0 warnings · `npm run typecheck` clean

### Added - 2026-04-22 (Deep UI/UX & Responsive Polish — all devices)

#### Pages
- **Home**: H1 scale `text-3xl→xl` (4 steps), hero card `w-full sm:w-[85%]`, stats strip `grid-cols-2` on mobile (2×2 tile grid), pillars `grid-cols-1 sm:2 md:3 lg:5`, all section H2s scaled down
- **NotFound**: `text-9xl` → `text-7xl sm:text-9xl` (was overflowing 320px)
- **Listings**: search `min-w-0 sm:min-w-[280px]`, filter panel `grid-cols-1 sm:2 md:4`, map height `h-[280px]→[600px]` 4-step scale, map list image `h-20 w-24 sm:h-24 sm:w-32`, card list-image responsive, page H1 scaled
- **ListingDetail**: H1 `text-2xl sm:3xl md:4xl lg:5xl`, map height `h-52 sm:64 md:72`, sticky sidebar `top-20 lg:top-28`, section H2s scaled
- **ListingForm + RoommateForm**: `sm:grid-cols-N` → `md:grid-cols-N` (was too narrow at 640px)
- **Community**: vote buttons `h-8 w-8` touch target + `px-3` padding, H1/sub scaled
- **Kitchen**: H1 `text-3xl sm:4xl md:5xl lg:6xl`, CTA H2 scaled
- **Profile**: hero section `py-8 md:py-14`, H1 scaled, empty-state `py-8 md:py-16`
- **Manage**: KPI gap `gap-3 md:gap-4`, H1 scaled
- **Roommate**: `truncate` → `line-clamp-2` on card title, H1/sub scaled

#### Components
- **Header**: notifications dropdown `w-[min(20rem,90vw)]`, user menu `w-[min(13rem,90vw)]` — prevents overflow on 320px
- **Footer**: grid `gap-8 md:gap-12`, newsletter input `text-sm`
- **Layout**: skip-link `top-[4.5rem]` (clears sticky header on mobile)
- **Card**: image `h-44 sm:h-56`, title `text-lg sm:text-xl`

#### Global
- `global.css`: iOS Safari zoom prevention — all inputs/textarea/select `font-size: 1rem` on mobile (iOS zooms on `< 16px` focus)
- Lint + typecheck clean (0 errors)

### Added - 2026-04-22 (Storybook coverage expansion)

- `.storybook/preview.tsx` — replaced `preview.ts`; global decorators now include `MemoryRouter` + `HelmetProvider` + `SettingsProvider` + i18n import so any component with router/helmet/i18n/settings deps renders correctly in isolation
- New stories (CSF3, co-located):
  - `ErrorBoundary.stories.tsx` — Healthy / Fallback / CustomFallback
  - `ImageUpload.stories.tsx` — Empty / WithImages / MaxReached (stateful `Demo` wrapper)
  - `MapView.stories.tsx` — Yangon / Bangkok / Empty (480px height decorator)
  - `Footer.stories.tsx` — Default
  - `Header.stories.tsx` — LoggedOut / LoggedIn (via mock `AuthContext.Provider`)
- `storybook build` verified — all 9 stories compile cleanly; lint + typecheck clean

### Added - 2026-04-22 (Storybook runner, Email notifications, Responsive QA)

#### Storybook runner
- Installed `storybook@10`, `@storybook/react-vite`, `@storybook/addon-docs`, `@storybook/addon-a11y`
- `.storybook/main.ts` + `.storybook/preview.ts` (gostay theme, paper background)
- `npm run storybook` / `npm run build-storybook` scripts
- Verified: `storybook build` succeeds with all 4 co-located stories

#### Email notifications (Auth0 Action + backend mailer)
- `api/src/services/mailer.ts` — zero-dep Resend HTTP client (`RESEND_API_KEY` → opt-in)
- `api/src/services/notify.ts` — `createNotification()` helper writes to Mongo + emails user when `emailNotifications !== false`
- `User` model: added `emailNotifications` flag (default `true`)
- Wired into: `POST /api/merchants/:id/orders` (notifies merchant), `POST /api/manage/invoices` (notifies tenant)
- New endpoint: `POST /api/auth/action-sync` — guarded by `X-Action-Token`, upserts user, sends welcome email on first login
- `api/auth0-actions/post-login.js` — Auth0 Post-Login Action script (calls action-sync)
- `api/auth0-actions/README.md` — step-by-step dashboard setup docs

#### Responsive QA
- Added horizontal-scroll wrapper + `min-w-[640px]` to Manage tenants table (narrow-phone fix)
- Scaled down hero H1s on mobile: Community, Manage, Roommate, Login, Register (`text-4xl md:text-5xl`)
- Listings map view: `h-[420px] md:h-[600px]` (was fixed 600px)
- ListingDetail gallery grid: responsive heights `h-[260px] md:h-[360px] lg:h-[460px]`
- ListingForm bedrooms/bathrooms row: `grid-cols-2 sm:grid-cols-3` (was hard `grid-cols-3`)
- ESLint ignore: `storybook-static`, `e2e`

### Added - 2026-04-21 (Phase 2+3 — Features, Quality, Polish)

#### Dev/Prod Split
- `src/services/mocks.ts` — URL-pattern mock layer with canned listings, roommates, posts, merchants, tenants, invoices
- `src/services/api.ts` — intercepts `apiFetch` when `VITE_USE_MOCKS=true`
- `.env.development` (mocks on), `.env.production` (real API)

#### Search & Filter (Listings)
- Backend `listings.controller.ts` — price range (`$gte/$lte`), bedrooms min, text `$or` regex across title/description/address
- `useListings` filters: `bedrooms`, `priceMin`, `priceMax`, `q`
- `Listings.tsx` — collapsible advanced filter panel, keyword search on submit, active filter count, Clear, ARIA attributes

#### Kitchen (Backend + UI)
- Models: `Merchant`, `MenuItem`, `Order`
- Controller + routes at `/api/merchants` (public list/detail, auth POST/PATCH/DELETE, menu, orders)
- `useMerchants({city, cuisine, limit})` hook
- `Kitchen.tsx` — rewritten for live merchants with Cloudinary resolver, loading skeleton, empty state

#### Manage (Backend + UI)
- Models: `Tenant`, `Invoice`, `Maintenance` (owner-scoped)
- Controller + `/api/manage/{tenants,invoices,maintenance}` routes with full CRUD
- `useTenants`, `useInvoices`, `useMaintenance` hooks
- `Manage.tsx` — live KPIs (active tenants, open requests, paid-invoice revenue, unique listings), loading skeletons, empty states

#### Notifications
- Model + controller + routes at `/api/notifications` (list, mark-read, mark-all-read)
- `useNotifications` hook (gated on auth)
- Header bell with unread badge, dropdown list, mark-all action; i18n for en/my/th

#### Accessibility
- Skip-to-main-content link in `Layout`
- Main landmark with `id="main-content"` and `tabIndex={-1}`
- `aria-pressed`, `aria-selected`, `aria-hidden`, `aria-label` across Kitchen, Manage, Listings, Header, ListingDetail

#### Framer Motion
- Page-level `AnimatePresence` transitions in `Layout` keyed by pathname

#### SEO
- `react-helmet-async` installed + `HelmetProvider` in `main.tsx`
- `components/common/SEO` — reusable component with OG, Twitter card, JSON-LD support
- Applied to Home (WebSite schema), Listings, Kitchen, Community, Roommate, ListingDetail (Product schema)
- `public/robots.txt`, `public/sitemap.xml`

#### Testing
- Vitest unit tests for `formatPrice`, `convertCurrency`, `getCurrencySymbol`, `cn`, `truncate`, `slugify`, `capitalize` (20 tests passing)
- Playwright E2E skeleton (`playwright.config.ts`, `e2e/home.spec.ts`, `e2e/listings.spec.ts`) + `test:e2e` npm script

#### Storybook (co-located stories)
- `Button.stories.tsx`, `Card.stories.tsx`, `Skeleton.stories.tsx`, `SEO.stories.tsx` next to their components (CSF3 format)
- `tsconfig.app.json` excludes `*.stories.tsx` and `*.test.*` from app build

### Added - 2026-04-21 (Phase 2 — UI Wiring to Real API)

#### Pages Wired to Live Data
- `src/pages/Listings.tsx` — `useListings({city, limit})` with skeleton → empty-state → card grid, map view, city filter
- `src/pages/ListingDetail.tsx` — `useListing(id)` with Cloudinary image resolver + `MapView` location block
- `src/pages/Community.tsx` — `usePosts({category})` with `formatDistanceToNow`, vote via `/api/posts/:id/vote`
- `src/pages/Roommate.tsx` — `useRoommates({status})` with tab-driven filter, live budget/move-in render
- `src/pages/Profile.tsx` — real Auth0 user data (displayName, email, photoURL) + logout action

#### New Form Pages (Protected)
- `src/pages/ListingForm.tsx` — create/edit listing with ImageUpload, currency picker, Myanmar/Thailand country, amenities
- `src/pages/PostForm.tsx` — community post creation with category pills + isAnonymous toggle
- `src/pages/RoommateForm.tsx` — roommate post creation with budget range, preferences, preferred locations

#### Routing
- `src/router.tsx` — added protected routes: `/listings/create`, `/listings/:id/edit`, `/community/create`, `/roommate/create`
- `src/services/index.ts` — re-exports `MapMarker` type from `MapView`
- `src/components/common/index.ts` — added `ErrorBoundary`, `ImageUpload`, `MapView` barrel exports

#### Dependencies
- Installed `date-fns` for relative timestamp rendering in Community feed

### Added - 2026-04-21 (Phase 2 — Core Features Infrastructure + Phase 3 Foundations)

#### Backend API Expansion
- `api/src/models/Comment.ts` — threaded comment schema (postId, parentId indexes)
- `api/src/controllers/posts.controller.ts` — Posts CRUD + `votePost` (upvote/downvote) + comments endpoints
- `api/src/controllers/roommates.controller.ts` — RoommatePost CRUD
- `api/src/routes/posts.routes.ts` — `/api/posts` with nested `/:id/comments` and `/:id/vote`
- `api/src/routes/roommates.routes.ts` — `/api/roommates` CRUD
- `api/src/app.ts` — mounted new route groups

#### Frontend Data Hooks (data layer)
- `src/hooks/useListings.ts` — `useListings(filters)` + `useListing(id)`
- `src/hooks/usePosts.ts` — `usePosts(filters)` + `useComments(postId)`
- `src/hooks/useRoommates.ts` — `useRoommates(filters)`

#### Reusable Components
- `src/components/common/ImageUpload` — Cloudinary unsigned multi-upload w/ preview, remove, 5MB + format guards, max count enforcement
- `src/components/common/MapView` — MapLibre GL wrapper with markers, default Yangon center, mapcn.dev tile URL via `VITE_MAP_TILES_URL`
- `src/components/common/ErrorBoundary` — React error boundary with Sentry `captureException` + warm-card fallback

#### Phase 3 Foundations
- Route-level code splitting via `React.lazy()` for all pages in `src/router.tsx` (per-page chunks visible in build output)
- Suspense fallback with loading spinner during chunk load
- Top-level `<ErrorBoundary>` wrapping `RouterProvider`
- Installed `maplibre-gl`

### Added - 2026-04-21 (Phase 1 — Auth0 Frontend Integration)

#### Auth0 + Sentry Frontend Wiring
- Installed `@auth0/auth0-react` and `@sentry/react`
- Wrapped app with `<Auth0Provider>` in `src/main.tsx` using `VITE_AUTH0_*` env vars
- Initialized Sentry in `src/main.tsx` (guarded by `VITE_SENTRY_DSN`)
- Rewrote `src/context/AuthContext.tsx` — stub replaced with real Auth0 SDK (`useAuth0`): `login`, `loginWithGoogle`, `register`, `logout`, `getAccessToken`
- Mapped Auth0 user to app `User` type (id, email, displayName, photoURL)

#### Route Guards & Auth Pages
- Added `ProtectedRoute` component (`src/components/auth/ProtectedRoute/`) — redirects unauthenticated users to `/login` with `from` state
- Protected `/profile` and `/manage` routes in `src/router.tsx`
- Rewrote `Login.tsx` and `Register.tsx` to trigger Auth0 Universal Login (redirect flow) — removed local email/password form state

#### API & Upload Services
- Created `src/services/api.ts` — typed `apiFetch<T>` wrapper with Bearer token support
- Created `src/services/cloudinary.ts` — `uploadImage()` (unsigned preset) + `cloudinaryUrl()` helper
- Created `src/hooks/useApi.ts` — hook combining auth token + `apiFetch` for protected API calls

#### Env & Config Cleanup
- Frontend `.env` — removed backend-only keys (PORT, NODE_ENV, CLIENT_URL); added VITE_-prefixed Auth0 keys and `VITE_API_URL`
- ESLint: added `docs/` and `api/` to `globalIgnores` so frontend lint doesn't traverse backend

### Changed - 2026-04-21 (Tech Stack Pivot + UI Design System)

#### Tech Stack Pivot — Firebase → Node.js + Auth0 + MongoDB
- Replaced Firebase (Auth + Firestore + Storage) with a dedicated Node.js/Express backend on Railway
- Authentication migrated from Firebase Auth to **Auth0** (social login, JWT, Auth0 Actions)
- Database migrated from Firestore to **MongoDB** (Atlas) with Mongoose schemas
- Image storage remains **Cloudinary** — now fully configured (no longer deferred)
- Added **Sentry** for error tracking on both frontend (React) and backend (Node.js)
- Frontend deployment stays on **Vercel**; backend deployed on **Railway**
- Updated `PROJECT_PLAN.md` — new Phase 1/2/3 definition, tech stack tables, env vars
- Updated `.trae/rules/project_rules.md` — removed Firebase section, added Auth0/MongoDB/Sentry/Railway rules, updated DaisyUI theme reference to `gostay`

#### UI Design System — Warm SEA Theme
- Replaced DaisyUI `nord` theme with custom `gostay` theme (cream `#FBF6EE` + terracotta `#C2573A`)
- Added `data-theme="gostay"` to `<html>` and `setAttribute` in `main.tsx` for reliable theme activation
- Custom CSS classes: `.display` (Fraunces serif), `.eyebrow`, `.paper`, `.warm-card`, `.rule`
- Fonts: Fraunces (display/serif), Inter (body), Noto Sans Myanmar / Noto Sans Thai
- House SVG glyph added to Header; broken `logo.svg` references removed
- Footer: replaced unavailable `Instagram`/`Facebook` Lucide icons with `Share2`/`Link2`

#### Pages Polish
- `Home.tsx` — hero card chip repositioned inside card, pillars 5-column grid, stats strip with `divide-x`
- `Manage.tsx` — SVG bar chart with y-axis gridlines, module-level data constants
- `Community.tsx` — upvote column warm palette, category pill active/inactive states
- `Kitchen.tsx` — merchant CTA icon tiles with `bg-white/10` circles
- `Roommate.tsx` — segmented tab control active/inactive states
- `Login.tsx` / `Register.tsx` — hero gradient updated to warm dark overlay
- All pages: static data arrays moved to module level (avoid re-creation on render)

### Added - 2026-04-01 (Antigravity)

#### Premium UI Components
- Created `Skeleton` component for elegant loading states
- Created `Button` component with premium interactive effects (hover scale, transitions)
- Created `Card` component with image zoom and built-in skeleton support
- Centralized `cn` utility for robust Tailwind class merging

#### UI/UX Enhancements
- Redesigned `Home.tsx` with hero blobs, animations, and premium feature cards
- Upgraded `Listings.tsx` with initial loading skeletons and view mode (Grid/List) toggle
- Added smooth scale transitions and hover effects across the platform
- Resolved TypeScript lint errors for type-only imports

#### Branding & Assets
- Replaced PNG logo/favicon with professional **SVG** versions (Transparent background)
- Personalized minimalist vector design with combined **GoStay** wordmark and integrated Condo icon
- Adopted Project's current Primary color (Indigo: `#4F46E5`) for brand consistency
- Unified Header design by replacing separate icon/text with the new wordmark logo

### Added - 2025-04-01 (Trae)

#### Skills Installation

Installed 19 AI agent skills for all IDEs and agents (Claude Code, Trae, Codex, Gemini CLI, GitHub Copilot, etc.):

- find-skills (vercel-labs/skills)
- vercel-react-best-practices (vercel-labs/agent-skills)
- frontend-design (anthropics/skills)
- web-design-guidelines (vercel-labs/agent-skills)
- daisyui (bobmatnyc/claude-mpm-skills)
- tailwindcss-advanced-layouts (josiahsiegel/claude-plugin-marketplace)
- framer-motion-animator (patricio0312rev/skills)
- typescript-advanced-types (wshobson/agents)
- vite (antfu/skills)
- firebase-basics (firebase/agent-skills)
- firebase-auth-basics (firebase/agent-skills)
- firebase-data-connect (firebase/agent-skills)
- firebase-firestore-standard (firebase/agent-skills)
- cloudinary (vm0-ai/vm0-skills)
- storybook (dalestudy/skills)
- eslint-prettier-config (patricio0312rev/skills)
- i18n-localization (sickn33/antigravity-awesome-skills)
- readme-i18n (xixu-me/skills)
- mapcn (ferminrp/agent-skills)

Skills installed to: `~\.agents\skills\`

### Added - 2025-03-31 (Trae)

#### Base Project Structure

- Created all page components (Home, Listings, ListingDetail, Roommate, Community, Profile, Login, Register, NotFound)
- Created Layout components (Layout, Header, Footer)
- Created AuthContext with login, register, logout, loginWithGoogle functions
- Created SettingsContext for language and currency with localStorage persistence
- Created TypeScript interfaces for User, Listing, RoommatePost, Post, Comment, SavedItem
- Created utility functions (formatPrice, formatDate, helpers)
- Created custom hooks (useLocalStorage, useMediaQuery, useToggle)
- Configured React Router with all app routes
- Configured i18n with react-i18next for Myanmar, English, Thai
- Created translation files for all three languages
- Updated App.tsx to use router and providers
- Configured TypeScript path aliases for all folders

### Added - 2025-03-30

#### Project Setup

- Initial project structure with Vite + React + TypeScript
- Created comprehensive `PROJECT_PLAN.md` with all specifications
- Created `.trae/rules/project_rules.md` for AI agent guidelines
- Created `CHANGELOG.md` for tracking all project changes
- Created `SESSION_SUMMARY.md` for session progress tracking

#### IDE Compatibility Files

- `.cursorrules` - Rules for Cursor IDE
- `CLAUDE.md` - Rules for Claude AI
- `.github/copilot-instructions.md` - Rules for VSCode Copilot
- `.windsurfrules` - Rules for Windsurf IDE

#### Project Plan Sections Added

- **Routing Structure** - All routes with auth requirements
- **Environment Variables** - Firebase, Cloudinary, Map, App config
- **Currency & Pricing** - MMK (Ks), THB (฿), USD ($) with conversion
- **Map Integration** - mapcn.dev (MapLibre-based)
- **Image Handling** - Cloudinary with compression, thumbnails, constraints
- **State Management Strategy** - React Context + Custom Hooks + URL State
- **Error Handling Strategy** - Error Boundary, Toast, Offline handling
- **Security Rules (Firebase)** - Firestore & Storage rules
- **Analytics & Tracking** - Google Analytics 4 events
- **SEO Strategy** - Meta tags, JSON-LD, Sitemap
- **Git Workflow** - Branch strategy, Commit convention
- **Accessibility Guidelines** - WCAG 2.1 AA compliance
- **Performance Budget** - Core Web Vitals targets
- **Testing Strategy** - Vitest, Storybook, Playwright
- **Firebase Collections** - Collections, Subcollections, Indexes
- **Deployment Process** - Vercel setup, environment variables, branch deployments
- **CI/CD Pipeline** - GitHub Actions workflow, secrets, status badges

#### Tech Stack Decisions

- Frontend: React 19.2.0 + TypeScript 5.9.3 + Vite 7.2.4
- Styling: Tailwind CSS 4.1.17 + DaisyUI (nord theme)
- Icons: Lucide React
- Animation: Framer Motion
- Backend: Firebase (Auth, Firestore, Storage)
- Hosting: Vercel
- Image Storage: Cloudinary (setup after build)
- Maps: mapcn.dev (MapLibre-based)
- i18n: react-i18next (Myanmar, English, Thai)

### Changed

- Updated MMK currency symbol from "K" to "Ks"
- Added URL State for filters/search in State Management
- Added Offline Handling in Error Handling Strategy
- Added Subcollections structure in Firebase Collections
- Added additional indexes for listings and roommatePosts

### Project Structure

```
gostay/
├── .github/
│   └── copilot-instructions.md
├── .trae/
│   └── rules/
│       └── project_rules.md
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.css
│   ├── App.tsx
│   ├── global.css
│   └── main.tsx
├── .cursorrules
├── .gitignore
├── .windsurfrules
├── CHANGELOG.md
├── CLAUDE.md
├── PROJECT_PLAN.md
├── README.md
├── SESSION_SUMMARY.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Change Log Format

When making changes, add entries following this format:

```markdown
### Added - YYYY-MM-DD

- Description of new feature

### Changed - YYYY-MM-DD

- Description of change

### Fixed - YYYY-MM-DD

- Description of bug fix

### Removed - YYYY-MM-DD

- Description of removed feature
```

### Agent Attribution

When an AI agent makes changes, include agent name:

```markdown
### Added - 2025-03-30 (Trae)

- Description of change made by Trae agent
```

---

## Upcoming Tasks

Refer to `PROJECT_PLAN.md` for:

1. Install required dependencies
2. Configure Tailwind + DaisyUI with nord theme
3. Setup ESLint + Prettier
4. Setup Storybook
5. Configure Firebase
6. Setup i18n
7. Create base layout components
