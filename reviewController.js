import Review from "../models/Review.js";

// Add a review for a movie
export const addReview = async (req, res) => {
  const { tmdbId, rating, comment } = req.body;

  if (!tmdbId || rating == null) {
    return res.status(400).json({ message: "tmdbId and rating are required" });
  }

  if (typeof rating !== "number" || rating < 0 || rating > 10) {
    return res.status(400).json({ message: "Rating must be a number between 0 and 10" });
  }

  try {
    // Check if the user already reviewed this movie
    const existing = await Review.findOne({ userId: req.user.id, tmdbId });
    if (existing) {
      return res.status(409).json({ message: "You already reviewed this movie" });
    }

    const review = new Review({
      userId: req.user.id,
      username: req.user.username || "Anonymous",
      tmdbId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.error("Add Review Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all reviews for a specific movie
export const getReviews = async (req, res) => {
  const { tmdbId } = req.params;

  try {
    if (!tmdbId) {
      return res.status(400).json({ message: "tmdbId is required" });
    }

    const reviews = await Review.find({ tmdbId }).sort({ createdAt: -1 }); // newest first
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Get Reviews Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
