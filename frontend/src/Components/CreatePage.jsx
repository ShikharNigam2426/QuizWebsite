import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CreatePage = () => {
  // all the data of the question while filing the right side is stored here locally
  const [formData, setFormData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: '',
  });

  const [questions, setQuestions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Generating a 6-digit random code
  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  // adding the question to the questions array
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // updating the question in the questions array while editing
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editingIndex] = formData;
      setQuestions(updatedQuestions);
      setEditingIndex(null);
    } else {
      setQuestions([...questions, formData]);
    }
    setFormData({
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
    });
  };

  // remove the question from the questions Array
  const handleDelete = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleEdit = (index) => {
    const questionToEdit = questions[index];
    setFormData(questionToEdit);
    setEditingIndex(index);
  };

  // Handle 'Create Quiz' button click to send data with code
  const handleCreateQuiz = async () => {
    const code = generateCode();
    const quizData = {
      code: code,
      questions: questions.map((q, index) => ({
        id: index + 1,
        question: q.question,
        options: [q.option1, q.option2, q.option3, q.option4],
        correctAnswer: q.correctAnswer,
      })),
    };
  
    try {
      console.log(quizData);
      const response = await axios.post('http://localhost:3003/createquiz', quizData);
      console.log(response.data);  // For testing purposes, logging the response from the server
      alert('Quiz created successfully! Code is: ' + quizData.code);
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('Error creating quiz. Please try again.');
    }
  };
  

  return (
    <PageContainer>
      <ContentWrapper>
        <QuestionsList>
          <h2>Created Questions</h2>
          <ScrollableQuestions>
            {questions.length > 0 ? (
              <>
                {questions.map((q, index) => (
                  <QuestionItem key={index}>
                    <strong>{q.question}</strong>
                    <ul>
                      <li>{q.option1}</li>
                      <li>{q.option2}</li>
                      <li>{q.option3}</li>
                      <li>{q.option4}</li>
                    </ul>
                    <p>
                      <span>Correct Answer:</span> {q.correctAnswer}
                    </p>
                    <ActionButtons>
                      <EditButton onClick={() => handleEdit(index)}>✏️</EditButton>
                      <DeleteButton onClick={() => handleDelete(index)}>🗑️</DeleteButton>
                    </ActionButtons>
                  </QuestionItem>
                ))}
              </>
            ) : (
              <p>No questions created yet.</p>
            )}
          </ScrollableQuestions>
          {questions.length > 0 && <CreateQuizButton onClick={handleCreateQuiz}>Create Quiz</CreateQuizButton>}
        </QuestionsList>
        <FormContainer>
          <h2>{editingIndex !== null ? 'Edit Question' : 'Create New Question'}</h2>
          <Form onSubmit={handleSubmit}>
            <InputField>
              <label htmlFor="question">Question</label>
              <input
                type="text"
                id="question"
                name="question"
                placeholder="Enter your question"
                value={formData.question}
                onChange={handleChange}
                required
              />
            </InputField>
            <InputField>
              <label htmlFor="option1">Option 1</label>
              <input
                type="text"
                id="option1"
                name="option1"
                placeholder="Enter Option 1"
                value={formData.option1}
                onChange={handleChange}
                required
              />
            </InputField>
            <InputField>
              <label htmlFor="option2">Option 2</label>
              <input
                type="text"
                id="option2"
                name="option2"
                placeholder="Enter Option 2"
                value={formData.option2}
                onChange={handleChange}
                required
              />
            </InputField>
            <InputField>
              <label htmlFor="option3">Option 3</label>
              <input
                type="text"
                id="option3"
                name="option3"
                placeholder="Enter Option 3"
                value={formData.option3}
                onChange={handleChange}
                required
              />
            </InputField>
            <InputField>
              <label htmlFor="option4">Option 4</label>
              <input
                type="text"
                id="option4"
                name="option4"
                placeholder="Enter Option 4"
                value={formData.option4}
                onChange={handleChange}
                required
              />
            </InputField>
            <InputField>
              <label htmlFor="correctAnswer">Correct Answer</label>
              <select
                id="correctAnswer"
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleChange}
                required
              >
                <option value="">Select the correct answer</option>
                <option value={formData.option1}>{formData.option1}</option>
                <option value={formData.option2}>{formData.option2}</option>
                <option value={formData.option3}>{formData.option3}</option>
                <option value={formData.option4}>{formData.option4}</option>
              </select>
            </InputField>
            <ButtonContainer>
              <StyledButton type="submit">
                {editingIndex !== null ? 'Update Question' : 'Submit'}
              </StyledButton>
            </ButtonContainer>
          </Form>
        </FormContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default CreatePage;

const PageContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: transparent;
  color: #fff;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const QuestionsList = styled.div`
  width: 100%;
  margin-bottom: 20px;
  height: 80vh;
  padding-right: 10px;
  h2 {
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 20px;
  }
  p {
    color: #bbb;
    font-size: 1rem;
  }
  @media (min-width: 768px) {
    width: 45%;
    margin-right: 20px;
  }
`;

const ScrollableQuestions = styled.div`
  max-height: calc(80vh - 60px);
  overflow-y: auto;
  scrollbar-width: none;
`;

const QuestionItem = styled.div`
  background-color: #0a1428c3;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  strong {
    font-size: 1.1rem;
    color: #4dabf7;
  }
  span {
    color: #4dabf7;
  }
  ul {
    list-style-type: none;
    padding-left: 20px;
    li {
      font-size: 1rem;
      color: #bbb;
    }
  }
  p {
    font-size: 1rem;
    color: #ccc;
  }
  @media (min-width: 768px) {
    margin-bottom: 15px;
  }
`;

const ActionButtons = styled.div`
  margin-top: 10px;
`;

const EditButton = styled.button`
  background: none;
  color: #4dabf7;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  margin-right: 10px;
  &:hover {
    color: #1a73e8;
  }
`;

const DeleteButton = styled.button`
  background: none;
  color: #ff5733;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  &:hover {
    color: #e24d2d;
  }
`;

const CreateQuizButton = styled.button`
  background-color: #4dabf7;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #1a73e8;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  background-color: #0a1428c3;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 20px;
  z-index: 10;
  h2 {
    font-size: 1.5rem;
    color: #4dabf7;
    margin-bottom: 20px;
  }
  @media (min-width: 768px) {
    width: 45%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.div`
  margin-bottom: 15px;
  background: transparent;
  label {
    display: block;
    font-size: 1.1rem;
    color: #4dabf7;
    margin-bottom: 5px;
  }
  input,
  select {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 2px solid #4dabf7;
    border-radius: 8px;
    background-color: transparent;
    color: #d0d0ff;
    &:focus {
      border-color: #4dabf7;
      outline: none;
    }
  }
  select {
    background: rgba(10, 20, 40, 0.9);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledButton = styled.button`
  background-color: #4dabf7;
  color: #fff;
  border: none;
  padding: 12px 25px;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #1a73e8;
  }
`;
