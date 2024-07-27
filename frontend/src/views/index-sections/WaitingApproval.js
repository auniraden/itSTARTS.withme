import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import SignupNavbar from "components/Navbars/SignupNavbar";

function WaitingApproval() {
    return (
        <>
            <SignupNavbar />
            <div
                className="section"
                style={{
                    backgroundColor: "#F7F0EB",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Card style={{ maxWidth: '600px', width: '100%', borderRadius:'20px', textAlign:'center' }}>
                    <CardHeader className="text-center">
                        <div className="logo-container mb-3">
                            <img
                                className="rounded"
                                src={require("assets/img/itstarts-logo-final.png")}
                                alt="it starts logo"
                                style={{ maxWidth: "150px" }}
                            />
                        </div>
                    </CardHeader>
                    <CardBody style={{textAlign:'justify'}}>
                        <div>
                            <h2 style={{color:'#FE4632', textAlign:'center'}}>Great! You're almost there!</h2>
                            <p>We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default WaitingApproval;
