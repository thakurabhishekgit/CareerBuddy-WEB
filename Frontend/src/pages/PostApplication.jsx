import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import styled from "styled-components";

const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications
  );

  const { jobId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");
  const [hobbies, sethobbies] = useState("");
  const [academicDetails_Overall, setacademicDetails_Overall] = useState("");
  const [Mathematics_Marks, setMathematics_Marks] = useState("");
  const [Science_Marks, setScience_Marks] = useState("");
  const [Social_Marks, setSocial_Marks] = useState("");
  const [English_Marks, setREnglish_Marks] = useState("");
  const [schoolAchievement, setschoolAchievement] = useState("");
  const [extraCurriculars, setextraCurriculars] = useState("");
  

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("hobbies", hobbies);
    formData.append("academicDetails_Overall", academicDetails_Overall);
    formData.append("Mathematics_Marks",Mathematics_Marks );
    formData.append("Science_Marks", Science_Marks);
    formData.append("Social_Marks", Social_Marks);
    formData.append("English_Marks", English_Marks);
    formData.append("schoolAchievement",schoolAchievement );
    formData.append("extraCurriculars", extraCurriculars);

    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(postApplication(formData, jobId));
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setCoverLetter(user.coverLetter || "");
      setResume((user.resume && user.resume.url) || "");
      sethobbies(user.hobbies);
      setacademicDetails_Overall(user.setacademicDetails_Overall);
      setMathematics_Marks(user.setMathematics_Marks);
      setScience_Marks(user.setScience_Marks);
      setSocial_Marks(user.Social_Marks);
      setREnglish_Marks(user.setREnglish_Marks);
      setschoolAchievement(user.schoolAchievement);
      setextraCurriculars(user.setextraCurriculars)



    }
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, message, jobId, user]);

  let qualifications = [];
  let responsibilities = [];
  let offering = [];
  if (singleJob.qualifications) {
    qualifications = singleJob.qualifications.split(". ");
  }
  if (singleJob.responsibilities) {
    responsibilities = singleJob.responsibilities.split(". ");
  }
  if (singleJob.offers) {
    offering = singleJob.offers.split(". ");
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  return (
    <Container>
      <ApplicationForm onSubmit={handlePostApplication}>
        <h3>Application Form</h3>
        <FormGroup>
          <label>Role</label>
          <input type="text" placeholder={singleJob.title} disabled />
        </FormGroup>
        <FormGroup>
          <label>Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>Your Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </FormGroup>
        {user && user.role === "Job Seeker" && (
            
          <FormGroup>
            <label>Cover Letter</label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={6}
              required
            />
            <label>Hobbies</label>
            <textarea
              value={hobbies}
              onChange={(e) => sethobbies(e.target.value)}
              rows={1}
              required
            />
          </FormGroup>
          
          
        )}
        {isAuthenticated && user.role === "Job Seeker" && (
          <ButtonGroup>
            <button type="submit" disabled={loading}>
              {loading ? "Applying..." : "Apply"}
            </button>
          </ButtonGroup>
        )}
      </ApplicationForm>

      <JobDetails>
        <header>
          <h3>{singleJob.title}</h3>
          {singleJob.personalWebsite && (
            <Link target="_blank" to={singleJob.personalWebsite.url}>
              {singleJob.personalWebsite.title}
            </Link>
          )}
          <p>{singleJob.location}</p>
          <p>Rs. {singleJob.salary} a month</p>
        </header>
        <hr />
        <section>
          <DetailWrapper>
            <h3>Job Details</h3>
            <DetailItem>
              <IoMdCash />
              <div>
                <span>Pay</span>
                <span>{singleJob.salary} a month</span>
              </div>
            </DetailItem>
            <DetailItem>
              <FaToolbox />
              <div>
                <span>Job Type</span>
                <span>{singleJob.jobType}</span>
              </div>
            </DetailItem>
          </DetailWrapper>
          <hr />
          <DetailWrapper>
            <h3>Location</h3>
            <LocationWrapper>
              <FaLocationDot />
              <span>{singleJob.location}</span>
            </LocationWrapper>
          </DetailWrapper>
          <hr />
          <DetailWrapper>
            <h3>Full Job Description</h3>
            <p>{singleJob.introduction}</p>
            {singleJob.qualifications && (
              <div>
                <h4>Qualifications</h4>
                <ul>
                  {qualifications.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {singleJob.responsibilities && (
              <div>
                <h4>Responsibilities</h4>
                <ul>
                  {responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {singleJob.offers && (
              <div>
                <h4>Offering</h4>
                <ul>
                  {offering.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </DetailWrapper>
        </section>
        <hr />
        <footer>
          <h3>Job Niche : </h3>
          <p> </p>
          <p>{singleJob.jobNiche}</p>
        </footer>
      </JobDetails>
    </Container>
  );
};

export default PostApplication;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
`;

const ApplicationForm = styled.form`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 40%;
  max-width: 600px;

  h3 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  textarea {
    resize: vertical;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  text-align: center;

  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

const JobDetails = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 55%;
  max-width: 800px;
  margin-left: 20px;

  header {
    h3 {
      margin: 0 0 10px;
      font-size: 24px;
      color: #333;
    }

    p {
      margin: 5px 0;
      font-size: 16px;
      color: #666;
    }

    a {
      color: #007bff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  section {
    margin-top: 20px;

    hr {
      margin: 20px 0;
      border: 0;
      border-top: 1px solid #ddd;
    }
  }

  footer {
    margin-top: 20px;

    h3 {
      margin: 0 0 10px;
      font-size: 20px;
      color: #333;
    }

    p {
      font-size: 16px;
      color: #666;
    }
  }
`;

const DetailWrapper = styled.div`
  margin-bottom: 20px;

  h3 {
    margin-bottom: 10px;
    font-size: 20px;
    color: #333;
  }

  div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;

    svg {
      margin-right: 10px;
      color: #007bff;
    }
  }
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  div {
    span {
      display: block;
      font-size: 16px;
    }

    span:first-child {
      color: #666;
    }

    span:last-child {
      font-weight: bold;
      color: #333;
    }
  }
`;

const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;

  svg {
    margin-right: 10px;
    color: #007bff;
  }
`;