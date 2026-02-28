'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { authClient, useSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';

export default function VerifyEmailPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  if (session?.user?.emailVerified) {
    router.replace('/');
    return null;
  }

  const handleResend = async () => {
    if (!session?.user?.email) return;
    setSending(true);
    setError('');
    const { error: err } = await authClient.sendVerificationEmail({
      email: session.user.email,
      callbackURL: '/',
    });
    setSending(false);
    if (err) {
      setError(err.message ?? 'Failed to resend email');
    } else {
      setSent(true);
    }
  };

  return (
    <motion.div
      className="w-full max-w-sm"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <div className="w-10 h-10 rounded-lg bg-brand/8 flex items-center justify-center mb-6">
          <svg
            className="w-5 h-5 text-brand"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">
          Check your email
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We sent a verification link to{' '}
          <span className="font-medium text-foreground">
            {session?.user?.email ?? 'your email address'}
          </span>
          . Click the link to activate your account.
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive it? Check your spam folder or resend below.
        </p>

        {sent && (
          <p className="text-xs text-green-600 dark:text-green-400">
            Verification email sent.
          </p>
        )}

        {error && <p className="text-xs text-destructive">{error}</p>}

        <Button
          variant="outline"
          onClick={handleResend}
          disabled={sending || !session?.user}
          className="w-full h-10"
        >
          {sending ? 'Sending…' : 'Resend verification email'}
        </Button>
      </div>
    </motion.div>
  );
}
