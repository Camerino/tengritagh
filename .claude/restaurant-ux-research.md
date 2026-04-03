# Restaurant Website UX/UI Research

## Design Inspiration for Tengritagh Uyghur Restaurant Website

Research conducted: 2026-04-02
Sites analyzed: Sweetgreen, Nobu, Chipotle, Momofuku, Dishoom, Bonchon
(Shake Shack and The Halal Guys blocked automated access; Dishoom and Bonchon substituted as ethnic restaurant references)

---

## 1. SWEETGREEN (sweetgreen.com) -- Modern Ordering-Focused

### Hero Section

- Full-width carousel/slider with rotating promotions
- Primary slide: "SUNSHINE IN A SALAD" headline featuring "Chicken Sesame Crunch" with a single prominent "Order now" CTA button
- Secondary slides rotate between location expansion ("Where should we open next?"), recruitment, and seasonal promotions
- Each slide combines lifestyle food photography with centered text overlays
- Clean, minimal text -- short punchy headline + one CTA per slide

### Navigation

- Hamburger toggle menu on mobile; horizontal full nav on desktop
- Logo left-aligned as primary home link
- Desktop links: Our Menu, Our Mission, The Market, Outpost, Catering, Locations, Order
- Sticky header keeps nav accessible during scroll
- App download link in top navigation area

### Menu Display

- Tabbed carousel format with category filters: Salads, Warm Bowls, Sides
- Card-based layout: square product image on top, product name as bold heading below, ingredient list in regular weight, dietary tags (V, G, "Online only") as small badges
- Consistent "Order now" arrow link on every card
- No prices visible on homepage menu preview -- drives users into the ordering platform

### Color Palette & Typography

- White backgrounds dominating, dark text for contrast
- Green accents aligned with brand (CTA buttons, highlights)
- Sans-serif typography throughout
- Bold weights for headlines, regular for body/descriptions
- Clean, health-forward minimalist aesthetic

### Ordering Flow

- "Order now" buttons repeated throughout: hero, menu cards, sticky nav
- Links to external ordering platform (order.sweetgreen.com)
- Entry point is consistent and never more than one scroll away
- No friction -- no login required to browse menu

### Footer

- Newsletter signup section
- App download links (iOS/Android)
- About Us: Careers, Investor Relations, Locations, Press
- Social: Instagram, Twitter, TikTok, Spotify, Facebook
- Support: Nutrition guide, Gift Cards, Store
- Legal: Privacy Policy, Terms, Accessibility Statement
- Copyright at bottom

### Unique UX Patterns

- AI chat modal ("Sierra") for customer support
- "Enable Accessibility" button prominently placed
- Responsive images with width/quality URL parameters (?w=600&q=75) for performance
- Newsletter signup with inline error messaging

### Mobile Layout

- Hamburger menu replaces horizontal nav
- Hero images served at optimized resolutions per device
- Cards likely stack vertically in single column
- Large touch targets on CTAs

### KEY TAKEAWAYS FOR TENGRITAGH

- Repeated "Order now" CTAs everywhere -- never more than one scroll away
- Card-based menu preview on homepage with dietary badges
- Minimal hero text: short headline + single CTA
- External ordering platform keeps the marketing site clean

---

## 2. NOBU RESTAURANTS (noburestaurants.com) -- High-End Ethnic Cuisine

### Hero Section

- "Discover The World Of Nobu" with an "Enter" CTA directing to primary location
- High-quality hero image: "Nobu One Za'abeel Dining Room" -- atmospheric interior shot
- "Just opened!: NOBU ONE ZA'ABEEL" announcement as primary above-fold content
- Aspirational, luxury-first impression; experience over ordering

### Navigation

- Logo at top with traditional horizontal nav on desktop
- Location selector is the DOMINANT nav element, organized geographically:
  - USA & CANADA, EUROPE, MEXICO & CARIBBEAN, MIDDLE EAST & AFRICA, ASIA PACIFIC
