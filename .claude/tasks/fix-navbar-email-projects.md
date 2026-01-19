# Fix Navbar Scroll Indicator, Email, and Projects Glowing Effect

## Issues Identified

### 1. Navbar Experience Section Indicator Not Working
**Problem**: The Skills section has `id="skills"` placed on an inner `div` (line 61) instead of the outer section element. This causes incorrect scroll detection because the navbar calculates section positions from `element.offsetTop`.

**Solution**: Move the `id="skills"` to wrap the entire section properly.

### 2. Email Sending Not Working
**Problem**: The Resend API is configured with `from: "Portfolio Contact <onboarding@resend.dev>"` which is a test email address. This can only send to the email address that owns the Resend account.

**Solution**:
- For testing: Keep the current setup but ensure the `to` email matches the Resend account owner
- For production: Need to verify a custom domain in Resend dashboard and update the `from` field

### 3. Projects Section - Replace with Aceternity Glowing Effect
**Problem**: User wants to use the official Aceternity glowing-effect component instead of the current custom one.

**Solution**: Install `@aceternity/glowing-effect` from shadcn registry and update Projects component.

## Implementation Tasks

- [ ] Fix Skills section `id` placement for proper navbar scroll detection
- [ ] Update contact API with better error handling and instructions
- [ ] Install Aceternity glowing-effect component
- [ ] Update Projects component to use new glowing effect

## Changes Log

### Completed Changes

#### 1. Fixed Skills Section ID Placement
- **File**: `app/components/Skills.tsx`
- **Change**: Moved `id="skills"` from inner `<div>` to wrap the entire section with `<section id="skills">`
- **Reason**: The navbar scroll detection uses `element.offsetTop` which requires the ID on the outermost element

#### 2. Updated Contact API
- **File**: `app/api/contact/route.ts`
- **Change**: Added documentation comments explaining Resend setup requirements and improved error messages
- **Note**: For production, user needs to:
  1. Verify a domain in Resend dashboard
  2. Change the `from` address to use the verified domain

#### 3. Installed Aceternity Glowing Effect
- **Command**: `npx shadcn@latest add "https://ui.aceternity.com/registry/glowing-effect.json"`
- **Additional**: Installed `motion` package (required by the component)

#### 4. Updated Projects Component
- **File**: `app/components/Projects.tsx`
- **Changes**:
  - Replaced old `GlowingEffect` wrapper with new Aceternity component
  - Removed `BackgroundGradient` wrapper
  - New component placed inside relative container with `disabled={false}`, `glow={true}`, `spread={40}`, `proximity={64}`

#### 5. Updated Skills Component
- **File**: `app/components/Skills.tsx`
- **Changes**:
  - Replaced old `GlowingEffect` + `BackgroundGradient` with new Aceternity component
  - Same configuration as Projects component
