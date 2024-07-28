// import { api } from './axiosInstance';
import axios from "axios";

const api = axios.create({
  // baseURL: 'https://miner-server-hzkn.onrender.com/api',
  baseURL: 'https://api.testingbreak.com/api',
  // baseURL: 'http://localhost:2000/api',
});

const authToken = localStorage.getItem('token');

export const getUserProfile = async (userData) => {
  console.log(authToken)
  try {
    const config = {
        headers: {
          Authorization: `${authToken}`,
        },
      };

    const response = await api.get('/auth/profile', config);
    console.log(response)
    if (response.data.success) {
      console.log('Profile fetched successfully');

      return response; 
    } else {
      console.error('Failed to fetch profile:', response.data.message);

      return null;
    }
  } catch (error) {
    console.error('Error fetching profile:', error);

    return null;
  }
};
