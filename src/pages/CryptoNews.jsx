import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCryptoData } from '../api/ekzat';
import './crypto-news.scss';

export const CryptoNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetchCryptoData();
        setNews(response.data.cryptoData.newsData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching news');
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="crypto-news-container">
      <h2>Latest Crypto News</h2>
      <div className="crypto-news-list">
        {news?.map((item) => (
          <div key={item.url} className="crypto-news-item">
            <img src={item.thumbnail} alt={item.title} className="crypto-news-thumbnail" />
            <div className="crypto-news-content">
              <h3 className="crypto-news-title">
                <Link to={`/crypto-news/${item._id}`}>
                  {item.title}
                </Link>
              </h3>
              <p className="crypto-news-description">{item.description}</p>
              <p className="crypto-news-date">{new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="credits-section">
        <p>News data provided by <a href="https://rapidapi.com" target="_blank" rel="noopener noreferrer">RapidAPI</a> and <a href="https://cryptodaily.co.uk" target="_blank" rel="noopener noreferrer">Crypto Daily</a>.</p>
      </div>
    </div>
  );
};
