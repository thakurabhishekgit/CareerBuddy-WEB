import { Router } from 'express';
import upload from '../middlewares/upload.js';
import { uploadCertificate } from '../controllers/certificateController.js'; // Check this line

const router = Router();

// Define the route for file uploads
router.post('/upload', upload.single('certificate'), uploadCertificate);

export default router;