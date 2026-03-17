import type { RequestHandler } from "express";

// Import access to data
import taskRepository from "./taskRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all tasks
    const tasks = await taskRepository.readAll();

    // Respond with the tasks in JSON format
    res.json(tasks);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific task based on the provided ID
    const taskId = Number(req.params.id);
    const task = await taskRepository.read(taskId);

    // If the task is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the task in JSON format
    if (task == null) {
      res.sendStatus(404);
    } else {
      res.json(task);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the task data from the request body
    const newTask = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      user_id: req.body.user_id,
      project_id: req.body.project_id,
    };

    // Create the task
    const insertId = await taskRepository.create(newTask);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted task
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add };
