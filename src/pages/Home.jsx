import React, { useEffect } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Home = () => {
  const navigate = useNavigate()
  const global = useSelector(state => state)

  useEffect(() => {
    if(global.apexMiner.user)
    navigate("/mining")
  }, [])
  return (
    <div className="home-container">
      <div className="hero">
        <h1>Welcome to CryptoMine</h1>
        <p>A Mining Platform with 15% Annual Percentage Rate (APR)</p>
        <div className="image-container">
          <img src="https://images.ctfassets.net/q5ulk4bp65r7/77UG0yFqYxqIlehK6snIEO/ae54bbb1ad0dcf55934959bc9ade74ab/Copy_of_Learn_Illustration_What_is_Mining.jpg" alt="Mining" className="mining-image" />
        </div>
        <p>Start mining cryptocurrency today and earn rewards!</p>
        <p>Opt out anytime and withdrawals are processed at the end of each month.</p>
        <p>Withdrawal requests take 4 days to complete.</p>
        <button className="cta-button">Get Started</button>
      </div>
    </div>
  );
};

