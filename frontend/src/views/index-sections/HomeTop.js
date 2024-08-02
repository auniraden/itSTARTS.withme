import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/diamond.json";
import { useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

function HomeTop() {
  const diamondRef = useRef();

  return (
    <Container fluid className="p-4">
      <Row className="justify-content-center">
        <Col xs={12}>
          <Card className="text-center">
            <CardHeader className="position-relative" style={{ height: '200px' }}>
              <div style={{ width: '150px', height: '150px', position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)' , marginTop:'30px'}}>
                <Lottie
                  lottieRef={diamondRef}
                  animationData={animationData}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="mb-3" style={{display:'flex', justifyContent:'center', alignItems:'center', paddingTop:'50px'}}>
                <img
                  className="rounded"
                  src={require("assets/img/itstarts-logo-final.png")}
                  alt="it starts logo"
                  style={{ maxWidth: "300px" }}
                />
              </div>
            </CardHeader>
            <CardBody>
              <CardTitle tag="h1" className="mb-4" style={{ marginTop:'100px', fontWeight:'bold' }}><span style={{color:'#FE4632'}}>itSTARTS</span> with me ;)</CardTitle>

              <Row className="mb-4 justify-content-center">
                <Col xs={12} md={4} className="mb-3">
                  <div className=" p-3" style={{borderRadius:'20px', backgroundColor:'#FFB9B2', color:'#640900'}}>
                    <h5>With itSTARTS,</h5>
                    <h5>learning is about knowing yourself as much as it is about academic success.</h5>
                  </div>
                </Col>
                <Col xs={12} md={3} className="mb-3">
                  <div className=" p-3" style={{borderRadius:'20px',backgroundColor:'#ECDCD0', color:'#640900'}}>
                    <h5 style={{fontWeight:'bold'}}>Learning Begins With <span style={{color:'#FE4632'}}>You</span>.</h5>
                  </div>
                </Col>
                <Col xs={12} md={4} className="mb-3">
                  <div className=" p-3" style={{borderRadius:'20px', backgroundColor:'#36A895', color:'#232D2E'}}>
                    <h5 style={{fontWeight:'bold'}}>Embark on a journey of</h5>
                  </div>
                </Col>
                <Col xs={12} md={3} className="mb-3">
                  <div className=" p-3" style={{borderRadius:'20px', backgroundColor:'#FCFBBB', color:'#454403'}}>
                    <h5 style={{fontWeight:'bold'}}>Self-discovery</h5>
                  </div>
                </Col>
                <Col xs={12} md={4} className="mb-3">
                  <div className=" p-3" style={{borderRadius:'20px', backgroundColor:'#99B6FF', color:'#075770'}} >
                    <h5 style={{fontWeight:'bold'}}>Learning empowerment</h5>
                  </div>
                </Col>
              </Row>

            </CardBody>
            <CardFooter className="text-muted">
              <Button size="lg" style={{ backgroundColor:'#FE4632', borderRadius:'50px', fontWeight:'bold' }}>Sign up</Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeTop;
