import axios from "axios";

const api = axios.create({
    // baseURL: 'https://miner-server-hzkn.onrender.com/api',
    baseURL: 'http://localhost:2000/api',
  });
  const authToken = localStorage.getItem('token');
export const fetchTransactionHistory = async () => {
    try {
        const config = {
            headers: {
              Authorization: `${authToken}`,
            },
          };
      const response = await api.get(`/transactions`, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      throw error;
    }
  };