# GoStay - Project Plan

## Project Overview

**GoStay** is a community platform for accommodation listings, roommate finder, and community discussions targeting Myanmar and Thailand markets.

---

## Tech Stack

### Frontend

| Layer              | Technology    | Version    |
| ------------------ | ------------- | ---------- |
| Frontend Framework | React         | 19.2.0     |
| Language           | TypeScript    | 5.9.3      |
| Build Tool         | Vite          | 7.2.4      |
| Styling            | Tailwind CSS  | 4.1.17     |
| UI Components      | DaisyUI       | gostay theme |
| Icons              | Lucide React  | Latest     |
| Animation          | Framer Motion | Latest     |
| i18n               | react-i18next | Latest     |
| Forms              | React Hook Form + Zod | Latest |
| Hosting            | Vercel        | -          |

### Backend

| Layer          | Technology  | Notes                         |
| -------------- | ----------- | ----------------------------- |
| Runtime        | Node.js     | Express.js REST API           |
| Authentication | Auth0       | Social login + JWT            |
| Database       | MongoDB     | Atlas (cloud) or self-hosted  |
| Image Storage  | Cloudinary  | Upload, transform, CDN serve  |
| Error Tracking | Sentry      | Frontend + backend monitoring |
| Hosting        | Railway     | Node.js API deployment        |
| Maps           | mapcn.dev   | MapLibre-based map tiles      |

---

## Project Structure

```
gostay/
├── public/
│   ├── favicon.ico
│   └── images/
│
├── src/
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/                    # Modular Components
│   │   ├── common/                    # Shared UI Components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Card/
│   │   │   ├── Dropdown/
│   │   │   └── ...
│   │   │
│   │   ├── layout/                    # Layout Components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   └── MainLayout/
│   │   │
│   │   ├── auth/                      # Authentication Components
│   │   │   ├── LoginForm/
│   │   │   ├── RegisterForm/
│   │   │   ├── GoogleLoginButton/
│   │   │   └── ForgotPassword/
│   │   │
│   │   ├── listings/                  # Accommodation Listings
│   │   │   ├── ListingCard/
│   │   │   ├── ListingGrid/
│   │   │   ├── ListingDetail/
│   │   │   ├── ListingForm/
│   │   │   ├── ListingFilter/
│   │   │   ├── ImageGallery/
│   │   │   └── MapView/
│   │   │
│   │   ├── roommate/                  # Roommate Finder
│   │   │   ├── RoommateCard/
│   │   │   ├── RoommateProfile/
│   │   │   ├── RoommateForm/
│   │   │   ├── RoommateFilter/
│   │   │   └── MatchingList/
│   │   │
│   │   ├── community/                 # Community/Forum
│   │   │   ├── PostCard/
│   │   │   ├── PostDetail/
│   │   │   ├── PostForm/
│   │   │   ├── CommentSection/
│   │   │   ├── CategoryList/
│   │   │   └── VoteButtons/
│   │   │
│   │   ├── profile/                   # User Profile
│   │   │   ├── ProfileCard/
│   │   │   ├── ProfileForm/
│   │   │   ├── UserListings/
│   │   │   └── UserPosts/
│   │   │
│   │   └── admin/                     # Admin Panel
│   │       ├── Dashboard/
│   │       ├── UserManagement/
│   │       ├── ReportList/
│   │       └── NotificationForm/
│   │
│   ├── hooks/                         # Custom Hooks (Smart Logic)
│   │   ├── useAuth.ts
│   │   ├── useModal.ts
│   │   ├── useListings.ts
│   │   ├── useRoommates.ts
│   │   ├── usePosts.ts
│   │   ├── useUsers.ts
│   │   ├── useNotifications.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── utils/                         # Utilities & API
│   │   ├── api/
│   │   │   ├── firebase.ts
│   │   │   ├── auth.ts
│   │   │   ├── listings.ts
│   │   │   ├── roommates.ts
│   │   │   ├── posts.ts
│   │   │   ├── users.ts
│   │   │   └── storage.ts
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   │
│   ├── types/                         # TypeScript Types
│   │   ├── user.ts
│   │   ├── listing.ts
│   │   ├── roommate.ts
│   │   ├── post.ts
│   │   └── common.ts
│   │
│   ├── contexts/                      # React Contexts
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── LanguageContext.tsx
│   │
│   ├── pages/                         # Page Components
│   │   ├── Home.tsx
│   │   ├── Listings.tsx
│   │   ├── ListingDetail.tsx
│   │   ├── Roommates.tsx
│   │   ├── Community.tsx
│   │   ├── Profile.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Admin.tsx
│   │
│   ├── i18n/                          # Internationalization
│   │   ├── index.ts
│   │   └── locales/
│   │       ├── en.json
│   │       ├── my.json
│   │       └── th.json
│   │
│   ├── demo/                          # Demo & Mocks
│   │   └── mocks/
│   │       ├── listings.ts
│   │       ├── roommates.ts
│   │       └── users.ts
│   │
│   ├── global.css
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .storybook/                        # Storybook Config
│   ├── main.ts
│   └── preview.ts
│
├── .prettierrc                        # Prettier Config
├── .prettierignore
├── eslint.config.js                   # ESLint Config
├── tailwind.config.ts                 # Tailwind Config
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

---

## Development Tools Setup

### 1. ESLint Configuration

Already configured. Ensure strict rules for:

- No unused variables
- No explicit any (warn)
- React hooks rules
- Import order

### 2. Prettier Configuration

Create `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### 3. Storybook Setup

