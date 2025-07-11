import express from "express";
import { body } from "express-validator";
import signupController from "../controllers/signup.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  validate,
  signupController
);

export default router;
