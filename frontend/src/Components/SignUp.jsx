import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const SignUp = () => {
    // State to hold email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Reset any previous error

        try {
            const response = await axios.post("http://localhost:3003/register", {
                email,
                password,
            });

            console.log("Signup successful:", response.data);
            // Redirect to login page after successful signup
            window.location.href = "/login";
        } catch (err) {
            setLoading(false);
            if (err.response) {
                // Server error
                setError(err.response.data.message || "Signup failed");
            } else {
                // Network error
                setError("Network error. Please try again later.");
            }
        }
    };

    return (
        <SignupContainer>
            <SignupBox>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <SignupButton type="submit" disabled={loading}>
                        {loading ? "Signing up..." : "Sign Up"}
                    </SignupButton>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </form>
                <Text>
                    Already have an account? <Link href="/login">Login</Link>
                </Text>
            </SignupBox>
        </SignupContainer>
    );
};

// Styled Components
const SignupContainer = styled.div`
    height: 100vh;
    width: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SignupBox = styled.div`
    background-color: #1e1e1e5d;
    color: #ffffff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
    text-align: center;
    max-width: 400px;
    width: 100%;
`;

const Input = styled.input`
    background-color: #2929297a;
    color: #fff;
    border: 1px solid #444;
    padding: 10px;
    margin: 10px 0;
    width: 100%;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 5px #007bff;
    }
`;

const SignupButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 15px;
    width: 100%;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #aaa;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    margin-top: 10px;
    font-size: 0.9rem;
`;

const Text = styled.p`
    margin-top: 20px;
    font-size: 0.9rem;
`;

const Link = styled.a`
    color: #007bff;
    text-decoration: none;

    &:hover {
        color: #0056b3;
        text-decoration: underline;
    }
`;

export default SignUp;
