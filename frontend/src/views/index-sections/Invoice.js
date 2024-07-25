import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Invoice = () => {
    const { childId } = useParams();
    const [invoice, setInvoice] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the invoice details for the child
        axios.get(`/api/invoice/${childId}`)
            .then(response => setInvoice(response.data))
            .catch(error => console.error('Error fetching invoice:', error));
    }, [childId]);

    const handlePayment = () => {
        // Process the payment via your payment gateway
        axios.post(`/api/payment/${childId}`)
            .then(response => {
                // Handle successful payment
                navigate('/payments');
            })
            .catch(error => console.error('Error processing payment:', error));
    };

    if (!invoice) return <div>Loading...</div>;

    return (
        <Container className="my-4 p-4 bg-white" style={{ borderRadius: '20px' }}>
            <h2 className="mb-2">Invoice</h2>
            <Row>
                <Col>Child Name:</Col>
                <Col>{invoice.childName}</Col>
            </Row>
            <Row>
                <Col>Subject:</Col>
                <Col>{invoice.subject}</Col>
            </Row>
            <Row>
                <Col>Tutor Name:</Col>
                <Col>{invoice.tutorName}</Col>
            </Row>
            <Row>
                <Col>Class Type:</Col>
                <Col>{invoice.classType}</Col>
            </Row>
            <Row>
                <Col>Per Hour Rate:</Col>
                <Col>{invoice.perHourRate}</Col>
            </Row>
            <Row>
                <Col>Total Hours:</Col>
                <Col>{invoice.totalHours}</Col>
            </Row>
            <Row>
                <Col>Total Amount:</Col>
                <Col>{invoice.totalAmount}</Col>
            </Row>
            <Button onClick={handlePayment} style={{ backgroundColor: "#FF6F42", cursor: 'pointer', margin: '20px 0', padding: '10px 15px', borderRadius: '50px', fontWeight: 'bold' }}>
                Pay Now
            </Button>
        </Container>
    );
};

export default Invoice;
