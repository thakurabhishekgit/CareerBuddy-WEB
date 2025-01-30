import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  filename: String,
  path: String,
  originalName: String,
  // Add additional fields if necessary
});

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;