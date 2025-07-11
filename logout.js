import express from "express";
import logout from "../controllers/logout.js";
import isAuthenticated from "../auth/isAuthenticated.js"; // Ensure case matches your actual file

const router = express.Router();

// POST /logout — Authenticated users only
router.post("/logout", isAuthenticated, logout);

export default router;
