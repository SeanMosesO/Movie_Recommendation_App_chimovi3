import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createWatchlist,
  getWatchlists,
  addMovieToList,
  removeMovieFromList
} from "../controllers/watchlistController.js";

const router = express.Router();
router.use(protect);

// Watchlist CRUD
router.post("/", createWatchlist);
router.get("/", getWatchlists);

// Watchlist movie management
router.patch("/:id/movies", addMovieToList);
router.delete("/:id/movies/:tmdbId", removeMovieFromList);

export default router;
