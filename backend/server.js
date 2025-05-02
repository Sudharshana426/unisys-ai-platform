require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require('axios');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:8080',
  credentials: true
}));
app.use(bodyParser.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error: ", err));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer for file uploads (Stores files in `uploads/`)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Import routes
const achievementRoutes = require("./routes/achievementRoutes");
const authRoutes = require("./routes/authRoutes");
const certificationRoutes = require('./routes/certificationRoutes');
const learningResourceRoutes = require('./routes/learningResourceRoutes');

// Use API routes
app.use("/api/achievements", achievementRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/learning-resources', learningResourceRoutes);

// Proxy route for Devpost hackathons
app.get('/api/hackathons/devpost', async (req, res) => {
  try {
    const response = await axios.get('https://devpost.com/api/hackathons?upcoming=true');
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching Devpost hackathons:', err.message);
    res.status(500).json({ error: 'Failed to fetch from Devpost' });
  }
});

// Proxy route for HackerEarth hackathons
app.get('/api/hackathons/hackerearth', async (req, res) => {
  try {
    const response = await axios.get('https://www.hackerearth.com/chrome-extension/events/');
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching HackerEarth hackathons:', err.message);
    res.status(500).json({ error: 'Failed to fetch from HackerEarth' });
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

