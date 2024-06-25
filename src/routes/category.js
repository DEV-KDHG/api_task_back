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

module.exports = router;

