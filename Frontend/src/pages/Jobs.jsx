import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import debounce from "lodash/debounce";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  // Debounced function to fetch jobs
  const debouncedFetchJobs = useCallback(
    debounce(() => {
      dispatch(fetchJobs(city, niche, searchKeyword));
    }, 300),
    [dispatch, city, niche, searchKeyword]
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    debouncedFetchJobs();
  }, [city, niche, searchKeyword, debouncedFetchJobs, error, dispatch]);

  const handleSearch = () => {
    debouncedFetchJobs();
  };

  const handleCityChange = (city) => {
    setCity((prevCity) => (prevCity === city ? "" : city));
  };

  const handleNicheChange = (niche) => {
    setNiche((prevNiche) => (prevNiche === niche ? "" : niche));
  };

  const cities = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Surat",
    "Pune",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Pimpri-Chinchwad",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
  ];

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
    "Social Sciences"
];


  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <JobsPage>
          <Sidebar>
            <h2>Filters</h2>
            <div className="filter-section">
              <h3>Filter By City</h3>
              {cities.map((city, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={`city-${index}`}
                    name="city"
                    value={city}
                    checked={selectedCity === city}
                    onChange={() => handleCityChange(city)}
                  />
                  <label htmlFor={`city-${index}`}>{city}</label>
                </div>
              ))}
            </div>
            <div className="filter-section">
              <h3>Filter By Niche</h3>
              {nichesArray.map((niche, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={`niche-${index}`}
                    name="niche"
                    value={niche}
                    checked={selectedNiche === niche}
                    onChange={() => handleNicheChange(niche)}
                  />
                  <label htmlFor={`niche-${index}`}>{niche}</label>
                </div>
              ))}
            </div>
          </Sidebar>
          <Content>
            <SearchBar>
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search by keyword..."
              />
              <button onClick={handleSearch}>Find College</button>
              <FaSearch />
            </SearchBar>
            <JobList>
              {jobs &&
                jobs.map((job) => (
                  <JobCard key={job._id}>
                    {job.hiringMultipleCandidates === "Yes" ? (
                      <p className="hiring-status multiple-candidates">
                        Hiring Multiple Candidates
                      </p>
                    ) : (
                      <p className="hiring-status single-candidate">College</p>
                    )}
                    <p className="job-title">{job.title}</p>
                    <p className="company-name">{job.companyName}</p>
                    <p className="job-location">{job.location}</p>
                   
                    <p className="job-posted">
                      <span>Posted On:</span> {job.jobPostedOn.substring(0, 10)}
                    </p>
                    <div className="apply-button-wrapper">
                      <Link
                        className="apply-button"
                        to={`/post/application/${job._id}`}
                      >
                        Apply Now
                      </Link>
                    </div>
                  </JobCard>
                ))}
            </JobList>
          </Content>
        </JobsPage>
      )}
    </>
  );
};

export default Jobs;

// Styled Components
const JobsPage = styled.section`
  display: flex;
  min-height: 100vh;
  overflow: hidden;
`;

const Sidebar = styled.div`
  position: fixed;
  width: 250px;
  height: 100vh;
  background-color: #333;
  color: #fff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  /* Hide scrollbar for all browsers */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  h2 {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .filter-section {
    margin-bottom: 20px;

    h3 {
      font-size: 16px;
      margin-bottom: 10px;
    }

    div {
      margin-bottom: 5px;

      input[type="radio"] {
        margin-right: 10px;
      }

      label {
        color: #fff;
        font-size: 14px;
      }
    }
  }
`;

const Content = styled.div`
  margin-left: 250px; /* Match the width of the Sidebar */
  padding: 20px;
  width: calc(100% - 250px); /* Adjust width to fit content area */
  height: 100vh;
  overflow-y: auto;

  /* Hide scrollbar for all browsers */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  input {
    flex: 1;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
  }

  button {
    background-color: #000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-left: 10px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #333;
    }
  }

  svg {
    color: #333;
    font-size: 20px;
    margin-left: 10px;
  }
`;

const JobList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const JobCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1 1 calc(33.333% - 20px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 250px; /* Ensures a consistent minimum height for the card */
  position: relative;

  &:hover {
    transform: translateY(-5px); /* Slight lift effect */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* Enhanced shadow */
    transition: all 0.3s ease-in-out;
  }

  .hiring-status {
    font-weight: bold;
    color: #007bff;
    margin-bottom: 10px;
  }

  .multiple-candidates {
    color: #28a745; /* Color for multiple candidates */
  }

  .single-candidate {
    color: #dc3545; /* Color for single candidate */
  }

  .job-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .company-name {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .job-location,
  .job-salary,
  .job-posted {
    font-size: 14px;
    margin-bottom: 5px;

    span {
      font-weight: bold;
    }
  }

  .apply-button-wrapper {
    margin-top: auto; /* Pushes the button to the bottom */
    text-align: center; /* Centers the button */
  }

  .apply-button {
    background-color: #000;
    color: #fff;
    padding: 10px 15px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #333;
    }
  }
`;