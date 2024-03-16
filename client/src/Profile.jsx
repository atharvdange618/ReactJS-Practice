import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ data }) {
    console.log(data);
    if (!data) return null; // Handle the case where data is not available yet

    const { userData, userType } = data; // Destructure userData and userType from data prop
    const navigate = useNavigate();

    const handleLogout = () => {
        // Redirect to the login page
        navigate('/login');
    };

    return (
        <div>
            <div className='text-black'>Welcome to profile {userData}!</div>
            <div>User Type: {userType}</div>
            <button className='bg-red-500 rounded-md px-2 py-1 text-white' onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;
