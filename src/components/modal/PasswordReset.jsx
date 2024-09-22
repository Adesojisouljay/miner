import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { requestToken, resetPassword } from '../../api/ekzat';
import { Loader } from '../loader/Loader';
import { BsEyeFill } from 'react-icons/bs';
// import './deposit-modal.scss';
// import './password-reset.scss';


export const PasswordReset = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const [requestedToken, setRequestedToken] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("")

  const notAllowed = loading || !newPassword || !confirmNewPassword;

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

  const requestResetToken = async () => {
    if (!newPassword) {
      toast.error("Please enter a new password.", {
        style: {
          backgroundColor: 'rgba(229, 229, 229, 0.1)',
          color: '#fff',
          fontSize: '16px',
          marginTop: "60px"
        },
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match", {
        style: {
          backgroundColor: 'rgba(229, 229, 229, 0.1)',
          color: '#fff',
          fontSize: '16px',
          marginTop: "60px"
        },
      });
      return;
    }

    try {
      setLoading(true);
      const response = await requestToken();
      if (response.success) {
        toast.success('Password reset token sent to your email', {
          style: {
            backgroundColor: 'rgba(229, 229, 229, 0.1)',
            color: '#fff',
            fontSize: '16px',
            marginTop: "60px"
          },
        });
        setStep(2);
        const expiryTime = Date.now() + 15 * 60 * 1000;
        setTokenExpiry(expiryTime);
        setTimeRemaining(15 * 60);
      } else {
        toast.error(response.message || 'Failed to request token', {
          style: {
            backgroundColor: 'rgba(229, 229, 229, 0.1)',
            color: '#fff',
            fontSize: '16px',
            marginTop: "60px"
          },
        });
      }
    } catch (error) {
      toast.error('Failed to request token', {
        style: {
          backgroundColor: 'rgba(229, 229, 229, 0.1)',
          color: '#fff',
          fontSize: '16px',
          marginTop: "60px"
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const passwordReset = async () => {
    console.log("resetting.......")
    try {
        const newPasswordData = {
            newPassword,
            token
        }
        const response = await resetPassword(newPasswordData)
        console.log(response)

        if (response.success) {
            toast.success('Password reset successfull', {
              style: {
                backgroundColor: 'rgba(229, 229, 229, 0.1)',
                color: '#fff',
                fontSize: '16px',
                marginTop: "60px"
              },
            })
        }
        onClose()
    } catch (error) {
        console.log(error)
        toast.error('Password reset failed', {
            style: {
              backgroundColor: 'rgba(229, 229, 229, 0.1)',
              color: '#fff',
              fontSize: '16px',
              marginTop: "60px"
            },
          })
    }
  }

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className={`modal-overlay  ${isOpen ? 'open' : ''}`} onClick={onClose}> </div>
      {step === 1 && <div className="modal">
        <span className="close-modal" onClick={onClose}>X</span>
        <h2>Reset Password</h2> 
        {loading && <Loader />}
        <div className="input-group">
            <div>
                <label htmlFor="newPassword">New password</label>
                <input 
                    type="password" 
                    // id="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    placeholder="Enter new password" 
                />
                <BsEyeFill/>
          </div>
          <div>
                <label htmlFor="transfer-password">Confirm</label>
                <input 
                    type="password" 
                    // id="new-password" 
                    value={confirmNewPassword} 
                    onChange={(e) => setConfirmNewPassword(e.target.value)} 
                    placeholder="Confirm new password" 
                />
                <BsEyeFill/>
          </div>
        </div>
        <button 
          style={{cursor: notAllowed ? "not-allowed" : "pointer"}} 
          disabled={notAllowed} 
          className="deposit-btn" 
          onClick={requestResetToken}
        >Proceed</button>
      </div>}

      {step === 2 && <div className="modal">
        <span className="close-modal" onClick={onClose}>X</span>
        <h2>Enter 6 digit reset token sent to your mail</h2> 
        {loading && <Loader />}
        <div className="input-group">
          <label htmlFor="newPassword">Password Reset Token</label>
          <input 
            type="text" 
            id="token" 
            value={token} 
            onChange={(e) => setToken(e.target.value)} 
            placeholder="Enter password reset token" 
          />
        </div>
        {timeRemaining > 0 && (
            <p>Token expires in {Math.floor(timeRemaining / 60)}:{timeRemaining % 60} minutes</p>
        )}
        {timeRemaining === 0 && (
            <button 
            className="resend-token-btn" 
            onClick={requestResetToken} 
            disabled={loading || !newPassword}
            >
            {loading ? 'Requesting Token...' : 'Request New Token'}
            </button>
        )}
        <button 
          style={{cursor: notAllowed ? "not-allowed" : "pointer"}} 
          disabled={notAllowed} 
          className="deposit-btn" 
          onClick={passwordReset}
        >Proceed</button>
      </div>}
    </div>
  );
};
