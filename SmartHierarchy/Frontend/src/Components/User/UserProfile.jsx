import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast, Toaster } from 'react-hot-toast'

const UserProfile = () => {
    const [isEditProfileOpen, setEditProfileOpen] = useState(false);
    const [isAddUserOpen, setAddUserOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [usertype, setUsertype] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { username, usertype, imageUrl } = location.state || {};
        setUsername(username);
        setUsertype(usertype);
        setImageUrl(imageUrl);
    }, [location.state]);

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/login');
        toast.success("Successfully logged out")
    };

    const handleEditProfile = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        if (password && password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        fetch('/api/auth/user/edit', {
            method: 'PATCH',
            credentials: 'same-origin',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    toast.success('Profile updated successfully');
                    window.location.reload();
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message);
                    });
                }
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                toast.error('Failed to update profile');
            });
    };

    const handleAddUser = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('addedByUsername', username);

        fetch('/api/auth/user/addNewUser', {
            method: 'POST',
            body: formData,
            credentials: 'same-origin',
        })
            .then(response => {
                if (response.ok) {
                    toast.success('User registered successfully');
                    window.location.reload();
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message);
                    });
                }
            })
            .catch(error => {
                console.error('Error registering user:', error);
                toast.error('Failed to register user');
            });
    };

    return (
        <div className="container bg-white rounded-lg p-5 shadow-md w-96 max-w-full text-center">
            <Toaster />
            <h1 className="mb-3">{username}</h1>
            <h3 className="mb-3">{usertype}</h3>
            <img src={imageUrl} alt="Profile Picture" className="rounded-full w-24 h-24 mx-auto mb-5" />
            <button onClick={() => setEditProfileOpen(true)} className="bg-blue-500 text-white rounded-md py-2 px-5 cursor-pointer mt-5">Edit Profile</button>
            <button onClick={handleLogout} className="bg-blue-500 text-white rounded-md py-2 px-5 cursor-pointer mt-5">Logout</button>
            <button onClick={() => setAddUserOpen(true)} className="bg-blue-500 text-white rounded-md py-2 px-5 cursor-pointer mt-5">Add New User</button>

            {/* Edit Profile Modal */}
            {isEditProfileOpen && (
                <div className="modal flex fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-content bg-white rounded-lg p-5 w-4/5 max-w-lg">
                        <span className="close float-right text-2xl font-bold cursor-pointer" onClick={() => setEditProfileOpen(false)}>&times;</span>
                        <form onSubmit={handleEditProfile} className="mt-5">
                            <div className="mb-3">
                                <label htmlFor="name" className="block mb-1">Name:</label>
                                <input type="text" id="name" name="name" defaultValue={username} className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="block mb-1">Email:</label>
                                <input type="email" id="email" name="email" className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="block mb-1">Address:</label>
                                <input type="text" id="address" name="address" className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="profilepic" className="block mb-1">Profile Picture:</label>
                                <input type="file" id="profilepic" name="profilepic" accept="image/*" className="w-full p-2 border rounded-md" />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2 cursor-pointer">Update Profile</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Add User Modal */}
            {isAddUserOpen && (
                <div className="modal flex fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-content bg-white rounded-lg p-5 w-4/5 max-w-lg">
                        <span className="close float-right text-2xl font-bold cursor-pointer" onClick={() => setAddUserOpen(false)}>&times;</span>
                        <form onSubmit={handleAddUser} className="mt-5">
                            <div className="mb-3">
                                <label htmlFor="newUsername" className="block mb-1">Username:</label>
                                <input type="text" id="newUsername" name="newUsername" required className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newName" className="block mb-1">Name:</label>
                                <input type="text" id="newName" name="newName" required className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newPassword" className="block mb-1">Password:</label>
                                <input type="password" id="newPassword" name="newPassword" required className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newEmail" className="block mb-1">Email:</label>
                                <input type="email" id="newEmail" name="newEmail" required className="w-full p-2 border rounded-md" />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2 cursor-pointer">Register User</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
