# Full Stack Blog Platform
# (Task - 1)

## Live Links

**Frontend (vercel)**: [https://blogsite-zxsharp.vercel.app/](https://blogsite-zxsharp.vercel.app/)

**Backend (render)**: [https://cantilever-task-1-blog-site.onrender.com](https://cantilever-task-1-blog-site.onrender.com)

> **Note**: Backend is hosted on Render's free tier, which puts the server to sleep after some time of inactivity. If you experience any errors, please wait 1-2 minutes for the server to wake up.

## Features

- **User Authentication**: Secure signup/login with JWT cookies
- **Blog Management**: Create, read, update, delete blog posts
- **Bookmark System**: Save blogs for later reading
- **My Blogs**: Personal dashboard for managing your own posts
- **Dark/Light Mode**: Theme toggle with system preference support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Rich Content**: Full blog content display with proper formatting
- **User Dashboard**: Manage personal blogs and bookmarks
- **Search & Browse**: Explore all blogs from the community

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons
- **Context API** for state management

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Zod** for validation
- **Bcrypt** for password hashing
- **CORS** for cross-origin requests

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB

## 📁 Project Structure

```
task-1/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── config/         # API configuration
│   │   └── ...
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # Express routes
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Custom middleware
<<<<<<< HEAD
│   │   └── db/             # connection to database
│   │   └── schemas/        # zod schemas for validation
│   └── ...
=======
│   │   ├── schemas/        # Validation schemas
│   │   └── index.ts        # Entry point
│   └── package.json
>>>>>>> b861e8f (Update README.md)
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/:id` - Get single blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `GET /api/blogs/my-blogs` - Get user's blogs

### Bookmarks
- `GET /api/bookmarks` - Get user's bookmarks
- `POST /api/bookmarks/:id` - Bookmark a blog
- `DELETE /api/bookmarks/:id` - Remove bookmark

## Environment Variables

### Backend
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend
- `VITE_API_URL` - Backend API URL

## UI Components

- **BlogCard**: Individual blog display with preview
- **Navigation**: Responsive navbar with mobile menu
- **FormInput**: Reusable form input with icons
- **ThemeToggle**: Dark/light mode switcher
- **EmptyState**: Placeholder for empty content
- **LoadingSpinner**: Loading animations
- **Alert**: Success/error notifications

## Authentication Flow

1. User signs up or logs in
2. Server generates JWT token
3. Token stored in HTTP-only cookie
4. Cookie sent with each request for authentication
5. Protected routes verify token via middleware
6. Global auth state managed via React Context

## Design

- Tailwind's mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly interfaces
- Dark/light theme support
- Optimized for all screen sizes
- Smooth animations and transitions
