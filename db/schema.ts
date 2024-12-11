import { pgTable, text, serial, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  startTime: timestamp("start_time").notNull().defaultNow(),
  endTime: timestamp("end_time"),
  duration: numeric("duration", { precision: 10, scale: 2 }), // in minutes (supports decimal)
  distance: numeric("distance"), // in kilometers
  path: text("path"), // JSON string of coordinates
  location: text("location"), // Street name or area description
});

export const insertActivitySchema = createInsertSchema(activities);
export const selectActivitySchema = createSelectSchema(activities);
