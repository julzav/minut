import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
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

export const participants = pgTable('participants', {
  id: text('id').primaryKey(),
  meetingId: text('meeting_id')
    .notNull()
    .references(() => meetings.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  joinedAt: timestamp('joined_at').notNull(),
  leftAt: timestamp('left_at'),
});

export const meetingSessions = pgTable('meeting_sessions', {
  id: text('id').primaryKey(),
  meetingId: text('meeting_id')
    .notNull()
    .references(() => meetings.id, { onDelete: 'cascade' }),
  startedAt: timestamp('started_at').notNull(),
  endedAt: timestamp('ended_at'),
});

export const meetingsRelations = relations(meetings, ({ many }) => ({
  participants: many(participants),
  meetingSessions: many(meetingSessions),
}));

export const participantsRelations = relations(participants, ({ one }) => ({
  meeting: one(meetings, { fields: [participants.meetingId], references: [meetings.id] }),
}));

export const meetingSessionsRelations = relations(meetingSessions, ({ one }) => ({
  meeting: one(meetings, { fields: [meetingSessions.meetingId], references: [meetings.id] }),
}));
