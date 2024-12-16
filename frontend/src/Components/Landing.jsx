import React from 'react';
import styled from 'styled-components';

const Landing = () => {
  return (
    <LandingComponent>
      <Content>
        {/* Left Section */}
        <LeftSection>
          <MainTitle>
            Welcome to <span>Quiz.io</span>
          </MainTitle>
          <Subtitle>
            The ultimate platform to create, share, and compete in quizzes!
          </Subtitle>
          <FeaturesList>
            <li>Create and share unlimited quizzes effortlessly.</li>
            <li>Compete with friends and track your scores.</li>
            <li>Interactive and engaging quiz experience.</li>
          </FeaturesList>
        </LeftSection>

        {/* Right Section */}
        <RightSection>
          <Section>
            <SectionHeading>Create Your Own Quiz</SectionHeading>
            <Description>
              Craft custom quizzes to challenge your friends or audience.
            </Description>
            <CreateQuizButton>Create a Quiz</CreateQuizButton>
          </Section>

          <Section>
            <SectionHeading>Join a Quiz</SectionHeading>
            <Description>
              Have a quiz code? Enter it below to join the fun!
            </Description>
            <JoinQuizSection>
              <InputField type="text" placeholder="Enter Quiz Code" />
              <JoinButton>Join</JoinButton>
            </JoinQuizSection>
          </Section>
        </RightSection>
      </Content>
    </LandingComponent>
  );
};

export default Landing;

// Styled Components
const LandingComponent = styled.div`
  width: 100%;
  height: 100vh;
  background: #000000; /* Deep black background */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 90%;
  max-width: 1200px;
`;

const LeftSection = styled.div`
  flex: 1;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 10px;
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  span {
    color: #4dabf7; /* Blue highlight */
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #a0a0ff;
  font-family: 'Poppins', sans-serif;
`;

const FeaturesList = styled.ul`
  margin-top: 10px;
  padding: 0;
  list-style: none;
  color: #d0d0ff;
  font-size: 1rem;

  li {
    margin: 8px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    &:before {
      content: "✓"; /* Checkmark icon */
      color: #4dabf7;
    }
  }
`;

const Section = styled.div`
  background: rgba(10, 20, 40, 0.9); /* Deep blue semi-transparent background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 255, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease;
  position: relative; /* This is required for z-index to work */

  &:hover {
    transform: translateY(-10px); /* Rise up */
    box-shadow: 0 12px 50px rgba(0, 128, 255, 0.8); /* Blue glow */
    z-index: 10; /* Increase z-index to make it appear above other elements */
  }
`;


const SectionHeading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #4dabf7;
  font-family: 'Poppins', sans-serif;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
  color: #d0d0ff;
`;

const CreateQuizButton = styled.button`
  background: #4dabf7; /* Blue button */
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 1.2rem;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #1a73e8; /* Slightly darker blue on hover */
  }
`;

const JoinQuizSection = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
`;

const InputField = styled.input`
  flex: 1;
  max-width: 200px;
  padding: 10px;
  border: 2px solid #4dabf7;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  color: #ffffff;
  background: #111111;

  &::placeholder {
    color: #777;
  }
`;

const JoinButton = styled.button`
  background: transparent;
  color: #4dabf7;
  border: 2px solid #4dabf7;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #4dabf7;
    color: #ffffff;
  }
`;