- "H" badge marks restaurants within Nobu Hotels
- Hamburger menu on mobile (breakpoint at 991px)
- Dark and white logo variants for different contexts

### Menu Display

- Not a traditional menu grid -- uses editorial "Featured Dish" sections
- Signature dishes (e.g., "Nobu-style Beef Toban Yaki") get dedicated sections with descriptions emphasizing culinary techniques and ingredient fusion stories
- Food is presented as narrative, not a catalog

### Color Palette & Typography

- Sophisticated palette: blacks, golds (#86754D), whites
- Fine dining aesthetic -- dark backgrounds with gold accents
- Sans-serif fonts for modern appeal while maintaining luxury positioning
- High contrast, generous spacing

### Ordering Flow

- No online ordering -- CTAs are "Reserve," "Book Your Reservation," "Explore"
- Reservation-focused rather than order-focused
- Location-specific entry points throughout

### Footer

- Comprehensive location directory mirroring main navigation
- Careers, Nobu Hotels links
- Legal: Privacy, Terms of Service, Accessibility, Cookies Policy
- Social: Facebook, Instagram, X, YouTube
- Design credit: "PASTPRESENTFUTURE" agency

### Unique UX Patterns

- Scroll-triggered animations: elements fade in with 150px translateY effect
- Video players with mute/unmute toggles for atmospheric content
- Location filtering as a primary interaction pattern
- "Grand Cordon" competition and cocktail features as editorial storytelling

### Mobile Layout

- Media queries at 991px breakpoint
- Hamburger nav with box-shadow and border styling
- Adjusted padding for portrait layouts
- Stacked content blocks

### KEY TAKEAWAYS FOR TENGRITAGH

- Gold accent color on dark backgrounds = instant luxury feel (consider for special sections)
- Scroll-triggered fade-in animations add polish without complexity
- Editorial storytelling about dishes builds cultural connection
- If Tengritagh has multiple locations, geographic location selector is effective
- Reservation CTA pattern if dine-in is prioritized

---

## 3. CHIPOTLE (chipotle.com) -- Streamlined Ordering

### Hero Section

- Promotional banner dominates (tied to events/campaigns -- "HAPPY NATIONAL BURRITO DAY")
- "$0 Delivery Fee" with promo code "DELIVER" prominently displayed
- Dual "ORDER NOW" CTA buttons -- impossible to miss
- Secondary hero: featured product "Chicken Al Pastor" with evocative description ("Where heat meets pineapple sweet, where chicken meets the sizzle of the grill")
- Tertiary section: "High Protein Menu" -- functional/lifestyle positioning

### Navigation

- Chipotle logo left-aligned
- Horizontal nav: MENU, CATERING, REWARDS, OUR VALUES, NUTRITION
- "ENABLE ACCESSIBILITY" link visible
- Sticky header pattern
- Concise -- only 5 primary nav items

### Menu Display

- References "Build Your Own" customization
- Entree-based ordering with quantity limits (max 15 per order)
- Menu is primarily accessed through the ordering flow, not displayed editorially on homepage

### Color Palette & Typography

- White background dominant, dark text
- Red accent color (brand color, visible in Rewards logo)
- Sans-serif typography, high contrast for accessibility
- Bold, uppercase headlines create urgency

### Ordering Flow

- Multiple, aggressive CTAs:
  - "ORDER NOW" buttons (primary)
  - "CREATE AN ACCOUNT" for Rewards
  - "START A GROUP ORDER"
  - "ORDER CATERING"
- Separate paths for individual, group, and catering orders
- Ordering is THE primary purpose of the site

### Footer

- Support: Contact, Careers, Gift Cards
- Company: Newsroom, Investors, Sustainability
- Legal: Privacy Policy, Terms, Accessibility Statement
- Social media icons (Instagram, Twitter, Facebook)
- App download buttons (Apple/Google)
- Rewards program promotion in footer

### Unique UX Patterns

- Rewards points display with dynamic counter
- "See Full Terms" modal links for legal transparency
- Group ordering feature for bulk purchases
- Duplicate hero content for mobile/desktop variants (separate markup)
- 24-hour notice requirement for catering displayed upfront

### Mobile Layout

- Separate mobile/desktop hero markup (not just CSS responsive -- different HTML)
- Stacked button layouts
- Flexible grid for service cards
- Large touch-friendly CTAs

### KEY TAKEAWAYS FOR TENGRITAGH

- Aggressive, repeated "ORDER NOW" CTAs work for ordering-focused sites
- Separate flows for individual vs. catering vs. group orders
- Rewards/loyalty program integrated throughout
- Promotional banners tied to events/holidays drive urgency
- Keep nav to 5 or fewer primary items

---

## 4. MOMOFUKU (momofuku.com) -- Asian Restaurant Group

### Hero Section

- Full-width hero with high-res food photography (corn pancakes)
- 35% opacity dark overlay for text contrast
- Headline: "Brunch is Live at Majordomo"
- Dual CTAs: "Book a Table" and "See the Menu" in cream-colored buttons against dark background
- Top promotional banner: "Super Peach is now open in Los Angeles"

### Navigation

- Promotional announcement banner above main nav
- Desktop links: "Our Story," "Gift Cards," plus prominent "Shop" button
- Mobile nav expands to include: "All Restaurants," "Careers," "Contact Us"
- Logo centered or left-aligned

### Menu/Restaurant Display

- "Our Restaurants" grid carousel with category filtering (All, CA, NV, NY)
- Each restaurant card includes:
  - High-quality photography
  - Restaurant name and address
  - Action buttons for reservations and more info
  - Color-coded overlays by establishment type
- This is a multi-restaurant group, so location discovery is primary

### Color Palette & Typography

- Off-black (#232323) as primary dark color
- Cream (#FAF7EE) as warm background/button color
- Color-coded accents per restaurant type: greens for noodle bars, blues for cocktail venues, earth tones for fine dining
- Large, bold headlines with generous letter-spacing
- Body text with comfortable line-height for readability

### Ordering Flow

- "Book a Table" is primary CTA (reservation-first)
- "See the Menu" as secondary action
- Shop section for retail products (sauces, pantry items)
- Goldbelly partnerships for shipped food

### Footer

- Newsletter signup prominently placed
- Restaurant links organized by location
- Company information
- Social media: Instagram, Facebook, TikTok
- Branded background colors in footer

### Unique UX Patterns

- "Our Story" section with inline imagery integrated into narrative text about 2004 founding
- Color-coded restaurant categories create visual system
- Recruitment messaging ("We're hiring!") woven into content
- DatoCMS asset delivery for optimized image serving

### Mobile Layout

- Stacked layouts replacing grid
- Image aspect ratios adjust for mobile
- Hamburger menu replaces desktop nav
- Large, touch-friendly buttons maintained

### KEY TAKEAWAYS FOR TENGRITAGH

- Cream/off-white (#FAF7EE) warm background feels inviting -- better than pure white for ethnic cuisine
- "Our Story" section with inline images builds emotional connection
- Dual CTA pattern: "Book a Table" + "See the Menu" covers both intents
- Announcement banner at top for promotions/news
- Color-coding by category if offering diverse menu sections

---

## 5. DISHOOM (dishoom.com) -- Ethnic Restaurant with Strong Cultural Identity

### Hero Section

- Narrative-driven hero: "From Bombay with Love" tagline
- "All Welcome" message displayed in Devanagari script -- cultural authenticity signal
- Large evocative photography of Bombay locations (B. Merwan establishment from 1914)
- Cultural grounding over commercial messaging above the fold

### Navigation

- Clean primary nav: Cafes, Menus, Shop, Stay
- Secondary nav: Group Feasting, Delivery, Contact, Careers
- Balance between commercial functions and storytelling content
- Reservations accessible alongside journal/editorial content

### Menu Display

- Location-specific menu offerings: All Day, Breakfast, Drinks, Puddings, Group Feast
- Each cafe location displays customized menus
- Delivery options separate, directing to dedicated ordering platforms

### Color Palette & Typography

- Warm, sophisticated palette: beige/cream backgrounds with black text
- Serif fonts (Cheltenham) for body copy -- creates upscale editorial aesthetic
- Custom branded font "DishoomBattersea" for personality
- Warm tones throughout, never cold/clinical

### Ordering Flow

- Reservation system with clear CTA buttons
- Delivery as separate pathway to external platforms
- Not ordering-first -- experience and storytelling first

### Footer

- Cafe locations listed
- Permit rooms section
- Menu links
- Shop categories
- Newsletter signup prominent
- Social: Instagram, LinkedIn, TikTok, YouTube, X

### Unique UX Patterns

- Cultural script (Devanagari) used as design element -- powerful authenticity signal
- Journal/editorial content with recipes and interviews alongside commercial content
- Asymmetrical grid layouts creating visual rhythm
- Photography that documents culture, not just food

### Mobile Layout

- Navigation collapses to toggle/hamburger
- Touch-friendly buttons with generous spacing
- Images remain prominent while text stays readable
- Stacked vertical layout

### KEY TAKEAWAYS FOR TENGRITAGH

- CRITICAL INSPIRATION: Using Uyghur script as a design element (like Dishoom uses Devanagari)
- Warm beige/cream palette instead of white feels more authentic and inviting
- Serif typography creates editorial, storytelling quality
- Cultural narrative FIRST, ordering SECOND -- builds emotional connection
- Journal/editorial content (recipes, stories) deepens engagement
- Asymmetrical layouts add visual interest beyond standard grids

---

## 6. BONCHON (bonchon.com) -- Ethnic Fast-Casual (Korean)

### Hero Section

- Dynamic carousel with video background capability
- Primary slide: "Mukbang Madness" with prominent "Order Now" CTA
- Immediate conversion intent established above the fold
- High-energy, bold visual approach

### Navigation

- Horizontal nav: Menu, Locations, Franchising, Our Story, Catering, Gift Cards
- Newsletter signup toggle ("Join the Crunch Club") with mail icon -- visible in nav
- Bonchon logo as home link

### Menu/Product Display

- Carousel sections featuring product categories rather than full menu:
  - "New Menu Drop"
  - "Order Now" (wing platters)
  - "Bring us to the Party" (catering)
  - "The gift of crunch" (gift cards)
- Each card: descriptive copy + dedicated CTA
- Process section: "Hand Battered. Double-Fried. Hand Brushed." -- preparation methodology with imagery

### Color Palette & Typography

- Vibrant, appetizing tones suited to Korean cuisine
- Clean, modern typography
- Contrasting button elements for CTAs
- Bold, energetic feel

### Ordering Flow

- All ordering directs to external platform (order.bonchon.com)
- URL parameters for campaign attribution tracking
- Ordering prominently featured but separate from marketing site

### Footer

- Careers, Press, Nutritional info, Policy links
- Social: Instagram, Facebook, Twitter, LinkedIn, TikTok, YouTube
- Instagram feed integration displaying user-generated content

### Unique UX Patterns

- "Hand Battered. Double-Fried. Hand Brushed." -- process/preparation storytelling section
- Instagram feed integration for social proof/UGC
- Newsletter club with branded name ("Crunch Club")
- Video backgrounds in hero carousel

### Mobile Layout

- CSS breakpoints at 400px for small devices
- Modified padding and image scaling
- Responsive carousel adapts to viewport

### KEY TAKEAWAYS FOR TENGRITAGH

- Process/preparation storytelling ("Hand-pulled. Fire-roasted. Slow-simmered.") builds brand
- Newsletter club with branded name creates community
- Instagram feed integration for social proof
- Video background in hero adds dynamism
- External ordering platform keeps marketing site fast

---

## CROSS-SITE PATTERN ANALYSIS

### Universal Patterns (implement these)

1. **Sticky navigation** -- every site uses it
2. **Hamburger menu on mobile** -- universal pattern
3. **Hero carousel/slider** with full-width imagery -- 5 of 6 sites
4. **Prominent, repeated CTAs** -- "Order Now" or "Reserve" appears 3+ times on every homepage
5. **Card-based content layout** -- universal for menus and features
6. **Newsletter signup** -- every site includes it, usually in footer
7. **App download links** -- where applicable
8. **Social media links** in footer -- every site
9. **External ordering platform** -- most sites separate ordering from marketing

### Differentiators by Category

| Pattern      | Fast-Casual (Sweetgreen, Chipotle, Bonchon) | Fine Dining (Nobu, Momofuku) | Cultural (Dishoom)     |
| ------------ | ------------------------------------------- | ---------------------------- | ---------------------- |
| Primary CTA  | "Order Now"                                 | "Reserve" / "Book a Table"   | "Book a Table"         |
| Hero focus   | Product + promotion                         | Atmosphere + location        | Story + culture        |
| Menu display | Card grid with photos                       | Editorial features           | Location-specific      |
| Background   | Pure white                                  | Dark/black                   | Warm cream/beige       |
| Typography   | Sans-serif, bold                            | Sans-serif, elegant          | Serif, editorial       |
| Photography  | Close-up food, bright                       | Interiors + plated dishes    | Cultural + atmospheric |

### Color Palette Recommendations for Tengritagh

Based on the research, a Uyghur restaurant should blend cultural warmth with modern appeal:

- **Primary background**: Warm cream/off-white (#FAF7EE or similar) -- NOT pure white (Momofuku, Dishoom approach)
- **Primary text**: Off-black (#232323) -- softer than pure black
- **Accent color**: Consider warm gold (#86754D from Nobu) or a rich terracotta/brick red -- connects to Silk Road/Central Asian visual identity
- **CTA buttons**: Strong contrast color (deep red or teal) on cream background
- **Dark mode sections**: Dark backgrounds with gold text for premium feel (Nobu approach for featured sections)

### Typography Recommendations

- **Headlines**: Consider a serif or semi-serif font for warmth and editorial quality (Dishoom approach)
- **Body text**: Clean sans-serif for readability
- **Cultural accent**: Uyghur script as decorative element (inspired by Dishoom's Devanagari)
- **Menu items**: Bold headings with lighter-weight descriptions

### Recommended Site Structure for Tengritagh

Based on all research:

1. **Hero**: Full-width image/video of signature dish or restaurant atmosphere + "Order Online" + "View Menu" dual CTAs
2. **Announcement bar**: Top banner for promotions, events, new dishes
3. **Navigation**: Logo left, 5 items max (Menu, Our Story, Locations, Catering, Order Online)
4. **Homepage sections** (in order):
   - Hero with dual CTA
   - Featured dishes carousel (card-based, 3-4 items)
   - "Our Story" section with cultural narrative + inline imagery
   - Process section ("Hand-pulled laghman. Tandoor-baked samsa. Slow-braised lamb.")
   - Testimonials or Instagram feed
   - Newsletter signup with branded name
5. **Footer**: Locations, hours, social links, legal, newsletter

### Key Differentiating Opportunities

- **Uyghur script** as decorative design element (strongest cultural signal)
- **Preparation storytelling** showing hand-pulled noodles, tandoor baking
- **Silk Road narrative** connecting geography, history, and cuisine
- **Warm color palette** that evokes Central Asian textiles and architecture
- **Video content** of noodle-pulling or bread-baking in hero section
