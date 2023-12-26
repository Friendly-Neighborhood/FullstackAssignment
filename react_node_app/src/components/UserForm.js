import React, { useState, useEffect } from 'react';

const UserForm = ({ onUserAdded, onUserUpdated, onUserDeleted, userToEdit, fetchUsers, users }) => {

    const [user, setUser] = useState({ name: '', email: '' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (userToEdit) {
            setUser(userToEdit); // If editing a user, pre-fill the form
        } else {
            setUser({ name: '', email: '' }); // Reset form for adding a new user
        }
    }, [userToEdit]);

    useEffect(() => {
        // Clear error after a timeout (e.g., 5 seconds)
        if (error) {
            const errorTimeout = setTimeout(() => {
                setError('');
            }, 5000);

            return () => clearTimeout(errorTimeout);
        }
    }, [error]);

    useEffect(() => {
        // Clear success message after a timeout (e.g., 5 seconds)
        if (successMessage) {
            const successTimeout = setTimeout(() => {
                setSuccessMessage('');
            }, 5000);

            return () => clearTimeout(successTimeout);
        }
    }, [successMessage]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if name and email are not empty
        if (!user.name || !user.email) {
            setError('Name and Email cannot be empty');
            return;
        }

        // Check for existing email addresses when editing a user
        if (userToEdit) {
            const existingUser = users.find(u => u.email === user.email && u.id !== userToEdit.id);
            if (existingUser) {
                setError('Email address already exists');
                return;
            }
        }

        const url = userToEdit ? `http://localhost:8080/users/${userToEdit.id}` : 'http://localhost:8080/users';
        const method = userToEdit ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if (response.status === 409) {
                return response.json();
            }
            return response.text();
        })
        .then(data => {
            if (typeof data === 'object') {
                setError(data.error);
                setSuccessMessage(''); // Clear success message
            } else {
                if (userToEdit){
                    window.confirm("User info updated!");
                    window.location.reload(true);
                } else {
                    window.confirm("User added!");
                    window.location.reload(true);
                }
                setError(''); // Clear error
                userToEdit ? onUserUpdated(user) : onUserAdded(user);
                setUser({ name: '', email: '' }); // Reset form
                fetchUsers(); // Add this line to refresh the user list
            }
        })              
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const handleDelete = () => {
        if (userToEdit && window.confirm("Are you sure you want to delete this user?")) {
            fetch(`http://localhost:8080/users/${userToEdit.id}`, {
                method: 'DELETE',
            })
            .then(() => {
                onUserDeleted();
                setUser({ name: '', email: '' }); // Reset form
                setError(''); // Clear error
                setSuccessMessage(''); // Clear success message
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <h2>{userToEdit ? 'Edit User' : 'Add User'}</h2>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
                        </div>
                        <button type="submit" className="btn btn-primary">{userToEdit ? 'Update User' : 'Add User'}</button>
                        {userToEdit && <button type="button" onClick={handleDelete} className="btn btn-danger ml-2">Delete User</button>}
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserForm;