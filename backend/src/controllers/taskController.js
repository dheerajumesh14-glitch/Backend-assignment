const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CREATE TASK
// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body; // ✅ first

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user.userId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error creating task" });
  }
};

// GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.userId },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// GET ONE TASK
exports.getTaskById = async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task" });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: { title, description, status },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
    console.error(error.message);
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    await prisma.task.delete({
      where: { id: req.params.id },
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};