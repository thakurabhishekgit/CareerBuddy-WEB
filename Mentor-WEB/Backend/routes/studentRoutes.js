const express = require('express');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register a student
router.post('/register', async (req, res) => {
    const {
        name,
        email,
        phone,
        password,
        interestedDomain,
        schoolName,
        marks,
        percentage10th,
        bio
    } = req.body;

    try {
        // Check if the student already exists
        let student = await Student.findOne({ email });

        if (student) {
            return res.status(400).json({ message: 'Student already exists' });
        }

        // Create a new student
        student = new Student({
            name,
            email,
            phone,
            password,
            interestedDomain,
            schoolName,
            marks,
            percentage10th,
            bio
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(password, salt);

        // Save the student to the database
        await student.save();

        // Return JWT
        const payload = {
            user: {
                id: student.id,
                type: 'student'
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                // Respond with success message and token
                res.status(201).json({
                    message: 'Student has been successfully registered',
                    token: token
                });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login a student
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the student exists
        let student = await Student.findOne({ email });

        if (!student) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Return JWT
        const payload = {
            user: {
                id: student.id,
                type: 'student'
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, message: 'Student logged in successfully' });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
