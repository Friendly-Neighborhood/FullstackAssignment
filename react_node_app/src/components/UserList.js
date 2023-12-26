import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import '../App.css'; // // Import CSS styles

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(Date.now()); // Initialize with the current timestamp

    useEffect(() => {
        fetchUsers();
    }, [lastUpdate]); // Add lastUpdate as a dependency

    const fetchUsers = () => {
        console.log('Fetching users...');
        fetch('http://localhost:8080/users')
            .then(response => response.json())
            .then(data => {
                // Sort the user list by ID
                const sortedUsers = data.sort((a, b) => a.id - b.id);
                console.log('Fetched users:', sortedUsers);
                setUsers(sortedUsers);
            })
            .catch(error => console.error('Error fetching data:', error));
    };        

    const handleUserAddedOrUpdated = () => {
        // Update the lastUpdate timestamp to trigger a re-render and fetch the latest user list
        setLastUpdate(Date.now());
        setEditingUser(null); // Reset editing user
    };

    const handleUserDeleted = () => {
        // Update the lastUpdate timestamp to trigger a re-render and fetch the latest user list
        setLastUpdate(Date.now());
        setEditingUser(null); // Reset editing user
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
    };

    return (
        <div className="container mt-4"> {/* Use Bootstrap container class */}
<UserForm
    onUserAddedOrUpdated={handleUserAddedOrUpdated}
    onUserDeleted={handleUserDeleted}
    userToEdit={editingUser}
    users={users} // Pass the users data as a prop
/>

            <h2>User List</h2>
            <ul className="list-group"> {/* Use Bootstrap list-group class */}
                {users.map(user => (
                    <li key={user.id} className="list-group-item"> {/* Use Bootstrap list-group-item class */}
                        {user.name} - {user.email}
                        <button
                            className="btn btn-primary btn-sm float-end"
                            onClick={() => handleEditClick(user)}
                        >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
            <footer className="fixed-bottom bg-dark text-white text-center py-2 footer">
                Yevhen Bredis | 2023
            </footer>
        </div>
    );
};

export default UserList;