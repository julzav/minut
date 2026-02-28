# minut — Product Vision

## The pitch

**minut is to LiveKit what Resend is to email infrastructure.**

LiveKit is powerful, but integrating WebRTC conferencing, AI transcription, and meeting intelligence into a product is still deeply complex. minut abstracts all of that into a simple, elegant experience — whether you want a no-code dashboard or a three-line API call.

---

## The problem

Adding video conferencing with AI capabilities to a product today requires:

- Running and maintaining LiveKit infrastructure
- Building UI for pre-join, room, controls, and post-meeting flows
- Wiring up speech-to-text (Whisper, Deepgram, etc.) to LiveKit data channels
- Storing, indexing, and surfacing transcripts and summaries
- Handling recording egress, WebRTC quality, and scale

Most teams either skip it entirely, pay for Zoom/Meet embeds (closed ecosystems), or spend months building bespoke infrastructure. There is no Resend-equivalent for conferencing.

---

## The solution

minut provides two products built on the same infrastructure:

### 1. minut Dashboard — for businesses

A white-label video conferencing product that businesses can deploy in minutes. Think "your own Google Meet".

- Deploy on a custom subdomain (e.g. `meet.acme.com`)
- Bring your own branding — logo, colors, domain
- AI transcription and meeting summaries out of the box
- Usage dashboard: minutes used, recordings, transcripts, billing
- No code required — configure via dashboard, invite your team

**Target customers:** companies that want to tell their customers "we have our own video conferencing" — SaaS products, agencies, enterprises, HR platforms, legal tech, telemedicine.

### 2. minut API / SDK — for developers

Embed video conferencing and AI meeting intelligence into any application with a few lines of code.

```ts
// Create a meeting room
const room = await minut.rooms.create({ name: 'onboarding-call' });

// Generate a participant token
const token = await minut.rooms.token(room.id, {
  participant: { name: 'Alice', role: 'host' },
});

// Receive events via webhook
// POST /webhooks/minut
// { event: 'meeting.ended', transcript: [...], summary: '...' }
```

- REST API with SDKs in TypeScript, Python (and more)
- Webhooks for `meeting.started`, `meeting.ended`, `transcript.ready`, `summary.ready`
- Embed UI components (React, Web Component) or go fully headless
- Works with any auth system — just pass a user identifier

**Target customers:** developers building products that need conferencing — coaching platforms, recruiting tools, sales tooling, customer success, developer tools, AI agents.

---

## Business model

Revenue is metered across three dimensions:

| Dimension | What's metered | Notes |
|---|---|---|
| **WebRTC minutes** | Participant-minutes in a room | Core conferencing usage |
| **Recording minutes** | Minutes of stored recordings | Via LiveKit Egress |
| **AI tokens** | Transcription + summarization | Whisper/Deepgram + Claude API |

**Pricing approach:**
- Generous free tier to drive adoption (similar to Resend's free tier)
- Pay-as-you-go above the free tier
- Volume discounts and committed plans for enterprise
- Dashboard product: flat monthly fee + usage on top

---

## How minut relates to LiveKit

minut is **not** a LiveKit competitor — it is a LiveKit abstraction layer. LiveKit handles the WebRTC infrastructure (media servers, SFUs, signaling). minut owns:

- The product layer on top (UI, API, SDK)
- The AI pipeline (transcription → summary → storage)
- The developer and business experience (auth, billing, webhooks, branding)
- The multi-tenant platform (workspaces, API keys, usage metering)

A customer using minut never needs to know LiveKit exists.

---

## What this means for the codebase

The current minut app is the **foundation and reference implementation** — it proves the product works end-to-end. The platform roadmap builds on top of it by adding:

1. Multi-tenancy (workspaces / organisations)
2. API key management
3. The developer API and webhooks
4. AI pipeline (transcription → summary)
5. Billing and usage metering
6. Custom branding / subdomain support

See `ROADMAP.md` for the technical execution plan.
