import React, { useEffect, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchCryptoData } from '../api/ekzat';
import './single-coin-info.scss';


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
// import Skeleton from "./Skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  // Legend
);

export const SingleCoinInfo = () => {
  const [coinData, setCoinData] = useState({});
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [priceHistory, setPriceHistory] = useState([]);
  const [timeRange, setTimeRange] = useState('1'); 
  const [selectedCurrency, setSelectedCurrency] = useState('ngn');
  const chartRef = React.useRef(null);

  const params = useParams()
  console.log(params.id)

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
  }, []);
  console.log(selectedCoin)



  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=${selectedCurrency}&days=${timeRange}`
        );
        setPriceHistory(response.data.prices);
        // console.log(priceHistory)
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };
    

    fetchPriceHistory();
  }, [selectedCoin, timeRange, selectedCurrency]);

  const coinChartData = priceHistory.map(value => ({ x: value[0], y: value[1].toFixed(2) }));
  console.log(coinChartData)

  // const formatDataForChart = (priceHistory) => {

  //   return priceHistory.map((entry) => ({
  //     name: new Date(entry[0]).toLocaleDateString(),
  //     uv: entry[1],
  //   }));
  // };
  console.log(coinData)
  console.log(selectedCoin)

  console.log(coinData[selectedCoin])

  if (!coinData[selectedCoin]) return <div>Loading...</div>;
  console.log(priceHistory)
  // const formattedChartData = formatDataForChart(priceHistory);
  const selectedCoinData = coinData[selectedCoin];
  const coinName = coins[selectedCoin];
  console.log(coinName)
  const formattedPrice = selectedCoinData.ngn.toLocaleString();
  const options = {
    responsive: true,
    // plugins: {
    //   legends:{
    //     position: "buttom",
    //   },
    // },
  }


  const ChartWithGradient = (chartRef) => {
    const chartCanvas = chartRef.current;
    if (!chartCanvas) return null;
  
    const ctx = chartCanvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 400); // You can adjust the start and end points for the gradient.
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.16)'); // Start color
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.04)'); // End color
    
    return gradient;
  };
  const data = {
    labels: coinChartData.map(value => moment(value.x).format('MMM DD')),
    // labels: coinChartData.slice(0, 15).map(value => moment(value.x).format('MMM DD')),
    datasets: [
      {
        fill: true,
        // label: id,
        data: coinChartData.map(val => val.y),
        borderColor: 'grey',
        // backgroundColor: 'rgba(53, 162, 235, 0.5)',
        // backgroundColor: 'rgb(2, 8, 15)',
        backgroundColor: ChartWithGradient(chartRef),
        pointRadius: 0,
      }
    ]
  }


  return (
    <div className="bitcoin-page">
      <header className="header">
        <h1>{coinName}</h1>
        <div className="header-icon">
          <img src={`path_to_${selectedCoin}_icon`} alt={`${coinName} Icon`} />
        </div>
      </header>
      <section className="btc-market-value">
        <p>{coinName}'s Market Value</p>
        <h2>₦{formattedPrice}</h2>
        <div className="time-range-buttons">
          <button className='btn' onClick={() => setTimeRange('1')}>24H</button>
          <button className='btn' onClick={() => setTimeRange('7')}>1W</button>
          <button className='btn' onClick={() => setTimeRange('30')}>30D</button>
          {/* <button className='btn' onClick={() => setTimeRange('90')}>3 Months</button> */}
          <button className='btn' onClick={() => setTimeRange('365')}>1Y</button>
        </div>
        <div className="btc-chart">
          {/* <ResponsiveContainer width="100%" height={200}>
            <LineChart data={formattedChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer> */}

          <Line options={options}  data={data} />
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
      <div className="coin-selector">
        <label>Select Coin: </label>
        <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)}>
          {Object.keys(coins).map((coin) => (
            <option key={coin} value={coin}>
              {coins[coin]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
