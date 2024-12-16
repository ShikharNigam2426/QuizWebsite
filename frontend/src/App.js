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
  background-color: black;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
`;

export default App;
