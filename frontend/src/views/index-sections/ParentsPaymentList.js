import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
    Card,
    CardBody
} from "reactstrap";

const ParentsPaymentList = () => {
    const [children, setChildren] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of children from the backend
        axios.get('/api/children')
            .then(response => setChildren(response.data))
            .catch(error => console.error('Error fetching children:', error));
    }, []);

    return (
        <Container className="my-4 p-4 bg-white" style={{ borderRadius: '20px' }}>
            <h2 className="mb-2">Payments</h2>
            {children.map((child, index) => (
                <Card key={index} style={{ backgroundColor: '#FCFBBB', borderRadius: '20px', marginTop: '10px' }}>
                    <CardBody style={{ padding: '5px', height: '70px' }}>
                        <Row className="d-flex align-items-center" style={{ marginTop: '5px' }}>
                            <Col className="d-flex justify-content-center">
                                <img
                                    className="rounded"
                                    src={require("assets/img/logoMoji-2.png")}
                                    alt="it starts logo"
                                    style={{ maxWidth: "50px" }}
                                />
                            </Col>
                            <Col className="d-flex justify-content-center">
                                {child.name}
                            </Col>
                            <Col className="d-flex justify-content-center">
                                {child.subject}
                            </Col>
                            <Col className="d-flex justify-content-center">
                                {child.tutor}
                            </Col>
                            <Col className="d-flex justify-content-center">
                                {child.paymentStatus === 'pending' ? (
                                    <Button
                                        onClick={() => navigate(`/invoice/${child.id}`)}
                                        style={{
                                            backgroundColor: "#FF6F42",
                                            cursor: 'pointer',
                                            margin: '0 10px',
                                            padding: '10px 15px',
                                            borderRadius: '50px',
                                            fontWeight: 'bold',
                                            height: '35px'
                                        }}
                                    >
                                        Invoice
                                    </Button>
                                ) : (
                                    <>
                                        <div>{new Date(child.paymentDate).toLocaleDateString()}</div>
                                        <div>Status: Done</div>
                                        <Button
                                            onClick={() => navigate(`/receipt/${child.id}`)}
                                            style={{
                                                backgroundColor: "#28a745",
                                                cursor: 'pointer',
                                                margin: '0 10px',
                                                padding: '10px 15px',
                                                borderRadius: '50px',
                                                fontWeight: 'bold',
                                                height: '35px'
                                            }}
                                        >
                                            Download Receipt
                                        </Button>
                                    </>
                                )}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            ))}
        </Container>
    );
};

export default ParentsPaymentList;
