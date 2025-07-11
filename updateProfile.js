import express from 'express';
import { body } from 'express-validator';
import updateProfileController from '../controllers/updateProfile.js';
import isAuthenticated from '../auth/isAuthenticated.js';
import validate from '../middleware/validate.js';

const router = express.Router();

// PUT /profile — update user info
router.put(
  '/profile',
  isAuthenticated,
  [
    body('username').optional().isLength({ min: 2 }),
    body('profilePicture').optional().isURL()
  ],
  validate,
  updateProfileController
);

export default router;
