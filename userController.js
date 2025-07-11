import User from "../models/User.js";
import bcrypt from "bcryptjs";

// GET: Fetch authenticated user's profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -__v");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      profilePicture: user.profilePicture || "",
      followers: Array.isArray(user.followers) ? user.followers.length : 0,
      following: Array.isArray(user.following) ? user.following.length : 0,
      favorites: Array.isArray(user.favorites) ? user.favorites.length : 0,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// PUT/PATCH: Update user's profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username, email, password } = req.body;

    // Basic validations (extend with express-validator or Joi if needed)
    if (email && typeof email !== "string") {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (username && typeof username !== "string") {
      return res.status(400).json({ message: "Invalid username" });
    }

    if (username) user.username = username.trim();
    if (email) user.email = email.trim().toLowerCase();

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
