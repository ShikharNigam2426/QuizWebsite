import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Landing = () => {
  const [quizCode, setQuizCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleJoinQuiz = async () => {
    try {
      // Making a GET request to check if the quiz code exists
      const response = await axios.get(`http://localhost:3003/quiz/${quizCode}`);

      if (response.data.exists) {
        // Redirecting to `/takeQuiz/:code` if the quiz exists
        alert('The quiz will start as you Press Enter or click on OK button down here.')
        navigate(`/takeQuiz/${quizCode}`);
      } else {
        setError('Quiz code not found. Please check and try again.');
      }
    } catch (error) {
      console.error('Error verifying quiz code:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <LandingComponent>
      <Content>
        <LeftSection>
          <MainTitle>
            Welcome to <span>BrainRush.io</span>
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

        <RightSection>
          <Section>
            <SectionHeading>Create Your Own Quiz</SectionHeading>
            <Description>
              Craft custom quizzes to challenge your friends or audience.
            </Description>
            <Link to='/createQuiz'>
              <CreateQuizButton className='btn btn-outline-primary'>
                Create a Quiz
              </CreateQuizButton>
            </Link>
          </Section>

          <Section>
            <SectionHeading>Join a Quiz</SectionHeading>
            <Description>
              Have a quiz code? Enter it below to join the fun!
            </Description>
            <JoinQuizSection>
              <InputField
                type="text"
                placeholder="Enter Quiz Code"
                value={quizCode}
                onChange={(e) => setQuizCode(e.target.value)}
              />
              <JoinButton onClick={handleJoinQuiz}>Join</JoinButton>
            </JoinQuizSection>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </Section>
        </RightSection>
      </Content>
    </LandingComponent>
  );
};

export default Landing;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 10px;
  font-family: 'Poppins', sans-serif;
`;


const LandingComponent = styled.div`
  width: 100%;
  height: 100vh;
  background: #000000;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  height: 70vh;
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
    color: #4dabf7;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #a0a0ff;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
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
      content: "✓";
      color: #4dabf7;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Section = styled.div`
  background: rgba(10, 20, 40, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 255, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 50px rgba(0, 128, 255, 0.8);
    z-index: 10;
  }
`;

const SectionHeading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #4dabf7;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
  color: #d0d0ff;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const CreateQuizButton = styled.button`
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

  @media (max-width: 768px) {
    font-size: 0.9rem;
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
  background: transparent;
  padding: 10px;
  border: 2px solid #4dabf7;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  color: #ffffff;

  &::placeholder {
    color: #777;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
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

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
