import { api } from './axiosInstance';

export const startMining = async () => {
  try {
    const authToken = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `${authToken}`, 
      },
    };

    const response = await api.post('/mining/start', null, config);
    if (response.data.success) {
      console.log('Mining process started successfully');

    } else {
      console.error('Failed to start mining process:', response.data.error);
    }
    return response;
  } catch (error) {
    console.error('Error starting mining process:', error);
    throw error;
  }
};

export const getUserMiningRecord = async (userId) => {
  // console.log(api)
    try {
      const authToken = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `${authToken}`,
        },
      };
  
      const response = await api.get(`/mining/${userId}`, config);
      if (response.data.success) {
      } else {
        console.error('Failed to fetch user mining record:', response.data.error);
      }
      return response;
    } catch (error) {
      console.error('Error fetching user mining record:', error);
      throw error;
    }
  };

export const transferMinedBalance = async () => {
  try {
    const authToken = localStorage.getItem('token');
    console.log(authToken)
    const config = {
      headers: {
        Authorization: `${authToken}`,
      },
    };

    const response = await api.post('/mining/transfer', null, config);
    console.log(response)
    if (response.data.success) {
      console.log('Mined balance transferred successfully');
    } else {
      console.error('Failed to transfer mined balance:', response.data.error);
    }
    return response;
  } catch (error) {
    console.error('Error transferring mined balance:', error);
    throw error;
  }
};