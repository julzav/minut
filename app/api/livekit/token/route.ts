import { AccessToken } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const roomName = searchParams.get('roomName');
  const participantName = searchParams.get('participantName');

  if (!roomName || !participantName) {
    return NextResponse.json(
      { error: 'roomName and participantName are required' },
      { status: 400 }
    );
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const livekitUrl = process.env.LIVEKIT_URL;

  if (!apiKey || !apiSecret || !livekitUrl) {
    return NextResponse.json(
      { error: 'LiveKit environment variables are not configured' },
      { status: 500 }
    );
  }

  const token = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
    ttl: '1h',
  });

  token.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
  });

  return NextResponse.json({ token: await token.toJwt() });
}
