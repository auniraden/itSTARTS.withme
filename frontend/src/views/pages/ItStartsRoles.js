import React from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";

function ItStartsRoles() {
  const navigate = useNavigate();

  // This function is to handle navigation based on role selection
  const handleRoleSelection = (role) => {
    axios.post('/api/select-role', { role })
      .then(response => {
        const data = response.data;
        if (data.error) {
          console.error('Error selecting role:', data.error);
        } else {
          navigate(data.redirect); // Redirect to the URL sent by the backend
        }
      })
      .catch(error => {
        console.error('Error selecting role:', error);
      });
  };

  return (
    <div
      className="section section-signup"
      style={{
        backgroundColor: "#FFF5EE",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <Card className="card-signup" data-background-color="white">
              <CardHeader className="text-center">
                <div className="logo-container mb-3">
                  <img
                    className="rounded"
                    src={require("assets/img/itstarts-logo-final.png")}
                    alt="it starts logo"
                    style={{ maxWidth: "150px" }}
                  />
                </div>
                <CardTitle className="title-up" tag="h3" style={{ color: "#232D22" }}>
                  Sign Up
                </CardTitle>
              </CardHeader>
              <CardBody className="text-center">
                <p className="text-muted mb-4">But first, let us know who you are</p>
                <Button
                  className="btn-round btn-lg mb-3 btn-primary"
                  block
                  onClick={() => handleRoleSelection("homeschooler")}
                >
                  ME: The Homeschooler
                </Button>
                <Button
                  className="btn-round btn-lg mb-3 btn-primary"
                  block
                  onClick={() => handleRoleSelection("parents")}
                >
                  Parents
                </Button>
                <Button
                  className="btn-round btn-lg mb-3 btn-primary"
                  block
                  onClick={() => handleRoleSelection("tutors")}
                >
                  Tutors
                </Button>
                <p className="mt-4" style={{ color: "#232D22" }}>
                  Have an account? <a href="#" style={{ color: "#232D22" }}>Sign in here!</a>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ItStartsRoles;
