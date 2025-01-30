import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"]
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number"]
  },
  address: {
    type: String,
    required: [true, "Please enter your address"]
  },
  password: {
    type: String,
    required: [true, "Please enter your password"]
  },
  role: {
    type: String,
    enum: ['Employer', 'Job Seeker' , 'SchoolAdmin'],
    required: [true, "Please specify the role"]
  },
  // Conditional fields for Job Seeker

  niches : {
  firstNiche: {
    type: String,
    required: function () {
      return this.role === 'Job Seeker';
    }
  },
  secondNiche: {
    type: String,
    required: function () {
      return this.role === 'Job Seeker';
    }
  },
  thirdNiche: {
    type: String,
    required: function () {
      return this.role === 'Job Seeker';
    }
  },
},
  Social_Marks: {
    type: Number,
    required: function () {
      return this.role === 'Job Seeker';
    }
  },
  English_Marks: {
    type: Number,
    required: function () {
      return this.role === 'Job Seeker';
    }
  },
  Science_Marks: {
    type: Number,
    required: function () {
      return this.role === 'Job Seeker';
    }
  },
  Mathematics_Marks: {
    type: Number,
    required: function () {
      return this.role === 'Job Seeker';
    }
  },
  academicDetails_Overall: {
    type: String,
    required: function () {
      return this.role === 'Job Seeker';
    }
  },
  School: {
    type: String,
    /*required: function () {
      return this.role === 'Job Seeker' || 'SchoolAdmin';
    }*/
  },
  hobbies: {
    type: String,
    required: function () {
      return this.role === 'Job Seeker';
    }
  },
  // Resume for Job Seeker (optional)
  resume: {
    public_id: String,
    url: String,
  },
  // Uploads for image and description
  
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
