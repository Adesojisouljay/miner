import React from 'react'
import "./hero.css"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import btc from "../../assets/btc-icon.webp"
import btc from "../../assets/btc-icon.webp"
import safe from "../../assets/safe-icon.webp"

export default function Hero() {
  return (
    <div>
        <div className="hero-wrap"  data-aos="fade-up"
     data-aos-duration="3000">
            <div className="hero-content-wrap">
                <div className="hero-container-wrap">
                <h1 className="title">Welcome to CryptoMine</h1>
                <h3>Earn 15% Annual Percentage Rate (APR)</h3>
                <div className="p-text">
                <p>Start mining cryptocurrency today and earn rewards! Opt out anytime and withdrawals are processed at the end of each month. Withdrawal requests take 4 days to complete.</p>
                </div>
                <Link to="/register">
                  <button className="btn-start">Get Started</button>
                </Link>
                <img className="hero-btc-img" src={btc} alt="" />
                <img className="hero-safe-img" src={safe} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}
