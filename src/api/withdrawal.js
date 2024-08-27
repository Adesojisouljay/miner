import { api } from './axiosInstance';

export const initiateWithdrawal = async (amount) => {
  try {
    const authToken = localStorage.getItem('token');
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
