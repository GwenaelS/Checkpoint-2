import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../user/userRepository";

// Import access to data

const login: RequestHandler = async (req, res, next) => {
  try {
    // Does the request body contain both email and password?
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // Does the email exist in the database?
    const user = await userRepository.readEmail(req.body.email);
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await argon2.verify(
      user.password,
      req.body.password,
    );
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Verify is APP_SECRET is defined
    if (!process.env.APP_SECRET) {
      res.status(500).json({ error: "Server configuration error" });
      return;
    }

    // Create a JWT token and send it in a cookie
    const token = jwt.sign(
      { userId: user.id, userEmail: user.email, role: "user" },
      process.env.APP_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("token", token);
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { login };
