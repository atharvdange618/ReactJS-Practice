import React, { useState, useEffect } from 'react';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useNavigate, useLocation } from 'react-router-dom';
import UserTable from '../UserTable/UserTable';
import Cookies from 'js-cookie';
import { toast, Toaster } from 'react-hot-toast';
import Hierarchy from '../Hierarchy/Hierarchy';
import axios from 'axios'

const Admin = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedUserTree, setSelectedUserTree] = useState(null);
    const [username, setUsername] = useState("");
    const [usertype, setUsertype] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const fetchUserList = async () => {
        try {
            const response = await axios.get('/api/auth/administrator/userlist');
            const data = response.data;
            setUsers(data);
        } catch (error) {
            console.error('Error fetching user list:', error);
            toast.error('Error fetching user list');
        }
    };

    const handleSelectUser = (username) => {
        fetch(`/api/userTree/${username}`)
            .then(response => response.json())
            .then(data => setSelectedUserTree(data))
            .catch(error => {
                console.error('Error fetching user tree:', error);
                toast.error('Failed to load user tree');
            });
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/auth/administrator/${location.state.username}`, {
                    method: 'GET',
                    credentials: 'same-origin'
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setUsername(data.username);
                setUsertype(data.usertype);
                setImageUrl(data.imageUrl);
            } catch (error) {
                toast.error('Error fetching user data:', error);
            }
        };

        if (location.state && location.state.username) {
            fetchUserData();
        }
    }, [location.state]);

    useEffect(() => {
        fetchUserList();
    }, []);

    const handleLogout = () => {
        toast.success("Logged out");
        Cookies.remove('token');
        window.location.reload()
        navigate('/login');
    };

    return (
        <div className="container mx-auto bg-white p-8 rounded shadow-md text-center">
            <Toaster />
            <h1 className="text-2xl font-bold mb-2">{username}</h1>
            <h3 className="text-lg mb-4">{usertype}</h3>
            <img
                src={imageUrl}
                alt="Profile"
                className="rounded-full w-24 h-24 mx-auto mb-4"
            />
            <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                Edit Profile
            </button>
            <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                Logout
            </button>
            {users.length > 0 ? (
                <>
                    <UserTable users={users} onSelectUser={handleSelectUser} />
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
            <ProfileModal isOpen={isModalOpen} onClose={closeModal} userData={{ username, usertype, imageUrl, users }} />
        </div>
    );
};

export default Admin;