Install and configure Storybook for component documentation and visual testing.

**Important:** Story files (`.stories.tsx`) must be placed inside each component folder, not in a separate stories directory.

Example structure:

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
```

---

## Styling Guidelines

### Global CSS (src/styles/global.css)

```css
@import "tailwindcss";
@plugin "daisyui";

@plugin "daisyui/theme" {
  name: "nord";
  default: false;
  prefersdark: false;
  color-scheme: "light";
  --color-base-100: oklch(95.127% 0.007 260.731);
  --color-base-200: oklch(93.299% 0.01 261.788);
  --color-base-300: oklch(89.925% 0.016 262.749);
  --color-base-content: oklch(32.437% 0.022 264.182);
  --color-primary: oklch(44.85% 0.233 264.05); /* Indigo (Project Brand) */
  --color-primary-content: oklch(95% 0.01 264.05);
  --color-secondary: oklch(69.651% 0.059 248.687);
  --color-secondary-content: oklch(13.93% 0.011 248.687);
  --color-accent: oklch(77.464% 0.062 217.469);
  --color-accent-content: oklch(15.492% 0.012 217.469);
  --color-neutral: oklch(45.229% 0.035 264.131);
  --color-neutral-content: oklch(89.925% 0.016 262.749);
  --color-info: oklch(69.207% 0.062 332.664);
  --color-info-content: oklch(13.841% 0.012 332.664);
  --color-success: oklch(76.827% 0.074 131.063);
  --color-success-content: oklch(15.365% 0.014 131.063);
  --color-warning: oklch(85.486% 0.089 84.093);
  --color-warning-content: oklch(17.097% 0.017 84.093);
  --color-error: oklch(60.61% 0.12 15.341);
  --color-error-content: oklch(12.122% 0.024 15.341);
  --radius-selector: 1rem;
  --radius-field: 0.25rem;
  --radius-box: 0.5rem;
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  --border: 1px;
  --depth: 1;
  --noise: 1;
}

/* Base styles */
html {
  scroll-behavior: smooth;
}

body {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
}

