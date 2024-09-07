import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { IoIosCopy } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { getRandomMerchant, createNairaDepositRequest } from '../api/ekzat';
import { Loader } from '../components/loader/Loader';
import { copyToClipboard } from '../utils';
import './fiat-deposit.scss';

export const FiatDepositPage = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [step, setStep] = useState(1);
  const [merchantInfo, setMerchantInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [depositType, setDepositType] = useState("bank");
  const navigate = useNavigate();

  const notAllowed = !depositAmount || Number(depositAmount) < 1000;

  const handleDepositTypeChange = (type) => {
    setDepositType(type);
    setStep(1);
  };

  const handleProceed = () => {
    if (depositType === "bank") {
      getMerchant();
    } else if (depositType === "p2p") {
      navigate(`/merchants?amount=${encodeURIComponent(depositAmount)}`);
    }
  };  

  const getMerchant = async () => {
    setLoading(true);
    try {
      const merchantData = await getRandomMerchant();
      if (notAllowed) {
        setLoading(false);
        toast.warning("Invalid amount, amount must be at least 1000", {
          style: {
            backgroundColor: 'rgba(229, 229, 229, 0.1)',
            color: '#fff',
            fontSize: '16px',
            marginTop: "60px"
          },
        });
        return;
      }
      setMerchantInfo(merchantData);
      setStep(2);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const createDeposit = async () => {
    setLoading(true);
    const depositData = {
      amount: depositAmount,
      narration: merchantInfo.narration,
      merchantId: merchantInfo.data._id,
    };
    try {
      await createNairaDepositRequest(depositData);
      toast.success("Deposit request made successfully", {
        style: {
          backgroundColor: 'rgba(229, 229, 229, 0.1)',
          color: '#fff',
          fontSize: '16px',
          marginTop: "60px"
        },
      });
      setDepositAmount("");
      setStep(1);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="fiat-deposit-pge">
      {loading && <Loader />}
      <div className="fiat-deposit-conent">
        {step === 1 && (
          <div className="fiat-deposit-wrp">
            <h3>Fiat Deposit</h3>
            <div className="deposit-type-selector">
              <button
                className={depositType === "bank" ? "active" : ""}
                onClick={() => handleDepositTypeChange("bank")}
              >
                Bank Deposit with Merchant
              </button>
              <button
                className={depositType === "p2p" ? "active" : ""}
                onClick={() => handleDepositTypeChange("p2p")}
              >
                P2P Deposit with Merchant
              </button>
            </div>
            <div className="fiat-depsit-amount">
              <h2>{depositType}</h2>
              <label>Enter amount to Deposit</label>
              <input
                type="number"
                placeholder="Enter Amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </div>
            <button
              style={{ cursor: notAllowed ? "not-allowed" : "pointer", width: "100%" }}
              disabled={notAllowed}
              onClick={handleProceed}
              className="btn"
            >
              Proceed
            </button>
          </div>
        )}
        {step === 2 && depositType === "bank" && (
          <div className="bank-peer-wrap">
            <div className="deposit-head-text-wrap">
              <h2>Deposit Details</h2>
              <p className="warning-text">Note: Narration is very necessary for us to identify your deposit.</p>
            </div>
            <div className="bank-details-wrap">
              <div className="detail-item">
                <h4>Amount:</h4>
                <span className='copy-text-wrap'>
                  ₦{depositAmount}
                  <IoIosCopy onClick={() => copyToClipboard(`${depositAmount}`)} />
                </span>
              </div>
              <div className="detail-item">
                <h4>Narration:</h4>
                <span className='copy-text-wrap'>
                  {merchantInfo.narration}
                  <IoIosCopy onClick={() => copyToClipboard(merchantInfo.narration)} />
                </span>
              </div>
              <div className="detail-item">
                <h4>Merchant:</h4>
                <span className='copy-text-wrap'>
                  {merchantInfo?.data.username}
                  <IoIosCopy onClick={() => copyToClipboard(merchantInfo?.data?.username || '')} />
                </span>
              </div>
              <div className="detail-item">
                <h4>Account Number:</h4>
                <span className='copy-text-wrap'>
                  {merchantInfo?.data.accountNumber}
                  <IoIosCopy onClick={() => copyToClipboard(merchantInfo?.data.accountNumber || '')} />
                </span>
              </div>
              <div className="detail-item">
                <h4>Bank:</h4>
                <span className='copy-text-wrap'>
                  {merchantInfo?.data.bankName}
                  <IoIosCopy onClick={() => copyToClipboard(merchantInfo?.data.bankName || '')} />
                </span>
              </div>
              <div className="detail-item">
                <h4>Account Name:</h4>
                <span className='copy-text-wrap'>
                  {merchantInfo?.data.accountName}
                  <IoIosCopy onClick={() => copyToClipboard(merchantInfo?.data.accountName || '')} />
                </span>
              </div>
            </div>
            <button
              onClick={createDeposit}
              className="done-transfer-btn"
            >
              I have made payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
