import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const TutorList = () => {
    const [tutors, setTutors] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const subject = searchParams.get('subject');

        // Fetch tutors based on the subject
        fetchTutors(subject);
    }, [location]);

    const fetchTutors = async (subject) => {
        // Replace this with your actual API call
        const response = await fetch(`/api/tutors?subject=${encodeURIComponent(subject)}`);
        const data = await response.json();
        setTutors(data);
    };

    return (
        <div>
            {/* Render your tutor list here */}
            {tutors.map(tutor => (
                <div key={tutor.id}>{tutor.name}</div>
            ))}
        </div>
    );
};

export default TutorList;
