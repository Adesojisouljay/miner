import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./dashtest.scss";
import { FaRegEye } from "react-icons/fa";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { HiMiniWallet } from "react-icons/hi2";
import { FaGift } from "react-icons/fa6";
import usdt from "../assets/usdt.svg";
import dai from "../assets/dai.svg";
import usdc from "../assets/usdc.svg";
import tusd from "../assets/tusd.svg";
import hive from "../assets/hive-logo.png";
import hbd from "../assets/hbdl.png";
import { FaRegCopyright } from "react-icons/fa";
import { DepositHiveModal } from "../components/modal/DepositHive";
import { fetchTransactionHistory } from "../api/transaction";


export default function Dashtest() {
  const [isOpen, setIsOpen] = useState(false);
  const [trxHistory, setTrxHistory] = useState([])

  const user = useSelector(state => state.apexMiner.user)

  const openDepositModal = () => {
    setIsOpen(true)
  }
  const closeDepositModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    getTrx()
  }, [trxHistory])
  
  const getTrx = async () => {
    try {
      const data = await fetchTransactionHistory();
      if (data.success) {
        setTrxHistory(data.transactionH);
        console.log("data,", data);
        console.log("trxHistory,", trxHistory);
      } else {
        console.error("Failed to fetch transaction history:", data.message);
      }
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrap">
      <div className=" total-balance-wrap">
        <div className="total-left">
          <h3>Total balance:</h3>
          <h2>{user?.totalBalance?.toFixed(3)}</h2>
        </div>
        <div className="total-right">
          <h4>Bronze Merbership</h4>
          <FaRegCircleQuestion />
          <FaRegEye />
        </div>
      </div>
      <div className="portfolio-reward-wraper">
        <div className="card-wrap">
          <div className="card-title-wrap">
            <div className="card-icon">
              <HiMiniWallet size={20} />
            </div>
            <h4>Portfolio</h4>
          </div>

          <div className="card-bal">
            <h2>$0.00</h2>
          </div>

          <div className="card-component-wrap">
            <div className="card-component-1">
              <div className="card-list-wrap liquid-asset-wrap">
                <h5>Liqud asset</h5>
                <p>$0.00</p>
              </div>
              <div className="card-list-wrap staked-assets-wrap">
                <h5>Staked Assets</h5>
                <p>$0.00</p>
              </div>
              <div className="card-list-wrap liquidity-positions-wrap">
                <h5>Staked Assets</h5>
                <p>$0.00</p>
              </div>
            </div>
            <div className="card-component-2">
              <div className="card-list-wrap Leverage-wrap">
                <h5>Leverage LP</h5>
                <p>$0.00</p>
              </div>
              <div className="card-list-wrap perpetual-positions-wrap">
                <h5>Perpetual Positions</h5>
                <p>$0.00</p>
              </div>
              <div className="card-list-wrap Borrows-wrap">
                <h5>Borrows</h5>
                <p>$0.00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-wrap">
          <div className="card-title-wrap">
            <div className="card-icon">
              <FaGift size={20} />
            </div>
            <h4>Assets</h4>
          </div>

          <div className="card-bal">
            <h2>$0.00</h2>
          </div>

          <div className="card-component-wrap">
            <div className="card-component-1">
              <div className="card-reward-wrap liquid-asset-wrap">
                <img src={usdt} alt="" />
                <div className="reward-value">
                  <h5>USDT</h5>
                  <p>$0.00</p>
                </div>
              </div>
              <div className="card-reward-wrap staked-assets-wrap">
              <img src={usdc} alt="" />
                <div className="reward-value">
                  <h5>USDC</h5>
                  <p>0.00</p>
                </div>
              </div>
              
            </div>
            <div className="card-component-2">
              <div className="card-reward-wrap Leverage-wrap">
              <img src={hbd} alt="" />
                <div className="reward-value">
                  <h5>HBD</h5>
                  <p>{user?.hbdBalance?.toFixed(3)}</p>
                </div>
              </div>
              <div className="card-reward-wrap perpetual-positions-wrap">
              <img src={hive} alt="" />
                <div className="reward-value">
                  <h5>HIVE</h5>
                  <p>{user?.hiveBalance?.toFixed(3)}</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <div className="big-card-wrap">
        <div className="funding-wrap">
          <button onClick={openDepositModal}>Deposit</button>
          <button>Withdraw</button>
          <button>Buy</button>
          <button>Sell</button>
        </div>
        <div className="mining-value-wrap">
          <div className="mine-wrap">
          <h3>Mining: <span>0.0000000048/sec</span></h3>
          <h3 className="mine-rate">Mining Rate:<span>0.00000048</span> </h3>
          </div>
          <h3 className="total-mine">Total Mined: <span>0.0000000713</span></h3>

        </div>
        <div className="histroy-wrap">
          <h3>Transaction History</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>Amout</th>
                  <th>TxId</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {trxHistory?.length === 0 && <p>Loading...</p>}
                {trxHistory?.map(t => (
                  <tr key={t.trxId}>
                    <td className="currency-wrap">
                      <img src={dai} alt="" />
                      <span>{t.currency}</span>
                    </td>
                    <td>${t.amount}</td>
                    <td>{t.trxId.slice(0, 5)}...{t.trxId.slice(-5)}</td>
                    <td>{new Date(t.timestamp).toLocaleDateString()}</td>
                    <td>{t.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="copy-right-wrap">
       <FaRegCopyright />
       <p>Sojminer,All Rights Reserved </p>
      </div>
      </div>
      <DepositHiveModal isOpen={isOpen} onClose={closeDepositModal}/>
    </div>
  );
}