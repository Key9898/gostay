# GoStay Project Rules

All AI agents working on this project must follow these rules.

## Project Overview

**GoStay** is a community platform for accommodation listings, roommate finder, and community discussions targeting Myanmar and Thailand markets.

## Tech Stack

### Frontend

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend Framework | React | 19.2.0 |
| Language | TypeScript | 5.9.3 |
| Build Tool | Vite | 7.2.4 |
| Styling | Tailwind CSS | 4.1.17 |
| UI Components | DaisyUI | gostay theme |
| Icons | Lucide React | Latest |
| Animation | Framer Motion | Latest |
| i18n | react-i18next | Latest |
| Hosting | Vercel | - |

### Backend

| Layer | Technology | Notes |
|-------|------------|-------|
| Runtime | Node.js | Express.js REST API |
| Authentication | Auth0 | Social login + JWT |
| Database | MongoDB | Atlas (cloud) |
| Image Storage | Cloudinary | Upload + CDN |
| Error Tracking | Sentry | Frontend + backend |
| Hosting | Railway | Node.js deployment |

## Code Style Rules

### General

- Use TypeScript strict mode
- No inline CSS - use Tailwind classes only
- All components must be responsive
- Use Lucide icons for all iconography
- No comments in code unless explicitly requested
- Use English for code, variable names, and file names

### File Naming

- Components: PascalCase (e.g., `Button.tsx`, `ListingCard.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useAuth.ts`, `useListings.ts`)
- Utilities: camelCase (e.g., `formatPrice.ts`, `validators.ts`)
- Types: PascalCase (e.g., `Listing.ts`, `User.ts`)

### Component Structure

```
components/
├── common/
│   └── Button/
│       ├── Button.tsx
│       ├── Button.stories.tsx
│       └── index.ts
├── layout/
│   └── Header/
│       ├── Header.tsx
│       ├── Header.stories.tsx
│       └── index.ts
├── features/
│   ├── listings/
│   │   └── ListingCard/
│   │       ├── ListingCard.tsx
│   │       ├── ListingCard.stories.tsx
│   │       └── index.ts
│   └── community/
│       └── PostCard/
│           ├── PostCard.tsx
│           ├── PostCard.stories.tsx
│           └── index.ts
```

### Storybook Rules

- Story files (`.stories.tsx`) must be placed inside each component folder
- NOT in a separate stories directory
- Every component should have a corresponding story file

## Styling Rules

### Tailwind CSS

- Use Tailwind utility classes only
- Use DaisyUI components with nord theme
- Follow mobile-first responsive design
- Use Tailwind's responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`

### DaisyUI Theme

- Primary theme: `gostay` (warm SEA — cream + terracotta palette)
- Theme declared via `@plugin "daisyui/theme"` in `global.css` and `data-theme="gostay"` on `<html>`
- Use DaisyUI semantic colors: `primary` (#C2573A), `secondary` (#4A6B57), `accent` (#E8A33D)
- Use DaisyUI status colors: `info`, `success`, `warning`, `error`
- Custom CSS classes: `.display` (Fraunces serif), `.eyebrow`, `.paper`, `.warm-card`, `.rule`

## Internationalization (i18n)

### Supported Languages

| Language | Code | Locale |
|----------|------|--------|
| Myanmar | my | mm |
| English | en | en |
| Thai | th | th |

### Translation Keys

- Use nested keys for organization: `common.button.submit`, `listings.filter.price`
- Store translations in `src/locales/{lang}/translation.json`

## Currency Support

| Currency | Code | Symbol |
|----------|------|--------|
| Myanmar Kyat | MMK | Ks |
| Thai Baht | THB | ฿ |
| US Dollar | USD | $ |

- Display prices in user's preferred currency
- Store prices in original currency

## Git Workflow

### Branch Naming

- Feature: `feature/description`
- Fix: `fix/description`
- Refactor: `refactor/description`
- Docs: `docs/description`

### Commit Message Format

```
type(scope): description

# Examples:
feat(auth): add login form validation
fix(listings): resolve image upload issue
refactor(common): improve button component
docs(readme): update installation steps
```

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `style`: Styling changes
- `docs`: Documentation
- `test`: Testing
- `chore`: Maintenance

## Backend Setup

### Auth0

- Use `@auth0/auth0-react` on the frontend for login/logout/token
- Backend validates JWT tokens via Auth0 middleware on every protected route
- Social connections (Google, Facebook) configured in Auth0 dashboard
- Use Auth0 Actions for post-login hooks (e.g. sync user to MongoDB)

### MongoDB

- All collections use Mongoose schemas with strict TypeScript types
- Collections: `users`, `listings`, `roommatePosts`, `posts`, `comments`, `reports`, `notifications`, `savedItems`
- Always index fields used in filters: `userId`, `location.city`, `status`, `createdAt`

### Cloudinary

- Direct upload from frontend using unsigned upload preset
- Store only the `public_id` in MongoDB — construct URLs at display time
- Max file size: 5 MB; allowed formats: jpg, jpeg, png, webp

### Sentry

- Initialize `Sentry.init()` in `main.tsx` (frontend) and `app.ts` (backend)
- Wrap Express error handler with `Sentry.Handlers.errorHandler()`
- Use `Sentry.captureException()` for caught errors that should be reported

### Railway

- Backend repository: separate `gostay-api` repo (Node.js + Express)
- Auto-deploy on push to `main`; set environment variables in Railway dashboard
- Health check endpoint: `GET /health` returning `{ status: 'ok' }`

## Image Handling

**Provider:** Cloudinary (setup after project build)

### Constraints

- Max file size: 5MB per image
- Allowed formats: jpg, jpeg, png, webp
- Max images per listing: 10
- Max images per post: 5
- Max avatar: 1

## Map Integration

**Provider:** mapcn.dev (MapLibre-based)

## Testing Requirements

| Type | Tool | Coverage Target |
|------|------|-----------------|
| Unit Tests | Vitest | 80% |
| Integration | Vitest + RTL | Key flows |
| E2E Tests | Playwright | Critical paths |
| Visual Tests | Storybook | All components |

## Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |
| Bundle Size (gzipped) | < 200KB |

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader support
- Color contrast ratio: 4.5:1 minimum

## Commands

After making code changes, run:

```bash
npm run lint        # Check for linting errors
npm run typecheck   # Check for TypeScript errors
npm run build       # Build the project
npm run test        # Run tests (when configured)
```

## File References

All agents must read and follow:

1. `PROJECT_PLAN.md` - Complete project plan and specifications
2. `CHANGELOG.md` - Track all changes made to the project
3. `SESSION_SUMMARY.md` - Current session progress and context

## Agent Responsibilities

### Scope of Changes

**CRITICAL:** All AI agents and IDEs must follow these rules:

- **DO NOT modify** existing UI/UX, Logic, or Functions that are already working correctly
- **Only fix** the specific issue or task you are assigned to
- **Preserve** all existing functionality unless explicitly asked to change it
- **Ask for clarification** if a change might affect existing working code
- **Minimal changes principle:** Make the smallest change necessary to accomplish the task

### Before Making Changes

1. Understand what the code currently does
2. Identify if the code is working as intended
3. Only modify what is necessary for your specific task
4. Do not refactor or "improve" code that is working correctly

### When Making Changes

1. Update `CHANGELOG.md` with what was changed
2. Update `SESSION_SUMMARY.md` with current progress
3. Follow all rules in this file
4. Reference `PROJECT_PLAN.md` for specifications
