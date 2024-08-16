import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    // Fallback URL for the avatar if the profile picture is not available
    const avatarUrl = currentUser.profilePicture || 'https://static.vecteezy.com/system/resources/thumbnails/021/615/566/small/adult-3d-render-icon-illustration-png.png';

    return (
        <PageContainer>
            <LogoutContainer>
                <Avatar src={avatarUrl} alt={currentUser.name} />
                <h1>{currentUser.name}</h1>
                <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
                <ButtonContainer>
                    <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
                    <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
                </ButtonContainer>
            </LogoutContainer>
        </PageContainer>
    );
};

export default Logout;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #f3f3f3, #e1e1e1);
`;

const LogoutContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #333;
  max-width: 400px;
  margin: auto;
  transform: scale(1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  text-align: center;
  color: #555;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #e53935;
  &:hover {
    background-color: #d32f2f;
  }
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: #0e2fab;
  &:hover {
    background-color: #1036c2;
  }
`;
