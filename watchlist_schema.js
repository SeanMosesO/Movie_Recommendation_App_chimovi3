import mongoose, { Schema } from "mongoose";

const watchlistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],

    sharedWith: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Compound unique index to prevent duplicate watchlist names per user
watchlistSchema.index({ userId: 1, name: 1 }, { unique: true });

// Optional: Middleware to prevent duplicate movies in a watchlist
watchlistSchema.pre("save", function (next) {
  this.movies = [...new Set(this.movies.map(id => id.toString()))];
  next();
});

export default mongoose.model("Watchlist", watchlistSchema);
