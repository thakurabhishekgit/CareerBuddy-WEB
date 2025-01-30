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
  const [oopsMessage, setOopsMessage] = useState(false);
  const [visibleMCQs, setVisibleMCQs] = useState([]);
  const [mcqBatch, setMcqBatch] = useState(1);
  const [timer, setTimer] = useState(5 * 60);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6968/api/mentors/videos"
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
                      <p>You answered all questions correctly!</p>
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
                src={`https://via.placeholder.com/640x360?text=Video+Placeholder`}
                alt={`Thumbnail for ${video.name}`}
                style={styles.thumbnail}
                onClick={() => handleVideoClick(video.filename, video)}
              />
              <div style={styles.cardContent}>
                <h3 style={styles.title}>{video.name}</h3>
                <p style={styles.detail}>Domain: {video.domain}</p>
                <p style={styles.truncatedDescription}>
                  {video.description.length > 100
                    ? `${video.description.slice(0, 100)}...`
                    : video.description}
                </p>
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
    width: "80%",
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
    color: "#4CAF50",
    textAlign: "center",
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
    width: "100%",
    height: "auto",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
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
};

export default Home;
