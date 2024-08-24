import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Row,
  Col,
  CardFooter
} from "reactstrap";
import SignupNavbar from "components/Navbars/SignupNavbar";

axios.defaults.baseURL = 'http://localhost:8000'; // Adjust API base URL if needed
axios.defaults.withCredentials = true; // Include credentials with requests

// Function to fetch CSRF token and set up Axios
const setupAxios = async () => {
  try {
    // Fetch CSRF token
    const response = await axios.get('/csrf-token');
    // Set the CSRF token in Axios headers
    axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.token;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
};

function ItStartsRoles() {
  const navigate = useNavigate();

  useEffect(() => {
    setupAxios();

    document.body.classList.add("it-starts-roles");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    return function cleanup() {
      document.body.classList.remove("it-starts-roles");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  const handleRoleSelection = async (role) => {
    try {
      // Send the selected role to the backend
      const response = await axios.post('/api/select-role', { role });
      const data = response.data;
      if (data.redirect) {
        navigate(data.redirect); // Redirect to the URL sent by the backend
      }
    } catch (error) {
      console.error('Error selecting role:', error);
    }
  };

  return (
    <>
      <SignupNavbar />
      <div
        className="section section-signup"
        style={{
          backgroundColor: "#F7F0EB",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="12" className="d-flex justify-content-center">
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
                  <p className="text-muted mb-4">Hi homeschoolers!</p>
                  <Button
                    className="btn-round btn-lg mb-3 btn-primary"
                    block
                    onClick={() => handleRoleSelection("homeschooler")}
                  >
                    Let's get started!
                  </Button>
                </CardBody>
                <CardFooter>
                  <Row>
                    <Col className="text-center">
                      <Link
                        className="link"
                        to="/login"
                        style={{ color: "#FE4632", fontSize: "0.7rem" }}
                      >
                        Psstt... Sign in here if you have an account!
                      </Link>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ItStartsRoles;
