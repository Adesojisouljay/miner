import React, { useState } from 'react';
import { processHiveWithdrawal, requestToken } from '../../api/ekzat';
import { RiArrowDownSFill } from 'react-icons/ri';
import { Dropdown } from '../dropdown/Dropdown';
import './withdraw-modal.scss';

export const WithdrawalModal = ({ isOpen, onClose, assets, user }) => {
  const [memo, setMemo] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [withdrawalToken, setWithdrawalToken] = useState('');
  const [currency, setCurrency] = useState(assets[0]?.currency || '');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);

  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [openList, setOpenList] = useState(true)

  console.log(currency)

  const handleWithdrawal = async (e) => {
    e.preventDefault();

    try {
      const withdrawalData = { to, amount, currency: selectedAsset.currency, memo, withdrawalToken };
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

  const getToken = async () => {
    try {
      const data = await requestToken();
      if(data?.success === true){
        setStep(2)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAssetChange = (e) => {
    const asset = assets?.find(asset => asset?.currency === e.target.value);
    setSelectedAsset(asset);
  };

  const handleOpencoinList = () => {
    setOpenList(!openList);
  };

  return (
    <div className={`fadded-container modal-overlay ${isOpen ? 'open' : ''}`} >
    <div className={`modal-overlay  ${isOpen ? 'open' : ''}`}  onClick={onClose}> </div>
    {/* <div className={`modal-overlay ${isOpen ? 'open' : ''}`}> */}
      <div className="modal testing">
        <span className="close-modal" onClick={onClose}>X</span>
        <h2>Withdrawal</h2>
        {message && <p className='warning'>{message}</p>}
        {step === 1 && <div className="w-input-group">

          <div className='w-main'>
            <div className='w-coin-select-wrapper'>
              <div className="w-currency-select-wrap" onClick={handleOpencoinList}>
                <img className="w-deposit-coin-image" src={selectedAsset.image} alt="" />
                <span className='w-picker-currency'>{selectedAsset.currency}</span>
                <RiArrowDownSFill  size={24}/>
              </div>
              <Dropdown 
                user={user}
                setCurrency={setSelectedAsset} 
                handleOpencoinList={handleOpencoinList} 
                openList={openList}
              />
            </div>
          </div>

          <label htmlFor="recipient-account">Recipient Account:</label>
          <input
            className='w-input'
            type="text"
            placeholder="Recipient Account"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            id="recipient-account"
          />
          <label htmlFor="withdraw-amount">Amount:</label>
          <input
            className='w-input'
            type="number"
            id="withdraw-amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <label htmlFor="memo">Memo:</label>
          <input
            className='w-input'
            type="text"
            id="memo"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Enter memo"
          />
          <button className="withdraw-btn" onClick={getToken}>Withdraw</button>
        </div>}
        {step === 2 && <div className="w-input-group">
          <label htmlFor="withdrawalToken">Withdrawal token</label>
          <input
            className='w-input'
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
