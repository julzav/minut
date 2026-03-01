'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface NewMeetingDialogProps {
  createMeeting: (title: string) => Promise<{ roomId: string }>;
}

export function NewMeetingDialog({ createMeeting }: NewMeetingDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const promise = createMeeting(title);
      toast.promise(promise, {
        loading: 'Creating meeting…',
        success: 'Meeting created',
        error: 'Failed to create meeting',
      });
      const { roomId } = await promise;
      setOpen(false);
      router.push(`/room/${roomId}`);
    } catch {
      // error already surfaced by toast.promise
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Video className="w-4 h-4" />
          New meeting
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New meeting</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="meeting-title" className="text-sm font-medium">
              Meeting title
            </label>
            <Input
              id="meeting-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled meeting"
              autoFocus
            />
          </div>
          <Button type="submit" disabled={loading} className="self-end">
            {loading ? 'Starting…' : 'Start meeting'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
