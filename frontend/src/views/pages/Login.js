import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import LoginNavbar from "components/Navbars/LoginNavbar";

function Login() {
  const [emailFocus, setEmailFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  return (
    <>
      <LoginNavbar />
      <div className="section section-signup" style={{ backgroundColor: "#F7F0EB", minHeight: "100vh"}}>
        <div className="content">
        <Container>
          <Row>
            <Card className="card-signup" data-background-color="#F7F0EB">
              <Form className="form">
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
                    Sign In
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <InputGroup
                    className={"no-border input-lg" + (emailFocus ? " input-group-focus" : "")}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons users_circle-08" style={{ color: "#232D22" }}></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Your email address..."
                      type="email"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      style={{ color: "#232D22" }}
                    ></Input>
                  </InputGroup>
                  <div className="text-center mt-4">
                    <Button
                      className="btn-round"
                      color="primary"
                      type="submit"
                      size="lg"
                    >
                      Sign In
                    </Button>
                  </div>
                </CardBody>
                <CardFooter>
                  <Row>
                  <Col xs="10" className="mx-auto">
                    <Row>
                        <Col xs="6" className="text-left">
                        <Link
                            className="link"
                            to="/it-starts-roles"
                            style={{ color: "#232D22" }}
                        >
                            Create Account
                        </Link>
                    </Col>
                    <Col xs="6" className="text-right">
                        <a
                        className="link"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        style={{ color: "#232D22" }}
                        >
                        Need Help?
                      </a>
                    </Col>
                  </Row>
                </Col>
                </Row>
                </CardFooter>
              </Form>
            </Card>
          </Row>
        </Container>
        </div>
      </div>
    </>
  );
}

export default Login;
