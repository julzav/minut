'use server';

import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { meetings } from '@/db/schema';

function generateRoomId(): string {
  const segment = (len: number) =>
    Math.random().toString(36).slice(2, 2 + len).padEnd(len, '0');
  return `${segment(3)}-${segment(4)}-${segment(3)}`;
}

export async function createMeeting(title: string): Promise<{ roomId: string }> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error('Unauthorized');

  const roomId = generateRoomId();
  const id = crypto.randomUUID();
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
