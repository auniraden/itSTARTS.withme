import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function EmailVerification() {
    const { userId, token } = useParams();
    const history = useHistory();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await axios.get(`http://127.0.0.1:8000/api/email/verify/${userId}`, { params: { token } });
                // Redirect based on user role or display success message
                history.push('/home'); // Adjust redirection as needed
            } catch (error) {
                // Handle error
                console.error('Verification failed:', error);
                // Optionally redirect to an error page or display a message
                history.push('/verification-failed'); // Example redirect
            }
        };

        verifyEmail();
    }, [userId, token, history]);

    return (
        <div>
            Verifying your email...
        </div>
    );
}

export default EmailVerification;
