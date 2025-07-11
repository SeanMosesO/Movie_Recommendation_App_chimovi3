import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },

    password: {
      type: String,
      required: true,
      minlength: 6 // Ensure strong passwords
    },

    favorites: [{
      type: Schema.Types.ObjectId,
      ref: "Movie" // If you're using a separate favorites model (not embedded), change this
    }],

    followers: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],

    following: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],

    profilePicture: {
      type: String,
      default: "https://example.com/default-profile-picture.png",
      trim: true
    }
  },
  {
    timestamps: true // replaces createdAt and updatedAt manually
  }
);
