'use client';

import '@livekit/components-styles';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LiveKitRoom,
  VideoConference,
  PreJoin,
  type LocalUserChoices,
} from '@livekit/components-react';

interface RoomViewProps {
  roomId: string;
}

export function RoomView({ roomId }: RoomViewProps) {
  const router = useRouter();
  const [userChoices, setUserChoices] = useState<LocalUserChoices | null>(null);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  // Phase derived from state — no synchronous setState in effects
  const phase = !userChoices ? 'pre-join' : token ? 'in-room' : 'loading';

  useEffect(() => {
    if (!userChoices) return;

    const params = new URLSearchParams({
      roomName: roomId,
      participantName: userChoices.username,
    });
    fetch(`/api/livekit/token?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to get token');
        return res.json() as Promise<{ token: string }>;
      })
      .then(({ token: jwt }) => {
        setToken(jwt);
      })
      .catch((err: Error) => {
        setError(err.message ?? 'Something went wrong');
        setUserChoices(null);
      });
  }, [userChoices, roomId]);

  if (phase === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-muted-foreground">Connecting...</p>
      </div>
    );
  }

  if (phase === 'in-room') {
    return (
      <LiveKitRoom
        data-lk-theme="default"
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        audio={userChoices?.audioEnabled}
        video={userChoices?.videoEnabled}
        style={{ height: '100dvh' }}
        onDisconnected={() => router.push('/')}
      >
        <VideoConference />
      </LiveKitRoom>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <PreJoin
        data-lk-theme="default"
        onSubmit={setUserChoices}
        onError={(err) => setError(err.message)}
        defaults={{ username: '', videoEnabled: true, audioEnabled: true }}
      >
        {error && <p className="lk-prejoin-error">{error}</p>}
      </PreJoin>
    </div>
  );
}
