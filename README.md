# Full Stack Blog Platform
# (Task - 1)

A modern, responsive blog platform built with React, TypeScript, Node.js, and MongoDB.

## Live Link

**Frontend:** [https://blogsite-zxsharp.vercel.app/](https://blogsite-zxsharp.vercel.app/)

**Backend API:** [https://cantilever-task-1-blog-site.onrender.com](https://cantilever-task-1-blog-site.onrender.com)

> ⚠️ **Note:** Backend is hosted on Render's free tier, which puts the server to sleep after some time of inactivity. If you experience any errors, please wait 1-2 minutes for the server to wake up.

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **TypeScript** 
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Zod** for data validation
- **bcryptjs** for password hashing

## Project Structure

```
task-1/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── config/         # Configuration files
│   │   └── ...
│   └── ...
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── db/             # connection to database
│   │   └── schemas/        # zod schemas for validation
│   └── ...
└── README.md
```
