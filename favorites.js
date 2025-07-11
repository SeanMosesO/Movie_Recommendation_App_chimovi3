import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tmdbId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    posterPath: {
      type: String,
      trim: true,
    },
    releaseDate: {
      type: String,
      match: /^\d{4}-\d{2}-\d{2}$/, // Optional: Enforce YYYY-MM-DD
    },
    voteAverage: {
      type: Number,
      min: 0,
      max: 10,
    },
    overview: {
      type: String,
      maxlength: 1000,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Prevent duplicate favorites per user/movie
favoriteSchema.index({ userId: 1, tmdbId: 1 }, { unique: true });

export default mongoose.model("Favorite", favoriteSchema);
