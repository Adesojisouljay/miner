import { api } from "./axiosInstance";

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