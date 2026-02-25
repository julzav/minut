import { RoomView } from './room-view';

interface Props {
  params: Promise<{ roomId: string }>;
}

export default async function RoomPage({ params }: Props) {
  const { roomId } = await params;
  return <RoomView roomId={roomId} />;
}
