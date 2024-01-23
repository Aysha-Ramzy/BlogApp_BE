import { Router } from 'express';
import * as blogController from '../controllers/blogController';
import { checkAuth } from '../middleware/authMiddleware'; 

const router = Router();

// Get all blog posts
router.get('/', blogController.getPosts);

// Create a new blog post, protected route
router.post('/', checkAuth, blogController.createPost);

// Update an existing blog post, protected route
router.put('/:postId', checkAuth, blogController.updatePost);

// Delete a blog post, protected route
router.delete('/:postId', checkAuth, blogController.deletePost);

export default router;
