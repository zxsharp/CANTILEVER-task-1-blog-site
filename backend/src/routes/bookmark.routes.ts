import { Router } from 'express';
import { bookmarkBlog, unbookmarkBlog, getBookmarkedBlogs } from '../controllers/bookmark.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/:id', protect, bookmarkBlog);
router.delete('/:id', protect, unbookmarkBlog);
router.get('/', protect, getBookmarkedBlogs);

export default router;
