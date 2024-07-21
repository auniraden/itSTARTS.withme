import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Modal,
    ModalBody,
    ModalFooter } from 'reactstrap';


const StudentTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
    };

    const handleCompleteTask = (taskId) => {
        // Mark task as complete in backend and update state
    };

    const toggleModal = () => setShowModal(!showModal);

    return (
        <div>
            <div className="top-tasks">
                {tasks.slice(0, 3).map(task => (
                    <Card key={task.id}>
                        <CardBody>
                            <CardTitle>{task.title}</CardTitle>
                            <p>Due: {task.dueDate}</p>
                            <Button onClick={() => handleCompleteTask(task.id)}>Complete</Button>
                            <div className="dots">...</div>
                        </CardBody>
                    </Card>
                ))}
                {tasks.length === 0 && <p>Great job! All tasks are done for today!</p>}
            </div>

            <div className="next-up" style={{ display: tasks.length === 0 ? 'block' : 'none' }}>
                <Button onClick={toggleModal}>See Next Up Tasks</Button>
            </div>

            <Modal isOpen={showModal} toggle={toggleModal}>
                <div style={{display:"flex",justifyContent:"center"}}>
                <img
                    className="rounded"
                    src={require("assets/img/shockMe.png")}
                    alt="it starts logo"
                    style={{ maxWidth: "150px" }}
                  />
                </div>
                <ModalBody>
                    You have done so well for today! :') Are you sure you want to see your next tasks??
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleModal}>Yes</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>No</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default StudentTasks;
