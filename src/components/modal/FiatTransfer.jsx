import React, { useState, useEffect } from 'react';

////CREATE A CSS FILE FOR THIS
import './deposit-modal.scss';

export const DepositModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");

  const handleFiatTransfer = async () => {
    console.log("fiat transfer......")
  }
  
  return (
    ///////ADJUST THE CLASS NAMES
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal">
        <span className="close-btn" onClick={onClose}>X</span>
        <h2>Transfer Fiat</h2> 
        <div className="input-group">
          <label htmlFor="receiver">Receiver</label>
          <input 
            type="text" 
            id="receiver" 
            value={receiver} 
            onChange={(e) => setReceiver(e.target.value)} 
            placeholder="Enter reciepient" 
          />
          <label htmlFor="transfer-amount">Amount</label>
          <input 
            type="number" 
            id="transfer-amount" 
            value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))} 
            placeholder="Enter amount" 
          />
        </div>
        <button className="deposit-btn" onClick={handleFiatTransfer}>Proceed</button>
      </div>
    </div>
  );
};
