import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { sendToken } from "../utils/jwtToken.js";


export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      password,
      role,
      firstNiche,
      secondNiche,
      thirdNiche,
      coverLetter,
      Social_Marks,
      English_Marks,
      Science_Marks,
      Mathematics_Marks,
      academicDetails_Overall,
      School,
      hobbies,
    } = req.body;

    // Check if common fields are provided for both roles
    if (!name || !email || !phone || !address || !password || !role) {
      return next(new ErrorHandler("All fields are required.", 400));
    }

    // Additional checks for "Job Seeker"
    if (role === "Job Seeker") {
      if (
        !firstNiche ||
        !secondNiche ||
        !thirdNiche ||
        !Social_Marks ||
        !Science_Marks ||
        !English_Marks ||
        !Mathematics_Marks ||
        !academicDetails_Overall ||
        !School ||
        !hobbies
      ) {
        return next(
          new ErrorHandler(
            "Please provide all necessary details for job seekers.",
            400
          )
        );
      }
    }

    // No additional details required for "Employer"
    if (role === "Employer") {
      if (!name || !email || !phone || !address || !password) {
        return next(
          new ErrorHandler("Please provide name, email, phone, address, and password.", 400)
        );
      }
    }
    if(role == "SchoolAdmin"){
      if(!name || !email || !phone || !address || !password || !School){
        return next(
          new ErrorHandler("Please provide name, email, phone, address, and password School Admin.",400)
        );
      }
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("Email is already registered.", 400));
    }

    // User data object initialization
    const userData = {
      name,
      email,
      phone,
      address,
      password,
      role,
    };

    // If "Job Seeker", add additional fields
    if (role === "Job Seeker") {
      userData.niches = {
        firstNiche,
        secondNiche,
        thirdNiche,
      };
      userData.coverLetter = coverLetter;
      userData.Social_Marks = Social_Marks;
      userData.English_Marks = English_Marks;
      userData.Science_Marks = Science_Marks;
      userData.Mathematics_Marks = Mathematics_Marks;
      userData.academicDetails_Overall = academicDetails_Overall;
      userData.School = School;
      userData.hobbies = hobbies;
    }
    if(role == "SchoolAdmin"){
      userData.School = School;
    }

    // Upload resume for "Job Seeker" if provided
    if (role === "Job Seeker" && req.files && req.files.resume) {
      const { resume } = req.files;
      if (resume) {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            { folder: "Job_Seekers_Resume" }
          );
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(
              new ErrorHandler("Failed to upload resume to cloud.", 500)
            );
          }
          userData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
        } catch (error) {
          return next(new ErrorHandler("Failed to upload resume", 500));
        }
      }
    }

 
    const user = await User.create(userData);

    
    sendToken(user, 201, res, "User Registered.");
  } catch (error) {
    next(error);
  }
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { role, email, password } = req.body;
 

     
  if (!role || !email || !password) {
    return next(
      new ErrorHandler("Email, password and role are required.", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler("Invalid user role.", 400));
  }
  sendToken(user, 200, res, "User logged in successfully.");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const getUsersBySchool = catchAsyncErrors(async (req, res, next) => {
  const { School } = req.params; // Assuming the school name is provided in the URL parameters

  if (!School) {
    return next(new ErrorHandler("School name is required.", 400));
  }

  const users = await User.find({ School }); // Query users by the school field

  if (users.length === 0) {
    return next(new ErrorHandler(`No users found for school: ${School}`, 404));
  }

  res.status(200).json({
    success: true,
    users,
  });
});





export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    coverLetter: req.body.coverLetter,
    niches: {
      firstNiche: req.body.firstNiche,
      secondNiche: req.body.secondNiche,
      thirdNiche: req.body.thirdNiche,
    },
  };
  const { firstNiche, secondNiche, thirdNiche } = newUserData.niches;

  if (
    req.user.role === "Job Seeker" &&
    (!firstNiche || !secondNiche || !thirdNiche)
  ) {
    return next(
      new ErrorHandler("Please provide your all preferred job niches.", 400)
    );
  }
  if (req.files) {
    const resume = req.files.resume;
    if (resume) {
      const currentResumeId = req.user.resume.public_id;
      if (currentResumeId) {
        await cloudinary.uploader.destroy(currentResumeId);
      }
      const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
        folder: "Job_Seekers_Resume",
      });
      newUserData.resume = {
        public_id: newResume.public_id,
        url: newResume.secure_url,
      };
    }
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
    message: "Profile updated.",
  });
});


export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect.", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("New password & confirm password do not match.", 400)
    );
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res, "Password updated successfully.");
});
