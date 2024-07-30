import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, CardBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddStudentsList = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch pending students from the backend
        axios.get('http://127.0.0.1:8000/api/pending-students')
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    }, []);

    const handleApproveStudent = (studentId) => {
        // Implement the logic to approve a student
        axios.post(`http://127.0.0.1:8000/api/students/${studentId}/approve`)
            .then(response => {
                // Update the state to reflect the change
                setStudents(students.filter(student => student.id !== studentId));
            })
            .catch(error => {
                console.error('Error approving student:', error);
            });
    };

    const handleDeleteStudent = (studentId) => {
        // Implement the logic to delete a student
        axios.delete(`http://127.0.0.1:8000/api/students/${studentId}`)
            .then(response => {
                // Update the state to reflect the change
                setStudents(students.filter(student => student.id !== studentId));
            })
            .catch(error => {
                console.error('Error deleting student:', error);
            });
    };

    return (
        <Container className="my-4 p-4 bg-white" style={{ borderRadius: '20px' }}>
            <h2 className="mb-2">Pending Students</h2>
            {students.map((student) => (
                <Card key={student.id} style={{ backgroundColor: '#FCFBBB', borderRadius: '20px', marginTop: '10px' }}>
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
                                {student.name}
                            </Col>
                            <Col className="d-flex justify-content-center">
                                {student.email}
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <Button
                                    style={{
                                        backgroundColor: "#28a745",
                                        cursor: 'pointer',
                                        margin: '0 10px',
                                        padding: '10px 15px',
                                        borderRadius: '50px',
                                        fontWeight: 'bold',
                                        height: '35px'
                                    }}
                                    onClick={() => handleApproveStudent(student.id)}
                                >
                                    Approve
                                </Button>
                                <Button
                                    style={{
                                        backgroundColor: "#dc3545",
                                        cursor: 'pointer',
                                        margin: '0 10px',
                                        padding: '10px 15px',
                                        borderRadius: '50px',
                                        fontWeight: 'bold',
                                        height: '35px'
                                    }}
                                    onClick={() => handleDeleteStudent(student.id)}
                                >
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            ))}
        </Container>
    );
};

export default AddStudentsList;
