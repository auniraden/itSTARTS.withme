import React, { useState } from "react";
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
  Modal
} from "reactstrap";

// Set the base URL for all axios requests
axios.defaults.baseURL = 'http://127.0.0.1:8000';

function StudentClasses() {
  const [modalTooltips, setModalTooltips] = useState(false);

  return (
    <Container fluid>
      <CardGroup>
        <Card className="mb-4" style={{marginRight:'20px', borderRadius:'10px'}}>
          <CardImg
            alt="Class image"
            src={require("assets/img/monogram-me.png")}
            top
            width="100%"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <CardBody>
            <CardTitle tag="h5" style={{fontWeight:'bold'}}>Google Classroom</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted" >
              Get started with your classes by using Google Classroom!
            </CardSubtitle>
            <CardText >
              Keep an eye on your email! Your tutor will soon invite you to join your Google Classroom. Make sure to accept the invitation and stay connected for all your lessons and updates.
            </CardText>
            <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
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
            </div>
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
            <CardTitle tag="h5" style={{fontWeight:'bold'}}>Curriculum Info</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              Stay updated with your curriculum syllabus.
            </CardSubtitle>
            <CardText>
              Stay up-to-date with all the latest updates related to your chosen exam boards, registration dates, and exam updates.
            </CardText>
            <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{
                  backgroundColor: "#FCFBBB",
                  color: "#232d22",
                  borderRadius: "50px",
                  fontWeight: "bold"
                }}
                onClick={() => window.open("_blank")}
              >
                Access now
                <i
                  className="now-ui-icons arrows-1_minimal-right"
                  style={{ color: "#232D22", marginLeft: "5px", fontWeight: "bold" }}
                ></i>
              </Button>
            </div>
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
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              Just 3 goals needed each day!
            </CardSubtitle>
            <CardText>
              Set just 3 goals to achieve each day—small wins lead to big victories!
            </CardText>
            <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
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
                  <p>Textbox here (maximum three items only), then save to database (tasks)</p>
                </div>
                <div className="modal-footer">
                  <Button
                    color="primary"
                    type="button"
                    onClick={() => setModalTooltips(false)}
                  >
                    Save changes
                  </Button>
                </div>
              </Modal>
            </div>
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
            <CardTitle tag="h5" style={{fontWeight:'bold'}}>My Tutors</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              Here is your list of tutors
            </CardSubtitle>
            <CardText>
              Learn more about your tutors by viewing their details here.
            </CardText>
            <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{
                  backgroundColor: "#FCFBBB",
                  color: "#232d22",
                  borderRadius: "50px",
                  fontWeight: "bold"
                }}
                onClick={() => window.open("./my-tutors", "_blank")}
              >
                View my tutors
                <i
                  className="now-ui-icons arrows-1_minimal-right"
                  style={{ color: "#232D22", marginLeft: "5px", fontWeight: "bold" }}
                ></i>
              </Button>
            </div>
          </CardBody>
        </Card>
      </CardGroup>
    </Container>
  );
}

export default StudentClasses;
