import React, { useEffect, useState } from 'react';
import { fetchCryptoData } from '../api/ekzat';
import { useSelector } from 'react-redux';
import './wallet-page.scss';
import { FaGift } from 'react-icons/fa';
import { Loader } from '../components/loader/Loader';

export const WalletPage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [filteredCryptoData, setFilteredCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const user = useSelector((state) => state.ekzaUser.user);

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
        const { usdData } = response.data.cryptoData;
        setCryptoData(usdData);
        setFilteredCryptoData(usdData);
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
      <h2 className="wallet-page-title">{user.username}'s Crypto Porfolio</h2>

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
                <span className="wallet-page-strike-currency">$</span>
                {user?.totalUsdValue?.toFixed(3)}
              </h2>
            </div>

            <div className="wallet-page-card-component-wrap">
              {user?.assets?.map((u) => (
                <div key={u.coinId} className="wallet-page-card-component">
                  <div className="wallet-page-card-reward">
                    <img src={u.image} alt={u.currency} />
                    <div className="wallet-page-reward-value">
                      <h5>{u.currency.toUpperCase()}</h5>
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
