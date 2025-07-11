import express from "express";
import { body } from "express-validator";
import { protect } from "../middleware/authMiddleware.js";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favoritesController.js";
import validate from "../middleware/validate.js";

const router = express.Router();
router.use(protect);

router.post(
  "/",
  [
    body("tmdbId").isNumeric(),
    body("title").notEmpty(),
    body("posterPath").notEmpty(),
    body("releaseDate").notEmpty(),
    body("voteAverage").isNumeric(),
    body("overview").notEmpty(),
  ],
  validate,
  addFavorite
);

router.get("/", getFavorites);

router.delete("/:tmdbId", removeFavorite);

export default router;
