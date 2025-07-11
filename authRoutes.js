import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import logoutUser from "../controllers/logout.js";
import { body } from "express-validator";
import rateLimit from "express-rate-limit";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Try again later.",
});

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password too short"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    loginLimiter,
    body("email").isEmail(),
    body("password").notEmpty(),
  ],
  loginUser
);

router.post("/logout", logoutUser);

export default router;
