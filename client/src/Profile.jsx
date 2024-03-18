import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ImageGallery from './ImageGallery';

function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [userType, setUserType] = useState('');
    const [users, setUsers] = useState([]);
    const [fileCaption, setFileCaption] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [success, setSuccessMsg] = useState("");

    const handleLogout = () => {
        console.log("User logged out");
        navigate('/login');
    };

    const handleFileCaptionChange = (e) => {
        setFileCaption(e.target.value);
    };

    const handleFileSelection = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('fileCaption', fileCaption);
        formData.append('username', username); // Add username to the form data

        try {
            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true // Include cookies with the request
            });

            setSuccessMsg(response.data.message);
            console.log(success); // Log the success message
        } catch (error) {
            console.error('Error uploading file:', error);
        }
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
        <div className="container mx-auto py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4">
                    <h2 className="text-xl font-bold mb-2">Welcome to your profile, {username}!</h2>
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="fileCaption"
                                placeholder="Caption"
                                value={fileCaption}
                                onChange={handleFileCaptionChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="file"
                                name="file"
                                onChange={handleFileSelection}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <input type="hidden" name="username" value={username} />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Upload
                        </button>
                        <h4 className="text-green-500 font-bold mt-2">{success}</h4>
                    </form>
                    {userType === 'admin' && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">List of Users</h2>
                            <ul>
                                {users.map((user) => (
                                    <li key={user._id} className="mb-2">
                                        <span className="font-semibold">Username:</span> {user.username} ({user.userType})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <ImageGallery />
        </div>
    );
}

export default Profile;