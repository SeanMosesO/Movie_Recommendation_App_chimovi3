import express from "express";
import {
  addFavorite,
  getFavorites,
  removeFavorite
} from "../controllers/favoriteController.js";

import isAuthenticated from "../auth/isAuthenticated.js";

const router = express.Router();

router.post("/", isAuthenticated, addFavorite);           // Add to favorites
router.get("/", isAuthenticated, getFavorites);           // Get all user favorites
router.delete("/:tmdbId", isAuthenticated, removeFavorite); // Remove by TMDB ID

export default router;