/* Responsive breakpoints reference */
/* sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px */
```

### CSS Rules (MUST FOLLOW)

1. **NO inline styles** - Never use `style={{ }}` prop
2. **NO styled-components** - Use Tailwind CSS classes only
3. **Use global.css** - All custom styles go in global.css
4. **Use DaisyUI components** - Leverage DaisyUI component classes
5. **Responsive design** - Use Tailwind responsive prefixes (sm:, md:, lg:, xl:, 2xl:)

---

## Features Breakdown

### Phase 1: Backend & Authentication

**Goal:** Build and deploy the Node.js API with full Auth0 authentication and core data models.

| Task                  | Description                                              | Status  |
| --------------------- | -------------------------------------------------------- | ------- |
| Node.js API Setup     | Initialize Express + TypeScript project on Railway       | Completed |
| Auth0 Integration     | Configure Auth0 tenant, rules, social connections        | Completed |
| MongoDB Setup         | Atlas cluster, schemas for User/Listing/Post/Roommate    | Completed |
| Cloudinary Setup      | Upload presets, transformation configs                   | Completed |
| Sentry Integration    | Error tracking on both frontend (React) and backend (Node) | Completed |
| Auth API Endpoints    | POST /auth/login, POST /auth/register, GET /auth/me      | Completed |
| Auth0 Frontend SDK    | @auth0/auth0-react — login/logout/token refresh          | Completed |
| Protected Routes      | Route guards using Auth0 `isAuthenticated`               | Completed |
| Railway Deployment    | CI/CD pipeline → auto-deploy main branch to Railway      | Pending (user) |
| Vercel Deployment     | Frontend auto-deploy on Vercel, env vars configured      | Pending (user) |
| Environment Config    | `.env` for frontend + backend, secrets in Railway/Vercel | Completed (local); secrets on Railway/Vercel pending user |

### Phase 2: Core Features

**Goal:** Implement all primary product features backed by the real API.

| Task                   | Description                                               | Status  |
| ---------------------- | --------------------------------------------------------- | ------- |
| Listings API           | CRUD endpoints for accommodation listings                 | Completed |
| Listings UI            | ListingCard, ListingDetail, create/edit form              | Completed |
| Image Upload           | Cloudinary direct upload from frontend, URL stored in DB  | Completed |
| Roommate API           | CRUD endpoints for roommate posts                         | Completed |
| Roommate UI            | RoommateCard, profile view, create/edit form              | Completed |
| Community API          | Posts, comments, upvote/downvote endpoints                | Completed |
| Community UI           | PostCard, PostDetail, comment thread                      | Completed |
| Search & Filter        | Full-text search + price/location/type filters            | Completed |
| Kitchen (Food) Feature | Merchant listings, order QR, delivery/pickup flow         | Completed |
| Property Manager (Manage) | Tenant management, invoices, maintenance requests      | Completed |
| Map Integration        | mapcn.dev map view on Listings page                       | Completed |
| Notifications          | In-app + email notifications via Auth0 Actions            | Completed |

### Phase 3: Polish & Deployment

**Goal:** Production-ready UI, performance, testing, and live deployment.

| Task              | Description                                    | Status    |
| ----------------- | ---------------------------------------------- | --------- |
| UI Polish         | Warm SEA design system — all pages complete    | Completed |
| Responsive QA     | Test all breakpoints (mobile → desktop)        | Completed |
| Accessibility     | WCAG 2.1 AA, keyboard nav, ARIA labels         | Completed |
| Animations        | Framer Motion page transitions, micro-interactions | Completed |
| Performance       | Code splitting, lazy loading, image CDN        | Completed |
| SEO               | Meta tags, Open Graph, structured data         | Completed |
| Error Boundaries  | Global React error boundary + Sentry reporting | Completed |
| Unit Tests        | Vitest — utils, hooks, key components          | Completed (20 tests pass) |
| E2E Tests         | Playwright — auth flow, listing create/browse  | Completed (skeleton, runs against dev server) |
| Storybook         | Component docs for all shared UI components    | Completed (9 stories, `storybook build` green) |
| Production Deploy | Vercel (frontend) + Railway (backend) go-live  | Pending (user) |

### Phase 4: Accommodation Listings

| Task            | Description                                 | Status  |
| --------------- | ------------------------------------------- | ------- |
| Listing Card    | Display listing preview                     | Completed |
| Listing Grid    | Responsive grid layout                      | Completed |
| Listing Detail  | Full listing view with gallery              | Pending |
| Listing Form    | Create/Edit listing form                    | Pending |
| Image Upload    | Multiple image upload with Firebase Storage | Pending |
| Map Integration | Location display with map                   | Pending |
| Search & Filter | Search by location, price, amenities        | Pending |
| Price Display   | Monthly/Daily price toggle                  | Pending |

### Phase 5: Roommate Finder

| Task               | Description                             | Status  |
| ------------------ | --------------------------------------- | ------- |
| User Profile       | Extended profile for roommate matching  | Pending |
| Roommate Card      | Display roommate seeker preview         | Pending |
| Roommate Form      | Create/Edit roommate post               | Pending |
| Matching Algorithm | Match based on preferences              | Pending |
| Search & Filter    | Filter by budget, location, preferences | Pending |

### Phase 6: Community/Forum

| Task           | Description                                  | Status  |
| -------------- | -------------------------------------------- | ------- |
| Post Card      | Display post preview                         | Pending |
| Post Detail    | Full post view with comments                 | Pending |
| Post Form      | Create post with anonymous option            | Pending |
| Comment System | Threaded comments                            | Pending |
| Vote System    | Upvote/Downvote functionality                | Pending |
| Categories     | Post categories (General, Market, Tips, Q&A) | Pending |
| Report System  | Report inappropriate content                 | Pending |

### Phase 7: User Management

| Task         | Description                      | Status  |
| ------------ | -------------------------------- | ------- |
| User Types   | Owner/Agent/User roles           | Pending |
| Profile Page | User profile with listings/posts | Pending |
| My Listings  | User's own listings management   | Pending |
| My Posts     | User's own posts management      | Pending |
| Saved Items  | Saved listings and posts         | Pending |

### Phase 8: Admin Panel

| Task                | Description                        | Status  |
| ------------------- | ---------------------------------- | ------- |
| Admin Dashboard     | Overview statistics                | Pending |
| User Management     | View, suspend, delete users        | Pending |
| Report Management   | Handle reported content            | Pending |
| Notification System | Send notifications to users        | Pending |
| Listing Approval    | Approve/reject listings (optional) | Pending |

### Phase 9: Polish & Optimization

| Task           | Description                      | Status  |
| -------------- | -------------------------------- | ------- |
| Animations     | Framer Motion animations         | Partially |
| Performance    | Code splitting, lazy loading     | Pending |
| SEO            | Meta tags, Open Graph            | Pending |
| Accessibility  | ARIA labels, keyboard navigation | Pending |
| Error Handling | Global error boundary            | Pending |
| Testing        | Unit tests, integration tests    | Pending |

---

## Data Models

### User

```typescript
interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phone?: string;
  role: "user" | "agent" | "owner" | "admin";
  status: "active" | "suspended";
  language: "en" | "my" | "th";
  createdAt: Date;
  updatedAt: Date;
}
```

### Listing

```typescript
interface Listing {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: "apartment" | "condo" | "house" | "room";
  priceMonthly: number;
  priceDaily?: number;
  location: {
    address: string;
    city: string;
    country: "Myanmar" | "Thailand";
    coordinates?: { lat: number; lng: number };
  };
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  area: number; // sqft
  status: "available" | "rented" | "draft";
  createdAt: Date;
  updatedAt: Date;
}
```

### Roommate Post

```typescript
interface RoommatePost {
  id: string;
  userId: string;
  title: string;
  description: string;
  budget: { min: number; max: number };
  preferredLocation: string[];
  moveInDate: Date;
  duration: string;
  preferences: {
    gender?: "male" | "female" | "any";
    smoking?: boolean;
    pets?: boolean;
  };
  status: "looking" | "found" | "closed";
  createdAt: Date;
  updatedAt: Date;
}
```

### Community Post

```typescript
interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  category: "general" | "market" | "tips" | "qa";
  isAnonymous: boolean;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  status: "active" | "hidden" | "removed";
  createdAt: Date;
  updatedAt: Date;
}

interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  isAnonymous: boolean;
  parentId?: string;
  createdAt: Date;
}
```

### Report

```typescript
interface Report {
  id: string;
  reporterId: string;
  reportedUserId: string;
  targetType: "listing" | "roommate" | "post" | "comment" | "user";
  targetId: string;
  reason: string;
  status: "pending" | "reviewed" | "resolved";
  createdAt: Date;
}
```

---

## Responsive Breakpoints

| Breakpoint | Min Width | Target Devices          |
| ---------- | --------- | ----------------------- |
| sm         | 640px     | Large phones, landscape |
| md         | 768px     | Tablets                 |
| lg         | 1024px    | Laptops, small desktops |
| xl         | 1280px    | Desktops                |
| 2xl        | 1536px    | Large screens           |

### Design Principles

1. **Mobile First** - Start with mobile design, scale up
2. **Touch Friendly** - Minimum 44px touch targets
3. **Readable Text** - Minimum 16px base font size
4. **Consistent Spacing** - Use Tailwind spacing scale
5. **Flexible Images** - Responsive image sizing

---

## Dependencies to Install

```bash
# Core
npm install react-router-dom

# UI
npm install daisyui lucide-react framer-motion

# i18n
npm install react-i18next i18next i18next-browser-languagedetector

# Firebase
npm install firebase

# Forms
npm install react-hook-form zod @hookform/resolvers

# Utilities
npm install date-fns clsx

