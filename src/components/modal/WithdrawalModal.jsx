import React, { useState } from 'react';
import { initiateWithdrawal } from '../../api/withdrawal';
import './withdraw-modal.css';

export const WithdrawalModal = ({ isOpen, onClose, onWithdraw }) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleWithdraw = async () => {
    try {

      const response = await initiateWithdrawal(withdrawAmount);

      onWithdraw(response);

      setWithdrawAmount('');

      onClose();
    } catch (error) {
      console.error('Error initiating withdrawal:', error);

    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal">
        <span className="close-btn" onClick={onClose}>X</span>
        <h2>Withdrawal</h2> 
        <div className="input-group">
          <label htmlFor="withdraw-amount">Amount:</label>
          <input 
            type="number" 
            id="withdraw-amount" 
            value={withdrawAmount} 
            onChange={(e) => setWithdrawAmount(e.target.value)} 
            placeholder="Enter amount" 
          />
        </div>
        <button className="withdraw-btn" onClick={handleWithdraw}>Withdraw</button>
      </div>
    </div>
  );
};
