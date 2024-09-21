import React, { useState } from 'react'
import { Loader } from '../loader/Loader'
import { IoCloseSharp } from 'react-icons/io5'
import { usdPrice } from "../../utils";
import debounce from "lodash/debounce";
import { useDispatch } from "react-redux";
import "./test-buy-sell.scss";
import { buyAsset, sellAsset, calculateTransaction } from "../../api/ekzat";
import { formatNumbers } from "../../utils";
import { useSelector } from "react-redux";
// import { Loader } from "../loader/Loader";
import { getUserProfile } from "../../api/profile";
import { RiArrowDownSFill, RiArrowRightSFill } from "react-icons/ri";
import nigeria from "../../assets/nigria.png"
import Hive from "../../assets/hive-logo.png"
import tusd from "../../assets/tusd.svg"
import usdc from "../../assets/usdc.svg"
import usdt from "../../assets/usdt.svg"
// import { IoCloseSharp } from "react-icons/io5";
import { TbArrowsExchange2 } from "react-icons/tb";

function TestBuySell({ isOpen,onClose,assets, transactionType,setTransactionType,}) {
    const [openList, setOpenList] = useState(false)
    const [newStep, setNewStep] = useState(1); 
  const [isLoading, setIsLoading] = useState(false); 
  const data = [
    { img: nigeria, name: 'BTC' },
    { img: Hive, name: 'LTC' },
    { img: usdc, name: 'BNB' },
    { img: usdt, name: 'DASH' },
  ];

  const handleOpencoinList = () => {
    setOpenList(!openList);
  };


   
  return (
    <div>
        <div className={`fadded-container b-s-modal-overlay ${isOpen ? "open" : ""}`}>
      <div
        className={`b-s-modal-overlay  ${isOpen ? "open" : ""}`}
        onClick={onClose}
      >
        {" "}
      </div>
      <div className="b-s-modal">
        <IoCloseSharp size={18} className="close-modal" onClick={onClose} />
        {isLoading && <Loader />}
        

        <div className="buysell-container" >
        <div className="toggle-buttons">
            <button
              className={`${transactionType === 'buy' ? 'active' : 'trans'}  buy-sell-btn`}
              onClick={() => setTransactionType('buy')}
            >
              Buy
            </button>
            <button
              className={`${transactionType === 'sell' ? 'active' : 'trans'} buy-sell-btn`}
              onClick={() => setTransactionType('sell')}
            >
              Sell
            </button>
          </div>
          {newStep === 1 && (<div className="buy-sell-parent-wrap" >
          <div className="spend-wrap">
            <h3>You Send</h3>
            <div className="spend-component">
              <div className="spend-select-wrap">
                <img src={nigeria} alt="" />
                <span>NGN</span>
                <RiArrowRightSFill />
              </div>
              <input type="number" placeholder="Enter amount" />
            </div>
            <div className="fiat-bal-wrap">
              <span>Available balance:</span> <span>2000</span>
            </div>
          </div>

          <div className="get-wrap">
            <h3>You Get</h3>
            <div className="get-component">
              <div className="get-select-wrap" onClick={handleOpencoinList}>
              <img src={Hive} alt="" />
                <span>Btc</span>
                <RiArrowDownSFill />
              </div>
              <input type="number" placeholder="Enter amount" />
            </div>
            <div className={`coin-list-wrap ${openList ? "openlist": "openclose"}`}>
           {data.map((data)=> (<div className={`coin-list  `} >
              <img src={data.img} alt="" />
              <span>{data.name}</span>
            </div>))}
          </div>
          </div>

          <div className="fees-review">
                <div className="fees-rap"> <span>Amount</span>  <span>100 Hive</span></div>
                <div className="fees-rap"> <span>fee</span>  <span>2 Hive</span></div>
                <div className="fees-rap"> <span>You will get</span>  <span>98 Hive</span></div>
                <div className="fees-rap"> <span>Order Type</span>  <span>Buy</span></div>
                <div className="fees-rap"> <span>Tradibg Bounce</span>  <span>0.30</span></div>
          </div>
          
          

          <div className="buy-sell-btn-wrap" >
          <button className="buy-sell-btn" onClick={()=>{setNewStep(2)}}>Procced</button>
          </div>
          </div>)}
          {newStep === 2 &&(
            <div className="review-buy-sell">
              <div className="review-box-wrap">
                <div className="box-left">
                  <span>You spend</span>
                  <div className="review-coin-wrap">
                    <img src={nigeria} alt="" />
                    <span>#2000,000</span>
                  </div>
                  <span>$3.00</span>
                </div>
                <div className="arrow-right-wrap">
                <svg width="159" height="7" viewBox="0 0 159 7" fill="none" class="absolute left-1/2 top-1/2 block translate-x-[-50%] translate-y-[-50%] light:hidden mobile:hidden"><path d="M1 3.5H151" stroke="url(#paint0_linear_622_17075)" stroke-width="1.5" stroke-linecap="square" stroke-dasharray="0.1 5"></path><path d="M155 6.5L159 3.5L155 0.5" fill="#FBFBFB"></path><defs><linearGradient id="paint0_linear_622_17075" x1="146.604" y1="4.74994" x2="0.249478" y2="6.49899" gradientUnits="userSpaceOnUse"><stop stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0"></stop></linearGradient></defs></svg>
                <div className="exchange-iconwrap">
                <TbArrowsExchange2 size={24} />
                </div>
                </div>
                <div className="box-left">
                  <span>You spend</span>
                  <div className="review-coin-wrap">
                    <img src={Hive} alt="" />
                    <span>90.00</span>
                  </div>
                  <span>$3.00</span>
                </div>
                
              </div>
              <div className="rate-wrap"> 1 USDC = 0.0237 HiVE</div>

              <div className="fees-review">
                <div className="fees-rap"> <span>Amount</span>  <span>100 Hive</span></div>
                <div className="fees-rap"> <span>fee</span>  <span>2 Hive</span></div>
                <div className="fees-rap"> <span>You will get</span>  <span>98 Hive</span></div>
                <div className="fees-rap"> <span>Order Type</span>  <span>Buy</span></div>
                <div className="fees-rap"> <span>Trading Bounce</span>  <span>0.30</span></div>
              </div>

              <div className="buy-btn-wrap"><button> Buy</button></div>
            </div>


            

          )}


        </div>
      </div>
    </div>

    </div>
  )
}

export default TestBuySell