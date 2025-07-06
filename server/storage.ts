import { 
  users, posts, internships, events, connections,
  type User, type Post, type Internship, type Event, type Connection,
  type InsertUser, type InsertPost, type InsertInternship, type InsertEvent, type InsertConnection,
  type PostWithAuthor, type UserWithConnectionStatus
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;

  // Posts
  getPost(id: number): Promise<Post | undefined>;
  getPostsWithAuthors(): Promise<PostWithAuthor[]>;
  getFeaturedPosts(): Promise<PostWithAuthor[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, updates: Partial<Post>): Promise<Post | undefined>;
  likePost(id: number): Promise<Post | undefined>;

  // Internships
  getAllInternships(): Promise<Internship[]>;
  createInternship(internship: InsertInternship): Promise<Internship>;

  // Events
  getAllEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;

  // Connections
  getConnectionsForUser(userId: number): Promise<Connection[]>;
  getSuggestedConnections(userId: number): Promise<UserWithConnectionStatus[]>;
  createConnection(connection: InsertConnection): Promise<Connection>;
  updateConnection(id: number, status: string): Promise<Connection | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private posts: Map<number, Post> = new Map();
  private internships: Map<number, Internship> = new Map();
  private events: Map<number, Event> = new Map();
  private connections: Map<number, Connection> = new Map();
  private currentUserId = 1;
  private currentPostId = 1;
  private currentInternshipId = 1;
  private currentEventId = 1;
  private currentConnectionId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Create sample users
    const sampleUsers: InsertUser[] = [
      {
        username: "alex_johnson",
        email: "alex@example.com",
        password: "password123",
        fullName: "Alex Johnson",
        title: "3rd Year Law Student",
        university: "Harvard Law School",
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
      },
      {
        username: "sarah_chen",
        email: "sarah@example.com",
        password: "password123",
        fullName: "Sarah Chen",
        title: "2nd Year Law Student",
        university: "Yale Law School",
        profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
      },
      {
        username: "michael_rodriguez",
        email: "michael@example.com",
        password: "password123",
        fullName: "Michael Rodriguez",
        title: "1st Year Law Student",
        university: "Stanford Law",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
      },
      {
        username: "emma_thompson",
        email: "emma@example.com",
        password: "password123",
        fullName: "Emma Thompson",
        title: "3rd Year Law Student",
        university: "Columbia Law",
        profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
      },
      {
        username: "david_kim",
        email: "david@example.com",
        password: "password123",
        fullName: "David Kim",
        title: "2nd Year Law Student",
        university: "NYU Law",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
      }
    ];

    sampleUsers.forEach(user => this.createUser(user));

    // Create sample posts
    const samplePosts: InsertPost[] = [
      {
        authorId: 2,
        title: "Why Article 370 still matters in contemporary constitutional law",
        content: "The recent discussions around Article 370 have highlighted the complex relationship between federalism and constitutional interpretation in India. As law students, understanding these nuances is crucial for our constitutional law studies...",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        type: "post"
      },
      {
        authorId: 3,
        content: "Just finished my first moot court competition! The experience was incredible. Arguing before the judges really helped me understand the practical applications of what we've been learning in class. Any tips for improving oral advocacy skills?",
        type: "question"
      },
      {
        authorId: 4,
        content: "Excited to share that I've been selected for the Supreme Court internship program! Looking forward to gaining hands-on experience in constitutional law. Special thanks to Professor Martinez for the recommendation.",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        type: "post"
      },
      {
        authorId: 5,
        content: "Hosting a study group for Contract Law this weekend! We'll be covering consideration, offer & acceptance, and remedies. DM me if you're interested in joining. Location: NYU Law Library, Room 205.",
        type: "post"
      }
    ];

    samplePosts.forEach(post => this.createPost(post));

    // Set featured post
    this.updatePost(1, { isFeatured: true, likes: 132, comments: 24 });
    this.updatePost(2, { likes: 89, comments: 15 });
    this.updatePost(3, { likes: 156, comments: 32 });
    this.updatePost(4, { likes: 42, comments: 18 });

    // Create sample internships
    const sampleInternships: InsertInternship[] = [
      {
        title: "Supreme Court Internship",
        organization: "Constitutional Law Division",
        description: "Work with constitutional law experts on landmark cases",
        deadline: "Apply by Dec 15",
        type: "application"
      },
      {
        title: "BigLaw Summer Associate",
        organization: "Corporate Law Focus",
        description: "Summer associate position at top law firm",
        deadline: "Rolling Applications",
        type: "rolling"
      },
      {
        title: "Legal Aid Clinic",
        organization: "Public Interest Law",
        description: "Provide legal assistance to underserved communities",
        deadline: "Open Applications",
        type: "open"
      }
    ];

    sampleInternships.forEach(internship => this.createInternship(internship));

    // Create sample events
    const sampleEvents: InsertEvent[] = [
      {
        title: "Moot Court Finals",
        date: "Dec 20, 2024",
        time: "2:00 PM"
      },
      {
        title: "Constitutional Law Seminar",
        date: "Dec 22, 2024",
        time: "6:00 PM"
      },
      {
        title: "Career Fair",
        date: "Jan 8, 2025",
        time: "10:00 AM"
      }
    ];

    sampleEvents.forEach(event => this.createEvent(event));

    // Update event attendees
    this.updateEvent(1, { attendees: 15 });
    this.updateEvent(2, { attendees: 42 });
    this.updateEvent(3, { attendees: 128 });

    // Update user stats
    this.updateUser(1, { profileViews: 127, connections: 245 });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      profileViews: 0,
      connections: 0,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Post methods
  async getPost(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async getPostsWithAuthors(): Promise<PostWithAuthor[]> {
    const posts = Array.from(this.posts.values());
    const postsWithAuthors: PostWithAuthor[] = [];
    
    for (const post of posts) {
      const author = await this.getUser(post.authorId);
      if (author) {
        postsWithAuthors.push({ ...post, author });
      }
    }
    
    return postsWithAuthors.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getFeaturedPosts(): Promise<PostWithAuthor[]> {
    const posts = Array.from(this.posts.values()).filter(post => post.isFeatured);
    const postsWithAuthors: PostWithAuthor[] = [];
    
    for (const post of posts) {
      const author = await this.getUser(post.authorId);
      if (author) {
        postsWithAuthors.push({ ...post, author });
      }
    }
    
    return postsWithAuthors;
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.currentPostId++;
    const post: Post = {
      ...insertPost,
      id,
      likes: 0,
      comments: 0,
      isFeatured: false,
      createdAt: new Date()
    };
    this.posts.set(id, post);
    return post;
  }

  async updatePost(id: number, updates: Partial<Post>): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, ...updates };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async likePost(id: number): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, likes: (post.likes || 0) + 1 };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  // Internship methods
  async getAllInternships(): Promise<Internship[]> {
    return Array.from(this.internships.values());
  }

  async createInternship(insertInternship: InsertInternship): Promise<Internship> {
    const id = this.currentInternshipId++;
    const internship: Internship = {
      ...insertInternship,
      id,
      createdAt: new Date()
    };
    this.internships.set(id, internship);
    return internship;
  }

  // Event methods
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const event: Event = {
      ...insertEvent,
      id,
      attendees: 0,
      createdAt: new Date()
    };
    this.events.set(id, event);
    return event;
  }

  async updateEvent(id: number, updates: Partial<Event>): Promise<Event | undefined> {
    const event = this.events.get(id);
    if (!event) return undefined;
    
    const updatedEvent = { ...event, ...updates };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  // Connection methods
  async getConnectionsForUser(userId: number): Promise<Connection[]> {
    return Array.from(this.connections.values()).filter(
      conn => conn.userId === userId || conn.connectedUserId === userId
    );
  }

  async getSuggestedConnections(userId: number): Promise<UserWithConnectionStatus[]> {
    const allUsers = await this.getAllUsers();
    const userConnections = await this.getConnectionsForUser(userId);
    const connectedUserIds = new Set(userConnections.map(conn => 
      conn.userId === userId ? conn.connectedUserId : conn.userId
    ));
    
    return allUsers
      .filter(user => user.id !== userId && !connectedUserIds.has(user.id))
      .slice(0, 3)
      .map(user => ({ ...user, connectionStatus: 'none' }));
  }

  async createConnection(insertConnection: InsertConnection): Promise<Connection> {
    const id = this.currentConnectionId++;
    const connection: Connection = {
      ...insertConnection,
      id,
      createdAt: new Date()
    };
    this.connections.set(id, connection);
    return connection;
  }

  async updateConnection(id: number, status: string): Promise<Connection | undefined> {
    const connection = this.connections.get(id);
    if (!connection) return undefined;
    
    const updatedConnection = { ...connection, status };
    this.connections.set(id, updatedConnection);
    return updatedConnection;
  }
}

export const storage = new MemStorage();
