import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Button, Backdrop } from '@mui/material'; // Add Backdrop here
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from 'styled-components';
import Popup from '../../components/Popup';
import { registerUser } from '../../redux/userRelated/userHandle';
import smit from "../../assets/smit.png";


const defaultTheme = createTheme();

const AdminRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [adminNameError, setAdminNameError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);
  const [secretkey, setSecretkey] = useState("");

  const role = "Admin";

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.adminName.value;
    const schoolName = event.target.schoolName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!name || !schoolName || !email || !password || secretkey !== "123456") {
      if (!name) setAdminNameError(true);
      if (!schoolName) setSchoolNameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      if (secretkey !== "123456") alert("Invalid secret key");
      return;
    }

    const fields = { name, email, password, role, schoolName };
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'adminName') setAdminNameError(false);
    if (name === 'schoolName') setSchoolNameError(false);
  };

  useEffect(() => {
    if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
      navigate('/Admin/dashboard');
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      console.log(error);
    }
  }, [status, currentUser, currentRole, navigate, error, response]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh', backgroundImage: 'url("https://www.joshmorony.com/images/backgrounds/goose-blue-bottom.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <CssBaseline />
        <StyledPaper>
          <StyledBox>
            <StyledLogo src={smit} alt="SMIT Logo" />
            <Typography variant="h4" sx={{ mb: 2, color: "#333" }}>
              Admin Register
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
              Create your own school by registering as an admin.
              <br />
            
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <StyledTextField
                margin="normal"
                required
                fullWidth
                id="adminName"
                label="Enter your name"
                name="adminName"
                autoComplete="name"
                autoFocus
                error={adminNameError}
                helperText={adminNameError && 'Name is required'}
                onChange={handleInputChange}
              />
              <StyledTextField
                margin="normal"
                required
                fullWidth
                id="secretkey"
                label="Secret Key"
                name="secretkey"
                autoComplete="off"
                error={secretkey !== "123456"}
                helperText={secretkey !== "123456" && 'Invalid secret key'}
                onChange={(e) => setSecretkey(e.target.value)}
              />
              <StyledTextField
                margin="normal"
                required
                fullWidth
                id="schoolName"
                label="Create your school name"
                name="schoolName"
                autoComplete="off"
                error={schoolNameError}
                helperText={schoolNameError && 'School name is required'}
                onChange={handleInputChange}
              />
              <StyledTextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter your email"
                name="email"
                autoComplete="email"
                error={emailError}
                helperText={emailError && 'Email is required'}
                onChange={handleInputChange}
              />
              <StyledTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={toggle ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                error={passwordError}
                helperText={passwordError && 'Password is required'}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setToggle(!toggle)}>
                        {toggle ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Register"}
              </StyledButton>
              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Grid>
                  Already have an account?
                </Grid>
                <Grid item sx={{ ml: 1 }}>
                  <StyledLink to="/Adminlogin">
                    Log in
                  </StyledLink>
                </Grid>
              </Grid>
            </Box>
          </StyledBox>
        </StyledPaper>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress color="primary" />
          Please Wait
        </Backdrop>
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </Grid>
    </ThemeProvider>
  );
}

export default AdminRegisterPage;

const StyledPaper = styled(Paper)`
  margin: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  background-color: rgba(255, 255, 255, 0.9); /* Light and transparent */
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLogo = styled('img')`
  width: 120px; /* Adjust as needed */
  height: auto;
  margin-bottom: 1rem;
`;

const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    background: #f9f9f9;
    border-radius: 8px;
  }
`;

const StyledButton = styled(Button)`
  background-color: #1e90ff;
  &:hover {
    background-color: #1c86ee;
  }
  border-radius: 8px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #1e90ff;
  &:hover {
    text-decoration: underline;
  }
`;
