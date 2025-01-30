import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import PSlider from "./PSlider";

const ML = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file)); // Create URL for the image
    setPrediction(null); // Clear previous prediction
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage) {
      setError("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        "http://localhost:5001/predict",
        formData
      );
      setPrediction(response.data);
    } catch (err) {
      setError("Error predicting image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to parse and format the prediction description
  const parseDescription = (description) => {
    const lines = description.split("\n");

    return lines.map((line, index) => {
      // Identify main titles (##)
      if (line.startsWith("##")) {
        return (
          <MainTitle key={index}>{line.replace("##", "").trim()}</MainTitle>
        );
      }
      // Identify bullet points with bolded text (* *xyz:* for bold)
      if (line.startsWith("* **")) {
        const content = line.replace("* *", "").replace(":*", "").trim();
        return <BulletPoint key={index}>• {content}</BulletPoint>;
      }
      // Identify headings (using ** for bold)
      if (line.startsWith("")) {
        return (
          <TitleText key={index}>{line.replace(/\\/g, "").trim()}</TitleText>
        );
      }
      // Identify subtitles (using * for italics)
      if (line.startsWith("*")) {
        return (
          <SubtitleText key={index}>
            {line.replace(/\*/g, "").trim()}
          </SubtitleText>
        );
      }
      // Default case for regular text
      return <ParagraphText key={index}>{line}</ParagraphText>;
    });
  };

  return (
    <Container>
      <PSlider></PSlider>
      <Title>Image Concept Predictor</Title>

      <FormWrapper>
        <InfoBox>
          <BoldText>Click Me to Add Your Career Interest Image</BoldText>
          <SquareBox>
            <input type="file" onChange={handleImageChange} />
            {imageUrl && <img src={imageUrl} alt="Selected" />}
          </SquareBox>
        </InfoBox>

        <InfoText>
          <p>
            Make sure your image is related to your desired career path or
            interest. The system will predict the concept, confidence level, and
            description based on the uploaded image.
          </p>
          <SubmitButton
            type="submit"
            onClick={handleSubmit}
            disabled={!selectedImage || loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </SubmitButton>
        </InfoText>
      </FormWrapper>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {prediction && (
        <ResultContainer>
          <h2>Prediction Results</h2>
          <ResultText>
            <Label>Concept:</Label> <Value>{prediction.concept}</Value>
          </ResultText>
          <ResultText>
            <Label>Confidence:</Label>{" "}
            <ConfidenceValue>
              {(prediction.confidence * 100).toFixed(2)}%
            </ConfidenceValue>
          </ResultText>
          <ResultText>
            <Label>Description:</Label>
            <DescriptionContainer>
              {parseDescription(prediction.description)}
            </DescriptionContainer>
          </ResultText>
        </ResultContainer>
      )}
    </Container>
  );
};

// Styled components
const Container = styled.div`
  margin: 0 auto;
  max-width: 100%;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  text-align: left;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoldText = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

const SquareBox = styled.div`
  width: 250px;
  height: 250px;
  border: 2px dashed #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #f0f0f0;
  }

  input {
    cursor: pointer;
    opacity: 0;
    width: 150px;
    height: 150px;
    position: absolute;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

const InfoText = styled.div`
  max-width: 400px;
  font-size: 16px;
  line-height: 1.6;
  margin-left: 20px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #c1c1c1;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin-top: 10px;
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  text-align: left;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  color: #333;
`;

const ResultText = styled.p`
  margin: 10px 0;
`;

const DescriptionContainer = styled.div`
  margin-top: 10px;
`;

const MainTitle = styled.h2`
  font-size: 24px;
  margin: 12px 0;
  color: #222;
`;

const BulletPoint = styled.p`
  margin: 5px 0;
  padding-left: 15px;
  font-size: 16px;
  line-height: 1.5;
`;

const TitleText = styled.h3`
  font-size: 20px;
  margin: 10px 0;
  color: #333;
  font-weight: bold;
`;

const SubtitleText = styled.h4`
  font-size: 18px;
  margin: 8px 0;
  color: #555;
  font-style: italic;
`;

const ParagraphText = styled.p`
  margin: 6px 0;
  line-height: 1.6;
  color: #666;
`;

const Label = styled.span`
  font-weight: bold;
  color: #00509e;
`;

const Value = styled.span`
  color: #0f4c81;
  font-weight: bold;
`;

const ConfidenceValue = styled.span`
  color: #ff6f61;
  font-weight: bold;
  font-size: 18px;
`;

export default ML;