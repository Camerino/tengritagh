# Full Codebase Review

**Reviewer:** Claude Code Reviewer Agent
**Date:** 2026-04-02
**Scope:** All source files in `src/`, `mock-clover/src/`, configuration files

## Summary

The Tengri Tagh codebase is well-structured and follows the plan closely. The architecture is sound: React Server Components by default, `'use client'` only where needed, Zustand for cart state, Drizzle for database access, Zod for validation, and server actions for mutations. The Clover integration follows the specified 3-call flow with retry logic. Data models match the plan (prices in cents, nanoid PKs, denormalized order items, Chinese names via `nameZh`).

However, the review uncovered **4 HIGH severity issues** that have been fixed in this commit, along with several MEDIUM and LOW items documented below.

---

## Issues Found

### HIGH (Fixed)

#### H1: Store hours mismatch between display and business logic

**File:** `src/lib/store-hours.ts`
**Problem:** The `DEFAULT_HOURS` minutes-from-midnight values were consistently 1 hour earlier than the hours displayed to customers in `src/lib/constants.ts`, the footer, and the location page. For example, Mon-Thu showed "11 AM - 10 PM" to users but the ordering logic used 11 AM - 9 PM (1260 min = 21:00). This would cause orders to be rejected an hour before the displayed closing time.
**Fix:** Updated all `DEFAULT_HOURS` values to match the displayed hours: Mon-Thu 11am-10pm (1320), Fri-Sat 11am-11pm (1380), Sun 12pm-9pm (1260).

#### H2: Server trusted client-submitted prices (price manipulation vulnerability)

**File:** `src/app/checkout/actions.ts`
**Problem:** The `placeOrder` server action used `item.priceCents` directly from client input to calculate the subtotal and store in the order. An attacker could modify prices in the request to get items at any price (including $0 or negative). The Zod schema also allowed negative `priceCents`.
**Fix:** Added server-side price verification that:

1. Fetches actual prices from the database for all submitted menu item IDs
2. Rejects orders containing unknown or unavailable items
3. Uses database prices (not client-submitted) for subtotal calculation and order storage
4. Added `min(0)` constraint to the `priceCents` Zod validator

#### H3: Unauthenticated order status mutation exposed as server action

**File:** `src/app/order/[id]/actions.ts`
**Problem:** `updateOrderStatus` was exported as a `'use server'` function, allowing any client to change any order's status (e.g., mark as cancelled or picked up) without authentication.
**Fix:** Removed the `updateOrderStatus` export from client-facing server actions. Order status changes should only occur via the Clover sync process or a future authenticated admin API.

#### H4: `.env` file not in `.gitignore`

**File:** `.gitignore`
**Problem:** Only `.env*.local` was gitignored, but the bare `.env` file was not. If a developer creates `.env` with real credentials, it could be accidentally committed.
**Fix:** Added `.env` to `.gitignore`.

---

### MEDIUM

#### M1: `isStoreOpen()` config override has no "auto" mode

**File:** `src/lib/store-hours.ts` (line 41)
**Problem:** When `storeOpen` config is set to `'true'` (which it is in the seed data), the store is always open regardless of schedule. There is no explicit "auto" value. This means the seeded database will never use the schedule-based logic. In production, someone would need to remove or change this config.
**Impact:** Not a bug per se (the store _is_ open during development), but could cause confusion in production if the config isn't changed.

#### M2: Google Reviews are hardcoded mock data

**File:** `src/components/home/google-reviews.tsx`
**Problem:** The plan specifies "Recent reviews pulled from Google Places API (star rating, reviewer name, text, date). Cached server-side (refresh every 24h)." Currently using hardcoded mock reviews.
**Impact:** Not a blocker for launch, but the plan feature is not implemented.

#### M3: Google Maps not integrated

**File:** `src/app/location/page.tsx` (line 112)
**Problem:** The map shows a placeholder div instead of an actual Google Maps embed. The `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` env var is defined but not used.

#### M4: Footer social links use generic URLs, not restaurant-specific

**File:** `src/components/layout/footer.tsx` (lines 47-74)
**Problem:** Social media links point to generic `https://instagram.com`, `https://facebook.com`, etc. instead of using the `SOCIAL_LINKS` constants defined in `src/lib/constants.ts` which have the correct restaurant-specific URLs.

#### M5: Order platforms use placeholder `#` URLs

**File:** `src/lib/constants.ts` (lines 24-39)
**Problem:** DoorDash, Uber Eats, and Grubhub links all point to `#`. These need real URLs before production launch.

#### M6: No `POST /api/orders` endpoint

**File:** Plan specifies `POST /api/orders` as an alternative submission endpoint
**Problem:** This API route was not implemented. Only the server action `placeOrder` exists.

#### M7: No `POST /api/clover/webhook` endpoint

**File:** Plan specifies this for receiving Clover status updates
**Problem:** Not implemented. Status updates from Clover have no way to reach the app.

#### M8: TAX_RATE duplicated in three places

**Files:** `src/app/cart/page.tsx`, `src/app/order/[id]/page.tsx`, `src/components/checkout/order-summary.tsx`
**Problem:** `const TAX_RATE = 0.08875` is defined identically in three different files. Should be a shared constant in `src/lib/constants.ts`.

#### M9: Two inline styles used instead of Tailwind

**Files:** `src/components/home/hero-section.tsx` (line 18), `src/components/home/order-platforms.tsx` (line 28)
**Problem:** The code reviewer spec says "Tailwind for all styling -- no inline styles." The hero section uses an inline `style` for a background SVG pattern, and OrderPlatforms uses inline `style` for dynamic background colors. The hero pattern could use a CSS custom property or Tailwind arbitrary value. The platform colors are dynamic so inline style is acceptable.

