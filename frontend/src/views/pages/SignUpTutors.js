import React, { useState } from "react";
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
  UncontrolledTooltip,
  FormGroup,
  Label,
  Alert
} from "reactstrap";
import SignupNavbar from "components/Navbars/SignupNavbar";

axios.defaults.baseURL = 'http://127.0.0.1:8000';
function SignUpTutor() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("");

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const totalSize = uploadedFiles.reduce((acc, file) => acc + file.size, 0);
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes

    if (totalSize > maxSize) {
      setAlertMessage("Total file size exceeds 100MB limit. Please reduce the file size.");
    } else {
      setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
      setAlertMessage("");
    }
  };

  const handleCurriculumChange = (e) => {
    setSelectedCurriculum(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("curriculum", selectedCurriculum);
    files.forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });

    try {
      const response = await axios.post("http://127.0.0.1:8000/tutor/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        // Handle successful registration
        console.log("Great! You're in!", response.data);
      }
    } catch (error) {
      console.error("Woops! There's some problem to get you registered. Please try again in a moment.", error);
    }
  };

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
            <Card className="card-signup" data-background-color="F7F0EB">
              <Form action="" className="form" method="" onSubmit={handleSubmit}>
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
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                      onChange={(e) => setFirstName(e.target.value)}
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
                      value={lastName}
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                      onChange={(e) => setLastName(e.target.value)}
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
                      type="email"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      Select the exam boards you are qualified to teach.
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
                      <DropdownMenu aria-labelledby="dropdownMenuButtonC">
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
                  <UncontrolledTooltip
                      placement="right"
                      target="qualifications"
                      delay={0}
                    >
                      Click here to upload your document(s).
                    </UncontrolledTooltip>
                  <FormGroup className="mt-4">
                    <Label for="qualifications" style={{ color: "#232D22" }}>
                      Qualifications:
                    </Label>
                    <Input
                      type="file"
                      name="qualifications"
                      id="qualifications"
                      multiple
                      onChange={handleFileUpload}
                    />
                    <small className="form-text text-muted">
                      Upload your qualification certificate or other verifying documents here to confirm your eligibility as a tutor (Max 100MB)
                    </small>
                    {files.length > 0 && (
                      <p className="mt-2" style={{color:"#fe4632", fontSize:"12px" }}>
                        You have uploaded {files.length} document(s).
                      </p>
                    )}
                  </FormGroup>
                  {alertMessage && <Alert color="danger">{alertMessage}</Alert>}
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

export default SignUpTutor;