# Development
npm install -D @storybook/react @storybook/react-vite @storybook/addon-essentials
npm install -D prettier eslint-config-prettier
```

---

## Success Metrics

| Metric                   | Target                                            |
| ------------------------ | ------------------------------------------------- |
| Lighthouse Performance   | > 90                                              |
| Lighthouse Accessibility | > 95                                              |
| First Contentful Paint   | < 1.5s                                            |
| Time to Interactive      | < 3s                                              |
| Mobile Responsive        | 100% pages                                        |
| Browser Support          | Chrome, Firefox, Safari, Edge (latest 2 versions) |

---

## Next Steps

1. Install required dependencies
2. Configure Tailwind + DaisyUI with nord theme
3. Setup ESLint + Prettier
4. Setup Storybook
5. Configure Firebase
6. Setup i18n
7. Create base layout components
8. Implement authentication

---

## Routing Structure

| Route                      | Page Component  | Description                | Auth Required |
| -------------------------- | --------------- | -------------------------- | ------------- |
| `/`                        | Home            | Landing page               | No            |
| `/listings`                | Listings        | All accommodation listings | No            |
| `/listings/:id`            | ListingDetail   | Single listing detail      | No            |
| `/listings/create`         | CreateListing   | Create new listing         | Yes           |
| `/listings/:id/edit`       | EditListing     | Edit existing listing      | Yes (Owner)   |
| `/roommates`               | Roommates       | Roommate finder listings   | No            |
| `/roommates/:id`           | RoommateProfile | Roommate seeker profile    | No            |
| `/roommates/create`        | CreateRoommate  | Create roommate post       | Yes           |
| `/roommates/:id/edit`      | EditRoommate    | Edit roommate post         | Yes (Owner)   |
| `/community`               | Community       | Community forum home       | No            |
| `/community/:category`     | CategoryPosts   | Posts by category          | No            |
| `/community/post/:id`      | PostDetail      | Single post with comments  | No            |
| `/community/create`        | CreatePost      | Create new post            | Yes           |
| `/community/post/:id/edit` | EditPost        | Edit existing post         | Yes (Owner)   |
| `/profile`                 | Profile         | Current user profile       | Yes           |
| `/profile/edit`            | EditProfile     | Edit user profile          | Yes           |
| `/profile/:userId`         | UserProfile     | View other user's profile  | No            |
| `/login`                   | Login           | Login page                 | No (Guest)    |
| `/register`                | Register        | Registration page          | No (Guest)    |
| `/forgot-password`         | ForgotPassword  | Password reset             | No            |
| `/admin`                   | AdminDashboard  | Admin overview             | Yes (Admin)   |
| `/admin/users`             | AdminUsers      | User management            | Yes (Admin)   |
| `/admin/reports`           | AdminReports    | Report management          | Yes (Admin)   |
| `/admin/listings`          | AdminListings   | Listing management         | Yes (Admin)   |
| `/admin/posts`             | AdminPosts      | Post management            | Yes (Admin)   |
| `*`                        | NotFound        | 404 page                   | No            |

---

## Environment Variables

```env
# ── Frontend (.env in /gostay) ──────────────────────────────────────────
VITE_API_URL=https://api.gostay.app         # Railway backend URL

# Auth0
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_AUDIENCE=

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=

# Map (mapcn.dev)
VITE_MAP_TILES_URL=
VITE_MAP_API_KEY=

# App
VITE_APP_NAME=GoStay
VITE_APP_URL=https://gostay.app
VITE_DEFAULT_LANGUAGE=en
VITE_DEFAULT_CURRENCY=MMK

# Sentry (frontend)
VITE_SENTRY_DSN=

# ── Backend (.env in /gostay-api) ────────────────────────────────────────
# Auth0
AUTH0_DOMAIN=
AUTH0_AUDIENCE=

# MongoDB
MONGODB_URI=mongodb+srv://...

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Sentry (backend)
SENTRY_DSN=

# App
PORT=4000
NODE_ENV=production
CLIENT_URL=https://gostay.app
```

---

## Currency & Pricing

### Supported Currencies

| Currency     | Code | Symbol | Default Region |
| ------------ | ---- | ------ | -------------- |
| Myanmar Kyat | MMK  | Ks     | Myanmar        |
| Thai Baht    | THB  | ฿      | Thailand       |
| US Dollar    | USD  | $      | International  |

### Currency Conversion

- Auto-detect user location for default currency
- Real-time exchange rate API integration (optional)
- Manual conversion rates fallback
- Display prices in user's preferred currency
- Store prices in original currency

### Price Display Format

```typescript
interface PriceDisplay {
  original: { amount: number; currency: "MMK" | "THB" | "USD" };
  converted?: { amount: number; currency: "MMK" | "THB" | "USD" };
  rate?: number;
}
```

### Price Formatting

```typescript
const formatPrice = (amount: number, currency: string): string => {
  switch (currency) {
    case "MMK":
      return `${amount.toLocaleString()} Ks`;
    case "THB":
      return `฿${amount.toLocaleString()}`;
    case "USD":
      return `$${amount.toLocaleString()}`;
    default:
      return `${amount.toLocaleString()} ${currency}`;
  }
};
```

---

## Map Integration

### Provider: mapcn.dev (MapLibre-based)

### Features

- Interactive map for listing locations
- Marker clustering for multiple listings
- Location search with autocomplete
- Geolocation support
- Custom map markers
- Responsive map container

### Implementation

```typescript
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapConfig {
  container: string | HTMLElement;
  style: string;
  center: [number, number];
  zoom: number;
  apiKey: string;
}
```

### Map Components

| Component    | Description                      |
| ------------ | -------------------------------- |
| `MapView`    | Main map display component       |
| `MapMarker`  | Custom marker for listings       |
| `MapSearch`  | Location search input            |
| `MapPicker`  | Location picker for listing form |
| `MapCluster` | Marker clustering for list view  |

---

## Image Handling

### Provider: Cloudinary

**Note:** Cloudinary setup will be done after project build.

### Image Constraints

| Constraint         | Value                |
| ------------------ | -------------------- |
| Max file size      | 5MB per image        |
| Allowed formats    | jpg, jpeg, png, webp |
| Max images/listing | 10 images            |
| Max images/profile | 1 avatar             |
| Max images/post    | 5 images             |

### Features

- Image upload with drag & drop
- Automatic image optimization
- Responsive image delivery
- Image transformation (resize, crop, format)
- Lazy loading support
- Progressive image loading
- Automatic compression
- Thumbnail generation

### Compression Strategy

| Image Type | Quality | Max Width | Format   |
| ---------- | ------- | --------- | -------- |
| Thumbnail  | 70%     | 200px     | webp     |
| Preview    | 80%     | 800px     | webp     |
| Full size  | 85%     | 1920px    | webp/jpg |
| Avatar     | 80%     | 200px     | webp     |

### Thumbnail Generation

```typescript
interface ThumbnailConfig {
  sizes: {
    small: { width: 200; height: 150 };
    medium: { width: 400; height: 300 };
    large: { width: 800; height: 600 };
  };
  format: "webp";
  quality: 80;
}
```

### Upload Configuration

```typescript
interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
  folder: string;
  maxFileSize: 5 * 1024 * 1024; // 5MB
  allowedFormats: ["jpg", "jpeg", "png", "webp"];
}
```

### Image Transformations

```typescript
const getImageUrl = (
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "auto" | "webp" | "jpg";
  },
): string => {
  const transformations = [];
  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  if (options.format) transformations.push(`f_${options.format}`);

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations.join(",")}/${publicId}`;
};
```

