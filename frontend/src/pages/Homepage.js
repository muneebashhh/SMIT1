import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.png";
import smit from "../assets/smit.png";

const Homepage = () => {
    return (
        <StyledContainer>
            <LogoContainer>
                <img src={smit} alt="SMIT Logo" />
            </LogoContainer>
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <StyledImage src={Students} alt="students" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper>
                        <StyledTitle>
                            Welcome to
                            <br />
                            SMIT Assignment
                            <br />
                            Submission Portal
                        </StyledTitle>
                        <StyledText>
                            Assignment Portal management, class organization, and add students and faculty.
                            Seamlessly track attendance, assess performance, and provide feedback.
                            Access records, view marks, and communicate effortlessly.
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <StyledLoginButton>
                                    Get started
                                    <div className="icon">
                                        <svg
                                          height="24"
                                          width="24"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="M0 0h24v24H0z" fill="none"></path>
                                          <path
                                            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                    </div>
                                </StyledLoginButton>
                            </StyledLink>  
                            <StyledFooter>
                            Made by <BlueLink href="https://www.linkedin.com/in/team-debuggers-smit-7b385231a/" target="" rel=""> Team Debuggers </BlueLink>
                                    
                            </StyledFooter>
                           
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 2rem;  // Increased padding
`;

const LogoContainer = styled.div`
  margin-top: 2rem;  // Increased margin
  img {
    width: 10rem;  // Increased logo width
    height: auto;
  }
`;

const StyledPaper = styled.div`
  padding: 2rem;  // Increased padding
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;  // Increased gap
  padding: 2rem;  // Increased padding
  position: relative;
`;

const StyledTitle = styled.h1`
  font-size: 4rem;  // Increased font size
  color: #252525;
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: 1.2;  // Increased line height
`;

const StyledText = styled.p`
  margin-top: 2rem;  // Increased top margin
  margin-bottom: 2rem;  // Increased bottom margin
  letter-spacing: normal;
  line-height: 1.5;  // Increased line height
  font-weight: bold;  // Make text bold
`;


const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledLoginButton = styled.button`
  background: #28a745; /* Green color */
  color: white;
  font-family: inherit;
  padding: 0.35em;
  padding-left: 1.2em;
  font-size: 1.5rem;  // Increased font size
  font-weight: 500;
  border-radius: 0.9em;
  border: none;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  box-shadow: inset 0 0 1.6em -0.6em #1e7e34; /* Darker green shadow */
  overflow: hidden;
  position: relative;
  height: 2.8em;
  padding-right: 3.3em;
  cursor: pointer;

  .icon {
    background: white;
    margin-left: 1em;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.2em;
    width: 2.2em;
    border-radius: 0.7em;
    box-shadow: 0.1em 0.1em 0.6em 0.2em #1e7e34; /* Darker green shadow */
    right: 0.3em;
    transition: all 0.3s;
  }

  &:hover .icon {
    width: calc(100% - 0.6em);
  }

  .icon svg {
    width: 1.1em;
    transition: transform 0.3s;
    color: #1e7e34; /* Darker green for the icon */
  }

  &:hover .icon svg {
    transform: translateX(0.1em);
  }

  &:active .icon {
    transform: scale(0.95);
  }
`;


const BlueLink = styled.a`
  color: #1e90ff;
  &:hover {
    color: #1c86ee;
  }
`;

const StyledFooter = styled.div`
  margin-top: auto;
  font-size: 1rem;  // Increased font size
  color: #777;
  text-align: center;
  width: 100%;
`;

const StyledImage = styled.img`
  width: 120%;
  height: auto;
`;
