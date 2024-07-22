import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Badge,
  Container,
  Row,
  Col
} from "reactstrap";

function MySchedule(){
    return(
        <Container className="content-wrapper">
        <div style={{backGroundColor:'white'}}>
            <div>
              <h1 style={{ fontSize: "3rem", color: "#232D22", letterSpacing: "0.01rem", margin: "25px", marginLeft:'7px'}}>My schedule</h1>
              <p style={{marginLeft:'10px'}}>
              Manage your schedule with ease. View your calendar and set your availability through Google Calendar. Click or tap to open in a new tab and organize your time to suit your needs.
              </p>
            </div>
            <div style={{backgroundColor:'#FCFBBB', height:'550px', borderRadius:'20px'}}>
                <div style={{display:'flex', justifyContent:'center', padding:'15px'}}>
                    Google calendar shows here
                </div>
            </div>
        </div>
        </Container>

    )


}
export default MySchedule;
