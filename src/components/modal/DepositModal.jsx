import React, { useState, useEffect } from 'react';
import './deposit-modal.css';
import {initiateDeposit} from '../../api/deposits';

export const DepositModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [countdown, setCountdown] = useState(15 * 60);
  const [addressGenerated, setAddressGenerated] = useState(false);

  useEffect(() => {
    let interval;

    if (addressGenerated && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [addressGenerated, countdown]);

  const handleGenerateAddress = () => {

    const generatedAddress = generatewalletAddress();
    setWalletAddress(generatedAddress);

    setCountdown(15 * 60);

    setAddressGenerated(true);
  };

  const generatewalletAddress = () => {

    return 'test';
  };

  const handleDeposit = async () => {
    console.log({walletAddress, amount })
    try {
      const depositData = {walletAddress: "test", amount }

      const data = await initiateDeposit(depositData);
      console.log('Deposit request initiated successfully', data);

            setAmount('');
      setWalletAddress('');

      setCountdown(15 * 60);
      setAddressGenerated(false);

      onClose();
    } catch (error) {
      console.error('Error initiating deposit request:', error);

    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal">
        <span className="close-btn" onClick={onClose}>X</span>
        <h2>Deposit</h2> 
        <div className="input-group">
          <label htmlFor="deposit-amount">Amount ($100 - $10,000):</label>
          <input 
            type="number" 
            id="deposit-amount" 
            min="100" 
            max="10000" 
            value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))} 
            placeholder="Enter amount" 
          />
        </div>
        {walletAddress && (
          <div className="deposit-address">
            <p>Deposit Address:</p>
            <p>{walletAddress}</p>
          </div>
        )}
        {!walletAddress && (
          <button className="generate-address-btn" onClick={handleGenerateAddress}>Generate Deposit Address</button>
        )}
        {walletAddress && <button className="generate-address-btn" onClick={handleCopyAddress}>Copy Address</button>}
        <p className="countdown">Countdown: {Math.floor(countdown / 60)}:{countdown % 60 < 10 ? '0' : ''}{countdown % 60} minutes</p>
        <button className="deposit-btn" onClick={handleDeposit}>I have made deposit</button>
      </div>
    </div>
  );
};
