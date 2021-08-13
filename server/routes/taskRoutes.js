const express = require("express");

const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/task");
const {taskValidator} = require("../middleware/taskValidator")
const { requireSignin } = require("../controllers/authentication");

const router = express.Router();

router.post("/task",  requireSignin,taskValidator, createTask);
router.get("/tasks", requireSignin, getTasks);
router.put("/task",  requireSignin,taskValidator, updateTask);
router.delete('/task',requireSignin, deleteTask)

module.exports = router;