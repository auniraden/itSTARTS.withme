import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, CardBody } from 'reactstrap';
import axios from 'axios';
import ParentsHomeschoolerNavbar from 'components/Navbars/ParentsHomeschoolerNavbar';
import ThisFooterMain from 'components/Footers/ThisFooterMain';

const FindTutor = () => {
    const [tutors, setTutors] = useState([]);

    useEffect(() => {
        // Fetch pending tutors from the backend
        axios.get('http://127.0.0.1:8000/api/pending-tutors')
            .then(response => {
                setTutors(response.data);
            })
            .catch(error => {
                console.error('Error fetching tutors:', error);
            });
    }, []);

    const handleAddTutor = (tutorId) => {
        // Implement the logic to add a tutor
        axios.post(`http://127.0.0.1:8000/api/tutors/${tutorId}/approve`)
            .then(response => {
                // Update the state to reflect the change
                setTutors(tutors.filter(tutor => tutor.id !== tutorId));
            })
            .catch(error => {
                console.error('Error adding tutor:', error);
            });
    };

    return (
        <>
            <ParentsHomeschoolerNavbar />
            <div
                className="section"
                style={{
                    backgroundColor: "#F7F0EB",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    minHeight: "700px",
                    paddingTop: "80px", // Add some padding to push content below navbar
                }}
            >
                <Container className="my-4 p-4 bg-white" style={{ borderRadius: '20px' }}>
                    <h2 className="mb-4" style={{ fontWeight: 'bold' }}>Add tutor</h2>
                    {tutors.map((tutor) => (
                        <Card key={tutor.id} style={{ backgroundColor: '#FFFCDD', borderRadius: '20px', marginBottom: '10px' }}>
                            <CardBody>
                                <Row className="d-flex align-items-center">
                                    <Col xs="1">
                                        <img
                                            className="rounded-circle"
                                            src={tutor.avatar || require("assets/img/logoMoji-2.png")}
                                            alt="tutor avatar"
                                            style={{ width: "40px", height: "40px" }}
                                        />
                                    </Col>
                                    <Col xs="2">{tutor.name}</Col>
                                    <Col xs="2">{tutor.subject}</Col>
                                    <Col xs="2">{tutor.rate}/hours</Col>
                                    <Col xs="2">{tutor.classType}</Col>
                                    <Col xs="2">{tutor.curriculum}</Col>
                                    <Col xs="1">
                                        <Button
                                            style={{
                                                backgroundColor: "#FF6B6B",
                                                border: 'none',
                                                borderRadius: '20px',
                                                padding: '5px 15px',
                                                fontWeight: 'bold'
                                            }}
                                            onClick={() => handleAddTutor(tutor.id)}
                                        >
                                            Add tutor
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    ))}
                </Container>
            </div>
            <ThisFooterMain />
        </>
    );
};

export default FindTutor;
