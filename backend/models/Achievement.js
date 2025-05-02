const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  type: String, // "hackathon", "competition", "paper"
  name: String,
  date: String,
  position: String,
  category: String,
  project: String,
  teamSize: Number,
  team: String,
  authors: String,
  publication: String,
  doi: String,
  abstract: String,
  fileURL: String, // Stores file path
});

module.exports = mongoose.model("Achievement", achievementSchema);
