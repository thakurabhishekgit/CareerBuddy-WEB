import React, { useEffect } from "react";
import styled from "styled-components"; // Import styled-components

// Slider data
const Slide1 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Welcome to Our Mentor Portal</h2>
        <p>
          Mentorship is the key to unlocking potential. Share your wisdom and
          guide aspiring minds toward success..
        </p>
      </TextContent>
      <img
        src="https://images.pexels.com/photos/716276/pexels-photo-716276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Welcome"
      />
    </Card>
  </Slide>
);

const Slide2 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Explore Mentors</h2>
        <p>
          Upload your videos, share your insights, and make an impact. Your
          expertise can shape countless futures.
        </p>
      </TextContent>
      <img
        src="https://images.pexels.com/photos/6325975/pexels-photo-6325975.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Features"
      />
    </Card>
  </Slide>
);

const Slide3 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Find Professional Mentors</h2>
        <p>
          Be part of a thriving mentor community, inspiring students to dream
          big and achieve even bigger." Let me know if you want more tweaks!
        </p>
      </TextContent>
      <img
        src="https://images.pexels.com/photos/7176305/pexels-photo-7176305.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Get Started"
      />
    </Card>
  </Slide>
);

const ML = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const slides = [<Slide1 key="1" />, <Slide2 key="2" />, <Slide3 key="3" />];

  return (
    <div>
      <Carousel>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            {slide}
          </div>
        ))}
      </Carousel>
    </div>
  );
};
const Carousel = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  height: 600px; /* Increased height */
  border-bottom: 1px solid #ddd;

  .slide {
    flex: none;
    scroll-snap-align: start;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: blue transparent;
  color: #fff;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 80%;
  background-color: #444;
  padding: 20px;
  border-radius: 10px;

  img {
    width: 45%;
    height: auto;
    border-radius: 10px;
  }
`;

const TextContent = styled.div`
  width: 50%;
  text-align: left;

  h2 {
    font-size: 2rem;
    margin: 0;
  }

  p {
    font-size: 1.2rem;
    margin-top: 10px;
  }
`;
export default ML;
