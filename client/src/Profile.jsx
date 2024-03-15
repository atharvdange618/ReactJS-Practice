import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session token from browser's cookies
        document.cookie = 'session_token=; expires=Thu, 01 Jan 2023 00:00:00 UTC; path=/;';
        // Redirect to the login page
        navigate('/login');
    };

    return (
        <div>
            <div>Welcome to your profile</div>
            <button className='bg-red-500 rounded-md px-2 py-1 text-white' onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;