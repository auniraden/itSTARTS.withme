import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Badge } from "reactstrap";

function FocusZone() {
  return (
    <Container className="content-wrapper"> {/* Use your template's container class */}
      <h1 className="heading-large text-center">Focus Zone</h1>
      <Row>
        <Col md={9}>
          <div className="card mb-4" style={{backgroundColor:'#FCFBBB', borderRadius:'20px', height:'150px'}}>
            <div className="card-body">
              <p className="card-text" style={{marginLeft:'10px'}}>Recommended study spaces - choose one that you found interesting!</p>
              <div style={{marginTop:'30px'}}>
              <Badge
                pill
                href="https://flocus.com/"
                target='blank'
                style={{
                  backgroundColor: "#FF8DC4",
                  cursor: 'pointer',
                  margin: '0 10px',
                  padding: '10px 15px',
                  borderRadius:'50px'
                }}
              >
                Go to Flocus
              </Badge>
              <Badge
                pill
                href="https://lifeat.io/"
                target='blank'
                style={{
                  backgroundColor: "#519CF2",
                  cursor: 'pointer',
                  margin: '0 10px',
                  padding: '10px 15px',
                  borderRadius:'50px'
                }}
              >
                Go to LifeAt
              </Badge>
              <Badge
                pill
                href="https://imisstheoffice.eu/"
                target='blank'
                style={{
                  backgroundColor: "#E3A8E4",
                  cursor: 'pointer',
                  margin: '0 10px',
                  padding: '10px 15px',
                  borderRadius:'50px'
                }}
              >
                Go to imisstheoffice
              </Badge>
              <Badge
                pill
                href="https://www.lofi.cafe/"
                target='blank'
                style={{
                  backgroundColor:"#D1722D",
                  cursor: 'pointer',
                  margin: '0 10px',
                  padding: '10px 15px',
                  borderRadius:'50px'
                }}
              >
                Go to loficafe
              </Badge>

              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="card text-center" style={{backgroundColor:'#FFB9B2', borderRadius:'20px'}}>
            <div className="card-body">
              <h5 className="card-title">Here</h5>
              <h2 className="card-subtitle mb-2">GG</h2>
              <p className="card-text">Calendar display</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FocusZone;
