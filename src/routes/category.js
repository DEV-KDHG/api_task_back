const express = require('express');
const Category = require('../models/category'); // Adjust the path as needed

const router = express.Router();

// Create a new category
router.post('/categories', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).send({ message: "Categoría no encontrada" });
    }

    res.status(200).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific category by ID
router.get('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send();
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a category by ID
router.patch('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) {
      return res.status(404).send();
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a category by ID
router.delete('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send();
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/categories/name/:nameCategory', async (req, res) => {
  try {
    const { nameCategory } = req.params;
    const category = await Category.findOne({ nameCategory: nameCategory });

    if (!category) {
      return res.status(404).send({ message: "Categoría no encontrada" });
    }

    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});



// Ruta para actualizar una categoría por nombre
router.put('/categories/name/:nameCategory', async (req, res) => {
  try {
    const { nameCategory } = req.params;
    const updates = req.body;
    console.log(`Actualizando categoría con nameCategory: ${nameCategory}`); // Log para depuración
    console.log(`Actualizaciones:`, updates); // Log para depuración

    // Buscar y actualizar la categoría
    const category = await Category.findOneAndUpdate(
      { nameCategory: nameCategory },
      updates,
      { new: true, runValidators: true } // Opciones para devolver el documento actualizado y validar
    );

    if (!category) {
      console.log("Categoría no encontrada"); // Log para depuración
      return res.status(404).send({ message: "Categoría no encontrada" });
    }

    res.status(200).send(category);
  } catch (error) {
    console.error("Error al actualizar categoría:", error); // Log para depuración
    res.status(400).send(error);
  }
});



module.exports = router;

