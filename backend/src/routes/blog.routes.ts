import { Router } from 'express';
import { createBlog, getBlogs, getBlog, updateBlog, deleteBlog, getMyBlogs } from '../controllers/blog.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.route('/').post(protect, createBlog).get(getBlogs);
router.route('/my-blogs').get(protect, getMyBlogs);
router.route('/:id').get(getBlog).put(protect, updateBlog).delete(protect, deleteBlog);

export default router;
