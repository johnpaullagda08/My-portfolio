# Fraxbit-Style Transitions Implementation Plan

## Overview

Implement fraxbit.com-inspired transition effects including an enhanced preloader with scattered images, scroll-based reveal animations with color wipes, text character animations with elastic hover effects, and a custom cursor.

## Analysis of Fraxbit.com Effects

1. **Preloader** - Images scatter from center, enlarge, then shrink and slide upward
2. **Scroll Reveal Wipes** - Colored overlay sweeps across content (left-to-right/right-to-left)
3. **Text Character Animations** - Characters split and animate with elastic easing on hover
4. **Custom Cursor** - Mouse-following cursor that scales on hover over interactive elements

## Current State

Your portfolio already has:
- Framer Motion installed (v12.26.2)
- Basic Preloader with progress bar
- ScrollReveal component (simple fade + translate)
- Animation constants configured

## Implementation Tasks

### Task 1: Enhanced Preloader with Scattered Images

**File:** `components/common/Preloader.tsx`

Replace the current preloader with a fraxbit-style image scatter animation:
- Multiple images/shapes positioned at center initially
- On load: images scatter outward with staggered timing
- Images scale up, then scale down while sliding upward
- Smooth exit transition revealing the page content

**Changes:**
- Add array of decorative elements (can use tech icons or abstract shapes)
- Implement scatter animation using Framer Motion's `stagger` and `variants`
- Use cubic-bezier easing similar to `power2.out` (already have `EASE_OUT_EXPO`)

### Task 2: Scroll Reveal Wipe Component

**File:** `components/common/ScrollRevealWipe.tsx` (new)

Create a new scroll reveal variant that uses a colored overlay wipe:
- Color block sweeps across the element (left-to-right or right-to-left)
- Content is revealed as the wipe passes
- Triggered on viewport entry via Framer Motion's `whileInView`

**Implementation:**
- Wrapper component with `overflow: hidden`
- Animated color overlay that translates from 0% to 100%
- Content revealed after overlay passes
- Configurable direction and color (use primary color `#3b82f6`)

### Task 3: Text Character Animation Component

**File:** `components/common/AnimatedText.tsx` (new)

Create a text component that splits into characters with hover animations:
- Text splits into individual `<span>` elements per character
- On hover: characters animate upward with elastic easing
- On mouse leave: characters animate downward
- Staggered timing for smooth wave effect

**Implementation:**
- Split text into characters using string methods
- Framer Motion `motion.span` for each character
- Use elastic easing: `[0.68, -0.55, 0.265, 1.55]` or spring physics
- Apply hover variants with `whileHover` on parent

### Task 4: Custom Cursor Component

**File:** `components/common/CustomCursor.tsx` (new)

Implement a custom cursor that follows the mouse:
- Hidden on touch devices
- Scales up when hovering interactive elements
- Smooth following with slight lag (interpolation)
- Optional: different states for different element types

**Implementation:**
- Track mouse position with `useState` and `mousemove` event
- Use Framer Motion's `animate` for smooth position updates
- Add class-based detection for interactive elements
- CSS `pointer-events: none` to prevent interference

### Task 5: Update Existing Sections

Update key sections to use the new animation components:

**Hero.tsx:**
- Apply `AnimatedText` to the main heading
- Use `ScrollRevealWipe` for subtitle/description

**About.tsx / Experience.tsx:**
- Replace `ScrollReveal` with `ScrollRevealWipe` for key content

**Projects.tsx:**
- Add cursor scale effect on project cards

### Task 6: Integrate into Layout

**File:** `app/layout.tsx` or `app/page.tsx`

- Add `CustomCursor` component to root
- Ensure preloader blocks scroll until complete

---

