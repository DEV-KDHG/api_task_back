const express = require('express');
const State = require("../models/State"); 

const router = express.Router();

// Create a new category
router.post('/state', async (req, res) => {
  try {
    const state = new State(req.body);
    await state.save();
    res.status(201).send(state);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get('/state', async (req, res) => {
  try {
    const state = await State.find({});
    res.status(200).send(state);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/state/:id', async (req, res) => {
  try {
    const state = await State.findById(req.params.id);
    if (!state) {
      return res.status(404).send();
    }
    res.status(200).send(state);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a category by ID
router.patch('/state/:id', async (req, res) => {
  try {
    const state = await State.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!state) {
      return res.status(404).send();
    }
    res.status(200).send(state);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a category by ID
router.delete('/state/:id', async (req, res) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state) {
      return res.status(404).send();
    }
    res.status(200).send(state);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;