import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { user } from './auth';

export const meetingStatusEnum = pgEnum('meeting_status', ['active', 'ended']);

export const meetings = pgTable('meetings', {
  id: text('id').primaryKey(),
  roomId: text('room_id').notNull().unique(),
  hostId: text('host_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  title: text('title'),
  status: meetingStatusEnum('status').notNull().default('active'),
  createdAt: timestamp('created_at').notNull(),
  endedAt: timestamp('ended_at'),
});
