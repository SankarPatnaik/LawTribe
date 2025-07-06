import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPostSchema, insertConnectionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get current user (mock for now)
  app.get("/api/user/current", async (req, res) => {
    const user = await storage.getUser(1); // Mock current user as Alex Johnson
    res.json(user);
  });

  // Get all posts with authors
  app.get("/api/posts", async (req, res) => {
    const posts = await storage.getPostsWithAuthors();
    res.json(posts);
  });

  // Get featured posts
  app.get("/api/posts/featured", async (req, res) => {
    const posts = await storage.getFeaturedPosts();
    res.json(posts);
  });

  // Create new post
  app.post("/api/posts", async (req, res) => {
    try {
      const validatedData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(validatedData);
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid post data" });
    }
  });

  // Like a post
  app.post("/api/posts/:id/like", async (req, res) => {
    const postId = parseInt(req.params.id);
    const post = await storage.likePost(postId);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json(post);
  });

  // Get all internships
  app.get("/api/internships", async (req, res) => {
    const internships = await storage.getAllInternships();
    res.json(internships);
  });

  // Get all events
  app.get("/api/events", async (req, res) => {
    const events = await storage.getAllEvents();
    res.json(events);
  });

  // Get suggested connections
  app.get("/api/connections/suggested", async (req, res) => {
    const userId = 1; // Mock current user
    const suggestions = await storage.getSuggestedConnections(userId);
    res.json(suggestions);
  });

  // Create connection request
  app.post("/api/connections", async (req, res) => {
    try {
      const validatedData = insertConnectionSchema.parse(req.body);
      const connection = await storage.createConnection(validatedData);
      res.json(connection);
    } catch (error) {
      res.status(400).json({ error: "Invalid connection data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
