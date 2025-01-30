import express from "express";
import { getUser, login, logout, register, updatePassword, updateProfile , getUsersBySchool  } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";


// Set up Multer storage


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.put("/update/profile", isAuthenticated, updateProfile)
router.put("/update/password", isAuthenticated, updatePassword)
router.get("/getusersbyschool/:School", getUsersBySchool)

export default router