// import { api } from './axiosInstance';
import axios from "axios";

const api = axios.create({
  // baseURL: 'https://miner-server-hzkn.onrender.com/api',
  baseURL: 'http://api.testingbreak.com/api',
  // baseURL: 'http://localhost:2000/api',
});

export const initiateDeposit = async (depositData) => {
  console.log("authToken")
  try {
    const authToken = localStorage.getItem('token');

    const response = await api.post('/deposits', depositData, {
      headers: {
        Authorization: `${authToken}`,
      },
    });
    console.log(response)
    if (response.data.success) {
      console.log('Deposit request initiated successfully');
    } else {
      console.error('Failed to initiate deposit request:', response.data.error);
    }
    return response;
  } catch (error) {
    console.error('Error initiating deposit request:', error);
  }
};
