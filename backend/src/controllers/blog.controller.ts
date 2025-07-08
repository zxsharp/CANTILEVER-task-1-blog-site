import { Request, Response, RequestHandler } from 'express';
import { Blog } from '../models/blog.model';
import { blogSchema } from '../schemas/blog.schema';

export const createBlog: RequestHandler = async (req, res) => {
    const result = blogSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ message: 'Invalid data', errors: result.error.errors });
        return;
    }

    const { title, content } = result.data;
    const author = (req as any).user.id;

    try {
        const blog = new Blog({ title, content, author });
        await blog.save();

        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getBlogs: RequestHandler = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username').sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};  

export const getBlog: RequestHandler = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'username _id');
        if (!blog) {
            res.status(404).json({ message: 'Blog not found' });
            return;
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateBlog: RequestHandler = async (req, res) => {
    const result = blogSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ message: 'Invalid data', errors: result.error.errors });
        return;
    }
    const { title, content } = result.data;

    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            res.status(404).json({ message: 'Blog not found' });
            return;
        }

        if (blog.author.toString() !== (req as any).user.id) {
            res.status(403).json({ message: 'Unauthorized' });
            return;
        }

        blog.title = title;
        blog.content = content;
        await blog.save();

        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const deleteBlog: RequestHandler = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            res.status(404).json({ message: 'Blog not found' });
            return;
        }

        if (blog.author.toString() !== (req as any).user.id) {
            res.status(403).json({ message: 'Unauthorized' });
            return;
        }

        await blog.deleteOne();

        res.json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getMyBlogs: RequestHandler = async (req, res) => {
    try {
        const userId = (req as any).user.id;
        const blogs = await Blog.find({ author: userId }).populate('author', 'username').sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

