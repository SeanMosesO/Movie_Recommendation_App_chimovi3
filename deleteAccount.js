import express from "express";
const router = express.Router();

import getProfile from "../controllers/getProfile.js";
import updateProfile from "../controllers/updateProfile.js";
import deleteAccount from "../controllers/deleteAccount.js";
import isAuthenticated from "../auth/isAuthenticated.js";

// Get current user's profile
router.get("/me", isAuthenticated, getProfile);

// Update profile
router.put("/me", isAuthenticated, updateProfile);

// Delete account
router.delete("/me", isAuthenticated, deleteAccount);

export default router;
