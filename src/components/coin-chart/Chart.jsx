import React, { useEffect, useState } from 'react';
import "./chart.scss";
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
);

function Chart({ coinId }) {
  const [coinData, setCoinData] = useState({});
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [priceHistory, setPriceHistory] = useState([]);
  const [timeRange, setTimeRange] = useState('1');
  const [selectedCurrency, setSelectedCurrency] = useState('usd'); // Set to 'usd'

  const coinIds = "ids=bitcoin,hive,hive_dollar,tether,dogecoin,tron,toncoin,gala,solana,ethereum";

  const coins = {
    bitcoin: 'Bitcoin',
    hive: 'Hive',
    hive_dollar: 'Hive Backed Dollar',
    tether: 'Tether',
    dogecoin: 'Dogecoin',
    tron: 'TRON',
    toncoin: 'Toncoin',
    gala: 'Gala',
    solana: 'Solana',
    ethereum: 'Ethereum',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?${coinIds}&vs_currencies=${selectedCurrency}&include_market_cap=true&include_24hr_change=true`
        );
        setCoinData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [coinId, selectedCurrency]);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${selectedCurrency}&days=${timeRange}`
        );
        setPriceHistory(response.data.prices);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchPriceHistory();
  }, [coinId, timeRange, selectedCurrency]);

  const coinChartData = priceHistory.map(value => ({ x: value[0], y: value[1].toFixed(2) }));

  if (!coinData[coinId]) return <div>Loading...</div>;

  const selectedCoinData = coinData[coinId];
  const coinName = coins[coinId];
  const formattedPrice = selectedCoinData.usd.toLocaleString(); // Change 'ngn' to 'usd'
  
  const options = {
    responsive: true
  };

  const data = {
    labels: coinChartData.map(value => moment(value.x).format('MMM DD')),
    datasets: [
      {
        fill: true,
        data: coinChartData.map(val => val.y),
        borderColor: 'grey',
        backgroundColor: 'rgb(2, 8, 15)',
        pointRadius: 0,
      }
    ]
  };

  return (
    <div className="chart-page">
      {/* <header className="header">
        <h1>{coinName}</h1>
        <div className="header-icon">
          <img src={`path_to_${selectedCoin}_icon`} alt={`${coinName} Icon`} />
        </div>
      </header> */}
      <section className="btc-market-value">
        <div className="top-wrap">
        <span> <p>{coinName}'s Market Value</p>
        <h2>${formattedPrice}</h2> </span>{/* Change the currency symbol to '$' */}
        <div className="time-range-buttons">
          <button className='btn' onClick={() => setTimeRange('1')}>24H</button>
          <button className='btn' onClick={() => setTimeRange('7')}>1W</button>
          <button className='btn' onClick={() => setTimeRange('30')}>30D</button>
          <button className='btn' onClick={() => setTimeRange('365')}>1Y</button>
        </div>
        </div>
        <div className="btc-chart">
          <Line options={options} data={data} />
        </div>
      </section>
      <section className="btc-balance">
        <h3>Your {coinName} Balance</h3>
        <h2>0 {coinName}</h2>
      </section>
      <div className="actions">
        <button className="buy">Buy</button>
        <button className="sell">Sell</button>
      </div>
    </div>
  );
}

export default Chart;
