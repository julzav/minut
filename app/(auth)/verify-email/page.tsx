'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient, useSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <CardTitle className="text-2xl">Check your email</CardTitle>
        <CardDescription>
          We sent a verification link to{' '}
          <span className="font-medium text-foreground">
            {session?.user?.email ?? 'your email address'}
          </span>
          . Click the link to activate your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive it? Check your spam folder or resend below.
        </p>

        {sent && (
          <p className="text-sm text-green-600 dark:text-green-400">
            Verification email sent!
          </p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          variant="outline"
          onClick={handleResend}
          disabled={sending || !session?.user}
          className="w-full"
        >
          {sending ? 'Sending…' : 'Resend verification email'}
        </Button>
      </CardContent>
    </Card>
  );
}
