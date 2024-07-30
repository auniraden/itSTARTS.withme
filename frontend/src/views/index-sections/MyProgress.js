import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Progress } from "reactstrap";
import ApexCharts from "apexcharts";

function MyProgress() {
    const navigate = useNavigate();
    const [completedTasks, setCompletedTasks] = useState(0); // State for completed tasks
    const [heatMapData, setHeatMapData] = useState([]); // State for heatmap data
    const [date, setDate] = useState("");
    const [currentView, setCurrentView] = useState('today-tasks'); // State to manage current view

    // Simulate fetching progress data from backend
    useEffect(() => {
        const fetchData = async () => {
            // Replace with actual API call
            const response = await fetch('/api/get-progress');
            const data = await response.json();
            setCompletedTasks(data.completedTasks);
        };
        fetchData();

        // Set today's date and day
        const today = new Date();
        const day = today.toLocaleDateString('en-US', { weekday: 'long' });
        const formattedDate = today.toLocaleDateString('en-US');
        setDate(`${day}, ${formattedDate}`);
    }, []);

    const getProgressValue = () => {
        switch (completedTasks) {
            case 1:
                return 30;
            case 2:
                return 70;
            case 3:
                return 100;
            default:
                return 0;
        }
    };

    const handleViewChange = (view) => {
        setCurrentView(view);
    };

    return (
        <Container className="content-wrapper">
            <Row>
                <Col xs="12" md="8">
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>
                        <h1 style={{ fontSize: "3rem", color: "#232D22", letterSpacing: "0.01rem", margin: "25px", marginLeft: '7px' }}>
                            My Progress
                        </h1>
                        <p style={{ marginLeft: '10px' }}>
                            Stay on top of your daily tasks by tracking your achievements here.
                        </p>
                        <div style={{ backgroundColor: 'white', height: '550px', borderRadius: '20px', padding: '20px' }}>
                            <Row className="justify-content-center">
                                <Col xs="12" md="8">
                                    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                                        <Button
                                            onClick={() => handleViewChange('today-tasks')}
                                            active={currentView === 'today-tasks'}
                                            style={{ borderRadius: '50px', backgroundColor: '#FE4632', color: 'white' }}
                                        >
                                            Today's Task
                                        </Button>
                                        <Button
                                            onClick={() => handleViewChange('my-activity')}
                                            style={{ marginLeft: '10px', borderRadius: '50px', backgroundColor: '#ECDCD0', color: '#232D22' }}
                                            active={currentView === 'my-activity'}
                                        >
                                            My Activity
                                        </Button>
                                    </div>
                                    {currentView === 'today-tasks' && (
                                        <div>
                                            <Progress
                                                animated
                                                className="my-2"
                                                value={getProgressValue()}
                                            >
                                                {getProgressValue()}%
                                            </Progress>
                                        </div>
                                    )}
                                    {currentView === 'my-activity' && (
                                        <div>
                                            {/* Add the heatmap for "My Activity" */}
                                            {heatMapData.length > 0 && (
                                                <div>
                                                    <h2>My Activity</h2>
                                                    <ApexCharts
                                                        options={{
                                                            chart: {
                                                                type: 'heatmap',
                                                            },
                                                            title: {
                                                                text: 'User Activity Heatmap',
                                                            },
                                                            dataLabels: {
                                                                enabled: false,
                                                            },
                                                            colors: ['#00A3E0'],
                                                        }}
                                                        series={[
                                                            {
                                                                name: 'Activity',
                                                                data: heatMapData
                                                            }
                                                        ]}
                                                        type="heatmap"
                                                        height={350}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default MyProgress;
