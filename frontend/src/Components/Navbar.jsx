import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <NavbarComponent>
      <LeftSection>
        <StyledLink to='/'>
          <h1 className='logo'>Brain <span>Rush</span></h1>
        </StyledLink>
      </LeftSection>
      <RightSection>
        <Link to='/login'><Button className='btn btn-outline-primary'>Login</Button></Link>
        <Link to='/signup'><Button className='btn btn-primary'>Register</Button></Link>
      </RightSection>
    </NavbarComponent>
  );
};

export default Navbar;

const NavbarComponent = styled.div`
  width: 100%;
  padding: 20px 40px;
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const LeftSection = styled.div`
  h1 {
    font-size: 2.5rem;
    cursor: pointer;
    color: #ffffff;
    font-family: 'ubuntu', sans-serif;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;

    span {
      color: #4dabf7;
    }

    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const Button = styled.button`
  background: #4dabf7;
  color: #fff;
  border: 2px solid #4dabf7;
  border-radius: 8px;
  padding: 12px 25px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #1a73e8;
    border-color: #1a73e8;
  }

  &.btn-outline-primary {
    background: transparent;
    color: #4dabf7;
    border-color: #4dabf7;

    &:hover {
      background: #4dabf7;
      color: #fff;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 15px;
  }
`;
