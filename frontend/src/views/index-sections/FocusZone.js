import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Badge } from "reactstrap";

function FocusZone() {
  const [date, setDate] = useState("");

  useEffect(() => {
   // Set today's date and day
   const today = new Date();
   const day = today.toLocaleDateString('en-US', { weekday: 'long' });
   const formattedDate = today.toLocaleDateString('en-US');
   setDate(`${day}, ${formattedDate}`);
  }, []);

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
        <Col md={3} className="text-right" style={{display:'flex', justifyContent:'flex-end'}}>
                    <div style={{backgroundColor:'#FFB9B2', color:'#640900', fontWeight:'bold', borderRadius:'20px', width:'300px', height:'150px', display:'flex', justifyContent:"center", alignItems:'center'}}>
                        <h4>{date}</h4>
                    </div>
                </Col>
      </Row>
    </Container>
  );
}

export default FocusZone;
