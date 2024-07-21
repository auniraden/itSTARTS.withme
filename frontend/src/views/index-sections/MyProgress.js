import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Badge,
  Container,
  Row,
  Col,
  Progress
} from "reactstrap";

function MyProgress(){
    return(
        <Container>
        <div style={{backGroundColor:'white'}}>
            <div>
              <h1 style={{ fontSize: "3rem", color: "#232D22", letterSpacing: "0.01rem", margin: "25px", marginLeft:'7px'}}>My progress</h1>
              <p style={{marginLeft:'10px'}}>
              Stay on top of your daily tasks by tracking your achievements. Create new goals effortlessly, review your success overview, and monitor your ongoing goals, all in one place.
              </p>
            </div>
            <div style={{backgroundColor:'white', height:'550px', borderRadius:'20px'}}>
                <div style={{display:'flex', justifyContent:'center', padding:'15px'}}>
                    <Progress
                        animated
                        className="my-2"
                        value="25"
                    >
                        25%
                    </Progress>
                    <Progress
                        animated
                        className="my-2"
                        value={50}
                    >
                        50%
                    </Progress>
                    <Progress
                        animated
                        className="my-2"
                        value={75}
                    >
                        You‘re almost there!
                    </Progress>
                    <Progress
                        animated
                        className="my-2"
                        color="success"
                        value="100"
                    >
                    You did it!
                    </Progress>
                </div>
            </div>
        </div>
        </Container>

    )


}
export default MyProgress;
