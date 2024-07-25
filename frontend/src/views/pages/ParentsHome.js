import React, { useState } from "react";
import {
  Badge,
  Container,
  Row,
  Col
} from "reactstrap";
import ParentsHomeschoolerNavbar from "components/Navbars/ParentsHomeschoolerNavbar";
import Child1 from "views/index-sections/Child1";
import Child2 from "views/index-sections/Child2";
import Child3 from "views/index-sections/Child3";
import Child4 from "views/index-sections/Child4";
import Child5 from "views/index-sections/Child5";
import ParentsViewReport from "views/index-sections/ParentsViewReport";
import FindTutors from "views/index-sections/FindTutors";
import ParentsPaymentList from "views/index-sections/ParentsPaymentList";
import ThisFooterMain from "components/Footers/ThisFooterMain";



function ParentsHome() {
  const [activeTab, setActiveTab] = useState('playground');

  const renderContent = () => {
    switch (activeTab) {
      case 'child1':
        return <Child1 />;
      case 'child2':
        return <Child2 />;
      case 'child3':
        return <Child3/>;
      case 'child4':
        return <Child4/>;
      case 'child5':
        return <Child5/>;
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
              <h1 style={{ fontSize: "4rem", color: "#232D22", letterSpacing: "0.02rem", margin: "25px", marginLeft:'7px'}}>Dashboard</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Badge
                pill
                onClick={() => setActiveTab('child1')}
                style={{
                  backgroundColor: activeTab === 'child1' ? "#FF6F42":"#ECDCD0",
                  cursor: 'pointer',
                  margin: '0 10px',
                  padding: '10px 15px',
                  borderRadius:'50px'
                }}
              >
                Child1name
              </Badge>
              <Badge
                pill
                onClick={() => setActiveTab('child2')}
                style={{
                  backgroundColor: activeTab === 'child2' ? "#519CF2" : "#ECDCD0",
                  cursor: 'pointer',
                  margin: '0 10px',
                  padding: '10px 15px',
                  borderRadius:'50px'
                }}
              >
                Child2name
              </Badge>
              <Badge
                pill
                onClick={() => setActiveTab('child3')}
                style={{
                  backgroundColor: activeTab === 'child3' ? "#FF8DC4" : "#ECDCD0",
                  cursor: 'pointer',
                  margin: '0 10px',
                  padding: '10px 15px',
                  borderRadius:'50px'
                }}
              >
                Child3name
              </Badge>
              <Badge
                pill
                onClick={() => setActiveTab('child4')}
                style={{
                  backgroundColor: activeTab === 'child4' ? "#81C775" : "#ECDCD0",
                  cursor: 'pointer',
                  margin: '0 10px',
                  padding: '10px 15px',
                  borderRadius:'50px'
                }}
              >
                Child4name
              </Badge>
              <Badge
                pill
                onClick={() => setActiveTab('child5')}
                style={{
                  backgroundColor: activeTab === 'child5' ? "#FBF04C" : "#ECDCD0",
                  cursor: 'pointer',
                  margin: '0 10px',
                  padding: '10px 15px',
                  borderRadius:'50px',

                }}
              >
                Child5name
              </Badge>
            </Col>
          </Row>
          <Row style={{marginTop:"20px"}}>
            <Col>
              {renderContent()}
            </Col>
          </Row>
          <ParentsViewReport/>
          <FindTutors/>
          <ParentsPaymentList/>
        </Container>
      <ThisFooterMain/>
    </div>
    </>
  );
}

export default ParentsHome;
