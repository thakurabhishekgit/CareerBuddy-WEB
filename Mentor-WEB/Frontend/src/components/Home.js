import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

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
  const [oopsMessage, setOopsMessage] = useState(false); // New state for Oops message
  const [visibleMCQs, setVisibleMCQs] = useState([]);
  const [mcqBatch, setMcqBatch] = useState(1);
  const [timer, setTimer] = useState(5 * 60); // Timer in seconds (5 minutes)
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    domain: "",
    review: "",
  });
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    // Ensure videoDetails and videoDetails._id are available
    if (videoDetails && videoDetails._id) {
      const fetchReviews = async () => {
        try {
          const response = await axios.get(
            `http://localhost:6968/api/mentors/reviews/${videoDetails._id}`
          );

          // Ensure that the data returned from the API is in the expected format
          if (response.data && Array.isArray(response.data.reviews)) {
            setReviews(response.data.reviews); // Set reviews
          } else {
            setReviews([]); // Set to empty array if data format is unexpected
          }
        } catch (error) {
          console.error("Error fetching reviews:", error);
          setError("Error fetching reviews.");
          setReviews([]); // Ensure reviews is set to empty array in case of an error
        } finally {
          setLoading(false);
        }
      };

      fetchReviews();
    } else {
      setLoading(false); // Set loading to false if videoDetails is not available
    }
  }, [videoDetails]);

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
    setTimer(5 * 60); // Reset timer to 5 minutes

    const countdownInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countdownInterval);
          setShowPopup(false);
          setVisibleMCQs(videoDetails.mcqs.slice(0, 10)); // Show all MCQs after countdown
          setMcqBatch(2);
        }
        return prevTimer - 1;
      });
    }, 1000); // Decrease timer every second
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredVideos = videos.filter((video) =>
    video.domain.toLowerCase().includes(searchQuery)
  );

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
      setOopsMessage(false); // Hide Oops message if all answers are correct
    } else {
      setCongratulations(false);
      setOopsMessage(true); // Show Oops message if not all answers are correct
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
      <input
        type="text"
        placeholder="Search by domain..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={styles.searchBar}
      />
      <div className="hero">
        <h1 className="hero-title">
          Discover Your Path: Expert-Guided Career Insights,
        </h1>
        <p className="hero-description">
          {" "}
          Unlock your future with our curated collection of career-focused
          videos tailored for students after 10th grade. Explore exciting
          domains and gain clear, detailed insights from experienced mentors.
          Each video is designed to provide comprehensive guidance, helping you
          make informed decisions about your career path. Whether you're
          interested in technology, science, arts, or any other field, our
          platform offers the resources you need to navigate your journey with
          confidence. Start exploring today and take the first step towards a
          successful career!
        </p>
      </div>
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

              <div style={styles.reviewsSection}>
                <h4 style={styles.reviewsTitle}>Student Reviews:</h4>
                {reviews.length > 0 ? (
                  reviews
                    .filter((review) => review) // Filter out null or undefined reviews
                    .map((review, index) => (
                      <div key={index} style={styles.reviewCard}>
                        <p style={styles.reviewText}>
                          <strong>Review:</strong> {review}
                        </p>
                      </div>
                    ))
                ) : (
                  <p>No reviews available.</p>
                )}
              </div>

              {visibleMCQs && visibleMCQs.length > 0 && (
                <div>
                  <h4>Quiz</h4>
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
                          <p>Correct answer: {result.correctOption}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {congratulations && (
                    <div style={styles.congratulations}>
                      <h2>Congratulations!</h2>
                      <p>You have answered all questions correctly.</p>
                      <p color="red">
                        NOTE : Fill the details below carefully before joining
                        the whatsapp group of mentor{" "}
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
                          <label style={styles.label}>Review:</label>
                          <input
                            type="text"
                            name="review"
                            value={formData.review}
                            onChange={handleChange}
                            style={styles.input}
                          />
                        </div>
                        <h4>WHY TO FILL THE FORM : </h4>
                        <p>
                          for student validation purpose mentor will contact you
                          for further one to one mentornship{" "}
                        </p>
                        <h4> THANKS FOR VISITING AND WATCHING VIDEO</h4>
                        <button type="submit" style={styles.submitButton}>
                          Submit
                        </button>
                      </form>
                      {videoDetails && videoDetails.whatsapp && (
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
                <h3 style={styles.title}>{video.name}</h3>
                <p style={styles.detail}>Domain: {video.domain}</p>
                <p style={styles.detail}>
                  Experience: {video.experience} years
                </p>
                <p style={styles.detail}>PhD: {video.phd}</p>
                <p style={styles.description}>{video.description}</p>{" "}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Styles
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
    width: "40%",
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
    padding: "30px", 
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
  submitButtonHover: {
    backgroundColor: "#0056b3", // Darker blue on hover
  },
  whatsappLink: {
    marginTop: "20px", // Spacing above the link
    fontSize: "16px", // Consistent font size
    color: "#007bff", // Blue color for the link
    textDecoration: "none", // Remove underline from the link
  },
  whatsappLinkHover: {
    textDecoration: "underline", // Underline on hover for better accessibility
  },
  videoList: {
    display: "flex",
    flexWrap: "wrap",
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
    width: "450px", // Fixed width
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
  reviewsSection: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  reviewsTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
    borderBottom: "2px solid #ddd",
    paddingBottom: "10px",
  },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  reviewText: {
    fontSize: "14px",
    margin: "5px 0",
    lineHeight: "1.6",
  },
};

export default Home;
