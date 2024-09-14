import React, { useState } from 'react';
import { processHiveWithdrawal, requestWithdrawalToken } from '../../api/ekzat';
import './withdraw-modal.scss';

export const WithdrawalModal = ({ isOpen, onClose, assets }) => {
  const [memo, setMemo] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [withdrawalToken, setWithdrawalToken] = useState('');
  const [currency, setCurrency] = useState(assets[0]?.currency || '');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1)

  const handleWithdrawal = async (e) => {
    e.preventDefault();

    try {
      const withdrawalData = { to, amount, currency, memo, withdrawalToken };
      console.log(withdrawalData)
      const result = await processHiveWithdrawal(withdrawalData);
      console.log(result);
      setMessage(result.message);
      setStep(3)
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
  };

  const requestToken = async () => {
    try {
      const data = await requestWithdrawalToken();
      if(data?.success === true){
        setStep(2)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`fadded-container modal-overlay ${isOpen ? 'open' : ''}`} >
    <div className={`modal-overlay  ${isOpen ? 'open' : ''}`}  onClick={onClose}> </div>
    {/* <div className={`modal-overlay ${isOpen ? 'open' : ''}`}> */}
      <div className="modal">
        <span className="close-modal" onClick={onClose}>X</span>
        <h2>Withdrawal</h2>
        {message && <p className='warning'>{message}</p>}
        {step === 1 && <div className="input-group">
          <label htmlFor="currency">Currency:</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {assets.map((asset) => (
              <option key={asset.currency} value={asset.currency}>
                {asset.currency.toUpperCase()}
              </option>
            ))}
          </select>
          <label htmlFor="recipient-account">Recipient Account:</label>
          <input
            type="text"
            placeholder="Recipient Account"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            id="recipient-account"
          />
          <label htmlFor="withdraw-amount">Amount:</label>
          <input
            type="number"
            id="withdraw-amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <label htmlFor="memo">Memo:</label>
          <input
            type="text"
            id="memo"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Enter memo"
          />
          <button className="withdraw-btn" onClick={requestToken}>Withdraw</button>
        </div>}
        {step === 2 && <div className="input-group">
          <label htmlFor="withdrawalToken">Memo:</label>
          <input
            type="text"
            id="withdrawalToken"
            value={withdrawalToken}
            onChange={(e) => setWithdrawalToken(e.target.value)}
            placeholder="Enter withdrawal token"
          />
          <button className="withdraw-btn" onClick={handleWithdrawal}>Withdraw</button>
        </div>}
        {step === 3 && <div className="">
         <h4>Withdrawal processed successfully</h4>
        </div>}
      </div>
    </div>
    // </div>
  );
};
