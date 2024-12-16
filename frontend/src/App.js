import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Landing from './Components/Landing';

const App = () => {
  return (
    <AppComponent>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />  
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AppComponent>
  );
};

const AppComponent = styled.div`
  background-color: black;
  height: 100vh;
  width: 100vw;
`;

export default App;
