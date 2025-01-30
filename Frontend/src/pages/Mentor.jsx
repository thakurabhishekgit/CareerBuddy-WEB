import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import SliderForMentor from "../components/SliderForMentor";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoDetails, setVideoDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quizResults, setQuizResults] = useState(null);
  const [congratulations, setCongratulations] = useState(false);
  const [oopsMessage, setOopsMessage] = useState(false);
  const [visibleMCQs, setVisibleMCQs] = useState([]);
  const [mcqBatch, setMcqBatch] = useState(1);
  const [timer, setTimer] = useState(5 * 60);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    domain: "",
  });

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        const response = await axios.get(
          "http://localhost:6968/api/mentors/videos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setVideos(response.data.videos);
      } catch (err) {
        setError("Error fetching videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoClick = async (videoFilename, videoDetails) => {
    const formattedUrl = `http://localhost:6968/api/mentors/videos/${videoFilename}`;
    setSelectedVideo(formattedUrl);
    setVideoDetails(videoDetails);

    if (videoDetails && videoDetails.mcqs) {
      setVisibleMCQs(videoDetails.mcqs.slice(0, 5));
    }

    setShowPopup(true);
    setTimer(5 * 60);

    const countdownInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countdownInterval);
          setShowPopup(false);
          setVisibleMCQs(videoDetails.mcqs.slice(0, 10));
          setMcqBatch(2);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  /* const filteredVideos = videos.filter((video) =>
    video.domain.toLowerCase().includes(searchQuery)
  );
  */
  const handleOptionClick = (questionIndex, optionIndex) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };
  const checkAnswers = () => {
    if (!videoDetails || !videoDetails.mcqs || mcqBatch !== 2) return;

    const results = videoDetails.mcqs.map((mcq, index) => {
      const selectedOptionText = mcq.options[selectedOptions[index]];

      return {
        questionIndex: index,
        selectedOption: selectedOptionText,
        correctOption: mcq.answer,
      };
    });

    setQuizResults(results);

    const allCorrect = results.every(
      (result) => result.selectedOption === result.correctOption
    );
    if (allCorrect && results.length === videoDetails.mcqs.length) {
      setCongratulations(true);
      setOopsMessage(false);
    } else {
      setCongratulations(false);
      setOopsMessage(true);
    }
  };
  const handleMouseDown = (e) => {
    const popup = popupRef.current;
    let shiftX = e.clientX - popup.getBoundingClientRect().left;
    let shiftY = e.clientY - popup.getBoundingClientRect().top;

    const onMouseMove = (event) => {
      popup.style.left = event.pageX - shiftX + "px";
      popup.style.top = event.pageY - shiftY + "px";
    };
    document.addEventListener("mousemove", onMouseMove);

    popup.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      popup.onmouseup = null;
    };
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  const [filterDomain, setFilterDomain] = useState("");

  const handleFilterChange = (domain) => {
    setFilterDomain(domain);
  };

  const filteredVideos = videos.filter(
    (video) =>
      (filterDomain ? video.domain === filterDomain : true) &&
      video.domain.toLowerCase().includes(searchQuery)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:6968/api/mentors/students/${videoDetails._id}`,
        formData
      );
      alert("Your information has been submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "There was an error submitting your information. Please try again."
      );
    }
  };

  return (
    <div style={styles.container}>
      {showPopup && (
        <div style={styles.popup} ref={popupRef} onMouseDown={handleMouseDown}>
          <p>
            Next set of questions will appear in {formatTime(timer)} minutes.
          </p>
        </div>
      )}
      <div>
        <SliderForMentor></SliderForMentor>
      </div>
      {!selectedVideo && (
        <>
          //how
          <input
            type="text"
            placeholder="Search by domain..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={styles.searchBar}
          />
          <div style={styles.filterSection}>
            <h3>Filter Your Domains</h3>
            <div style={styles.filterButtons}>
              <button
                onClick={() => handleFilterChange("MPC")}
                style={
                  filterDomain === "MPC"
                    ? styles.activeFilter
                    : styles.inactiveFilter
                }
              >
                MPC
              </button>
              <button
                onClick={() => handleFilterChange("MEC")}
                style={
                  filterDomain === "MEC"
                    ? styles.activeFilter
                    : styles.inactiveFilter
                }
              >
                MEC
              </button>
              <button
                onClick={() => handleFilterChange("BIPC")}
                style={
                  filterDomain === "BIPC"
                    ? styles.activeFilter
                    : styles.inactiveFilter
                }
              >
                BIPC
              </button>
              <button
                onClick={() => handleFilterChange("")}
                style={
                  filterDomain === ""
                    ? styles.activeFilter
                    : styles.inactiveFilter
                }
              >
                All
              </button>
            </div>
          </div>
          <div>
            <h2>Select a video and start your carrier path.</h2>
          </div>
        </>
      )}

      {loading ? (
        <div style={styles.loading}>Loading videos...</div>
      ) : error ? (
        <div style={styles.error}>{error}</div>
      ) : selectedVideo ? (
        <div style={styles.videoPlayer}>
          <video controls preload="auto" style={styles.video}>
            <source src={selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            onClick={() => {
              setSelectedVideo(null);
              setVideoDetails(null);
              setVisibleMCQs([]);
              setMcqBatch(1);
            }}
            style={styles.closeButton}
          >
            Close
          </button>
          {videoDetails && (
            <div style={styles.details}>
              <h3 style={styles.title}>{videoDetails.name}</h3>
              <p style={styles.detail}>Domain: {videoDetails.domain}</p>
              <p style={styles.detail}>
                Experience: {videoDetails.experience} years
              </p>
              <p style={styles.detail}>PhD: {videoDetails.phd}</p>
              <p style={styles.truncatedDescription}>
                {videoDetails.description}
              </p>
              <br />
              <br />

              {visibleMCQs && visibleMCQs.length > 0 && (
                <div>
                  <h1 style={styles.title} color="blue">
                    MCQs or QUIZ
                  </h1>
                  <h3>
                    To get the Mentornship you need to answer{" "}
                    {visibleMCQs.length} correctly of each batch you have two
                    batches consist of 5 questions
                  </h3>
                  <p>
                    Select the best answer for each question. You have {timer}{" "}
                    seconds to complete the quiz.
                  </p>
                  <h4> Batch {mcqBatch} will consist of 5 question</h4>

                  {visibleMCQs.map((mcq, questionIndex) => (
                    <div key={questionIndex} style={styles.mcq}>
                      <p>{mcq.question}</p>
                      {mcq.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          style={{
                            ...styles.option,
                            backgroundColor:
                              selectedOptions[questionIndex] === optionIndex
                                ? "#cce5ff"
                                : "#e0e0e0",
                          }}
                          onClick={() =>
                            handleOptionClick(questionIndex, optionIndex)
                          }
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  ))}
                  {mcqBatch === 2 && visibleMCQs.length === 10 && (
                    <button onClick={checkAnswers} style={styles.checkButton}>
                      Check Answers
                    </button>
                  )}
                  {oopsMessage && (
                    <div style={styles.oopsMessage}>
                      <h2>Oops!</h2>
                      <p>Some answers are incorrect. Please try again.</p>
                    </div>
                  )}
                  {quizResults && (
                    <div style={styles.results}>
                      <h4>Quiz Results</h4>
                      {quizResults.map((result, index) => (
                        <div key={index} style={styles.result}>
                          <p>Question {result.questionIndex + 1}:</p>
                          <p>Your answer: {result.selectedOption}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {congratulations && (
                    <div style={styles.congratulations}>
                      <h2>Congratulations!</h2>
                      <p>You have answered all questions correctly.</p>
                      <p style={{ color: "red" }}>
                        NOTE: Fill the details below carefully before joining
                        the WhatsApp group of mentor.
                      </p>
                      <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Name:</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={styles.input}
                          />
                        </div>

                        <div style={styles.formGroup}>
                          <label style={styles.label}>Email:</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                          />
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Phone:</label>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            style={styles.input}
                          />
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Domain:</label>
                          <input
                            type="text"
                            name="domain"
                            value={formData.domain}
                            onChange={handleChange}
                            style={styles.input}
                          />
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>review:</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.review}
                            onChange={handleChange}
                            style={styles.input}
                          />
                        </div>
                        <h4>WHY TO FILL THE FORM:</h4>
                        <p>
                          For student validation purpose, the mentor will
                          contact you for further one-to-one mentorship.
                        </p>
                        <h4>THANKS FOR VISITING AND WATCHING THE VIDEO</h4>
                        <button type="submit" style={styles.submitButton}>
                          Submit
                        </button>
                      </form>
                      {videoDetails && videoDetails.whatsapp && (
                        <div>
                          <p>
                            WhatsApp link is:{" "}
                            <a
                              href={videoDetails.whatsapp}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {videoDetails.whatsapp}
                            </a>
                          </p>
                          <div style={styles.certificate}>
                            <h3>Certificate of Completion</h3>
                            <p>
                              This is to certify that{" "}
                              <strong>{formData.name}</strong> has completed the
                              required course and demonstrated the necessary
                              skills.
                            </p>
                            <p>Date: {new Date().toLocaleDateString()}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div style={styles.videoList}>
          {filteredVideos.map((video, index) => (
            <div key={index} style={styles.card}>
              <img
                src={`http://localhost:6968/${video.thumbnail}`}
                alt={`Video Placeholder ${index + 1}`}
                style={styles.thumbnail}
                onClick={() =>
                  handleVideoClick(video.videoUrl.split("\\").pop(), video)
                }
              />
              <div style={styles.info}>
                <p style={styles.description}>{video.description}</p>{" "}
                <h3 style={styles.title}>Mentor : {video.name}</h3>
                <p style={styles.detail}>Domain: {video.domain}</p>
                <p style={styles.detail}>
                  Experience: {video.experience} years
                </p>
                <p style={styles.detail}>PhD: {video.phd}</p>
                {/* This will now show only one line */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  searchBar: {
    marginBottom: "20px",
    padding: "10px",
    width: "100%",
    boxSizing: "border-box",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
  },
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "300px",
    backgroundColor: "#f7f9fc",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  videoPlayer: {
    position: "relative",
  },
  video: {
    width: "100%",
    maxWidth: "none",
    margin: "auto",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },
  details: {
    padding: "10px",
  },
  title: {
    fontSize: "24px",
    margin: "0",
  },
  detail: {
    fontSize: "16px",
  },
  description: {
    fontSize: "14px",
    margin: "10px 0",
    fontStyle: "italic",
    overflow: "hidden",
    whiteSpace: "nowrap",

    maxWidth: "100%",
  },
  mcq: {
    marginBottom: "10px",
    width: "50%",
    display: "inline-block",
    verticalAlign: "top",
    padding: "30px",
  },
  option: {
    padding: "10px",
    margin: "5px 0",
    cursor: "pointer",
  },
  checkButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    marginTop: "10px",
  },
  oopsMessage: {
    color: "#f44336",
    textAlign: "center",
  },
  results: {
    marginTop: "20px",
  },
  result: {
    marginBottom: "10px",
  },
  congratulations: {
    backgroundColor: "#f4f4f4", // White background for clarity
    borderRadius: "8px", // Rounded corners for a modern look
    padding: "30px", // Increased padding for a spacious feel
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    maxWidth: "600px", // Max width to keep it centered and not too wide
    margin: "20px auto", // Centered horizontally with margin
    textAlign: "center", // Centered text
  },
  formGroup: {
    marginBottom: "20px", // Increased margin for spacing between form elements
  },
  label: {
    display: "block", // Block display to stack labels and inputs
    fontSize: "16px", // Slightly larger font for labels
    marginBottom: "8px", // Margin below labels for spacing
    color: "#333", // Darker color for better readability
  },
  input: {
    width: "100%", // Full width of the container
    padding: "12px", // Increased padding for better touch targets
    border: "1px solid #ccc", // Border color for form elements
    borderRadius: "4px", // Rounded corners
    fontSize: "16px", // Larger font size for readability
    boxSizing: "border-box", // Include padding and border in the element's total width and height
  },
  submitButton: {
    backgroundColor: "#007bff", // Modern blue color for the button
    color: "#ffffff", // White text for contrast
    border: "none",
    padding: "12px 20px", // Ample padding for a larger clickable area
    borderRadius: "4px", // Rounded corners
    cursor: "pointer", // Pointer cursor on hover
    fontSize: "16px", // Consistent font size with inputs
    transition: "background-color 0.3s", // Smooth transition for hover effect
  },
  videoList: {
    display: "flex",
    flexWrap: "wrap",
  },
  certificate: {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f4f4f4",
    textAlign: "center",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    margin: "10px",
    width: "calc(33.333% - 20px)",
    boxSizing: "border-box",
    cursor: "pointer",
  },
  thumbnail: {
    width: "550px", // Fixed width
    height: "250px", // Fixed height
    objectFit: "cover", // Ensures the image covers the area without distortion
    borderRadius: "5px", // Optional: add rounded corners
    marginBottom: "10px",
  },
  info: {
    padding: "10px",
  },
  popup: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    zIndex: "1000",
  },
  filterSection: {
    margin: "20px 0",
  },
  filterButtons: {
    display: "flex",
    gap: "10px",
  },
  activeFilter: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    border: "none",
    cursor: "pointer",
  },
  inactiveFilter: {
    backgroundColor: "#e0e0e0",
    color: "#000",
    padding: "10px",
    border: "none",
    cursor: "pointer",
  },
};

export default Home;
