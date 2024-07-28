import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardSubtitle,
  CardText,
  Container,
  Row,
  Col,
  Spinner
} from "reactstrap";
import { GoogleLogin } from '@react-oauth/google';




// Set the base URL for all axios requests
axios.defaults.baseURL = 'http://127.0.0.1:8000';
function StudentClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchClasses();
    fetchCalendarEvents();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get('/api/auth/google');
      setClasses(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Redirect to Google authentication
        window.location.href = '/api/auth/google';
      } else {
        setError('Failed to fetch classes. Please try again later.');
        setLoading(false);
      }
    }
  };

  const fetchCalendarEvents = async () => {
    try {
      const response = await axios.get('/api/calendar/events');
      setEvents(response.data);
    } catch (err) {
      setError('Failed to fetch calendar events. Please try again later.');
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

  return (
    <Container fluid>
      <GoogleLogin
      onSuccess={credentialResponse => {
      console.log(credentialResponse);
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />
      <Row>
      {classes.map((classItem, index) => {
          // Find corresponding event for the class (example logic, may need adjustment)
          const event = events.find(ev => ev.summary === classItem.name);
          const scheduleTime = event ? `${event.start} - ${event.end}` : 'No schedule available';
        return (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card style={{ height: '100%', borderRadius: "15px" }}>
              <CardImg
                style={{ borderRadius: "5px", height: "200px", objectFit: "cover" }}
                alt="Class image"
                src={require("assets/img/monogram-me.png")}
                top
                width="100%"
              />
              <CardBody className="d-flex flex-column">
              <CardTitle tag="h5">{classItem.name}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Code: {classItem.code}</CardSubtitle>
                <CardText>
                  <p>Schedule: {scheduleTime}</p>
                  <p>Tutor: {classItem.tutorName}</p>
                </CardText>
                <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    style={{
                      backgroundColor: "#FCFBBB",
                      color: "#232d22",
                      borderRadius: "50px",
                      fontWeight: "bold"
                    }}
                    onClick={() => window.open(classItem.link, '_blank')}
                  >
                    Go to class
                    <i
                      className="now-ui-icons arrows-1_minimal-right"
                      style={{ color: "#232D22", marginLeft: "5px", fontWeight: "bold" }}
                    ></i>
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        );
    })}
      </Row>
    </Container>
  );
}

export default StudentClasses;
