// AddBankAccountForm.jsx

import React, { useState } from 'react';
import { addBankAccount } from '../api/ekzat';
import './add-bank-account.scss';

export const AddBankAccountForm = ({ authToken }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const accountNumberRegex = /^\d{10,12}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!accountNumberRegex.test(accountNumber)) {
      setMessage('Invalid account number. It should be between 10 and 12 digits.');
      return false;
    }
    if (!nameRegex.test(accountName)) {
      setMessage('Invalid account name. It should only contain letters and spaces.');
      return false;
    }
    if (!nameRegex.test(bankName)) {
      setMessage('Invalid bank name. It should only contain letters and spaces.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const bankDetails = {
      accountNumber,
      accountName,
      bankName
    };

    try {
      await addBankAccount(bankDetails, authToken);
      setIsSuccess(true);
      setMessage('Bank account added successfully');
    } catch (error) {
      setIsSuccess(false);
      setMessage('Error adding bank account');
    }
  };

  return (
    <div className="form-container">
      {isSuccess ? (
        <div className="success-message">
          <h2>Success!</h2>
          <p>{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bank-form">
          <div className="form-group">
            <h1 style={{color: "green"}}>Please make sure you enter your details as accurately as possible</h1>
            <label className="label">Account Number:</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Account Name:</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Bank Name:</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">Add Bank Account</button>
          {message && !isSuccess && <p className="message">{message}</p>}
        </form>
      )}
    </div>
  );
};
