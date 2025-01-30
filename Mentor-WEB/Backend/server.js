const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const mentorRoutes = require('./routes/mentorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const path = require('path');
const cors = require('cors');
dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files
app.use('/thumbnails', express.static(path.join('C:/Users/thaku/OneDrive/Desktop/Mentor - Copy/Mentor-Student/uploads/thumbnails')));
console.log(path.join(__dirname, 'uploads/thumbnails'));

//app.use('/api/mentors', mentorRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/mentors',mentorRoutes)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
