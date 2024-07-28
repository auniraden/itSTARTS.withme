import React, { useState } from 'react';
import { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Card, CardBody, CardHeader, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function GoogleSignInPage({onSignInSuccess}) {
  const [modal, setModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    // Check if the user is already signed in with Google
    checkGoogleSignInStatus();
  }, []);

  const toggleModal = () => setModal(!modal);


  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/google/callback', {
        credential: credentialResponse.credential,
      }, {withCredentials:true});
      console.log('Successfully linked Google account:', response.data);
      if (onSignInSuccess && typeof onSignInSuccess === 'function') {
        onSignInSuccess();
      }
    } catch (error) {
        console.error('Error linking Google account:', error);
        setError('An error occurred while linking your Google account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFailure = (error) => {
    console.error('Google Sign-In failed:', error);
    setError('Google Sign-In failed. Please try again.');
  };

  const checkGoogleSignInStatus = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/google/status', { withCredentials: true });
      if (response.data.isSignedIn && onSignInSuccess && typeof onSignInSuccess === 'function') {
        onSignInSuccess();
      }
    } catch (error) {
      console.error('Error checking Google sign-in status:', error);
      setError('Unable to check sign-in status. Please try again later.');
    }
  };

  return (
    <div
      className="section"
      style={{
        backgroundColor: "#F7F0EB",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Card style={{ maxWidth: '600px', width: '100%', borderRadius: '20px', textAlign: 'center' }}>
        <CardHeader>
          <div className="logo-container mb-3">
            <img
              className="rounded"
              src={require("assets/img/itstarts-logo-final.png")}
              alt="it starts logo"
              style={{ maxWidth: "150px" }}
            />
          </div>
        </CardHeader>
        <CardBody>
          <h2 style={{ color: '#FE4632', marginBottom: '20px' }}>Link Your Google Account</h2>
          <p style={{ marginBottom: '30px' }}>Please sign in with your Google account to access all features of our application.</p>
          <GoogleLogin
            clientId={clientId}
            onSuccess={handleSuccess}
            onError={handleFailure}
            shape="pill"
            theme="filled_blue"
            size="large"
          />
        </CardBody>
      </Card>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Important Notice</ModalHeader>
        <ModalBody>
          To fully utilize our application, you must sign in to your Google account. This allows us to integrate with Google Workspace and provide you with the best experience.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>Understood</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default GoogleSignInPage;
