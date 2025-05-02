const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["hackathon", "competition", "paper"]
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  position: { type: String, trim: true },
  category: { type: String, trim: true },
  project: { type: String, trim: true },
  teamSize: { type: String, min: 1 },
  team: { type: String, trim: true },
  authors: { type: String, trim: true },
  publication: { type: String, trim: true },
  doi: { type: String, trim: true },
  abstract: { type: String, trim: true },
  fileURL: { type: String, trim: true },
  fileName: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt timestamp before saving
AchievementSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Achievement", AchievementSchema);
