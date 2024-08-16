import { Container, Grid } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import Students from '../../assets/img1.png';
import Classes from '../../assets/img2.png';
import Teachers from '../../assets/img3.png';
// import Fees from '../../assets/img4.png'; // Uncomment if needed
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user);
    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList?.length || 0;
    const numberOfClasses = sclassesList?.length || 0;
    const numberOfTeachers = teachersList?.length || 0;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3} lg={3}>
                    <CardClient>
                        <UserPicture>
                            <img src={Students} alt="Students" />
                        </UserPicture>
                        <NameClient>
                            Total Students
                            <span>
                                <Data start={0} end={numberOfStudents} duration={2.5} />
                            </span>
                        </NameClient>
                    </CardClient>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <CardClient>
                        <UserPicture>
                            <img src={Classes} alt="Classes" />
                        </UserPicture>
                        <NameClient>
                            Total Classes
                            <span>
                                <Data start={0} end={numberOfClasses} duration={5} />
                            </span>
                        </NameClient>
                    </CardClient>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <CardClient>
                        <UserPicture>
                            <img src={Teachers} alt="Teachers" />
                        </UserPicture>
                        <NameClient>
                            Total Teachers
                            <span>
                                <Data start={0} end={numberOfTeachers} duration={2.5} />
                            </span>
                        </NameClient>
                    </CardClient>
                </Grid>
                {/* Uncomment if needed */}
                {/* <Grid item xs={12} md={3} lg={3}>
                    <CardClient>
                        <UserPicture>
                            <img src={Fees} alt="Fees" />
                        </UserPicture>
                        <NameClient>
                            Fees Collection
                            <span>
                                <Data start={0} end={23000} duration={2.5} prefix="$" />
                            </span>
                        </NameClient>
                    </CardClient>
                </Grid> */}
                <Grid item xs={12}>
                    <SeeNotice />
                </Grid>
            </Grid>
        </Container>
    );
};

const CardClient = styled.div`
  background: #2cb5a0;
  width: 13rem;
  padding: 25px 20px;
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

export default AdminHomePage;
