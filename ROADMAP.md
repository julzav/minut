# minut — Roadmap

Feature backlog and planned work. Items within each milestone are roughly priority-ordered.

---

## Milestone 1 — Polish & Growth (current focus)

### UI Redesign
- [ ] Rework landing page with modern design (hero, feature sections, CTA, footer)
- [ ] Consistent design system: typography scale, spacing, color tokens in Tailwind v4 `@theme`
- [ ] Animated elements (Framer Motion or CSS animations)
- [ ] Dark mode support
- [ ] Responsive / mobile-first layout audit

### Auth Enhancements
- [ ] Google OAuth (social sign-in via better-auth Google provider)
- [ ] GitHub OAuth (optional, good for dev-audience product)
- [ ] Remember-me / persistent sessions

### Internationalization (i18n)
- [ ] Set up `next-intl` (recommended for App Router)
- [ ] Initial locales: English (`en`) and Spanish (`es`)
- [ ] Locale detection + switcher UI component
- [ ] Translate: landing page, auth pages, room UI labels

### Observability
- [ ] Sentry integration (error tracking + performance)
  - Client-side: `Sentry.init` in `instrumentation-client.ts`
  - Server-side: Next.js instrumentation hook (`instrumentation.ts`)
  - Source maps upload in CI
- [ ] Basic analytics (Vercel Analytics or Plausible — privacy-friendly)

---

## Milestone 2 — Core Product

### AI Meeting Features
- [ ] Real-time transcription via LiveKit data channels + Whisper/Deepgram
- [ ] Post-meeting summary generation (Claude API)
- [ ] Transcript storage in DB (`transcripts` table, linked to `meetings`)
- [ ] Summary display page per meeting

### Meeting Management
- [ ] Meeting history page (list past meetings for the user)
- [ ] Meeting detail page (transcript + summary)
- [ ] Schedule a meeting (future date/time, shareable link)
- [ ] Invite participants by email

### Room Improvements
- [ ] Screen sharing
- [ ] Chat panel (LiveKit data channel)
- [ ] Participant list panel
- [ ] Mute/video controls redesign
- [ ] Waiting room / lobby

---

## Milestone 3 — Scale & Quality

### Infrastructure
- [ ] CI/CD pipeline (GitHub Actions: lint → test → build → deploy)
- [ ] Preview deployments (Vercel)
- [ ] Environment variable validation with `@t3-oss/env-nextjs` or `zod`

### Testing
- [ ] Expand unit tests for auth flows
- [ ] E2E tests for sign-up → room join happy path
- [ ] E2E tests for i18n locale switching

### Other
- [ ] Terms of Service + Privacy Policy pages
- [ ] Email templates (Resend React Email)
- [ ] Rate limiting on auth endpoints
- [ ] Webhook support (meeting ended events)

---

## Ideas / Parking Lot

- [ ] Teams / organizations (multi-tenant)
- [ ] Custom meeting backgrounds (virtual backgrounds)
- [ ] Recording (LiveKit Egress)
- [ ] Zapier / Make integrations
- [ ] Mobile apps (React Native + LiveKit)
