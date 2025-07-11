import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { body } from "express-validator";
import validate from "../middleware/validate.js";

const router = express.Router();

router.use(protect);

router.get("/me", getProfile);

router.put(
  "/me",
  [
    body("username").optional().isLength({ min: 2 }),
    body("email").optional().isEmail(),
    body("password").optional().isLength({ min: 6 }),
  ],
  validate,
  updateProfile
);

export default router;
