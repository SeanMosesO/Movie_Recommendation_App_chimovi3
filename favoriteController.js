import Favorite from "../models/favorite.js";

// Add a movie to favorites
export const addFavorite = async (req, res) => {
  const { tmdbId, title, posterPath, releaseDate, voteAverage, overview } = req.body;

  if (!tmdbId || !title) {
    return res.status(400).json({ message: "tmdbId and title are required" });
  }

  try {
    const existing = await Favorite.findOne({ userId: req.user.id, tmdbId });
    if (existing) {
      return res.status(409).json({ message: "Movie already in favorites" });
    }

    const favorite = new Favorite({
      userId: req.user.id,
      tmdbId,
      title,
      posterPath,
      releaseDate,
      voteAverage,
      overview,
    });

    await favorite.save();
    res.status(201).json(favorite);
  } catch (err) {
    console.error("Add Favorite Error:", err);
    res.status(500).json({ message: "Failed to add favorite", error: err.message });
  }
};

// Get all favorites for a user
export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id });
    res.status(200).json(favorites);
  } catch (err) {
    console.error("Get Favorites Error:", err);
    res.status(500).json({ message: "Failed to fetch favorites", error: err.message });
  }
};

// Remove a movie from favorites
export const removeFavorite = async (req, res) => {
  try {
    const result = await Favorite.deleteOne({
      userId: req.user.id,
      tmdbId: req.params.tmdbId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (err) {
    console.error("Remove Favorite Error:", err);
    res.status(500).json({ message: "Failed to remove favorite", error: err.message });
  }
};
