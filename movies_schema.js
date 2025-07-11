import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema({
  tmdbId: {
    type: Number, // TMDB IDs are typically numeric
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255
  },
  releaseDate: {
    type: Date,
    required: true
  },
  posterPath: {
    type: String,
    required: true,
    trim: true
  },
  backdropPath: {
    type: String,
    trim: true,
    default: null
  },
  overview: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  videoKey: {
    type: String,
    trim: true,
    default: null
  },
  genres: {
    type: [String],
    required: true,
    validate: [arr => arr.length > 0, "At least one genre is required"]
  },
  voteAverage: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  popularity: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true // auto-manages createdAt and updatedAt
});
