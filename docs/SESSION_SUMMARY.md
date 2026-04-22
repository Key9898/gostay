# GoStay Session Summary

Current session progress and context for AI agents.

## Session Info

| Field        | Value                                              |
| ------------ | -------------------------------------------------- |
| Project      | GoStay                                             |
| Created      | 2025-03-30                                         |
| Last Updated | 2026-04-22                                         |
| Status       | Phase 1, 2, 3 Complete · Pre-git audit passed (Prettier ✅ ESLint ✅ TypeScript ✅ Tests 20/20 ✅ Storybook ✅) · Pending Deploy (Railway + Vercel) |

## Project Overview

**GoStay** is a community platform for accommodation listings, roommate finder, and community discussions targeting Myanmar and Thailand markets.

### Key Features

1. **Accommodation Listings** - Browse, search, and post accommodation listings
2. **Roommate Finder** - Find roommates based on preferences
3. **Community Forum** - Discussion platform for expats
4. **Multi-language Support** - Myanmar, English, Thai
5. **Multi-currency Support** - MMK, THB, USD

## Current Progress

### Completed

| Task                                           | Status      | Date       |
| ---------------------------------------------- | ----------- | ---------- |
| Project initialization                         | ✅ Complete | 2025-03-30 |
| PROJECT_PLAN.md creation                       | ✅ Complete | 2025-03-30 |
| Project Rules creation                         | ✅ Complete | 2025-03-30 |
| Change Log + Session Summary creation          | ✅ Complete | 2025-03-30 |
| Install dependencies                           | ✅ Complete | 2025-03-31 |
| Configure Tailwind + DaisyUI                   | ✅ Complete | 2025-03-31 |
| Setup ESLint + Prettier                        | ✅ Complete | 2025-03-31 |
| Configure i18n (en/my/th)                      | ✅ Complete | 2025-03-31 |
| Setup React Router                             | ✅ Complete | 2025-03-31 |
| Create base folder structure                   | ✅ Complete | 2025-03-31 |
| Install 19 AI agent skills                     | ✅ Complete | 2025-04-01 |
| Create Common UI Components (Skeleton, Card)   | ✅ Complete | 2026-04-01 |
| Implement Skeleton Loading in Listings         | ✅ Complete | 2026-04-01 |
| Warm SEA gostay theme (cream + terracotta)     | ✅ Complete | 2026-04-21 |
| Header house SVG + active nav state            | ✅ Complete | 2026-04-21 |
| Footer social icons fix (lucide compatibility) | ✅ Complete | 2026-04-21 |
| Home — hero card chip, pillars grid, stats strip | ✅ Complete | 2026-04-21 |
| Manage — SVG bar chart, KPI cards              | ✅ Complete | 2026-04-21 |
| Community — upvote palette, category pills     | ✅ Complete | 2026-04-21 |
| Kitchen — merchant CTA icon tiles              | ✅ Complete | 2026-04-21 |
| Login / Register — hero gradient               | ✅ Complete | 2026-04-21 |
| Deep scan audit — all pages reviewed           | ✅ Complete | 2026-04-21 |
| Tech stack pivot — Firebase → Node.js/Auth0/MongoDB | ✅ Complete | 2026-04-21 |
| PROJECT_PLAN.md Phase 1/2/3 rewrite            | ✅ Complete | 2026-04-21 |
| project_rules.md backend rules update          | ✅ Complete | 2026-04-21 |
| Node.js API scaffolding (api/ monorepo)        | ✅ Complete | 2026-04-21 |
| Auth0 tenant + SPA/API setup                   | ✅ Complete | 2026-04-21 |
| MongoDB Atlas cluster + Mongoose schemas       | ✅ Complete | 2026-04-21 |
| Cloudinary unsigned preset                     | ✅ Complete | 2026-04-21 |
| Sentry init (frontend + backend)               | ✅ Complete | 2026-04-21 |
| Auth0 frontend SDK + Auth0Provider             | ✅ Complete | 2026-04-21 |
| AuthContext rewrite (Auth0 redirect flow)      | ✅ Complete | 2026-04-21 |
| ProtectedRoute + /profile /manage guards       | ✅ Complete | 2026-04-21 |
| API client + Cloudinary upload service         | ✅ Complete | 2026-04-21 |
| Backend — Posts/Comments/Roommates CRUD        | ✅ Complete | 2026-04-21 |
| Frontend data hooks (useListings/usePosts/useRoommates) | ✅ Complete | 2026-04-21 |
| ImageUpload component (Cloudinary)             | ✅ Complete | 2026-04-21 |
| MapView component (MapLibre)                   | ✅ Complete | 2026-04-21 |
| ErrorBoundary + Sentry reporting               | ✅ Complete | 2026-04-21 |
| Route-level lazy loading (code splitting)      | ✅ Complete | 2026-04-21 |
| Listings / ListingDetail wired to API          | ✅ Complete | 2026-04-21 |
| Community posts wired + voting                 | ✅ Complete | 2026-04-21 |
| Roommate listing wired to API                  | ✅ Complete | 2026-04-21 |
| Profile page wired to Auth0 user               | ✅ Complete | 2026-04-21 |
| ListingForm / PostForm / RoommateForm pages    | ✅ Complete | 2026-04-21 |
| Protected create/edit routes                   | ✅ Complete | 2026-04-21 |
| date-fns dependency installed                  | ✅ Complete | 2026-04-21 |
| Frontend typecheck + lint + build all pass     | ✅ Complete | 2026-04-21 |
| Storybook stories — ErrorBoundary/ImageUpload/MapView/Footer/Header | ✅ Complete | 2026-04-22 |
| Storybook preview.tsx — global Router/Helmet/Settings decorators | ✅ Complete | 2026-04-22 |
| Deep UI/UX + Responsive polish — all pages, all breakpoints       | ✅ Complete | 2026-04-22 |
| Pre-git audit — Prettier/ESLint/TS/Tests/Storybook all clean      | ✅ Complete | 2026-04-22 |

