import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearAllUpdateProfileErrors,
  updateProfile,
} from "../store/slices/updateProfileSlice";
import { toast } from "react-toastify";
import { getUser } from "../store/slices/userSlice";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [address, setAddress] = useState(user && user.address);
  const [coverLetter, setCoverLetter] = useState(user && user.coverLetter);
  const [firstNiche, setFirstNiche] = useState(user && user.niches?.firstNiche);
  const [secondNiche, setSecondNiche] = useState(
    user && user.niches?.secondNiche
  );
  const [thirdNiche, setThirdNiche] = useState(user && user.niches?.thirdNiche);
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(user && user.resume?.url);

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    if (user && user.role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
    }
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated.");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, loading, error, isUpdated, user]);

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const nichesArray = [
    "Content Creator",
    "Content Writer/Copywriter",
    "Content Editor",
    "Social Media Manager",
    "Digital Marketing Specialist",
    "Graphic Designer",
    "Video Producer/Editor",
    "Content Strategist",
    "SEO Specialist",
    "Content Marketing Manager",
    "Community Manager",
    "Influencer Manager",
    "UX/UI Designer",
    "Web Developer",
    "Brand Strategist",
  ];

  return (
    <>
      <style>
        {`
          .account_components {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            font-family: 'Roboto', sans-serif;
          }

          .account_components h3 {
            margin-bottom: 20px;
            font-size: 24px;
            color: #333;
            text-align: center;
          }

          .account_components div {
            margin-bottom: 15px;
          }

          .account_components label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
          }

          .account_components input,
          .account_components select,
          .account_components textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
            color: #333;
            font-size: 16px;
            outline: none;
            transition: border-color 0.3s ease;
          }

          .account_components input:focus,
          .account_components select:focus,
          .account_components textarea:focus {
            border-color: #007bff;
          }

          .save_change_btn_wrapper {
            text-align: center;
          }

          .btn {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
          }

          .btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }

          .btn:hover:enabled {
            background-color: #0056b3;
          }

          @media (max-width: 768px) {
            .account_components {
              padding: 15px;
            }

            .account_components h3 {
              font-size: 20px;
            }

            .account_components input,
            .account_components select,
            .account_components textarea {
              font-size: 14px;
            }

            .btn {
              font-size: 14px;
            }
          }
        `}
      </style>
      <div className="account_components">
        <h3>Update Profile</h3>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {user && user.role === "Job Seeker" && (
          <>
            <div>
              <label>My Preferred Job Niches</label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <select
                  value={firstNiche}
                  onChange={(e) => setFirstNiche(e.target.value)}
                >
                  {nichesArray.map((element, index) => {
                    return (
                      <option value={element} key={index}>
                        {element}
                      </option>
                    );
                  })}
                </select>
                <select
                  value={secondNiche}
                  onChange={(e) => setSecondNiche(e.target.value)}
                >
                  {nichesArray.map((element, index) => {
                    return (
                      <option value={element} key={index}>
                        {element}
                      </option>
                    );
                  })}
                </select>
                <select
                  value={thirdNiche}
                  onChange={(e) => setThirdNiche(e.target.value)}
                >
                  {nichesArray.map((element, index) => {
                    return (
                      <option value={element} key={index}>
                        {element}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div>
              <label>Coverletter</label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={5}
              />
            </div>
          </>
        )}
        <div className="save_change_btn_wrapper">
          <button
            className="btn"
            onClick={handleUpdateProfile}
            disabled={loading}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;