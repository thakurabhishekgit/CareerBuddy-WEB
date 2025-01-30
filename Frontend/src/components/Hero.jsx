// import React from "react";
// import styled from "styled-components";

// const HeroSection = styled.section`
//   display: flex;
//   align-items: center;
//   padding: 60px 20px;
//   background: linear-gradient(135deg, #f8f9fa, #e2e2e2);
//   color: #333;
//   text-align: left;
//   justify-content: space-between; /* Space between text and image */
// `;

// const HeroContent = styled.div`
//   flex: 1;
//   max-width: 50%; /* Adjusted max-width for better alignment */
//   margin-right: 20px; /* Space between text and image */
// `;

// const HeroTitle = styled.h1`
//   font-size: 2.5rem;
//   font-weight: 700;
//   margin-bottom: 20px;
// `;

// const HeroSubtitle = styled.h4`
//   font-size: 1.5rem;
//   font-weight: 400;
//   margin-bottom: 30px;
//   color: #555;
// `;

// const HeroDescription = styled.div`
//   font-size: 1.125rem;
//   line-height: 1.6;
//   margin-bottom: 30px;
// `;

// const HeroCallout = styled.h3`
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: #007bff;
//   margin-top: 20px;
// `;

// const HeroImage = styled.img`
//   flex: 1;
//   max-width: 50%; /* Adjust as needed to fit the layout */
//   height: auto;
//   object-fit: cover; /* Ensures the image covers its area */
//   /* Removed border-radius and box-shadow */
//   obhect-fit : cover;
// `;

// const Hero = () => {
//   return (
//     <HeroSection>
//       <HeroContent>
//         <HeroTitle>
//           Your personal guide buddy for a professional success.
//         </HeroTitle>
//         <HeroSubtitle>
//           "Unlock your potential with Expert Guidance and Predictions"
//         </HeroSubtitle>
//         <HeroDescription>
//           At CareerBuddy we are dedicated to empowering students with the tools and resources they need to excel. Whether you are 
//           exploring career paths, or seeking expert advice, our platform is designed to support your journy to sucess.Join a vibrant
//           community of mentors,access to top-tier predictions and unlock your true potential.
//         </HeroDescription>
//         <HeroCallout>
//           Your future starts  HERE - lets make it extraordinary together.
//         </HeroCallout>
//       </HeroContent>
//       <HeroImage
//         src="https://th.bing.com/th/id/OIP.snqhESh7D9hF58MhcrKN-AHaE-?w=294&h=196&c=7&r=0&o=5&dpr=1.5&pid=1.7" // Replace with your image URL
//         alt="Hero Image"
//       />
//     </HeroSection>
//   );
// };

// export default Hero;

/*
import React from "react";
import styled from "styled-components";

const HeroSection = styled.section
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #f8f9fa, #e2e2e2);
  color: #333;
  text-align: center;
;

const HeroContent = styled.div
  max-width: 800px;
;

const HeroTitle = styled.h1
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
;

const HeroSubtitle = styled.h4
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 30px;
  color: #555;
;

const HeroDescription = styled.div
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 30px;
  padding: 0 20px;
;

const HeroCallout = styled.h3
  font-size: 1.25rem;
  font-weight: 600;
  color: #007bff;
  margin-top: 20px;
;

const Hero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <HeroTitle>
          Maximize Your Reach and Engagement with Our Smart Content Solutions
        </HeroTitle>
        <HeroSubtitle>
          "Transform Your Content Strategy with Data-Driven Predictions"
        </HeroSubtitle>
        <HeroDescription>
          Our app harnesses the power of machine learning to provide you with
          tailored insights and predictions for your content. With real-time
          data analysis and performance metrics, you can easily track and
          enhance your content's effectiveness. Make informed decisions and
          optimize your strategy for maximum impact and engagement.
        </HeroDescription>
        <HeroCallout>
          Make your content work for you and let us help to predict your reach
        </HeroCallout>
      </HeroContent>
    </HeroSection>
  );
};
*/

import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { FaRocket, FaGraduationCap } from 'react-icons/fa'; // Example of using React Icons

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f5f5; /* Light, neutral background color */
    
  }
`;

// Keyframe animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounceIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const hoverGrow = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
`;
const pop = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  80% {
    transform: scale(1);
  }
`;

// Styled components
const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  padding: 60px 30px ;
  background: url("https://holistree.in/wp-content/uploads/2020/06/banner2.jpg") no-repeat center center/cover;
  text-align: left;
`;

const HeroContent = styled.div`
  color: #333;
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-size: 2.8rem;
  color: #2e2e2e; /* Classic dark color */
  margin-bottom: 15px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const HeroSubtitle = styled.h2`
  font-size: 1.8rem;
  color: #f1c40f; /* Bright, classic yellow */
  margin-bottom: 25px;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  color: #4a4a4a; /* Slightly lighter dark color */
  margin: 0 auto 30px auto;
  line-height: 1.6;
  max-width: 700px;
  animation: ${fadeIn} 2s ease-in-out;
`;

const HeroCallout = styled.div`
   display:flex;
  font-size: 0.7rem;
  color: #ffffff;
  background-color: #3498db; /* Bright, engaging blue */
  padding: 12px 0px 12px 0px;
  border-radius: 8px;
  text-align : center;
  animation: ${pop} 1s ease-in-out infinite;
  margin-bottom:20px;
  margin-left:150px;
  width: 350px;
`;

const HeroImage = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      animation: ${hoverGrow} 0.3s ease-in-out;
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* Subtle shadow on hover */
    }
  }
`;


const Hero = () => {
  return (
    <>
      <GlobalStyle />
      <HeroSection>
        <HeroContent>
          <HeroTitle>Your personal guide buddy for professional success.</HeroTitle>
          <HeroSubtitle>"Unlock your potential with Expert Guidance and Predictions"</HeroSubtitle>
          <HeroDescription>
            At CareerBuddy, we are dedicated to empowering students with the tools and resources they need to excel. Whether you are 
            exploring career paths or seeking expert advice, our platform is designed to support your journey to success. Join a vibrant
            community of mentors, access top-tier predictions, and unlock your true potential.
          </HeroDescription>
          <HeroCallout>Your future starts HERE - let's make it extraordinary together.</HeroCallout>
        </HeroContent>
        {/* <HeroImage>
          {/* Replace with images related to CareerBuddy */}
          {/* <img src="https://c8.alamy.com/comp/2AHBG54/cartoon-male-doctor-holding-a-clipboard-2AHBG54.jpg/100x100" alt="Career Image 1" />
          <img src="https://static.vecteezy.com/system/resources/previews/030/692/439/non_2x/science-2d-cartoon-vector-illustration-on-white-background-free-photo.jpg/100x100" alt="Career Image 2" />
          <img src="https://c8.alamy.com/comp/WD3EP3/vector-illustration-of-cartoon-artist-boy-WD3EP3.jpg/100x100" alt="Career Image 3" />
        </HeroImage> */} 
      </HeroSection>
    </>
  );
};

export default Hero;