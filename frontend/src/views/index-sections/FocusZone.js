import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Badge,
  Container,
  Row,
  Col
} from "reactstrap";

function FocusZone(){
    return(
        <Container style={{marginLeft:'180px'}}>
        <div style={{backGroundColor:'white'}}>
            <div style={{display:'flex', justifyContent:'center'}}>
              <h1 style={{ fontSize: "3rem", color: "#232D22", letterSpacing: "0.01rem", margin: "25px", marginLeft:'7px'}}>Focus Zone</h1>
            </div>
            <Row>
                <Col>
                    <div style={{backgroundColor:'#FCFBBB', height:'150px', width:'100%',borderRadius:'10px'}}>
                        <p>
                            Recommended study spaces - choose one that you found interesting!
                        </p>
                        <Badge
                            pill
                        >
                            Gohere
                        </Badge>
                    </div>
                </Col>
                <Col style={{height:'150px', display:"flex", justifyContent:"flex-end"}}>
                    <div style={{width:'150px', height:'150px', borderRadius:'10px', backgroundColor:'#FFB9B2'}}>
                        Date of the day shows here, google calendar
                    </div>
                </Col>
            </Row>
        </div>
        </Container>

    )


}
export default FocusZone;
