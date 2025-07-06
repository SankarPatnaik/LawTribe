# LawConnect - Legal Professional Social Network

## Overview

LawConnect is a full-stack social networking platform designed specifically for legal professionals, law students, and legal academics. The application provides a LinkedIn-style interface tailored for the legal community, featuring posts, networking, internship opportunities, and event management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js REST API
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: In-memory storage for development (ready for PostgreSQL sessions)

### Project Structure
```
├── client/          # React frontend application
├── server/          # Express.js backend API
├── shared/          # Shared TypeScript types and schemas
├── migrations/      # Database migration files
└── dist/           # Production build output
```

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Centralized schema definitions in `shared/schema.ts`
- **Tables**: users, posts, internships, events, connections
- **Validation**: Zod schemas integrated with Drizzle for type-safe validation

### API Layer
- **Pattern**: RESTful API with Express.js
- **Endpoints**: User management, posts, internships, events, connections
- **Error Handling**: Centralized error handling middleware
- **Logging**: Custom request/response logging for API calls

### Frontend Components
- **Layout**: Header, Sidebar, Main Content, Mobile Navigation
- **Features**: Post creation, feed filtering, connection suggestions, event highlights
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: React Query for caching and synchronization

### Authentication (Planned)
- Currently using mock authentication with hardcoded user ID
- Session management infrastructure in place for future implementation
- User schema includes password field for authentication implementation

## Data Flow

### Post Management
1. User creates post through PostCreation component
2. Data validated using Zod schema
3. API stores post in database via Drizzle ORM
4. React Query invalidates cache and refetches posts
5. UI updates with new post displayed in feed

### Connection System
1. Suggested connections fetched from API
2. User initiates connection request
3. Connection stored with "pending" status
4. Real-time updates through React Query cache invalidation

### Content Filtering
1. Posts fetched and cached by React Query
2. Client-side filtering for featured vs regular posts
3. Sorting by engagement (likes) or chronological order
4. Optimistic updates for immediate user feedback

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **wouter**: Lightweight React router
- **tailwindcss**: Utility-first CSS framework
- **zod**: Runtime type validation

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **drizzle-kit**: Database migration and introspection tools
- **@replit/vite-plugin-runtime-error-modal**: Development error handling

## Deployment Strategy

### Production Build
- Frontend: Vite builds optimized React bundle to `dist/public`
- Backend: ESBuild bundles server code to `dist/index.js`
- Database: Drizzle migrations applied via `drizzle-kit push`

### Environment Configuration
- **Development**: Local development with Vite dev server
- **Production**: Express serves static files and API routes
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Platform Optimization
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **Error Handling**: Runtime error overlays in development
- **Hot Module Replacement**: Enabled for rapid development iteration

## Changelog

Changelog:
- July 06, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.