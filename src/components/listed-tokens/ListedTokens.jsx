import React, { useEffect, useState } from 'react';
import { fetchCryptoData } from '../../api/ekzat';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './listed-tokens.scss';

export const ListedTokens = () => {
    const global = useSelector((state) => state);
    console.log(global);
    
    const [cryptoData, setCryptoData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    
    const currencySymbol = global.currency.selectedCurrency === "USD" ? "$" : "N";

    useEffect(() => {
        getCryptoData();
    }, [global.currency.selectedCurrency]);

    useEffect(() => {
        filterCryptoData();
    }, [searchQuery, cryptoData]);

    const getCryptoData = async () => {
        try {
            const response = await fetchCryptoData();
            console.log(response);
    
            if (response?.data?.success) {
                const { usdData, ngnData } = response.data.cryptoData;
                if (global.currency.selectedCurrency === "USD") {
                    setCryptoData(usdData);
                } else {
                    setCryptoData(ngnData);
                }
            } else {
                console.error('Failed to fetch data:', response?.data?.message);
                setError(response?.data?.message || 'Failed to fetch data.');
            }
        } catch (error) {
            console.error('Error fetching data from /crypto-data endpoint:', error);
            setError('An error occurred while fetching the data.');
        } finally {
            setLoading(false);
        }
    };

    const filterCryptoData = () => {
        const filtered = cryptoData.filter(coin => 
            coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coin.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <div className="listed-tokens-container">
            <h2 className="listed-tokens-title">Tokens on Ekzatrade</h2>
            <input
                type="text"
                className="listed-token-search-input"
                placeholder="Search by coin name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className='listed-token-table-wrap'> 
                <table className="listed-tokens-table">
                    <thead>
                        <tr>
                            <th>Coin</th>
                            <th>Symbol</th>
                            <th>Current Price ({currencySymbol})</th>
                            <th>Market Cap ({currencySymbol})</th>
                            <th>24h % Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((coin) => {
                            const percentageChangeClass = coin.price_change_percentage_24h >= 0 
                                ? 'positive-change' 
                                : 'negative-change';

                            return (
                                <tr key={coin.id} className="listed-tokens-row">
                                    <td className="listed-tokens-coin-name symbol-image-td">
                                        <img src={coin.image} alt={coin.name} className='td-image' />
                                        <Link to={`/coin/${coin.id}`} className="coin-link">
                                            {coin.name}
                                        </Link>
                                    </td>
                                    <td className='symbol-image-td'>
                                        <Link to={`/coin/${coin.id}`} className="coin-link">
                                            {coin.symbol.toUpperCase()}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/coin/${coin.id}`} className="coin-link">
                                            {currencySymbol}{coin.current_price.toLocaleString()}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/coin/${coin.id}`} className="coin-link">
                                            {currencySymbol}{coin.market_cap.toLocaleString()}
                                        </Link>
                                    </td>
                                    <td className={percentageChangeClass}>
                                        <Link to={`/coin/${coin.id}`} className="coin-link">
                                            {coin.price_change_percentage_24h.toFixed(2)}%
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {loading && <p className="listed-tokens-loading">Loading...</p>}
            {error && <p className="listed-tokens-error">{error}</p>}
        </div>
    );
};
