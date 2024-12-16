import React from "react";
import styled from "styled-components";

const SignUp = () => {
    return (
        <SignupContainer>
            <SignupBox>
                <h1>Sign Up</h1>
                <form>
                    <Input type="text" placeholder="Email" />
                    <Input type="password" placeholder="Password" />
                    <SignupButton type="submit">Sign Up</SignupButton>
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
    background-color: #121212; /* Deep black background */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SignupBox = styled.div`
    background-color: #1e1e1e; /* Slightly lighter black for contrast */
    color: #ffffff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5); /* Subtle shadow */
    text-align: center;
    max-width: 400px;
    width: 100%;
`;

const Input = styled.input`
    background-color: #292929;
    color: #fff;
    border: 1px solid #444; /* Border for inputs */
    padding: 10px;
    margin: 10px 0;
    width: 100%;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: #007bff; /* Bootstrap-like primary color */
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
