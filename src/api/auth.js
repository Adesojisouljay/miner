// import { api } from './axiosInstance';
import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.testingbreak.com/api',
  // baseURL: 'https://miner-server-hzkn.onrender.com/api',
  // baseURL: 'http://localhost:2000/api',
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);

    console.log('Response from server:', response);

    if (response?.data?.success) {
      console.log('User registered successfully');
      return response.data;
    } else {
      console.error('Failed to register user:', response.data.message);
      return {
        success: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.error('Error registering user:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'An unexpected error occurred',
    };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    console.log(response)
    if (response.data.success) {
      console.log('User logged in successfully');

      localStorage.setItem('token', response.data.token);
      return response; 
    } else {
      console.error('Failed to login:', response.data.message);

      return null;
    }
  } catch (error) {
    console.error('Error logging in:', error);

    return null;
  }
};
