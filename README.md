# minut

**minut** is to LiveKit what Resend is to email infrastructure.

LiveKit is powerful — but integrating WebRTC conferencing, AI transcription, and meeting intelligence into a product is still deeply complex. minut abstracts all of that into a simple, developer-friendly experience: a no-code dashboard for businesses and a three-line API call for developers.

-----

## Table of Contents

- [Overview](#overview)
- [Products](#products)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Webhooks](#webhooks)
- [Environment Variables](#environment-variables)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

-----

## Overview

Adding video conferencing with AI capabilities to a product today requires running LiveKit infrastructure, building pre-join and room UI, wiring up speech-to-text, storing transcripts and summaries, and handling recording egress at scale. Most teams skip it entirely, pay for closed ecosystems like Zoom embeds, or spend months on bespoke infrastructure.

minut solves this. It sits as a product and API layer on top of LiveKit, owning:

- The UI (pre-join, room, controls, post-meeting flows)
- The AI pipeline (transcription → summary → storage)
- The developer experience (REST API, SDKs, webhooks)
- The multi-tenant platform (workspaces, API keys, billing, branding)

A customer using minut never needs to know LiveKit exists.

-----

## Products

### minut Dashboard — for businesses

A white-label video conferencing product that businesses can deploy in minutes.

- Deploy on a custom subdomain (e.g. `meet.acme.com`)
- Bring your own branding — logo, colours, domain
- AI transcription and meeting summaries out of the box
- Usage dashboard: minutes used, recordings, transcripts, billing
- No code required — configure via dashboard, invite your team

**Target customers:** SaaS products, agencies, enterprises, HR platforms, legal tech, telemedicine — any company that wants to offer its own video conferencing.

-----

### minut API / SDK — for developers

Embed video conferencing and AI meeting intelligence into any application with a few lines of code.

```typescript
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

- REST API with SDKs in TypeScript and Python
- Webhooks for `meeting.started`, `meeting.ended`, `transcript.ready`, `summary.ready`
- Embeddable React / Web Component UI, or go fully headless
- Works with any auth system — just pass a user identifier

**Target customers:** Developers building coaching platforms, recruiting tools, sales tooling, customer success products, or AI agents that need conferencing.

-----

## Tech Stack

- **Framework** — [Next.js](https://nextjs.org/) (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **Video infrastructure** — [LiveKit](https://livekit.io/)
- **Transcription** — Whisper / Deepgram
- **Summarisation** — Claude API
- **Payments & metering** — Stripe
- **Database** — Postgres
- **Webhooks** — Custom delivery layer

-----

## Getting Started

### Prerequisites

- Node.js 18.x or later
- A [LiveKit](https://livekit.io/) account (Cloud or self-hosted)
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/your-org/minut.git
cd minut
npm install
```

### Running locally

```bash
npm run dev
```

Open <http://localhost:3000> in your browser.

### Building for production

```bash
npm run build
npm run start
```

-----

## Project Structure

```
minut/
├── app/                    # Next.js App Router
│   ├── dashboard/          # Business dashboard (usage, recordings, billing)
│   ├── room/               # Video room UI (pre-join, in-call, post-meeting)
│   └── api/                # Internal API routes
├── lib/
│   ├── livekit.ts          # LiveKit client and server utilities
│   ├── ai-pipeline.ts      # Transcription → summary pipeline
│   ├── billing.ts          # Usage metering and Stripe integration
│   └── webhooks.ts         # Webhook delivery
├── components/             # Shared UI components
├── sdk/                    # Public TypeScript SDK (minut npm package)
├── config/                 # Platform configuration
└── public/                 # Static assets
```

-----

## API Reference

All API requests are authenticated with an API key passed as a Bearer token.

```
Authorization: Bearer mk_live_...
```

### Rooms

|Method  |Endpoint             |Description                 |
|--------|---------------------|----------------------------|
|`POST`  |`/v1/rooms`          |Create a new meeting room   |
|`GET`   |`/v1/rooms/:id`      |Get room details            |
|`DELETE`|`/v1/rooms/:id`      |End and close a room        |
|`POST`  |`/v1/rooms/:id/token`|Generate a participant token|

### Recordings & Transcripts

|Method|Endpoint                    |Description                           |
|------|----------------------------|--------------------------------------|
|`GET` |`/v1/recordings`            |List recordings                       |
|`GET` |`/v1/recordings/:id`        |Get recording details and download URL|
|`GET` |`/v1/transcripts/:meetingId`|Get transcript for a meeting          |
|`GET` |`/v1/summaries/:meetingId`  |Get AI summary for a meeting          |

Full API documentation: [docs.minut.dev](https://docs.minut.dev) *(coming soon)*

-----

## Webhooks

minut sends `POST` requests to your configured webhook URL for the following events:

|Event             |Description                            |
|------------------|---------------------------------------|
|`meeting.started` |A room session has begun               |
|`meeting.ended`   |All participants have left             |
|`transcript.ready`|Transcription is complete and available|
|`summary.ready`   |AI summary is complete and available   |

Each payload includes a `minut-signature` header for verification.

-----

## Environment Variables

Create a `.env.local` file at the project root:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# LiveKit
LIVEKIT_API_KEY=...
LIVEKIT_API_SECRET=...
LIVEKIT_URL=wss://your-project.livekit.cloud

# AI
OPENAI_API_KEY=...          # For Whisper transcription
ANTHROPIC_API_KEY=...       # For meeting summarisation

# Database
DATABASE_URL=postgresql://...

# Stripe
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

-----

## Roadmap

The current app is the foundation and reference implementation — it proves the product works end-to-end. The platform roadmap adds:

- [ ] Multi-tenancy (workspaces / organisations)
- [ ] API key management
- [ ] Public REST API and webhooks
- [ ] AI pipeline (transcription → summary)
- [ ] Billing and usage metering (participant-minutes, recording-minutes, AI tokens)
- [ ] Custom branding and subdomain support
- [ ] Python SDK
- [ ] Embeddable Web Component

See [`ROADMAP.md`](ROADMAP.md) for the full technical execution plan.

-----

## Contributing

Contributions are welcome. Please open an issue first to discuss what you’d like to change.

1. Fork the repo
1. Create a feature branch (`git checkout -b feature/my-feature`)
1. Commit your changes (`git commit -m 'feat: add my feature'`)
1. Push to the branch (`git push origin feature/my-feature`)
1. Open a Pull Request

-----

## License

[MIT](LICENSE)

-----

*minut — conferencing infrastructure, without the infrastructure.*