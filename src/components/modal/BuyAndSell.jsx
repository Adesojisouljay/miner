import React, { useState, useEffect, useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';
import './buy-and-sell.scss';
import { buyAsset, sellAsset, calculateTransaction } from '../../api/ekzat';
import { formatNumbers } from '../../utils';
import { useSelector } from 'react-redux';
import { Loader } from '../loader/Loader';

export const BuySellModal = ({ isOpen, onClose, assets }) => {
  const [currency, setCurrency] = useState(assets[0]?.currency || '');
  const [amount, setAmount] = useState('');
  const [amountType, setAmountType] = useState('crypto');
  const [transactionType, setTransactionType] = useState('buy');
  const [message, setMessage] = useState('');
  const [conversionResult, setConversionResult] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedAssetBalance, setSelectedAssetBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const abortControllerRef = useRef(null);

  const user = useSelector(state => state.apexMiner.user);

  useEffect(() => {
    const selectedAsset = user.assets.find(asset => asset.currency === currency);
    setSelectedAssetBalance(selectedAsset ? selectedAsset.balance : 0);
  }, [currency, user.assets]);

  useEffect(() => {
    if (amount) debouncedHandleCalculate(amount);
  }, [currency, amountType]);

  const debouncedHandleCalculate = useCallback(
    debounce((a) => {
      handleCalculate(a);
    }, 1000),
    [currency, amountType, transactionType]
  );

  useEffect(() => {
    if(!amount) setConversionResult(null)
    setConversionResult(null);
    debouncedHandleCalculate(amount);
  }, [amount]);

  const handleCalculate = async (a) => {
    if (!a) {
      setConversionResult(null);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    setIsLoading(true);
    setMessage('');
    setConversionResult(null);

    try {
      const conversionData = await calculateTransaction({
        amount: a,
        currency,
        amountType,
        transactionType,
        signal,  // Pass signal to fetch request
      });
      console.log(a)
      console.log(conversionData)
      if (conversionData.success === true) {
        setConversionResult(conversionData);
        setIsLoading(false);
      } else {
        setConversionResult(null);
        setIsLoading(false);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        setMessage(error.message || 'An error occurred during calculation');
      }
      setIsLoading(false);
    }
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
  
    if (!amount || isNaN(amount)) {
      setMessage('Please enter a valid amount');
      return;
    }
  
    const amountNumber = Number(amount);
  
    if (amountType === 'fiat') {
      if (amountNumber < 500) {
        setMessage('Amount must not be less than 500 Naira');
        return;
      }
    } else if (amountType === 'crypto') {
      if (!conversionResult || conversionResult.convertedAmount < 500) {
        setMessage('The equivalent amount in Naira must be at least 500');
        return;
      }
    }
  
    setIsLoading(true);
    setMessage('');
  
    try {
      const transactionData = {
        amount: transactionType === 'buy'
          ? (amountType === 'fiat' ? amountNumber : conversionResult?.convertedAmount)
          : (amountType === 'fiat' ? conversionResult?.convertedAmount : amountNumber),
        currency,
        amountType
      };
  
      if (transactionType === 'buy') {
        await buyAsset(transactionData);
      } else if (transactionType === 'sell') {
        await sellAsset(transactionData);
      }
  
      setStep(2);
    } catch (error) {
      setMessage(error.message || 'An error occurred during the transaction');
    } finally {
      setIsLoading(false);
    }
  };    

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;

    if (newAmount === '') {
      setConversionResult(null);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }

    setAmount(newAmount);
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
          <button onClick={()=> console.log(amount)}>test...</button>
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
              className={`active btn`}
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
                  <h2>{amountType === "crypto" ? conversionResult?.convertedNairaAmount : conversionResult?.convertedCryptoAmount}</h2>
                </div>
                <hr />
                {(conversionResult || amount) && (
                  <div className="step-2">
                    <h4>Transaction Summary</h4>
                    {transactionType === 'buy' ? (
                      <>
                        {!conversionResult ? (
                          <>
                            <p>Amount: Calculating...</p>
                            <p>Fee: Calculating...</p>
                            <p>You will get: Calculating...</p>
                          </>
                        ) : (
                          <>
                            <p>Amount: {conversionResult?.cryptoAmount} ({conversionResult?.convertedNairaAmount})</p>
                            <p>Fee: {conversionResult?.cryptoFee} ({conversionResult?.fiatFee})</p>
                            <p>You will get: {conversionResult?.cryptoAmountAfterFee} ({conversionResult?.fiatAmountAfterFee})</p>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {!conversionResult ? (
                          <>
                            <p>Amount: Calculating...</p>
                            <p>Fee: Calculating...</p>
                            <p>You will get: Calculating...</p>
                          </>
                        ) : (
                          <>
                            <p>Amount: {(conversionResult?.convertedCryptoAmount)} ({conversionResult?.convertedNairaAmount})</p>
                            <p>Fee: {(conversionResult?.fiatFee)} Naira ({conversionResult?.cryptoFee})</p>
                            <p>You will get: {(conversionResult?.fiatAmountAfterFee)} ({conversionResult?.cryptoAmountAfterFee})</p>
                          </>
                        )}
                      </>
                    )}
                    <button
                      className="transaction-btn"
                      onClick={handleTransaction}
                      disabled={isLoading || !amount || !conversionResult}
                      style={{ cursor: isLoading || !amount || !conversionResult ? "not-allowed" : "pointer" }}
                    >
                      Confirm {transactionType === 'buy' ? 'Buy' : 'Sell'}
                    </button>
                  </div>
                )}

              </div>
            </div>
          )}
          {step === 2 && (
            <div className="succe">
              <h3>Transaction Successful</h3>
              <button onClick={onClose} className="btn">Close</button>
            </div>
          )}
        </>
      </div>
    </div>
  );
};
