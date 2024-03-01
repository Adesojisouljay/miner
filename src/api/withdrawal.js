// import { api } from './axiosInstance';
import axios from "axios";

const api = axios.create({
  baseURL: 'https://miner-server-hzkn.onrender.com/api',
  // baseURL: 'http://localhost:2000/api',
});

export const initiateWithdrawal = async (amount) => {
  try {
    const authToken = localStorage.getItem('token');
    console.log(authToken)
    const config = {
      headers: {
        Authorization: `${authToken}`,
      },
    };

    const response = await api.post('/withdrawals/initiate', { amount }, config);
    return response.data;
  } catch (error) {
    console.error('Error initiating withdrawal:', error);
    throw error;
  }
};
