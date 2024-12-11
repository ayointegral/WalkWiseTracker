import { pgTable, text, serial, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  startTime: timestamp("start_time").notNull().defaultNow(),
  endTime: timestamp("end_time"),
  duration: numeric("duration"), // in minutes
  distance: numeric("distance"), // in kilometers
  path: text("path"), // JSON string of coordinates
});

export const insertActivitySchema = createInsertSchema(activities);
export const selectActivitySchema = createSelectSchema(activities);
