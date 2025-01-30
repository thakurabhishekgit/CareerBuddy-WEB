import React, { useState } from "react";

// Slider data
const slides = [
  {
    id: 1,
    image: "https://via.placeholder.com/800x400?text=Slide+1",
    caption: "Welcome to our Career Prediction System!",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/800x400?text=Slide+2",
    caption: "Utilize our tool to gain insights into your career path potential and opportunities."
,
  },
  {
    id: 3,
    image: "https://via.placeholder.com/800x400?text=Slide+3",
    caption: "Enter your academic scores, preferences, and interests to receive personalized career predictions and insights."
,
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div style={sliderStyle}>
      <div style={sliderImagesStyle}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              ...slideStyle,
              backgroundImage: `url(${slide.image})`,
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            <div style={captionStyle}>{slide.caption}</div>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} style={navButtonStyle}>
        &#10094;
      </button>
      <button onClick={nextSlide} style={navButtonStyle}>
        &#10095;
      </button>
    </div>
  );
};

// Inline styles
const sliderStyle = {
  position: "relative",
  width: "100%",
  maxWidth: "800px",
  margin: "0 auto",
  overflow: "hidden",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const sliderImagesStyle = {
  display: "flex",
  transition: "transform 0.5s ease-in-out",
};

const slideStyle = {
  minWidth: "100%",
  height: "400px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
};

const captionStyle = {
  position: "absolute",
  bottom: "20px",
  left: "20px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  padding: "10px",
  borderRadius: "4px",
};

const navButtonStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  cursor: "pointer",
  fontSize: "18px",
  zIndex: 1,
};

const prevButtonStyle = {
  ...navButtonStyle,
  left: "10px",
};

const nextButtonStyle = {
  ...navButtonStyle,
  right: "10px",
};

export default Slider;