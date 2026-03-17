import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import projectActions from "./modules/project/projectActions";
import taskActions from "./modules/task/taskActions";
import userActions from "./modules/user/userActions";

// ========== USER ROUTES ==========

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
// router.put("/api/users/:id", userActions.edit);
router.post("/api/users", userActions.add);
router.delete("/api/users/:id", userActions.destroy);

// ========== PROJECT ROUTES ==========

router.get("/api/projects", projectActions.browse);
router.get("/api/projects/:id", projectActions.read);
// router.put("/api/projects/:id", projectActions.edit);
router.post("/api/projects", projectActions.add);
router.delete("/api/projects/:id", projectActions.destroy);

// ========== TASK ROUTES ==========

router.get("/api/tasks", taskActions.browse);
router.get("/api/tasks/:id", taskActions.read);
// router.put("/api/tasks/:id", taskActions.edit);
router.post("/api/tasks", taskActions.add);
router.delete("/api/tasks/:id", taskActions.destroy);

/* ************************************************************************* */

export default router;
