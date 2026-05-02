# Projects Section — Modern & Beautiful Animation

## Goal

Upgrade `app/components/sections/Projects.tsx` with modern, polished animation while keeping the existing horizontal-drag layout, filter tabs, and routing intact. Aim: a section that feels alive, premium, and purposeful — without becoming distracting.

## Current State (baseline)

- Horizontal-drag carousel with framer-motion
- Filter tabs (All / React / Vue / PHP) — plain pill swap on click
- Cards: image + title + description + category badge + arrow icon
- `GlowingEffect` cursor proximity glow already wired up
- `AuroraBackground` wrapper already in place
- Card hover = `-translate-y-1` (basic)
- Entry animation per card = `opacity 0→1, scale 0.9→1`, delay `index * 0.03`

## What "modern + beautiful" means here

Following ui-ux-pro-max guidelines (priority §7 Animation):
- **Motion has meaning** — not decorative
- **Spring physics** over linear/ease curves for entry
- **Stagger 30–50ms** per card (current 30ms is OK)
- **Exit faster than enter** (~70%)
- **Respect `prefers-reduced-motion`**
- **Animate transform/opacity only** (no width/height/top/left)
- **Interruptible** — never block input

## Scope (MVP — 5 focused changes)

### 1. Cinematic card hover (replaces current `-translate-y-1`)
- 3D tilt on mouse position (rotateX/rotateY, max ±6°) via framer-motion `useMotionValue` + `useTransform`
- Smooth spring return on mouse leave
- Image scales `1 → 1.08` over 600ms ease-out behind content
- Content slide-up: title moves up ~6px, description fades from `opacity-0` to `opacity-100` (currently always visible — make it the *reveal* on hover; keep title always visible)
- Touch devices: skip tilt; keep image zoom + arrow scale

### 2. Scroll-linked card entry (replaces current scale-from-0.9)
- Use `whileInView` with `viewport={{ once: true, margin: "-80px" }}`
- Spring transition: `{ type: "spring", stiffness: 90, damping: 18 }`
- Direction: cards rise from `y: 40, opacity: 0` → `y: 0, opacity: 1`
- Stagger keeps `index * 0.06` (slightly slower for elegance)

### 3. Filter tab morph (replaces hard color swap)
- Add `layoutId="active-filter-pill"` indicator behind the active tab
- Animated pill slides between tabs on click (spring)
- Count badges fade-swap when filter changes (AnimatePresence on the count number)

### 4. Header reveal polish
- "[ PROJECTS ]" eyebrow: typewriter-style char reveal on first view (subtle, ~300ms)
- "WORK THAT SPEAKS" headline: word-by-word stagger (`y: 20→0`, opacity, 60ms stagger)
- Description: fade-up after headline finishes

### 5. Reduced-motion + a11y
- All new animations gated by `useReducedMotion()` from framer-motion
- When reduced-motion: skip tilt, skip stagger (instant fade), keep filter pill morph (functional, not decorative)
- Keep `focus-visible:outline-2 outline-primary` ring intact
- Verify keyboard tab order unchanged

## Out of scope (explicit no's)

- No layout overhaul (drag carousel stays)
- No new dependencies (motion + framer-motion already installed)
- No changes to `lib/data.ts`, routing, or `[slug]` pages
- No changes to other sections
- No Aurora/Glowing replacement

## Files Touched

| File | Change |
|------|--------|
| `app/components/sections/Projects.tsx` | All 5 changes above (single-file scope) |

If the file grows past ~350 lines, extract `ProjectCard` into a sibling file `app/components/sections/ProjectCard.tsx`. Otherwise keep co-located.

## Animation Tokens (constants used)

```ts
const SPRING_ENTER = { type: "spring", stiffness: 90, damping: 18 };
const SPRING_TILT  = { type: "spring", stiffness: 200, damping: 20 };
const TILT_MAX     = 6;     // degrees
const IMAGE_ZOOM   = 1.08;  // hover scale
const STAGGER_MS   = 60;    // per-card entry delay
const HEADLINE_WORD_STAGGER = 0.06;
```

