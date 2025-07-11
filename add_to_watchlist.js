import express from "express";
const router = express.Router();

import {
  createWatchlist,
  getWatchlists,
  addMovieToList,
  removeMovieFromList,
} from "../controllers/watchController.js";

import isAuthenticated from "../auth/isAuthenticated.js";

// Create a new watchlist
router.post("/", isAuthenticated, createWatchlist);

// Get all watchlists for the logged-in user
router.get("/", isAuthenticated, getWatchlists);

// Add a movie to a specific watchlist
router.post("/:id/movies", isAuthenticated, addMovieToList);

// Remove a movie from a specific watchlist
router.delete("/:id/movies/:tmdbId", isAuthenticated, removeMovieFromList);

export default router;
