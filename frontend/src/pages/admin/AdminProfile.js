import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ProfileContainer = styled(Box)`
  animation: ${fadeIn} 0.5s ease;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
`;

const ProfileField = styled(Typography)`
  margin: 10px 0;
`;

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <ProfileContainer>
            <ProfileField variant="h6">Name: {currentUser.name}</ProfileField>
            <ProfileField variant="h6">Email: {currentUser.email}</ProfileField>
            <ProfileField variant="h6">School: {currentUser.schoolName}</ProfileField>
        </ProfileContainer>
    );
}

export default AdminProfile;