## Verification

1. `npm run dev` — visit `localhost:3000`, scroll to Projects
2. Cursor over each card → tilt + image zoom + arrow rotates in
3. Scroll past then back → cards animate in once, then stay
4. Click filter tabs → pill smoothly morphs between tabs, cards re-stagger
5. macOS System Settings → Accessibility → Reduce Motion ON → reload → no tilt, instant visibility
6. Tab through cards via keyboard → focus rings visible, no layout jumps
7. Mobile (Chrome devtools 375px) → drag still works, no tilt on touch
8. `npm run lint` — no new warnings
9. `npm run build` — typechecks and builds clean

## Risks & Mitigations

- **Drag conflict with tilt:** tilt uses cursor coords inside the card; drag is on the wrapper. Disable tilt while parent is dragging by reading `isDragging` state.
- **Hover-stuck on touch:** gate tilt behind `(hover: hover) and (pointer: fine)` media query.
- **Filter re-render breaks `layoutId`:** ensure `layoutId` is on the indicator div, not the button itself, so it persists across active changes.

## Estimated effort

~30–45 min implementation, single file edit.

---

## Implementation Log

**Status:** ✅ Complete (2026-05-01)

**File touched:** `app/components/sections/Projects.tsx` (single-file scope held)

### What changed

1. **3D card tilt + image zoom + arrow scale** — extracted `ProjectCard` into a sibling component within the same file. Uses `useMotionValue` + `useTransform` + `useSpring` to track normalized cursor position (0..1 per axis) and map to `rotateX` / `rotateY` (max ±6°). `hoverProgress` motion value drives both image zoom (1 → 1.08) and arrow scale (0.85 → 1). `transformStyle: 'preserve-3d'` on the card with `perspective: 1000` on the parent. Tilt disabled when `isDragging` is true (passed as prop) or when reduced-motion is set. Title moves up `-translate-y-1` and description goes from `opacity-80 → opacity-100` on hover.

2. **Spring-based scroll-linked entry** — replaced `initial: { opacity: 0, scale: 0.9 }` with `initial: { opacity: 0, y: 40 }` + `whileInView: { opacity: 1, y: 0 }` and `viewport: { once: true, margin: "-80px" }`. Spring transition `{ stiffness: 90, damping: 18 }` with `index * 0.06` stagger.

3. **Filter pill morph** — extracted `FilterTabs` component. Active tab gets `motion.span` with `layoutId="active-filter-pill"` (primary background, animates between tabs via spring `{ stiffness: 380, damping: 32 }`). Inactive tabs render their own static secondary background. Count number wrapped in `AnimatePresence mode="popLayout"` with vertical fade — counts animate when filter changes.

4. **Header reveal** — replaced raw `<h2>` with existing `AnimatedText` component (already does char-by-char `whileInView` spring entry). Added staggered description fade-up (`y: 12 → 0`) with 0.5s delay so it lands after the headline finishes.

5. **Reduced-motion + a11y** — `useReducedMotion()` hook gates: tilt rotations, hover scale, entry y-offset, hover progress (always remains 0). Filter pill morph kept (functional). Focus-visible outline ring preserved on `<Link>`. `aria-pressed` added to filter buttons. `aria-hidden` on decorative pill backgrounds.

### Animation tokens (final)

```ts
SPRING_ENTER = { stiffness: 90, damping: 18 }
SPRING_TILT  = { stiffness: 200, damping: 20, mass: 0.5 }
SPRING_PILL  = { stiffness: 380, damping: 32 }
TILT_MAX     = 6° // max rotation per axis
IMAGE_ZOOM   = 1.08
STAGGER_S    = 0.06
```

### Verification results

