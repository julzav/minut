import { headers } from 'next/headers';
import { desc, eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { meetings } from '@/db/schema';
import { MeetingsTable, type MeetingRow } from './meetings-table';
import { NewMeetingDialog } from './new-meeting-dialog';
import { createMeeting } from './actions';

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session!.user.id;

  const rows = await db.query.meetings.findMany({
    where: eq(meetings.hostId, userId),
    orderBy: [desc(meetings.createdAt)],
    with: { meetingSessions: true },
  });

  const tableData: MeetingRow[] = rows.map((m) => {
    const totalDurationMs = m.meetingSessions.reduce((sum, s) => {
      if (!s.endedAt) return sum;
      return sum + (s.endedAt.getTime() - s.startedAt.getTime());
    }, 0);

    return {
      id: m.id,
      roomId: m.roomId,
      title: m.title,
      status: m.status,
      createdAt: m.createdAt,
      endedAt: m.endedAt,
      sessionCount: m.meetingSessions.length,
      totalDurationMs,
    };
  });

  const activeCount = tableData.filter((m) => m.status === 'active').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My meetings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {tableData.length} meeting{tableData.length !== 1 ? 's' : ''}
            {activeCount > 0 && (
              <> &middot; <span className="text-green-500 dark:text-green-400">{activeCount} live</span></>
            )}
          </p>
        </div>
        <NewMeetingDialog createMeeting={createMeeting} />
      </div>

      <MeetingsTable data={tableData} />
    </div>
  );
}
