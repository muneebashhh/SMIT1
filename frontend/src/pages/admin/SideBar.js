import React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import styled, { keyframes } from 'styled-components';

// Define animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleOnHover = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

const SidebarButton = styled(ListItemButton)`
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: #f5f5f5;
    animation: ${scaleOnHover} 0.3s ease forwards;
  }
`;

const SidebarIcon = styled(ListItemIcon)`
  color: ${props => props.active ? '#1976d2' : 'inherit'};
`;

const SideBar = () => {
    const location = useLocation();

    return (
        <>
            <React.Fragment>
                <SidebarButton component={Link} to="/">
                    <SidebarIcon active={location.pathname === "/" || location.pathname === "/Admin/dashboard"}>
                        <HomeIcon />
                    </SidebarIcon>
                    <ListItemText primary="Home" />
                </SidebarButton>
                <SidebarButton component={Link} to="/Admin/classes">
                    <SidebarIcon active={location.pathname.startsWith('/Admin/classes')}>
                        <ClassOutlinedIcon />
                    </SidebarIcon>
                    <ListItemText primary="Classes" />
                </SidebarButton>
                <SidebarButton component={Link} to="/Admin/subjects">
                    <SidebarIcon active={location.pathname.startsWith("/Admin/subjects")}>
                        <AssignmentIcon />
                    </SidebarIcon>
                    <ListItemText primary="Subjects" />
                </SidebarButton>
                <SidebarButton component={Link} to="/Admin/teachers">
                    <SidebarIcon active={location.pathname.startsWith("/Admin/teachers")}>
                        <SupervisorAccountOutlinedIcon />
                    </SidebarIcon>
                    <ListItemText primary="Teachers" />
                </SidebarButton>
                <SidebarButton component={Link} to="/Admin/students">
                    <SidebarIcon active={location.pathname.startsWith("/Admin/students")}>
                        <PersonOutlineIcon />
                    </SidebarIcon>
                    <ListItemText primary="Students" />
                </SidebarButton>
                <SidebarButton component={Link} to="/Admin/notices">
                    <SidebarIcon active={location.pathname.startsWith("/Admin/notices")}>
                        <AnnouncementOutlinedIcon />
                    </SidebarIcon>
                    <ListItemText primary="Notices" />
                </SidebarButton>
                <SidebarButton component={Link} to="/Admin/complains">
                    <SidebarIcon active={location.pathname.startsWith("/Admin/complains")}>
                        <ReportIcon />
                    </SidebarIcon>
                    <ListItemText primary="Complains" />
                </SidebarButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
            <ListSubheader component="div" inset sx={{ backgroundColor: 'lightgray', color: 'black' }}>
    User
</ListSubheader>

                <SidebarButton component={Link} to="/Admin/profile">
                    <SidebarIcon active={location.pathname.startsWith("/Admin/profile")}>
                        <AccountCircleOutlinedIcon />
                    </SidebarIcon>
                    <ListItemText primary="Profile" />
                </SidebarButton>
                <SidebarButton component={Link} to="/logout">
                    <SidebarIcon active={location.pathname.startsWith("/logout")}>
                        <ExitToAppIcon />
                    </SidebarIcon>
                    <ListItemText primary="Logout" />
                </SidebarButton>
            </React.Fragment>
        </>
    )
}

export default SideBar;
