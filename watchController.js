import Watchlist from "../models/watchlist_schema.js";
import getorAddLocalDb from "../services/gettoaddLocaldb.js";

// Create a new watchlist
export const createWatchlist = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: "Watchlist name is required" });
    }

    const watchlist = new Watchlist({ userId: req.user.id, name: req.body.name.trim() });
    await watchlist.save();
    res.status(201).json({ message: "Watchlist created", watchlist });
  } catch (error) {
    console.error("Create Watchlist Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all watchlists for the logged-in user
export const getWatchlists = async (req, res) => {
  try {
    const lists = await Watchlist.find({ userId: req.user.id });
    res.status(200).json(lists);
  } catch (error) {
    console.error("Get Watchlists Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Add a movie to a specific watchlist
export const addMovieToList = async (req, res) => {
  const { tmdbId, title, posterPath, releaseDate } = req.body;

  if (!tmdbId || !title) {
    return res.status(400).json({ message: "Movie tmdbId and title are required" });
  }

  try {
    const list = await Watchlist.findById(req.params.id);

    if (!list) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    if (list.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to modify this watchlist" });
    }

    // Prevent duplicate entries
    const alreadyExists = list.movies.some(movie => movie.tmdbId === tmdbId);
    if (alreadyExists) {
      return res.status(409).json({ message: "Movie already exists in this watchlist" });
    }

    list.movies.push({ tmdbId, title, posterPath, releaseDate });
    await list.save();
    res.status(200).json({ message: "Movie added to watchlist", list });
  } catch (error) {
    console.error("Add Movie Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Remove a movie from a specific watchlist
export const removeMovieFromList = async (req, res) => {
  try {
    const list = await Watchlist.findById(req.params.id);

    if (!list) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    if (list.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to modify this watchlist" });
    }

    const originalLength = list.movies.length;
    list.movies = list.movies.filter(m => m.tmdbId != req.params.tmdbId);

    if (list.movies.length === originalLength) {
      return res.status(404).json({ message: "Movie not found in the watchlist" });
    }

    await list.save();
    res.status(200).json({ message: "Movie removed from watchlist", list });
  } catch (error) {
    console.error("Remove Movie Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