#### M10: `checkout/page.tsx` and `cart/page.tsx` are fully client-rendered

**Files:** `src/app/checkout/page.tsx`, `src/app/cart/page.tsx`
**Problem:** Both pages have `'use client'` at the top, making them entirely client-rendered. While they need client interactivity for cart state, the page wrapper could be a server component with client sub-components, reducing the client bundle.

---

### LOW

#### L1: No `Salads` or `Desserts` categories in seed data

**File:** `src/db/seed.ts`
**Problem:** The plan lists 9 menu categories (including Salads and Desserts) but the seed only has 7 categories. Minor gap between plan and implementation.

#### L2: `getIsOpen()` duplicated between `location-strip.tsx` and `location/page.tsx`

**Files:** `src/components/home/location-strip.tsx`, `src/app/location/page.tsx`
**Problem:** Both files contain identical `getIsOpen()` and `parseTimeToMinutes()` functions. Should be extracted to a shared utility.

#### L3: No loading/skeleton state for featured dishes

**File:** `src/components/home/featured-dishes.tsx`
**Problem:** The featured dishes section has no loading state or Suspense boundary. If the database query is slow, the entire homepage blocks.

#### L4: Chef photo/GIF and food photos are placeholders

**Files:** Multiple components use emoji placeholders instead of actual images.
**Problem:** All image slots show emoji placeholders. Not a code issue, but the site is not production-ready without real imagery.

#### L5: `data-testid="order-summary"` only on checkout OrderSummary

**Problem:** The order summary on the checkout page has `data-testid` but the one on the order confirmation page does not.

#### L6: `formatTimeLabel` uses `toLocaleTimeString` which varies by server locale

**File:** `src/lib/pickup-times.ts`
**Problem:** The pickup slot labels depend on server locale. In production, the server locale should be controlled or a fixed formatter used.

#### L7: Year in copyright is dynamic via `new Date().getFullYear()`

**File:** `src/components/layout/footer.tsx`
**Problem:** Minor -- this runs at build/render time, which is fine, but worth noting it will show the build year in static pages.

---

## What's Good

1. **Clean architecture**: Server components by default, `'use client'` only for interactive components (cart, checkout, menu grid, order status tracker). Good separation of concerns.

2. **Strong TypeScript**: Zero `any` types, zero `@ts-ignore` directives across the entire codebase. All interfaces are well-defined.

3. **Zod validation**: Server action `placeOrder` validates all input with a comprehensive Zod schema including string lengths, regex for phone, and array min/max.

4. **Idempotency key**: Double-submit prevention is correctly implemented -- the client generates a key in the cart store (regenerated on every cart change), and the server checks for duplicates before creating.

5. **Clover integration**: Clean 3-call flow (create order, bulk line items, print event) with exponential backoff retry logic, proper error categorization (4xx vs 5xx), and fire-and-forget pattern so users get instant confirmation.

6. **Order status audit trail**: `orderStatusEvents` table properly logs every status change with source and timestamp. The tracker component polls every 30 seconds and stops when terminal.

7. **Data model**: Prices in cents throughout, nanoid PKs, denormalized order items, `nameZh` (Chinese names) supported everywhere -- featured dishes, menu cards, detail modal, cart items.

8. **Comprehensive data-testid coverage**: All key UI elements have test IDs for E2E testing. Feature files cover all sprints (smoke, homepage, menu, cart, checkout, ordering, clover integration, order status).

9. **Mock Clover service**: Well-designed with admin endpoints for test control (failure injection, delay simulation, data reset). Proper auth validation middleware.

10. **SEO**: JSON-LD structured data on homepage (Restaurant) and menu page (Menu with MenuSections), robots.txt, sitemap, OpenGraph/Twitter meta tags on all pages.

11. **Accessibility**: Semantic HTML with `aria-labelledby`, `aria-label`, proper heading hierarchy, `sr-only` table headers, `role="tablist"` on category tabs, RTL support for Uyghur script.

12. **Cultural authenticity**: Uyghur script (teng-ri-tagh) in the hero, bilingual menu items, etles (atlas silk) ikat pattern SVG, Silk Road geometric border, Uyghur-specific dish names.

13. **Docker setup**: Clean multi-stage Dockerfile, docker-compose with mock-clover dependency, proper volume for SQLite data persistence.

14. **Cart hydration handling**: CartProvider hides cart-related UI until hydration completes via CSS `visibility: hidden`, preventing flash of stale/empty cart state.

---

## Recommendations for V2

1. **Authentication/Admin Panel**: Build an admin interface for managing orders, updating menu items, toggling store hours. Currently there is no admin access.

2. **Google Places API integration**: Replace mock reviews with real Google reviews, cached server-side with 24h refresh as the plan specifies.

3. **Google Maps embed**: Integrate the actual Google Maps component on the location page.

4. **Real images**: Replace all emoji/gradient placeholders with actual food photography and chef GIFs.

5. **Payment processing**: The plan notes "no payment for now" but V2 should add Stripe/Square for prepayment.

6. **Rate limiting**: The `placeOrder` server action and API routes have no rate limiting. Consider adding rate limiting middleware.

7. **Error monitoring**: Add Sentry or similar for production error tracking, especially for Clover sync failures.

8. **Centralize constants**: Extract `TAX_RATE`, duplicated helper functions, and shared types to avoid drift.

9. **Admin-only webhook endpoint**: Build `POST /api/clover/webhook` for receiving status updates from Clover in production.

10. **Database backups**: Implement automated SQLite backup strategy (the plan mentions "file-copy backups" but no automation exists).

11. **Timezone handling**: Store hours and pickup time logic should explicitly use America/New_York timezone consistently. Currently, `store-hours.ts` uses server-local time while `location-strip.tsx` and `location/page.tsx` explicitly use `America/New_York`.
