import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import LoginNavbar from "components/Navbars/LoginNavbar";
axios.defaults.baseURL = 'http://localhost:8000';

//Function to fetch CSRF token and set up Axios
const setCsrfToken = async () => {
  try {
    const response = await axios.get('/sanctum/csrf-cookie');
    axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.token;
    axios.defaults.withCredentials = true; // Include credentials with requests
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
};

function Login() {
  const [email, setEmail] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        await setCsrfToken();
        const response = await axios.post('/api/login', { email } );
        // Handle successful registration
        navigate('/login-success');
        setMessage('Please check your email for the login link.', response.data);
    } catch (error) {
        console.error('Error sending login link:', error.response.data);
        if (error.response && error.response.status === 401) {
            alert("Invalid email address. Please try again. If you don\'t receive an email, please check your spam folder or contact support.");
        } else if (error.response && error.response.status === 500) {
          alert('Server error. Please try again later or contact support if the issue persists.');
      } else {
          alert('There was an error sending the login link. Please try again. If the problem continues, please contact support.');
      }
    }
    finally {
      setLoading(false); // Set loading to false when the request finishes
  }
};

  return (
    <>
      <LoginNavbar />
      <div className="section section-signup" style={{ backgroundColor: "#F7F0EB", minHeight: "100vh" }}>
        <div className="content">
          <Container>
            <Row>
              <Card className="card-signup" data-background-color="#F7F0EB">
                <Form className="form" onSubmit={handleSubmit}>
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
                        value={email}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ color: "#232D22" }}
                        required
                      />
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
                    {message && <div className="text-center mt-3">{message}</div>}
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
