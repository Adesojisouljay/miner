import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BsPencilFill } from 'react-icons/bs';
import { PasswordReset } from '../components/modal/PasswordReset';
import './profile.scss';

export const Profile = () => {
  
    const global = useSelector(state => state.ekzaUser)
    const user = global?.user
    console.log(user)

  const [editMode, setEditMode] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [showTitle, setShowTitle] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const [newAccount, setNewAccount] = useState({
    accountNumber: '',
    accountName: '',
    bankName: ''
  });

  const handleEdit = () => {
    setEditMode(true);
    setNewEmail(user.email);
  };

  const handleSave = async () => {
    const updatedUser = { email: newEmail };

    if (profileImage) {
      const formData = new FormData();
      formData.append('file', profileImage);
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

      try {
        const uploadResponse = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData);
        updatedUser.profileImage = uploadResponse.data.secure_url;
      } catch (error) {
        console.error('Error uploading profile image:', error);
      }
    }

    setEditMode(false);
  };

  const getKycStatusClass = (status) => {
    switch (status) {
        case 'verified':
            return 'kyc-approved';
        case 'rejected':
            return 'kyc-rejected';
        case 'pending':
            return 'kyc-pending';
        default:
            return '';
    }
};

const openPassword = () => {
    setOpenPasswordModal(true)
}
const closePassword = () => {
    setOpenPasswordModal(false)
}

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user.profileImage || 'https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg'}
          alt="Profile"
          className="profile-avatar"
        />
        <h2>{`${user?.firstName} ${user?.lastName} ${user?.otherName || ''}`}</h2>
        <p>Username: {user?.username}</p>
        <p>Account created on: {new Date(user.createdAt).toLocaleDateString()}</p>
        <p className={`kyc-status`}>
            KYC Status: <span className={`kyc-status ${getKycStatusClass(user?.kyc?.kycStatus)}`}>{user?.kyc?.kycStatus}</span>
        </p>
        <button className="edit-button" onClick={handleEdit}>
          Edit Profile
        </button>
      </div>

      <div className="profile-details">
        <div className="detail-item">
          <span>Email:</span>
            <input 
                value={newEmail || "" || user.email} 
                readOnly
            />
        </div>
          <div className="detail-item">
            <label htmlFor="profileImage">Profile Image:</label>
            <input
              type="file"
              id="profileImage"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </div>
        
          <div className="detail-item profile-password-reset">
           <span>Change password</span>
           <div 
            className='edit-pencil-wrap'
            onClick={openPassword}
            onMouseEnter={() => setShowTitle(true)}
            onMouseLeave={() => setShowTitle(false)}
            onTouchStart={() => setShowTitle(true)}
            onTouchEnd={() => setShowTitle(false)}
           >
            {showTitle && <span style={{position: "absolute", right: 40, width: "max-content", marginRight: 5}}>
                Change Password
            </span>}
            <BsPencilFill />
           </div>
          </div>

        <h3>Bank Accounts</h3>
        <ul>
          {user?.accounts?.map((account, index) => (
            <li key={index}>
              {account.accountName} - {account.bankName} ({account.accountNumber})
            </li>
          ))}
        </ul>

        {/* {editMode && ( */}
          <div className="add-account">
            <h4>Add Bank Account</h4>
            <input
              type="text"
              placeholder="Account Name"
              value={newAccount.accountName}
              onChange={(e) => setNewAccount({ ...newAccount, accountName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Bank Name"
              value={newAccount.bankName}
              onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Account Number"
              value={newAccount.accountNumber}
              onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
            />
          </div>
        {/* )} */}
      </div>

      {/* {editMode && ( */}
        <div className="button-group">
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
          <button className="cancel-button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </div>
        {openPasswordModal && <PasswordReset isOpen={openPasswordModal} onClose={closePassword}  />}
    </div>
  );
};
