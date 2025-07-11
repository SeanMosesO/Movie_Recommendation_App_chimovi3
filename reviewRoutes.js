import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addReview, getReviews } from "../controllers/reviewController.js";

const router = express.Router();

// GET all reviews for a movie
router.get("/movie/:tmdbId", getReviews);

// POST a new review (protected)
router.post("/movie/:tmdbId", protect, addReview);

export default router;
