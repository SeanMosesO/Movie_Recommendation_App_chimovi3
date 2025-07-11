import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    tmdbId: {
      type: Number,
      required: true
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: ""
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt automatically
  }
);

// Prevent duplicate reviews by same user for the same movie
reviewSchema.index({ userId: 1, tmdbId: 1 }, { unique: true });

// Index for fast retrieval by movie
reviewSchema.index({ tmdbId: 1 });

export default mongoose.model("Review", reviewSchema);
