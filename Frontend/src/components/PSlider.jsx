import React, { useEffect } from "react";
import styled from "styled-components"; // Import styled-components

// Slider data
const Slide1 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Welcome to Our Platform</h2>
        <p>Discover a new way to understand your interests.</p>
      </TextContent>
      <img
        src="https://images.unsplash.com/photo-1673648954658-212203f00a0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGNvbnRlbnQlMjBjcmVhdG9yfGVufDB8fDB8fHww"
        alt="Welcome"
      />
    </Card>
  </Slide>
);

const Slide2 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Explore Features</h2>
        <p>
          From Maths to  Arts , find all you need in one place.
        </p>
      </TextContent>
      <img
        src="https://images.unsplash.com/photo-1621184078796-c7452e5a5f65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGNvbnRlbnQlMjBjcmVhdG9yfGVufDB8fDB8fHww"
        alt="Features"
      />
    </Card>
  </Slide>
);

const Slide3 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Get Started Today</h2>
        <p>Sign up now and start explorng different careers with ease.</p>
      </TextContent>
      <img
        src="https://images.unsplash.com/photo-1642491068210-943797352958?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGNvbnRlbnQlMjBjcmVhdG9yfGVufDB8fDB8fHww"
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
  background-color: #333;
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