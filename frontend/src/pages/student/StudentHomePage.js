import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id;

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3} lg={3}>
                    <CardClient>
                        <UserPicture>
                            <img src={Subject} alt="Subjects" />
                        </UserPicture>
                        <NameClient>
                            Total Subjects
                            <span>
                                <Data start={0} end={numberOfSubjects} duration={2.5} />
                            </span>
                        </NameClient>
                    </CardClient>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <CardClient>
                        <UserPicture>
                            <img src={Assignment} alt="Assignments" />
                        </UserPicture>
                        <NameClient>
                            Total Assignments
                            <span>
                                <Data start={0} end={15} duration={4} />
                            </span>
                        </NameClient>
                    </CardClient>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <ChartContainer>
                        {response ? (
                            <Typography variant="h6">No Attendance Found</Typography>
                        ) : loading ? (
                            <Typography variant="h6">Loading...</Typography>
                        ) : subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                            <CustomPieChart data={chartData} />
                        ) : (
                            <Typography variant="h6">No Attendance Found</Typography>
                        )}
                    </ChartContainer>
                </Grid>
                <Grid item xs={12}>
                    <SeeNotice />
                </Grid>
            </Grid>
        </Container>
    );
};

export default StudentHomePage;

const CardClient = styled.div`
  background: #2cb5a0;
  width: 13rem;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 20px;
  padding-right: 20px;
  border: 4px solid #7cdacc;
  box-shadow: 0 6px 10px rgba(207, 212, 222, 1);
  border-radius: 10px;
  text-align: center;
  color: #fff;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const UserPicture = styled.div`
  overflow: hidden;
  object-fit: cover;
  width: 5rem;
  height: 5rem;
  border: 4px solid #7cdacc;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  img {
    width: 2.5rem;
    fill: currentColor;
  }
`;

const NameClient = styled.p`
  margin: 0;
  margin-top: 20px;
  font-weight: 600;
  font-size: 18px;

  span {
    display: block;
    font-weight: 200;
    font-size: 16px;
  }
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;

const ChartContainer = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
