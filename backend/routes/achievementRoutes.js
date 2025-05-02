const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only specific file types
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, JPEG, and PNG files are allowed.'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Error handling middleware
const handleError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
};

// Get all achievements
router.get('/', async (req, res, next) => {
  try {
    const achievements = await Achievement.find().sort({ date: -1 });
    res.json(achievements);
  } catch (error) {
    next(error);
  }
});

// Get single achievement
router.get('/:id', async (req, res, next) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.json(achievement);
  } catch (error) {
    next(error);
  }
});

// Create a new achievement with file upload
router.post('/', upload.single('file'), async (req, res, next) => {
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
    if (req.file) {
      // Delete uploaded file if achievement creation fails
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    next(error);
  }
});

// Update an achievement
router.put('/:id', upload.single('file'), async (req, res, next) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    const achievementData = {
      ...req.body,
      fileURL: req.file ? `/uploads/${req.file.filename}` : achievement.fileURL,
      fileName: req.file ? req.file.originalname : achievement.fileName
    };

    // Delete old file if new file is uploaded
    if (req.file && achievement.fileURL) {
      const oldFilePath = path.join(__dirname, '..', achievement.fileURL);
      fs.unlink(oldFilePath, (err) => {
        if (err) console.error('Error deleting old file:', err);
      });
    }

    const updatedAchievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      achievementData,
      { new: true, runValidators: true }
    );
    res.json(updatedAchievement);
  } catch (error) {
    if (req.file) {
      // Delete uploaded file if update fails
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    next(error);
  }
});

// Delete an achievement
router.delete('/:id', async (req, res, next) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    if (achievement.fileURL) {
      const filePath = path.join(__dirname, '..', achievement.fileURL);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Apply error handling middleware
router.use(handleError);

module.exports = router;
