import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardSubtitle,
  CardText,
  Container,
  CardGroup,
  Modal,
  CardFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function StudentClasses() {
  const [modalTooltips, setModalTooltips] = useState(false);
  const [curriculum, setCurriculum] = useState(null);
  const [goals, setGoals] = useState(["", "", ""]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const setupAxios = async () => {
    try {
      const response = await axios.get('/csrf-token');
      axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.token;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  useEffect(() => {
    setupAxios();
    axios.get('/api/homeschooler/curriculum')
      .then(response => {
        setCurriculum(response.data);
      })
      .catch(error => {
        console.error("Error fetching the curriculum!", error);
      });

  }, []);

  const handleGoalChange = (index, value) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    setGoals(newGoals);
  };

  const saveGoals = async () => {
    if (goals.filter(goal => goal.trim() !== "").length > 3) {
      setError("Only 3 goals can be made for today!");
      return;
    }

    try {
      const response = await axios.post('/api/goals', { goals });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error saving the goals!', error);
      setError("There was an error saving the goals!");
    }
  };

  return (
    <Container fluid>
      <CardGroup style={{ width: '75rem' }}>
        <Card className="mb-4" style={{ marginRight: '20px', borderRadius: '20px' }}>
          <CardImg
            alt="Class image"
            src={require("assets/img/monogram-me.png")}
            top
            width="100%"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <CardBody>
            <CardTitle tag="h5" style={{ fontWeight: 'bold' }}>Google Classroom</CardTitle>
            <CardSubtitle tag="h6" className="mb-2" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', color: '#D09E79' }}>
              Get started with your classes by using Google Classroom!
            </CardSubtitle>
            <CardText style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', fontSize: '14px' }}>
              Keep an eye on your email! Your tutor will soon invite you to join your Google Classroom. Make sure to accept the invitation and stay connected for all your lessons and updates.
            </CardText>
            <CardFooter className="text-right" style={{ marginTop: "40px" }}>
              <Button
                style={{
                  backgroundColor: "#FCFBBB",
                  color: "#232d22",
                  borderRadius: "50px",
                  fontWeight: "bold"
                }}
                onClick={() => window.open("https://sites.google.com/view/classroom-workspace/", "_blank")}
              >
                Go to Google Classroom
                <i
                  className="now-ui-icons arrows-1_minimal-right"
                  style={{ color: "#232D22", marginLeft: "5px", fontWeight: "bold" }}
                ></i>
              </Button>
            </CardFooter>
          </CardBody>
        </Card>

        <Card className="mb-4" style={{ marginRight: '20px', borderRadius: '10px' }}>
          <CardImg
            alt="Class image"
            src={require("assets/img/monogram-me.png")}
            top
            width="100%"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <CardBody className="d-flex flex-column">
            <CardTitle tag="h5" style={{ fontWeight: 'bold' }}>
              {curriculum ? curriculum.curriculum_name : "Loading..."}
            </CardTitle>
            <CardSubtitle tag="h6" className="mb-2" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', color: '#D09E79' }}>
              Stay updated with your curriculum syllabus.
            </CardSubtitle>
            <CardText style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', fontSize: '14px' }}>
              Stay up-to-date with all the latest updates related to your chosen exam boards, registration dates, and exam updates.
            </CardText>
            <CardFooter className="text-right" style={{ marginTop: "45px" }}>
              <Button
                style={{
                  backgroundColor: "#FCFBBB",
                  color: "#232d22",
                  borderRadius: "50px",
                  fontWeight: "bold"
                }}
                onClick={() => curriculum && curriculum.link && window.open(curriculum.link)}
              >
                Access now
                <i
                  className="now-ui-icons arrows-1_minimal-right"
                  style={{ color: "#232D22", marginLeft: "5px", fontWeight: "bold" }}
                ></i>
              </Button>
            </CardFooter>
          </CardBody>
        </Card>

        <Card className="mb-4" style={{ marginRight: '20px', borderRadius: '10px' }}>
          <CardImg
            alt="Class image"
            src={require("assets/img/monogram-me.png")}
            top
            width="100%"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <CardBody className="d-flex flex-column">
            <CardTitle tag="h5" style={{ fontWeight: 'bold' }}>Create Top 3 Goals</CardTitle>
            <CardSubtitle tag="h6" className="mb-2" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', color: '#D09E79' }}>
              Just 3 goals needed each day!
            </CardSubtitle>
            <CardText style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', fontSize: '14px' }}>
              Set just 3 goals to achieve each day—small wins lead to big victories!
            </CardText>
            <CardFooter className="text-right" style={{ marginTop: "80px" }}>
              <Button
                style={{
                  backgroundColor: "#FCFBBB",
                  color: "#232d22",
                  borderRadius: "50px",
                  fontWeight: "bold"
                }}
                onClick={() => setModalTooltips(true)}
              >
                Create now
                <i
                  className="now-ui-icons arrows-1_minimal-right"
                  style={{ color: "#232D22", marginLeft: "5px", fontWeight: "bold" }}
                ></i>
              </Button>
              <Modal isOpen={modalTooltips} toggle={() => setModalTooltips(false)}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    My top 3 goals for today:
                  </h5>
                  <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={() => setModalTooltips(false)}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Form>
                    {goals.map((goal, index) => (
                      <FormGroup key={index}>
                        <Label for={`goal${index + 1}`}>Goal {index + 1}</Label>
                        <Input
                          type="text"
                          id={`goal${index + 1}`}
                          value={goal}
                          onChange={(e) => handleGoalChange(index, e.target.value)}
                          maxLength={100}
                        />
                      </FormGroup>
                    ))}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                  </Form>
                </div>
                <div className="modal-footer">
                  <Button
                    color="primary"
                    type="button"
                    onClick={saveGoals}
                    style={{ borderRadius: '50px' }}
                  >
                    Save changes
                  </Button>
                </div>
              </Modal>
            </CardFooter>
          </CardBody>
        </Card>
      </CardGroup>
    </Container>
  );
}

export default StudentClasses;
