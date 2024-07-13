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
  UncontrolledTooltip
} from "reactstrap";

function SignUpParents() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [childrenCount, setChildrenCount] = useState(0);

  const renderChildInputs = () => {
    let inputs = [];
    for (let i = 0; i < childrenCount; i++) {
      inputs.push(
        <InputGroup key={i} className="no-border mb-2">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="now-ui-icons ui-1_email-85"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder={`itSTARTSwith@yourChild${i + 1}.com`}
            type="email"
          />
        </InputGroup>
      );
    }
    return inputs;
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
                      Choose your preferred exam boards and stay updated on registration dates and exam updates.
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
                    </DropdownToggle>
                  </UncontrolledDropdown>
                </InputGroupAddon>

                {/* New fields for number of children and connecting children's accounts */}
                <InputGroup className="no-border mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_single-02"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="select"
                    onChange={(e) => setChildrenCount(parseInt(e.target.value))}
                  >
                    <option value="0">How many children to sign up?</option>
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </Input>
                </InputGroup>

                {childrenCount > 0 && (
                  <div className="mt-3">
                    <p>Connect with your children:</p>
                    {renderChildInputs()}
                  </div>
                )}
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

export default SignUpParents;
