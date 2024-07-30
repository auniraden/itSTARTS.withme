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
import AddStudentsList from "views/index-sections/AddStudentsList";



function TutorHome() {

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
          <AddStudentsList/>
        </Container>
      <ThisFooterMain/>
    </div>
    </>
  );
}

export default TutorHome;