## File Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `components/common/Preloader.tsx` | Modify | Scattered images animation |
| `components/common/ScrollRevealWipe.tsx` | Create | Color wipe reveal |
| `components/common/AnimatedText.tsx` | Create | Character hover animation |
| `components/common/CustomCursor.tsx` | Create | Mouse-following cursor |
| `components/common/index.ts` | Modify | Export new components |
| `app/components/sections/Hero.tsx` | Modify | Use AnimatedText |
| `app/page.tsx` | Modify | Add CustomCursor |
| `lib/constants/animation.ts` | Modify | Add elastic easing constant |

---

## Technical Notes

- Use Framer Motion throughout (already installed)
- No need for GSAP - Framer Motion can achieve same effects
- Elastic easing in Framer Motion: use `type: "spring"` with custom `stiffness` and `damping`
- For wipe effect: use `clipPath` or `transform: translateX` with overflow hidden

---

## Priority Order

1. **Task 2: ScrollRevealWipe** - Most impactful, easiest to implement
2. **Task 3: AnimatedText** - High visual impact for hero
3. **Task 1: Preloader** - First impression but more complex
4. **Task 4: CustomCursor** - Nice touch, lower priority
5. **Task 5 & 6: Integration** - Apply to sections

---

## Questions

- Should the preloader use project images, tech icons, or abstract shapes?
- Preferred wipe color: primary blue (#3b82f6) or accent color?
- Do you want the custom cursor on all pages or just homepage?

---

## Implementation Log

### Completed: 2024-01-26

#### Task 1: Enhanced Preloader (DONE)
**File:** `components/common/Preloader.tsx`

Replaced the basic progress bar preloader with a fraxbit-style scattered elements animation:
- 8 colorful geometric shapes representing tech stack
- **Phase 1 (Scatter):** Elements fly outward from center with rotation
- **Phase 2 (Gather):** Elements return to center and scale up
- **Phase 3 (Exit):** Elements slide up and fade out, revealing page
- Added pulsing loading dots at bottom
- Prevents scroll during preloader

#### Task 2: ScrollRevealWipe (DONE)
**File:** `components/common/ScrollRevealWipe.tsx` (new)

Created color wipe reveal component:
- Supports `left` or `right` direction
- Configurable delay and color (defaults to primary blue)
- Overlay sweeps in, then out, revealing content beneath
- Uses viewport intersection for scroll triggering
- Implemented with Framer Motion's `whileInView`

#### Task 3: AnimatedText (DONE)
**File:** `components/common/AnimatedText.tsx` (new)

Created character-split text animation:
- Splits text into individual character spans
- Characters animate in with spring physics (staggered)
- Each character has hover effect (moves up, changes to primary color)
- Configurable stagger delay and initial delay
- Supports different heading levels (h1-h4, p, span)

#### Task 4: CustomCursor (DONE)
**File:** `components/common/CustomCursor.tsx` (new)

Implemented custom mouse cursor:
- Smooth spring-based following with slight lag
- Scales up on interactive elements (links, buttons)
- Extra scale on `[data-cursor-large]` elements
- Hidden on touch devices
- Mix-blend-difference for visibility on all backgrounds
- Outer ring for visual interest

#### Task 5: Hero Integration (DONE)
**File:** `app/components/sections/Hero.tsx`

Updated Hero section with new components:
- Name uses `AnimatedText` with character hover effects
- Greeting uses `ScrollRevealWipe` (left direction)
- Title uses `ScrollRevealWipe` (right direction)
- Added `data-cursor-hover` to social links
- Added `data-cursor-large` to 3D tech stack area
- Adjusted animation delays for proper sequencing

#### Task 6: Layout Integration (DONE)
**File:** `app/page.tsx`

Added CustomCursor to homepage layout

#### Supporting Changes

**`lib/constants/animation.ts`:**
- Added `EASE_ELASTIC` cubic-bezier for bouncy animations

**`lib/constants/index.ts`:**
- Exported new `EASE_ELASTIC` constant

**`components/common/index.ts`:**
- Added exports for `ScrollRevealWipe`, `AnimatedText`, `CustomCursor`
