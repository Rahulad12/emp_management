import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../utils/logger.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  logger.info("Registering user");
  try {
    const { email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      logger.info("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ email, password, role });
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    logger.info("User registered successfully");
    res
      .status(201)
      .json({ token, user: { email: user.email, role: user.role } });
  } catch (error) {
    logger.error("Error creating user", error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  logger.info("Logging in user");
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      logger.info("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    logger.info("User logged in successfully");
    res.json({ token, user: { email: user.email, role: user.role } });
  } catch (error) {
    logger.error("Error logging in", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

export default router;
