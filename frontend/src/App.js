import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Landing from './Components/Landing';
import Navbar from './Components/Navbar';
import CreatePage from './Components/CreatePage';
import TakeQuiz from './Components/TakeQuiz';

const App = () => {
  return (
    <AppComponent>
        <Router>
          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                <Landing />
              </>
            } />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createQuiz" element={
              <>
                <Navbar />
                <CreatePage />
              </>
            } />
            <Route path="/takeQuiz/:code" element={
              <>
                <Navbar />
                <TakeQuiz />
              </>
            } />
          </Routes>
        </Router>
    </AppComponent>
  );
};

const AppComponent = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  
  background: url('./bg.jpeg');
  background-size: cover;
  background-position: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    filter: brightness(50%); /* Darkens only the background */
    z-index: -1;
  }
`;


export default App;
