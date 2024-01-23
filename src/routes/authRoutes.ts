import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

// Register a new user
router.post('/register', authController.register);

// Login a user and return a JWT
router.post('/login', authController.login);

export default router;
