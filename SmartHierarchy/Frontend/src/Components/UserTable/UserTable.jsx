import React from 'react';
import PropTypes from 'prop-types';

const UserTable = ({ users, onSelectUser }) => {
    const handleDelete = (username) => {
        if (!window.confirm(`Are you sure you want to delete ${username}?`)) {
            return;
        }

        fetch(`/api/auth/administrator/delete/${username}`, {
            method: 'DELETE',
            credentials: 'same-origin'
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw new Error(data.message); });
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                alert('Failed to delete user: ' + error.message);
            });
    };

    return (
        <table className="table-auto w-full border-collapse border border-gray-200 mt-4">
            <thead>
                <tr>
                    <th className="border border-gray-200 p-2 bg-gray-100">Username</th>
                    <th className="border border-gray-200 p-2 bg-gray-100">Status</th>
                    <th className="border border-gray-200 p-2 bg-gray-100">Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.username}>
                        <td className="border border-gray-200 p-2 cursor-pointer" onClick={() => onSelectUser(user.username)}>
                            {user.username}
                        </td>
                        <td className="border border-gray-200 p-2">{user.status}</td>
                        <td className="border border-gray-200 p-2">
                            <button
                                onClick={() => handleDelete(user.username)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

UserTable.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            username: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired
        })
    ).isRequired,
    onSelectUser: PropTypes.func.isRequired
};

export default UserTable;
