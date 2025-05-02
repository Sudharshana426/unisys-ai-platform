import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Achievement from '../models/Achievement';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ 
      message: 'Error fetching achievements',
      error: error.message 
    });
  }
});

// Create new achievement
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { type, name, date, position, category, project, teamSize, team, authors, publication, doi, abstract } = req.body;
    
    const achievementData: any = {
      type,
      name,
      date,
      ...(type === 'hackathon' && {
        position,
        category,
        project,
        teamSize
      }),
      ...(type === 'competition' && {
        position,
        category,
        team
      }),
      ...(type === 'paper' && {
        authors,
        publication,
        doi,
        abstract
      })
    };

    if (req.file) {
      achievementData.fileURL = `/uploads/${req.file.filename}`;
      achievementData.fileName = req.file.originalname;
    }

    const achievement = new Achievement(achievementData);
    await achievement.save();

    res.status(201).json(achievement);
  } catch (error) {
    console.error('Error creating achievement:', error);
    res.status(500).json({ 
      message: 'Error creating achievement',
      error: error.message 
    });
  }
});

// Delete achievement
router.delete('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    res.status(500).json({ 
      message: 'Error deleting achievement',
      error: error.message 
    });
  }
});

export default router; 