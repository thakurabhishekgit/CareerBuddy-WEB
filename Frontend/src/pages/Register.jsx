import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Register = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThirdNiche] = useState("");
  const [hobbies, sethobbies] = useState("");
  const [academicDetails_Overall, setacademicDetails_Overall] = useState("");
  const [Mathematics_Marks, setMathematics_Marks] = useState("");
  const [Science_Marks, setScience_Marks] = useState("");
  const [Social_Marks, setSocial_Marks] = useState("");
  const [English_Marks, setEnglish_Marks] = useState("");
  const [schoolAchievement, setschoolAchievement] = useState("");
  const [extraCurriculars, setextraCurriculars] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");
  const [School, setSchool] = useState("");

  const nichesArray = [
    "MPC (Mathematics, Physics, Chemistry)",
    "BiPC (Biology, Physics, Chemistry)",
    "Commerce with Mathematics",
    "Humanities with Mathematics",
    "Commerce without Mathematics",
    "Humanities with Arts",
    "Vocational Courses (e.g., IT, Mechanical, Electrical)",
    "Engineering Sciences",
    "Medical Sciences",
    "Design and Fine Arts",
    "Hotel Management and Catering Technology",
    "Polytechnic and Diploma Courses",
    "Agriculture and Allied Sciences",
    "Aviation and Travel",
    "Defense Services",
    "Business and Management",
    "Computer Applications",
    "Environmental Studies",
    "Social Sciences",
  ];

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    if (role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
      formData.append("hobbies", hobbies);
      formData.append("academicDetails_Overall", academicDetails_Overall);
      formData.append("Mathematics_Marks", Mathematics_Marks);
      formData.append("Science_Marks", Science_Marks);
      formData.append("Social_Marks", Social_Marks);
      formData.append("English_Marks", English_Marks);
      formData.append("schoolAchievement", schoolAchievement);
      formData.append("extraCurriculars", extraCurriculars);
      formData.append("resume", resume);
      formData.append("School", School);
    }
    if (role == "SchoolAdmin") {
      formData.append("School", School);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated, message]);

  return (
    <>
      <section className="register-page">
        <div className="content-wrapper">
          <div className="info-container">
            <h2>Join Our Career Guidance Community!</h2>
            <p>
              Not sure if MPC, BiPC, or another stream is right for you after
              10th grade? Join us to unlock tailored career advice and explore
              your options with clarity. Connect with experts and chart a
              confident path to your future!
            </p>
            <img
              src="data:image/jpeg;base64,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"
              alt="Register Illustration"
            />
          </div>
          <div className="register-container">
            <div className="register-header">
              <h3>Create a new account</h3>
            </div>
            <form onSubmit={handleRegister}>
              <div className="register-wrapper">
                <div className="form-group">
                  <label>Register As</label>
                  <div className="input-wrapper">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select Role</option>
                      <option value="Job Seeker">Register as a Student</option>
                      <option value="Employer">
                        Register as a College admin
                      </option>
                      <option value="SchoolAdmin">
                        Register as a School Admin
                      </option>
                    </select>
                    <FaRegUser className="input-icon" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FaPencilAlt className="input-icon" />
                  </div>
                </div>
              </div>
              <div className="register-wrapper">
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      placeholder="youremail@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <MdOutlineMailOutline className="input-icon" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      placeholder="91 +"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <FaPhoneFlip className="input-icon" />
                  </div>
                </div>
              </div>
              <div className="register-wrapper">
                <div className="form-group">
                  <label>Address</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Your Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <FaAddressBook className="input-icon" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      placeholder="Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <RiLock2Fill className="input-icon" />
                  </div>
                </div>
              </div>
              {role === "SchoolAdmin" && (
                <>
                  <div className="register-wrapper">
                    <div className="form-group">
                      <label>School</label>
                      <div className="input-wrapper">
                        <textarea
                          value={School}
                          onChange={(e) => setSchool(e.target.value)}
                          rows={1}
                          className="textarea"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {role === "Job Seeker" && (
                <>
                  <div className="register-wrapper">
                    <div className="form-group">
                      <label>Your First Domain</label>
                      <div className="input-wrapper">
                        <select
                          value={firstNiche}
                          onChange={(e) => setFirstNiche(e.target.value)}
                        >
                          <option value="">Your Domain</option>
                          {nichesArray.map((niche, index) => {
                            return (
                              <option key={index} value={niche}>
                                {niche}
                              </option>
                            );
                          })}
                        </select>
                        <MdCategory className="input-icon" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Your Second Domain</label>
                      <div className="input-wrapper">
                        <select
                          value={secondNiche}
                          onChange={(e) => setSecondNiche(e.target.value)}
                        >
                          <option value="">Your Domain</option>
                          {nichesArray.map((niche, index) => {
                            return (
                              <option key={index} value={niche}>
                                {niche}
                              </option>
                            );
                          })}
                        </select>
                        <MdCategory className="input-icon" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Your Third Domain</label>
                      <div className="input-wrapper">
                        <select
                          value={thirdNiche}
                          onChange={(e) => setThirdNiche(e.target.value)}
                        >
                          <option value="">Your Domain</option>
                          {nichesArray.map((niche, index) => {
                            return (
                              <option key={index} value={niche}>
                                {niche}
                              </option>
                            );
                          })}
                        </select>
                        <MdCategory className="input-icon" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Hobbies</label>
                    <div className="input-wrapper">
                      <input
                        type="String"
                        value={hobbies}
                        onChange={(e) => sethobbies(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>academicDetails_Overall</label>
                      <div className="input-wrapper">
                        <input
                          type="Number"
                          value={academicDetails_Overall}
                          onChange={(e) =>
                            setacademicDetails_Overall(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Mathematics_Marks</label>
                      <div className="input-wrapper">
                        <input
                          type="Number"
                          value={Mathematics_Marks}
                          onChange={(e) => setMathematics_Marks(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Science_Marks</label>
                      <div className="input-wrapper">
                        <input
                          type="Number"
                          value={Science_Marks}
                          onChange={(e) => setScience_Marks(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Social_Marks</label>
                      <div className="input-wrapper">
                        <input
                          type="Number"
                          value={Social_Marks}
                          onChange={(e) => setSocial_Marks(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>English_Marks</label>
                      <div className="input-wrapper">
                        <input
                          type="Number"
                          value={English_Marks}
                          onChange={(e) => setEnglish_Marks(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>schoolAchievement</label>
                      <div className="input-wrapper">
                        <input
                          type="String"
                          value={schoolAchievement}
                          onChange={(e) => setschoolAchievement(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>extraCurriculars</label>
                      <div className="input-wrapper">
                        <input
                          type="String"
                          value={extraCurriculars}
                          onChange={(e) => setextraCurriculars(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Cover Letter</label>
                      <div className="input-wrapper">
                        <textarea
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          rows={4}
                          className="textarea"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>School</label>
                      <div className="input-wrapper">
                        <textarea
                          value={School}
                          onChange={(e) => setSchool(e.target.value)}
                          rows={4}
                          className="textarea"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              <button type="submit" disabled={loading}>
                Register
              </button>
              <Link to={"/login"}>Login Now</Link>
            </form>
          </div>
        </div>
      </section>
      <style jsx>{`
        .register-page {
          display: flex;
          justify-content: flex-start; /* Aligns content to the left */
          align-items: flex-start; /* Aligns content to the top */
          height: 100vh; /* Full viewport height */
          background: white;
          width: 100%; /* Ensures the section takes up full width */
          padding: 20px; /* Adds padding for better spacing */
          position: relative; /* Allows the info-container to be positioned relative to this */
        }

        .content-wrapper {
          display: flex;
          flex-direction: row; /* Row layout to place info and form side by side */
          justify-content: flex-start; /* Aligns children to the start (left) */
          align-items: flex-start; /* Aligns children to the top */
          width: 100%;
          max-width: 1200px; /* Increased max-width for a wider layout */
        }

        .info-container {
          /* Fixed positioning to keep it in place while scrolling */
          top: 80px; /* Move the info-container down */
          left: 20px; /* Distance from the left */
          width: 600px; /* Fixed width for better layout control */
          padding: 20px;
          background: #f9f9f9; /* Background color for visibility */
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Slight shadow for better visibility */
          z-index: 10; /* Ensures it stays above other content */
        }

        .info-container img {
          width: 100%;
          border-radius: 10px;
          margin-top: 20px;
        }

        .register-container {
          margin-left: 140px; /* Adjust space for the fixed info-container */
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          text-align: center;
          width: calc(
            100% - 340px
          ); /* Adjust width to account for the fixed info-container */
          max-width: 600px; /* Sets a max-width for better layout control */
        }

        .register-header h3 {
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
        }

        form {
          display: flex;
          flex-direction: column;
          width: 100%; /* Ensures the form takes up full width */
        }

        .register-wrapper {
          display: flex;
          flex-direction: column; /* Column layout for better responsiveness */
          gap: 20px;
          margin-bottom: 20px;
          width: 100%; /* Ensures the wrapper takes up full width */
        }

        .form-group {
          flex: 1;
          margin-bottom: 20px;
          text-align: left;
          width: 100%; /* Ensures the group takes up full width */
        }

        .form-group label {
          margin-bottom: 5px;
          display: block;
          color: #333;
        }

        .input-wrapper {
          position: relative;
          width: 100%; /* Ensures the wrapper takes up full width */
        }

        .input-wrapper input,
        .input-wrapper select,
        .input-wrapper textarea {
          width: 100%;
          padding: 10px 40px 10px 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .input-icon {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
        }

        .textarea {
          resize: none;
          height: 100px;
        }

        button {
          padding: 10px;
          border: none;
          border-radius: 5px;
          background-color: #6e8efb;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
          width: 100%; /* Ensures the button takes up full width */
        }

        button:hover {
          background-color: #a777e3;
        }

        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        a {
          margin-top: 10px;
          color: #6e8efb;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        @media (min-width: 768px) {
          .register-page {
            padding: 40px; /* Increased padding for larger screens */
          }

          .info-container {
            top: 100px; /* Adjust top margin for larger screens */
            width: 400px; /* Increased width for larger screens */
          }

          .register-container {
            margin-left: 420px; /* Adjust margin to accommodate larger info-container */
            width: calc(
              100% - 420px
            ); /* Adjust width to accommodate larger info-container */
          }
        }
      `}</style>
    </>
  );
};

export default Register;