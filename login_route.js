import express from "express";
import { body } from "express-validator";
import loginController from "../controllers/login.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  validate,
  loginController
);

export default router;
