# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev         # Start development server at http://localhost:3000
npm run build       # Build for production
npm run lint        # Run ESLint
npm run start       # Start production server
npm run test        # Run unit/integration tests (Vitest, single run)
npm run test:watch  # Run Vitest in watch mode
npm run test:e2e    # Run E2E tests (Playwright, requires dev server or CI)
```

Before running E2E tests for the first time, install browser binaries:
```bash
npx playwright install chromium
```

## Architecture

**minut** is a Next.js 16 app with React 19, TypeScript, and Tailwind CSS v4. It is a video conferencing product with planned AI-powered meeting transcription and summaries (Google Meet-style UI).

- **App Router**: Uses Next.js App Router (`app/` directory). All routing follows file-system conventions under `app/`.
- **Styling**: Tailwind CSS v4 via `@import "tailwindcss"` in `globals.css`. Theme tokens defined with `@theme inline`. Geist Sans and Geist Mono loaded via `next/font/google` and exposed as CSS variables (`--font-geist-sans`, `--font-geist-mono`).
- **Path alias**: `@/*` maps to the project root (e.g., `@/app/...`).
- **Client components**: Interactive components use `'use client'` directive (e.g., `app/page.tsx`).

## Testing

- **Unit/integration**: Vitest + React Testing Library. Tests live in `__tests__/` directories. Config in `vitest.config.ts`; setup (jest-dom matchers) in `vitest.setup.ts`.
- **E2E**: Playwright. Tests live in `e2e/`. Config in `playwright.config.ts`. In dev, Playwright spins up `next dev` automatically via `webServer`. In CI, set `CI=true` — it expects the server to already be running or uses the webServer config with no reuse.
- Only `'use client'` components can be rendered directly with RTL. Server Components (async functions without the directive) require a different strategy (e.g., integration tests via Playwright or mocking `next/headers`).

### Current state

The landing page (`app/page.tsx`) is the only route. It renders a hero section with "New meeting" and "Join" flows — both are currently stubs (`TODO` comments). No backend, authentication, or database is wired up yet.
