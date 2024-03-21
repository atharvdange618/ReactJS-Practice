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
        formData.append('username', username);

        try {
            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            setSuccessMsg(response.data.message);
            // console.log(success); // Log the success message
        } catch (error) {
            setSuccessMsg(error.message);
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
        <>
            {/* logout button */}
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 absolute right-1 top-16"
                onClick={handleLogout}>
                Logout
            </button>
            <h2 className="text-xl font-bold mb-2 mt-4 ml-2">Welcome to your profile, <br />{username}!</h2>
            {/* Photo upload form */}
            <div className="container mx-auto py-8 mt-4 flex">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-4 py-4">
                        <h2 className="text-xl font-bold mb-2">Upload Your First Memory</h2>
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
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Upload
                            </button>
                            <h4 className="text-green-500 font-bold mt-2">{success}</h4>
                        </form>
                    </div>
                </div>
            </div>
            {/* User List Section */}
            <div>
                {userType === 'admin' && (
                    <div className="mt-6 ml-3">
                        <h2 className="text-xl font-semibold mb-2">List of Users</h2>
                        <table className="w-3/5 divide-y divide-gray-200 border-2">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                                        Username
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                                        User Type
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-zinc-500">
                                {users.map((user, index) => (
                                    <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.username}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.userType}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {/* Image Gallery Component */}
            {userType === 'admin' ? (
                <ImageGallery data={{ userType: "admin" }} />
            ) : (
                <ImageGallery data={{ username: username }} />
            )}

        </>
    );
}

export default Profile;
