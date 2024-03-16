import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [userType, setUserType] = useState('');
    const [users, setUsers] = useState([]);

    const handleLogout = () => {
        console.log("User logged out");
        navigate('/login');
    };

    useEffect(() => {
        const { username, userType, users } = location.state || {};

        if (username && userType) {
            setUsername(username);
            setUserType(userType);
            if (users) {
                setUsers(users);
            }
        } else {
            const fetchProfileData = async () => {
                try {
                    const response = await axios.get('/api/profile');
                    setUsername(response.data.username);
                    setUserType(response.data.userType);
                    if (response.data.users) {
                        setUsers(response.data.users);
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            fetchProfileData();
        }
    }, [location.state]);

    return (
        <div>
            <div className='text-black'>Welcome to profile {username}!</div>
            <div>User Type: {userType}</div>
            {userType === 'admin' && (
                <div>
                    <h2>List of Users</h2>
                    <ul>
                        {users.map((user) => (
                            <li key={user._id}>{user.username} ({user.userType})</li>
                        ))}
                    </ul>
                </div>
            )}
            <button className='bg-red-500 rounded-md px-2 py-1 text-white' onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Profile;