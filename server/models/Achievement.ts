import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['hackathon', 'competition', 'paper']
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  // Hackathon specific fields
  position: String,
  category: String,
  project: String,
  teamSize: String,
  // Competition specific fields
  team: String,
  // Paper specific fields
  authors: String,
  publication: String,
  doi: String,
  abstract: String,
  // File upload fields
  fileURL: String,
  fileName: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Achievement = mongoose.model('Achievement', achievementSchema);

export default Achievement; 