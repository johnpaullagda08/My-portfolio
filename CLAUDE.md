# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Create production build
npm run start    # Run production server
npm run lint     # Run ESLint checks
```

## Plan & Review

### Before starting work

- Write a plan to .claude/tasks/TASK_NAME.md.
- The plan should be a detailed implementation plan and the reasoning behind them, as well as tasks broken down.
- Don't over plan it, always think MVP.
- Once you write the plan, firstly ask me to review it. Do not continue until I approve the plan.

### While implementing

- You should update the plan as you work.
- After you complete tasks in the plan, you should update and append detailed descriptions of the changes you made, so following tasks can be easily hand over to other engineers.

## Architecture

This is a Next.js 16 portfolio application using the App Router pattern with React 19, TypeScript, and Tailwind CSS v4.

### Key Structure

- `app/` - Next.js App Router directory containing pages and layouts
  - `layout.tsx` - Root layout with Geist font configuration and metadata
  - `page.tsx` - Homepage component
  - `globals.css` - Global styles with Tailwind imports and CSS custom properties for theming
- `public/` - Static assets (SVG files)

### Technical Stack

- **Framework**: Next.js 16 with App Router (server components by default)
- **Styling**: Tailwind CSS v4 with dark mode support via `prefers-color-scheme`
- **Fonts**: Geist and Geist Mono via next/font
- **Path Alias**: `@/*` maps to project root

## Workflow Guidelines

Before starting work on a task:

1. Write a plan to `.claude/tasks/TASK_NAME.md` with implementation details and reasoning
2. Keep plans MVP-focused
3. Wait for approval before implementing

While implementing:

- Update the plan as you work
- After completing tasks, append detailed change descriptions for handover
