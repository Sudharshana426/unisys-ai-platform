import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  credentialId: String,
  credentialUrl: String,
  // No userId field
});

const Certification = mongoose.model('Certification', certificationSchema);

export default Certification; 