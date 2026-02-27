import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { meetings } from '@/db/schema/meetings';
import { RoomView } from './room-view';

interface Props {
  params: Promise<{ roomId: string }>;
}

export default async function RoomPage({ params }: Props) {
  const { roomId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect(`/sign-in?callbackUrl=/room/${roomId}`);
  if (!session.user.emailVerified) redirect('/verify-email');

  const existing = await db.query.meetings.findFirst({
    where: eq(meetings.roomId, roomId),
  });

  if (!existing) {
    await db.insert(meetings).values({
      id: crypto.randomUUID(),
      roomId,
      hostId: session.user.id,
      status: 'active',
      createdAt: new Date(),
    });
  }

  return <RoomView roomId={roomId} userName={session.user.name} />;
}
