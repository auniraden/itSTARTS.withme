import React, { useState } from "react";
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

function SignUpTutor() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [files, setFiles] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const totalSize = uploadedFiles.reduce((acc, file) => acc + file.size, 0);
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes

    if (totalSize > maxSize) {
      setAlertMessage("Total file size exceeds 100MB limit. Please reduce the file size.");
    } else {
      setFiles(uploadedFiles);
      setAlertMessage("");
    }
  };

  return (
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
          <Card className="card-signup" data-background-color="white">
            <Form action="" className="form" method="">
              <div className="col-sm-2">
                <img
                  className="rounded img-raised"
                  src={require("assets/img/itstarts-logo-final.png")}
                  alt="it starts logo"
                />
              </div>
              <CardHeader className="text-center">
                <CardTitle className="title-up" tag="h3">
                  Sign Up
                </CardTitle>
              </CardHeader>
              <CardBody>
                <InputGroup className={"no-border" + (firstFocus ? " input-group-focus" : "")}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Your First Name Here ;)"
                    type="text"
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                  ></Input>
                </InputGroup>
                <InputGroup className={"no-border" + (lastFocus ? " input-group-focus" : "")}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons text_caps-small"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Your Last Name Here ;)"
                    type="text"
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)}
                  ></Input>
                </InputGroup>
                <InputGroup className={"no-border" + (emailFocus ? " input-group-focus" : "")}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons ui-1_email-85"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email..."
                    type="text"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  ></Input>
                </InputGroup>
                <InputGroupAddon addonType="prepend">
                  <UncontrolledDropdown>
                    <p id="right">Curriculum</p>
                    <UncontrolledTooltip
                      placement="right"
                      target="right"
                      delay={0}
                    >
                      Select your expertise based on exam boards to demonstrate your qualification as a tutor.
                    </UncontrolledTooltip>
                    <DropdownToggle
                      aria-expanded={false}
                      aria-haspopup={true}
                      caret
                      color="secondary"
                      data-toggle="dropdown"
                      id="dropdownMenuButton"
                      type="button"
                    >
                      Select an option
                    </DropdownToggle>
                    <DropdownMenu aria-labelledby="dropdownMenuButton">
                      <DropdownItem
                        href="https://sppat2.moe.gov.my/cp/spm/cpindex.asp"
                        target="_blank"
                        onClick={(e) => e.preventDefault()}
                      >
                        Lembaga Peperiksaan Malaysia Sijil Pelajaran Malaysia (SPM)
                      </DropdownItem>
                      <DropdownItem
                        href="https://www.cambridgeinternational.org/"
                        target="_blank"
                        onClick={(e) => e.preventDefault()}
                      >
                        Cambridge Assessment International Education (IGCSE)
                      </DropdownItem>
                      <DropdownItem
                        href="https://qualifications.pearson.com/en/home.html"
                        target="_blank"
                        onClick={(e) => e.preventDefault()}
                      >
                        Pearson Edexcel
                      </DropdownItem>
                      <DropdownItem
                        href="https://www.oxfordaqa.com/subjects/"
                        target="_blank"
                        onClick={(e) => e.preventDefault()}
                      >
                        Oxford AQA
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </InputGroupAddon>
                <FormGroup className="mt-4">
                  <Label for="qualifications"><strong>Qualifications:</strong></Label>
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
                </FormGroup>
                {alertMessage && <Alert color="danger">{alertMessage}</Alert>}
              </CardBody>
              <CardFooter className="text-center">
                <Button
                  className="btn-round"
                  color="primary"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="lg"
                >
                  Sign up
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default SignUpTutor;
