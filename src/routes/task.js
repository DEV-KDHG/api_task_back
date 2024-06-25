const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Category = require("../models/category"); // Asegúrate de tener el modelo de Category
const State = require("../models/State");//Asegúrate de tener el modelo de State

// Crear tarea
router.post("/tasks", async (req, res) => {
  try {
    const { name, description, categoriaId, estadoId } = req.body;

    // Verificar si la categoría y el estado existen
    const category = await Category.findById(categoriaId);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    const state = await State.findById(estadoId);
    if (!state) {
      return res.status(404).json({ message: "Estado no encontrado" });
    }

    const task = new Task({ name, description, categoriaId, estadoId });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todas las tareas
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('categoriaId') // Población de la categoría
      .populate('estadoId');  // Población del estado

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una tarea por ID
router.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id)
      .populate('categoriaId') // Población de la categoría
      .populate('estadoId');  // Población del estado

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar una tarea por ID
router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
