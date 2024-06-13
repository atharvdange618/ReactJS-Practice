import React from 'react';
import { toast, Toaster } from 'react-hot-toast'

const ProfileModal = ({ isOpen, onClose, userData }) => {
    if (!isOpen) return null;

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        if (password && password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        fetch('/api/auth/administrator/edit', {
            method: 'PATCH',
            credentials: 'same-origin',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    toast.success('Profile updated successfully');
                    window.location.reload();
                } else {
                    return response.json().then(data => { throw new Error(data.message); });
                }
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                toast.error('Failed to update profile: ' + error.message);
            });
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <Toaster />
            <div className="bg-white p-8 rounded shadow-md w-4/5 md:w-1/2 lg:w-1/3">
                <span className="float-right text-gray-600 text-2xl cursor-pointer" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name:</label>
                        <input type="text" id="name" name="name" defaultValue={userData.name} className="w-full p-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input type="email" id="email" name="email" defaultValue={userData.email} className="w-full p-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700">Address:</label>
                        <input type="text" id="address" name="address" defaultValue={userData.address} className="w-full p-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="usertype" className="block text-gray-700">User Type:</label>
                        <select id="usertype" name="usertype" defaultValue={userData.usertype} className="w-full p-2 border rounded">
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="profilepic" className="block text-gray-700">Profile Picture:</label>
                        <input type="file" id="profilepic" name="profilepic" accept="image/*" className="w-full p-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">New Password:</label>
                        <input type="password" id="password" name="password" className="w-full p-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" className="w-full p-2 border rounded" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;
