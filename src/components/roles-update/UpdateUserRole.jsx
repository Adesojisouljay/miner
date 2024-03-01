import React, { useState } from 'react';
import { updateRole } from '../../api/admin';
import './update-role.css'; 

export const UpdateUserRole = () => {
  const [email, setEmail] = useState('');
  const [newRole, setNewRole] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRoleChange = async () => {
    try {

      if (!['user', 'admin'].includes(newRole)) {
        setMessage('Invalid role');
        return;
      }
      
      const response = await updateRole(email, newRole);
      setMessage(response.message);
      setSuccess(true); 
    } catch (error) {
      setMessage('Error updating user role');
      console.error('Error updating user role:', error);
    }
  };

  return (
    <div className="update-user-role-container">
      <h3>Update User Role</h3>
      {message && <h3 className="success-message">{message}</h3>}
      {!success && (
        <>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newRole">New Role:</label>
            <input
              type="text"
              id="newRole"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            />
          </div>
          <button className="update-btn" onClick={handleRoleChange}>Update Role</button>
        </>
      )}
    </div>
  );
};
