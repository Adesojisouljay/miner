import React, { useState } from 'react';
import { ConfirmDepositPage } from '../components/deposit-confirm/ConfirmDeposit';
import { ConfirmWithdrawalPage } from '../components/withdrawal-confirm/ConfirmWithrawal';
import { UpdateUserRole } from '../components/roles-update/UpdateUserRole';
import './admin.css';

export const Admin = () => {
  const [selectedOption, setSelectedOption] = useState('confirmDeposit');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className='admin'>
      <div className="admin-container">
        <h1 className="admin-heading">Admin Dashboard</h1>
        <ul className="admin-menu">
          <li className={selectedOption === 'confirmDeposit' ? 'selected' : ''} onClick={() => handleOptionClick('confirmDeposit')}>Confirm Deposits</li>
          <li className={selectedOption === 'confirmWithdrawal' ? 'selected' : ''} onClick={() => handleOptionClick('confirmWithdrawal')}>Confirm Withdrawals</li>
          <li className={selectedOption === 'updateRole' ? 'selected' : ''} onClick={() => handleOptionClick('updateRole')}>Update Roles</li>
        </ul>
      </div>
      {selectedOption === 'confirmDeposit' && <ConfirmDepositPage />}
      {selectedOption === 'confirmWithdrawal' && <ConfirmWithdrawalPage />}
      {selectedOption === 'updateRole' && <UpdateUserRole />}
    </div>
  );
};
