const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');

// Get all certifications
router.get('/', async (req, res) => {
  try {
    const certifications = await Certification.find();
    res.json(certifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single certification by ID
router.get('/:id', async (req, res) => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (!cert) return res.status(404).json({ error: 'Not found' });
    res.json(cert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new certification
router.post('/', async (req, res) => {
  try {
    const cert = new Certification(req.body);
    await cert.save();
    res.status(201).json(cert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a certification
router.put('/:id', async (req, res) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cert) return res.status(404).json({ error: 'Not found' });
    res.json(cert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a certification
router.delete('/:id', async (req, res) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 