const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Get all achievementsI n
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new achievement with file upload
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const achievementData = {
      ...req.body,
      fileURL: req.file ? `/uploads/${req.file.filename}` : null,
      fileName: req.file ? req.file.originalname : null
    };
    const achievement = new Achievement(achievementData);
    const newAchievement = await achievement.save();
    res.status(201).json(newAchievement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an achievement
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const achievementData = {
      ...req.body,
      fileURL: req.file ? `/uploads/${req.file.filename}` : req.body.fileURL,
      fileName: req.file ? req.file.originalname : req.body.fileName
    };
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      achievementData,
      { new: true }
    );
    res.json(achievement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an achievement
router.delete('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (achievement.fileURL) {
      // Delete the file from uploads directory
      const filePath = path.join(__dirname, '..', achievement.fileURL);
      require('fs').unlink(filePath, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Achievement deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
