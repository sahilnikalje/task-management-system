const express = require("express");
const { body } = require("express-validator");
const {
  createTask,
  getOwnTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const taskRouter = express.Router();

taskRouter.use(authMiddleware);

taskRouter.post(
  "/",
  [body("title").notEmpty().withMessage("Title is required")],
  createTask
);

taskRouter.get("/", getOwnTasks);
taskRouter.get("/:id", getSingleTask);

taskRouter.patch(
  "/:id",
  [
    body("status")
      .optional()
      .isIn(["pending", "in-progress", "completed"])
      .withMessage("Invalid status"),
  ],
  updateTask
);

taskRouter.delete("/:id", deleteTask);

module.exports = taskRouter;