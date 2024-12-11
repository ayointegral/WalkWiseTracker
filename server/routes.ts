import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "../db";
import { activities } from "@db/schema";
import { desc, sql } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  app.get("/api/activities", async (_req, res) => {
    const result = await db.select().from(activities).orderBy(desc(activities.startTime));
    res.json(result);
  });

  app.post("/api/activities/start", async (_req, res) => {
    const result = await db.insert(activities).values({}).returning();
    res.json(result[0]);
  });

  app.post("/api/activities/:id/end", async (req, res) => {
    const { id } = req.params;
    const { path, duration, distance, location } = req.body;
    
    const result = await db.update(activities)
      .set({ 
        endTime: sql`CURRENT_TIMESTAMP`,
        path,
        duration,
        distance,
        location
      })
      .where(sql`id = ${id}`)
      .returning();
      
    res.json(result[0]);
  });

  const httpServer = createServer(app);
  return httpServer;
}
