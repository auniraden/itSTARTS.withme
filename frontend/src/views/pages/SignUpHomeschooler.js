import React from "react";
import { useState } from "react";
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

function SignUpHomeschooler() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [selectedCurriculum, setSelectedCurriculum] = useState([]);

  const handleCurriculumChange = (e) => {
    const value = e.target.value;
    setSelectedCurriculum(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  return (
    <>
    <SignupNavbar/>
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
          <Card className="card-signup" data-background-color="F7F0EB">
            <Form action="" className="form" method="">
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
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                    style={{ color: "#232D22" }}
                  ></Input>
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
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)}
                    style={{ color: "#232D22" }}
                  ></Input>
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
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    style={{ color: "#232D22" }}
                  ></Input>
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
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Selected Curriculum: ", selectedCurriculum);
                  }}
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
