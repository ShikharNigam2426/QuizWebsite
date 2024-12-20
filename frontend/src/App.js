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
            <div className='space'>
              <Navbar />
              <Landing />
            </div>
          } />
          <Route path="/signup" element={
            <div className='space'>
              <SignUp />
            </div>
          } />
          <Route path="/login" element={
            <div className='space'>
              <Login />
            </div>
          } />
          <Route path="/createQuiz" element={
            <div className='space'>
              <Navbar />
              <CreatePage />
            </div>
          } />
          <Route path="/takeQuiz/:code" element={
            <div>
              <Navbar />
              <TakeQuiz />
            </div>
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
  background-color: black;
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

  .space{
    background: url('./bg.jpeg') !important;
    background-size: cover !important;
    background-position: center !important;
  }

`;


export default App;
