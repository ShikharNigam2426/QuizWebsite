import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Login = () => {
  const [useOTP, setUseOTP] = useState(false);

  return (
    <LoginContainer>
      <LoginBox>
        <h1>{useOTP ? "Sign in with OTP" : "Login"}</h1>
        {!useOTP ? (
          <form>
            <Input type="text" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <LoginButton type="submit">Login</LoginButton>
          </form>
        ) : (
          <form>
            <Input type="text" placeholder="Enter your registered e-mail" />
            <Input type="text" placeholder="Enter OTP" />
            <LoginButton type="submit">Verify OTP</LoginButton>
          </form>
        )}
        <Text>
          {useOTP ? (
            <>
              Login with password?{" "}
              <SwitchLink onClick={() => setUseOTP(false)}>Click Here</SwitchLink>
            </>
          ) : (
            <>
              Prefer OTP?{" "}
              <SwitchLink onClick={() => setUseOTP(true)}>Sign in with OTP</SwitchLink>
            </>
          )}
        </Text>
        <Text>
          Don't have an account? <Link to={'/signup'}>Sign up</Link>
        </Text>
      </LoginBox>
    </LoginContainer>
  );
};

// Styled Components
const LoginContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #121212; /* Deep black background */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
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

const LoginButton = styled.button`
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

// const Link = styled.a`
//   color: #007bff;
//   text-decoration: none;

//   &:hover {
//     color: #0056b3;
//     text-decoration: underline;
//   }
// `;

const SwitchLink = styled.span`
  color: #007bff;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
`;

export default Login;
