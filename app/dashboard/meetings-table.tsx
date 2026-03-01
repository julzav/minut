'use client';

import Link from 'next/link';
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export type MeetingRow = {
  id: string;
  roomId: string;
  title: string | null;
  status: 'active' | 'ended';
  createdAt: Date;
  endedAt: Date | null;
  sessionCount: number;
  totalDurationMs: number;
};

function formatDuration(ms: number): string {
  if (ms <= 0) return '—';
  const mins = Math.floor(ms / 60000);
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function SortIcon({ isSorted }: { isSorted: false | 'asc' | 'desc' }) {
  if (isSorted === 'asc') return <ArrowUp className="ml-1.5 h-3.5 w-3.5" />;
  if (isSorted === 'desc') return <ArrowDown className="ml-1.5 h-3.5 w-3.5" />;
  return <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 opacity-40" />;
}

const columns: ColumnDef<MeetingRow>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Title
        <SortIcon isSorted={column.getIsSorted()} />
      </Button>
    ),
    cell: ({ row }) => (
      <Link
        href={`/dashboard/meetings/${row.original.id}`}
        className="font-medium hover:underline underline-offset-4"
      >
        {row.original.title ?? 'Untitled meeting'}
      </Link>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Status
        <SortIcon isSorted={column.getIsSorted()} />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant={row.original.status === 'active' ? 'default' : 'secondary'} className="capitalize">
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: 'sessionCount',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Sessions
        <SortIcon isSorted={column.getIsSorted()} />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="tabular-nums text-muted-foreground">{row.original.sessionCount}</span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Started
        <SortIcon isSorted={column.getIsSorted()} />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground tabular-nums">
        {formatDate(row.original.createdAt)}
      </span>
    ),
    sortingFn: (a, b) =>
      a.original.createdAt.getTime() - b.original.createdAt.getTime(),
  },
  {
    accessorKey: 'totalDurationMs',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Total time
        <SortIcon isSorted={column.getIsSorted()} />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground tabular-nums">
        {row.original.status === 'active' && row.original.sessionCount > 0
          ? 'Live'
          : formatDuration(row.original.totalDurationMs)}
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        {row.original.status === 'active' && (
          <Button asChild size="sm" variant="outline" className="h-7 gap-1.5 px-2.5 text-xs">
            <Link href={`/room/${row.original.roomId}`}>
              <Video className="h-3 w-3" />
              Join
            </Link>
          </Button>
        )}
        <Button asChild size="sm" variant="ghost" className="h-7 px-2.5 text-xs">
          <Link href={`/dashboard/meetings/${row.original.id}`}>View</Link>
        </Button>
      </div>
    ),
  },
];

export function MeetingsTable({ data }: { data: MeetingRow[] }) {
  'use no memo';
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdAt', desc: true },
  ]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center rounded-lg border border-dashed border-border">
        <p className="text-muted-foreground mb-1">No meetings yet</p>
        <p className="text-sm text-muted-foreground">
          Click &ldquo;New meeting&rdquo; to start your first one.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
