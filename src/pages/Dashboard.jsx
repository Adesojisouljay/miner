import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegEye } from "react-icons/fa";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { FaGift } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa";
import { DepositHiveModal } from "../components/modal/DepositHive";
import { fetchTransactionHistory } from "../api/transaction";
import "./dashboard.scss";
import { WithdrawalModal } from "../components/modal/WithdrawalModal";
import Fiatdeposit from "../components/modal/Fiatdeposit";
import { DepositModal } from "../components/modal/FiatTransfer";

export default function Dashtest() {
  const user = useSelector((state) => state.apexMiner.user);
  const assets = user?.assets || [];

  const [isOpen, setIsOpen] = useState(false);
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [trxHistory, setTrxHistory] = useState([]);
  const [action, setAction] = useState(false);
  const [fiatDopositOpen, setFiatDopositOpen] = useState(false);
  const [fiatTransferOpen, setFiatTransferOpen] = useState(false);
  
  const actionToggle = () => {
    setAction(!action);
  };

  const actionToggleClose = () => {
    if( action === true){
      setAction(false);
    }
    
  };

  const openFiatDepositModal = () => {
    setFiatDopositOpen(true);
  };

  const openFiatTransferModal = () => {
    setFiatTransferOpen(true);
  };

  const closeFiatTransferModal = () => {
    setFiatTransferOpen(false);
  };

  const closeFiatDepositModal = () => {
    setFiatDopositOpen(false);
  };
  const openDepositModal = (asset) => {
    setIsOpen(true);
  };

  const closeDepositModal = () => {
    setIsOpen(false);
  };

  const openWithdrawalModal = (asset) => {
    setWithdrawalOpen(true);
  };

  const closeWithdrawalModal = () => {
    setWithdrawalOpen(false);
  };

  useEffect(() => {
    getTrx();
  }, [trxHistory]);

  const getTrx = async () => {
    try {
      const data = await fetchTransactionHistory();
      if (data.success) {
        setTrxHistory(data.transactionH);
      } else {
        console.error("Failed to fetch transaction history:", data.message);
      }
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  return (
    <div className="dashboard-container" onClick={actionToggleClose}>
      <div className="dashboard-wrap">
        <div className=" total-balance-wrap">
          <div className="total-left border-transparent">
            <div className="kingsley-to decide-and-style">
              <div className="currency">
                <span>Currency</span>
                <select name="" id="">
                  <option value="Ngn">NGN</option>
                  <option value="Ngn">USD</option>
                </select>
              </div>
              <div className="total-left-wrap">
                <h3>Total balance:</h3>
                <h2>
                  <span className="strike-naira">N</span>
                  {user?.totalNairaValue?.toFixed(3)}
                </h2>
              </div>
            </div>
            <FaRegEye />
          </div>
          <div className="total-right border-transparent">
            <h4>Bronze Merbership</h4>
            <FaRegCircleQuestion />
            <FaRegEye />
          </div>
        </div>
          <div className="funding-wrap">
            <button onClick={() => openDepositModal(assets[0])}>Receive</button>
            <button onClick={openWithdrawalModal}>Send</button>
            <button onClick={openFiatTransferModal}>Fiat Transfer</button>
            <button onClick={openFiatDepositModal}>Fiat Deposit</button>
            <button className="" onClick={actionToggle}>
              Buy/Sell
            </button>
            {action && 
            <div className="action-btn-wrap border-transparent">
             <h3 className="border-transparent" onClick={actionToggle}>Buyuuuu</h3>
             <h3 className="border-transparent" onClick={actionToggle}>Sell</h3>
            </div>}
          </div>
        <div className="portfolio-reward-wraper">
          <div className="card-wrap border-transparent">
            <div className="card-title-wrap">
              <div className="card-icon">
                <FaGift size={20} />
              </div>
              <h4>Assets</h4>
            </div>

            <div className="card-bal">
              <h2>${user?.totalUsdValue?.toFixed(3)}</h2>
              <h2>
                <span className="strike-naira">N</span>
                {user?.totalNairaValue?.toFixed(3)}
              </h2>
            </div>
          
            <div className="card-component-wrap">
              {user?.assets?.map((u) => (
                <div className="card-component-1 border-line">
                  <div className="card-reward-wrap liquid-asset-wrap">
                    <img src={u.image} alt="" />
                    <div className="reward-value">
                      <h5>{u.currency.toUpperCase()}</h5>
                      <p>{u.balance?.toFixed(3)}</p>
                    </div>
                  </div>
                  <div className="btn-deposit-withdrwal">
                    <button onClick={() => openDepositModal(u)}>Deposit</button>
                    <button>Withdraw</button>
                    <button>Buy/Sell</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="big-card-wrap">
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
                  {trxHistory?.length === 0 && (
                    <tr className="no-history">
                      <td colSpan="5">
                        <p>No History</p>
                      </td>
                    </tr>
                  )}
                  {trxHistory?.map((t) => (
                    <tr key={t.trxId}>
                      <td className="currency-wrap">
                        {/* to be fixed */}
                        <img src={"hive"} alt="" />
                        <span>{t.currency}</span>
                      </td>
                      <td
                        className={
                          t.type === "deposit"
                            ? "deposit"
                            : t.type === "withdrawal"
                            ? "withdrawal"
                            : ""
                        }
                      >
                        ${t.amount}
                      </td>
                      <td>
                        {t.trxId.slice(0, 5)}...{t.trxId.slice(-5)}
                      </td>
                      <td>{new Date(t.timestamp).toLocaleDateString()}</td>
                      <td
                        className={
                          t.type === "deposit"
                            ? "deposit"
                            : t.type === "withdrawal"
                            ? "withdrawal"
                            : ""
                        }
                      >
                        {t.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="copy-right-wrap">
          <FaRegCopyright />
          <p> Sojminer,All Rights Reserved </p>
        </div>
      </div>
      {isOpen && <DepositHiveModal
        isOpen={isOpen}
        assets={assets}
        onClose={closeDepositModal}
      />}
      {withdrawalOpen && <WithdrawalModal isOpen={withdrawalOpen} assets={assets} onClose={closeWithdrawalModal}/>}
      {fiatTransferOpen && <DepositModal isOpen={fiatTransferOpen} onClose={closeFiatTransferModal}/>}
      {fiatDopositOpen && <Fiatdeposit onClose={closeFiatDepositModal } isOpen={fiatDopositOpen} />}
      <div className="copy-right-wrap">
       <FaRegCopyright />
       <p>Sojminer,All Rights Reserved </p>
      </div>
      </div>
  );
}
