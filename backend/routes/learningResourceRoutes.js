const express = require('express');
const router = express.Router();
const LearningResource = require('../models/LearningResource');

// Get all learning resources
router.get('/', async (req, res) => {
  try {
    const resources = await LearningResource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single learning resource by ID
router.get('/:id', async (req, res) => {
  try {
    const resource = await LearningResource.findById(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Not found' });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new learning resource
router.post('/', async (req, res) => {
  try {
    const resource = new LearningResource(req.body);
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a learning resource
router.put('/:id', async (req, res) => {
  try {
    const resource = await LearningResource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) return res.status(404).json({ error: 'Not found' });
    res.json(resource);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a learning resource
router.delete('/:id', async (req, res) => {
  try {
    const resource = await LearningResource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 