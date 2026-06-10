const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  updateUserStatus,
  deleteUser,
  getAllTasksAdmin,
  deleteAnyTask,
} = require("../controllers/admin.controller");
const { getAnalytics } = require("../controllers/analytics.controller");
const { getActivityLogs } = require("../controllers/activity.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use(adminMiddleware);

adminRouter.get("/users", getAllUsers);
adminRouter.get("/users/:id", getSingleUser);
adminRouter.patch("/users/:id/status", updateUserStatus);
adminRouter.delete("/users/:id", deleteUser);

adminRouter.get("/tasks", getAllTasksAdmin);
adminRouter.delete("/tasks/:id", deleteAnyTask);

adminRouter.get("/analytics", getAnalytics);
adminRouter.get("/activity-logs", getActivityLogs);

module.exports = adminRouter;