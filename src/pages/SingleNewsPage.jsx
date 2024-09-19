import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCryptoNewsById } from '../api/ekzat';
import './single-news.scss';

export const SingleNewsPage = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const data = await getCryptoNewsById(id);
        setNewsItem(data.news);
      } catch (err) {
        setError(err.message || 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [id]);

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!newsItem) {
    return <div className="no-news-message">No news item found</div>;
  }

  return (
    <div className="single-news-container">
        <div className='single-news-wrapper'>
            <h1 className="news-title">{newsItem.title}</h1>
            <img className="news-thumbnail" src={newsItem.thumbnail} alt={newsItem.title} />
            <p className="news-description">{newsItem.description}...</p>
            <div className='single-news-bottom'>
                <p className="single-news-date">Published at: {new Date(newsItem.createdAt).toLocaleString()}</p>
                <a 
                    className="single-news-link"
                    href={newsItem.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    Read full article from source
                </a>
            </div>
        </div>
        <div className="credits-section">
            <p className='credits-paragraph'>
                News data provided by 
                <a href="https://rapidapi.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    RapidAPI
                </a> 
                and 
                <a 
                    href="https://cryptodaily.co.uk" 
                    target="_blank" 
                    rel="noopener 
                    noreferrer">
                    Crypto Daily
                </a>.
            </p>
        </div>
    </div>
  );
};
