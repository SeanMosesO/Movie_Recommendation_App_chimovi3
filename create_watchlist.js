import express from "express";
const router = express.Router();

import {
  createWatchlist,
  getWatchlists,
  addMovieToList,
  removeMovieFromList
} from "../controllers/watchController.js";

import isAuthenticated from "../auth/isAuthenticated.js";

// Create a watchlist
router.post("/", isAuthenticated, createWatchlist);

// Get all watchlists
router.get("/", isAuthenticated, getWatchlists);

// Add movie to a specific watchlist
router.post("/:id/movies", isAuthenticated, addMovieToList);

// Remove movie from watchlist
router.delete("/:id/movies/:tmdbId", isAuthenticated, removeMovieFromList);

export default router;
