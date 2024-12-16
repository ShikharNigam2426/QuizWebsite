import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const { code } = useParams(); // Get the quiz code from the URL params
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [oneTimeFetch, setOneTimeFetch] = useState(true);

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      console.log('fetching');
      
      try {
        const response = await axios.get(`http://localhost:3003/api/quizzes/${code}`);
        setQuestions(response.data.questions);
        setLoading(false);
      } catch (err) {
        setError("Failed to load quiz questions. Please try again later.");
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [oneTimeFetch]);

  // Timer logic
  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
    }
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleNextQuestion = () => {
    if (questions[currentQuestionIndex]) {
      setAnswers((prev) => [
        ...prev,
        { question: questions[currentQuestionIndex].question, answer: selectedAnswer },
      ]);

      // Update score if correct answer is selected
      if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        setScore((prev) => prev + 1);
      }

      setSelectedAnswer("");
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setTimer(10);
      } else {
        setShowResults(true);
      }
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedAnswer(option);
  };

  if (loading) {
    return <QuizContainer>Loading quiz...</QuizContainer>;
  }

  if (error) {
    return <QuizContainer>{error}</QuizContainer>;
  }

  return (
    <QuizContainer>
      {!showResults ? (
        <>
          <Timer>{timer}s</Timer>
          <QuestionContainer>
            <h2>{questions[currentQuestionIndex]?.question}</h2>
            {questions[currentQuestionIndex]?.options?.map((option, index) => (
              <Option
                key={index}
                onClick={() => handleOptionSelect(option)}
                isSelected={selectedAnswer === option}
              >
                {option}
              </Option>
            ))}
          </QuestionContainer>
          <NextButton onClick={handleNextQuestion} disabled={!selectedAnswer}>
            {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
          </NextButton>
        </>
      ) : (
        <ResultContainer>
          <h2>Quiz Results</h2>
          <Score>
            <strong>Score: </strong>{score} / {questions.length}
          </Score>
          {answers.map((ans, index) => {
            const isCorrect = ans.answer === questions[index]?.correctAnswer;
            return (
              <p key={index}>
                <strong>Q:</strong> {ans.question} <br />
                <strong>Your Answer:</strong> {ans.answer}{" "}
                {isCorrect ? (
                  <TickIcon>&#10003;</TickIcon>
                ) : (
                  <>
                    <CrossIcon>&#10007;</CrossIcon>
                    <br />
                    <strong>Correct Answer:</strong> {questions[index]?.correctAnswer}
                  </>
                )}
              </p>
            );
          })}
        </ResultContainer>
      )}
    </QuizContainer>
  );
};

export default Quiz;

// Styled Components
const QuizContainer = styled.div`
  background-color: #0f172a;
  color: #e2e8f0;
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  text-align: center;
`;

const Timer = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4dabf7;
  margin-bottom: 20px;
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
  h2 {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }
`;

const Option = styled.button`
  display: block;
  width: 100%;
  background-color: ${(props) => (props.isSelected ? "#4dabf7" : "#1e293b")};
  color: ${(props) => (props.isSelected ? "#fff" : "#e2e8f0")};
  border: none;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  text-align: left;

  &:hover {
    background-color: #4dabf7;
    color: #fff;
  }
`;

const NextButton = styled.button`
  background-color: #4dabf7;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#4dabf7" : "#1a73e8")};
  }
`;

const ResultContainer = styled.div`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #4dabf7;
  }
  p {
    margin: 10px 0;
    color: #e2e8f0;
  }
`;

const Score = styled.div`
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 20px;
`;

const TickIcon = styled.span`
  color: green;
  margin-left: 10px;
  font-size: 1.5rem;
`;

const CrossIcon = styled.span`
  color: red;
  margin-left: 10px;
  font-size: 1.5rem;
`;
