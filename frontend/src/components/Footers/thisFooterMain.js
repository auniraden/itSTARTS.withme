import React from "react";
import { Container, Row, Col } from "reactstrap";
import { FaDiscord, FaInstagram, FaThreads, FaTiktok } from "react-icons/fa6";

function ThisFooterMain() {
  console.log("ThisFooterMain component is rendered");
  return (
    <>
    <footer className="footer footer-default" style={{ backgroundColor: '#f8f9fa' }}>
      <Container>
        <Row className="align-items-center">
          <Col md={3}>
            <img src="/path/to/itSTARTS-logo.png" alt="itSTARTS" className="footer-logo" />
          </Col>
          <Col md={3}>
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><a href="#">About</a></li>
              <li><a href="#">Email us</a></li>
              <li><a href="#">Safeguarding policy</a></li>
              <li><a href="#">Terms of use</a></li>
              <li><a href="#">Privacy</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li><a href="#">Blog</a></li>
              <li><a href="#">Book a free trial lesson</a></li>
              <li><a href="#">Sign up as tutor</a></li>
              <li><a href="#">Student Code of Conduct</a></li>
              <li><a href="#">Tutor Code of Conduct</a></li>
            </ul>
          </Col>
          <Col md={3} className="text-right">
            <div className="social-icons">
              <a href="#"><FaDiscord /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaThreads /></a>
              <a href="#"><FaTiktok /></a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-left">
            <p className="copyright">© 2024, itSTARTS</p>
          </Col>
        </Row>
      </Container>
    </footer>
  </>
  );
}


export default ThisFooterMain;
