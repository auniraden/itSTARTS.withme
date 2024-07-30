import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { FaDiscord, FaInstagram, FaThreads, FaTiktok } from "react-icons/fa6";

function ThisFooterMain() {
  useEffect(() => {
    const links = document.querySelectorAll('.footer-link');

    const handleMouseOver = (event) => {
      event.target.style.color = '#FE4632';
    };

    const handleMouseOut = (event) => {
      event.target.style.color = ''; // Reset to default
    };

    links.forEach(link => {
      link.addEventListener('mouseover', handleMouseOver);
      link.addEventListener('mouseout', handleMouseOut);
    });

    // Cleanup function
    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseover', handleMouseOver);
        link.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);

  return (
    <footer className="footer footer-default" style={{ backgroundColor: '#ffffff', padding: '40px 0' }}>
      <Container>
        <Row>
          <Col md={3}>
            <img src={require("assets/img/complete_logo.png")} alt="itSTARTS" style={{ maxWidth: '150px', marginBottom: '20px' }} />
          </Col>
          <Col md={3}></Col>
          <Col md={2}></Col>
          <Col md={3}>
            <h5>Company</h5>
            <ul style={{ marginRight: '70px' }}>
              <li><a href="#" className="footer-link d-block mb-2">Email us</a></li>
              <li><a href="#" className="footer-link d-block mb-2">Safeguarding policy</a></li>
              <li><a href="#" className="footer-link d-block mb-2">Terms of use</a></li>
              <li><a href="#" className="footer-link d-block ">Privacy</a></li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-left">
            <p className="text-muted">© 2024, itSTARTS</p>
          </Col>
          <Col md={3} className="text-right">
            <div className="social-icons" style={{ fontSize: '24px', color: '#FE4632' }}>
              <a href="#pablo" className="mr-3"><FaDiscord /></a>
              <a href="#pablo" className="mr-3"><FaInstagram /></a>
              <a href="#pablo" className="mr-3"><FaThreads /></a>
              <a href="#pablo"><FaTiktok /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default ThisFooterMain;
