# E-Venue Admin Dashboard

## Overview

E-Venue is a React-based admin dashboard application for managing exam venue bookings, teacher verification, and venue allocation. The system allows administrators to verify pending teachers, manage exam venues, track bookings, and monitor overall system statistics. Built with modern web technologies, the application provides a clean, efficient interface for administrative workflows centered around exam venue management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool and development server.

**UI Component System**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling. The design follows a "Modern Data Dashboard System" approach inspired by Linear and Vercel, prioritizing clarity, information density, and efficient workflows over decoration.

**Routing**: wouter for client-side routing with protected route wrappers that enforce authentication before accessing dashboard pages.

**State Management**:
- React Query (TanStack Query) for server state management with configured query invalidation strategies
- React Context API for authentication state (AuthContext) shared across the application
- Local component state for UI interactions

**Design System**:
- Typography: Inter font family with a structured hierarchy (text-2xl/3xl for titles, text-sm for body)
- Spacing: Consistent Tailwind units (2, 4, 6, 8, 12) applied systematically
- Layout: Responsive grid systems (1-4 columns depending on breakpoint) with standard page padding (p-4 md:p-6 lg:p-8)
- Color scheme: CSS variables for theming with light/dark mode support through Tailwind's darkMode class strategy

### Backend Architecture

**Server Framework**: Express.js server setup with TypeScript, configured for ESM modules.

**Development vs Production**:
- Development: Vite middleware integration with HMR support
- Production: Static file serving from pre-built dist/public directory

**Data Layer**: 
- In-memory storage implementation (MemStorage) as the default storage interface
- Abstract IStorage interface defined for future database integration
- Drizzle ORM configured for PostgreSQL with Neon serverless driver ready for migration

**API Structure**:
- RESTful API endpoints prefixed with `/api`
- Request logging middleware for API routes
- JSON body parsing with raw body preservation for webhook support
- Routes registered through centralized `registerRoutes` function

### Authentication and Authorization

**Authentication Flow**:
- Token-based authentication using JWT stored in localStorage
- AuthContext provider managing login/logout state globally
- Protected routes that redirect unauthenticated users to `/login`
- Axios interceptor automatically attaching Bearer tokens to requests

**Session Management**:
- Token and admin data persisted in localStorage
- Automatic cleanup on 401 responses through axios response interceptor
- Admin profile data stored alongside token for UI personalization

### External Dependencies

**Third-Party Services**:
- **Backend API**: External REST API hosted at `https://e-venue-backend.onrender.com` serving as the primary data source
- All CRUD operations for teachers, venues, and admin functions proxied through this backend

**Database Configuration**:
- Drizzle ORM configured for PostgreSQL dialect
- Neon serverless driver (`@neondatabase/serverless`) installed and ready
- Migration directory set to `./migrations` with schema at `./shared/schema.ts`
- Currently using in-memory storage, but infrastructure prepared for database migration

**UI Libraries**:
- Radix UI component primitives (@radix-ui/* packages) for accessible, unstyled base components
- Tailwind CSS for utility-first styling
- class-variance-authority for component variant management
- date-fns for date formatting and manipulation
- lucide-react for icon system

**Development Tools**:
- Vite plugins: runtime error overlay, cartographer (Replit-specific), dev banner
- TypeScript with strict mode enabled
- Path aliases configured (@/, @shared/, @assets/)

**Form Handling**:
- react-hook-form for form state management
- @hookform/resolvers for validation schema integration
- drizzle-zod for schema-based validation (when transitioning to database)