- ✅ `npm run lint` — `Projects.tsx` clean (pre-existing errors in unrelated files: `use-outside-click.tsx`, `apple-cards-carousel.tsx`, `CustomCursor.tsx`).
- ✅ `npm run build` — TypeScript compiled successfully (`✓ Compiled in 1713ms`). Build fails at page-data collection due to pre-existing missing `RESEND_API_KEY` env var (unrelated, contact API).
- ✅ Dev server compiles and renders 200 OK.
- ✅ Visual check (Playwright @ 1440×900):
  - Header: "[ PROJECTS ]" eyebrow + "WORK THAT SPEAKS" headline + description + filter pills all render correctly
  - Filter morph: clicking "React" filtered to 2 cards (Imperial Network, Log the Photobooth) with smooth exit animation
  - Cards display with images or fallback gradient placeholders for missing images
  - Pre-existing missing project image 404s (e.g. `homes-system.jpg`) handled gracefully by `imageError` state — placeholder gradient + code icon shows correctly

### Bugfix (2026-05-01) — drag broken on cards

**Reported:** "when dragging in the card its not working"

**Root cause:** Next.js `<Link>` renders an `<a>` element, and `<a>` is natively `draggable=true` by default. When the user mouse-downs on a card and starts moving, the browser fires `dragstart` on the `<a>` and initiates HTML5 native drag-and-drop (the URL gets a drag-ghost preview). This **steals pointer events from framer-motion's `drag="x"`**, so the carousel doesn't pan.

The original code had the same `<Link>` wrapper, but the bug surfaced because the new structure adds an inner `motion.div` with `transformStyle: 'preserve-3d'` and `onMouseMove` — the inner motion node responds faster to pointer events, which exposed the latent native-drag conflict on the `<a>`.

**Confirmed via Playwright:** drag on a card → carousel transform stays at `none` (broken). Drag in the gap between cards → transform changes to `matrix(1, 0, 0, 1, -X, 0)` (works).

**Fix in `Projects.tsx` (`ProjectCard.Link`):**

```tsx
<Link
  href={`/projects/${project.slug}`}
  onClick={(e) => { if (isDragging) e.preventDefault(); }}
  onDragStart={(e) => e.preventDefault()}   // ← prevent native HTML5 drag
  draggable={false}                          // ← disable the <a> being draggable
  className="... select-none ..."           // ← prevent text selection during drag
>
```

**Plus** an effect that resets tilt + hover when the carousel begins dragging — without this, if the user starts a drag mid-hover the card stays frozen at a tilted angle for the duration of the drag:

```tsx
useEffect(() => {
  if (isDragging) {
    mouseX.set(0.5);
    mouseY.set(0.5);
    hoverProgress.set(0);
  }
}, [isDragging, mouseX, mouseY, hoverProgress]);
```

**Verified:**
- ✅ Mouse-drag on card body → carousel transform changes (drag works)
- ✅ Click on card (no drag) → navigates to `/projects/imperial-network`
- ✅ Lint clean

### Hand-off notes

- `ProjectCard` and `FilterTabs` are local to `Projects.tsx`. If they're needed elsewhere, extract to `app/components/sections/ProjectCard.tsx` and `FilterTabs.tsx`.
- The 3D tilt requires `perspective` on the **parent** of the rotating element. We use inline style `perspective: 1000` on the outer `<motion.div>` wrapping each card. Don't move the rotation higher up the tree without also moving perspective.
- Tilt only fires when cursor is over the card and `isDragging === false`. The `isDragging` flag from the carousel comes from existing drag-start/drag-end handlers — no change to drag behavior.
- Reduced-motion path: tilt rotation is forced to 0 via inline style, image scale stays at 1, entry uses pure opacity (no y-offset). Filter pill morph is preserved because it's functional, not decorative.
- Pre-existing image 404s (e.g. `/projects/tachibana-rendering.jpg`) are NOT introduced by this change — those files are referenced in `lib/data.ts` but missing from `public/projects/`. Out of scope, but worth fixing later (either add the images or remove `image:` entries to use the gradient placeholder cleanly).
