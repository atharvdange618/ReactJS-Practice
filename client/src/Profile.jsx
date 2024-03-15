import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        // Clear session token from browser's cookies
        localStorage.removeItem('username');
        // Redirect to the login page
        navigate('/login');
    };

    return (
        <div>
            <div>Welcome to your profile, {username}</div>
            <button className='bg-red-500 rounded-md px-2 py-1 text-white' onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;
