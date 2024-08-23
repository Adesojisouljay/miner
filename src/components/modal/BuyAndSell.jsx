import React, { useState, useEffect } from 'react';
import './buy-and-sell.scss';
import { buyAsset, sellAsset, calculateTransaction } from '../../api/ekzat';
import { formatNumbers } from '../../utils';
import { useSelector } from 'react-redux';
import { Loader } from '../loader/Loader';

export const BuySellModal = ({ isOpen, onClose, assets }) => {
  const [currency, setCurrency] = useState(assets[0]?.currency || '');
  const [amount, setAmount] = useState('');
  const [amountType, setAmountType] = useState('crypto'); // 'crypto' or 'fiat'
  const [transactionType, setTransactionType] = useState('buy');
  const [message, setMessage] = useState('');
  const [conversionResult, setConversionResult] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedAssetBalance, setSelectedAssetBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector(state => state.apexMiner.user);

  useEffect(() => {
    const selectedAsset = user.assets.find(asset => asset.currency === currency);
    setSelectedAssetBalance(selectedAsset ? selectedAsset.balance : 0);
  }, [currency, user.assets]);

  useEffect(() => {
    if (amount) handleCalculate(amount);
  }, [currency, amountType]);

  const handleCalculate = async (a) => {
    setIsLoading(true);
    setMessage('');
    setConversionResult(null);

    try {
      const conversionData = await calculateTransaction({
        amount: a,
        currency,
        amountType,
        transactionType,
      });
      setConversionResult(conversionData);
      setIsLoading(false);
    } catch (error) {
      setMessage(error.message || 'An error occurred during calculation');
      setIsLoading(false);
    }
  };

  const handleTransaction = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setMessage('');

    try {
      const transactionData = { 
        amount: transactionType === 'buy' ? 
          (amountType === 'fiat' ? amount : conversionResult?.convertedAmount) : 
          (amountType === 'fiat' ? conversionResult?.convertedAmount : amount), 
        currency, 
        amountType 
      };

      if (transactionType === 'buy') {
        await buyAsset(transactionData); 
      } else if (transactionType === 'sell') {
        await sellAsset(transactionData);
      }
      
      setStep(2);
      setIsLoading(false);
    } catch (error) {
      setMessage(error.message || 'An error occurred during the transaction');
      setStep(1);
      setIsLoading(false);
    }
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    handleCalculate(newAmount);
  };

  const toggleAmountType = () => {
    setAmountType(prevType => (prevType === 'crypto' ? 'fiat' : 'crypto'));
  };

  return (
    <div className={`fadded-container modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal">
        <span className="close-btn" onClick={onClose}>X</span>
        {(isLoading) && <Loader />}
        <>
          <h2>{transactionType === 'buy' ? 'Buy' : 'Sell'} Assets</h2>
          <div className="toggle-buttons">
            <button 
              className={`${transactionType === 'buy' ? 'active btn' : ''} btn buy-sell-btn`}
              onClick={() => setTransactionType('buy')}
            >
              Buy
            </button>
            <button 
              className={`${transactionType === 'sell' ? 'active btn' : ''} btn buy-sell-btn`}
              onClick={() => setTransactionType('sell')}
            >
              Sell
            </button>
          </div>
          <div className="amount-type-toggle">
            <button 
              className={`${amountType === 'crypto' ? 'active btn' : ''} btn`}
              onClick={toggleAmountType}
            >
              {amountType === 'crypto' ? 'Switch to Fiat' : 'Switch to Crypto'}
            </button>
          </div>
          {message && <p className='warning'>{message}</p>}
          
          {step === 1 && (
            <div className="input-group">
              <h3>Balance: {formatNumbers(selectedAssetBalance)} {currency.toUpperCase()}</h3>
              <div className="currency-wrap">
                {amountType === "fiat" ? 
                  <h1>NGN</h1> : <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {assets.map((asset) => (
                    <option key={asset.currency} value={asset.currency}>
                      {asset.currency.toUpperCase()}
                    </option>
                  ))}
                </select>}
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder={`Enter ${amountType === 'fiat' ? 'Naira' : currency.toUpperCase()} amount`}
                />
              </div>
              <div className="est-wrap">
                <div className='est currency-wrap'>
                  {amountType === "crypto" ? 
                  <h1>NGN</h1> : <select
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
                  }
                  <h2>{formatNumbers(conversionResult?.convertedAmount)}</h2>
                </div>
                <hr />
                {(conversionResult || amount) && (
                  <div className="step-2">
                    <h4>Transaction Summary</h4>
                    {transactionType === 'buy' ? (
                      <>
                        <p>Amount: {formatNumbers(conversionResult?.cryptoAmount)} {currency.toUpperCase()} ({formatNumbers(conversionResult?.convertedAmount)} Naira)</p>
                        <p>Fee: {conversionResult?.cryptoFee} ({formatNumbers(conversionResult?.fiatFee)} Naira)</p>
                        <p>You will get: {conversionResult?.cryptoAmountAfterFee} ({formatNumbers(conversionResult?.fiatAmountAfterFee)} Naira)</p>
                      </>
                    ) : (
                      <>
                        <p>Amount: {formatNumbers(conversionResult?.convertedAmount)} Naira ({formatNumbers(conversionResult?.cryptoAmount)} {currency.toUpperCase()})</p>
                        <p>Fee: {formatNumbers(conversionResult?.fiatFee)} Naira ({conversionResult?.cryptoFee})</p>
                        <p>You will get: {formatNumbers(conversionResult?.fiatAmountAfterFee)} Naira ({conversionResult?.cryptoAmountAfterFee})</p>
                      </>
                    )}
                    <button 
                      className="transaction-btn" 
                      onClick={handleTransaction}
                      disabled={isLoading}
                      style={{ cursor: isLoading && "not-allowed" }}
                    >
                      Confirm {transactionType === 'buy' ? 'Buy' : 'Sell'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-3">
              <h4>Transaction processed successfully</h4>
              <button className="transaction-btn" onClick={onClose}>
                Close
              </button>
            </div>
          )}
        </>
      </div>
    </div>
  );
};
