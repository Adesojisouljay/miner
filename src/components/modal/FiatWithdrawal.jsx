import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { requestWithdrawalToken, requestFiatWithdrawal } from '../../api/ekzat';
import { getUserProfile } from '../../api/profile';
import './fiat-withdrawal.scss';
import { Link } from 'react-router-dom';

export const FiatWithdrawalModal = ({ isOpen, onClose }) => {
  const user = useSelector(state => state?.ekzaUser?.user);
  const dispatch = useDispatch();

  const [selectedAccount, setSelectedAccount] = useState(user?.accounts ? user?.accounts[0] : {});
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalToken, setWithdrawalToken] = useState('');
  const [requestedToken, setRequestedToken] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    let timer;
    if (tokenExpiry && isOpen) {
      timer = setInterval(() => {
        const now = Date.now();
        const timeLeft = Math.max(0, Math.floor((tokenExpiry - now) / 1000));
        setTimeRemaining(timeLeft);

        if (timeLeft === 0) {
          clearInterval(timer);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [tokenExpiry, isOpen]);

  const handleAccountChange = (e) => {
    const account = user?.accounts.find(account => account.accountNumber === e.target.value);
    setSelectedAccount(account);
  };

  const handleRequestToken = async () => {
    if (!withdrawalAmount) {
      toast.error("Please enter a withdrawal amount.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await requestWithdrawalToken();
      if (response.success) {
        toast.success('Withdrawal token sent to your email');
        setRequestedToken(true);
        const expiryTime = Date.now() + 15 * 60 * 1000;
        setTokenExpiry(expiryTime);
        setTimeRemaining(15 * 60);
      } else {
        toast.error(response.message || 'Failed to request withdrawal token');
      }
    } catch (error) {
      toast.error('Failed to request withdrawal token');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!withdrawalAmount || !selectedAccount.accountNumber || !withdrawalToken) {
      toast.error("Please enter an amount, select an account, and enter the withdrawal token.");
      return;
    }

    try {
      setIsLoading(true);
      const withdrawalData = {
        amount: withdrawalAmount,
        accountNumber: selectedAccount.accountNumber,
        withdrawalToken
      }
      const response = await requestFiatWithdrawal(withdrawalData);

      if (response.success) {
        getUserProfile(dispatch)
        toast.success('Withdrawal request placed successfully');
        onClose();
      } else {
        toast.error(response.message || 'Withdrawal request failed');
      }
    } catch (error) {
      toast.error('Error processing withdrawal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fadded-container modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal animate-slide-in animate-slide-in-mobile">
        <span className="close-btn" onClick={onClose}>X</span>
        <h2>Fiat Withdrawal</h2>
        {user?.accounts?.length === 0 ? 
        <>
          <h5>No account added yet</h5>
          <Link to="/accounts">Add Abank account now</Link>
        </> : 
        <>
          {!requestedToken ? (
            <>
              <div className="withdrawal-amount">
                <label htmlFor="amount">Withdrawal Amount:</label>
                <input
                  id="amount"
                  type="number"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  min="0"
                  step="any"
                  required
                />
              </div>
              <div className="bank-accounts">
                <label htmlFor="account-select">Select Bank Account:</label>
                <select
                  id="account-select"
                  onChange={handleAccountChange}
                  value={selectedAccount.accountNumber || ''}
                >
                  {user?.accounts?.map((account, i) => (
                    <option key={i} value={account.accountNumber}>
                      {account.bankName} - {account.accountNumber}
                    </option>
                  ))}
                </select>
                {selectedAccount.accountNumber && (
                  <div className="account-details">
                    <p><strong>Bank Name:</strong> {selectedAccount.bankName}</p>
                    <p><strong>Account Name:</strong> {selectedAccount.accountName}</p>
                    <p><strong>Account Number:</strong> {selectedAccount.accountNumber}</p>
                  </div>
                )}
              </div>
              <button 
                className="submit-btn" 
                onClick={handleRequestToken} 
                disabled={isLoading || !withdrawalAmount || timeRemaining > 0}
              >
                {isLoading ? 'Requesting Token...' : 'Request Withdrawal Token'}
              </button>
            </>
          ) : (
            <>
              <div className="withdrawal-token">
                <label htmlFor="token">Withdrawal Token:</label>
                <input
                  id="token"
                  type="text"
                  value={withdrawalToken}
                  onChange={(e) => setWithdrawalToken(e.target.value)}
                  required
                />
              </div>
              <div className="token-info">
                {timeRemaining > 0 && (
                  <p>Token expires in {Math.floor(timeRemaining / 60)}:{timeRemaining % 60} minutes</p>
                )}
                {timeRemaining === 0 && (
                  <button 
                    className="resend-token-btn" 
                    onClick={handleRequestToken} 
                    disabled={isLoading || !withdrawalAmount}
                  >
                    {isLoading ? 'Requesting Token...' : 'Request New Token'}
                  </button>
                )}
              </div>
              <button 
                className="submit-btn" 
                onClick={handleSubmit} 
                disabled={isLoading || !withdrawalToken || !withdrawalAmount || !selectedAccount.accountNumber}
              >
                {isLoading ? 'Processing Withdrawal...' : 'Submit Withdrawal'}
              </button>
            </>
          )}
        </>
        }

      </div>
    </div>
  );
};
