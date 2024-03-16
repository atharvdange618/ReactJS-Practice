import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        navigate('/login');
    };

    useEffect(() => {
        const { username, userType } = location.state || {};

        if (!username || !userType) {
            // If username or userType is not present in the state, fetch from API
            const fetchProfileData = async () => {
                try {
                    const response = await axios.get('/api/profile');
                    setUsername(response.data.username);
                    setUserType(response.data.userType);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchProfileData();
        } else {
            // Set username and userType from the state passed from Login
            setUsername(username);
            setUserType(userType);
        }
    }, [location.state]);

    const [username, setUsername] = React.useState('');
    const [userType, setUserType] = React.useState('');

    return (
        <div>
            <div className='text-black'>Welcome to profile {username}!</div>
            <div>User Type: {userType}</div>
            <button className='bg-red-500 rounded-md px-2 py-1 text-white' onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Profile;