import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
//Function to fetch CSRF token and set up Axios
const setCsrfToken = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/csrf-token');
    axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.token;
    axios.defaults.withCredentials = true; // Include credentials with requests
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
};

function SignUpTutor() {
  const navigate = useNavigate();
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [subjectsFocus, setSubjectsFocus] = React.useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ratePerHour, setRatePerHour] = useState("");
  const [selectedClassType, setSelectedClassType] = useState("");
  const [files, setFiles] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const [maxStudents, setMaxStudents] = useState("");
  const [subjects, setSubjects] = useState("");

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
    setSelectedCurriculum(parseInt(e.target.value, 10));
  };
  const getCurriculumName = (id) => {
    switch (id) {
      case 1: return "SPM";
      case 2: return "Cambridge IGCSE";
      case 3: return "Pearson IGCSE";
      case 4: return "AQA IGCSE";
      default: return "Select Curriculum";
    }
  };

  const classTypeMapping = {
    'One-to-one': 'one_to_one',
    'Group': 'group',
    'Both': 'both'
  };

  const reverseClassTypeMapping = {
    'one_to_one': 'One-to-one',
    'group': 'Group',
    'both': 'Both'
  };
  const handleClassTypeChange = (e) => {
    const uiValue = e.target.value;
    const backendValue = classTypeMapping[uiValue];
    setSelectedClassType(backendValue);
    if (backendValue === "one_to_one") {
      setMaxStudents(""); // Clear max_students when one-to-one is selected
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
    // Client-side validation
    if (!firstName || !lastName || !email || !selectedCurriculum || !ratePerHour || !selectedClassType) {
      setAlertMessage("Please fill in all required fields.");
      return;
    }

    if ((selectedClassType === 'group' || selectedClassType === 'both') && !maxStudents) {
      setAlertMessage("Please enter the maximum number of students for group sessions.");
      return;
    }

    await setCsrfToken(); // Fetch CSRF token before making the POST request

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("curriculum_id", selectedCurriculum);
    formData.append("rate_per_hour", ratePerHour);
    formData.append("subjects", subjects);
    formData.append("class_type", selectedClassType);

    // Only append max_students if the class type is 'group' or 'both'
    if (selectedClassType === 'group' || selectedClassType === 'both') {
      formData.append("max_students", maxStudents);
    }

    files.forEach((file, index) => {
      formData.append(`qualifications[${index}]`, file);
    });

    try {
      const response = await axios.post("/api/register/tutor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
      });

      if (response.status === 200) {
        // Handle successful registration
        navigate('/waiting-approval');
        console.log("Great! You're in!", response.data);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error response data:", error.response.data);
        alert(`Registration failed: ${error.response.data.error || 'Unknown error'}`);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received from the server.");
        alert('No response received from the server.');
      } else {
        // Something else happened
        console.error("Error message:", error.message);
        alert(`Error: ${error.message}`);
      }
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
                        {selectedCurriculum ? getCurriculumName(selectedCurriculum) : "Select Curriculum"}
                      </DropdownToggle>
                      <DropdownMenu aria-labelledby="dropdownMenuButtonC">
                        <DropdownItem toggle={false}>
                          <input
                            type="radio"
                            name="curriculum"
                            value="1"
                            onChange={handleCurriculumChange}
                            checked={selectedCurriculum === "1"}
                            style={{ marginRight: "10px" }}
                          />{" "}
                          Lembaga Peperiksaan Malaysia Sijil Pelajaran Malaysia (SPM)
                        </DropdownItem>
                        <DropdownItem toggle={false}>
                          <input
                            type="radio"
                            name="curriculum"
                            value="2"
                            onChange={handleCurriculumChange}
                            checked={selectedCurriculum === "2"}
                            style={{ marginRight: "10px" }}
                          />{" "}
                          Cambridge Assessment International Education (IGCSE)
                        </DropdownItem>
                        <DropdownItem toggle={false}>
                          <input
                            type="radio"
                            name="curriculum"
                            value="3"
                            onChange={handleCurriculumChange}
                            checked={selectedCurriculum === "3"}
                            style={{ marginRight: "10px" }}
                          />{" "}
                          Pearson Edexcel (IGCSE)
                        </DropdownItem>
                        <DropdownItem toggle={false}>
                          <input
                            type="radio"
                            name="curriculum"
                            value="4"
                            onChange={handleCurriculumChange}
                            checked={selectedCurriculum === "4"}
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
                        {selectedClassType ? reverseClassTypeMapping[selectedClassType] : "Select Class Type"}
                      </DropdownToggle>
                        <DropdownMenu aria-labelledby="dropdownMenuButtonClassType">
                          <DropdownItem toggle={false}>
                          <input
                            type="radio"
                            name="classType"
                            value="One-to-one"
                            onChange={handleClassTypeChange}
                            checked={selectedClassType === "one_to_one"}
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
                            checked={selectedClassType === "group"}
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
                            checked={selectedClassType === "both"}
                            style={{ marginRight: "10px" }}
                          />{" "}
                            Both
                          </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    {(selectedClassType === "group" || selectedClassType === "both") && (
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
                            required
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
                  <InputGroup className={"no-border" + (subjectsFocus ? " input-group-focus" : "")}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons education_agenda-bookmark" style={{ color: "#232D22" }}></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        placeholder="Subjects you'll teach (comma-separated)"
                        type="text"
                        value={subjects}
                        onFocus={() => setSubjectsFocus(true)}
                        onBlur={() => setSubjectsFocus(false)}
                        onChange={(e) => setSubjects(e.target.value)}
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
