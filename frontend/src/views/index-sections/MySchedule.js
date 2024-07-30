import React from "react";
import { Container, Row, Col, Button } from "reactstrap";

function MySchedule() {
  const openGoogleCalendar = () => {
    window.open("https://calendar.google.com/calendar/", "_blank");
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 style={{marginTop:'20px'}}>My Schedule</h1>
          <p>
            Manage your schedule with ease. It is recommended to use Google Calendar to view your classes!
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="text-right">
        <Button
                style={{
                  backgroundColor: "#FCFBBB",
                  color: "#232d22",
                  borderRadius: "50px",
                  fontWeight: "bold"
                }}
                onClick={openGoogleCalendar}
              >
                Go to Google Calendar
                <i
                  className="now-ui-icons arrows-1_minimal-right"
                  style={{ color: "#232D22", marginLeft: "5px", fontWeight: "bold" }}
                ></i>
              </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default MySchedule;
