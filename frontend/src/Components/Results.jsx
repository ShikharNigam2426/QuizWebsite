import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Results = () => {
    const [results, setResults] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            const response = await axios.get('/api/results', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setResults(response.data);
        };
        fetchResults();
    }, []);

    return (
        <div>
            <h2>Your Results</h2>
            {results ? (
                <p>You scored {results.score} out of {results.total}.</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Results;
