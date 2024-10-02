import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaGift, FaRegEye } from "react-icons/fa";
import { FaRegCircleQuestion } from "react-icons/fa6";
// import { FaGift } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa";
import { DepositHiveModal } from "../components/modal/DepositHive";
// import { fetchTransactionHistory } from "../api/transaction";
import "./dashboard.scss";
import { WithdrawalModal } from "../components/modal/WithdrawalModal";
import Fiatdeposit from "../components/modal/Fiatdeposit";
import { DepositModal } from "../components/modal/FiatTransfer";
import { BuySellModal } from "../components/modal/BuyAndSell";
import { FiatWithdrawalModal } from "../components/modal/FiatWithdrawal";
import { setCurrency } from "../redux/currencySlice";
import { usdPrice } from "../utils";
import { ListedTokens } from "../components/listed-tokens/ListedTokens";
import { TbTransferIn, TbTransferOut } from "react-icons/tb";
import { HiCircleStack } from "react-icons/hi2";
import hive from "../assets/hive-logo.png"
import { TransactionHistory } from "../components/transaction-history/TransactionHistory";
import { FiSearch } from "react-icons/fi";
import DBTransctionHistory from "../components/transaction-history/DBTransctionHistory";
import usdt from "../assets/usdt.svg";
import usdc from "../assets/usdc.svg";
import { BuySell } from "../components/modal/BuySell";
import { currenciesList } from "../vairables/protectedRoutes";
import { GeneralDropdown } from "../components/dropdown/GeneralDrpdpown";

const quotes = [
  "The only way to do great work is to love what you do. - Kesolink",
  "Success is not the key to happiness. Happiness is the key to success. - Souljay",
  "In the middle of every difficulty lies opportunity. - Souljay",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you. - Kesolink",
  "Great things never come from comfort zones. - Kesolink",
  "Dream it. Wish it. Do it. - Souljay",
  "Success doesn’t just find you. You have to go out and get it. - Kesolink"
];

