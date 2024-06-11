// src/components/UserProfile.jsx
import React, { useState } from 'react';

const UserProfile = ({ userData }) => {
    const [isEditProfileOpen, setEditProfileOpen] = useState(false);
    const [isAddUserOpen, setAddUserOpen] = useState(false);

    const handleLogout = () => {
        fetch('/auth/logout', {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                } else {
                    console.error('Logout failed:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Logout failed:', error);
            });
    };

    const handleEditProfile = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        if (password && password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        fetch('/auth/user/edit', {
            method: 'PATCH',
            credentials: 'same-origin',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    alert('Profile updated successfully');
                    window.location.reload();
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message);
                    });
                }
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                alert('Failed to update profile: ' + error.message);
            });
    };

    const handleAddUser = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        fetch('/auth/user/addNewUser', {
            method: 'POST',
            body: formData,
            credentials: 'same-origin',
        })
            .then(response => {
                if (response.ok) {
                    alert('User registered successfully');
                    window.location.reload();
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message);
                    });
                }
            })
            .catch(error => {
                console.error('Error registering user:', error);
                alert('Failed to register user: ' + error.message);
            });
    };

    return (
        <div className="container bg-white rounded-lg p-5 shadow-md w-96 max-w-full text-center">
            <h1 className="mb-3">{userData.username}</h1>
            <h3 className="mb-3">{userData.usertype}</h3>
            <img src={userData.imageUrl} alt="Profile Picture" className="rounded-full w-24 h-24 mx-auto mb-5" />
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
                                <input type="text" id="name" name="name" defaultValue={userData.name} className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="block mb-1">Email:</label>
                                <input type="email" id="email" name="email" defaultValue={userData.email} className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="block mb-1">Address:</label>
                                <input type="text" id="address" name="address" defaultValue={userData.address} className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="profilepic" className="block mb-1">Profile Picture:</label>
                                <input type="file" id="profilepic" name="profilepic" accept="image/*" className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="block mb-1">New Password:</label>
                                <input type="password" id="password" name="password" className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="block mb-1">Confirm Password:</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" className="w-full p-2 border rounded-md" />
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
                            <input type="hidden" id="addedByUsername" name="addedByUsername" value={userData.username} />
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
