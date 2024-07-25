import React, { useState } from "react";
import axios from "axios";
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

function SignUpParents() {
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const [numberOfKids, setNumberOfKids] = useState(0);
  const [parentDetails, setParentDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [kidEmails, setKidEmails] = useState([]);

  const handleCurriculumChange = (e) => {
    setSelectedCurriculum(e.target.value);
  };

  const handleNumberOfKidsChange = (e) => {
    setNumberOfKids(Number(e.target.value));
    setKidEmails(new Array(Number(e.target.value)).fill(""));
  };

  const handleParentDetailChange = (e) => {
    const { name, value } = e.target;
    setParentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleKidEmailChange = (index, e) => {
    const newKidEmails = [...kidEmails];
    newKidEmails[index] = e.target.value;
    setKidEmails(newKidEmails);
  };

  const renderKidEmailInputs = () => {
    const inputs = [];
    for (let i = 1; i <= numberOfKids; i++) {
      inputs.push(
        <InputGroup className="no-border" key={i}>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="now-ui-icons ui-1_email-85" style={{ color: "#232D22" }}></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder={`My kid ${i}'s email address`}
            type="email"
            style={{ color: "#232D22" }}
            value={kidEmails[i]}
            onChange={(e) => handleKidEmailChange(i, e)}
          ></Input>
        </InputGroup>
      );
    }
    return inputs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure CSRF token is set
      await setCsrfToken();

      // Make the POST request with CSRF token included
      const response = await axios.post('/api/register/parent', {
        ...parentDetails,
        selectedCurriculum,
        kidEmails,
      });
      console.log("Great! You're in!", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received from the server.");
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  React.useEffect(() => {
    document.body.classList.add("sign-up-parents");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("sign-up-parents");
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
          minHeight: "700px",
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
                      name="firstName"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                      style={{ color: "#232D22" }}
                      value={parentDetails.firstName}
                      onChange={handleParentDetailChange}
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
                      name="lastName"
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                      style={{ color: "#232D22" }}
                      value={parentDetails.lastName}
                      onChange={handleParentDetailChange}
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
                      name="email"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      style={{ color: "#232D22" }}
                      value={parentDetails.email}
                      onChange={handleParentDetailChange}
                    ></Input>
                  </InputGroup>
                  <InputGroup className="no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons education_hat" style={{ color: "#232D22" }}></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <UncontrolledTooltip placement="right" target="dropdownMenuButtonC" delay={0}>
                      Choose your preferred exam boards and stay updated on registration dates and
                      exam updates.
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
                  <InputGroup className="no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons business_badge" style={{ color: "#232D22" }}></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <UncontrolledTooltip placement="right" target="dropdownMenuButtonK" delay={0}>
                      Choose up to five kids to enhance your connection with each of your kid.
                    </UncontrolledTooltip>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        aria-expanded={false}
                        aria-haspopup={true}
                        caret
                        color="primary"
                        data-toggle="dropdown"
                        id="dropdownMenuButtonK"
                        type="button"
                        style={{ marginLeft: "20px", backgroundColor: "#F7F0EB", color: "#232D22" }}
                      >
                        My Kids
                      </DropdownToggle>
                      <DropdownMenu aria-labelledby="dropdownMenuButton">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <DropdownItem toggle={false} key={num}>
                            <input
                              type="radio"
                              name="numberOfKids"
                              value={num}
                              onChange={handleNumberOfKidsChange}
                              checked={numberOfKids === num}
                              style={{ marginRight: "10px" }}
                            />{" "}
                            {num}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </InputGroup>
                  {renderKidEmailInputs()}
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

export default SignUpParents;
