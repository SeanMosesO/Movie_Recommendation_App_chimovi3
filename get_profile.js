// routes/userProfile.js
import express from 'express';
import getProfileController from '../controllers/getProfile.js';
import isAuthenticated from '../auth/isAuthenticated.js';

const router = express.Router();

// GET /api/user/profile — Get current user's profile
router.get('/profile', isAuthenticated, getProfileController);

export default router;
