import React from "react";
import {
    Container,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Row,
    Col
} from "reactstrap";

function Highlights() {
    return (
        <Container fluid style={{backgroundColor:'#FFE8E5', padding: '50px 20px', borderRadius:'10px'}}>
            <h2 className="text-left mb-4">Highlights</h2>
            <Row className="justify-content-center">
                <Col xs={12} sm={6} lg={4} className="mb-4">
                    <Card className="h-100" style={{ backgroundColor: '#FF8DC4', border: 'none', borderRadius: '10px' }}>
                        <CardBody>
                            <CardTitle tag="h1">Tailor your learning paths</CardTitle>
                            <CardText style={{ fontSize: '16px' }}>
                                Craft your education with a curriculum that suits your needs. Choose from a variety of learning paths to match your interests and goals.
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={12} sm={6} lg={4} className="mb-4">
                    <Card className="h-100" style={{ backgroundColor: '#E8582D', color:'#ffffff',border: 'none', borderRadius: '10px' }}>
                        <CardBody>
                            <CardTitle tag="h1">Track your progress</CardTitle>
                            <CardText style={{ fontSize: '16px' }}>
                            Monitor your progress, celebrate your accomplishments, and stay inspired. Stay committed to your daily objectives and successfully reach them.
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={12} sm={6} lg={4} className="mb-4">
                    <Card className="h-100" style={{ backgroundColor: '#FBF04C', border: 'none', borderRadius: '10px' }}>
                        <CardBody>
                            <CardTitle tag="h1">Reflect on Your Growth</CardTitle>
                            <CardText style={{ fontSize: '16px' }}>
                            Compose a letter to your future self, highlighting your achievements and personal growth. This reflective exercise allows you to look back on your journey, appreciate your progress, and see how you've navigated the ups and downs to reach where you are today.
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Highlights;
