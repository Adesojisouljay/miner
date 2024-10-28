import React, { useEffect, useState } from "react";
import "./walletmain.scss";
import { IoIosEyeOff } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { fetchCryptoData, addAsset } from "../api/ekzat";
import { useSelector, useDispatch } from "react-redux";
import "./wallet-page.scss";
import {
  FaGift,
  FaArrowUp,
  FaArrowDown,
  FaExchangeAlt,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { getUserProfile } from "../api/profile";
import { toast } from "react-toastify";
import { Loader } from "../components/loader/Loader";

function WalletMain() {
  const [cryptoData, setCryptoData] = useState([]);
  const [filteredCryptoData, setFilteredCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const user = useSelector((state) => state.ekzaUser.user);
  const selectedCurrency = useSelector(
    (state) => state.currency.selectedCurrency
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getCryptoData();
  }, []);

  const historyData = [
    {
      currency: "BTC",
      date: "2024-10-01 07:43:30",
      amount: "300.00",
      type: "Deposit",
    },
    {
      currency: "BTC",
      date: "2024-09-30 06:21:15",
      amount: "150.00",
      type: "Withdrawal",
    },
    {
      currency: "BTC",
      date: "2024-09-29 08:35:50",
      amount: "250.00",
      type: "Swap",
    },
    {
      currency: "BTC",
      date: "2024-09-28 09:17:42",
      amount: "500.00",
      type: "Transfer",
    },
    {
      currency: "BTC",
      date: "2024-09-27 10:10:30",
      amount: "120.00",
      type: "Deposit",
    },
    {
      currency: "BTC",
      date: "2024-09-26 11:45:12",
      amount: "300.00",
      type: "Withdrawal",
    },
    {
      currency: "BTC",
      date: "2024-09-25 12:00:00",
      amount: "100.00",
      type: "Transfer",
    },
    {
      currency: "BTC",
      date: "2024-09-24 01:30:50",
      amount: "400.00",
      type: "Swap",
    },
    {
      currency: "BTC",
      date: "2024-09-23 03:22:33",
      amount: "350.00",
      type: "Deposit",
    },
    {
      currency: "BTC",
      date: "2024-09-22 04:43:21",
      amount: "200.00",
      type: "Withdrawal",
    },
    {
      currency: "BTC",
      date: "2024-09-21 05:19:10",
      amount: "250.00",
      type: "Transfer",
    },
    {
      currency: "BTC",
      date: "2024-09-20 06:15:45",
      amount: "150.00",
      type: "Swap",
    },
  ];

  useEffect(() => {
    const filteredData = cryptoData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCryptoData(filteredData);
  }, [searchTerm, cryptoData]);

  const getCryptoData = async () => {
    try {
      const response = await fetchCryptoData();
      if (response?.data?.success) {
        const { usdData, ngnData } = response.data.cryptoData;
        setCryptoData(selectedCurrency === "USD" ? usdData : ngnData);
        setFilteredCryptoData(selectedCurrency === "USD" ? usdData : ngnData);
      } else {
        setError(response?.data?.message || "Failed to fetch data.");
      }
    } catch (error) {
      setError("An error occurred while fetching the data.");
    } finally {
      setLoading(false);
    }
  };

  const addTokenToWallet = async (coinId) => {
    setLoading(true);
    try {
      const response = await addAsset(coinId);
      if (response.success) {
        toast.success(response.message, {
          style: {
            backgroundColor: "rgba(229, 229, 229, 0.1)",
            color: "#fff",
            fontSize: "16px",
            marginTop: "60px",
          },
        });
        getUserProfile(dispatch);
      } else {
        toast.error(response.message + "try again", {
          style: {
            backgroundColor: "rgba(229, 229, 229, 0.1)",
            color: "#fff",
            fontSize: "16px",
            marginTop: "60px",
          },
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message || "Error adding asset", {
        style: {
          backgroundColor: "rgba(229, 229, 229, 0.1)",
          color: "#fff",
          fontSize: "16px",
          marginTop: "60px",
        },
      });
    }
  };
  const removeTokenFromWallet = async (coinId) => {
    try {
      const response = "Asset removed successfully";
      toast.success(response, {
        style: {
          backgroundColor: "rgba(229, 229, 229, 0.1)",
          color: "#fff",
          fontSize: "16px",
          marginTop: "60px",
        },
      });
      // getUserProfile(dispatch)
      // } else {
      //   toast.error(response.message + "try again",{
      //     style: {
      //       backgroundColor: 'rgba(229, 229, 229, 0.1)',
      //       color: '#fff',
      //       fontSize: '16px',
      //       marginTop: "60px"
      //     },
      // });
      // }
    } catch (error) {
      // console.log(error)
      toast.error("Error adding asset", {
        style: {
          backgroundColor: "rgba(229, 229, 229, 0.1)",
          color: "#fff",
          fontSize: "16px",
          marginTop: "60px",
        },
      });
    }
  };

  const isAssetAdded = (coinId) => {
    return user?.assets?.some((asset) => asset.coinId === coinId);
  };
  return (
    <div className="wallet-main-container">
      <div className="wallet-wrapper">
        <div className="wallet-left">
          <div className="wallet-top-wrap">
            <div className="total-bal-wrap">
              <div className="wrap">
                <p>Total Balance</p> <IoIosEyeOff />
              </div>
              <p>200.00</p>
            </div>
            <div className="btn-wrap">
              <button>Withdraw</button>
              <button>Swap</button>
              <button>Deposit</button>
            </div>
          </div>
          <div className="display-asset-wrap">
            <div className="wrap">
              <span>All</span>
              <span>Crypto</span>
              <span>Fiat</span>
            </div>
            <div className="search-wrap">
              <CiSearch /> <input type="text" placeholder="Search tokens..." />
            </div>
          </div>

          <div className="wallet-token-wrap">
            <p>Assets</p>

            <div className="transaction-history__table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Currency</th>
                    <th>Balance</th>
                    <th>Fiat Value</th>
                    <th>24h Chnage</th>
                  </tr>
                </thead>
                <tbody className="wallet__table-body">
                  {user?.assets?.length === 0 && (
                    <tr className="transaction-history__no-history">
                      <td colSpan="6">
                        <p>Add Token</p>
                      </td>
                    </tr>
                  )}
                  {user?.assets?.map((u) => (
                    <tr key={u.coinId}>
                      <td className="wallet-currency-wrap">
                        <img src={u.image} alt={u.currency} />
                        <h5>{u.symbol?.toUpperCase()}</h5>
                      </td>
                      <td>{u.balance?.toFixed(3)}</td>
                      <td>
                        {selectedCurrency === "USD"
                          ? `$${u.asseUsdtWorth?.toFixed(3)}`
                          : `₦${u.assetNairaWorth?.toFixed(3)}`}
                      </td>
                      <td
                        style={{
                          color: u.percentageChange < 0 ? "red" : "green",
                        }}
                      >
                        {u.percentageChange?.toFixed(3)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="wallet-right">
          <div className="wallet-page-add-token">
          <h3>Listed Tokens</h3>

          <input
            type="text"
            placeholder="Search by name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="wallet-page-search-input"
          />
          {loading && <p className="wallet-page-loading">Loading...</p>}
          {error && <p className="wallet-page-error">{error}</p>}
          <div className="wrap-token-item">
          {filteredCryptoData?.map((coin) => (
            <div key={coin.id} className="wallet-page-token-item">
              <div className="wallet-page-token-item-coin-info">
                <img src={coin.image} alt={coin.name} className="wallet-page-token-image" />
                <span>{coin.name}</span>
              </div>
              {isAssetAdded(coin.id) ? <button
                className="wallet-page-btn"
                onClick={() => removeTokenFromWallet(coin.id)}
                style={{cursor: "not-allowed"}}
                disabled
              >
                Coin Added
              </button> :
              <button
                className="wallet-page-btn"
                onClick={() => addTokenToWallet(coin.id)}
                disabled={loading}
                style={{cursor: loading && "not-allowed"}}
              >
                Add Coin<FaPlus />
              </button>}
            </div>
          ))}
          </div>
        </div>
          {/* <div className="single-list-wrap">
            <div className="top-wrap">
              <span>Bitcoin Wallet</span>
              <img src="" alt="" />
            </div>
            <div className="hold-wrap">
              <span>Hold</span> <IoIosEyeOff />
            </div>
            <div className="avaliable-wrap">
              <div className="wrap">
                <div>Avaliable Balance</div>
                <div className="bal-wrap">
                  <span>23</span> <span>Btc</span>
                </div>
              </div>
              <div className="wrap">
                <div>Avaliable Balance</div>
                <div className="bal-wrap">
                  <span>23</span> <span>Btc</span>
                </div>
              </div>
            </div>
            <div className="history-select-wrap">
              <div className="top-wrap">
                <div>Transaction</div>
                <select name="" id="">
                  <option value="">all</option>
                  <option value="">all</option>
                  <option value="">all</option>
                  <option value="">all</option>
                </select>
              </div>
            </div>

            <div className="history-list">
              {historyData.map((item, index) => (
                <div key={index} className="history-item">
                  <div className="wrap-left">
                    <span>{item.currency}</span>
                    <span>{item.date}</span>
                  </div>
                  <div className="wrap-left">
                    <span>{item.amount}</span>
                    <span>{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default WalletMain;
