import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch from Redux
import { setUserEmail } from "../redux/userSlice"; // Import the Redux action

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize Redux dispatcher

  const handleOTPLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!otpSent) {
        // Send email to request OTP
        const response = await axios.post("http://localhost:3003/login", { email });
        if (response.status === 200) {
          setOtpSent(true);
        }
      } else {
        // Verify OTP
        const response = await axios.post("http://localhost:3003/verify-otp", { email, otp });
        if (response.status === 200) {
          dispatch(setUserEmail(email)); // Update Redux state with email
          navigate("/"); // Redirect to dashboard
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <h1>Login with OTP</h1>
        <form onSubmit={handleOTPLogin}>
          <Input
            type="email"
            placeholder="Enter your registered e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {otpSent && (
            <>
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <LoginButton type="submit" disabled={otp.length !== 6 || loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </LoginButton>
            </>
          )}
          {!otpSent && (
            <LoginButton type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </LoginButton>
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
        <Text>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Text>
      </LoginBox>
    </LoginContainer>
  );
};

// Styled Components
const LoginContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  background-color: #1e1e1e;
  color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const Input = styled.input`
  background-color: #292929;
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

export default Login;
