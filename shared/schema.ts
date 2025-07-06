import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  title: text("title").notNull(), // e.g., "3rd Year Law Student"
  university: text("university").notNull(),
  profileImage: text("profile_image"),
  profileViews: integer("profile_views").default(0),
  connections: integer("connections").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id").references(() => users.id).notNull(),
  title: text("title"),
  content: text("content").notNull(),
  image: text("image"),
  type: text("type").notNull(), // 'post', 'question', 'case_note'
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const internships = pgTable("internships", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  organization: text("organization").notNull(),
  description: text("description").notNull(),
  deadline: text("deadline").notNull(),
  type: text("type").notNull(), // 'application', 'rolling', 'open'
  createdAt: timestamp("created_at").defaultNow(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  attendees: integer("attendees").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const connections = pgTable("connections", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  connectedUserId: integer("connected_user_id").references(() => users.id).notNull(),
  status: text("status").notNull(), // 'pending', 'accepted', 'rejected'
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  profileViews: true,
  connections: true,
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  createdAt: true,
  likes: true,
  comments: true,
  isFeatured: true,
});

export const insertInternshipSchema = createInsertSchema(internships).omit({
  id: true,
  createdAt: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
  attendees: true,
});

export const insertConnectionSchema = createInsertSchema(connections).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Internship = typeof internships.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Connection = typeof connections.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type InsertInternship = z.infer<typeof insertInternshipSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertConnection = z.infer<typeof insertConnectionSchema>;

// Extended types for API responses
export type PostWithAuthor = Post & { author: User };
export type UserWithConnectionStatus = User & { connectionStatus?: string };
