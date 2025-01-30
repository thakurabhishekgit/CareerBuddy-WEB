import React, { useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function ML2() {
  const [formData, setFormData] = useState({
    Marks1: "",
    Marks2: "",
    Marks3: "",
    Marks4: "",
    Fav_Sub: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );
      const {
        "Predicted Stream": PredictedStream,
        Probability,
        "All Probabilities": AllProbabilities,
      } = response.data;
      setPrediction({
        stream: PredictedStream,
        probability: Probability,
        allProbabilities: AllProbabilities,
        careerOptions: getCareerOptions(PredictedStream, Probability),
      });
      setSelectedOption(null); // Reset selected option on new prediction
    } catch (error) {
      setError("There was an error making the request");
      console.error(error);
    }
  };

  const getCareerOptions = (stream, probability) => {
    const options = {
      Science: {
        core:
          probability >= 80
            ? ["Engineering", "Medical Sciences", "Research"]
            : [],
        normal:
          probability >= 70 && probability < 80
            ? ["Applied Sciences", "Environmental Science"]
            : [],
        default: ["General Science"],
      },
      Commerce: {
        core:
          probability >= 80
            ? ["Finance", "Business Management", "Economics"]
            : [],
        normal:
          probability >= 70 && probability < 80
            ? ["Marketing", "Accounting"]
            : [],
        default: ["General Commerce"],
      },
      Arts: {
        core:
          probability >= 80 ? ["Fine Arts", "Performing Arts", "Design"] : [],
        normal:
          probability >= 70 && probability < 80
            ? ["History", "Philosophy"]
            : [],
        default: ["General Arts"],
      },
    };

    return options[stream] || { default: ["General Options"] };
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const chartData = {
    labels: Object.keys(prediction?.allProbabilities || {}),
    datasets: [
      {
        data: Object.values(prediction?.allProbabilities || {}),
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"], // Customize colors here
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  const barChartData = {
    labels: Object.keys(prediction?.allProbabilities || {}),
    datasets: [
      {
        label: "Probability",
        data: Object.values(prediction?.allProbabilities || {}),
        backgroundColor: "#36a2eb", // Customize color here
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const roadmaps = {
    Engineering:
      "1. Choose a specialisation (e.g., Civil, Mechanical)\n2. Pursue internships\n3. Work on projects\n4. Take competitive exams (if needed)\n5. Apply for jobs or higher studies.",
    "Medical Sciences":
      "1. Complete MBBS or BDS\n2. Pursue specialisation (e.g., Surgery, Pediatrics)\n3. Gain experience through internships\n4. Prepare for medical licensing exams\n5. Start practicing or join a hospital.",
    Research:
      "1. Choose a research area\n2. Pursue a Master’s or PhD\n3. Conduct research and publish papers\n4. Apply for research positions\n5. Collaborate with research institutions.",
    "Applied Sciences":
      "1. Choose a field (e.g., Environmental Science, Biochemistry)\n2. Pursue relevant undergraduate studies\n3. Gain experience through internships\n4. Consider a Master’s degree for specialization\n5. Explore job opportunities in research or industry.",
    "Environmental Science":
      "1. Pursue undergraduate studies in Environmental Science\n2. Get involved in environmental projects\n3. Gain practical experience through internships\n4. Consider further studies (e.g., Master’s or PhD)\n5. Seek employment in environmental consulting or agencies.",
    Finance:
      "1. Obtain a degree in Finance or related field\n2. Gain experience through internships\n3. Obtain relevant certifications (e.g., CFA)\n4. Explore career opportunities in banking, investment, or corporate finance\n5. Continue professional development.",
    "Business Management":
      "1. Pursue a degree in Business Administration\n2. Gain practical experience through internships\n3. Develop skills in management and leadership\n4. Obtain an MBA or other relevant qualifications for advanced roles\n5. Explore career opportunities in various sectors.",
    Economics:
      "1. Complete a degree in Economics\n2. Gain experience through internships or research\n3. Pursue a Master’s or PhD for specialization\n4. Explore careers in research, policy analysis, or finance\n5. Develop expertise in economic modeling and data analysis.",
    Marketing:
      "1. Obtain a degree in Marketing or related field\n2. Gain experience through internships\n3. Develop skills in digital marketing, analytics, and strategy\n4. Consider certification in marketing (e.g., Google Analytics)\n5. Explore career opportunities in various industries.",
    Accounting:
      "1. Obtain a degree in Accounting\n2. Gain practical experience through internships\n3. Obtain certification (e.g., CPA)\n4. Explore career opportunities in public accounting, corporate finance, or auditing\n5. Continue professional development.",
    "Fine Arts":
      "1. Pursue a degree in Fine Arts\n2. Build a portfolio of work\n3. Gain experience through internships or exhibitions\n4. Explore opportunities in art galleries, studios, or freelancing\n5. Continue developing your craft and network in the art community.",
    "Performing Arts":
      "1. Obtain training in the performing arts (e.g., drama, dance, music)\n2. Gain experience through performances and auditions\n3. Build a network within the industry\n4. Explore opportunities in theater, film, or music\n5. Consider further training or education in your specific area.",
    Design:
      "1. Pursue a degree in Design (e.g., Graphic Design, Industrial Design)\n2. Build a strong portfolio\n3. Gain experience through internships or freelance work\n4. Explore job opportunities in design firms or as a freelance designer\n5. Stay updated with design trends and software.",
    History:
      "1. Obtain a degree in History\n2. Engage in historical research and writing\n3. Gain experience through internships or volunteering\n4. Explore career opportunities in education, museums, or historical societies\n5. Consider advanced degrees for specialized fields.",
    Philosophy:
      "1. Complete a degree in Philosophy\n2. Develop critical thinking and analytical skills\n3. Gain experience through research or teaching assistant positions\n4. Explore career opportunities in academia, writing, or consulting\n5. Consider further studies or specialization in a specific philosophical area.",
    "General Science":
      "1. Explore different scientific fields\n2. Pursue undergraduate studies in a chosen field\n3. Engage in scientific projects and internships\n4. Consider a Master’s or PhD for specialization.",
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1>Career Stream Prediction</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>Career Prediction Form</h2>
          <h3>"Enter your Marks [English,Maths,Science,Social]"</h3>
          {["Marks1", "Marks2", "Marks3", "Marks4"].map((mark, index) => (
            <div style={styles.formGroup} key={index}>
              <label>{mark}:</label>
              <input
                type="number"
                name={mark}
                value={formData[mark]}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          ))}
          <div style={styles.formGroup}>
            <label>Favorite Subject:</label>
            <h2>
              Note : Choose your favorite subject based on your personal
              interest. Your interest will have a significant impact on your
              future career options.
            </h2>
            <select
              name="Fav_Sub"
              value={formData.Fav_Sub}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="" disabled>
                Select your favorite subject
              </option>
              <option value="Science">Science</option>
              <option value="Maths">Maths</option>
              <option value="Social">Social</option>
              <option value="English">English</option>
            </select>
          </div>

          <button type="submit" style={styles.button}>
            Predict
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        {prediction && (
          <div style={styles.result}>
            <h2>Prediction Results</h2>
            <p>
              <strong>Predicted Stream:</strong> {prediction.stream}
            </p>
            <p>
              <strong>Probability:</strong> {prediction.probability}%
            </p>
            <h3>All Probabilities:</h3>
            <div style={styles.chartContainer}>
              <Pie
                data={chartData}
                options={chartOptions}
                style={styles.chart}
              />
              <Bar
                data={barChartData}
                options={barChartOptions}
                style={styles.chart}
              />
            </div>
            <h3>Career Options:</h3>
            <div style={styles.careerOptions}>
              {prediction.careerOptions.core.length > 0 && (
                <>
                  <p style={styles.coreOptions}>
                    <strong>Core Options:</strong>
                  </p>
                  <ul style={styles.optionList}>
                    {prediction.careerOptions.core.map((option, index) => (
                      <li
                        key={index}
                        style={styles.option}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {prediction.careerOptions.normal.length > 0 && (
                <>
                  <p style={styles.normalOptions}>
                    <strong>Normal Options:</strong>
                  </p>
                  <ul style={styles.optionList}>
                    {prediction.careerOptions.normal.map((option, index) => (
                      <li
                        key={index}
                        style={styles.option}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {prediction.careerOptions.default.length > 0 && (
                <>
                  <p style={styles.defaultOptions}>
                    <strong>Default Options:</strong>
                  </p>
                  <ul style={styles.optionList}>
                    {prediction.careerOptions.default.map((option, index) => (
                      <li
                        key={index}
                        style={styles.option}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            {selectedOption && (
              <div style={styles.roadmap}>
                <h3>Roadmap for {selectedOption}:</h3>
                <pre>{roadmaps[selectedOption]}</pre>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  headerTitle: {
    fontSize: "2.5rem",
    color: "#333",
  },
  form: {
    background: "linear-gradient(135deg, #f7f9fc, #ffffff)", // Subtle gradient background
    padding: "40px", // Slightly more padding for breathing room
    borderRadius: "12px", // Softer rounded corners
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)", // Deeper shadow for more dimension
    maxWidth: "80%", // Limiting width for better focus
    margin: "20px auto", // Adding vertical margin to separate it from the rest of the page
    display: "flex",
    flexDirection: "column",
    gap: "25px", // More spacing between form elements
    fontFamily: "'Roboto', sans-serif", // Modern font choice
    color: "#333", // Darker text for better readability
    border: "1px solid #e0e0e0", // Thin border to outline the form
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "1rem",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  button: {
    background: "#007bff",
    color: "#ffffff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background 0.3s ease",
  },
  buttonHover: {
    background: "#0056b3",
  },
  result: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "30px",
  },
  resultTitle: {
    fontSize: "1.8rem",
    color: "#333",
    marginBottom: "20px",
  },
  chartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    gap: "10px",
    height: "400px",
  },
  chart: {
    width: "100%",
    height: "300px",
  },
  careerOptions: {
    marginTop: "30px",
  },
  coreOptions: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  normalOptions: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  defaultOptions: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  optionList: {
    marginLeft: "20px",
    listStyleType: "none",
    padding: "0",
  },
  option: {
    cursor: "pointer",
    padding: "8px 0",
    transition: "color 0.3s ease",
    fontSize: "1rem",
  },
  optionHover: {
    color: "#007bff",
  },
  roadmap: {
    marginTop: "30px",
    padding: "20px",
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  roadmapTitle: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "15px",
  },
  roadmapContent: {
    fontSize: "1rem",
    color: "#555",
  },
  error: {
    color: "#ff4d4d",
    fontWeight: "bold",
    marginTop: "20px",
  },
};

export default ML2;
