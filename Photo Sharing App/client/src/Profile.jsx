import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [userType, setUserType] = useState('');
    const [users, setUsers] = useState([]);
    const [fileCaption, setFileCaption] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [success, setSuccessMsg] = useState('');

    const [showUploadModal, setShowUploadModal] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [images, setImages] = useState([]);

    const handleLogout = () => {
        console.log('User logged out');
        navigate('/login');
    };

    const handleFileCaptionChange = (e) => {
        setFileCaption(e.target.value);
    };

    const handleFileSelection = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedFile(file);
            setPreviewImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
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
            });

            setSuccessMsg(response.data.message);

            const newImage = {
                id: images.length + 1,
                src: response.data.imageUrl,
                alt: `Uploaded by ${username}`,
                caption: fileCaption,
            };

            setImages([...images, newImage]);
            setSelectedFile(null);
            setFileCaption('');
            setPreviewImage(null);
            setShowUploadModal(false);
        } catch (error) {
            setSuccessMsg(error.message);
        }
    };

    const fetchPublicImages = async () => {
        try {
            const response = await axios.get('http://localhost:3000/images');
            console.log(response)
            setImages(response.data.images.map((image, index) => ({
                id: index + 1,
                src: image.url,
                alt: image.text,
                caption: image.text,
                user: image.user
            })));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPrivateImages = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/images/${username}`);
            console.log(response)
            setImages(response.data.images.map((image, index) => ({
                id: index + 1,
                src: image.url,
                alt: image.text,
                caption: image.text,
                user: image.user
            })));
        } catch (error) {
            console.error(error);
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
            console.error("error fetching user");
        }
    }, [location.state]);

    useEffect(() => {
        fetchPublicImages();
    }, []);

    return (
        <>
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
                    />
                </div>
                <h2 className="text-center text-lg font-semibold">{username}</h2>
                <h4 className="text-center">{userType}</h4>
                <button className="bg-slate-400 w-24 p-1 rounded-md font-semibold mt-1">Edit profile</button>
                <button className="bg-slate-400 w-24 p-1 rounded-md font-semibold mt-1" onClick={() => setShowUploadModal(true)}>Add Pin</button>
                <div>
                    <hr className='m-2 font-bold h-0.5 bg-black' />
                    <button className="bg-slate-400 w-20 p-1 rounded-md font-semibold mt-1 mr-1 ml-1" onClick={fetchPublicImages}>Public</button>
                    <button className="bg-slate-400 w-20 p-1 rounded-md font-semibold mt-1 mb-4" onClick={fetchPrivateImages}>Private</button>
                    <div className="mt-1">
                        <div className="flex flex-wrap justify-around items-start mb-12 md:ml-6">
                            {images.map((image) => (
                                <div key={image.id} className="flex flex-col items-center">
                                    <div className="w-52 h-56 m-2 bg-slate-200 rounded-md relative">
                                        <img className="w-full h-full rounded-md object-cover" src={image.src} alt={image.alt} />
                                    </div>
                                    <h3 className="mt-2 px-2 py-1 font-semibold text-[16px]">{image.caption}</h3>
                                    <p className="px-2 py-1 text-[14px] text-gray-500">Posted by: {image.user}</p> {/* Display the username */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {showUploadModal && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded-md">
                            <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
                            <div className="mb-4">
                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleFileSelection}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <input type="hidden" name="username" value={username} />
                            </div>
                            {previewImage && (
                                <div className="w-52 h-56 m-2 bg-slate-200 rounded-md">
                                    <img className="w-full h-full rounded-md object-cover" src={previewImage} alt="Preview" />
                                </div>
                            )}
                            <input
                                type="text"
                                placeholder="Enter caption..."
                                className="border p-2 rounded-md w-full mt-2"
                                value={fileCaption}
                                onChange={handleFileCaptionChange}
                            />
                            <button className="bg-slate-400 w-24 p-1 rounded-md font-semibold mt-2" onClick={handleSubmit}>Upload</button>
                            <button className="bg-red-400 w-24 p-1 rounded-md font-semibold mt-2 ml-2" onClick={() => setShowUploadModal(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Profile;
