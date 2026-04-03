# Product Requirements Document: V1 Pickup Ordering

## Problem Statement

Tengri Tagh Uyghur Cuisine, located near Times Square in New York City, currently relies on walk-in traffic and third-party delivery platforms (DoorDash, Uber Eats, Grubhub) for orders. The restaurant lacks a direct digital presence that reflects its rich Uyghur cultural heritage, and has no way for customers to place pickup orders online. This results in lost revenue from customers who want to order ahead, high commission fees on third-party platforms, and an inability to build a direct relationship with customers.

The restaurant also serves a significant Chinese-speaking customer base who would benefit from seeing menu items displayed in Chinese alongside English.

## Goals & Success Metrics

### Goals

1. Launch a culturally authentic, mobile-first restaurant website that drives direct pickup orders
2. Enable customers to place pickup orders that print automatically at the Clover POS
3. Showcase Uyghur cuisine and culture to attract new customers
4. Provide a bilingual menu experience (English + Chinese)

### Success Metrics

| Metric                      | Target                                        | Measurement              |
| --------------------------- | --------------------------------------------- | ------------------------ |
| Weekly online pickup orders | 50+ within 3 months of launch                 | Order count in SQLite DB |
| Mobile page load (LCP)      | < 2.5 seconds                                 | Lighthouse               |
| Accessibility score         | WCAG 2.1 AA compliant                         | Lighthouse / axe         |
| Order completion rate       | > 70% of cart additions lead to placed orders | Analytics                |
| Google Reviews visibility   | Display 3-4 recent reviews on homepage        | Google Places API        |
| Bounce rate (homepage)      | < 40%                                         | Analytics                |

## Target Users

### Primary: Hungry Customers Near Times Square

- Office workers, tourists, and locals in the Midtown Manhattan area
- Looking for quick, authentic food with convenient pickup
- Browsing primarily on mobile devices
- May discover the restaurant via Google Maps, social media, or foot traffic

### Secondary: Chinese-Speaking Customers

- Significant portion of the customer base reads Chinese
- Expect to see familiar dish names in Chinese characters (e.g., 过油肉拌面)
- May share menu links within Chinese-speaking communities

### Tertiary: Food Enthusiasts & Explorers

- Interested in Uyghur/Silk Road cuisine
- Seeking cultural context and story behind the food
- Likely to share on social media if the experience is compelling

## Features by Sprint

### Sprint 0: Foundation

- Next.js 14 scaffolding with App Router, TypeScript strict mode, pnpm, Tailwind CSS v4
- Design system: color tokens (terracotta, burgundy, gold, cream, charcoal), typography (Playfair Display + Inter), shadcn/ui customization
- Database: Drizzle ORM + SQLite schema (categories, menuItems with nameZh, orders, orderItems, orderStatusEvents, siteConfig), menu seed script with real Uyghur dishes and Chinese names
- Layout shell: Header (logo, phone, cart icon, hamburger nav), Footer (social links, hours, nav, geometric border), MobileNav (slide-out)
- Docker: Dockerfile for app, mock Clover Express server, docker-compose.yml
- Testing: Playwright + Vitest configuration, smoke tests

### Sprint 1: Marketing Pages

- Homepage: hero with etles pattern stripe, animated chef GIF, Uyghur script, "Near Times Square NYC" link, dual CTA, food photos, featured dishes carousel with Chinese names, "Freshly Made for Every Order" section with animated GIFs, Google reviews, order platform links, about teaser, location strip
- Menu page: category tabs, responsive grid, bilingual names (English + Chinese), "POPULAR" badges, item cards with descriptions and prices, "Add to Cart" button (non-functional, wired in Sprint 2)
- About page: Uyghur cuisine story, Silk Road history, values section, chef/owner bio
- Location page: Google Maps embed, contact info, hours table, estimated wait time
- Footer: social media links (Instagram, Facebook, TikTok, Yelp), nav, hours, Silk Road border
- SEO: Next.js metadata API, OpenGraph tags, structured data (Restaurant schema)
- E2E tests for all Sprint 1 pages

### Sprint 2: Ordering System

- Zustand cart store with localStorage persistence
- Add-to-Cart functionality on menu page
- Item detail modal (quantity, special instructions)
- Sticky cart bar (mobile)
- Cart page with quantity editing and removal
- Checkout page: customer info, pickup time selector (15-min increments, ASAP default), kitchen notes
- placeOrder server action with idempotency key (prevent double-submit)
- Store hours logic (prevent ordering when closed)
- Pickup time validation (lead time, cutoff before close)
- Order confirmation page with status tracker (auto-refresh)
- E2E tests for full ordering flow

### Sprint 3: Clover Integration & Polish

- Clover API client: create order, bulk line items, print event
- Async sync with retry, cloverSyncStatus tracking
- Order status events audit trail
- Order status polling from Clover
- Playwright E2E tests against mock Clover in Docker
- Accessibility audit, Lighthouse optimization
- Full regression suite

## Out of Scope (V1)

| Feature                             | Reason                                                                |
| ----------------------------------- | --------------------------------------------------------------------- |
| Online payment processing           | Pay at pickup; reduces PCI compliance burden. Revisit in V2           |
| User accounts / login               | Unnecessary friction for a single-restaurant pickup flow              |
| Delivery                            | Handled by third-party platforms (DoorDash, Uber Eats, Grubhub)       |
| Admin panel                         | Restaurant staff manage menu/hours via direct DB or future admin tool |
| Multi-language beyond EN/ZH         | Uyghur script used decoratively only; full Uyghur translation in V2   |
| Loyalty / rewards program           | V2 consideration                                                      |
| Push notifications                  | V2 consideration                                                      |
| Menu item customization (modifiers) | V2; V1 uses free-text special instructions                            |

## Bilingual Menu Support

All menu items include both English and Chinese names:

- `name`: English name (e.g., "Gouyourou Laghman")
- `nameZh`: Chinese name (e.g., "过油肉拌面")

Display rules:

- Chinese name appears below the English name in a slightly smaller font
- Both names are searchable/filterable
- Category names remain English-only in V1
- Chinese names are sourced from the restaurant's existing Chinese menu

## Cultural Design Elements

### Etles (Atlas Silk) Pattern

- Uyghur ikat textile pattern used as a horizontal stripe in the hero section
- Colors: green and orange tones, authentic to traditional etles fabric
- Implemented as an SVG component for crisp rendering at all sizes

### Uyghur Script

- Restaurant name in Uyghur Arabic script (تەڭرىتاغ) used as a decorative element
- Displayed in the hero section as a cultural accent
- Right-to-left rendering handled correctly

### Chef Animation

- Animated GIF of chef hand-pulling noodles
- Displayed in a circular frame in the top-left of the hero section
- Reinforces the "freshly made" and "hand-pulled" messaging

### Silk Road Geometric Border

- Decorative border pattern inspired by Silk Road architectural motifs
- Used in the footer and as section dividers
- Implemented as a repeating SVG pattern

### Color Palette

- Terracotta (#C75B39) — warmth, earth, spice
- Burgundy (#6B1D2A) — richness, depth
- Gold (#D4A84B) — Silk Road, premium quality
- Cream (#FFF8F0) — clean backgrounds, warmth
- Charcoal (#2D2926) — readable text, grounding

### Typography

- **Playfair Display** — headings; elegant serif that evokes tradition
- **Inter** — body text; clean, highly readable sans-serif
