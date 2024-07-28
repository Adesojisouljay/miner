import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import cat from "../assets/document_shape.webp";
import eth from "../assets/eth-icon.webp";
import './register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userData = { email, password, walletAddress };
      const resp = await registerUser(userData);
      console.log(resp);

      if (resp.success) {
        navigate("/login");
      } else {
        setError(resp.message);
      }
    } catch (error) {
      console.log('Error registering user:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="reg-wrap">
      <img className="img-1" src={eth} alt="ETH Icon" />
      <img className="img-2" src={cat} alt="Document Shape" />
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="reg-form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="reg-form-group">
            <label>Wallet Address</label>
            <input
              className="yep"
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter your wallet address"
              required
            />
          </div>
          <div className="reg-form-group">
            <label>Password</label>
            <input
              className="yep"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="reg-form-group">
            <label>Confirm Password</label>
            <input
              className="test"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
          {error && <span>{error}</span>}
          <button className="reg-btn" type="submit">Register</button>
        </form>
        <div className="reg-link">
          <span>Already have an account? <Link className="login-span" to="/login">Login</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
