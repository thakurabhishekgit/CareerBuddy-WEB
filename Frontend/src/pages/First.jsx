import React, { useEffect } from "react";
import styled from "styled-components";
import TopNiches from "../components/TopNiches";
import HowItWorks from "../components/HowItWorks";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";

// Slide Components
const Slide1 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Welcome to Our App</h2>
        <p>Turn your passion into a thriving career.Identify your comfort zones based on strengths and interest areas. </p>
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
          From career counselling to personal mentorship programs.
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
        <h2>Watch and Earn</h2>
        <p>Start watching videos by mentors and earn points.Get access to personal guidance.</p>
      </TextContent>
      <img
        src="https://media.istockphoto.com/id/1308882579/vector/a-hand-is-holding-a-tablet-with-a-video-player-watching-a-video-course-webinar-tutorials.jpg?s=612x612&w=0&k=20&c=wRdIu8WgVkL3KT-ZtGNxzJVRRQqRJPQUu0AYCueiTcU="
        alt="Get Started"
      />
    </Card>
  </Slide>
);
const Slide4 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Get Started Today</h2>
        <p>Sign up now and start creating amazing content with ease.</p>
      </TextContent>
      <img
        src="https://images.unsplash.com/photo-1642491068210-943797352958?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGNvbnRlbnQlMjBjcmVhdG9yfGVufDB8fDB8fHww"
        alt="Get Started"
      />
    </Card>
  </Slide>
);

