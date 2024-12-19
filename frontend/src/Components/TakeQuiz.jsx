import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

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
  const [showLeaderboard, setShowLeaderboard] = useState(false); // State for toggling leaderboard view

  const userEmail = useSelector((state) => state.user.email)

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
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
        // Immediately submit the results when the quiz finishes
        submitResults();
      }
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedAnswer(option);
  };

  // Submit results to backend when quiz finishes
  const submitResults = async () => {
    try {
      await axios.post('http://localhost:3003/api/submit-quiz-result', {
        email: userEmail, // Replace with the user's email
        score: score,
        quizCode: code
      });
    } catch (error) {
      console.error('Error saving result:', error);
    }
  };

  const toggleLeaderboard = () => {
    setShowLeaderboard((prev) => !prev);
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
        <>
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
          <LeaderboardButton onClick={toggleLeaderboard} className="ml-1 btn-primary">
            {showLeaderboard ? "Hide Leaderboards" : "View Leaderboards"}
          </LeaderboardButton>
        </>
      )}

      {showLeaderboard && <Leaderboard code={code} />}
    </QuizContainer>
  );
};

const Leaderboard = ({ code }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/api/leaderboard/${code}`);
        setLeaderboard(response.data.leaderboard);
        setLoading(false);
      } catch (err) {
        setError("Failed to load leaderboard. Please try again later.");
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [code]);

  if (loading) {
    return <LeaderboardContainer>Loading leaderboard...</LeaderboardContainer>;
  }

  if (error) {
    return <LeaderboardContainer>{error}</LeaderboardContainer>;
  }

  return (
    <LeaderboardContainer>
      <h2>Leaderboard</h2>
      <LeaderboardList>
        {leaderboard.length > 0 ? (
          leaderboard.map((user, index) => (
            <LeaderboardItem key={index}>
              <Rank>{index + 1}</Rank>
              <Username>{user.email}</Username>
              <Score>{user.score} points</Score>
            </LeaderboardItem>
          ))
        ) : (
          <p>No results available yet.</p>
        )}
      </LeaderboardList>
    </LeaderboardContainer>
  );
};

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

  @media (max-width: 600px) {
    width: 90%;
  }
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

const LeaderboardButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const LeaderboardContainer = styled.div`
  background-color: #0f172a;
  color: #e2e8f0;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
`;

const LeaderboardList = styled.div`
  margin-top: 20px;
  text-align: left;
`;

const LeaderboardItem = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #1e293b;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
`;

const Rank = styled.div`
  width: 30px;
  text-align: center;
  font-size: 1.2rem;
`;

const Username = styled.div`
  flex: 1;
  text-align: left;
  font-size: 1rem;
`;

const Score = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #4dabf7;
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

export default Quiz;
