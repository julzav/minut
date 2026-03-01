import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { ModeToggle } from '@/components/mode-toggle';
import { SignOutButton } from './sign-out-button';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/sign-in');

  const initials = session.user.name
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <span className="font-semibold text-foreground tracking-tight">minut</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand rounded-full flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs">{initials}</span>
            </div>
            <span className="text-sm text-muted-foreground hidden sm:block">
              {session.user.name}
            </span>
            <SignOutButton />
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
