import React, { useState, useEffect } from 'react';
import ProfileModal from '../ProfileModal/ProfileModal';
import UserTable from '../UserTable/UserTable';

const Admin = ({ userData }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedUserTree, setSelectedUserTree] = useState(null);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleSelectUser = (username) => {
        fetch(`/api/userTree/${username}`)
            .then(response => response.json())
            .then(data => setSelectedUserTree(data))
            .catch(error => {
                console.error('Error fetching user tree:', error);
                alert('Failed to load user tree');
            });
    };

    const handleLogout = () => {
        fetch('/auth/logout', {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                } else {
                    console.error('Logout failed:', response.statusText);
                }
            })
            .catch(error => console.error('Logout failed:', error));
    };

    return (
        <div className="container mx-auto bg-white p-8 rounded shadow-md text-center">
            <h1 className="text-2xl font-bold mb-2">{userData.username}</h1>
            <h3 className="text-lg mb-4">{userData.usertype}</h3>
            <img
                src={userData.imageUrl}
                alt="Profile"
                className="rounded-full w-24 h-24 mx-auto mb-4"
            />
            <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                Edit Profile
            </button>
            <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                Logout
            </button>
            {userData.users && userData.users.length > 0 ? (
                <>
                    <UserTable users={userData.users} onSelectUser={handleSelectUser} />
                    {selectedUserTree && (
                        <div>
                            <h2>{selectedUserTree.username}'s User Tree</h2>
                            <Hierarchy data={selectedUserTree.tree} />
                        </div>
                    )}
                </>
            ) : (
                <p>No users found.</p>
            )}
            <ProfileModal isOpen={isModalOpen} onClose={closeModal} userData={userData} />
        </div>
    );
};

export default Admin;
