# GoStay Project Rules for Claude

## Important Files

Before making any changes, read these files:

1. `docs/PROJECT_PLAN.md` - Complete project plan and specifications
2. `.trae/rules/project_rules.md` - Detailed coding rules and conventions
3. `docs/CHANGELOG.md` - Track all changes made to the project
4. `docs/SESSION_SUMMARY.md` - Current session progress and context

## Project Overview

**GoStay** is a community platform for accommodation listings, roommate finder, and community discussions targeting Myanmar and Thailand markets.

## Project Structure

```
gostay/
├── api/          ← Node.js + Express backend (Railway)
├── src/          ← React frontend (Vercel)
├── docs/         ← PROJECT_PLAN, CHANGELOG, SESSION_SUMMARY, design assets
└── CLAUDE.md
```

## Tech Stack

- **Frontend:** React 19.2.0 + TypeScript + Vite + Tailwind CSS + DaisyUI (`gostay` theme)
- **Backend:** Node.js + Express (in `api/`) → Railway
- **Auth:** Auth0
- **Database:** MongoDB Atlas
- **Images:** Cloudinary
- **Errors:** Sentry
- **Maps:** mapcn.dev

## Code Style

- Use TypeScript strict mode
- No inline CSS - use Tailwind classes only
- All components must be responsive
- Use Lucide icons for all iconography
- No comments in code unless explicitly requested
- Use English for code, variable names, and file names

## Component Structure

Story files (`.stories.tsx`) must be placed inside each component folder:

```
components/
├── common/
│   └── Button/
│       ├── Button.tsx
│       ├── Button.stories.tsx
│       └── index.ts
```

## Git Commits

Format: `type(scope): description`

Types: feat, fix, refactor, style, docs, test, chore

## Scope of Changes

**CRITICAL:** All AI agents and IDEs must follow these rules:

- **DO NOT modify** existing UI/UX, Logic, or Functions that are already working correctly
- **Only fix** the specific issue or task you are assigned to
- **Preserve** all existing functionality unless explicitly asked to change it
- **Ask for clarification** if a change might affect existing working code
- **Minimal changes principle:** Make the smallest change necessary to accomplish the task

## After Making Changes

1. Update `docs/CHANGELOG.md` with what was changed
2. Update `docs/SESSION_SUMMARY.md` with current progress
3. Frontend: `npm run lint` and `npm run typecheck`
4. Backend: `cd api && npm run typecheck`

## Languages & Currencies

- Languages: Myanmar, English, Thai
- Currencies: MMK (Ks), THB (฿), USD ($)
