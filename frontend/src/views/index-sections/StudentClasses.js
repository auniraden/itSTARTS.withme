import React, { useState } from "react";
import { useEffect } from "react";
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
  Input
} from "reactstrap";

// Set the base URL for all axios requests
axios.defaults.baseURL = 'http://127.0.0.1:8000';
// Set withCredentials to true if using cookies for authentication
axios.defaults.withCredentials = true;

function StudentClasses() {
  const [modalTooltips, setModalTooltips] = useState(false);
  const [curriculum, setCurriculum] = useState(null);
  const [goals, setGoals] = useState(["", "", ""]);
  const [error, setError] = useState("");
  const [savedGoals, setSavedGoals] = useState([]);


// Fetch and set CSRF token
const setCsrfToken = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie');
    // CSRF token should now be set in cookies automatically
  } catch (error) {
    console.error("Error fetching CSRF token", error);
  }
};

useEffect(() => {
  // // Retrieve the token from local storage or wherever you store it
  // const token = localStorage.getItem('authToken');

  // // Set the Authorization header for axios requests
  // if (token) {
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Fetch user curriculum from the backend
    axios.get('/api/homeschooler/curriculum') // Assuming this endpoint returns the user's curriculum
      .then(response => {
        setCurriculum(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the curriculum!", error);
      });

    // Fetch existing goals from the backend
    axios.get('/api/goals')
      .then(response => {
        setSavedGoals(response.data.goals);
      })
      .catch(error => {
        console.error("There was an error fetching the goals!", error);
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
    const response = await axios.post('http://127.0.0.1:8000/api/goals',
      { goals },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // or wherever your token is stored
        },
        withCredentials: true,
      }
    );
    console.log('Goals saved successfully:', response.data);
  } catch (error) {
    console.error('There was an error saving the goals!', error);
  }
};

const updateProgress = async (index, checked) => {
  const newSavedGoals = [...savedGoals];
  newSavedGoals[index].progress = checked ? 1 : 0;

  // Calculate progress percentage
  const checkedCount = newSavedGoals.filter(goal => goal.progress > 0).length;
  const progressPercentage = checkedCount === 1 ? 30 : (checkedCount === 2 ? 70 : 100);

  try {
    await setCsrfToken();
    await axios.put(`/api/goals/${newSavedGoals[index].id}`, { progress: progressPercentage });
    setSavedGoals(newSavedGoals);
  } catch (error) {
    console.error("There was an error updating the progress!", error);
  }
};
  return (
    <Container fluid>
      <CardGroup style={{width:'75rem'}}>
        <Card className="mb-4" style={{marginRight:'20px', borderRadius:'20px'}}>
          <CardImg
            alt="Class image"
            src={require("assets/img/monogram-me.png")}
            top
            width="100%"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <CardBody>
            <CardTitle tag="h5" style={{fontWeight:'bold'}}>Google Classroom</CardTitle>
            <CardSubtitle tag="h6" className="mb-2" style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'normal', color:'#D09E79'}} >
              Get started with your classes by using Google Classroom!
            </CardSubtitle>
            <CardText style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'normal', fontSize:'14px'}}>
              Keep an eye on your email! Your tutor will soon invite you to join your Google Classroom. Make sure to accept the invitation and stay connected for all your lessons and updates.
            </CardText>
            <CardFooter className="text-right" style={{marginTop:"40px"}}>
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

        <Card className="mb-4" style={{marginRight:'20px' , borderRadius:'10px'}}>
          <CardImg
            alt="Class image"
            src={require("assets/img/monogram-me.png")}
            top
            width="100%"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <CardBody className="d-flex flex-column">
            <CardTitle tag="h5" style={{fontWeight:'bold'}}>
            {/* {curriculum ? curriculum.curriculum_name : "Loading..."} */}
            SPM - Sijil Pelajaran Malaysia
            </CardTitle>
            <CardSubtitle tag="h6" className="mb-2" style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'normal', color:'#D09E79'}}>
              Stay updated with your curriculum syllabus.
            </CardSubtitle>
            <CardText style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'normal', fontSize:'14px'}}>
              Stay up-to-date with all the latest updates related to your chosen exam boards, registration dates, and exam updates.
            </CardText>
            <CardFooter className="text-right" style={{marginTop:"45px"}}>
              <Button
                style={{
                  backgroundColor: "#FCFBBB",
                  color: "#232d22",
                  borderRadius: "50px",
                  fontWeight: "bold"
                }}
                /*() => window.open(curriculum ? curriculum.link : "#"*/
                onClick={() => window.open("https://sppat2.moe.gov.my/cp/spm/cpindex.asp", "_blank")}

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

        <Card className="mb-4" style={{marginRight:'20px' , borderRadius:'10px'}}>
          <CardImg
            alt="Class image"
            src={require("assets/img/monogram-me.png")}
            top
            width="100%"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <CardBody className="d-flex flex-column">
            <CardTitle tag="h5" style={{fontWeight:'bold'}}>Create Top 3 Goals</CardTitle>
            <CardSubtitle tag="h6" className="mb-2" style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'normal', color:'#D09E79'}}>
              Just 3 goals needed each day!
            </CardSubtitle>
            <CardText style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'normal', fontSize:'14px'}}>
              Set just 3 goals to achieve each day—small wins lead to big victories!
            </CardText>
            <CardFooter className="text-right" style={{marginTop:"80px"}}>
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
              </Form>
                </div>
                <div className="modal-footer">
                  <Button
                    color="primary"
                    type="button"
                    onClick={saveGoals}
                    style={{borderRadius:'50px'}}
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
