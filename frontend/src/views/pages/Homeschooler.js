import React, { useState, useEffect } from "react";
//import axios from "axios";
import {
  Badge,
  Container,
  Row,
  Col
} from "reactstrap";
import ParentsHomeschoolerNavbar from "components/Navbars/ParentsHomeschoolerNavbar";
import LetsDoThis from "views/index-sections/LetsDoThis";
import Playground from "views/index-sections/Playground";
import SaveResources from "views/index-sections/SaveResources";
import MySchedule from "views/index-sections/MySchedule";
import MyProgress from "views/index-sections/MyProgress";
import FocusZone from "views/index-sections/FocusZone";
import ToMeLetter from "views/index-sections/ToMeLetter";
import ThisFooterMain from "components/Footers/ThisFooterMain";


function Homeschooler() {
  const [activeTab, setActiveTab] = useState('playground');


  const renderContent = () => {
    switch (activeTab) {
      case 'playground':
        return <Playground />;
      case 'letsDoThis':
        return <LetsDoThis />;
      case 'saveResources':
        return <SaveResources />;
      default:
        return null;
    }
  };

  return (
    <>
      <ParentsHomeschoolerNavbar />
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
              <h1 style={{ fontSize: "4rem", color: "#232D22", letterSpacing: "0.02rem", margin: "25px", marginLeft: '7px' }}>Dashboard</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Badge
                pill
                onClick={() => setActiveTab('playground')}
                style={{
                  backgroundColor: activeTab === 'playground' ? "#FF6F42" : "#ECDCD0",
                  cursor: 'pointer',
                  margin: '0 10px',
                  padding: '10px 15px',
                  borderRadius: '50px'
                }}
              >
                Playground
              </Badge>
              <Badge
                pill
                onClick={() => setActiveTab('letsDoThis')}
                style={{
                  backgroundColor: activeTab === 'letsDoThis' ? "#519CF2" : "#ECDCD0",
                  cursor: 'pointer',
                  margin: '0 10px',
                  padding: '10px 15px',
                  borderRadius: '50px'
                }}
              >
                Let's do this!
              </Badge>
              <Badge
                pill
                onClick={() => setActiveTab('saveResources')}
                style={{
                  backgroundColor: activeTab === 'saveResources' ? "#FF8DC4" : "#ECDCD0",
                  cursor: 'pointer',
                  margin: '0 10px',
                  padding: '10px 15px',
                  borderRadius: '50px'
                }}
              >
                Save resources
              </Badge>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col>
              {renderContent()}
            </Col>
          </Row>
        </Container>
        <div style={{ backgroundColor: 'white', margin: '12rem', borderRadius: '20px', padding: '50px', marginTop: '2rem', marginBottom: '2rem', paddingTop: '5px' }}>
          <MySchedule />
        </div>
        <div style={{ backgroundColor: 'white', margin: '12rem', borderRadius: '20px', padding: '50px', marginTop: '2rem', marginBottom: '2rem', paddingTop: '5px' }}>
          <MyProgress />
        </div>
        <FocusZone />
        <div style={{ margin: '50px' }}></div>
        <ToMeLetter />
      </div>
      <div>
        <ThisFooterMain />
      </div>
    </>
  );
}

export default Homeschooler;
