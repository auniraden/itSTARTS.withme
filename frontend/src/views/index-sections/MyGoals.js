import React, { useState, useEffect} from 'react';
import axios from "axios";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Button } from 'reactstrap';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;


axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';
const MyGoals = () => {
  const [goals, setGoals] = useState([]);

  const getCsrfToken = async () => {
    try {
      await axios.get('/sanctum/csrf-cookie'); // Fetch CSRF token
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  useEffect(() =>{
    const fetchGoals = async () =>{
      try{
        const token = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get('/api/myGoals');
        setGoals(response.data);
      }catch (error){
        console.error('Error fetching goals:', error);
      }
    }
    fetchGoals();
  }, []);

  const toggleDone = async (id)  => {
    try {
        await getCsrfToken();
        const token = localStorage.getItem("accessToken");
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await axios.delete(`/api/deleteGoal/${id}`);

        setGoals(goals.filter(goal => goal.id !== id));
    } catch (error) {
        console.error('Error deleting goal:', error);
    }
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Top 3 to-do today</h2>
      <Row>
        {goals.map((goal) => (
          <Col key={goal.id} md={4} className="mb-3">
            <Card className="h-100" style={{borderRadius:'20px', height: '100px', position: 'relative', overflow: 'visible'}}>
              <CardBody className="d-flex align-items-start">
              <div>{goal.goal_name}</div>
              <Button
                  style={{
                    backgroundColor: "#FCFBBB",
                    color: "#232d22",
                    borderRadius: "50px",
                    marginBottom:"20px",
                    fontWeight: "bold",
                    position: 'absolute',
                    bottom: '-10px',
                    right: '10px',
                    zIndex: 1
                  }}
                  onClick={() => toggleDone(goal.id)}
                  disabled={goal.done}
                >
                  Done
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyGoals;
