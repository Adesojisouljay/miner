import React, { useEffect, useState } from 'react';
import { fetchCryptoData } from '../api/ekzat';
import { useSelector } from 'react-redux';
import './wallet-page.scss';
import { FaGift, FaArrowUp, FaArrowDown, FaExchangeAlt } from 'react-icons/fa';
import { Loader } from '../components/loader/Loader';

export const WalletPage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [filteredCryptoData, setFilteredCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const user = useSelector((state) => state.ekzaUser.user);
  const selectedCurrency = useSelector((state) => state.currency.selectedCurrency);

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

  const addTokenToWallet = (token) => {
    console.log('Adding token:', token);
  };

  return (
    <div className="wallet-page-container">
      <h2 className="wallet-page-title">{user.username}'s Crypto Portfolio</h2>

      <div className="wallet-top-actions-wrapper">
        <div className="wallet-actions">
          Send<FaArrowUp title="Send" />
        </div>
        <div className="wallet-page-reward-value wallet-actions">
          Receive<FaArrowDown title="Receive" />
        </div>
        <div className="wallet-page-reward-value wallet-actions">
          Buy/Sell<FaExchangeAlt title="Sell" />
        </div>
      </div>

      <div className="wallet-page-assets-tokens">
        <div className="wallet-page-portfolio-wrap">
          <div className="wallet-page-card-wrap">
            <div className="wallet-page-card-title">
              <div className="wallet-page-card-icon">
                <FaGift size={20} />
              </div>
              <h4>Assets</h4>
            </div>

            <div className="wallet-page-card-balance">
              <h2>
                <span className="wallet-page-strike-currency">
                  {selectedCurrency === 'USD' ? '$' : '₦'}
                </span>
                {selectedCurrency === 'USD' 
                  ? user?.totalUsdValue?.toFixed(3)
                  : user?.totalNairaValue?.toFixed(2)}
              </h2>
            </div>

            <div className="wallet-page-card-component-wrap">
              <div className="wallet-page-card-headings">
                <h5>Coin</h5>
                <h5>Balances</h5>
                <h5>Last 24hr</h5>
                <h5>Send</h5>
                <h5>Receive</h5>
                <h5>Buy/Sell</h5>
              </div>

              {user?.assets?.map((u) => (
                <div key={u.coinId} className="wallet-page-card-component">
                  <div className="wallet-page-card-reward">
                    <div className="wallet-page-reward-value wallet-page-token-item-coin-info">
                      <img src={u.image} alt={u.currency} />
                      <div>
                        <h5>{u.currency.toUpperCase()}</h5>
                        <p>{u.balance?.toFixed(3)}</p>
                      </div>
                    </div>
                    <div className="wallet-page-reward-value">
                      <p>
                        {selectedCurrency === 'USD' 
                          ? `$${u.asseUsdtWorth?.toFixed(2)}`
                          : `₦${u.assetNairaWorth?.toFixed(2)}`}
                      </p>
                      <p style={{ color: u.percentageChange < 0 ? 'red' : 'green' }}>
                        {u.percentageChange.toFixed(3)}% 
                        <span>
                          ({u.percentageChange < 0 ? '↓' : '↑'})
                        </span>
                      </p>
                    </div>
                    <div className="wallet-page-reward-value">
                      <p style={{ color: u.percentageChange < 0 ? 'red' : 'green' }}>
                        {selectedCurrency === 'USD' 
                          ? (u.balance * u.priceChangeUsd).toFixed(3)
                          : (u.balance * u.priceChangeNgn).toFixed(3)}
                        <span>
                          ({u.percentageChange < 0 ? '↓' : '↑'})
                        </span>
                      </p>
                    </div>
                    <div className="wallet-page-reward-value wallet-actions">
                      Send<FaArrowUp title="Send" />
                    </div>
                    <div className="wallet-page-reward-value wallet-actions">
                      Receive<FaArrowDown title="Receive" />
                    </div>
                    <div className="wallet-page-reward-value wallet-actions">
                      Buy/Sell<FaExchangeAlt title="Sell" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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
          {filteredCryptoData?.map((coin) => (
            <div key={coin.id} className="wallet-page-token-item">
              <div className="wallet-page-token-item-coin-info">
                <img src={coin.image} alt={coin.name} className="wallet-page-token-image" />
                <span>{coin.name}</span>
              </div>
              <button
                className="wallet-page-btn"
                onClick={() => addTokenToWallet(coin)}
              >
                Add Token
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
