import React, { useState, useEffect } from "react";
import run from "../api/gemini";

const GenerateContent = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const predefinedPrompts = [
    {
      heading: "AI-Powered Career Quizzes: Find Your Dream Job!",
      description:
        "Take our fun, AI-driven career quiz to discover which profession suits you best. Uncover hidden career paths based on your interests and skills!",
      interaction: "Try the quiz and share your results with friends to compare career matches!"
    },
    {
      heading: "Virtual Reality Career Exploration: Step Into Your Future!",
      description:
        "Experience career options through immersive VR simulations. Explore different job environments and see what it’s like to work in your dream field before making a decision!",
      interaction: "Join our live VR career tour and vote for the job that intrigues you the most!"
    },
    {
      heading: "Career Myths Busted: What’s True and What’s Not?",
      description:
        "Participate in our interactive myth-busting session where we debunk common career myths and reveal the truth about various professions.",
      interaction: "Submit your career myths and vote on which ones we should debunk next!"
    },
    {
      heading: "Personal Branding Makeover Challenge!",
      description:
        "Join our challenge to create a standout personal brand using fun tools and templates. Get tips on crafting a unique resume, LinkedIn profile, and more!",
      interaction: "Share your before-and-after personal branding makeover and get feedback from peers and experts!"
    },
    {
      heading: "Future Career Predictions: What Will You Be Doing in 2030?",
      description:
        "Engage in a futuristic career prediction game where you guess and discuss potential job roles and industries that could emerge by 2030.",
      interaction: "Submit your own career predictions and see how they stack up against others' forecasts!"
    },
    {
      heading: "Skill Swap: Trade Your Talents with Others!",
      description:
        "Participate in a skill swap event where you exchange career skills and knowledge with other students. Learn new skills and offer your expertise in return!",
      interaction: "Post your skills and see who’s interested in swapping! Don’t forget to share your experiences with the community."
    },
  ];


  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    const timestamp = localStorage.getItem("historyTimestamp");
    const now = new Date().getTime();

    // Check if the saved history is older than 1 day (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    if (timestamp && now - timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem("searchHistory");
      localStorage.removeItem("historyTimestamp");
    } else {
      setHistory(savedHistory);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    generateResponse(prompt);
    addToHistory(prompt);
  };

  const handleCardClick = (heading) => {
    generateResponse(heading);
    addToHistory(heading);
  };

  const generateResponse = async (inputPrompt) => {
    setLoading(true);
    const generatedResponse = await run(inputPrompt);
    const formattedResponse = formatResponse(generatedResponse);
    setResponse(formattedResponse);
    setLoading(false);
  };

  const addToHistory = (newPrompt) => {
    const newHistory = [newPrompt, ...history].slice(0, 10); // Keep only the latest 10 searches
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    localStorage.setItem("historyTimestamp", new Date().getTime());
  };

  const handleHistoryClick = (historyPrompt) => {
    setPrompt(historyPrompt);
    generateResponse(historyPrompt);
  };

  const formatResponse = (response) => {
    // Split the response into sections based on headings and paragraphs
    const sections = response.split(/(?=\\|^##)/); // Splits at headings and bullet points

    // Process each section
    return sections.map((section, index) => {
      if (section.startsWith("")) {
        // Handle bullet points
        return (
          <ul key={index} style={styles.list}>
            {section
              .split("\n")
              .filter((line) => line.startsWith("*"))
              .map((item, i) => (
                <li key={i} style={styles.listItem}>
                  {item.replace(/^\\s/, "")}
                </li>
              ))}
          </ul>
        );
      } else if (section.startsWith("##")) {
        // Handle headings
        return (
          <div key={index} style={styles.headingContainer}>
            <h2 style={styles.heading}>{section.replace(/^##\s*/, "")}</h2>
          </div>
        );
      } else {
        // Handle paragraphs
        return (
          <p key={index} style={styles.paragraph}>
            {section.trim()}
          </p>
        );
      }
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Generate Content using AI</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Generate
        </button>
      </form>
      {loading && <div style={styles.loading}>Loading...</div>}
      {response && !loading && (
        <div style={styles.response}>
          <h2 style={styles.responseTitle}>Response:</h2>
          <div style={styles.responseContent}>{response}</div>
        </div>
      )}
      <br />
      <br />
      <h2 style={styles.subTitle}>Some recent viral prompts</h2>
      <br />
      <br />
      <div style={styles.cardContainer}>
        {predefinedPrompts.map((prompt, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => handleCardClick(prompt.heading)}
          >
            <h3 style={styles.cardHeading}>{prompt.heading}</h3>
            <hr style={styles.cardDivider} />
            <p style={styles.cardDescription}>{prompt.description}</p>
          </div>
        ))}
      </div>
      {history.length > 0 && (
        <div style={styles.historyContainer}>
          <h2 style={styles.historyTitle}>Previous Searches</h2>
          <ul style={styles.historyList}>
            {history.map((item, index) => (
              <li
                key={index}
                style={styles.historyItem}
                onClick={() => handleHistoryClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#333",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "20px",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "20px",
    width: "320px",
    cursor: "pointer",
    textAlign: "center",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  cardHeading: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#007bff",
  },
  cardDivider: {
    width: "80%",
    height: "1px",
    backgroundColor: "#e0e0e0",
    border: "none",
    margin: "10px auto",
  },
  cardDescription: {
    color: "#555",
    fontSize: "1rem",
  },
  form: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "14px",
    marginRight: "10px",
    width: "300px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "14px 24px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  response: {
    marginTop: "20px",
    width: "80%",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  },
  responseTitle: {
    fontSize: "1.5rem",
    marginBottom: "15px",
    color: "#333",
  },
  responseContent: {
    lineHeight: "1.8",
    fontSize: "1rem",
  },
  headingContainer: {
    marginBottom: "15px",
  },
  heading: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "#007bff",
    marginBottom: "10px",
  },
  list: {
    paddingLeft: "20px",
    marginBottom: "15px",
    listStyleType: "disc",
  },
  listItem: {
    fontSize: "1rem",
    lineHeight: "1.8",
    color: "#555",
  },
  paragraph: {
    fontSize: "1rem",
    lineHeight: "1.8",
    color: "#555",
    marginBottom: "15px",
  },
  loading: {
    marginTop: "20px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#007bff",
  },
  historyContainer: {
    marginTop: "20px",
    width: "80%",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  },
  historyTitle: {
    fontSize: "1.5rem",
    marginBottom: "15px",
    color: "#333",
  },
  historyList: {
    listStyleType: "disc",
    paddingLeft: "20px",
  },
  historyItem: {
    fontSize: "1rem",
    lineHeight: "1.8",
    color: "#555",
    cursor: "pointer",
  },
};

export default GenerateContent;