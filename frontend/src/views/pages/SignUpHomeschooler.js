import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip
} from "reactstrap";
import SignupNavbar from "components/Navbars/SignupNavbar";

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = true;

const setCsrfToken = async () => {
  try {
    await axios.get("/sanctum/csrf-cookie");
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
};

function SignUpHomeschooler() {
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const navigate = useNavigate();

  const handleCurriculumChange = (e) => {
    setSelectedCurriculum(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure CSRF token is set
      await setCsrfToken();

      // Make the POST request with CSRF token included
      const response = await axios.post('/homeschooler/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        curriculum_id: selectedCurriculum,
      });

      console.log("Great! You're in!", response.data);
      navigate('/verification-notice');
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error response data:", error.response.data);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received from the server.");
      } else {
        // Something else happened
        console.error("Error message:", error.message);
      }
    }
  };

  React.useEffect(() => {
    document.body.classList.add("sign-up-homeschooler");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("sign-up-homeschooler");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  return (
    <>
      <SignupNavbar />
      <div
        className="section section-signup"
        style={{
          backgroundColor: "#F7F0EB",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          minHeight: "700px"
        }}
      >
        <Container>
          <Row>
            <Card className="card-signup" data-background-color="#F7F0EB">
              <Form onSubmit={handleSubmit} className="form">
                <div className="col-12 text-center mb-4">
                  <img
                    className="rounded"
                    src={require("assets/img/itstarts-logo-final.png")}
                    alt="it starts logo"
                    style={{ maxWidth: "150px" }}
                  />
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3" style={{ color: "#232D22" }}>
                    Sign Up
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <InputGroup className={"no-border" + (firstFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons users_circle-08" style={{ color: "#232D22" }}></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Your First Name Here ;)"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                      style={{ color: "#232D22" }}
                    />
                  </InputGroup>
                  <InputGroup className={"no-border" + (lastFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons text_caps-small" style={{ color: "#232D22" }}></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Your Last Name Here ;)"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                      style={{ color: "#232D22" }}
                    />
                  </InputGroup>
                  <InputGroup className={"no-border" + (emailFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_email-85" style={{ color: "#232D22" }}></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email..."
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      style={{ color: "#232D22" }}
                    />
                  </InputGroup>
                  <InputGroup className="no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons education_hat" style={{ color: "#232D22" }}></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <UncontrolledTooltip
                        placement="right"
                        target="dropdownMenuButtonC"
                        delay={0}
                      >
                        Choose your preferred exam boards and stay updated on registration dates and exam updates.
                      </UncontrolledTooltip>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          aria-expanded={false}
                          aria-haspopup={true}
                          caret
                          color="primary"
                          data-toggle="dropdown"
                          id="dropdownMenuButtonC"
                          type="button"
                          style={{ marginLeft: "20px", backgroundColor: "#F7F0EB", color: "#232D22" }}
                        >
                          Select Curriculum
                        </DropdownToggle>
                        <DropdownMenu aria-labelledby="dropdownMenuButton">
                          <DropdownItem toggle={false}>
                            <input
                              type="radio"
                              name="curriculum"
                              value="SPM"
                              onChange={handleCurriculumChange}
                              checked={selectedCurriculum === "SPM"}
                              style={{ marginRight: "10px" }}
                            />{" "}
                            Lembaga Peperiksaan Malaysia Sijil Pelajaran Malaysia (SPM)
                          </DropdownItem>
                          <DropdownItem toggle={false}>
                            <input
                              type="radio"
                              name="curriculum"
                              value="Cambridge IGCSE"
                              onChange={handleCurriculumChange}
                              checked={selectedCurriculum === "Cambridge IGCSE"}
                              style={{ marginRight: "10px" }}
                            />{" "}
                            Cambridge Assessment International Education (IGCSE)
                          </DropdownItem>
                          <DropdownItem toggle={false}>
                            <input
                              type="radio"
                              name="curriculum"
                              value="Pearson IGCSE"
                              onChange={handleCurriculumChange}
                              checked={selectedCurriculum === "Pearson IGCSE"}
                              style={{ marginRight: "10px" }}
                            />{" "}
                            Pearson Edexcel (IGCSE)
                          </DropdownItem>
                          <DropdownItem toggle={false}>
                            <input
                              type="radio"
                              name="curriculum"
                              value="AQA IGCSE"
                              onChange={handleCurriculumChange}
                              checked={selectedCurriculum === "AQA IGCSE"}
                              style={{ marginRight: "10px" }}
                            />{" "}
                            Oxford AQA (IGCSE)
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                  </InputGroup>
                </CardBody>
                <CardFooter className="text-center">
                  <Button
                    className="btn-round"
                    color="primary"
                    type="submit"
                    size="lg"
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SignUpHomeschooler;
