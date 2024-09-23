import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsPencilFill, BsPlusCircleFill, BsTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { PasswordReset } from '../components/modal/PasswordReset';
import { AddAccount } from '../components/modal/AddAccount';
import { ConfirmModal } from '../components/modal/ConfirmModal';
import { deleteBankAccount } from '../api/ekzat';
import { getUserProfile } from '../api/profile';
import './profile.scss';

export const Profile = () => {
  
    const global = useSelector(state => state.ekzaUser)
    const user = global?.user;
    const dispatch = useDispatch()

  const [editMode, setEditMode] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [showTitle, setShowTitle] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [tooltipText, setTooltipText] = useState("")
  const [openDeleteAcc, setOpenDeleteAcc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountId, setAccountId] = useState("")

  const handleEdit = () => {
    setEditMode(true);
    setNewEmail(user.email);
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

const openAccount = () => {
  setOpenAccountModal(true)
}

const closeAccount = () => {
    setOpenAccountModal(false)
}
const closeDeleteAccount = () => {
  setOpenDeleteAcc(false)
}
const openDeleteAccount = () => {
  setOpenDeleteAcc(true)
}

const showTooltip = (type) => {
  setShowTitle(true)
  
  if(type === "password") {
    setTooltipText("Change Password")
  } else if(type === "account") {
    setTooltipText("Add new account")
  }
}

const deleteAcc = async ()=> {
  setLoading(true)
  try {
    const data = await deleteBankAccount(accountId);
    toast.success("Account deleted successfully.", {
      style: {
        backgroundColor: 'rgba(229, 229, 229, 0.1)',
        color: '#fff',
        fontSize: '16px',
        marginTop: "60px"
      },
    });
    getUserProfile(dispatch)
    setLoading(false)
    closeDeleteAccount();
  } catch (error) {
    toast.error("An error occured.", {
      style: {
        backgroundColor: 'rgba(229, 229, 229, 0.1)',
        color: '#fff',
        fontSize: '16px',
        marginTop: "60px"
      },
    });
    console.log(error)
    setLoading(false)
  }
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
            onMouseEnter={() => { 
              showTooltip("password")
            }}
            onMouseLeave={() => setShowTitle(false)}
            onTouchStart={() => { 
              showTooltip("password")
            }}
            onTouchEnd={() => setShowTitle(false)}
           >
            {(showTitle && tooltipText === "Change Password") && <span style={{position: "absolute", right: 40, width: "max-content", marginRight: 5}}>
                {tooltipText}
            </span>}
            <BsPencilFill />
           </div>

            </div>
              <div className='detail-item profile-account-wrap'>
                <div>
                  <h3>Bank Accounts</h3>
                  <ul>
                    {user?.accounts?.map((account, index) => (
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", widows: "100%"}}>
                        <li key={index}>
                          {account.accountName} - {account.bankName} ({account.accountNumber})
                        </li>
                        <BsTrashFill 
                          className='delete-icon'  
                          onClick={()=>{
                            openDeleteAccount()
                            setAccountId(account.id)
                        }}/>
                      </div>
                    ))}
                  </ul>
                </div>
                <div 
                  className='edit-pencil-wrap'
                  onClick={openAccount}
                  onMouseEnter={() => { 
                    showTooltip("account")
                  }}
                  onMouseLeave={() => setShowTitle(false)}
                  onTouchStart={() => { 
                    showTooltip("account")
                  }}
                  onTouchEnd={() => setShowTitle(false)}
                >
                  {(showTitle && tooltipText === "Add new account") && <span style={{position: "absolute", right: 40, width: "max-content", marginRight: 5}}>
                      {tooltipText}
                  </span>}
                  <BsPlusCircleFill />
                </div>
              </div>

      </div>
        {openAccountModal && 
        <AddAccount 
          isOpen={openAccountModal} 
          onClose={closeAccount}/>
        }
        
        {openPasswordModal && 
        <PasswordReset 
          isOpen={openPasswordModal} 
          onClose={closePassword}  
        />}

        {openDeleteAcc && 
        <ConfirmModal 
          isOpen={openPasswordModal} 
          onClose={closeDeleteAccount} 
          func={deleteAcc}
          loading={loading}
        />}
    </div>
  );
};
