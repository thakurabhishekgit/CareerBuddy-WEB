const mongoose = require('mongoose');

const MCQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String], 
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  domain: {
    type: String
  },
  review: {
    type: String,
    //required: true
  },
  
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    //required: true,
    ref: 'Video' // This will help in cross-referencing if needed
  }
});

const MentorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  school: {
    type: String
  },
  tenPlusTwo: {
    type: String
  },
  degree: {
    type: String
  },
  phd: {
    type: String
  },
  videos: [{
    videoUrl: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    domain: {
      type: String
    },
    experience: {
      type: Number
    },
    phd: {
      type: String
    },
    mcqs: [MCQSchema],
    whatsapp: {
      type: String
    },
    thumbnail: {
      type: String // Add thumbnail URL field
    },
    
    
    students: [StudentSchema] // Add student information related to this video
  }]
});

module.exports = mongoose.model('Mentor', MentorSchema);
