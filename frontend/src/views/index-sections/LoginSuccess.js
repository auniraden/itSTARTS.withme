import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader } from "reactstrap";


function LoginSuccess() {
    return (
        <>

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
                            <h2 style={{color:'#FE4632', textAlign:'center'}}>Welcome back!</h2>
                            <p>Beep beep, check your email cause we've sent you a link to sign in to your account!</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default LoginSuccess;
