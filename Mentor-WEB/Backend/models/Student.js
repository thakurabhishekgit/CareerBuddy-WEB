const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  interestedDomain: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  marks: {
    math: {
      type: Number,
      required: true,
    },
    physics: {
      type: Number,
      required: true,
    },
    chemistry: {
      type: Number,
      required: true,
    },
    english: {
      type: Number,
      required: true,
    },
  },
  percentage10th: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    required: false, // Optional field
  },
});

module.exports = mongoose.model('Student', studentSchema);
