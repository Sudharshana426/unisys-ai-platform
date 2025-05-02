import mongoose from 'mongoose';

const learningResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: String,
  // Remove userId field
}, { timestamps: true });

const LearningResource = mongoose.model('LearningResource', learningResourceSchema);

export default LearningResource; 