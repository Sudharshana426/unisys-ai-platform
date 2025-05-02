import mongoose from 'mongoose';

const learningResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: String,
  // No userId field
});

const LearningResource = mongoose.model('LearningResource', learningResourceSchema);

export default LearningResource; 