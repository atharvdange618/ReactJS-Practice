import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ImageGallery from '../ImageGallery/ImageGallery'
import FileUpload from '../FileUpload/FileUpload'
import { Toaster } from 'react-hot-toast';

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [userType, setUserType] = useState('');
    const [showUploadModal, setShowUploadModal] = useState(false); // Define showUploadModal state

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        const { username, userType } = location.state || {};

        if (username && userType) {
            setUsername(username);
            setUserType(userType);
        }
    }, [location.state]);

    return (
        <>
            <Toaster />
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 absolute right-1 top-16"
                onClick={handleLogout}
            >
                Logout
            </button>
            <div className="bg-white p-3 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-4">
                    <img
                        src="https://i.pinimg.com/564x/f4/6f/96/f46f96bb3be87e0aa80e179961b9551d.jpg"
                        className="w-full h-full rounded-full object-cover"
                        alt="Profile"
                    />
                </div>
                <h2 className="text-center text-lg font-semibold">{username}</h2>
                <h4 className="text-center">{userType}</h4>
                <button className="bg-slate-400 w-24 p-1 rounded-md font-semibold mt-1">Edit profile</button>
                <button className="bg-slate-400 w-24 p-1 rounded-md font-semibold mt-1" onClick={() => setShowUploadModal(true)}>Add Pin</button>
                <ImageGallery username={username} />
                {/* Pass showUploadModal and setShowUploadModal as props */}
                <FileUpload username={username} showUploadModal={showUploadModal} setShowUploadModal={setShowUploadModal} />
            </div>
        </>
    );
};

export default Profile;
