import React, { useState } from "react";
import {
  Badge,
  Container,
  Row,
  Col
} from "reactstrap";

import TutorGroupClass from "views/index-sections/TutorGroupClass";
import TutorOneToOne from "views/index-sections/TutorOneToOne";
import TutorNavbar from "components/Navbars/TutorNavbar";
import ThisFooterMain from "components/Footers/ThisFooterMain";



function ParentsHome() {
  const [activeTab, setActiveTab] = useState('playground');

  const renderContent = () => {
    switch (activeTab) {
      case 'classes':
        return <TutorGroupClass />;
      case 'oneToOne':
        return <TutorOneToOne />;
      default:
        return null;
    }
  };

  return (
    <>
      <TutorNavbar />
      <div
        className="section"
        style={{
          backgroundColor: "#F7F0EB",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          minHeight: "700px",
        }}
      >
        <Container>
          <Row>
            <Col>
              <h1 style={{ fontSize: "4rem", color: "#232D22", letterSpacing: "0.02rem", margin: "25px", marginLeft:'7px'}}>Dashboard</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Badge
                pill
                onClick={() => setActiveTab('classes')}
                style={{
                  backgroundColor: activeTab === 'classes' ? "#FF6F42":"#ECDCD0",
                  cursor: 'pointer',
                  margin: '0 10px',
                  padding: '10px 15px',
                  borderRadius:'50px'
                }}
              >
                Classes
              </Badge>
              <Badge
                pill
                onClick={() => setActiveTab('oneToOne')}
                style={{
                  backgroundColor: activeTab === 'oneToOne' ? "#FF8DC4" : "#ECDCD0",
                  cursor: 'pointer',
                  margin: '0 10px',
                  padding: '10px 15px',
                  borderRadius:'50px'
                }}
              >
                1-1
              </Badge>
            </Col>
          </Row>
          <Row style={{marginTop:"20px"}}>
            <Col>
              {renderContent()}
            </Col>
          </Row>
        </Container>
      <ThisFooterMain/>
    </div>
    </>
  );
}

export default ParentsHome;
