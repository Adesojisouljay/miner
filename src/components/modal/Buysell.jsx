import React, { useState } from "react";
import "./buysell.scss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdClose } from "react-icons/md";
import hive from "../../assets/hive-logo.png";
import usdc from "../../assets/usdc.svg";
import tusd from "../../assets/tusd.svg";
import btc from "../../assets/btc-icon.webp";
import { IoSearchOutline } from "react-icons/io5";
function Buysell({ isOpen, onClose }) {
  const [list, setList] = useState(false)
  const [topStyle, setTopStyle] = useState(1)

  const OpenList = ()=>{
    setList(true)
  }
  const closeList = ()=>{
    setList(false)
  }
  const bodyCloseList = ()=>{
    if(list === true){
      setList(false)
    }
  }

  const addPositionStyle = ()=>{
    setTopStyle(2)
  }


  const data = [
    { img: hive, coin: "Hive", amount: 11 },
    { img: usdc, coin: "Udsc", amount: 2 },
    { img: btc, coin: "Btc", amount: 8 },
    { img: tusd, coin: "TUSD", amount: 7 },
  ];
  return (
    <div className={`fadded-container modal-overlay ${isOpen ? "open" : ""}`}>
      <div className={`modal-overlay  ${isOpen ? "open" : ""}`} onClick={onClose}>
      </div>
      <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
        <div className="modal-buy-sell animate-slide-in  animate-slide-in-mobile" >
          <MdClose className="close-btn " onClick={onClose} />
          <div className="buy-sell-header">
            <h3>BUY/Sell</h3>
          </div>
          <div className="buy-sell-top-box-wrap" >
            <div className="buy-sell-top-box">
              <div className="buy-sell-top-wrap">
                <p>You Sell</p>
              </div>
              <div className="buy-sell-input-wrap">
                <input type="number" placeholder="0.00" />
                <div className="select-coin-wrap" onClick={OpenList}>
                  <img src={hive} alt="" />
                  <h3>ATOM</h3>
                  <IoIosArrowDown />
                  {/* <IoIosArrowUp /> */}
                </div>
              </div>
              <div className="available-balance-wrap">
                <h4>Balance:</h4> <span>0.00</span>
              </div>
            </div>

            <div className="buy-sell-top-box  mt">
              <div className="buy-sell-top-wrap">
                <p>You Get</p>
              </div>
              <div className="buy-sell-input-wrap">
                <input type="number" placeholder="0.00" />
                <div className="select-coin-wrap" onClick={()=>{OpenList();addPositionStyle()}}>
                  <img src={usdc} alt="" />
                  <h3>USDC</h3>
                  <IoIosArrowDown />
                  {/* <IoIosArrowUp /> */}
                </div>
              </div>
              <div className="available-balance-wrap">
                <h4>Balance:</h4> <span>0.00</span>
              </div>
            </div>
          </div>
          {/* <div className={`select-coin-list-wrap ${list && topStyle === 1 ?  "open top-1" : topStyle === 2 ? "top-2" : "" }  `}> */}
          <div className={`select-coin-list-wrap ${list ?  "open" : "" } ${topStyle === 1 ? "top-1" : topStyle === 2 ? "top-2" : "" }  `}>
            <div className="search-coin-wrap">
              <input type="text" />
              <IoSearchOutline />
            </div>
            <div className="display-coin-list-wrap">
              {data.map((data, index) => (
                <div className="coin-list" key={index} onClick={closeList}>
                  <div className="coin-img-name">
                    <img src={data.img} alt="" />
                    <span>{data.coin}</span>
                  </div>
                  <span>0.00</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buysell;
