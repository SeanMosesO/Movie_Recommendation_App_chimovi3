import express from 'express';
import getOrAddLocalDb from '../services/get_movies.js';
import isAuthenticated from '../auth/isAuthenticated.js';

const router = express.Router();

// GET /api/movies — Protected movie discovery/search endpoint
router.get('/movies', isAuthenticated, getOrAddLocalDb);

export default router;
