import User from "../models/users.js";

const getProfile = async (req, res) => {
  try {
    const requestedUserId = req.params.id || req.user?.id;

    if (!requestedUserId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(requestedUserId).select("-password -__v");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile retrieved successfully",
      details: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        profilePicture:
          user.profilePicture ||
          process.env.DEFAULT_PROFILE_PIC_URL ||
          "https://example.com/default-profile-picture.png",
        followers: Array.isArray(user.followers) ? user.followers.length : 0,
        following: Array.isArray(user.following) ? user.following.length : 0,
        favorites: Array.isArray(user.favorites) ? user.favorites.length : 0,
      },
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default getProfile;