const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

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
  const [transactionType, setTransactionType] = useState('buy');
  const [showBalance, setShowBalance] = useState(false);
  const [activeTab, setActiveTab] = useState('coin-price'); // Default to 'coin-price'
  const [searchQueryCoinPrice, setSearchQueryCoinPrice] = useState('');
  const [showMore, setShowMore] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(getRandomQuote());
  const [buySellOpen, setBuySellOpen] = useState(false);
  const [openList, setOpenList] = useState(false);
  // selected 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(getRandomQuote());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   if (selectedCurrency) {
  //     document.getElementById('currencySelect').value = selectedCurrency;
  //   }
  // }, [selectedCurrency]);
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
};
  
 const handleShowMore = () =>{
  setShowMore(!showMore)
 }

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

  // const openBuySellModal = (type) => {
  //   setTransactionType(type);
  //   setBuySellOpen(true);
  // };

  // const closeBuySellModal = () => {
  //   setBuySellOpen(false);
  // };

  const openBuySellModal = (type) => {
    setTransactionType(type);
    setBuySellOpen(true);
  };
  const closeBuySellModal = () => {
    setBuySellOpen(false);
  };

  const handleCurrencyChange = (currency) => {
    console.log(currency)
    const selectedC = currenciesList.find(c => c.name === currency);
    console.log(selectedC)
    dispatch(setCurrency(currency));
  };

  const handleOpenList = () => {
    setOpenList(!openList);
  };

  return (
    <div className="dashboard-container" onClick={actionToggleClose}>
      <div className="dashboard-content">
      <div className="greetings-container">
        {/* <span className="welcome-greetings">Welcome to Ekzatrade😊! Where you Experience boundless crypto💰 transactions. Ekzatrade gives you the power to own you own crypto bank🏦</span> */}
      </div>
        <div className={`dashboard-content-wrap `}>
          <div className="dashboard-main border-transparent">
            <div className="bal-top-wrap">
              <div className="total-fait-wrap">
               <div className="bal-text-select-wrap">
                {/* <h2>Balance</h2>  */}

                <GeneralDropdown
                  items={currenciesList}
                  setSelectedItem={handleCurrencyChange} 
                  handleOpenList={handleOpenList} 
                  openList={openList}
                  itemName={selectedCurrency}
                />

               </div>
                <div className="bal-show-wrap">{showBalance ? <h3>********</h3> : <span>
                  <span className="dashboard-currency-symbol">{isUsd ? "$" : "N"}</span>
                  {isUsd ? (user?.nairaBalance / usdPrice)?.toFixed(3) : user?.nairaBalance.toFixed(3)}
                </span>}</div>
              </div>
              <div className="bal-action-wrap">
               <FaRegEye className="show-balance" onClick={toggleBalanceView} />
              </div>
            </div>
            <div className="bal-btn-wrap-main">
            <div className={`show-more-wrap ${!showMore ? "margin-bottom-large" : "margin-bottom-small"}`}>
              <span className="show-more" onClick={handleShowMore }>{!showMore ? "Show more" : "Show less"}</span>
            </div>
            <div className="bal-btn-wrap">
              <span className="bal-btn" onClick={() => openDepositModal(assets[0])}>
                <div className="bal-icon-wrap">
                <HiCircleStack />
                </div>
                <span>Receive Crypto</span>
              </span>
              <span className="bal-btn" onClick={openWithdrawalModal}>
                <div className="bal-icon-wrap">
                <HiCircleStack />
                </div>
                <span>Send Crypto</span>
              </span>
    
              <span className="bal-btn" onClick={()=> openBuySellModal("buy")}>
                <div className="bal-icon-wrap">
                <HiCircleStack />
                </div>
                <span>Buy</span>
              </span>

              <span className="bal-btn" onClick={()=> openBuySellModal("sell")}>
                <div className="bal-icon-wrap">
                <HiCircleStack />
                </div>
                <span>Sell</span>
              </span>
          
              <span className={`bal-btn-less ${!showMore ? "display-none" : "display-block"}`} onClick={openFiatTransferModal}>
                <div className="bal-icon-wrap">
                <HiCircleStack />
                </div>
                <span>Fiat Transfer</span>
              </span>

              <span className={`bal-btn-less ${!showMore ? "display-none" : "display-block"}`} onClick={openFiatDepositModal}>
                <div className="bal-icon-wrap">
                <HiCircleStack />
                </div>
                <span>Fiat Deposit</span>
              </span>

              <span className={`bal-btn-less ${!showMore ? "display-none" : "display-block"}`} onClick={openFiatWithdrawalModal}>
                <div className="bal-icon-wrap">
                <HiCircleStack />
                </div>
                <span>Fiat Withdrawal</span>
              </span>

              <span className={`bal-btn-less ${!showMore ? "display-none" : "display-block"}`} onClick={openFiatWithdrawalModal}>
                <div className="bal-icon-wrap">
                <HiCircleStack />
                </div>
                <span>Swap</span>
              </span>

            </div>
            </div>

          </div>

          {/* <div className="dashboard-quotes-section">
              <h2>Motivational Quotes</h2>
              <img className="quote-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROhuTdLL3qV-93rNnSS-4R2vVPcdVyKOJ6KA&s" alt="" />
              <p>{currentQuote}</p>
            </div> */}
          <div className="portfolio-reward-wraper">
          <div className="card-wrap border-transparent">
            <div className="card-title-wrap">
              <div className="card-icon">
                <FaGift size={20} />
              </div>
              <h4>Assets</h4>
            </div>
          
            <div className="card-component-wrap">
                <div className="  card-component-1 border-line">
                  <div className="coin-wrap">
                    <img src={hive} alt="" />
                    <div className="">
                      <h5>Hive</h5>
                    </div>
                  </div>
                  <div> <span>N0.00</span> </div>
                  <span>0.00()</span>
                  <div className="btn-deposit-withdrwal">
                    <button>Withdraw</button>
                    <button>Buy/Sell</button>
                  </div>
                </div>
                <div className="  card-component-1 border-line">
                  <div className="coin-wrap">
                    <img src={usdt} alt="" />
                    <div className="">
                      <h5>Usdt</h5>
                    </div>
                  </div>
                  <div> <span>N0.00</span> </div>
                  <span>0.00()</span>
                  <div className="btn-deposit-withdrwal">
                    <button>Withdraw</button>
                    <button>Buy/Sell</button>
                  </div>
                </div>
                <div className="  card-component-1 border-line">
                  <div className="coin-wrap">
                    <img src={usdc} alt="" />
                    <div className="">
                      <h5>Usdc</h5>
                    </div>
                  </div>
                  <div> <span>N0.00</span> </div>
                  <span>0.00()</span>
                  <div className="btn-deposit-withdrwal">
                    <button>Withdraw</button>
                    <button>Buy/Sell</button>
                  </div>
                </div>
                <div className={` ${!showMore ? "display-none":"card-component-1 border-line"}`}>
                  <div className="coin-wrap">
                    <img src={usdc} alt="" />
                    <div className="">
                      <h5>Usdc</h5>
                    </div>
                  </div>
                  <div> <span>N0.00</span> </div>
                  <span>0.00()</span>
                  <div className="btn-deposit-withdrwal">
                    <button>Withdraw</button>
                    <button>Buy/Sell</button>
                  </div>
                </div>

            </div>
          </div>
        </div>
        </div>
    <div className="bal-big-container-wrap">
        <div className="tabs-wrap">
            <div className="left-tabs-wrap">
                <div
                    className={`coin-price ${activeTab === 'coin-price' ? 'activetab' : ''}`}
                    onClick={() => handleTabClick('coin-price')}
                >
                    Coin Price
                </div>
                <div
                    className={`transaction ${activeTab === 'transaction' ? 'activetab' : ''}`}
                    onClick={() => handleTabClick('transaction')}
                >
                    Transaction
                </div>
                <div
                    className={`staked-asset ${activeTab === 'stake' ? 'activetab' : ''}`}
                    onClick={() => handleTabClick('stake')}
                >
                    Stake Asset
                </div>
            </div>

            <div className="right-tabs-wrap">
                <input className={`search-bal-input ${activeTab === 'transaction' ? 'activetab' : ''}`} type="text" placeholder="Search..." />
                <input className={`search-coin-price ${activeTab === 'coin-price' ? 'activetab' : ''}`} type="text" placeholder=" name or ID..."  value={searchQueryCoinPrice}
                    onChange={(e) => setSearchQueryCoinPrice(e.target.value)}/>
                <FiSearch size={19} />
            </div>
        </div>

        <div className="display-area">
            <div className={`coin-price-component ${activeTab === 'coin-price' ? 'activetab' : ''}`}>
                <ListedTokens setSearchQuery={setSearchQueryCoinPrice} searchQuery={searchQueryCoinPrice} openBuySellModal={openBuySellModal}  />
            </div>
            <div className={`transction-component ${activeTab === 'transaction' ? 'activetab' : ''}`}>
                <DBTransctionHistory  />
            </div>
            <div className={`stake-component ${activeTab === 'stake' ? 'activetab' : ''}`}>
              <h1>Staking is coming soon</h1>
            </div>
        </div>
    </div>
        <div className="dashboard-footer">
          <FaRegCopyright />
          <p>Ekzatrade, All Rights Reserved</p>
        </div>
      </div>
      {isOpen && <DepositHiveModal
        isOpen={isOpen}
        assets={assets}
        onClose={closeDepositModal}
        user={user}
      />}
      {buySellOpen && (
        <BuySellModal
          isOpen={buySellOpen}
          onClose={closeBuySellModal}
          assets={assets}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
      )}
      {buySellOpen && (
        <BuySell
          isOpen={buySellOpen}
          onClose={closeBuySellModal}
          assets={assets}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
      )}
      {withdrawalOpen && 
      <WithdrawalModal 
        isOpen={withdrawalOpen} 
        assets={assets} 
        onClose={closeWithdrawalModal}
        user={user}
      />}
      {fiatTransferOpen && <DepositModal isOpen={fiatTransferOpen} onClose={closeFiatTransferModal} />}
      {fiatDepositOpen && <Fiatdeposit onClose={closeFiatDepositModal} isOpen={fiatDepositOpen} />}
      {fiatWithdrawalOpen && <FiatWithdrawalModal onClose={closeFiatWithdrawalModal} isOpen={fiatWithdrawalOpen} assets={assets} />}
    </div>
  );
}
