import argon2 from "argon2";
import type { RequestHandler } from "express";

import type { AuthRequest } from "../../middlewares/tokenVerify";
// Import access to data
import userRepository from "./userRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all users
    const users = await userRepository.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific user based on the provided ID
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getMe: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    // Extract the user ID from the authenticated request
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized: No user information" });
      return;
    }
    const userId = req.user.id;

    // Fetch the user based on the extracted user ID
    const user = await userRepository.read(userId);
    res.json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the user data from the request body
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    // Verify if email is already used by another user
    const doesUserExist = await userRepository.readEmail(newUser.email);
    if (doesUserExist) {
      res.status(409).json({ message: "Email already in use" });
      return;
    }

    // Hash the password before storing it in the database
    const hashPassword = await argon2.hash(newUser.password);
    newUser.password = hashPassword;

    const user = {
      ...newUser,
      password: hashPassword,
    };

    // Create the user
    const insertId = await userRepository.create(user);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Extract the user ID from the request parameters
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);

    // If the user is not found, respond with HTTP 404 (Not Found)
    if (user == null) {
      res.sendStatus(404);
    } else {
      // Delete the user
      const result = await userRepository.delete(userId);

      // Respond with HTTP 204 (No Content) to indicate successful deletion
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add, destroy, getMe };
