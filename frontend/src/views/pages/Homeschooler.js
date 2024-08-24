import React, { useState, useEffect } from "react";
import axios from "axios";
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

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';


function Homeschooler() {
  const [activeTab, setActiveTab] = useState('playground');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      handleLoginConfirmation(token);
    } else {
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        getUserData();
      }
    }
  }, []);

  const handleLoginConfirmation = async (token) => {
    try {
      localStorage.setItem("accessToken", token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await getUserData();
    } catch (error) {
      console.error("Error confirming login:", error);
    }
  };



  const getUserData = async () => {
    try {
        const response = await axios.get('/api/user');
        console.log('User data:', response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'playground':
        return <Playground/>;
      case 'letsDoThis':
        return <LetsDoThis/>;
      case 'saveResources':
        return <SaveResources/>;
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
