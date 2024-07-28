import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  Progress
} from "reactstrap";
// import Chart from "react-apexcharts";
import axios from "axios";

const ParentsViewReport = () => {
    const [heatmapData, setHeatmapData] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [date, setDate] = useState("");
    const [taskProgress, setTaskProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
    // Fetch heatmap data and tasks for the day from the backend
     axios.get('/api/child-progress')
        .then(response => {
            setHeatmapData(response.data.heatmap);
            setTasks(response.data.tasks);

         // Calculate the task progress
            const completedTasks = response.data.tasks.filter(task => task.completed).length;
            const totalTasks = response.data.tasks.length;
            const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
            setTaskProgress(progress);
    })
     .catch(error => console.error('Error fetching progress data:', error));


        // Set today's date and day
        const today = new Date();
        const day = today.toLocaleDateString('en-US', { weekday: 'long' });
        const formattedDate = today.toLocaleDateString('en-US');
        setDate(`${day}, ${formattedDate}`);
    }, []);

    // const heatmapOptions = {
    //     chart: {
    //         height: 350,
    //         type: 'heatmap',
    //     },
    //     plotOptions: {
    //         heatmap: {
    //             shadeIntensity: 0.5,
    //             colorScale: {
    //                 ranges: [
    //                     {
    //                         from: 0,
    //                         to: 10,
    //                         color: '#FDD4CF',
    //                         name: '0-10 mins'
    //                     },
    //                     {
    //                         from: 11,
    //                         to: 20,
    //                         color: '#FFADA4',
    //                         name: '11-20 mins'
    //                     },
    //                     {
    //                         from: 21,
    //                         to: 30,
    //                         color: '#FF7A6C',
    //                         name: '21-30 mins'
    //                     },
    //                     {
    //                         from: 31,
    //                         to: 40,
    //                         color: '#FE4632',
    //                         name: '31-40 mins'
    //                     }
    //                 ]
    //             }
    //         }
    //     },
    //     dataLabels: {
    //         enabled: false
    //     },
    //     title: {
    //         text: 'Engagement Time Heatmap'
    //     }
    // };

    return (
        <Container className="content-wrapper" style={{backgroundColor:'white', borderRadius:'20px', marginTop:'50px', padding: '20px'}}>
            <Row>
                <Col>
                    <h1 style={{ fontSize: "3rem", color: "#232D22", letterSpacing: "0.01rem" }}>Progress Report</h1>
                    <p style={{textAlign:'justify'}}>
                        Track your child's academic achievements and milestones through detailed charts and reports. Stay informed and engaged with their educational progress.
                    </p>
                </Col>
                <Col className="text-right" style={{display:'flex', justifyContent:'flex-end'}}>
                    <div style={{backgroundColor:'#FFB9B2', color:'#640900', fontWeight:'bold', borderRadius:'20px', width:'300px', height:'100px', display:'flex', justifyContent:"center"}}>
                        <h4>{date}</h4>
                    </div>
                </Col>
            </Row>
            <div style={{backgroundColor:'white', borderRadius:'20px', padding: '20px'}}>
                {/* <Chart
                    options={heatmapOptions}
                    series={heatmapData}
                    type="heatmap"
                    height={350}
                /> */}
            </div>
            <div style={{marginTop: '20px'}}>
                <h7 style={{marginLeft:'30px', fontWeight:'bold'}}>Tasks Completed Today</h7>
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index}>{task.title}</li>
                    ))}
                </ul>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <Progress animated className="my-2" value={taskProgress}>{taskProgress}%</Progress>
            </div>
            <div className="text-right" style={{marginTop: '20px'}}>
                <Button
                    style={{
                      backgroundColor: "#FCFBBB",
                      color: "#232d22",
                      borderRadius: "50px",
                      fontWeight: "bold"
                    }}
                    onClick={() => {/* Handle class navigation */}}
                  >
                    Chat with tutor
                    <i
                      className="now-ui-icons arrows-1_minimal-right"
                      style={{ color: "#232D22", marginLeft: "5px", fontWeight: "bold" }}
                    ></i>
                </Button>
            </div>
        </Container>
    );
};

export default ParentsViewReport;
