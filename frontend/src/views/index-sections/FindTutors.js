import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const subjects = [
    { name: 'English', icon: require('assets/img/english.png') },
    { name: 'Mandarin', icon: require('assets/img/mandarin.png') },
    { name: 'French', icon: require('assets/img/french.png') },
    { name: 'Mathematics', icon: require('assets/img/maths.png') },
    { name: 'Science', icon: require('assets/img/science.png') },
    { name: 'Chemistry', icon: require('assets/img/chemistry.png') },
    { name: 'Physics', icon: require('assets/img/physics.png') },
    { name: 'Biology', icon: require('assets/img/biology.png') },
    { name: 'View all available subjects', icon: require('assets/img/logoMoji-2.png') }
];

const FindTutors = () => {
    const navigate = useNavigate();

    const handleSubjectClick = (subject) => {
        navigate(`/tutors?subject=${encodeURIComponent(subject)}`);
    };

    return (
        <Container className="my-4 p-4 bg-white" style={{borderRadius:'20px'}}>
            <h2 className="mb-2">Find tutors</h2>
            <p className="mb-4">Unlock your child's potential. Connect with top tutors in every subject and elevate their learning experience.</p>
            <Row className="justify-content-center">
                {subjects.map((subject, index) => (
                    <Col key={index} xs={12} sm={6} md={4} className="mb-3">
                        <Button
                            onClick={() => handleSubjectClick(subject.name)}
                            className="w-100 text-center d-flex align-items-center"
                            style={{
                                backgroundColor: '#FCFBBB',
                                borderColor: '#FCFBBB',
                                color: '#232d22',
                                fontSize:'14px',
                                borderRadius: '30px',
                                height: '50px',
                                padding: '0.75rem 1rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <img src={subject.icon} alt={`${subject.name} icon`} className="mr-3" style={{ width: '24px', height: '24px'}} />
                            <span>{subject.name}</span>
                        </Button>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FindTutors;
