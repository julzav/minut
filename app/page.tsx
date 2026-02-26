'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function generateRoomId(): string {
  const segment = (len: number) =>
    Math.random().toString(36).slice(2, 2 + len).padEnd(len, '0');
  return `${segment(3)}-${segment(4)}-${segment(3)}`;
}

export default function Page() {
  const router = useRouter();
  const [meetingCode, setMeetingCode] = useState('');

  const handleNewMeeting = () => {
    router.push(`/room/${generateRoomId()}`);
  };

  const handleJoinMeeting = () => {
    if (meetingCode.trim()) {
      router.push(`/room/${meetingCode.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">M</span>
          </div>
          <span className="text-xl font-semibold text-foreground">minut</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">Sign in</Button>
          <ModeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-light text-foreground mb-4">
              Video meetings with AI-powered minutes
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Connect with anyone, anywhere. Get automatic transcripts and intelligent meeting summaries powered by AI.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            {/* New Meeting Button */}
            <Button
              onClick={handleNewMeeting}
              className="min-w-50 text-lg h-12 px-8"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              New meeting
            </Button>

            <span className="text-muted-foreground hidden sm:block">or</span>

            {/* Join Meeting Section */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Input
                type="text"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                placeholder="Enter meeting code"
                className="min-w-50 h-12 text-center sm:text-left"
              />
              <Button
                variant="secondary"
                onClick={handleJoinMeeting}
                disabled={!meetingCode.trim()}
                className="min-w-25 h-12"
              >
                Join
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">AI Transcription</h3>
              <p className="text-muted-foreground">
                Real-time transcription of your meetings with speaker identification and timestamps.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Smart Minutes</h3>
              <p className="text-muted-foreground">
                Automatically generated meeting summaries with action items and key decisions.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                End-to-end encrypted meetings with secure cloud storage for your transcripts.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-8 text-center text-muted-foreground">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <p>&copy; 2026 minut. Built with AI-powered meeting intelligence.</p>
          <span className="hidden sm:block">&middot;</span>
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <span className="hidden sm:block">&middot;</span>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms &amp; Conditions</Link>
        </div>
      </footer>
    </div>
  );
}
