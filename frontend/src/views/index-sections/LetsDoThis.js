import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Badge,
  Container,
} from "reactstrap";


function LetsDoThis() {
  const scrollRef = useRef(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 100; // Scroll 100px to the right
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 100; // Scroll 100px to the left
    }
  };

  const handleScroll = (event) => {
    const { scrollLeft } = event.target;
    console.log("Scroll position:", scrollLeft);
  };

  return (
    <>
            <div style={{
              backgroundColor: "#519CF2",
              borderRadius: "20px",
              padding: "20px",
              position: "relative"
            }} id="playground">
              {/* Button container */}
              <div style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 1
              }}>
                <Button onClick={scrollLeft} style={{
                  backgroundColor: "white",
                  color: "#232D22",
                  borderRadius: "50px",
                  margin: "5px 5px 0 0",
                  paddingTop: "4px",
                  paddingBottom: "4px"
                }}>
                  <i className="now-ui-icons arrows-1_minimal-left mr-1"></i>
                </Button>
                <Button onClick={scrollRight} style={{
                  backgroundColor: "white",
                  color: "#232D22",
                  borderRadius: "50px",
                  margin: "5px 40px 0 0",
                  paddingTop: "4px",
                  paddingBottom: "4px"
                }}>
                  <i className="now-ui-icons arrows-1_minimal-right mr-1"></i>
                </Button>
              </div>
              {/* Scrollable content */}
              <div
                ref={scrollRef}
                style={{
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  width: "100%",
                  paddingTop: "40px" // To prevent overlap with buttons
                }}
                onScroll={handleScroll}
              >
              </div>
            </div>
        </>

  );
}

export default LetsDoThis;