### Image Components

| Component      | Description                     |
| -------------- | ------------------------------- |
| `ImageUpload`  | Multi-image upload component    |
| `ImageGallery` | Image gallery with lightbox     |
| `ImagePreview` | Image preview with optimization |
| `Avatar`       | User avatar with fallback       |

---

## State Management Strategy

### Approach: React Context + Custom Hooks

### State Categories

| Category     | Solution             | Examples                    |
| ------------ | -------------------- | --------------------------- |
| Global UI    | React Context        | Theme, Language, Modal      |
| Auth State   | React Context        | User, Auth status           |
| Server State | Custom Hooks + Cache | Listings, Posts, Users      |
| Form State   | React Hook Form      | All forms                   |
| Local State  | useState             | Component-specific state    |
| URL State    | React Router + URL   | Filters, Search, Pagination |

### Context Providers

```typescript
<AuthProvider>
  <ThemeProvider>
    <LanguageProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </LanguageProvider>
  </ThemeProvider>
</AuthProvider>
```

### Custom Hooks for Data Fetching

```typescript
const useListings = (filters?: ListingFilters) => {
  const [data, setData] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch logic with caching

  return { data, loading, error, refetch };
};
```

### State Persistence

- Auth state: localStorage + Firebase session
- User preferences: localStorage
- Language preference: localStorage + i18next

---

## Error Handling Strategy

### Error Types

| Type          | Handler            | User Feedback         |
| ------------- | ------------------ | --------------------- |
| Network Error | Retry with backoff | Toast notification    |
| Auth Error    | Redirect to login  | Error message         |
| Validation    | Form error display | Inline error          |
| API Error     | Error boundary     | Error page            |
| Unknown Error | Error boundary     | Generic error message |

### Error Boundary

```typescript
interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<Props, ErrorBoundaryState> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />
    }
    return this.props.children
  }
}
```

### Toast Notifications

```typescript
type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}
```

### Form Error Handling

- Zod validation schemas
- React Hook Form error display
- Field-level error messages
- Submit error handling

### Offline Handling

- Detect online/offline status with `navigator.onLine`
- Show offline banner when disconnected
- Queue actions for retry when back online
- Cache recent data in localStorage
- Graceful degradation for offline users

```typescript
const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};
```

---

