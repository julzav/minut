import { WebhookReceiver } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';
import { and, eq, isNull } from 'drizzle-orm';
import { db } from '@/db';
import { meetings, meetingSessions } from '@/db/schema';

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const authorization = request.headers.get('Authorization') ?? '';

  let event;
  try {
    event = await receiver.receive(body, authorization);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const roomName = event.room?.name;
  if (!roomName) return NextResponse.json({ ok: true });

  if (event.event === 'room_started') {
    const meeting = await db.query.meetings.findFirst({
      where: eq(meetings.roomId, roomName),
    });

    if (meeting) {
      await db.transaction(async (tx) => {
        await tx
          .update(meetings)
          .set({ status: 'active', endedAt: null })
          .where(eq(meetings.roomId, roomName));

        await tx.insert(meetingSessions).values({
          id: crypto.randomUUID(),
          meetingId: meeting.id,
          startedAt: new Date(),
        });
      });
    }
  }

  if (event.event === 'room_finished') {
    const now = new Date();
    const meeting = await db.query.meetings.findFirst({
      where: eq(meetings.roomId, roomName),
    });

    if (meeting) {
      await db.transaction(async (tx) => {
        await tx
          .update(meetings)
          .set({ status: 'ended', endedAt: now })
          .where(eq(meetings.roomId, roomName));

        const openSession = await tx.query.meetingSessions.findFirst({
          where: and(
            eq(meetingSessions.meetingId, meeting.id),
            isNull(meetingSessions.endedAt),
          ),
        });

        if (openSession) {
          await tx
            .update(meetingSessions)
            .set({ endedAt: now })
            .where(eq(meetingSessions.id, openSession.id));
        }
      });
    }
  }

  return NextResponse.json({ ok: true });
}
