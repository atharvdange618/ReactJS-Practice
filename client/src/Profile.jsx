import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [userType, setUserType] = useState('');
    const [users, setUsers] = useState([]);
    const [fileCaption, setFileCaption] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

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
        formData.append('caption', fileCaption);

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully:', response.data);
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
        <div>
            <div className='text-black'>Welcome to your profile, {username}!</div>
            <br />
            <div>
                <form className='border-2' onSubmit={handleSubmit}>
                    <input type='text' name='fileCaption' placeholder='Caption' value={fileCaption} onChange={handleFileCaptionChange} />
                    <br />
                    <input type='file' name='file' onChange={handleFileSelection} />
                    <br />
                    <input type='text' name='username' readOnly value={username} />
                    <br />
                    <input type='submit' value='Upload' />
                </form>
            </div>
            {userType === 'admin' && (
                <div>
                    <h2>List of Users</h2>
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>
                                Username: {user.username} ({user.userType})
                            </li>
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
