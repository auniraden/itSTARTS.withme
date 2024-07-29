import React, { useState, useEffect } from "react";
import axios from "axios";


import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input
} from "reactstrap";

axios.defaults.baseURL = 'http://127.0.0.1:8000';

// axios.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = 'Bearer ' + token;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );


function StudentClasses() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [curriculum, setCurriculum] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [goals, setGoals] = useState(['', '', '']);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [curriculumResponse, tutorsResponse] = await Promise.all([
        axios.get('/api/homeschooler/curriculum'),
        axios.get('/api/homeschooler/tutors')
      ]);
      setCurriculum(curriculumResponse.data);
      setTutors(tutorsResponse.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  const handleGoalChange = (index, value) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    setGoals(newGoals);
  };

  const saveGoals = async () => {
    try {
      await axios.post('/api/goals', { goals });
      setModalOpen(false);
    } catch (err) {
      console.error('Error saving goals:', err);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner color="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <h3>{error}</h3>
      </Container>
    );
  }

  const cards = [
    {
      title: "Google Classroom",
      description: "Access your Google Classroom",
      buttonText: "Classroom",
      onClick: () => window.open('https://classroom.google.com', '_blank')
    },
    {
      title: "My Curriculum",
      description: curriculum ? curriculum.name : "No curriculum assigned",
      buttonText: "Explore my curriculum",
      onClick: () => curriculum && window.open(curriculum.link, '_blank')
    },
    {
      title: "Create Top 3 Goals",
      description: "Set your daily goals, of what would you like to achieve today!",
      buttonText: "Create",
      onClick: () => setModalOpen(true)
    },
    {
      title: "My Tutors List",
      description: `You have ${tutors.length} tutor(s)`,
      buttonText: "View Tutors",
      onClick: () => {/* Implement tutor list view */}
    }
  ];

  return (
    <Container fluid>
      <Row>
        {cards.map((card, index) => (
          <Col key={index} xs={12} sm={6} md={3} className="mb-4">
            <Card style={{ height: '100%', borderRadius: "15px" }}>
              <CardBody className="d-flex flex-column">
                <CardTitle tag="h5">{card.title}</CardTitle>
                <CardText>{card.description}</CardText>
                <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    style={{
                      backgroundColor: "#FCFBBB",
                      color: "#232d22",
                      borderRadius: "50px",
                      fontWeight: "bold"
                    }}
                    onClick={card.onClick}
                  >
                    {card.buttonText}
                    <i className="now-ui-icons arrows-1_minimal-right" style={{ marginLeft: "5px" }}></i>
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Set Top 3 Goals</ModalHeader>
        <ModalBody>
          <Form>
            {goals.map((goal, index) => (
              <FormGroup key={index}>
                <Input
                  type="text"
                  value={goal}
                  onChange={(e) => handleGoalChange(index, e.target.value)}
                  placeholder={`Goal ${index + 1}`}
                />
              </FormGroup>
            ))}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveGoals}>Save Goals</Button>
          <Button color="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default StudentClasses;