const FeatureSection = () => (
  <Features>
    <h2>Our Key Features</h2>
    <StyledLink to="/predict">
      <FeatureCard>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR8AAACwCAMAAAABtJrwAAABBVBMVEX///9jbvrvVTsAzJb3+fzvUzhdafoAypFhbPpbZ/ptd/rFjr5abP5WYvp6g/ryUCv3bEm6vfzUjqyKkvvp6v70UCLa3P6el+6vktn0Uyvwi4DwUTNnfP/tdmzyZlP2dWUA1aE416r0SzGnuZ2P5MnQoIvckHuCyKOp6tXT9etq0Krj+PKcovth2rX4v7fl9fTvW0L27O773Nj96OXzh3fh4+ejqfyJkfv1m4/p6+7Axc3P0v2kq7ewtsD09f/AxP2VnauDjZ7V2N6bo7D6zcjIzdSutPx2gpV6hZhlcYdQXfpMXHYxSGlHWXVfbYXHyv3tOxJ/4cLx0NXFvqrjn5D3ZkB9xqBkTIsSAAAI90lEQVR4nO2dCXvbNhJAkRhrW2lUNxvH3cbbNHaPbbtJ0zRBHEwwLo6FJTnbNN3r//+UHZAUJUoUZck67XnK10oaEgSfwWtEAkIwDMMwDMMwDMMwa0BbVbxRtXG0MPggMftKFh/BhurEgeJemP5HEChiMbERW0qHVjMKY7CnTJDSGgkIVmkTwFK4K5z0VnuaBqzuWU2rao32tPIUUZ00Q0wfpAX93gv1PrpAYoJMRf9TuiSNSrIC172m89Gl1ehGMoDCW3TS0jpr7HkDBiKFgxMfYk/CexWk7tL6CuPRd5RJfmje2EuShLA6KPofTdCVXe+Q4gEQg8EudCEE69e9pvNBDYResedBO4VdYVUQPd31kF7kQHdkT+mucvSJPCQ/Erz5QLPS+w4p8PBBpw/orcgnsRAUfeV/kz1qnCpSc3S9+u1301G0WVGLcFa66Bwo19MorLPK04vaTxAe0dE/8kj+0n4EnBOa3Ah0TqtOV4leKsjZbCdjqeUYaV3M2pLV2rn0CVNr23786C53AjjcGmJcTmUYhmEYhmEYhmEYhmEYhmGYtfDu4uLiML2R4iakvhfOm3br8ii9cf6DjDp6DexpiIvWnXbmB50Ba8Ch39LfKCdx8SbjaL6531y28/aDAryJwYKGafNsF3daifav8819eHR0dL7YCi2H388yHs484739O0RrTj+rRuareTZzc3/Q3id27828xOv5efnq1av55pwP2dpN69l+N+uMD1ppNfdX7eftx4OPv6Q3RgZJRy7w6b/LO4TJ3TtZdbfGz/Hdg8wPWuct0v5ZWbB2HkHyKudQm+Xn3YOM3yfP/fbgOG8/qAAwGgQkop65GsKAMgb1lDk3y8+zdnZsa9jp//T68evMj6a/vdeKNq+o9TzNx5MgRCtkI+eln+bpRhn4mW0+KUs/NYU+y2qz+3A8NoeAKcTgA4KZcgfThrWfvp+NYdv8fHNycvJDeqMHu478Jj/ayGJxKq3S5reYW9uW4uf8Iqf2RDf3c/+TL/6U+LkSm+7nj72dvcyP1bqjDO1itaV9NO1MnBZBmohRQgQ0GGnbCde+P3Ipfg4vs2uIy8O6YN/PwV1ifj+SDlsqHboCvbMojdfCiOx4HxFdlGh80Ne+A7nRz3lBXazw8+lnWTM4+Gk4dtjOCm0vxc9e7ofsQDTeKxXIh5cQpECjI0oUnt6Aj0bpa98k2OjnrJ24fFYXG/hJ67kyP8vg8FmeUqg7SBZ+7v/50TFxcLcSPMuCrTd1hVb9nG6zn6PLXaLVqttOSj911X2YV/fG+8mru8t+6mE/zbCfZthPM+ynGfbTDPtpZuv8fP7ZV4knv8y0mnOzfX4e5Rd17GeSn7vZRd1y/aDA/CE39lMHWK8QUMu+n/3zunTwqJ/hnO/Zfu7nZU5d/rn0Mxwr/UzOP5d+6vLPpZ9l5p9NF7wx6ZHSa7af+3/Jru2PP1Z+uLxK+2nMH667/QgtQGupF+Dni7y6M/v51z8yqqu5MX5K1uXn/utHB8Sj15VC1+pHYU1GcW1+Hh+n2PEG+XF1ezL208c4U3M3FfspAcF+mnDajn/Jfko0Tt7/7BeneZXYLfNjnR3/svDz1y+P01Xf6dvh2C3zY4Id/3LgJ6vubfajY80v8uynJHXUMwb7KQmdmrvt2U8fqST7aSBgZ/Lx/Sp+nnyfk91Csgo/T56fJJ5+k8WW7ccaN/n8+Sp+vnq6l/F9FlyFn5O9HWJvNX7qM20z+dnJqrtCPzsr9DOMR4k+O9qvws+//8jJYpvrJw5dv9voDYC+hp+zq/v5Ot8u9zbcjx16oiCiR+OEHPXzn2If/KImPz/wM8jPD/w05Oe/3skZzs8P/EzOzw/8NObnF+WnO2g/EQV6lXqoHfHzbfGn/nuaalHbV99PFtvc9uNUzfMWo37yNdl8P6d/y479J88X58df4fpr5X6+ywvd+WFmP/mx/2RxfqbkN9bkp1jg7H7yGRfo5yr5jXn9nP6Yz/h8Zj9PN8YP1j0KtTA/eXPfZj9dmPz714Laz1b7ieynEae64wky9lNiEccTQOynRGPNY3Psp8QZy34aADs9P3+r/dSN2MF++sSO4eN7E1Bz+GI/A5zh/U8TWg3yG2X/JOynpDvI//jgi/5J2E9JZ+j+zOCL/kkm+UmJ3fMJfobuDx/zMy3/LCf5aco/19wfXvpZWAJaC1meP9ugiv5JuP30cSG48W/ZTzPsh/2wH/bDftgP+2E/7If9sB/2w37YD/thP+znJvrRINAP90/CfqoY5Sv9k9Tmnyf5aco/ixnvf75S/rnm/ueBn2X0T5L8VPon4fZTQaEApfn3nemwH/bDftgP+2E/7If9sB/2w37YD/thP+yH/bCfG+vHw5if06v7OVuQn52N9WPSyJfF+ET3vjzIxmiq9i/RamXBYvymav8/Z3ms6P/59Mc8VvhpZ7FP/5sV+rHfP0mWKD7MFrjbfpwv8LudPFb4yQptf5Iv8OeTPFb4yQv9/GPe4fT/8thy/Uh5fpgPc1b0D6lf5OQ9f1RjL18MB/vjo9XGqjPKmkIPRwqV0wudGFuSn6HB0QHSwIWqZkk668UkMfZwlEzPQ/drVxMtnmYYG2VVIww62hmLAvafgpDV7jC8zJ8fGTwkMV7bZeE8YkSnQvQjfXD5rgE00SjT0dZXogDS22hBRxuDiQEqI9YhSFAUBacMgB/WANoEFWM0BqLzo1Fq1jGNe+stIIIuLZg0Gq5RFkPQQVmPYxVaHkEaQZWhGoSRZ8Q8RDRohKEwxkpUprqCR4URJBrru8Ptj9xhihmfBoy0w2WSH5EMCDBGAZVRiRoKW4gm5GUOauIQHIRUz7RUMGMVWh6eXlRTRa+R9q4lBWhT8WlESG2GDSj0HjV97ZVMFqStFImK/mnvswkqf2Yl86UJiN6Q3WrUU5ERIigKgRx6ZC0qalg6DbuYLRTMaIVWQfPIqY1ROXk45+ZSG4aBnjZ68mIGemUYhrllQLDLO7u9AaCWCB06M2g4QN1mUHuwdMYb1l2RDcUbFGgkrvBCaRu59jjiDMMwDMMwDMMwzE3g/x96cs0XXagQAAAAAElFTkSuQmCC"
          alt="Predict Reach"
        />
        <div>
          <h3>Predict Your Career path</h3>
          <p>
            Use machine learning to shape your future. Input your interests, preferences, and your personality traits to get accurate predictions.
          </p>
        </div>
      </FeatureCard>
    </StyledLink>
    <StyledLink to="/generate-content">
      <FeatureCard>
        <img
          src="data:image/jpeg;base64,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"
          alt="Generate Content"
        />
        <div>
          <h3>Engaging Videos </h3>
          <p>
            Explore engaging content like career guidance videos by Domain Experts.
            Go a step ahead by earning points in pop-up questions.
          </p>
        </div>
      </FeatureCard>
    </StyledLink>
    <StyledLink to="/jobs">
      <FeatureCard>
        <img
          src="https://licerainc.com/wp-content/uploads/2024/05/Meta-Marketing-Agency-46-1024x576.jpg"
          alt="Hire Team"
        />
        <div>
          <h3>Personal Mentorship</h3>
          <p>
            Find and interact with professionals and Domain Experts to enhance your career.
            Spend your earned points to hire a Personal Mentor.
            
          </p>
        </div>
      </FeatureCard>
    </StyledLink>
  </Features>
);

const First = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const slides = [<Slide1 key="1" />, <Slide2 key="2" />, <Slide3 key="3" /> ,<Slide4 key="4"/>];

  return (
    <Container>
      <IntroSection>
        <Hero />
      </IntroSection>
      <Carousel>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            {slide}
          </div>
        ))}
      </Carousel>
      <FeatureSection />
      <AdditionalInfo>
        <TopNiches />
        <HowItWorks />
      </AdditionalInfo>
    </Container>
  );
};

export default First;

// Styled Components
const Container = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
  text-align: center;
  padding: 0 20px;
  background-color: #f4f4f4;
`;

const IntroSection = styled.section`
  padding: 60px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #1e90ff;
  }

  p {
    font-size: 1.2rem;
    color: #666;
  }
`;

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

const Features = styled.section`
  padding: 60px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #1e90ff;
  }
`;

const FeatureCard = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 150px;
    height: auto;
    margin-right: 20px;
    border-radius: 10px;
  }

  div {
    text-align: left;

    h3 {
      font-size: 1.8rem;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      color: #666;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const AdditionalInfo = styled.section`
  padding: 60px 20px;
  background-color: #f4f4f4;
  color: #333;

  /* Add styles for additional information here */
`;