import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Logo src="https://quiz.saylaniwelfare.com/images/smit.png" alt="Logo" />
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card className="card1" onClick={() => navigateHandler("Admin")}>
              <IconBox>
                <AccountCircle fontSize="large" />
              </IconBox>
              <StyledTypography>
                Admin
              </StyledTypography>
              <Description>
                Login as an administrator to access the dashboard to manage app data.
              </Description>
              <div className="go-corner">
                <div className="go-arrow">→</div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="card2" onClick={() => navigateHandler("Student")}>
              <IconBox>
                <School fontSize="large" />
              </IconBox>
              <StyledTypography>
                Student
              </StyledTypography>
              <Description>
                Login as a student to explore course materials and assignments.
              </Description>
              <div className="go-corner">
                <div className="go-arrow">→</div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="card3" onClick={() => navigateHandler("Teacher")}>
              <IconBox>
                <Group fontSize="large" />
              </IconBox>
              <StyledTypography>
                Teacher
              </StyledTypography>
              <Description>
                Login as a teacher to create courses, assignments, and track student progress.
              </Description>
              <div className="go-corner">
                <div className="go-arrow">→</div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledContainer = styled.div`
  background: linear-gradient(to bottom, #006d77, #83c5be);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  animation: ${fadeIn} 1s ease-in-out;
  background-image: url('https://pub-static.fotor.com/assets/bg/3e2ec15e-01a7-4de9-863d-a26dc172a574.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

const Logo = styled.img`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 300px; /* Adjust this value as needed */
  height: auto; /* Maintain aspect ratio */
`;

const Card = styled.div`
  display: block;
  position: relative;
  max-width: 262px;
  background-color: #f2f8f9;
  border-radius: 4px;
  padding: 32px 24px;
  margin: 12px;
  text-decoration: none;
  overflow: hidden;
  border: 1px solid #f2f8f9;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s, color 0.3s;

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: #00838d;
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(2);
    transform-origin: 50% 50%;
    transition: transform 0.15s ease-out;
  }

  &:hover:before {
    transform: scale(2.15);
  }

  &:hover {
    transition: all 0.2s ease-out;
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
    background-color: white;
    border: 1px solid #ccc;
  }

  p {
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    color: #666;
  }

  p.small {
    font-size: 14px;
  }

  .go-corner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 32px;
    height: 32px;
    overflow: hidden;
    top: 0;
    right: 0;
    background-color: #00838d;
    border-radius: 0 4px 0 32px;
  }

  .go-arrow {
    margin-top: -4px;
    margin-right: -4px;
    color: white;
    font-family: courier, sans;
  }
`;

const IconBox = styled(Box)`
  margin-bottom: 16px;
  font-size: 3rem;
  color: #83c5be;
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
`;
