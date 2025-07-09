import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db';
import authRoutes from './routes/auth.routes';
import blogRoutes from './routes/blog.routes';
import bookmarkRoutes from './routes/bookmark.routes';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const allowedOrigins = [
  'https://blogsite-zxsharp.vercel.app',
  'https://cantilever-task-1-blog-site-9v4d-5ad7s2sq1-zxsharps-projects.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});