## Security Rules (Firebase)

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Listings
    match /listings/{listingId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
        (resource.data.userId == request.auth.uid ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }

    // Roommate Posts
    match /roommatePosts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
        (resource.data.userId == request.auth.uid ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }

    // Community Posts
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
        (resource.data.userId == request.auth.uid ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }

    // Comments
    match /comments/{commentId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
        (resource.data.userId == request.auth.uid ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }

    // Reports
    match /reports/{reportId} {
      allow create: if request.auth != null;
      allow read, write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    match /listings/{listingId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## Analytics & Tracking

### Google Analytics 4

- Page view tracking
- User engagement metrics
- Event tracking for key actions

### Custom Events

| Event Name         | Category   | Description                 |
| ------------------ | ---------- | --------------------------- |
| `listing_view`     | Engagement | User views a listing        |
| `listing_create`   | Action     | User creates a listing      |
| `listing_search`   | Search     | User performs search        |
| `roommate_connect` | Social     | User connects with roommate |
| `post_create`      | Engagement | User creates a post         |
| `user_register`    | Auth       | New user registration       |
| `user_login`       | Auth       | User login                  |
| `report_submit`    | Moderation | User submits a report       |

### Implementation

```typescript
const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};
```

---

## SEO Strategy

### Meta Tags

- Dynamic page titles
- Open Graph tags for social sharing
- Twitter Card meta tags
- Canonical URLs
- Language alternates

### Structured Data (JSON-LD)

- Organization schema
- LocalBusiness schema for listings
- FAQ schema for community posts
- BreadcrumbList schema

### Sitemap

- Dynamic sitemap generation
- Sitemap for listings
- Sitemap for community posts

### Robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /profile/
Disallow: /api/
```

### Performance SEO

- Server-side rendering consideration (future)
- Image optimization with Cloudinary
- Lazy loading for images
- Preconnect to external domains

---

## Git Workflow

### Branch Strategy

| Branch       | Purpose                 |
| ------------ | ----------------------- |
| `main`       | Production-ready code   |
| `develop`    | Development integration |
| `feature/*`  | New features            |
| `fix/*`      | Bug fixes               |
| `refactor/*` | Code refactoring        |
| `docs/*`     | Documentation updates   |

### Commit Convention

```
type(scope): subject

[optional body]

[optional footer]
```

### Commit Types

| Type       | Description                         |
| ---------- | ----------------------------------- |
| `feat`     | New feature                         |
| `fix`      | Bug fix                             |
| `docs`     | Documentation only                  |
| `style`    | Code style (formatting, semicolons) |
| `refactor` | Code change without fix/feature     |
| `perf`     | Performance improvement             |
| `test`     | Adding/updating tests               |
| `chore`    | Build process, dependencies         |

### Pull Request Process

1. Create feature branch from `develop`
2. Make changes with conventional commits
3. Run lint, typecheck, and tests
4. Create PR with description
5. Code review required
6. Squash merge to `develop`

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

### Keyboard Navigation

- All interactive elements focusable
- Logical tab order
- Skip to main content link
- Focus indicators visible
- Escape key closes modals

### Screen Reader Support

- Semantic HTML elements
- ARIA labels for interactive elements
- ARIA live regions for dynamic content
- Alt text for all images
- Form labels properly associated

### Color & Contrast

- Minimum 4.5:1 contrast ratio for text
- Minimum 3:1 for large text
- Don't rely on color alone
- Focus states clearly visible

### Motion & Animation

- Respect `prefers-reduced-motion`
- No auto-playing videos
- Pause/stop controls for animations

### Form Accessibility

- Error messages linked to fields
- Required fields clearly marked
- Clear error recovery instructions
- Consistent form layout

---

## Performance Budget

### Core Web Vitals Targets

| Metric                   | Target  | Measurement |
| ------------------------ | ------- | ----------- |
| Largest Contentful Paint | < 2.5s  | LCP         |
| First Input Delay        | < 100ms | FID         |
| Cumulative Layout Shift  | < 0.1   | CLS         |
| Time to First Byte       | < 600ms | TTFB        |

### Bundle Size Limits

| Resource Type   | Budget    |
| --------------- | --------- |
| Initial JS      | < 150KB   |
| Initial CSS     | < 50KB    |
| Total page load | < 500KB   |
| Images          | Optimized |

### Performance Strategies

- Code splitting by route
- Lazy loading components
- Image optimization (WebP, responsive)
- Font subsetting
- Critical CSS inlining
- Service Worker caching (future)

---

## Testing Strategy

### Testing Pyramid

| Level        | Tool         | Coverage Target |
| ------------ | ------------ | --------------- |
| Unit Tests   | Vitest       | 80%             |
| Integration  | Vitest + RTL | Key flows       |
| E2E Tests    | Playwright   | Critical paths  |
| Visual Tests | Storybook    | All components  |

### Unit Tests

- Utility functions
- Custom hooks
- Form validation
- Data transformations

### Integration Tests

- Component interactions
- Form submissions
- Auth flows
- Data fetching

### E2E Test Scenarios

| Scenario          | Priority |
| ----------------- | -------- |
| User registration | High     |
| User login        | High     |
| Create listing    | High     |
| Search listings   | High     |
| Create post       | Medium   |
| Report content    | Medium   |
| Admin actions     | Medium   |

### Test Utilities Setup

```typescript
import { render, RenderOptions } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </AuthProvider>
  </BrowserRouter>
)

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })
```

---

## Firebase Collections (Setup After Build)

**Note:** Firebase setup will be done after project build.

### Collections Structure

| Collection      | Document ID | Description            |
| --------------- | ----------- | ---------------------- |
| `users`         | uid         | User profiles          |
| `listings`      | auto-id     | Accommodation listings |
| `roommatePosts` | auto-id     | Roommate seeker posts  |
| `posts`         | auto-id     | Community posts        |
| `comments`      | auto-id     | Post comments          |
| `reports`       | auto-id     | Content reports        |
| `notifications` | auto-id     | User notifications     |
| `savedItems`    | auto-id     | User saved items       |

### Subcollections

| Parent Collection | Subcollection   | Description            |
| ----------------- | --------------- | ---------------------- |
| `users/{userId}`  | `savedListings` | Saved listings by user |
| `users/{userId}`  | `savedPosts`    | Saved posts by user    |
| `listings/{id}`   | `images`        | Listing images         |
| `posts/{postId}`  | `comments`      | Post comments          |

### Indexes (Create in Firebase Console)

- `listings`: location.city + status + createdAt
- `listings`: priceMonthly + status
- `listings`: type + status + createdAt
- `posts`: category + createdAt
- `posts`: userId + createdAt
- `roommatePosts`: status + createdAt

---

## Deployment Process

### Vercel Setup

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import project from GitHub
   - Select repository: `gostay`

2. **Environment Variables (Vercel Dashboard)**

   | Variable                          | Value           | Environment |
   | --------------------------------- | --------------- | ----------- |
   | VITE_FIREBASE_API_KEY             | From Firebase   | All         |
   | VITE_FIREBASE_AUTH_DOMAIN         | From Firebase   | All         |
   | VITE_FIREBASE_PROJECT_ID          | From Firebase   | All         |
   | VITE_FIREBASE_STORAGE_BUCKET      | From Firebase   | All         |
   | VITE_FIREBASE_MESSAGING_SENDER_ID | From Firebase   | All         |
   | VITE_FIREBASE_APP_ID              | From Firebase   | All         |
   | VITE_CLOUDINARY_CLOUD_NAME        | From Cloudinary | All         |
   | VITE_MAPCN_API_KEY                | From mapcn.dev  | All         |

3. **Build Settings**

   | Setting          | Value           |
   | ---------------- | --------------- |
   | Framework Preset | Vite            |
   | Build Command    | `npm run build` |
   | Output Directory | `dist`          |
   | Install Command  | `npm install`   |
   | Node.js Version  | 20.x            |

### Deployment Workflow

```
Push to main → Vercel Preview → Tests Pass → Auto Deploy to Production
```

### Branch Deployments

| Branch      | URL                       | Purpose    |
| ----------- | ------------------------- | ---------- |
| main        | gostay.vercel.app         | Production |
| develop     | develop-gostay.vercel.app | Staging    |
| PR branches | pr-xxx-gostay.vercel.app  | Preview    |

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Environment variables set
- [ ] Firebase rules deployed
- [ ] Domain configured (if custom)

### Custom Domain Setup (Optional)

1. Go to Vercel Project Settings → Domains
2. Add custom domain (e.g., `gostay.app`)
3. Configure DNS records:
   - A record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`

---

## CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-typecheck:
    name: Lint & TypeCheck
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Run TypeScript
        run: npm run typecheck

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: lint-and-typecheck

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}

  test:
    name: Test
    runs-on: ubuntu-latest
    needs: lint-and-typecheck

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  e2e:
    name: E2E Tests
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npx playwright test

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### GitHub Secrets Required

| Secret                            | Description             |
| --------------------------------- | ----------------------- |
| VITE_FIREBASE_API_KEY             | Firebase API Key        |
| VITE_FIREBASE_AUTH_DOMAIN         | Firebase Auth Domain    |
| VITE_FIREBASE_PROJECT_ID          | Firebase Project ID     |
| VITE_FIREBASE_STORAGE_BUCKET      | Firebase Storage Bucket |
| VITE_FIREBASE_MESSAGING_SENDER_ID | Firebase Sender ID      |
| VITE_FIREBASE_APP_ID              | Firebase App ID         |
| CODECOV_TOKEN                     | Codecov upload token    |

### Workflow Triggers

| Event        | Branches      | Actions                           |
| ------------ | ------------- | --------------------------------- |
| Push         | main, develop | Lint, TypeCheck, Build, Test      |
| Pull Request | main, develop | Lint, TypeCheck, Build, Test, E2E |

### Status Badges

Add to README.md:

```markdown
[![CI/CD](https://github.com/username/gostay/actions/workflows/ci.yml/badge.svg)](https://github.com/username/gostay/actions/workflows/ci.yml)
[![Coverage](https://codecov.io/gh/username/gostay/branch/main/graph/badge.svg)](https://codecov.io/gh/username/gostay)
```

---

## Notes

- All components must be responsive across all device sizes
- No inline CSS allowed - use global.css and Tailwind classes
- Use Lucide icons for all iconography
- Use Framer Motion for animations
- Follow modular component architecture
- Keep logic in hooks, UI in components
- Firebase Collections setup after project build
- Cloudinary setup after project build
