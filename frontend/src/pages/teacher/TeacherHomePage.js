import React, { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import Students from '../../assets/img1.png';
import Lessons from '../../assets/subjects.svg';
import Tests from '../../assets/assignment.svg';
import Time from '../../assets/time.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents && sclassStudents.length;
    const numberOfSessions = subjectDetails && subjectDetails.sessions;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3} lg={3}>
                    <CardClient>
                        <UserPicture>
                            <img src={Students} alt="Students" />
                        </UserPicture>
                        <NameClient>
                            Class Students
                            <span>
                                <Data start={0} end={numberOfStudents} duration={2.5} />
                            </span>
                        </NameClient>
                    </CardClient>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <CardClient>
                        <UserPicture>
                            <img src={Lessons} alt="Lessons" />
                        </UserPicture>
                        <NameClient>
                            Total Lessons
                            <span>
                                <Data start={0} end={numberOfSessions} duration={5} />
                            </span>
                        </NameClient>
                    </CardClient>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <CardClient>
                        <UserPicture>
                            <img src={Tests} alt="Tests" />
                        </UserPicture>
                        <NameClient>
                            Tests Taken
                            <span>
                                <Data start={0} end={24} duration={4} />
                            </span>
                        </NameClient>
                    </CardClient>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <CardClient>
                        <UserPicture>
                            <img src={Time} alt="Time" />
                        </UserPicture>
                        <NameClient>
                            Total Hours
                            <span>
                                <Data start={0} end={30} duration={4} suffix="hrs" />
                            </span>
                        </NameClient>
                    </CardClient>
                </Grid>
                <Grid item xs={12}>
                    <SeeNotice />
                </Grid>
            </Grid>
        </Container>
    );
};

export default TeacherHomePage;

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
