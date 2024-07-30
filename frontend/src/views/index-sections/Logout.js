import axios from 'axios';

const Logout = async () => {
    try {
        await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
        await axios.post('http://127.0.0.1:8000/api/logout');
        // Clear user data from local storage or state
        // Redirect to the login page or home page
    } catch (error) {
        console.error('Error logging out:', error);
    }
};

export default Logout;
