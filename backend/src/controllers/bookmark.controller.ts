import { RequestHandler } from 'express';
import { Bookmark } from '../models/bookmark.model';

export const bookmarkBlog: RequestHandler = async (req, res) => {
    try {
        const userId = (req as any).user.id;
        const blogId = req.params.id;

        const existingBookmark = await Bookmark.findOne({ user: userId, blog: blogId });
        if (existingBookmark) {
            res.status(400).json({ message: 'Blog already bookmarked' });
            return;
        }

        const bookmark = new Bookmark({ user: userId, blog: blogId });
        await bookmark.save();

        res.status(201).json(bookmark);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const unbookmarkBlog: RequestHandler = async (req, res) => {
    try {
        const userId = (req as any).user.id;
        const blogId = req.params.id;

        const bookmark = await Bookmark.findOneAndDelete({ user: userId, blog: blogId });
        if (!bookmark) {
            res.status(404).json({ message: 'Bookmark not found' });
            return;
        }

        res.json({ message: 'Bookmark removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getBookmarkedBlogs: RequestHandler = async (req, res) => {
    try {
        const userId = (req as any).user.id;
        const bookmarks = await Bookmark.find({ user: userId }).populate({
            path: 'blog',
            populate: {
                path: 'author',
                select: 'username'
            }
        });

        // Filter out bookmarks where the blog has been deleted
        const validBookmarks = bookmarks.filter(bookmark => 
            bookmark.blog && bookmark.blog._id
        );

        // Optionally clean up orphaned bookmarks
        const orphanedBookmarks = bookmarks.filter(bookmark => 
            !bookmark.blog || !bookmark.blog._id
        );

        if (orphanedBookmarks.length > 0) {
            // Remove orphaned bookmarks from database
            const orphanedIds = orphanedBookmarks.map(bookmark => bookmark._id);
            await Bookmark.deleteMany({ _id: { $in: orphanedIds } });
        }

        res.json(validBookmarks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
