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
  const [ratePerHour, setRatePerHour] = useState("");
  const [selectedClassType, setSelectedClassType] = useState("");
  const [files, setFiles] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const [maxStudents, setMaxStudents] = useState("");

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const totalSize = uploadedFiles.reduce((acc, file) => acc + file.size, 0);
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes

    if (totalSize > maxSize) {
      setAlertMessage("Total file size exceeds 100MB limit. Please reduce the file size.");
    } else {
      setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
      setAlertMessage("");
    }
  };

  const handleRateChange = (e) => {
    const value = e.target.value;
    // Regular expression to match positive floating numbers and integers
    const regex = /^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/;

    if (regex.test(value) || value === "") {
      setRatePerHour(value);
      setAlertMessage(""); // Clear any previous alert message
    } else {
      // Set an alert message if the input is not a positive number
      setAlertMessage("Please input numbers.");
    }
  };

  const handleCurriculumChange = (e) => {
    setSelectedCurriculum(e.target.value);
  };
  const handleClassTypeChange = (e) => {
    setSelectedClassType(e.target.value);
    if (e.target.value === "group" || "both") {
      setMaxStudents("");
    }
  };
  const handleMaxStudentsChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setMaxStudents(value.toString());
  };

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  };

  const handleFileClick = (e) => {
    e.preventDefault();
    document.getElementById('qualifications').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("curriculum", selectedCurriculum);
    formData.append("ratePerHour", ratePerHour);
    formData.append("classType", selectedClassType);
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

  React.useEffect(() => {
    document.body.classList.add("sign-up-tutor");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("sign-up-tutor");
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
                        style={{ marginLeft: "20px", backgroundColor: "#F7F0EB", color: "#232D22", borderRadius:"50px" }}
                      >
                        {selectedCurriculum ? selectedCurriculum : "Select Curriculum"}
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
                  <InputGroup className="no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons design_palette" style={{ color: "#232D22" }}></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        caret
                        color="primary"
                        data-toggle="dropdown"
                        id="dropdownMenuButtonClassType"
                        type="button"
                        style={{ marginLeft: "20px", backgroundColor: "#F7F0EB", color: "#232D22", borderRadius:"50px"}}
                      >
                        {selectedClassType ? selectedClassType : "Select Class Type"}
                      </DropdownToggle>
                        <DropdownMenu aria-labelledby="dropdownMenuButtonClassType">
                          <DropdownItem toggle={false}>
                          <input
                            type="radio"
                            name="classType"
                            value="One-to-one"
                            onChange={handleClassTypeChange}
                            checked={selectedClassType === "One-to-one"}
                            style={{ marginRight: "10px" }}
                          />{" "}
                            One-to-one
                          </DropdownItem>
                          <DropdownItem toggle={false}>
                          <input
                            type="radio"
                            name="classType"
                            value="Group"
                            onChange={handleClassTypeChange}
                            checked={selectedClassType === "Group"}
                            style={{ marginRight: "10px" }}
                          />{" "}
                            Group
                          </DropdownItem>
                          <DropdownItem toggle={false}>
                          <input
                            type="radio"
                            name="classType"
                            value="Both"
                            onChange={handleClassTypeChange}
                            checked={selectedClassType === "Both"}
                            style={{ marginRight: "10px" }}
                          />{" "}
                            Both
                          </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    {(selectedClassType === "Group" || selectedClassType === "Both") && (
                      <FormGroup className="ml-3">
                        <Label for="maxStudents">Maximum students per session:</Label>
                          <Input
                            type="number"
                            name="maxStudents"
                            id="maxStudents"
                            placeholder="Enter max students"
                            value={maxStudents}
                            onChange={handleMaxStudentsChange}
                            min="1"
                            style={{color: '#232D22', marginLeft:"20px"}}

                          />
                      </FormGroup>
                    )}
                  </InputGroup>
                  <InputGroup className={"no-border" + (firstFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons business_money-coins" style={{ color: "#232D22" }}></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Your $ Rate/Hour"
                      type="text"
                      value={ratePerHour}
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                      onChange={handleRateChange}
                      style={{ color: "#232D22" }}
                    ></Input>
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
                      accept=".pdf, .doc, .docx, .jpg, .png"
                    />
                    <small className="form-text text-muted">
                      Upload your qualification certificate or other verifying documents here to confirm your eligibility as a tutor (Max 100MB)
                    </small>
                    <Button color="primary" onClick={handleFileClick} style={{borderRadius:"50px"}}>
                      Upload Files
                    </Button>
                    {files.length > 0 && (
                      <div className="mt-2">
                        <p style={{ color: "#fe4632", fontSize: "12px" }}>
                          You have uploaded {files.length} document(s):
                        </p>
                        <ul style={{ listStyleType: "none", padding: 0, color: "#232D22" }}>
                          {files.map((file, index) => (
                            <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "5px", fontSize: "11px" }}>
                              <span style={{ marginRight: "10px" }}>{file.name}</span>
                              <Button
                                close
                                aria-label="Cancel"
                                onClick={(e) => {
                                e.preventDefault();
                                handleRemoveFile(index);
                                }}
                                style={{ color: "#fe4632", fontSize: "12px" }}
                              >
                              <span aria-hidden>&times;</span>
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </FormGroup>
                  {alertMessage && (
                    <Alert color="danger" className="mt-3">
                      {alertMessage}
                    </Alert>
                  )}
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
