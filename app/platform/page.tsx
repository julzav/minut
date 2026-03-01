'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Blocks, Code2, Zap, Clock, Brain } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const dashboardFeatures = [
  'Deploy on your own subdomain',
  'Custom logo and brand colours',
  'AI transcription and summaries',
  'Usage and billing dashboard',
  'Invite your team — no code required',
];

const apiFeatures = [
  'REST API with TypeScript SDK',
  'Embeddable React components',
  'Webhooks for every meeting event',
  'Headless mode — bring your own UI',
  'Sandbox / test mode',
];

const pricing = [
  {
    icon: Clock,
    label: 'WebRTC minutes',
    description: 'Billed per participant-minute inside a room.',
    detail: 'Scales with usage — pay only for what you use.',
  },
  {
    icon: Zap,
    label: 'Recording minutes',
    description: 'Billed per minute of stored recording egress.',
    detail: 'Includes storage and playback infrastructure.',
  },
  {
    icon: Brain,
    label: 'AI tokens',
    description: 'Billed per 1,000 tokens for transcription and summarisation.',
    detail: 'Powered by Whisper + Claude. Detailed, accurate, fast.',
  },
];

const codeExample = `import { Minut } from '@minut/sdk';

const minut = new Minut({ apiKey: process.env.MINUT_API_KEY });

// Create a room with AI enabled
const room = await minut.rooms.create({
  name: 'onboarding-call',
  ai: { transcription: true, summary: true },
});

// Mint a participant token
const token = await minut.rooms.token(room.id, {
  participant: { name: 'Alice', role: 'host' },
});

// Embed the room — one component, fully branded
// <MinutRoom token={token} />

// Receive results via webhook after the call
// POST /webhooks/minut
// {
//   event: 'meeting.ended',
//   transcript: [...],
//   summary: { decisions: [...], actions: [...] }
// }`;

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <span className="font-semibold text-foreground tracking-tight">minut</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
          <motion.div
            className="max-w-3xl"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/20 bg-brand/5 text-brand text-xs font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                For developers &amp; teams
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.08] mb-6"
            >
              Add video conferencing
              <br />
              <span className="text-muted-foreground font-light">to any product.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed"
            >
              minut abstracts LiveKit, WebRTC, and AI transcription into a simple
              API and dashboard. Ship your own branded video conferencing in minutes,
              not months.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <Button asChild className="h-11 px-5 gap-2">
                <Link href="/sign-up">
                  Request early access
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to minut
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Two paths */}
        <section className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-12"
            >
              Two ways to use minut
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dashboard */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="border border-border rounded-xl p-8"
              >
                <div className="w-10 h-10 rounded-lg bg-brand/8 flex items-center justify-center mb-6">
                  <Blocks className="w-5 h-5 text-brand" />
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                  Dashboard
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-3">
                  For teams &amp; businesses
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  Deploy your own video conferencing on a custom subdomain with
                  full brand control — logo, colours, domain. No code required.
                  Think of it as your own Google Meet, powered by minut.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {dashboardFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-brand shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground">
                  Coming soon — join early access
                </span>
              </motion.div>

              {/* API */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="border border-border rounded-xl p-8"
              >
                <div className="w-10 h-10 rounded-lg bg-brand/8 flex items-center justify-center mb-6">
                  <Code2 className="w-5 h-5 text-brand" />
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                  API &amp; SDK
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-3">
                  For developers
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  Integrate video conferencing and AI meeting intelligence into
                  any application with a few lines of code. REST API, TypeScript
                  SDK, embeddable components, and webhooks for every meeting event.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {apiFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-brand shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground">
                  Coming soon — join early access
                </span>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Code example */}
        <section className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-12"
            >
              As simple as it gets
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                <h2 className="text-3xl font-semibold tracking-tight text-foreground leading-snug mb-4">
                  From zero to live room
                  <br />
                  <span className="text-muted-foreground font-light">in under a minute.</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Create a room, mint a participant token, embed the component.
                  AI transcription and summaries are delivered to your webhook
                  after the call ends — no pipeline to build.
                </p>
                <div className="space-y-4">
                  {[
                    { n: '01', t: 'Create a room', d: 'One API call returns a room ID and shareable join URL.' },
                    { n: '02', t: 'Mint tokens', d: 'Generate scoped participant tokens server-side for any user.' },
                    { n: '03', t: 'Receive AI output', d: 'Transcript and summary arrive at your webhook when the meeting ends.' },
                  ].map((s) => (
                    <div key={s.n} className="flex gap-4">
                      <span className="text-xl font-light text-brand/30 tabular-nums shrink-0 w-6">{s.n}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground mb-0.5">{s.t}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
                <pre className="rounded-xl bg-zinc-950 px-6 py-5 font-mono text-xs text-zinc-400 leading-relaxed overflow-x-auto">
                  {codeExample}
                </pre>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Pricing pillars */}
        <section className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-12"
            >
              Usage-based pricing
            </motion.p>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold tracking-tight text-foreground mb-2"
            >
              Pay for what you use.
              <span className="text-muted-foreground font-light"> Nothing else.</span>
            </motion.p>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-sm text-muted-foreground mb-12 max-w-md"
            >
              Generous free tier to get started. Three simple meters — no surprise bills.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {pricing.map((p) => (
                <motion.div
                  key={p.label}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-brand/8 flex items-center justify-center mb-5">
                    <p.icon className="w-5 h-5 text-brand" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{p.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">{p.description}</p>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed">{p.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
              Get early access.
            </h2>
            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
              The API and dashboard are in development. Sign up and we&apos;ll
              reach out when you can start building.
            </p>
            <Button asChild className="h-11 px-5 gap-2">
              <Link href="/sign-up">
                Request early access
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-brand rounded-full flex items-center justify-center">
              <span className="text-white font-bold" style={{ fontSize: '9px' }}>M</span>
            </div>
            <span>&copy; 2026 minut</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