### In Progress

None.

### Pending

| Priority | Task                                   | Phase   |
| -------- | -------------------------------------- | ------- |
| 1        | Railway deployment (backend go-live)   | Phase 1 |
| 2        | Vercel deployment (frontend go-live)   | Phase 1 |
| 3        | Smoke test — Auth0 login + API /me     | Phase 1 |
| 4        | Remaining UI polish                    | Phase 3 |
| 5        | Storybook component docs               | Phase 3 |
| 6        | Accessibility + responsive QA          | Phase 3 |
| 7        | Unit + E2E tests                       | Phase 3 |

## Tech Stack Summary

### Frontend

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- Tailwind CSS 4.1.17
- DaisyUI (`gostay` warm SEA theme)
- Lucide React (icons)
- Framer Motion (animation)
- react-i18next (en/my/th)
- React Router DOM (routing)
- React Hook Form + Zod (forms)
- Sentry (error tracking)
- Vercel (hosting)

### Backend & Services

- Node.js + Express (REST API)
- Auth0 (authentication + social login)
- MongoDB Atlas (database)
- Cloudinary (image upload + CDN)
- Sentry (error tracking)
- mapcn.dev (maps)
- Railway (backend hosting)

## Installed AI Agent Skills

All skills installed to `~\.agents\skills\` and available for Claude Code, Trae, and other agents.

| Skill                        | Source                                 | Purpose                   |
| ---------------------------- | -------------------------------------- | ------------------------- |
| find-skills                  | vercel-labs/skills                     | Discover new skills       |
| vercel-react-best-practices  | vercel-labs/agent-skills               | React/Next.js performance |
| frontend-design              | anthropics/skills                      | UI design patterns        |
| web-design-guidelines        | vercel-labs/agent-skills               | Web interface guidelines  |
| daisyui                      | bobmatnyc/claude-mpm-skills            | DaisyUI components        |
| tailwindcss-advanced-layouts | josiahsiegel/claude-plugin-marketplace | Tailwind layouts          |
| framer-motion-animator       | patricio0312rev/skills                 | Animations                |
| typescript-advanced-types    | wshobson/agents                        | TypeScript patterns       |
| vite                         | antfu/skills                           | Vite configuration        |
| firebase-basics              | firebase/agent-skills                  | Firebase setup            |
| firebase-auth-basics         | firebase/agent-skills                  | Firebase Auth             |
| firebase-data-connect        | firebase/agent-skills                  | Firebase Data Connect     |
| firebase-firestore-standard  | firebase/agent-skills                  | Firestore                 |
| cloudinary                   | vm0-ai/vm0-skills                      | Image management          |
| storybook                    | dalestudy/skills                       | Storybook stories         |
| eslint-prettier-config       | patricio0312rev/skills                 | Linting/formatting        |
| i18n-localization            | sickn33/antigravity-awesome-skills     | Internationalization      |
| readme-i18n                  | xixu-me/skills                         | README translation        |
| mapcn                        | ferminrp/agent-skills                  | MapLibre integration      |

## Project Structure

```
gostay/
├── src/
│   ├── components/
│   │   ├── common/           # To be created
│   │   ├── layout/
│   │   │   ├── Layout/
│   │   │   ├── Header/
│   │   │   └── Footer/
│   │   └── features/         # To be created
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── SettingsContext.tsx
│   │   ├── useAuth.ts
│   │   ├── useSettings.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useToggle.ts
│   │   └── index.ts
│   ├── locales/
│   │   ├── en/translation.json
│   │   ├── my/translation.json
│   │   └── th/translation.json
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Listings.tsx
│   │   ├── ListingDetail.tsx
│   │   ├── Roommate.tsx
│   │   ├── Community.tsx
│   │   ├── Profile.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── NotFound.tsx
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── formatPrice.ts
│   │   ├── formatDate.ts
│   │   ├── helpers.ts
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── i18n.ts
│   ├── router.tsx
│   └── index.css
```

## Important Decisions Made

### 1. Currency Symbols

- MMK → Ks (not K)
- THB → ฿
- USD → $

### 2. Storybook Structure

Story files (`.stories.tsx`) placed inside component folders, not separate directory.

### 3. Backend Stack (decided 2026-04-21)

- **No Firebase** — replaced entirely
- Auth: Auth0 (`@auth0/auth0-react` frontend, JWT middleware backend)
- DB: MongoDB Atlas with Mongoose schemas
- Images: Cloudinary (direct upload from browser, store `public_id` in DB)
- Errors: Sentry on both frontend and backend
- Deploy: Vercel (frontend) + Railway (backend)

### 4. Map Provider

Using mapcn.dev (MapLibre-based) instead of Google Maps.

### 5. Component Architecture

Modular component structure with feature-based organization.

### 6. Context Pattern

Separate hook files (useAuth.ts, useSettings.ts) to avoid react-refresh lint errors.
Auth state will be driven by Auth0's `useAuth0()` hook — `AuthContext` wraps it for app-wide access.

### 7. Design System (Warm SEA — decided 2026-04-21)

- DaisyUI theme `gostay`: cream `#FBF6EE`, terracotta `#C2573A`, forest green `#4A6B57`, saffron `#E8A33D`
- Fonts: Fraunces (`.display`) + Inter (body) + Noto Sans Myanmar/Thai
- Custom classes: `.display`, `.eyebrow`, `.paper`, `.warm-card`, `.rule`

## Next Steps

1. Create `gostay-api` Node.js project and deploy to Railway
2. Configure Auth0 tenant (social connections, API audience, Actions)
3. Connect MongoDB Atlas cluster, write Mongoose models
4. Set up Cloudinary upload preset + Sentry DSN on both projects
5. Implement Auth0 frontend SDK; replace stub `AuthContext` with real auth
6. Build Listings + Community + Roommate API endpoints
7. Apply remaining 20-item UI polish list to frontend pages

## Notes for Next Session

- All project specifications: `PROJECT_PLAN.md`
- All AI agent rules: `.trae/rules/project_rules.md`
- Dev server: http://localhost:5173/
- Frontend builds and lints cleanly
- Backend repo (`gostay-api`) does not exist yet — create as a separate project
- 19 AI agent skills installed at `~\.agents\skills\`
