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

function StudentClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get('/api/student/classes');
      setClasses(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch classes. Please try again later.');
      setLoading(false);
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
      <Row>
        {classes.map((classItem, index) => (
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
                <CardTitle tag="h5" style={{ fontWeight: "bold" }}>
                  {classItem.code}
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {classItem.scheduleTime}
                </CardSubtitle>
                <CardText>
                  {classItem.tutorName}
                </CardText>
                <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    style={{
                      backgroundColor: "#FCFBBB",
                      color: "#232d22",
                      borderRadius: "50px",
                      fontWeight: "bold"
                    }}
                    onClick={() => {/* Handle class navigation */}}
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
        ))}
      </Row>
    </Container>
  );
}

export default StudentClasses;
