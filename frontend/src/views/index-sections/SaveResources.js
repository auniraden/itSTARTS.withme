import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Card,
    CardBody,
    Form,
    FormGroup,
    Input,
    Button,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader } from 'reactstrap';


function SaveResources() {
  const [link, setLink] = useState('');
  const [resources, setResources] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [linksToDelete, setLinksToDelete] = useState([]);

//   useEffect(() => {
//     fetchResources();
//   }, []);

//   const fetchResources = async () => {
//     try {
//       const response = await ('/api/resources');
//       setResources(response.data);
//     } catch (error) {
//       console.error('Error fetching resources:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!link) return;

//     try {
//       await ('/api/resources', { link });
//       setLink('');
//       fetchResources(); // Refresh the list after saving
//       setIsEditing(false); // Exit edit mode after saving
//     } catch (error) {
//       console.error('Error saving resource:', error);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async () => {
//     // Logic to update the list of resources, if needed
//     setIsEditing(false);
//     setSelectedLinks([]);
//   };

//   const handleDelete = async () => {
//     try {
//       await Promise.all(linksToDelete.map(id =>(`/api/resources/${id}`)));
//       //fetchResources(); // Refresh the list after deletion
//       setLinksToDelete([]);
//       setModalOpen(false);
//     } catch (error) {
//       console.error('Error deleting resources:', error);
//     }
//   };

//   const toggleModal = () => {
//     setModalOpen(!modalOpen);
//   };

//   const handleCheckboxChange = (e, id) => {
//     if (e.target.checked) {
//       setSelectedLinks([...selectedLinks, id]);
//     } else {
//       setSelectedLinks(selectedLinks.filter(linkId => linkId !== id));
//     }
//   };

//   const handleBulkDelete = () => {
//     setLinksToDelete(selectedLinks);
//     toggleModal();
//   };

  return (
    <Container fluid>
      <Card style={{ backgroundColor: '#FF8DC4', borderRadius: '20px', marginTop: '20px' }}>
        <CardBody>
          <h5 style={{ color: '#232D22', marginTop: '2px', fontWeight: 'bold' }}>
            Paste any useful resources here for you to check out and revise later on!
          </h5>
          <Form>
            <FormGroup>
              <Input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter a useful link here"
                required
                style={{ height: '100px', marginBottom: '10px', backgroundColor: 'white' }}
                disabled={!isEditing}
              />
            </FormGroup>
            {isEditing ? (
              <div>
                <Button
                  style={{ borderRadius: '20px', float: 'right', backgroundColor: "#FCFBBB", color: "#232D22", fontWeight: 'bold' }}
                //   onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  style={{ borderRadius: '20px', float: 'right', marginRight: '10px', backgroundColor: "#FCFBBB", color: "#232D22", fontWeight: 'bold' }}
                //   onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  style={{ borderRadius: '20px', float: 'right', marginRight: '10px', backgroundColor: "#FCFBBB", color: "#232D22", fontWeight: 'bold' }}
                //   onClick={handleBulkDelete}
                >
                  Delete
                </Button>
              </div>
            ) : (
              <Button
                style={{ borderRadius: '20px', float: 'right', backgroundColor: "#FCFBBB", color: "#232D22", fontWeight: 'bold' }}
                // onClick={handleEdit}
              >
                Paste Links
              </Button>
            )}
          </Form>
        </CardBody>
      </Card>
      <ListGroup style={{ marginTop: '20px' }}>
        {resources.map((resource) => (
          <ListGroupItem key={resource.id}>
            {isEditing && (
              <Input
                type="checkbox"
                checked={selectedLinks.includes(resource.id)}
                // onChange={(e) => handleCheckboxChange(e, resource.id)}
                style={{ marginRight: '10px' }}
              />
            )}
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              {resource.link}
            </a>
          </ListGroupItem>
        ))}
      </ListGroup>

      {/* <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirm Deletion</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the selected link(s)? You will not be able to restore them.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDelete}>Yes</Button>
          <Button color="secondary" onClick={toggleModal}>No</Button>
        </ModalFooter>
      </Modal> */}
    </Container>
  );
}


export default SaveResources;
