# Portfolio Website for John Paul Lagda

## Overview

Build a premium portfolio website with dark theme inspired by fraxbit.com, showcasing John Paul Lagda's experience as a Full Stack Web Developer.

## Tech Stack

- **Next.js 16** - App Router (already configured)
- **Tailwind CSS v4** - Styling (already configured)
- **shadcn/ui** - Component library (to be added)
- **Framer Motion** - Scroll reveal animations
- **Vercel** - Deployment

## Design Direction

**Inspired by:** fraxbit.com

### Color Scheme (60% Dark / 40% Light, no pure white)
- **Primary Dark:** `#0a0a0a` (near black)
- **Secondary Dark:** `#1a1a1a` (dark gray)
- **Light Accent:** `#e5e5e5` (light gray, not white)
- **Text Light:** `#d4d4d4` (soft gray for readability)
- **Accent Color:** TBD (blue or custom - works well with dark themes)

### Effects
- Scroll reveal animations (fade-in, slide-up as sections enter viewport)
- Smooth hover transitions on cards and buttons
- Subtle parallax effects

### Typography
- Bold headlines, clean body text
- Using Geist font (already configured)

---

## Profile Data

- **Name:** John Paul Lagda
- **Title:** Web Developer
- **Email:** japs03081995@gmail.com
- **Phone:** +639524839511
- **Location:** Anabu I-G, Apple town Imus Cavite
- **GitHub:** https://github.com/johnpaullagda08
- **LinkedIn:** https://www.linkedin.com/in/john-paul-lagda-7aa0451b2/

---

## Implementation Plan

### Task 1: Setup shadcn/ui and Framer Motion
- Initialize shadcn/ui with dark theme
- Install framer-motion for animations
- Configure dark color palette in Tailwind/CSS

### Task 2: Create reusable components
- ScrollReveal wrapper component (framer-motion)
- Section container component
- Project card component

### Task 3: Build Navbar
- Fixed position, minimal design
- Logo/name on left
- Navigation links (About, Skills, Experience, Projects, Contact)
- CTA button (Contact Me or Download CV)

### Task 4: Build Hero section
- Large bold name and title
- Brief tagline
- Social links (GitHub, LinkedIn)
- Scroll indicator

### Task 5: Build About section
- Professional summary
- Photo placeholder
- Key highlights/stats (years experience, projects count)

### Task 6: Build Skills section
Display in categorized cards:
- **Frontend:** HTML, CSS, JavaScript, Bootstrap, Vuetify, Vue, jQuery, ReactJS
- **Backend:** Node.js, Express.js, PHP
- **Databases:** MySQL, NoSQL, MSSQL
- **Tools:** VS Code, GitLab, GitHub, NPM, Yarn, REST API

### Task 7: Build Experience section
Timeline layout:
1. **HRD Singapore PTE LTD** (Jan 2018 - Present)
   - Full Stack Web Developer
   - Key responsibilities and achievements
2. **DATACOM** (June 2011 - May 2013)
   - Computer Programmer

### Task 8: Build Projects section
Card grid layout with 14 projects:

**Vue/Node.js Stack:**
- Homes System - Admin system for all departments
- Tachibana Rendering System - Auto PDF rendering
- IHS Q&A System - Developer help system
- Awarding System - Automatic PDF generation

**PHP/MySQL Stack:**
- Mailing Monitoring System - Automated email with plans
- Error Guide System - Autocad/Architrend error monitoring
- Denki Pattern - Electrical items with auto email
- Kansen Proposal - Auto data gathering and email
- Wiring Connection Workguide - Process workguide
- Unit Wiring Supplies - Inventory system
- Re-Email Henkou - Email with PDF attachments
- Survey System - Resignation/activities surveys
- Borrowing System - Item borrowing tracker
- Unit Wiring Message - Team messaging

Each card: project name, description, tech tags, hover effect

### Task 9: Build Contact section
- Contact info display
- Social links
- Optional: simple contact form UI

### Task 10: Final polish and deploy
- Test responsiveness (mobile, tablet, desktop)
- Optimize images
- Deploy to Vercel

---

## File Structure

```
app/
├── page.tsx              # Main portfolio page
├── layout.tsx            # Root layout (keep existing)
├── globals.css           # Update with dark theme colors
├── components/
│   ├── ui/               # shadcn components
│   ├── ScrollReveal.tsx  # Animation wrapper
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   └── Contact.tsx
└── lib/
    └── utils.ts          # shadcn utility (cn function)
```

---

## Status: COMPLETED

### Implementation Summary

All sections have been built:
- **Navbar** - Fixed, minimal with mobile menu
- **Hero** - Bold name, title, social links, scroll indicator
- **About** - Summary, photo placeholder, stats (7+ years, 14+ projects, 15+ technologies)
- **Skills** - 4 category cards (Frontend, Backend, Databases, Tools)
- **Experience** - Timeline layout with HRD Singapore and DATACOM
- **Projects** - Grid of 14 project cards with tech tags
- **Contact** - Email/LinkedIn buttons, contact info cards
- **Footer** - Copyright and social links

### Files Created
- `app/components/` - All section components
- `lib/data.ts` - Profile, skills, experience, and projects data
- `app/globals.css` - Dark theme color scheme

### Next Steps
1. Run `npm run dev` to preview at localhost:3000
2. Add your photo to `public/` and update About component
3. Deploy to Vercel with `vercel` command or connect GitHub repo
