import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { BuySellModal } from "../components/modal/BuyAndSell";
import { FiatWithdrawalModal } from "../components/modal/FiatWithdrawal";
import { setCurrency } from "../redux/currencySlice";
import { usdPrice } from "../utils";
import { ListedTokens } from "../components/listed-tokens/ListedTokens";

export const Dashboard = () => {
  const user = useSelector((state) => state.ekzaUser.user);
  const selectedCurrency = useSelector((state) => state.currency.selectedCurrency);
  const dispatch = useDispatch();
  const assets = user?.assets || [];
  const isUsd = selectedCurrency === "USD";

  const [isOpen, setIsOpen] = useState(false);
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [action, setAction] = useState(false);
  const [fiatDepositOpen, setFiatDepositOpen] = useState(false);
  const [fiatWithdrawalOpen, setFiatWithdrawalOpen] = useState(false);
  const [fiatTransferOpen, setFiatTransferOpen] = useState(false);
  const [buySellOpen, setBuySellOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('buy');
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    if (selectedCurrency) {
      document.getElementById('currencySelect').value = selectedCurrency;
    }
  }, [selectedCurrency]);

  const actionToggle = () => {
    setAction(!action);
  };

  const actionToggleClose = () => {
    if (action === true) {
      setAction(false);
    }
  };

  const toggleBalanceView = () => {
    setShowBalance(!showBalance);
  };

  const openFiatDepositModal = () => {
    setFiatDepositOpen(true);
  };

  const openFiatTransferModal = () => {
    setFiatTransferOpen(true);
  };

  const closeFiatTransferModal = () => {
    setFiatTransferOpen(false);
  };

  const closeFiatDepositModal = () => {
    setFiatDepositOpen(false);
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

  const openFiatWithdrawalModal = () => {
    setFiatWithdrawalOpen(true);
  };

  const closeFiatWithdrawalModal = () => {
    setFiatWithdrawalOpen(false);
  };

  const handleCurrencyChange = (currency) => {
    dispatch(setCurrency(currency));
  };

  const openBuySellModal = (type) => {
    setTransactionType(type);
    setBuySellOpen(true);
  };

  const closeBuySellModal = () => {
    setBuySellOpen(false);
  };

  return (
    <div className="dashboard-container" onClick={actionToggleClose}>
      <div className="dashboard-content">
        <div className="dashboard-balance">
          <div className="dashboard-balance-left">
            <div className="dashboard-balance-info">
              <div className="dashboard-currency-select">
                <select
                  name=""
                  id="currencySelect"
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                >
                  <option value="NGN">NGN</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <div className="dashboard-balance-amount">
                <h3>Total balance:</h3>
                {showBalance ? <h3>********</h3> : <h2>
                  <span className="dashboard-currency-symbol">{isUsd ? "$" : "N"}</span>
                  {isUsd ? (user?.nairaBalance / usdPrice)?.toFixed(3) : user?.nairaBalance.toFixed(3)}
                </h2>}
              </div>
            </div>
            <FaRegEye onClick={toggleBalanceView} />
          </div>
          <div className="dashboard-balance-right">
            <h4>Bronze Membership</h4>
            <FaRegCircleQuestion />
            <FaRegEye />
          </div>
        </div>
        <div className="dashboard-funding">
          <button onClick={() => openDepositModal(assets[0])}>Receive</button>
          <button onClick={openWithdrawalModal}>Send</button>
          <button onClick={openFiatTransferModal}>Fiat Transfer</button>
          <button onClick={openFiatDepositModal}>Fiat Deposit</button>
          <button onClick={openFiatWithdrawalModal}>Fiat Withdrawal</button>
          <button className="dashboard-buy-sell-btn" onClick={() => openBuySellModal('buy')}>
            Buy/Sell
          </button>
          {action &&
            <div className="dashboard-action-buttons">
              <h3 onClick={actionToggle}>Buy</h3>
              <h3 onClick={actionToggle}>Sell</h3>
            </div>}
        </div>
        <div>
          <ListedTokens />
        </div>
        <div className="dashboard-footer">
          <FaRegCopyright />
          <p>Adesojisouljay, All Rights Reserved</p>
        </div>
      </div>
      {isOpen && <DepositHiveModal
        isOpen={isOpen}
        assets={assets}
        onClose={closeDepositModal}
      />}
      {buySellOpen && (
        <BuySellModal
          isOpen={buySellOpen}
          onClose={closeBuySellModal}
          assets={assets}
          transactionType={transactionType}
        />
      )}
      {withdrawalOpen && <WithdrawalModal isOpen={withdrawalOpen} assets={assets} onClose={closeWithdrawalModal} />}
      {fiatTransferOpen && <DepositModal isOpen={fiatTransferOpen} onClose={closeFiatTransferModal} />}
      {fiatDepositOpen && <Fiatdeposit onClose={closeFiatDepositModal} isOpen={fiatDepositOpen} />}
      {fiatWithdrawalOpen && <FiatWithdrawalModal onClose={closeFiatWithdrawalModal} isOpen={fiatWithdrawalOpen} assets={assets} />}
    </div>
  );
}
