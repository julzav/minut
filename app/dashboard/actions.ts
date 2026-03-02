'use server';

import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { meetings } from '@/db/schema';

function generateRoomId(): string {
  const segment = (len: number) =>
    Math.random().toString(36).slice(2, 2 + len).padEnd(len, '0');
  return `${segment(3)}-${segment(4)}-${segment(3)}`;
}

async function uniqueRoomId(): Promise<string> {
  while (true) {
    const candidate = generateRoomId();
    const existing = await db.query.meetings.findFirst({
      where: eq(meetings.roomId, candidate),
    });
    if (!existing) return candidate;
  }
}

export async function createMeeting(title: string): Promise<{ roomId: string }> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error('Unauthorized');

  const id = crypto.randomUUID();
  const roomId = await uniqueRoomId();
  const resolvedTitle = title.trim() || 'Untitled meeting';

  await db.insert(meetings).values({
    id,
    roomId,
    hostId: session.user.id,
    title: resolvedTitle,
    status: 'active',
    createdAt: new Date(),
  });

  return { roomId };
}
