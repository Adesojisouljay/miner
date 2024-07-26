import axios from 'axios';

export const api = axios.create({
    // baseUrl : "https://miner-server-hzkn.onrender.com/api",
    baseURL: 'https://api.testingbreak.com',
    // baseURL: 'http://localhost:2000/api',
  });

  console.log()