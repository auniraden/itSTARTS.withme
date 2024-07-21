import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Badge,
  Container,
  Row,
  Col
} from "reactstrap";

function ToMeLetter(){
    return(
        <Container style={{marginLeft:'180px'}}>
        <div style={{backGroundColor:'white'}}>
            <div style={{display:'flex', justifyContent:'center'}}>
              <h1 style={{ fontSize: "3rem", color: "#232D22", letterSpacing: "0.01rem", margin: "25px", marginLeft:'7px'}}>Dear future me, today I...</h1>
            </div>
            <div style={{backgroundColor:'white', height:'550px', borderRadius:'20px'}}>
                <div>
                    <formData>
                        <input type="text" placeholder="Hey, so today I..." style={{color:'#232D22', }}>
                        </input>
                    </formData>
                </div>
            </div>
        </div>
        </Container>

    )


}
export default ToMeLetter;
