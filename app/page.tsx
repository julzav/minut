'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Video, Mic, ClipboardCheck, Shield, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession, signOut } from '@/lib/auth-client';

function generateRoomId(): string {
  const segment = (len: number) =>
    Math.random().toString(36).slice(2, 2 + len).padEnd(len, '0');
  return `${segment(3)}-${segment(4)}-${segment(3)}`;
}

function UserAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div className="w-7 h-7 bg-brand rounded-full flex items-center justify-center shrink-0">
      <span className="text-white font-bold text-xs">{initials}</span>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const features = [
  {
    icon: Mic,
    title: 'AI Transcription',
    description:
      'Real-time transcription with speaker identification and precise timestamps.',
  },
  {
    icon: ClipboardCheck,
    title: 'Smart Minutes',
    description:
      'Structured summaries with action items and key decisions — generated automatically.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description:
      'End-to-end encrypted meetings with secure cloud storage for your transcripts.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Start or join a meeting',
    description:
      'Create a room in one click or enter an existing meeting code.',
  },
  {
    number: '02',
    title: 'AI transcribes in real time',
    description:
      'Every word captured automatically — no manual note-taking required.',
  },
  {
    number: '03',
    title: 'Get your minutes instantly',
    description:
      'Receive a structured summary with decisions and action items after each call.',
  },
];

export default function Page() {
  const router = useRouter();
  const [meetingCode, setMeetingCode] = useState('');
  const { data: session } = useSession();

  const handleNewMeeting = () => router.push(`/room/${generateRoomId()}`);

  const handleJoinMeeting = () => {
    if (meetingCode.trim()) router.push(`/room/${meetingCode.trim()}`);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <span className="font-semibold text-foreground tracking-tight">minut</span>
          </div>

          <div className="flex items-center gap-2">
            {session?.user ? (
              <>
                <UserAvatar name={session.user.name} />
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {session.user.name}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  Sign out
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
            )}
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
            {/* Badge */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/20 bg-brand/5 text-brand text-xs font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                AI-powered meeting intelligence
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.08] mb-6"
            >
              Meet smarter.
              <br />
              <span className="text-muted-foreground font-light">
                Leave with minutes.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed"
            >
              AI-generated transcripts, decisions and action items for every
              meeting — automatically, no effort required.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <Button
                onClick={handleNewMeeting}
                className="h-11 px-5 text-sm font-medium gap-2"
              >
                <Video className="w-4 h-4" />
                New meeting
              </Button>

              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={meetingCode}
                  onChange={(e) => setMeetingCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleJoinMeeting()}
                  placeholder="Enter a code"
                  className="h-11 w-44 text-sm"
                />
                <Button
                  variant="ghost"
                  onClick={handleJoinMeeting}
                  disabled={!meetingCode.trim()}
                  className="h-11 px-4 text-sm"
                >
                  Join
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features */}
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
              What you get
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {features.map((f) => (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-brand/8 flex items-center justify-center mb-5">
                    <f.icon className="w-5 h-5 text-brand" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* How it works */}
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
              How it works
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {steps.map((step) => (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-4xl font-light text-brand/25 tabular-nums mb-4 block">
                    {step.number}
                  </span>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA — only when signed out */}
        {!session?.user && (
          <section className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
                Ready to meet smarter?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
                Create an account in seconds — no credit card required.
              </p>
              <Button asChild className="h-11 px-5 gap-2">
                <Link href="/sign-up">
                  Get started free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </section>
        )}
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
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
