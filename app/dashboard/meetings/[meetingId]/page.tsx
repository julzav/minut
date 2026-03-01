import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { eq, and } from 'drizzle-orm';
import { Video, ArrowLeft, FileText, Mic, ClipboardList, Users } from 'lucide-react';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { meetings } from '@/db/schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

function formatDurationMs(ms: number): string {
  if (ms <= 0) return '—';
  const mins = Math.floor(ms / 60000);
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function ComingSoonTab({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ meetingId: string }>;
}) {
  const { meetingId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session!.user.id;

  const meeting = await db.query.meetings.findFirst({
    where: and(eq(meetings.id, meetingId), eq(meetings.hostId, userId)),
    with: { meetingSessions: true },
  });

  if (!meeting) notFound();

  const totalDurationMs = meeting.meetingSessions.reduce((sum, s) => {
    if (!s.endedAt) return sum;
    return sum + (s.endedAt.getTime() - s.startedAt.getTime());
  }, 0);

  const sessionCount = meeting.meetingSessions.length;

  return (
    <div>
      {/* Back */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        My meetings
      </Link>

      {/* Title + status */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          {meeting.title ?? 'Untitled meeting'}
        </h1>
        <div className="flex items-center gap-3 shrink-0">
          <Badge
            variant={meeting.status === 'active' ? 'default' : 'secondary'}
            className="capitalize"
          >
            {meeting.status}
          </Badge>
          {meeting.status === 'active' && (
            <Button asChild size="sm" className="gap-2">
              <Link href={`/room/${meeting.roomId}`}>
                <Video className="w-3.5 h-3.5" />
                Join meeting
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Meta */}
      <p className="text-sm text-muted-foreground mb-8">
        {formatDate(meeting.createdAt)}
        {' · '}
        {sessionCount} session{sessionCount !== 1 ? 's' : ''}
        {totalDurationMs > 0 && ` · ${formatDurationMs(totalDurationMs)} total`}
      </p>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="recording">Recording</TabsTrigger>
          <TabsTrigger value="minutes">Minutes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="flex flex-col gap-6 max-w-lg">
            {/* Stats */}
            <div className="rounded-lg border border-border bg-card p-6 grid grid-cols-2 gap-6">
              {[
                { label: 'Room ID', value: meeting.roomId },
                { label: 'Status', value: meeting.status },
                { label: 'Sessions', value: String(sessionCount) },
                { label: 'Total time', value: formatDurationMs(totalDurationMs) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                  <p className="text-sm font-medium capitalize">{value}</p>
                </div>
              ))}
            </div>

            {/* Session history */}
            {meeting.meetingSessions.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                  Session history
                </p>
                <div className="rounded-lg border border-border bg-card divide-y divide-border">
                  {meeting.meetingSessions
                    .sort((a, b) => a.startedAt.getTime() - b.startedAt.getTime())
                    .map((s, i) => {
                      const dur = s.endedAt
                        ? s.endedAt.getTime() - s.startedAt.getTime()
                        : null;
                      return (
                        <div key={s.id} className="flex items-center justify-between px-4 py-3">
                          <div>
                            <p className="text-sm font-medium">Session {i + 1}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatTime(s.startedAt)}
                              {s.endedAt ? ` – ${formatTime(s.endedAt)}` : ' · Live'}
                            </p>
                          </div>
                          <span className="text-sm text-muted-foreground tabular-nums">
                            {dur != null ? formatDurationMs(dur) : (
                              <Badge variant="default" className="text-xs">Live</Badge>
                            )}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="participants">
          <div className="rounded-lg border border-border bg-card divide-y divide-border max-w-lg">
            <div className="flex items-center gap-3 px-5 py-3.5">
              <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Host</p>
                <p className="text-xs text-muted-foreground">Joined at start</p>
              </div>
            </div>
          </div>
          <Separator className="my-4 max-w-lg" />
          <p className="text-xs text-muted-foreground">
            Participant tracking is coming in a future update.
          </p>
        </TabsContent>

        <TabsContent value="transcript">
          <ComingSoonTab icon={FileText} label="AI transcription is coming soon" />
        </TabsContent>

        <TabsContent value="recording">
          <ComingSoonTab icon={Mic} label="Recording is coming soon" />
        </TabsContent>

        <TabsContent value="minutes">
          <ComingSoonTab icon={ClipboardList} label="AI-generated minutes are coming soon" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
