import React, { useEffect, useState } from 'react';
import { fetchCryptoData, addAsset } from '../api/ekzat';
import { useSelector, useDispatch } from 'react-redux';
import './wallet-page.scss';
import { FaGift, FaArrowUp, FaArrowDown, FaExchangeAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { getUserProfile } from '../api/profile';
import { toast } from 'react-toastify';
import { Loader } from '../components/loader/Loader';
import { CiSearch } from 'react-icons/ci';
import { IoIosEyeOff } from 'react-icons/io';
import usdt from "../assets/tusd.svg"
import Chart from '../components/coin-chart/Chart';
import SingleCoinTransaction from '../components/wallet-component/SingleCoinTransaction';

export const WalletPage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [filteredCryptoData, setFilteredCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [coinId, setCoinId] = useState("bitcoin")

  const user = useSelector((state) => state.ekzaUser.user);
  const selectedCurrency = useSelector((state) => state.currency.selectedCurrency);
  const dispatch = useDispatch()

  useEffect(() => {
    getCryptoData();
  }, []);

  

  useEffect(() => {
    const filteredData = cryptoData.filter(coin =>
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
        setCryptoData(selectedCurrency === 'USD' ? usdData : ngnData);
        setFilteredCryptoData(selectedCurrency === 'USD' ? usdData : ngnData);
      } else {
        setError(response?.data?.message || 'Failed to fetch data.');
      }
    } catch (error) {
      setError('An error occurred while fetching the data.');
    } finally {
      setLoading(false);
    }
  };

  const addTokenToWallet = async (coinId) => {
    setLoading(true)
    try {
      const response = await addAsset(coinId)
      if(response.success){
        toast.success(response.message,{
          style: {
            backgroundColor: 'rgba(229, 229, 229, 0.1)',
            color: '#fff',
            fontSize: '16px',
            marginTop: "60px"
          },
        });
        getUserProfile(dispatch)
      } else {
        toast.error(response.message + "try again",{
          style: {
            backgroundColor: 'rgba(229, 229, 229, 0.1)',
            color: '#fff',
            fontSize: '16px',
            marginTop: "60px"
          },
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
      toast.error(error.message || "Error adding asset",{
        style: {
          backgroundColor: 'rgba(229, 229, 229, 0.1)',
          color: '#fff',
          fontSize: '16px',
          marginTop: "60px"
        },
      });
    }
  };
  const removeTokenFromWallet = async (coinId) => {
    try {
      const response = "Asset removed successfully"
        toast.success(response,{
          style: {
            backgroundColor: 'rgba(229, 229, 229, 0.1)',
            color: '#fff',
            fontSize: '16px',
            marginTop: "60px"
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
      toast.error( "Error adding asset",{
        style: {
          backgroundColor: 'rgba(229, 229, 229, 0.1)',
          color: '#fff',
          fontSize: '16px',
          marginTop: "60px"
        },
      });
    }
  };

  const isAssetAdded = (coinId) => {
    return user?.assets?.some(asset => asset.coinId === coinId);
  };

  // console.log(user.assets)
  // console.log(coinId)

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
                    <tr key={u.coinId} onClick={()=>setCoinId(u.coinId) }>
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
          {/* <div className="wallet-page-add-token">
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
        </div> */}
          <div className="single-list-wrap">
            <div className="top-wrap">
              <span>Bitcoin Wallet</span>
              <img src={usdt} alt="" />
            </div>
            <div className="hold-wrap">
              <span>HOLDINGS</span> <IoIosEyeOff />
            </div>
            <div className="bal-wrap">
              <span>23.00</span> <small>Btc</small>
            </div>

            <div className="avaliable-wrap">
              <div className="wrap">
                <span>Avaliable Balance</span>
                <div className="bal-wrap">
                  <span>23</span> <span>Btc</span>
                </div>
              </div>
              <div className="wrap">
                <span>Pending Balance</span>
                <div className="bal-wrap">
                  <span>23</span> <span>Btc</span>
                </div>
              </div>
            </div>
            <div className="action-wrap">
              <button>Deposit</button>
              <button>Buy/Sell</button>
              <button>Withdraw</button>
            </div>
            {/* <SingleCoinTransaction /> */}
            <Chart coinId={coinId} />

          </div>

          

        </div>
      </div>
    </div>
    
  );
};
