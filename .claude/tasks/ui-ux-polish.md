# UI/UX Polish — Audit-Based Fixes

## Summary
Implement all 10 priority fixes identified in the UI/UX audit to raise the portfolio from 6.5/10 to ~8.5/10.

## Tasks

### 1. Add `prefers-reduced-motion` support (CRITICAL)
- Add global CSS media query to disable/simplify animations
- Affects: Aurora bg, Preloader, ScrollReveal, AnimatedText, TechStack3D, scroll indicator
- **File**: `app/globals.css`

### 2. Make project cards keyboard-accessible (CRITICAL)
- Change project card wrapper from `<div onClick>` to `<a href>` with proper Link
- Add keyboard focus styles
- **File**: `app/components/sections/Projects.tsx`

### 3. Fix CTA form — connect to API with feedback states (HIGH)
- Add form state management (loading, success, error)
- Connect to existing `/api/contact` endpoint
- Disable button during submission, show spinner
- **File**: `app/components/sections/CTA.tsx`

### 4. Show tech stack labels by default (HIGH)
- Remove hover-only visibility on tech names
- Always show labels (smaller text, muted color)
- **File**: `app/components/sections/Experience.tsx`

### 5. Replace CDN `<img>` with Next.js Image or self-hosted icons (HIGH)
- Replace external CDN URLs with `@tabler/icons-react` or `lucide-react` where possible
- For remaining ones, use Next.js `<Image>` with proper optimization
- **File**: `app/components/sections/Experience.tsx`

### 6. Replace Preloader emojis with SVG shapes (MEDIUM)
- Replace emoji characters with styled SVG geometric shapes
- **File**: `components/common/Preloader.tsx`

### 7. Add skip-to-content link (MEDIUM)
- Add visually hidden skip link at top of layout
- Add `id="main-content"` to main area
- **File**: `app/layout.tsx`, `app/page.tsx`

### 8. Add Preloader skip/dismiss (MEDIUM)
- Allow click-to-dismiss the preloader
- **File**: `components/common/Preloader.tsx`

### 9. Increase touch targets on social icons to 44px (MEDIUM)
- Add padding to social link icons in Hero and Footer
- **File**: `app/components/sections/Hero.tsx`, `app/components/layout/Footer.tsx`

### 10. Throttle navbar scroll handler (MEDIUM)
- Use requestAnimationFrame to throttle scroll event processing
- **File**: `app/components/layout/Navbar.tsx`

## Implementation Log

### All 10 tasks completed

**Fix 1 — `prefers-reduced-motion`** (`globals.css`)
- Added `@media (prefers-reduced-motion: reduce)` block that sets `animation-duration: 0.01ms`, `transition-duration: 0.01ms`, `scroll-behavior: auto`, and disables aurora/glow/ping animations.

**Fix 2 — Keyboard-accessible project cards** (`Projects.tsx`)
- Replaced `<div onClick>` with `<Link href>` from Next.js. Drag-prevention via `onClick={(e) => { if (isDragging) e.preventDefault(); }}`. Added `focus-visible:outline-2 focus-visible:outline-primary`. Arrow icon now 60% visible on mobile (no hover needed).

**Fix 3 — CTA form with API** (`CTA.tsx`)
- Added `useState` for formData, status (`idle|loading|success|error`), errorMessage. Connected to `/api/contact` POST. Loading state shows spinner + disables inputs. Success shows checkmark + "Send Another" button. Error shows alert banner. Added `autoComplete` attributes.

**Fix 4 — Tech stack labels always visible** (`Experience.tsx`)
- Labels now always visible with `text-muted-foreground` base color (was `opacity-0`). Icons use `text-muted-foreground group-hover:text-primary` instead of grayscale filter.

**Fix 5 — Replace CDN images** (`Experience.tsx`)
- Replaced all 11 external CDN `<img>` tags with `@tabler/icons-react` components (IconBrandVue, IconBrandReact, etc.). shadcn/ui and Claude Code use CodeIcon from local icons. Zero external image requests.

**Fix 6 — Preloader SVG shapes** (`Preloader.tsx`)
- Replaced emoji chars (`⚛🟢🔷🟣🔶🔵⬡◆`) with SVG geometric shapes (circle, hexagon, diamond, triangle, square). Added `ShapeIcon` component rendering proper SVGs with stroke + fill.

**Fix 7 — Skip-to-content** (`layout.tsx`, `page.tsx`, `globals.css`)
- Added `<a href="#main-content" className="skip-to-content">` in layout. Added `id="main-content"` on `<main>`. CSS: visually hidden by default, visible on focus with primary bg, fixed positioning.

**Fix 8 — Preloader dismiss** (`Preloader.tsx`)
- Click anywhere or press Escape/Enter/Space to dismiss. Added `cursor-pointer`, `onClick={dismiss}`, keyboard event listener. Shows "Click or press any key to skip" hint. Added `role="status"` and `aria-label`.

**Fix 9 — Touch targets 44px** (`Hero.tsx`, `Footer.tsx`, `Navbar.tsx`)
- Social icons in Hero, Footer now wrapped in `w-11 h-11` (44px) containers with `rounded-lg` and hover bg. Navbar mobile hamburger: `w-11 h-11`. Theme toggle: `w-10 h-10`.

**Fix 10 — Throttle scroll** (`Navbar.tsx`)
- Wrapped scroll handler in `requestAnimationFrame` with guard (`if (rafRef.current) return`). Added `{ passive: true }` to scroll listener. Cleanup cancels pending rAF.
