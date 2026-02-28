# minut — Roadmap

Technical execution plan. See `VISION.md` for product positioning and business model.

Items within each phase are roughly priority-ordered.

---

## Phase 0 — Foundation (shipped)

The reference implementation: a working end-to-end conferencing app.

- [x] LiveKit room + VideoConference UI
- [x] Pre-join screen with name/AV preview
- [x] Auth (email/password + Google OAuth, email verification, password reset)
- [x] Database schema (users, sessions, accounts, meetings)
- [x] Landing page — editorial design, feature sections, animations
- [x] Auth pages — sign in, sign up, verify email, forgot/reset password
- [x] Dark mode (class-based, system default)
- [x] Sonner toasts across auth and room flows
- [x] Sentry error monitoring
- [x] Room middleware guard (session + email verification)

---

## Phase 1 — Platform Core

Transform the single-tenant app into a multi-tenant platform. This unlocks both product lines.

### Multi-tenancy
- [ ] `workspaces` table — an organisation/project boundary (name, slug, plan, owner)
- [ ] `workspace_members` table — roles (owner, admin, member)
- [ ] Workspace context in middleware — resolve workspace from subdomain or path prefix
- [ ] Workspace creation flow (onboarding)

### API Keys
- [ ] `api_keys` table — hashed keys scoped to a workspace
- [ ] Key generation UI in dashboard
- [ ] API key authentication middleware for REST API routes
- [ ] Key rotation and revocation

### Usage Metering
- [ ] `usage_events` table — participant-minutes, recording-minutes, AI tokens
- [ ] LiveKit webhook receiver → record participant join/leave events
- [ ] Usage aggregation (per workspace, per billing period)

---

## Phase 2 — AI Pipeline

The core value proposition. Everything else is table stakes; this is the moat.

### Transcription
- [ ] LiveKit Egress → audio track recording per meeting
- [ ] Whisper (or Deepgram) transcription job triggered on meeting end
- [ ] `transcripts` table — segments with speaker, timestamp, text
- [ ] Real-time partial transcripts via LiveKit data channels (stretch)

### Summarisation
- [ ] Post-meeting summary generation (Claude API)
- [ ] Structured output: summary, action items, decisions, key moments
- [ ] `summaries` table linked to `meetings`
- [ ] Webhook dispatch: `transcript.ready`, `summary.ready`

### Meeting History
- [ ] Meeting detail page — transcript + summary display
- [ ] Meeting history list (per workspace / per user)
- [ ] Export: transcript as Markdown/PDF, summary as PDF

---

## Phase 3 — Developer API

The developer product line. Makes minut integratable from any stack.

### REST API
- [ ] `POST /v1/rooms` — create a room (returns roomId, join URL)
- [ ] `POST /v1/rooms/:id/token` — mint a participant token
- [ ] `GET /v1/rooms/:id` — room status and metadata
- [ ] `GET /v1/meetings` — list meetings for a workspace
- [ ] `GET /v1/meetings/:id/transcript` — fetch transcript
- [ ] `GET /v1/meetings/:id/summary` — fetch summary
- [ ] API versioning strategy

### Webhooks
- [ ] `webhook_endpoints` table — URLs + signing secret per workspace
- [ ] Webhook delivery: `meeting.started`, `meeting.ended`, `transcript.ready`, `summary.ready`
- [ ] Retry logic with exponential backoff
- [ ] Delivery log in dashboard

### SDK
- [ ] TypeScript/JavaScript SDK (`@minut/sdk`)
- [ ] Python SDK (`minut-python`)
- [ ] Embeddable React component (`@minut/react`) — drop-in `<MinutRoom />` component
- [ ] Headless mode (BYO UI, SDK handles token + connection management)

### Developer Experience
- [ ] API reference documentation (OpenAPI spec + rendered docs)
- [ ] Quickstart guides (Next.js, React, Python, plain JS)
- [ ] Sandbox / test mode (no billable events)
- [ ] API playground in dashboard

---

## Phase 4 — Dashboard Product

The business product line. White-label conferencing for non-technical buyers.

### Workspace Dashboard
- [ ] Usage overview (minutes, recordings, AI usage, cost)
- [ ] Meeting list with status, duration, participants
- [ ] Billing page — current plan, usage this period, invoices

### Custom Branding
- [ ] Logo upload + primary colour override per workspace
- [ ] Custom subdomain support (`meet.acme.com` → minut infra)
- [ ] Custom email sender for meeting invites
- [ ] Branded pre-join and in-room UI (theming via CSS variables)

### Meeting Management
- [ ] Schedule a meeting (future date/time, shareable link)
- [ ] Invite participants by email (Resend)
- [ ] Waiting room / lobby (host admits participants)
- [ ] Meeting password / access control

### Room Improvements
- [ ] Screen sharing
- [ ] In-room chat panel (LiveKit data channel)
- [ ] Participant list panel
- [ ] Raise hand / reactions

---

## Phase 5 — Billing & Monetisation

- [ ] Stripe integration — subscriptions + usage-based billing
- [ ] Plan enforcement (free tier limits, paid tier unlocks)
- [ ] Usage alerts (email when approaching limits)
- [ ] Invoicing and receipt emails
- [ ] Enterprise contracts (custom pricing, SLA, invoicing)

---

## Phase 6 — Scale & Quality

- [ ] CI/CD pipeline (GitHub Actions: lint → test → build → deploy)
- [ ] Preview deployments (Vercel)
- [ ] Environment variable validation (`@t3-oss/env-nextjs`)
- [ ] E2E tests: sign-up → create room → join → meeting ends → transcript ready
- [ ] Load testing (concurrent rooms, participant limits)
- [ ] Rate limiting on API and auth endpoints
- [ ] SOC 2 Type I groundwork (access logging, data retention policies)

---

## Parking Lot / Future

- [ ] GitHub OAuth (developer-audience product)
- [ ] Internationalisation (next-intl, EN + ES)
- [ ] Recording playback in-dashboard
- [ ] Mobile SDK (React Native + LiveKit)
- [ ] Teams / organisation hierarchy (sub-workspaces)
- [ ] Zapier / Make integrations
- [ ] AI notetaker bot that joins third-party meetings (Google Meet, Zoom)
- [ ] Custom AI models (BYOK — bring your own Claude/OpenAI key)
