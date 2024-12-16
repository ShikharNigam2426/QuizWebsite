import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await axios.get('/api/quiz');
            setQuestions(response.data);
        };
        fetchQuestions();
    }, []);

    const handleAnswerChange = (index, optionIndex) => {
        const newAnswers = [...answers];
        newAnswers[index] = optionIndex;
        setAnswers(newAnswers);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                '/api/quiz/submit',
                { answers },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error submitting quiz.');
        }
    };

    return (
        <div>
            <h2>Quiz</h2>
            {questions.map((question, index) => (
                <div key={index}>
                    <p>{question.question}</p>
                    {question.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                            <input
                                type="radio"
                                name={`question-${index}`}
                                onChange={() => handleAnswerChange(index, optionIndex)}
                            />
                            {option}
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit Quiz</button>
            <p>{message}</p>
        </div>
    );
};

export default Quiz;
