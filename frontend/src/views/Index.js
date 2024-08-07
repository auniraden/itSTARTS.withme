import React from "react";

//reactstrap components
 import {
  Container
} from "reactstrap";

// core components
import LoginNavbar from "components/Navbars/LoginNavbar.js";
//import ThisFooterMain from "components/Footers/ThisFooterMain.js";

// sections for this page
import HomeTop from "./index-sections/HomeTop.js";
import Highlights from "./index-sections/Highlights.js";
import ThisFooterMain from "components/Footers/ThisFooterMain.js";

function Index() {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <LoginNavbar />
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
          <HomeTop/>
          <Highlights/>

          </Container>
        </div>



    </>
  );
}

export default Index;
